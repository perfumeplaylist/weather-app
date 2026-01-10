#!/usr/bin/env node
/**
 * Fill / Improve Location Coordinates (TypeScript)
 *
 * 목적
 * - korea_districts.json(시/군/구 후보 전체) + 기존 location_coordinates.json(부분 성공 결과)
 * - 누락된 시/군/구(특히 "강원특별자치도", "전북특별자치도", "고양시덕양구" 같은 케이스)를
 *   더 잘 지오코딩하도록 쿼리 전략을 개선해 좌표를 보완합니다.
 *
 * 핵심 개선점(기존 스크립트 대비)
 * 1) "특별자치도" 등 최신 행정명칭을 OpenWeather가 못 알아듣는 경우가 있어
 *    도/시 이름을 "짧은 이름" + "구명칭 호환"으로 정규화하여 여러 쿼리로 재시도
 * 2) "고양시덕양구"처럼 시+구가 붙어있는 형태를 자동 분리(고양시 / 덕양구)하여
 *    성공 확률이 높은 쿼리로 변환
 * 3) 기존 결과 파일을 읽어 "이미 성공한 좌표는 재요청하지 않고" 누락만 채움(재현성/비용 절감)
 * 4) limit=5 결과를 받아 간단한 스코어링으로 "가장 그럴듯한 KR 결과"를 선택
 * 5) 지오코딩 실패 시 (옵션) 상위 시(…시) 좌표로 폴백해도 되는지 선택 가능
 *
 * 실행 예시
 *   VITE_OPENWEATHER_API_KEY=xxx npx tsx scripts/fill-location-coordinates.ts
 *
 * 옵션
 *   --input   경로 (기본: data/korea_districts.json)
 *   --existing 기존 좌표 파일 (기본: data/location_coordinates.json)
 *   --output  출력 경로 (기본: data/location_coordinates.filled.json)
 *   --delay   요청 간 딜레이 ms (기본: 120)
 *   --concurrency 동시 요청 수 (기본: 2)
 *   --fallback  상위 시 좌표로 폴백 허용(true/false) (기본: true)
 */

import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

type DistrictKey = `${string}-${string}`;

type ExistingLocation = {
  id: DistrictKey;
  city: string;
  district: string;
  fullName: DistrictKey;
  coordinates: { lat: number; lon: number };
  apiName?: string;
  country?: string;
};

type ExistingFile = {
  metadata: Record<string, unknown>;
  locations: ExistingLocation[];
};

type GeoResult = {
  name: string;
  lat: number;
  lon: number;
  country?: string;
  state?: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COLORS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};

const log = {
  info: (msg: string) => console.log(`${COLORS.blue}ℹ${COLORS.reset} ${msg}`),
  success: (msg: string) =>
    console.log(`${COLORS.green}✓${COLORS.reset} ${msg}`),
  warn: (msg: string) => console.log(`${COLORS.yellow}⚠${COLORS.reset} ${msg}`),
  error: (msg: string) => console.log(`${COLORS.red}✗${COLORS.reset} ${msg}`),
  step: (msg: string) => console.log(`${COLORS.cyan}→${COLORS.reset} ${msg}`),
};

// ---- CLI ----
function getArg(name: string, fallback?: string): string | undefined {
  const idx = process.argv.indexOf(name);
  if (idx >= 0) return process.argv[idx + 1];
  return fallback;
}
function getBoolArg(name: string, fallback: boolean): boolean {
  const v = getArg(name);
  if (v == null) return fallback;
  return ["1", "true", "yes", "y"].includes(String(v).toLowerCase());
}
function getNumArg(name: string, fallback: number): number {
  const v = getArg(name);
  if (v == null) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

const CONFIG = {
  INPUT_FILE: getArg(
    "--input",
    path.join(__dirname, "../data/korea_districts.json")
  )!,
  EXISTING_FILE: getArg(
    "--existing",
    path.join(__dirname, "../data/location_coordinates.json")
  )!,
  OUTPUT_FILE: getArg(
    "--output",
    path.join(__dirname, "../data/location_coordinates.filled.json")
  )!,
  API_KEY:
    process.env.VITE_OPENWEATHER_API_KEY || process.env.OPENWEATHER_API_KEY,
  API_BASE_URL: "https://api.openweathermap.org/geo/1.0/direct",
  DELAY_MS: getNumArg("--delay", 120),
  CONCURRENCY: getNumArg("--concurrency", 2),
  MAX_RETRIES: 3,
  FALLBACK_TO_CITY: getBoolArg("--fallback", true),
};

// ---- Helpers ----
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function progress(current: number, total: number, label: string) {
  const pct = ((current / total) * 100).toFixed(1);
  const bar =
    "█".repeat(Math.floor(Number(pct) / 2)) +
    "░".repeat(50 - Math.floor(Number(pct) / 2));
  process.stdout.write(
    `\r${COLORS.cyan}[${bar}]${COLORS.reset} ${pct}% (${current}/${total}) - ${label}`
  );
}

function extractDistrictKeys(all: string[]): DistrictKey[] {
  const out = new Set<string>();
  for (const s of all) {
    // 시/군/구 2단계만: "광역-시군구"
    if (s.split("-").length === 2) out.add(s);
  }
  return Array.from(out).sort() as DistrictKey[];
}

/**
 * OpenWeather가 최신 행정명칭(예: 강원특별자치도)을 못 알아듣는 경우가 있어,
 * 자주 쓰는 호환 표기를 함께 사용합니다.
 */
function normalizeProvince(p: string): string[] {
  const map: Record<string, string[]> = {
    강원특별자치도: ["강원특별자치도", "강원도", "Gangwon-do", "Gangwon"],
    전북특별자치도: [
      "전북특별자치도",
      "전라북도",
      "Jeollabuk-do",
      "North Jeolla",
    ],
    전라북도: ["전라북도", "Jeollabuk-do", "North Jeolla"],
    전라남도: ["전라남도", "Jeollanam-do", "South Jeolla"],
    경상북도: ["경상북도", "Gyeongsangbuk-do", "North Gyeongsang"],
    경상남도: ["경상남도", "Gyeongsangnam-do", "South Gyeongsang"],
    충청북도: ["충청북도", "Chungcheongbuk-do", "North Chungcheong"],
    충청남도: ["충청남도", "Chungcheongnam-do", "South Chungcheong"],
    경기도: ["경기도", "Gyeonggi-do", "Gyeonggi"],
    제주특별자치도: ["제주특별자치도", "제주도", "Jeju-do", "Jeju"],
    세종특별자치시: ["세종특별자치시", "세종시", "Sejong"],
    서울특별시: ["서울특별시", "서울", "Seoul"],
    부산광역시: ["부산광역시", "부산", "Busan"],
    대구광역시: ["대구광역시", "대구", "Daegu"],
    인천광역시: ["인천광역시", "인천", "Incheon"],
    광주광역시: ["광주광역시", "광주", "Gwangju"],
    대전광역시: ["대전광역시", "대전", "Daejeon"],
    울산광역시: ["울산광역시", "울산", "Ulsan"],
  };
  return map[p] ?? [p];
}

/**
 * "고양시덕양구"처럼 붙어있는 케이스를 "고양시" + "덕양구"로 분리
 * 반환: { baseCity?: string, subDistrict?: string, spaced?: string }
 */
function splitCityAndSubDistrict(district: string): {
  baseCity?: string;
  subDistrict?: string;
  spaced?: string;
} {
  // (…시)(…구) 형태
  const m = district.match(/^(.+?시)(.+?구)$/);
  if (m)
    return { baseCity: m[1], subDistrict: m[2], spaced: `${m[1]} ${m[2]}` };

  // (…시)(…군) 같은 형태는 거의 없지만 대비
  const m2 = district.match(/^(.+?시)(.+?군)$/);
  if (m2)
    return { baseCity: m2[1], subDistrict: m2[2], spaced: `${m2[1]} ${m2[2]}` };

  return {};
}

function buildQueryCandidates(province: string, district: string): string[] {
  const provVariants = normalizeProvince(province);
  const { baseCity, subDistrict, spaced } = splitCityAndSubDistrict(district);

  const candidates: string[] = [];

  // 1) 가장 정보가 많은 형태들
  for (const pv of provVariants) {
    // 기존 방식 개선: province가 "도/시"일 수 있으니, 더 자연스러운 문장/나열로
    candidates.push(`${district}, ${pv}, South Korea`);
    candidates.push(`${district}, ${pv}, KR`);
    candidates.push(`${district} ${pv} KR`);
  }

  // 2) 시+구 분리형 (성공률 높음)
  if (baseCity && subDistrict) {
    for (const pv of provVariants) {
      candidates.push(`${subDistrict}, ${baseCity}, ${pv}, South Korea`);
      candidates.push(`${subDistrict}, ${baseCity}, ${pv}, KR`);
      candidates.push(`${spaced}, ${pv}, KR`);
      candidates.push(`${spaced}, South Korea`);
    }
    // province 없이도 시/구만으로 잡히는 경우
    candidates.push(`${subDistrict}, ${baseCity}, South Korea`);
    candidates.push(`${spaced}, South Korea`);
  }

  // 3) province 없이 (특별자치도 명칭 불일치 등 대비)
  candidates.push(`${district}, South Korea`);
  candidates.push(`${district}, KR`);

  // 중복 제거 + 너무 짧은 것 제거
  return Array.from(new Set(candidates.map((s) => s.trim()))).filter(
    (s) => s.length >= 4
  );
}

/**
 * 결과 선택 스코어링 (간단)
 * - KR(한국) 우선
 * - district 문자열 포함(부분) 우선
 * - province/state가 들어있으면 보너스
 */
function scoreResult(
  r: GeoResult,
  province: string,
  district: string,
  citySplit?: { baseCity?: string; subDistrict?: string }
): number {
  let score = 0;

  const name = (r.name ?? "").toLowerCase();
  const state = (r.state ?? "").toLowerCase();
  const provNorms = normalizeProvince(province).map((s) => s.toLowerCase());
  const districtLower = district.toLowerCase();

  if ((r.country ?? "").toUpperCase() === "KR") score += 1000;

  if (name.includes(districtLower) || districtLower.includes(name))
    score += 200;
  if (state) score += 30;

  // province/state match
  for (const pv of provNorms) {
    if (state.includes(pv) || pv.includes(state)) score += 80;
  }

  // split hints
  if (citySplit?.subDistrict) {
    const sd = citySplit.subDistrict.toLowerCase();
    if (name.includes(sd) || sd.includes(name)) score += 120;
  }
  if (citySplit?.baseCity) {
    const bc = citySplit.baseCity.toLowerCase();
    if (name.includes(bc) || bc.includes(name) || state.includes(bc))
      score += 60;
  }

  // prefer not-too-generic names
  if (name.length >= 2) score += Math.min(name.length, 20);

  return score;
}

async function fetchGeocode(q: string, retry = 0): Promise<GeoResult[] | null> {
  const url = `${CONFIG.API_BASE_URL}?q=${encodeURIComponent(
    q
  )}&limit=5&appid=${CONFIG.API_KEY}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 429 && retry < CONFIG.MAX_RETRIES) {
        await sleep(1200 * (retry + 1));
        return fetchGeocode(q, retry + 1);
      }
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = (await res.json()) as unknown;
    if (!Array.isArray(data)) return null;
    return data as GeoResult[];
  } catch (e: Error) {
    if (retry < CONFIG.MAX_RETRIES) {
      await sleep(600 * (retry + 1));
      return fetchGeocode(q, retry + 1);
    }
    return null;
  }
}

async function resolveCoordinates(
  key: DistrictKey
): Promise<ExistingLocation | null> {
  const [province, district] = key.split("-") as [string, string];
  const candidates = buildQueryCandidates(province, district);
  const split = splitCityAndSubDistrict(district);

  for (const q of candidates) {
    const results = await fetchGeocode(q);
    if (!results || results.length === 0) continue;

    // KR 결과 중 최고 점수 선택
    const ranked = results
      .map((r) => ({ r, s: scoreResult(r, province, district, split) }))
      .sort((a, b) => b.s - a.s);

    const best = ranked[0]?.r;
    if (best && Number.isFinite(best.lat) && Number.isFinite(best.lon)) {
      return {
        id: key,
        city: province,
        district,
        fullName: key,
        coordinates: { lat: best.lat, lon: best.lon },
        apiName: best.name,
        country: best.country,
      };
    }
  }

  // 폴백: (…시…구)라면 (…시)로 내려서라도 좌표 확보
  if (CONFIG.FALLBACK_TO_CITY) {
    const m = district.match(/^(.+?시).+구$/);
    if (m) {
      const cityOnlyKey = `${province}-${m[1]}` as DistrictKey;
      // cityOnlyKey가 실제 district-level 목록에 없을 수 있지만, 지오코딩만은 시도
      const candidates2 = buildQueryCandidates(province, m[1]);
      for (const q of candidates2) {
        const results = await fetchGeocode(q);
        if (!results || results.length === 0) continue;
        const ranked = results
          .map((r) => ({
            r,
            s: scoreResult(r, province, m[1], { baseCity: m[1] }),
          }))
          .sort((a, b) => b.s - a.s);
        const best = ranked[0]?.r;
        if (best && Number.isFinite(best.lat) && Number.isFinite(best.lon)) {
          return {
            id: key, // 원래 key로 저장하되, 좌표는 상위 시 좌표
            city: province,
            district,
            fullName: key,
            coordinates: { lat: best.lat, lon: best.lon },
            apiName: `${best.name} (fallback: ${cityOnlyKey})`,
            country: best.country,
          };
        }
      }
    }
  }

  return null;
}

async function promisePool<T, R>(
  items: T[],
  concurrency: number,
  worker: (item: T, idx: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length) as R[];
  let next = 0;

  async function runOne() {
    while (next < items.length) {
      const idx = next++;
      results[idx] = await worker(items[idx], idx);
      await sleep(CONFIG.DELAY_MS);
    }
  }

  const runners = Array.from({ length: Math.max(1, concurrency) }, () =>
    runOne()
  );
  await Promise.all(runners);
  return results;
}

async function main() {
  console.log(
    `\n${COLORS.bright}=== Fill Location Coordinates (TS) ===${COLORS.reset}\n`
  );

  if (!CONFIG.API_KEY) {
    log.error("VITE_OPENWEATHER_API_KEY (or OPENWEATHER_API_KEY) is not set.");
    log.info(
      "Example: VITE_OPENWEATHER_API_KEY=xxx npx tsx scripts/fill-location-coordinates.ts"
    );
    process.exit(1);
  }

  // 1) Load inputs
  log.step(`Reading districts: ${CONFIG.INPUT_FILE}`);
  const allDistrictsRaw = JSON.parse(
    await fs.readFile(CONFIG.INPUT_FILE, "utf-8")
  ) as string[];
  const allKeys = extractDistrictKeys(allDistrictsRaw);

  log.success(`District-level keys: ${allKeys.length.toLocaleString()}`);

  let existing: ExistingFile | null = null;
  try {
    const txt = await fs.readFile(CONFIG.EXISTING_FILE, "utf-8");
    existing = JSON.parse(txt) as ExistingFile;
    log.success(
      `Loaded existing coordinates: ${existing.locations.length.toLocaleString()}`
    );
  } catch {
    log.warn(
      `Existing file not found or invalid: ${CONFIG.EXISTING_FILE} (will create new)`
    );
    existing = { metadata: {}, locations: [] };
  }

  const existingMap = new Map<DistrictKey, ExistingLocation>();
  for (const loc of existing.locations) existingMap.set(loc.id, loc);

  // 2) Determine missing
  const missing = allKeys.filter((k) => !existingMap.has(k));
  log.info(`Missing keys to fill: ${missing.length.toLocaleString()}`);

  if (missing.length === 0) {
    log.success("No missing keys. Nothing to do.");
    return;
  }

  log.warn(
    `Geocoding will run with concurrency=${CONFIG.CONCURRENCY}, delay=${CONFIG.DELAY_MS}ms (be mindful of rate limits).`
  );

  // 3) Fill missing using a pool
  let done = 0;
  const filled = await promisePool(
    missing,
    CONFIG.CONCURRENCY,
    async (key, idx) => {
      done++;
      progress(done, missing.length, key);
      const loc = await resolveCoordinates(key);
      return loc;
    }
  );

  process.stdout.write("\n");

  const success = filled.filter((x): x is ExistingLocation => Boolean(x));
  const failed = filled.filter((x) => !x).length;

  // 4) Merge
  for (const loc of success) existingMap.set(loc.id, loc);

  const merged = Array.from(existingMap.values()).sort((a, b) =>
    a.id.localeCompare(b.id)
  );

  const output: ExistingFile = {
    metadata: {
      generatedAt: new Date().toISOString(),
      source: "OpenWeather Geocoding API",
      inputDistrictKeys: allKeys.length,
      existingLoaded: existing.locations.length,
      newlyFilled: success.length,
      stillMissing: failed,
      note: "Improved queries: province normalization + city/gu split + KR scoring + optional city-level fallback for 시+구",
      config: {
        delayMs: CONFIG.DELAY_MS,
        concurrency: CONFIG.CONCURRENCY,
        fallbackToCity: CONFIG.FALLBACK_TO_CITY,
      },
    },
    locations: merged,
  };

  // 5) Save
  await fs.mkdir(path.dirname(CONFIG.OUTPUT_FILE), { recursive: true });
  await fs.writeFile(
    CONFIG.OUTPUT_FILE,
    JSON.stringify(output, null, 2),
    "utf-8"
  );

  console.log(`\n${COLORS.bright}=== Summary ===${COLORS.reset}`);
  console.log(`${COLORS.green}✓ Filled:${COLORS.reset} ${success.length}`);
  console.log(`${COLORS.red}✗ Still missing:${COLORS.reset} ${failed}`);
  console.log(`${COLORS.blue}ℹ Total saved:${COLORS.reset} ${merged.length}`);
  log.success(`Saved: ${CONFIG.OUTPUT_FILE}`);

  if (failed > 0) {
    log.warn(
      "Tip: If some remain missing, run again with higher delay, or add more province variants / query patterns."
    );
  }
}

main().catch((e) => {
  log.error(`Fatal: ${(e as Error).message}`);
  process.exit(1);
});

#!/usr/bin/env node

/**
 * Location Coordinates Generator
 *
 * 이 스크립트는 korea_districts.json에서 시/군/구 단위 지역을 추출하고
 * OpenWeather Geocoding API를 사용하여 좌표를 가져옵니다.
 *
 * 사용법:
 * OPENWEATHER_API_KEY=your_api_key node scripts/generate-location-coordinates.js
 */

import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 설정
const CONFIG = {
  INPUT_FILE: path.join(__dirname, "../data/korea_districts.json"),
  OUTPUT_FILE: path.join(__dirname, "../data/location_coordinates.json"),
  API_KEY: process.env.VITE_OPENWEATHER_API_KEY,
  API_BASE_URL: "http://api.openweathermap.org/geo/1.0/direct",
  RATE_LIMIT_DELAY: 100, // API 호출 간 딜레이 (ms)
  MAX_RETRIES: 3,
};

// 색상 출력용 유틸리티
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  progress: (msg) => console.log(`${colors.cyan}→${colors.reset} ${msg}`),
};

/**
 * 시/군/구 단위 지역만 추출
 */
function extractDistrictLevel(districts) {
  const districtSet = new Set();

  for (const district of districts) {
    const parts = district.split("-");

    // 시/군/구 단위 (2단계)
    if (parts.length === 2) {
      districtSet.add(district);
    }
  }

  return Array.from(districtSet).sort();
}

/**
 * 지역 정보 파싱
 */
function parseLocation(locationString) {
  const parts = locationString.split("-");

  if (parts.length === 2) {
    return {
      city: parts[0],
      district: parts[1],
      fullName: locationString,
    };
  }

  return null;
}

/**
 * OpenWeather Geocoding API 호출
 */
async function fetchCoordinates(location, retryCount = 0) {
  const { city, district } = location;

  // 검색 쿼리 생성 (한글 + 영문 변환 고려)
  const query = `${district}, ${city}, South Korea`;
  const url = `${CONFIG.API_BASE_URL}?q=${encodeURIComponent(
    query
  )}&limit=1&appid=${CONFIG.API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 429 && retryCount < CONFIG.MAX_RETRIES) {
        // Rate limit 초과 시 재시도
        log.warning(
          `Rate limit exceeded, retrying... (${retryCount + 1}/${
            CONFIG.MAX_RETRIES
          })`
        );
        await sleep(2000 * (retryCount + 1));
        return fetchCoordinates(location, retryCount + 1);
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data && data.length > 0) {
      const result = data[0];
      return {
        lat: result.lat,
        lon: result.lon,
        name: result.name,
        country: result.country,
      };
    }

    return null;
  } catch (error) {
    if (retryCount < CONFIG.MAX_RETRIES) {
      log.warning(
        `Error fetching ${location.fullName}, retrying... (${retryCount + 1}/${
          CONFIG.MAX_RETRIES
        })`
      );
      await sleep(1000 * (retryCount + 1));
      return fetchCoordinates(location, retryCount + 1);
    }

    log.error(
      `Failed to fetch coordinates for ${location.fullName}: ${error.message}`
    );
    return null;
  }
}

/**
 * 딜레이 함수
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 진행률 표시
 */
function showProgress(current, total, location) {
  const percentage = ((current / total) * 100).toFixed(1);
  const bar =
    "█".repeat(Math.floor(percentage / 2)) +
    "░".repeat(50 - Math.floor(percentage / 2));
  process.stdout.write(
    `\r${colors.cyan}[${bar}]${colors.reset} ${percentage}% (${current}/${total}) - ${location}`
  );
}

/**
 * 메인 실행 함수
 */
async function main() {
  console.log(
    `\n${colors.bright}=== Location Coordinates Generator ===${colors.reset}\n`
  );

  // API 키 확인
  if (!CONFIG.API_KEY) {
    log.error("OPENWEATHER_API_KEY environment variable is not set!");
    log.info(
      "Usage: OPENWEATHER_API_KEY=your_api_key node scripts/generate-location-coordinates.js"
    );
    process.exit(1);
  }

  try {
    // 1. 입력 파일 읽기
    log.info("Reading input file...");
    const inputData = await fs.readFile(CONFIG.INPUT_FILE, "utf-8");
    const allDistricts = JSON.parse(inputData);
    log.success(
      `Loaded ${allDistricts.length.toLocaleString()} total districts`
    );

    // 2. 시/군/구 단위만 추출
    log.info("Extracting district-level locations...");
    const districtLevel = extractDistrictLevel(allDistricts);
    log.success(`Extracted ${districtLevel.length} unique districts`);

    // 3. 위치 정보 파싱
    log.info("Parsing location information...");
    const locations = districtLevel
      .map(parseLocation)
      .filter((loc) => loc !== null);
    log.success(`Parsed ${locations.length} locations`);

    // 4. 좌표 가져오기
    log.info("Fetching coordinates from OpenWeather API...");
    log.warning(
      `This may take a while (approx. ${Math.ceil(
        (locations.length * CONFIG.RATE_LIMIT_DELAY) / 1000 / 60
      )} minutes)...\n`
    );

    const results = [];
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < locations.length; i++) {
      const location = locations[i];
      showProgress(i + 1, locations.length, location.fullName);

      const coordinates = await fetchCoordinates(location);

      if (coordinates) {
        results.push({
          id: `${location.city}-${location.district}`,
          city: location.city,
          district: location.district,
          fullName: location.fullName,
          coordinates: {
            lat: coordinates.lat,
            lon: coordinates.lon,
          },
          apiName: coordinates.name,
          country: coordinates.country,
        });
        successCount++;
      } else {
        failCount++;
      }

      // Rate limiting
      if (i < locations.length - 1) {
        await sleep(CONFIG.RATE_LIMIT_DELAY);
      }
    }

    console.log("\n"); // 진행률 표시 후 줄바꿈

    // 5. 결과 저장
    log.info("Saving results...");
    const output = {
      metadata: {
        generatedAt: new Date().toISOString(),
        totalLocations: results.length,
        successCount,
        failCount,
        source: "OpenWeather Geocoding API",
      },
      locations: results.sort((a, b) => a.id.localeCompare(b.id)),
    };

    await fs.writeFile(
      CONFIG.OUTPUT_FILE,
      JSON.stringify(output, null, 2),
      "utf-8"
    );

    log.success(`Results saved to ${CONFIG.OUTPUT_FILE}`);

    // 6. 통계 출력
    console.log(`\n${colors.bright}=== Summary ===${colors.reset}`);
    console.log(
      `${colors.green}✓ Success:${colors.reset} ${successCount} locations`
    );
    if (failCount > 0) {
      console.log(
        `${colors.red}✗ Failed:${colors.reset} ${failCount} locations`
      );
    }
    console.log(
      `${colors.blue}ℹ Total:${colors.reset} ${results.length} locations saved\n`
    );

    // 7. 샘플 데이터 출력
    if (results.length > 0) {
      log.info("Sample data:");
      console.log(JSON.stringify(results.slice(0, 3), null, 2));
    }
  } catch (error) {
    log.error(`Fatal error: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// 스크립트 실행
main().catch((error) => {
  log.error(`Unhandled error: ${error.message}`);
  console.error(error);
  process.exit(1);
});

/**
 * Location 이름을 동/구로 파싱
 */
export function parseLocationName(label: string): {
  dongName: string;
  guName: string;
} {
  const parts = label.split(" ");
  const dongName = parts[parts.length - 1] || "";
  const guName = parts.slice(0, -1).join(" ") || "";

  return { dongName, guName };
}

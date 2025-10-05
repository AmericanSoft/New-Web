// src/helpers/images.js
export const BASE = import.meta.env.VITE_API_BASE_URL || "";

/** يحوّل أي مسار نسبي إلى مطلق باستخدام BASE ويُبقي الروابط الكاملة كما هي */
export function resolveImageUrl(src) {
  if (!src) return "";
  const trimmed = String(src).trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `${BASE.replace(/\/+$/, "")}/${trimmed.replace(/^\/+/, "")}`;
}

/** بدائل افتراضية */
export const FALLBACKS = {
  HERO: "https://www.figma.com/api/mcp/asset/ad36c066-f696-4826-b3ef-29dc212a9cd2",
  GRID: "https://www.figma.com/api/mcp/asset/d98521d5-9b19-4990-b62a-cd969560476b",
  LOGO: "https://www.figma.com/api/mcp/asset/6594bab5-387b-4282-b219-3ac241b94714",
  TECH_REACT: "https://www.figma.com/api/mcp/asset/38d3f206-1c7f-497e-a54d-f095b2e9297d",
  TECH_PHP: "https://www.figma.com/api/mcp/asset/160d51fc-3f37-4878-b604-9c81520e7ad6",
  TECH_FIGMA: "https://www.figma.com/api/mcp/asset/99807699-ffd7-4de8-acd1-bb9137d919d3",
};

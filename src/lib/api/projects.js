// src/lib/api/projects.js
import { api } from "./http";

const STORAGE_BASE = (import.meta.env.VITE_STORAGE_BASE_URL || "").replace(/\/+$/, "");

/** يبني رابط صورة صحيح باستخدام STORAGE_BASE */
function buildImageUrl(path) {
  if (!path) return path;
  // لو رابط كامل، سيبه زي ما هو
  try { new URL(path); return path; } catch {}
  // path نسبي (مثال: "projects/xxx.png")
  const clean = String(path).replace(/^\/+/, ""); // شيل / أولي
  return `${STORAGE_BASE}/${clean}`;
}

function normalizeOne(p) {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    main_image: buildImageUrl(p.main_image),
    live_url: p.link || null,
    tag: p.category_name || p.tag || "Web",
    other_images: Array.isArray(p.other_images) ? p.other_images.map(buildImageUrl) : [],
    created_at: p.created_at,
    updated_at: p.updated_at,
  };
}

function normalizeList(payload) {
  const list = Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.results)
    ? payload.results
    : [];
  return list.map(normalizeOne);
}

export async function listProjects(params = {}) {
  const data = await api.get("projects", params);
  return normalizeList(data);
}

export async function getProject(id) {
  if (!id) throw new Error("getProject: id is required");
  const data = await api.get(`projects/${id}`);
  const item = data?.data || data;
  return normalizeOne(item);
}

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../i18";
import { useTranslation } from "react-i18next";

/* ==================== Types ==================== */
type Project = {
  id: number | string;
  title: string;
  description: string;
  main_image: string;
  category: "web" | "mobile" | "seo" | string;
  url?: string;
};

type Mode = "wordpress" | "json";

type Props = {
  rtl?: boolean;
  mode: Mode;

  // WordPress
  wpBase?: string;
  categories?: { web: string; mobile: string; seo: string };
  perPage?: number;

  // JSON
  jsonUrl?: string; // مثال: https://sfgukli.american-softwares.com/api/projects

  // internal details route
  internalLinkBase?: string;
};

/* ==================== Helpers ==================== */
async function fetchJson<T = any>(url: string): Promise<T> {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return (await r.json()) as T;
}



// جد قائمة احتمالات لمسار الصورة، وجرّبها واحدة واحدة


function SmartImage({
  rawSrc,
  origin,
  alt,
  className,
}: {
  rawSrc: string;
  origin: string;
  alt: string;
  className?: string;
}) {
  const [tries, setTries] = React.useState(0);
  const candidates = React.useMemo(() => buildImageCandidates(rawSrc, origin), [rawSrc, origin]);
  const src = candidates[Math.min(tries, candidates.length - 1)] || "/project.png";

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (tries < candidates.length - 1) {
          console.warn("Image failed, trying next:", src);
          setTries((n) => n + 1);
        } else if (!src.endsWith("/project.png")) {
          console.warn("All candidates failed, fallback -> /project.png");
          setTries(candidates.length);
        }
      }}
      onLoad={() => console.debug("Image loaded:", src)}
    />
  );
}

/* ==================== WordPress Helpers (اختياري) ==================== */
async function wpGetCategoryId(base: string, slug: string) {
  const url = `${base}/wp-json/wp/v2/categories?slug=${encodeURIComponent(slug)}`;
  const cats = await fetchJson<any[]>(url);
  return cats?.[0]?.id as number | undefined;
}

async function wpFetchProjects(base: string, catIds: number[], perPage = 12) {
  const url = `${base}/wp-json/wp/v2/posts?categories=${catIds.join(",")}&_embed&per_page=${perPage}`;
  return await fetchJson<any[]>(url);
}

function wpMapToProject(post: any, catKey: string): Project {
  const main_image =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    post?.yoast_head_json?.og_main_image?.[0]?.url ||
    "/project.png";
  const title = (post?.title?.rendered || "").replace(/<[^>]+>/g, "");
  const description = (post?.excerpt?.rendered || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return { id: post.id, title, description, main_image, category: catKey, url: post.link };
}

/* ==================== Tabs ==================== */
const TAB_KEYS = ["all", "web", "mobile", "seo"] as const;
type TabKey = typeof TAB_KEYS[number];


// helpers
function getOrigin(fromUrl?: string) {
  try { return new URL(fromUrl!).origin; } catch { return ""; }
}

function buildImageCandidates(raw: string | undefined, origin: string) {
  if (!raw) return ["/project.png"];

  let url = String(raw).trim();

  // مطلق؟ خليه أول محاولة
  if (/^https?:\/\//i.test(url)) return [url, "/project.png"];

  // شيل السلاشات في الأول
  const path = url.replace(/^\/+/, "");

  // لو جاي "projects/filename.png" أو "/projects/..."
  if (/^projects\//i.test(path)) {
    const file = path.replace(/^projects\//i, "");
    return [
      `${origin}/storage/projects/${file}`,
      `${origin}/index.php/storage/projects/${file}`,
      `${origin}/projects/${file}`,
      `${origin}/index.php/projects/${file}`,
      "/project.png",
    ];
  }

  // لو جاي "storage/..." أو "public/..."
  if (/^(storage|public)\//i.test(path)) {
    return [
      `${origin}/${path}`,
      `${origin}/index.php/${path}`,
      "/project.png",
    ];
  }

  // أي مسار نسبي تاني
  return [
    `${origin}/${path}`,
    `${origin}/index.php/${path}`,
    "/project.png",
  ];
}

// Img ذكية تجرب مصادر متعددة
function SmartImg({
  raw,
  origin,
  alt,
  className,
}: {
  raw: string | undefined;
  origin: string;
  alt: string;
  className?: string;
}) {
  const [i, setI] = React.useState(0);
  const candidates = React.useMemo(() => buildImageCandidates(raw, origin), [raw, origin]);
  const src = candidates[Math.min(i, candidates.length - 1)];
  cons

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (i < candidates.length - 1) setI(i + 1);
      }}
    />
  );
}


/* ==================== Component ==================== */
export default function OurProject({
  rtl,
  mode,
  wpBase,
  categories,
  perPage = 12,
  jsonUrl,
  internalLinkBase,
}: Props) {
  const { t, i18n } = useTranslation();
  const isAr = rtl ?? i18n.language?.startsWith("ar");
  const dir = isAr ? "rtl" : "ltr";

  const [active, setActive] = useState<TabKey>("all");
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const origin = useMemo(() => getOrigin(mode === "json" ? jsonUrl : wpBase), [mode, jsonUrl, wpBase]);

  const TAB_LABELS = useMemo(
    () => ({
      all: t("projects.tabs.all", "الكل"),
      web: t("projects.tabs.web", "Web"),
      mobile: t("projects.tabs.mobile", "Mobile"),
      seo: t("projects.tabs.seo", "SEO"),
    }),
    [t]
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        if (mode === "json") {
          if (!jsonUrl) throw new Error("jsonUrl is required in json mode");

          const raw = await fetchJson<any>(jsonUrl);

          // يدعم أشكال مختلفة: [] أو {data:[]} أو {projects:[]}
          const list: any[] = Array.isArray(raw)
            ? raw
            : Array.isArray(raw?.data)
            ? raw.data
            : Array.isArray(raw?.projects)
            ? raw.projects
            : [];

          const mapped: Project[] = list.map((item, idx) => {
            const id = item.id ?? item._id ?? item.slug ?? `p-${idx}`;

            const title =
              item.title_ar ??
              item.title_en ??
              item.title ??
              item.name ??
              `Project ${idx + 1}`;

            const descriptionRaw =
              item.description_ar ??
              item.description_en ??
              item.description ??
              item.summary ??
              item.excerpt ??
              "";

            const description = String(descriptionRaw)
              .replace(/<[^>]+>/g, " ")
              .replace(/\s+/g, " ")
              .trim();

            // أسماء محتملة لحقل الصورة (نمرر كما هو لـ SmartImage)
            const main_image =
              item.main_image ??
              item.main_image_url ??
              item.thumbnail ??
              item.thumb ??
              item.cover ??
              item.featured_main_image ??
              item.logo ??
              "/project.png";

            const catRaw =
              (item.category?.slug ||
                item.category?.name ||
                item.category ||
                item.type ||
                "web") + "";

            const catLower = catRaw.toLowerCase();
            const category: Project["category"] =
              catLower.includes("seo")
                ? "seo"
                : catLower.includes("mobile") || catLower.includes("app")
                ? "mobile"
                : "web";

            const url =
              item.url ??
              item.link ??
              item.website ??
              item.permalink ??
              undefined;

            return { id, title, description, main_image, category, url };
          });

          setAllProjects(mapped);
        } else {
          if (!wpBase || !categories)
            throw new Error("wpBase & categories are required in wordpress mode");

          const [webId, mobileId, seoId] = await Promise.all([
            wpGetCategoryId(wpBase, categories.web),
            wpGetCategoryId(wpBase, categories.mobile),
            wpGetCategoryId(wpBase, categories.seo),
          ]);
          const ids = [webId, mobileId, seoId].filter(Boolean) as number[];
          if (!ids.length) throw new Error("No category IDs found");

          const posts = await wpFetchProjects(wpBase, ids, perPage);

          const idToKey: Record<number, "web" | "mobile" | "seo"> = {};
          if (webId) idToKey[webId] = "web";
          if (mobileId) idToKey[mobileId] = "mobile";
          if (seoId) idToKey[seoId] = "seo";

          const mapped: Project[] = posts.map((p) => {
            let key: "web" | "mobile" | "seo" = "web";
            const cats = (p?.categories || []) as number[];
            for (const c of cats) {
              if (idToKey[c]) {
                key = idToKey[c];
                break;
              }
            }
            return wpMapToProject(p, key);
          });

          setAllProjects(mapped);
        }
      } catch (e: any) {
        setErr(e?.message || "Failed to load projects");
        setAllProjects([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [mode, jsonUrl, wpBase, JSON.stringify(categories), perPage]);

  const filtered = useMemo(() => {
    if (active === "all") return allProjects;
    return allProjects.filter((p) => p.category === active);
  }, [active, allProjects]);

  return (
    <section dir={dir} className="w-full bg-white py-10" id="ourproject">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            {t("projects.title", "مشاريعنا")}
          </h2>
          <p className="mt-2 text-slate-600">
            {t("projects.subtitle", "Browse our web, mobile and SEO work with quick filters.")}
          </p>
        </header>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {(["all", "web", "mobile", "seo"] as TabKey[]).map((key) => {
            const activeTab = active === key;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  activeTab
                    ? "border-red-600 bg-red-50 text-red-700"
                    : "border-red-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {TAB_LABELS[key]}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Loading skeletons */}
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`sk-${i}`}
                className="rounded-2xl overflow-hidden shadow-elegant bg-white animate-pulse"
              >
                <div className="w-full h-44 bg-slate-100" />
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-slate-100 rounded w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="h-4 bg-slate-100 rounded w-5/6" />
                  <div className="h-9 bg-slate-100 rounded w-32 mt-3" />
                </div>
              </div>
            ))}

          {/* Error */}
          {!loading && err && (
            <div className="sm:col-span-2 lg:col-span-3 text-center text-red-600">
              {t("projects.error", "حدث خطأ أثناء تحميل المشاريع")}
              <div className="text-sm text-slate-500 mt-1">{err}</div>
            </div>
          )}

          {/* Cards */}
          {!loading &&
            !err &&
            filtered.map((p) => {
              const body =
                p.description?.length > 160 ? p.description.slice(0, 160) + "…" : p.description;

              return (
                <article
                  key={p.id}
                  className="rounded-2xl overflow-hidden shadow-elegant bg-white flex flex-col"
                >
                  <div className="w-full">

                    <SmartImage
                      rawSrc={`/storage/${p.main_image}`}
                      origin={origin}
                      alt={p.title}
                      className="w-full h-44 object-cover"
                    />
                  </div>

                  <div className="p-5 flex-1">
                    <div className="mb-2">
                      <span className="rounded-full border border-slate-200 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 bg-white/60">
                        {t(`projects.badge.${p.category as "web" | "mobile" | "seo"}`, {
                          defaultValue: p.category,
                        })}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900">{p.title}</h3>
                    <p className="mt-2 text-slate-700 text-sm">{body}</p>
                  </div>

                  <div className={(isAr ? "pr-5" : "pl-5") + " pb-5"}>
                    <Link
                      to={`${internalLinkBase ?? "/project"}/${p.id}`}
                      className="inline-block text-black hover:text-white border border-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-teal-200 font-medium rounded-lg text-sm px-4 py-2"
                    >
                      {t("projects.viewBtn", "View Project")}
                    </Link>
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    </section>
  );
}

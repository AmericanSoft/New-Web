import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../i18";
import { useTranslation } from "react-i18next";

type Project = {
  id: number | string;
  title: string;
  description: string;
  image: string;
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
  useProxy?: boolean;

  // JSON
  jsonUrl?: string;

  // internal details route
  internalLinkBase?: string;
};

// proxy (dev only)
const proxify = (url: string) =>
  `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

async function fetchJsonViaProxy<T = any>(url: string, useProxy?: boolean): Promise<T> {
  if (!useProxy) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
    return (await r.json()) as T;
  }
  const res = await fetch(proxify(url));
  if (!res.ok) throw new Error("Proxy fetch error");
  const data = await res.json();
  return JSON.parse(data.contents) as T;
}

// WP helpers
async function wpGetCategoryId(base: string, slug: string, useProxy?: boolean) {
  const url = `${base}/wp-json/wp/v2/categories?slug=${encodeURIComponent(slug)}`;
  const cats = await fetchJsonViaProxy<any[]>(url, useProxy);
  return cats?.[0]?.id as number | undefined;
}

async function wpFetchProjects(base: string, catIds: number[], perPage = 12, useProxy?: boolean) {
  const url = `${base}/wp-json/wp/v2/posts?categories=${catIds.join(",")}&_embed&per_page=${perPage}`;
  return await fetchJsonViaProxy<any[]>(url, useProxy);
}

function wpMapToProject(post: any, catKey: string): Project {
  const image =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    post?.yoast_head_json?.og_image?.[0]?.url ||
    "/project.png";
  const title = (post?.title?.rendered || "").replace(/<[^>]+>/g, "");
  const description = (post?.excerpt?.rendered || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return {
    id: post.id,
    title,
    description,
    image,
    category: catKey,
    url: post.link,
  };
}

// ثوابت الفلاتر (المفاتيح فقط — الليبل من i18n)
const TAB_KEYS = ["all", "web", "mobile", "seo"] as const;
type TabKey = typeof TAB_KEYS[number];

export default function OurProject({
  rtl,
  mode,
  wpBase,
  categories,
  perPage = 12,
  useProxy = true,
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

  // labels من i18n
  const TAB_LABELS = useMemo(
    () => ({
      all: t("projects.tabs.all"),
      web: t("projects.tabs.web"),
      mobile: t("projects.tabs.mobile"),
      seo: t("projects.tabs.seo"),
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
          const data = await fetchJsonViaProxy<Project[]>(jsonUrl, useProxy);
          setAllProjects(data);
        } else {
          if (!wpBase || !categories)
            throw new Error("wpBase & categories are required in wordpress mode");

          const [webId, mobileId, seoId] = await Promise.all([
            wpGetCategoryId(wpBase, categories.web, useProxy),
            wpGetCategoryId(wpBase, categories.mobile, useProxy),
            wpGetCategoryId(wpBase, categories.seo, useProxy),
          ]);
          const ids = [webId, mobileId, seoId].filter(Boolean) as number[];
          if (!ids.length) throw new Error("No category IDs found");

          const posts = await wpFetchProjects(wpBase, ids, perPage, useProxy);

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
  }, [mode, jsonUrl, wpBase, JSON.stringify(categories), perPage, useProxy]);

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
            {t("projects.title")}
          </h2>
          <p className="mt-2 text-slate-600">{t("projects.subtitle")}</p>
        </header>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {TAB_KEYS.map((key) => {
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
              {t("projects.error")}
              <div className="text-sm text-slate-500 mt-1">{err}</div>
            </div>
          )}

          {/* Cards */}
          {!loading &&
            !err &&
            filtered.map((p) => {
              const body =
                p.description?.length > 160
                  ? p.description.slice(0, 160) + "…"
                  : p.description;

              const Btn = p.url
                ? (props: React.HTMLProps<HTMLAnchorElement>) => (
                    <a {...props} href={p.url} target="_blank" rel="noopener noreferrer" />
                  )
                : internalLinkBase
                ? (props: React.HTMLProps<HTMLAnchorElement>) => (
                    <Link {...(props as any)} to={`${internalLinkBase}/${p.id}`} />
                  )
                : (props: React.HTMLProps<HTMLAnchorElement>) => <span {...props} />;

              return (
                <article
                  key={p.id}
                  className="rounded-2xl overflow-hidden shadow-elegant bg-white flex flex-col"
                >
                  <div className="w-full">
                    <img
                      src={p.image || "/project.png"}
                      alt={p.title}
                      className="w-full h-44 object-cover"
                      loading="lazy"
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
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-slate-700 text-sm">{body}</p>
                  </div>
                  <div className={isAr ? "pr-5 pb-5" : "pl-5 pb-5"}>
                    <Btn className="inline-block text-black hover:text-white border border-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-200 font-medium rounded-lg text-sm px-4 py-2">
                      {t("projects.viewBtn")}
                    </Btn>
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    </section>
  );
}

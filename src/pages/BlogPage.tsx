import React, { useEffect, useMemo, useState } from "react";
import "../i18";
import { useTranslation } from "react-i18next";
import SecNavbar from "@/components/SecNavbar";
import { NavLink } from "react-router-dom";

type WPPost = {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    ["wp:featuredmedia"]?: Array<{ source_url?: string; alt_text?: string }>;
  };
};

const WP_BASE = "https://customers-eg.com";

// بروكسي لتجاوز CORS أثناء التطوير (مجاني)
const proxify = (url: string) =>
  `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

async function fetchJsonViaProxy<T = any>(url: string): Promise<T> {
  const res = await fetch(proxify(url));
  if (!res.ok) throw new Error("Proxy fetch error");
  const data = await res.json();
  // allorigins بيرجع { contents: "..." } كنص
  return JSON.parse(data.contents) as T;
}

// 1) هات ID التصنيف من الـ slug (هنا slug بالعربي: "كمبيوتر")
async function getCategoryIdBySlug(slug: string) {
  const url = `${WP_BASE}/wp-json/wp/v2/categories?slug=${encodeURIComponent(
    slug
  )}`;
  const cats = await fetchJsonViaProxy<any[]>(url);
  return cats?.[0]?.id as number | undefined;
}

// 2) هات آخر 3 مقالات في التصنيف + _embed عشان الصورة
async function getPostsByCategoryId(catId: number, perPage = 3) {
  const url = `${WP_BASE}/wp-json/wp/v2/posts?categories=${catId}&_embed&per_page=${perPage}`;
  const posts = await fetchJsonViaProxy<WPPost[]>(url);
  return posts;
}

const BlogCard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language?.startsWith("ar");
  const dir = isAr ? "rtl" : "ltr";

  const [posts, setPosts] = useState<WPPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ممكن تغيّر slug هنا لو الاسم مختلف في ووردبريس
  const categorySlug = "كمبيوتر";

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const catId = await getCategoryIdBySlug(categorySlug);
        if (!catId) throw new Error("No category found for slug: " + categorySlug);
        const data = await getPostsByCategoryId(catId, 3);
        setPosts(data);
      } catch (e: any) {
        setError(e?.message || "Failed to load posts");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const cards = useMemo(() => posts ?? [], [posts]);

  return (
    <>
      <SecNavbar />

      <section dir={dir} className="w-full pt-0 pb-12 bg-white mt-64">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-gray-900 mb-3 sm:mb-4">
              {t("blog.headblog")}
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              {t("blog.titleblog")}
            </p>
          </div>

          {/* Grid of cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Loading skeletons */}
            {loading &&
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`sk-${i}`}
                  className="rounded-2xl overflow-hidden shadow-elegant bg-white animate-pulse"
                >
                  <div className="w-full h-48 bg-slate-100" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-slate-100 rounded w-3/4" />
                    <div className="h-4 bg-slate-100 rounded w-full" />
                    <div className="h-4 bg-slate-100 rounded w-5/6" />
                    <div className="h-9 bg-slate-100 rounded w-32 mt-4" />
                  </div>
                </div>
              ))}

            {/* Error state */}
            {!loading && error && (
              <div className="sm:col-span-2 lg:col-span-3 text-center text-red-600">
                {isAr ? "حدث خطأ أثناء تحميل المقالات." : "Failed to load posts."}
                <div className="text-sm text-slate-500 mt-1">{error}</div>
              </div>
            )}

            {/* Posts */}
            {!loading &&
              !error &&
              cards.map((post) => {
                const img =
                  post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                  "/blog.png"; // fallback من public
                const alt =
                  post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
                  post.title?.rendered ||
                  "cover";

                // شيل الوسوم من excerpt
                const excerpt = post.excerpt?.rendered
                  ?.replace(/<[^>]+>/g, "")
                  ?.slice(0, 260);

                return (
                  <article
                    key={post.id}
                    className="rounded-2xl overflow-hidden shadow-elegant bg-white flex flex-col"
                  >
                    <div className="w-full">
                      <img
                        src={img}
                        alt={alt}
                        className="w-full h-56 object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-6 flex-1">
                      <h3
                        className="text-xl sm:text-2xl font-display font-semibold mb-3"
                        dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
                      />
                      <p className="text-gray-700 text-sm sm:text-base">
                        {excerpt}…
                      </p>
                    </div>

                  <div className={isAr ? "pr-6 pb-6" : "pl-6 pb-6"}>
  <NavLink    to={`/article/${post.id}`}
    className="inline-block text-black m-0 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
  >
    {t("blog.readmore")}
  </NavLink>
</div>

                  </article>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogCard;

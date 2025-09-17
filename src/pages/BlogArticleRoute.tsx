import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArticlePage from "./ArticalsPages"; // ده الملف اللي بعتهولي
import SecNavbar from "@/components/SecNavbar";
import Footer from "@/components/Footer/Footer";

type WPPost = {
  id: number;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    ["wp:featuredmedia"]?: Array<{ source_url?: string; alt_text?: string }>;
    ["wp:term"]?: any[]; // [ [categories...], [tags...] ]
  };
};

const WP_BASE = "https://customers-eg.com";
// أثناء التطوير لتفادي CORS (بدّلها بـ API Route خاص بيك في الإنتاج)
const proxify = (url: string) =>
  `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

async function fetchJsonViaProxy<T = any>(url: string): Promise<T> {
  const res = await fetch(proxify(url));
  if (!res.ok) throw new Error("Proxy fetch error");
  const data = await res.json();
  return JSON.parse(data.contents) as T;
}

export default function BlogArticleRoute() {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const isAr = i18n.language?.startsWith("ar");

  const [post, setPost] = useState<WPPost | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const url = `${WP_BASE}/wp-json/wp/v2/posts/${id}?_embed`;
        const p = await fetchJsonViaProxy<WPPost>(url);
        setPost(p);
      } catch (e: any) {
        setErr(e?.message || "Failed to load article");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const coverUrl =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/blog.png";
  const coverAlt =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post?.title?.rendered || "";

  // استخرج التصنيف/التاجز لو موجودة في _embedded['wp:term']
  const { category, tags } = useMemo(() => {
    const term = post?._embedded?.["wp:term"];
    let categoryName: string | undefined;
    let tagNames: string[] | undefined;

    if (Array.isArray(term) && term.length) {
      const cats = term[0]; // غالبًا أول Array = categories
      const tgs = term[1];  // وثاني Array = tags
      if (Array.isArray(cats) && cats[0]?.name) categoryName = cats[0].name;
      if (Array.isArray(tgs)) tagNames = tgs.map((x: any) => x?.name).filter(Boolean);
    }
    return { category: categoryName, tags: tagNames };
  }, [post]);

  // احسب وقت القراءة تقريبي من عدد الكلمات
  const readTime = useMemo(() => {
    if (!post?.content?.rendered) return undefined;
    const text = post.content.rendered.replace(/<[^>]+>/g, " ");
    const words = text.trim().split(/\s+/).length;
    const mins = Math.max(1, Math.round(words / 200));
    return isAr ? `${mins} دقائق قراءة` : `${mins} min read`;
  }, [post, isAr]);

  return (
    <>
      <SecNavbar />
      {loading && (
        <section dir={isAr ? "rtl" : "ltr"} className="w-full bg-white pt-64 pb-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-4">
              <div className="h-64 w-full bg-slate-100 rounded-xl" />
              <div className="h-8 w-3/4 bg-slate-100 rounded" />
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-5/6 bg-slate-100 rounded" />
            </div>
          </div>
        </section>
      )}

      {!loading && err && (
        <section dir={isAr ? "rtl" : "ltr"} className="w-full bg-white pt-64 pb-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-600">
            {isAr ? "حدث خطأ أثناء تحميل المقال." : "Failed to load article."}
            <div className="text-sm text-slate-500 mt-1">{err}</div>
          </div>
        </section>
      )}

      {!loading && post && (
        <ArticlePage
          rtl={isAr}
          title={post.title?.rendered?.replace(/<[^>]+>/g, "") || ""}
          coverUrl={coverUrl}
          coverAlt={coverAlt}
          contentHtml={post.content?.rendered || ""}
          date={new Date(post.date).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          readTime={readTime}
          category={category}
          tags={tags}
          author={isAr ? "فريق American Soft" : "American Soft Team"}
        />
      )}
      <Footer />
    </>
  );
}

import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SecNavbar from "./SecNavbar";
import Footer from "./Footer/Footer";

// ===== Helpers =====
const API_SHOW = (id: string | number) =>
  `https://american-softwares.com/api/projects/${id}`;

/** يبني base مثل: https://american-softwares.com/api/public/ */
function assetsBaseFromShowUrl(showUrl: string) {
  try {
    const u = new URL(showUrl);
    const m = u.href.match(/^(https?:\/\/[^?#]+\/public\/)/);
    return m ? m[1] : u.origin + "/";
  } catch {
    return "https://american-softwares.com/api/public/";
  }
}
const toAbs = (u?: string, base?: string) => {
  if (!u) return "";
  try {
    return new URL(u, base).href;
  } catch {
    return u;
  }
};

// يضمن وجود http/https في اللينك
const withHttp = (url?: string) =>
  !url ? "" : /^(https?:)?\/\//i.test(url) ? url : `https://${url}`;

export default function SingleProjectDetails() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dir = i18n.dir();

  // اجلب المشروع + طبّع البيانات
  useEffect(() => {
    if (!id) return;
    const showUrl = API_SHOW(id);
    const base = assetsBaseFromShowUrl(showUrl);

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(showUrl);
        if (!res.ok) throw new Error("Project not found");
        const raw = await res.json();

        const p = raw.project || raw;

        // main_image: يقبل مطلق/نسبي
        const mainImageRaw =
          p.main_image || p.image || p.cover || p.thumbnail || "/project.png";
        const main_image = toAbs(String(mainImageRaw), base);

        // other_images: صفيف مسارات — بنحوّل لكل عنصر مسار مطلق
        const otherImages: string[] = Array.isArray(p.other_images)
          ? p.other_images.map((x: any) => toAbs(String(x), base))
          : [];

        const normalized = {
          id: p.id,
          title: p.title || p.title_ar || p.title_en || "Project",
          description: (p.description_ar || p.description_en || p.description || "")
            .toString()
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim(),
          main_image,
          other_images: otherImages,
          category_name: p.category_name || p.category || p.type || "",
          updated_at: p.updated_at || p.created_at,
          link: p.link || p.url || p.website,
        };

        setProject(normalized);
      } catch (e: any) {
        console.error(e);
        setError(t("project.error", "تعذّر تحميل المشروع"));
      } finally {
        setLoading(false);
      }
    })();
  }, [id, t]);

  if (loading)
    return (
      <section dir={dir} className="py-16">
        <p className="text-center text-gray-600">
          {t("project.loading", "جار التحميل…")}
        </p>
      </section>
    );

  if (error || !project)
    return (
      <section dir={dir} className="py-16">
        <p className="text-center text-rose-600">
          {error || "تعذّر العثور على المشروع"}
        </p>
      </section>
    );

  const isRTL = dir === "rtl";

  return (
    <>
      <SecNavbar />
      <section className="bg-white pt-32 pb-16 sm:pt-32 pb-16" dir={dir}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* عنوان + وصف قصير */}
          <header className={isRTL ? "text-right mb-8" : "text-left mb-8"}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              {project.title}
            </h1>
            <p className="mt-2 text-slate-600">{project.category_name}</p>
          </header>

          {/* صورة رئيسية + تفاصيل */}
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            <div>
              <img
                src={project.main_image || "/project.png"}
                alt={project.title}
                className="w-full rounded-2xl border border-gray-200 object-cover shadow-sm"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/project.png";
                }}
              />
            </div>

            <div className={isRTL ? "text-right" : "text-left"}>
              <h2 className="mb-3 text-xl sm:text-2xl font-bold text-slate-900">
                {t("project.about", "نبذة عن المشروع")}
              </h2>
              <p className="mb-5 leading-7 text-gray-700">{project.description}</p>

              <div className="space-y-2 text-sm text-gray-800">
                <p>
                  <span className="font-semibold">
                    {t("project.category", "التصنيف")}:
                  </span>{" "}
                  {project.category_name || "—"}
                </p>
                <p>
                  <span className="font-semibold">
                    {t("project.date", "التاريخ")}:
                  </span>{" "}
                  {project.updated_at
                    ? new Date(project.updated_at).toLocaleDateString()
                    : "—"}
                </p>
                {project.link && (
                  <p className="break-all">
                    <span className="font-semibold">
                      {t("project.link", "الرابط")}:
                    </span>{" "}
                    <a
                      href={withHttp(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-700 underline hover:text-teal-800"
                    >
                      {project.link}
                    </a>
                  </p>
                )}
              </div>

              {/* زرار زيارة الموقع */}
              {project.link && (
                <div className="mt-6">
                  <a
                    href={withHttp(project.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-teal-600 px-4 py-2 text-sm font-medium text-teal-700 hover:bg-teal-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-teal-200"
                  >
                    {t("project.visitBtn", "زيارة الموقع")}
                    <svg
                      className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12h14M13 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* سليدر للصور الأخرى */}
          {project.other_images?.length > 0 && (
            <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 p-3 shadow-sm">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={16}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop
                dir={dir}
              >
                {project.other_images.map((img: string, idx: number) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={`Other ${idx + 1}`}
                      className="h-[400px] w-full rounded-xl object-cover shadow-md"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/project.png";
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {/* Grid صور إضافية (اختياري تحت السلايدر) */}
          {project.other_images?.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.other_images.map((img: string, idx: number) => (
                <div key={idx} className="overflow-hidden rounded-xl">
                  <img
                    src={img}
                    alt={`Other ${idx + 1}`}
                    className="h-56 w-full rounded-xl object-cover shadow"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/project.png";
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SingleProjectDetails() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isRTL = i18n.dir() === "rtl";

  useEffect(() => {
    fetch(`https://american-softwares.com/api/public/index.php/api/projects/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Project not found");
        return res.json();
      })
      .then((data) => {
        setProject(data.project || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(t("project.error"));
        setLoading(false);
      });
  }, [id, t]);

  if (loading)
    return (
      <p className="mt-10 text-center text-gray-600">{t("project.loading")}</p>
    );
  if (error || !project)
    return <p className="mt-10 text-center text-rose-600">{error}</p>;

  return (
    <section className="bg-white py-10" dir={i18n.dir()}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Slider for other_images */}
        {project.other_images?.length > 0 && (
          <div className="mb-10 overflow-hidden rounded-2xl border border-gray-200 p-3 shadow-sm dark:border-gray-700">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop
            >
              {project.other_images.map((img: string, idx: number) => (
                <SwiperSlide key={idx}>
                  <img
                    src={`https://american-softwares.com/storage/${img}`}
                    alt={`Other ${idx + 1}`}
                    className="h-[400px] w-full rounded-xl object-cover shadow-md"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Main project details */}
        <div className="flex justsfiy-center items-center gap-8 lg:grid-cols-2">
          <div>
            <img
              src={`${project.main_image}`}
              alt={project.title}
              className="w-full rounded-2xl border border-gray-200 object-cover shadow-sm dark:border-gray-700"
            />
          </div>

          <div className={isRTL ? "text-right" : "text-left"}>
            <h2 className="mb-3 text-3xl font-bold text-rose-600">
              {project.title}
            </h2>

            <p className="mb-4 leading-relaxed text-gray-700">
              {project.description}
            </p>

            <div className="space-y-2 text-sm text-gray-800">
              <p>
                <span className="font-semibold">{t("project.category")}:</span>{" "}
                {project.category_name}
              </p>
              <p>
                <span className="font-semibold">{t("project.date")}:</span>{" "}
                {project.updated_at
                  ? new Date(project.updated_at).toLocaleDateString()
                  : "—"}
              </p>
              {project.link && (
                <p className="break-all">
                  <span className="font-semibold">{t("project.link")}:</span>{" "}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 underline hover:text-indigo-700"
                  >
                    {project.link}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Grid of other images (fallback/showcase under main if needed) */}
        {project.other_images?.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.other_images.map((img: string, idx: number) => (
              <div key={idx} className="overflow-hidden rounded-xl">
                <img
                  src={`${other_images}`}
                  alt={`Other ${idx + 1}`}
                  className="h-56 w-full rounded-xl object-cover shadow"
                />
              </div>
            ))}
          </div>
        )}
      </div>


    </section>
  );
}

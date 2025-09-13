import { useEffect, useState } from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import { ArrowRight } from "lucide-react";
import LottieAnimation from "./LottieAnimation";
import   "../i18";
import { useTranslation } from "react-i18next";



type Project = {
  id: string | number;
  title: string;
  description?: string;
  main_image?: string;
};

const OPTIONS: EmblaOptionsType = { loop: true, align: "start" };

const OurPorject = () => {

     const { t , i18n } = useTranslation();
           
             const changLang = () => {
               const newLang = i18n.language === "ar" ? "en" : "ar";
               i18n.changeLanguage(newLang);
               localStorage.setItem("lang", newLang);
             };
   


  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [lottieData, setLottieData] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://american-softwares.com/api/public/index.php/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects((data?.data ?? data) as Project[]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetch("/loop-header.lottie")
      .then((r) => r.json())
      .then(setLottieData)
      .catch(() => {});
  }, []);

  // Embla: selected index + snaps (للـ dots)
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onReInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    };
    onReInit();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onReInit);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onReInit);
    };
  }, [emblaApi]);

  const onTiltMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (isMobile) return;
    const card = e.currentTarget;
    const img = card.querySelector("img") as HTMLImageElement | null;
    if (!img) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    img.style.transform = `perspective(1000px) rotateY(${x * 2.5}deg) rotateX(${-y * 2.5}deg) scale3d(1.02,1.02,1.02)`;
  };
  const onTiltLeave: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const img = e.currentTarget.querySelector("img") as HTMLImageElement | null;
    if (img) img.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)`;
  };

  if (loading) {
    return (
      <section className="py-20 text-center text-white/80">Loading…</section>
    );
  }

  return (
    <section
      id="ourproject"
      className="overflow-hidden relative bg-cover"
      style={{
        backgroundImage: 'url("/text-mask-image.jpg")',
        backgroundPosition: "center 30%",
        padding: isMobile ? "100px 12px 40px" : "120px 20px 60px",
      }}
    >
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-red-gradient opacity-20 blur-3xl rounded-full" />

      <div className="container px-4 sm:px-6 lg:px-8">
        <div
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 text-white px-3 py-1 text-sm backdrop-blur"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white p-3">
            03
          </span>
          <span>{t("project.ourproject")} </span>
        </div>

        {/* Embla */}
        <div className="embla">
          <div className="embla__viewport overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {projects.map((project, i) => {
                const isActive = i === selectedIndex;
                return (
                  <div
                    className="embla__slide flex-[0_0_100%] min-w-0 px-1 sm:px-2"
                    key={project.id}
                  >
                    {/* محتوى السلايد مع Fade/Scale/Translate */}
                    <div
                      className={[
                        "transition-all duration-500 ease-out will-change-transform will-change-opacity",
                        isActive
                          ? "opacity-100 translate-y-0 scale-100"
                          : "opacity-0 translate-y-3 scale-[0.98]",
                      ].join(" ")}
                    >
                      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
                        {/* النص */}
                        <div className="w-full lg:w-1/2">
                          <h1
                            className="section-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight text-white"
                            style={{ animationDelay: "0.3s" }}
                          >
                            {project.title}
                          </h1>

                          <p className="mt-3 sm:mt-6 mb-4 sm:mb-8 leading-relaxed text-white/90 font-normal text-base sm:text-lg ">
                            {project.description}
                          </p>

                          <div className="flex flex-col sm:flex-row gap-4">
                            <a
                              href={`projects/${project.id}`}
                              className="flex items-center justify-center group w-full sm:w-auto text-center
                                         rounded-full border border-white bg-white text-black
                                         text-sm font-medium px-5 py-3 shadow hover:shadow-lg transition"
                            >
                              {t("project.btn")}


                              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                          </div>
                        </div>

                        {/* الصورة / لوتّي */}
                        <div className="w-full lg:w-1/2 relative mt-6 lg:mt-0">
                          {lottieData ? (
                            <div className="relative z-10">
                              <LottieAnimation
                                animationPath={lottieData}
                                className="w-full h-auto max-w-lg mx-auto"
                                loop
                                autoplay
                              />
                            </div>
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-dark-900 rounded-2xl sm:rounded-3xl -z-10 shadow-xl" />
                              <div
                                className="relative transition-all duration-500 ease-out overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl bg-white/5 backdrop-blur"
                                onMouseMove={onTiltMove}
                                onMouseLeave={onTiltLeave}
                              >
                                <img
                                  src={project.main_image || "/project.png"}
                                  alt={project.title}
                                  className="w-full h-auto object-cover transition-transform duration-500 ease-out"
                                  style={{ transformStyle: "preserve-3d" }}
                                />
                                <div
                                  className="absolute inset-0"
                                  style={{
                                    backgroundImage: 'url("/hero-image.jpg")',
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    mixBlendMode: "overlay",
                                    opacity: 0.5,
                                  }}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={[
                  "h-2.5 rounded-full transition-all duration-300",
                  i === selectedIndex
                    ? "w-6 bg-white shadow"
                    : "w-2.5 bg-white/40 hover:bg-white/70",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-red-100/30 rounded-full blur-3xl -z-10"
        data-speed="0.05"
      />
    </section>
  );
};

export default OurPorject;

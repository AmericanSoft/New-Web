import { Button } from "@/components/ui/button";
import Terminall from "./Terminal";
import "../i18";
import { useTranslation } from "react-i18next";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine, Container } from "tsparticles-engine";
import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useQuoteModal } from "./QuoteModalContext";


const FirstHero = () => {
  const { t, i18n } = useTranslation();
      const { open } = useQuoteModal();

  const changLang = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // console.log(container);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        className="absolute inset-0 -z-10"
        options={{
          fullScreen: { enable: false }, // مهم عشان يفضل جوه الهيرو بس
          background: { color: { value: "#000000" } }, // هنا الباك جراوند الأساسية
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              repulse: { distance: 120, duration: 0.35 },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 1.5,
              width: 1,
            },
            move: {
              enable: true,
              speed: 3,
              direction: "none",
              outModes: { default: "bounce" },
            },
            number: {
              value: 60,
              density: { enable: true, area: 800 },
            },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
          },
          detectRetina: true,
        }}
      />

      {/* محتوى الهيرو */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-32">
          {/* اليسار */}
          <div className="space-y-8">
            <div className="flex w-[17em] items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium gap-2 justify-start">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
              {t("hero.leading")}
            </div>

            <h1 className="text-3xl md:text-6xl gap-2 font-bold text-white leading-tight flex">
              {t("hero.American")}
              <span className="block gradient-primary bg-clip-text">
                {t("hero.Software")}
              </span>
            </h1>

            <p className="text-xl text-white/80 leading-relaxed max-w-xl">
              {t("hero.tagline")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="gradient-primary text-white hover:shadow-glow transition-all duration-300 px-8 py-6 text-lg font-semibold transform hover:scale-105"
                onClick={open}
              >
                {t("hero.startproject")}
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-dark-900 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 px-8 py-6 text-lg font-semibold backdrop-blur-sm hover:text-slate-200"
              >
               <NavLink to="/projects"> {t("hero.portfolio")}</NavLink>
              </Button>
            </div>
          </div>

          {/* اليمين */}
          <div className="relative hidden lg:block">
            <div className="relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>

                  <Terminall />

                  <div className="space-y-3">
                    <div className="h-3 bg-white/20 rounded animate-pulse"></div>
                    <div className="h-3 bg-primary/30 rounded w-3/4 animate-pulse delay-200"></div>
                    <div className="h-3 bg-white/20 rounded w-1/2 animate-pulse delay-400"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg border border-primary/20"></div>
                    <div className="h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/20"></div>
                  </div>

                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 gradient-primary rounded-full opacity-20 animate-pulse"></div>
              <div
                className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-primary/30 rounded-lg rotate-12 animate-spin"
                style={{ animationDuration: "10s" }} >

                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default FirstHero;

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import "../i18";
import { useTranslation } from "react-i18next";
import {
  CustomSoftware,
  WebApp,
  MobileDev,
  DigitalTrans,
  UiUx,
  Seo,
} from "@/components/icons";
import SecNavbar from "@/components/SecNavbar";
import Footer from '../components/Footer/Footer'

/* ====== Feature Card ====== */
type FeatureCardProps = {
  icon: React.ReactNode;            // يكفي ReactNode لأن الأيكونات React components
  title: string;
  description: string;
  index: number;                    // هنستخدمه للتأخير في الأنيميشن
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // لو المستخدم مفعّل تقليل الحركة، اعرض الكارت فورًا بدون أنيميشن
      cardRef.current?.classList.remove("opacity-0");
      return;
    }

    const el = cardRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // نضيف كلاس الأنيميشن مرة واحدة ونفصل المراقب
          el.style.animationDelay = `${0.1 * index}s`;
          el.classList.add("animate-fade-in");
          io.unobserve(entry.target);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "feature-card glass-card opacity-0 p-4 sm:p-6",
        "transition-all duration-300",
        "lg:hover:bg-gradient-to-br lg:hover:from-white lg:hover:to-red-100"
      )}
    >
      <div className="mb-4 sm:mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500 sm:h-12 sm:w-12">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold sm:mb-3 sm:text-xl">{title}</h3>
      <p className="text-sm text-gray-600 sm:text-base">{description}</p>
    </div>
  );
};

/* ====== Services Section ====== */
const ServicesPage: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const dir = i18n.dir(); // rtl / ltr

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const els = section.querySelectorAll<HTMLElement>(".fade-in-element");
          els.forEach((el, i) => {
            el.style.animationDelay = `${i * 0.1}s`;
            el.classList.add("animate-fade-in");
          });
          io.unobserve(entry.target);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <>
    <SecNavbar/>
    <section
      id="Services"
      ref={sectionRef}
      dir={dir}
      aria-label={t("Services.services")}
      className="relative bg-gray-50 py-12 pb-0 sm:py-16 md:py-20"
    >
      <div className="section-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center sm:mb-16">
          <div className="fade-in-element pulse-chip mx-auto mb-3 sm:mb-4 opacity-0">
            <span>{t("Services.services")}</span>
          </div>

          <h2 className="fade-in-element section-title mb-3 opacity-0 leading-[1.2] sm:mb-4">
            {t("Services.adv")}, <br className="hidden sm:block" />
            {t("Services.human")}
          </h2>

          <p className="fade-in-element section-subtitle mx-auto opacity-0">
            {t("Services.titleservices")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3">
          <FeatureCard
            icon={<CustomSoftware />}
            title={t("Services.customesoftware")}
            description={t("Services.titlecustomesoftware")}
            index={0}
          />
          <FeatureCard
            icon={<WebApp />}
            title={t("Services.webapp")}
            description={t("Services.titlewebapp")}
            index={1}
          />
          <FeatureCard
            icon={<MobileDev />}
            title={t("Services.mobiledev")}
            description={t("Services.titlemobildev")}
            index={2}
          />
          <FeatureCard
            icon={<DigitalTrans />}
            title={t("Services.digitaltrans")}
            description={t("Services.titledigitaltrans")}
            index={3}
          />
          <FeatureCard
            icon={<UiUx />}
            title={t("Services.uiux")}
            description={t("Services.titleuiux")}
            index={4}
          />
          <FeatureCard
            icon={<Seo />}
            title={t("Services.seo")}
            description={t("Services.titleseo")}
            index={5}
          />
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default ServicesPage;

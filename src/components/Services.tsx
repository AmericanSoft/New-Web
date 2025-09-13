
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import   "../i18";
import { useTranslation } from "react-i18next";
import { CustomSoftware, WebApp, MobileDev, DigitalTrans, UiUx, Seo } from "@/components/icons";



interface FeatureCardProps {
  icon:any;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {

  


  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  


  // normalize icon prop into renderable ReactNode
  let iconNode: React.ReactNode;
  if (Array.isArray(icon)) {
    iconNode = icon.map((IconComp, i) => <IconComp key={i} />);
  } else if (typeof icon === "function") {
    const IconComp = icon as () => JSX.Element;
    iconNode = <IconComp />;
  } else {
    iconNode = icon;
  }
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "feature-card glass-card opacity-0 p-4 sm:p-6",
        "lg:hover:bg-gradient-to-br lg:hover:from-white lg:hover:to-red-100",
        "transition-all duration-300"
      )}
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="rounded-full bg-red-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-red-500 mb-4 sm:mb-5">
        {iconNode}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base">{description}</p>
    </div>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in");
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const { t , i18n } = useTranslation();
    
      const changLang = () => {
        const newLang = i18n.language === "ar" ? "en" : "ar";
        i18n.changeLanguage(newLang);
        localStorage.setItem("lang", newLang);
      };

      
  
  return (
    <section className="py-12 sm:py-16 md:py-20 pb-0 relative bg-gray-50" id="Services" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-10 sm:mb-16">
          <div className="pulse-chip mx-auto mb-3 sm:mb-4 opacity-0 fade-in-element">
            <span>{t("Services.services")} </span>
          </div>
          <h2 className="section-title mb-3 sm:mb-4 opacity-0 fade-in-element leading-[70px]">
           {t("Services.adv")}, <br className="hidden sm:block" />{t("Services.human")}
          </h2>
          <p className="section-subtitle mx-auto opacity-0 fade-in-element">
            {t("Services.titleservices")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <FeatureCard
            icon={<CustomSoftware/>}
            title={t("Services.customesoftware")}
            description={t("Services.titlecustomesoftware")}
            index={0}
          />
          <FeatureCard
            icon={<WebApp/>}
            title={t("Services.webapp")}
            description={t("Services.titlewebapp")}
            index={1}
          />
          <FeatureCard
            icon={<MobileDev/>}
            title={t("Services.mobiledev")}
            description={t("Services.titlemobildev")}
            index={2}
          />
          <FeatureCard
            icon={<DigitalTrans/>}
            title={t("Services.digitaltrans")}
            description={t("Services.titledigitaltrans")}
            index={3}
          />
          <FeatureCard
            icon={<UiUx/>}
            title={t("Services.uiux")}
            description={t("Services.titleuiux")}
            index={4}
          />
          <FeatureCard
            icon={ <Seo/>}
            title={t("Services.seo")}
            description={t("Services.titleseo")}
            index={5}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;

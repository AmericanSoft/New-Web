import React, { useEffect, useRef, useState } from "react";
import "../i18";
import { useTranslation } from "react-i18next";

// ✅ انقل الصور إلى: src/assets/
import bg1 from "../../public/background-section1.png";
import bg2 from "../../public/background-section2.png";
import bg3 from "../../public/background-section3.png";

type Card = {
  bg: string;            // URL للصورة بعد الـimport
  badgeKey: string;
  titleKey: string;
  titleExtraKey?: string; // للجزء الأبيض في الكارت الثالث
};

const CARDS: Card[] = [
  { bg: bg1, badgeKey: "whyam.padgeone",   titleKey: "whyam.titleone" },
  { bg: bg2, badgeKey: "whyam.padgetwo",   titleKey: "whyam.titletwo" },
  { bg: bg3, badgeKey: "whyam.padgethree", titleKey: "whyam.titlethree", titleExtraKey: "whyam.titlefour" },
];

// هوك بسيط لعمل reveal ناعم عند دخول العنصر في الفيو
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect(); // مرة واحدة تكفي
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function Whyamerican() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language?.startsWith("ar");
  const dir = isAr ? "rtl" : "ltr";

  return (
    <section dir={dir} className="w-full bg-white py-16 sm:py-20" id="why-humanoid">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge + Title */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs">02</span>
            <span className="text-slate-700 text-sm font-medium">{t("whyam.whypadge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-slate-900">
            {t("whyam.whyamerican")}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c, idx) => (
            <CardItem key={idx} card={c} isAr={isAr} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CardItem({
  card,
  isAr,
  t,
}: {
  card: Card;
  isAr: boolean;
  t: (k: string, opts?: any) => string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <article
      ref={ref}
      className={[
        "relative overflow-hidden rounded-2xl bg-slate-900/90 shadow-xl ring-1 ring-black/5",
        "transition-all duration-500",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        "group"
      ].join(" ")}
      style={{ minHeight: 320 }}
    >
      {/* الخلفية */}
      <img
        src={card.bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

      {/* البادچ */}
      <div className={`absolute top-4 ${isAr ? "left-4" : "right-4"} z-20`}>
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/25 backdrop-blur text-white text-sm font-semibold ring-1 ring-white/30">
          {t(card.badgeKey)}
        </div>
      </div>

      {/* المحتوى */}
      <div className="relative z-10 p-6 sm:p-7 md:p-8 flex items-end h-full">
        <h3 className="text-white font-bold leading-tight text-2xl sm:text-3xl md:text-[28px]">
          {t(card.titleKey)}{" "}
          {card.titleExtraKey && (
            <span
              className={[
                "text-black inline-block bg-white/70 rounded px-2 py-0.5",
                isAr ? "mr-1" : "ml-1",
              ].join(" ")}
            >
              {t(card.titleExtraKey)}
            </span>
          )}
        </h3>
      </div>

      {/* تأثير hover لطيف */}
      <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl pointer-events-none group-hover:ring-white/25 transition-colors duration-300" />
    </article>
  );
}

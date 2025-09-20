import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18";
import img1 from '../../public/American Client Feedback .jpg'

export type TestimonialItem = {
  quote: string;
  name: string;          // اسم صاحب الموقع (وهمي)
  designation: string;   // صفته
  photoSrc?: any;     // صورة واقعية
  logoSrc?: string;      // لوجو جاهز (اختياري)
  domain?: string;       // دومين الموقع لتوليد اللوجو تلقائيًا
  url?: string;          // رابط الموقع
};

type Props = {
  items?: TestimonialItem[];
  initialIndex?: number;
};

const logoFrom = (item: TestimonialItem) => {
  if (item.logoSrc) return item.logoSrc;
  if (item.domain) return `https://logo.clearbit.com/${item.domain}`;
  const name = encodeURIComponent(item.name || "Client");
  return `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff&size=128`;
};
let  img = img1 ;

const defaultItems: TestimonialItem[] = [
  {
    // customers-eg.com — موقع + SEO
    quote:
      "اشتغلنا مع American Soft على بناء السيستم والموقع الإلكتروني لـ Customers EG، وكمان تولّوا السيو بالكامل. خلال فترة قصيرة اتحسّن الأداء بشكل ملحوظ، وترتيب الكلمات الأساسية تقدّم والزيارات العضوية زادت. تنفيذ منضبط وتواصل واضح في كل المراحل.",
    name: "أحمد راضي",
    designation: "مالك Customers EG",
    photoSrc:img,
    domain: "customers-eg.com",
    url: "http://customers-eg.com/",
  },
  {
    // chiller-egypt.com — موقع + سيستم
    quote:
      "احتجنا موقع احترافي ثنائي اللغة وسيستم بسيط لإدارة المحتوى والاستفسارات. American Soft بنَوا لنا الويب سايت والسيستم بواجهة سريعة ومتوافقة مع الجوال، مع تتبّع دقيق للنماذج وتقارير شهرية. شغل نضيف وتسليم في الميعاد.",
    name: "داليا سمير",
    designation: "مديرة Chiller Egypt",
    photoSrc:img,
    domain: "chiller-egypt.com",
    url: "https://chiller-egypt.com/ar/",
  },
  {
    // american-groups.com — موقع + سيستم
    quote:
      "شركة American Groups كانت محتاجة سيستم لإدارة العملاء وموقع يمثّل الهوية باحترافية. الفريق نفّذ الاتنين بانسيابية—كود نظيف، صفحات سريعة، وتكامل مريح مع البريد والتتبّع. أنصح بيهم لأي شركة عايزة تحول رقمي جدّي.",
    name: "محمود نجيب",
    designation: "المدير التنفيذي American Groups",
    photoSrc:img,
    domain: "american-groups.com",
    url: "https://american-groups.com/",
  },
];

export default function StackedAnimatedTestimonials({
  items = defaultItems,
  initialIndex = 0,
}: Props) {
  const [active, setActive] = useState(initialIndex);
  const quoteRef = useRef<HTMLParagraphElement | null>(null);

  const { t, i18n } = useTranslation();
  const isAr = i18n.language?.startsWith("ar");
  const dir = isAr ? "rtl" : "ltr";

  // تحريك الكلمات + مسافات أوضح
  const words = useMemo(() => items[active].quote.split(" "), [active, items]);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    const kids = Array.from(el.querySelectorAll<HTMLElement>(".word"));
    kids.forEach((w) => {
      w.style.opacity = "0";
      w.style.transform = "translateY(10px)";
      w.style.filter = "blur(10px)";
      w.style.transition = "none";
    });
    kids.forEach((w, i) => {
      setTimeout(() => {
        w.style.transition =
          "opacity 0.22s ease, transform 0.22s ease, filter 0.22s ease";
        w.style.opacity = "1";
        w.style.transform = "translateY(0)";
        w.style.filter = "blur(0)";
      }, i * 18);
    });
  }, [active]);

  const go = (dir: 1 | -1) =>
    setActive((i) => (i + dir + items.length) % items.length);

  // تدوير تلقائي (اختياري)
  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % items.length), 6500);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <section dir={dir} className="w-full max-w-[75em] px-6 py-8 mx-auto">
      {/* بادچ + عنوان */}
      <div
        className="pulse-chip opacity-0 animate-fade-in gap-4 my-20"
        style={{ animationDelay: "0.1s" }}
      >
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white mr-2">
          05
        </span>
        <span>{t("testimonials.whatwesay")}</span>
      </div>

      <div className="grid gap-20 md:grid-cols-2">
        {/* STACKED VISUAL */}
        <div className="relative w-full h-96 [perspective:1000px]" aria-hidden>
          {items.map((it, i) => {
            const offset = i - active;
            const absOffset = Math.abs(offset);
            const zIndex = items.length - absOffset;
            const opacity = i === active ? 1 : 0.78;
            const scale = 1 - absOffset * 0.15;
            const translate = offset === -1 ? "-20%" : offset === 1 ? "20%" : "0%";
            const rotateY = offset === -1 ? "15deg" : offset === 1 ? "-15deg" : "0deg";
            const photo = it.photoSrc ??
              "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1368&auto=format&fit=crop";

            return (
              <div
                key={i}
                className="absolute inset-0 rounded-2xl shadow-xl overflow-hidden transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{
                  zIndex,
                  opacity,
                  transform: `translateY(${translate}) scale(${scale}) rotateY(${rotateY})`,
                }}
              >
                <img
                  src={photo}
                  alt={it.name}
                  draggable={false}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />

                {/* شارة اللوجو + رابط الموقع */}
                <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex items-center gap-2 bg-white/85 backdrop-blur rounded-full px-2 py-1 ring-1 ring-black/5">
                  <img
                    src={logoFrom(it)}
                    alt="logo"
                    className="w-6 h-6 rounded-full object-contain"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      const stage = img.dataset.fallback || "clearbit";
                      if (stage === "clearbit" && it.domain) {
                        img.src = `https://www.google.com/s2/favicons?domain=${it.domain}&sz=64`;
                        img.dataset.fallback = "s2";
                      } else {
                        img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          it.name
                        )}&background=0D8ABC&color=fff&size=128`;
                        img.dataset.fallback = "avatar";
                      }
                    }}
                  />
                  {it.url ? (
                    <a
                      href={it.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-800 hover:underline"
                    >
                      {new URL(it.url).hostname.replace("www.", "")}
                    </a>
                  ) : (
                    <span className="text-xs font-semibold text-slate-800">
                      {it.designation.replace(/«|»/g, "")}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* النص + الكنترول */}
        <div className={isAr ? "text-right flex flex-col justify-between" : "text-left flex flex-col justify-between"}>
          <div>
            <h3 className="text-xl font-bold text-black m-0">{items[active].name}</h3>
            <p className="text-sm text-gray-500 mb-6">{items[active].designation}</p>

            <p
              ref={quoteRef}
              className="text-[1.125rem] leading-8 text-gray-800"
              style={{ wordSpacing: "0.18em" }} // مسافة بين الكلمات
            >
              {words.map((w, i) => (
                <span
                  key={i}
                  className="word inline-block"
                  style={{ marginInlineEnd: "0.18em" }} // كمان مسافة بسيطة بعد كل كلمة
                >
                  {w}{" "}
                </span>
              ))}
            </p>
          </div>

          <div
            className={`flex gap-4 pt-12 md:pt-0 ${isAr ? "justify-start" : "justify-start"}`}
            role="group"
            aria-label={isAr ? "التنقل بين الآراء" : "Testimonials navigation"}
          >
            <button
              type="button"
              aria-label={isAr ? "السابق" : "Previous"}
              onClick={() => go(-1)}
              className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-sky-500 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#f1f1f7]">
                <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>

            <button
              type="button"
              aria-label={isAr ? "التالي" : "Next"}
              onClick={() => go(1)}
              className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-sky-500 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#f1f1f7]">
                <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

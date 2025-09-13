import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18";


export type TestimonialItem = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

type Props = {
  items?: TestimonialItem[];
  initialIndex?: number;
};

const defaultItems: TestimonialItem[] = [
  {
    quote:
      "I was impressed by the food — every dish is bursting with flavor! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive, going the extra mile. I'll definitely be back for more!",
    name: "Tamar Mendelson",
    designation: "Restaurant Critic",
    src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop",
  },
  {
    quote:
      "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond to ensure a fantastic visit. I'll definitely keep returning for more exceptional dining experience.",
    name: "Joe Charlescraft",
    designation: "Frequent Visitor",
    src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop",
  },
  {
    quote:
      "Shining Yam is a hidden gem! From the moment I walked in, I knew I was in for a treat. The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
    name: "Martina Edelweist",
    designation: "Satisfied Customer",
    src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop",
  },
];

export default function StackedAnimatedTestimonials({
  items = defaultItems,
  initialIndex = 0,
}: Props) {
  const [active, setActive] = useState(initialIndex);
  const quoteRef = useRef<HTMLParagraphElement | null>(null);

  // كلمات quote للأنيميشن المتتابع
  const words = useMemo(() => items[active].quote.split(" "), [active, items]);

  // Stagger animation للكلمات كل ما الـactive يتغير
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
          "opacity 0.2s ease-in-out, transform 0.2s ease-in-out, filter 0.2s ease-in-out";
        w.style.opacity = "1";
        w.style.transform = "translateY(0)";
        w.style.filter = "blur(0)";
      }, i * 20);
    });
  }, [active]);

  const go = (dir: 1 | -1) => setActive((i) => (i + dir + items.length) % items.length);

  const { t, i18n } = useTranslation();

  const changLang = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };


  return (
    <div className="w-full max-w-[75em] px-6 py-8 mx-auto  ">

     

      <div className="pulse-chip opacity-0 animate-fade-in gap-4 my-20 " style={{
                animationDelay: "0.1s"
              }}>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white mr-2">05</span>
                <span>{t("testimonials.whatwesay")}</span>
      </div>


      <div className="grid gap-20 md:grid-cols-2">

        
        {/* STACKED IMAGES */}
        <div className="relative w-full h-96 [perspective:1000px]" aria-hidden>
          {items.map((t, i) => {
            const offset = i - active;
            const absOffset = Math.abs(offset);
            const zIndex = items.length - absOffset;
            const opacity = i === active ? 1 : 0.7;
            const scale = 1 - absOffset * 0.15;
            const translateY = offset === -1 ? "-20%" : offset === 1 ? "20%" : "0%";
            const rotateY = offset === -1 ? "15deg" : offset === 1 ? "-15deg" : "0deg";

            return (
              <img
                key={i}
                src={t.src}
                alt={t.name}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-xl transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{
                  zIndex,
                  opacity,
                  transform: `translateY(${translateY}) scale(${scale}) rotateY(${rotateY})`,
                }}
              />
            );
          })}
        </div>

        {/* CONTENT + CONTROLS */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-black m-0">{items[active].name}</h3>
            <p className="text-sm text-gray-500 mb-6">{items[active].designation}</p>

            <p ref={quoteRef} className="text-[1.125rem] leading-7 text-gray-700">
              {words.map((w, i) => (
                <span key={i} className="word inline-block">
                  {w}{" "}
                </span>
              ))}
            </p>
          </div>

          <div
            className="flex gap-4 pt-12 md:pt-0"
            role="group"
            aria-label="Testimonials navigation"
          >
            <button
              type="button"
              aria-label="Previous"
              onClick={() => go(-1)}
              className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-sky-500 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#f1f1f7] group-hover:fill-white">
                <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Next"
              onClick={() => go(1)}
              className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-sky-500 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#f1f1f7] group-hover:fill-white">
                <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>





      </div>





    </div>
  );
}

import Footer from "@/components/Footer/Footer";
import SecNavbar from "@/components/SecNavbar";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type QAItem = { q: string; a: string };

function toJsonLd(items: readonly QAItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export default function AmericanSoftFAQ({ rtl }: { rtl?: boolean }) {
  const { t, i18n } = useTranslation();
  const isAr = rtl ?? i18n.language?.startsWith("ar");
  const dir = isAr ? "rtl" : "ltr";

  // نسحب الأسئلة من i18n (كمصفوفة كائنات)
  const QA = t("faq.items", { returnObjects: true }) as QAItem[];

  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return QA;
    return QA.filter((item) =>
      (item.q + " " + item.a).toLowerCase().includes(q)
    );
  }, [QA, query]);

  const jsonLd = useMemo(() => toJsonLd(QA), [QA]);

  return (
    <>
    <SecNavbar/>
    <section dir={dir} className="w-full bg-white pt-64 pb-32 ">

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            {t("faq.title")}
          </h2>
          <p className="mt-2 text-slate-600">{t("faq.subtitle")}</p>
        </header>

        {/* Search */}
        <div className="mb-6">
          <label className="sr-only" htmlFor="faq-search">
            {t("faq.searchLabel")}
          </label>
          <input
            id="faq-search"
            placeholder={t("faq.searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          />
        </div>

        {/* Accordion */}
        <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {filtered.map((item, idx) => (
            <details key={idx} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                  {item.q}
                </h3>
                <span className="shrink-0 rounded-full border border-slate-300 p-1 text-slate-500 transition group-open:rotate-180">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 8l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-4 pb-5 text-slate-700 sm:px-5">
                <p className="leading-7">{item.a}</p>
              </div>
            </details>
          ))}
          {filtered.length === 0 && (
            <div className="p-6 text-slate-600">{t("faq.noResults")}</div>
          )}
        </div>

        {/* Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </section>
    <Footer/>
    </>
  );
}

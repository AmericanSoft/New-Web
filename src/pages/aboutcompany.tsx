import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import SecNavbar from "@/components/SecNavbar";
import Footer from "@/components/Footer/Footer";
import { useQuoteModal } from "../components/QuoteModalContext";

// أيقونات
import {
  RiCodeView,
  RiSmartphoneLine,
  RiBarChart2Line,
  RiRocketLine,
  RiShieldCheckLine,
  RiCloudLine,
} from "react-icons/ri";
import { TbSeo } from "react-icons/tb";
import { FaPaintbrush } from "react-icons/fa6";

type Stat = { label: string; value: string; note?: string };
type Step = { title: string; desc: string };
type ValueItem = { title: string; desc: string };

// fallback helper يرجّع Array حتى لو المفتاح مش Array
const tArray = <T = unknown>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

export default function AboutPage({ rtl }: { rtl?: boolean }) {
  const { t, i18n } = useTranslation();
  const isAr = rtl ?? i18n.language?.startsWith("ar");
  const dir = isAr ? "rtl" : "ltr";
  const { open } = useQuoteModal();

  // بيانات meta
  const brand = t("about.meta.brand");
  const company = t("about.meta.company");
  const email = t("about.meta.email");
  const phone = t("about.meta.phone");
  const address = t("about.meta.address");
  const website = t("about.meta.website");

  // بيانات الأقسام
  const stats = tArray<Stat>(t("about.stats.items", { returnObjects: true }));
  const steps = tArray<Step>(t("about.process.steps", { returnObjects: true }));
  const values = tArray<ValueItem>(t("about.values.items", { returnObjects: true }));
  const stack = tArray<string>(t("about.stack.items", { returnObjects: true }));

  // Highlights نصوص من i18n + أيقونات ثابتة مرتّبة لتعبّر عن كل نقطة
  const highlightTexts = tArray<string>(t("about.highlights", { returnObjects: true }));
  const highlightIcons = [
    RiCodeView,        // برمجيات مخصّصة/كود نظيف
    RiSmartphoneLine,  // موبايل
    TbSeo,             // سيو
    RiBarChart2Line,   // أداء/قياس/نتائج
    RiRocketLine,      // إطلاق سريع/نمو
    RiShieldCheckLine, // أمان/خصوصية
    RiCloudLine,       // سحابة/نشر
    FaPaintbrush,      // تصميم/واجهة
  ];
  const highlights = highlightTexts.map((text, i) => ({
    text,
    Icon: highlightIcons[i % highlightIcons.length],
  }));

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: t("about.seo.title", { brand }),
      description: t("about.seo.desc", { brand }),
      url: `${website}/about`,
      mainEntity: {
        "@type": "Organization",
        name: company,
        brand: brand,
        url: website,
        email: email,
        telephone: phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: address,
          addressCountry: "EG",
        },
      },
    }),
    [brand, company, website, email, phone, address, t]
  );

  return (
    <>
      {SecNavbar && <SecNavbar />}

      <section dir={dir} className="w-full bg-white pt-40 sm:pt-48 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <header className="text-center mb-10 sm:mb-14">
            <span className="inline-block rounded-full border px-3 py-1 text-xs font-semibold text-slate-600 mb-3">
              {t("about.badge")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              {t("about.title")}
            </h1>
            <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-3xl mx-auto">
              {t("about.subtitle")}
            </p>
          </header>

          {/* Highlights (كل كارت بأيقونة مختلفة) */}
          <section className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {highlights.map(({ text, Icon }, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 ring-1 ring-red-100">
                    <Icon className="h-5 w-5 text-black-700" aria-hidden />
                  </span>
                  <p className="text-slate-800">{text}</p>
                </div>
              </div>
            ))}
            {/* لو مفيش هايلايت في i18n، بنعرض أمثلة افتراضية */}
            {highlights.length === 0 &&
              [
                { text: isAr ? "برمجيات مخصّصة قابلة للتوسّع" : "Custom, scalable software", Icon: RiCodeView },
                { text: isAr ? "تطبيقات موبايل حديثة" : "Modern mobile apps", Icon: RiSmartphoneLine },
                { text: isAr ? "سيو متكامل بقياس النتائج" : "Full-stack SEO with metrics", Icon: TbSeo },
              ].map(({ text, Icon }, i) => (
                <div key={`f-${i}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 ring-1 ring-teal-100">
                      <Icon className="h-5 w-5 text-teal-700" aria-hidden />
                    </span>
                    <p className="text-slate-800">{text}</p>
                  </div>
                </div>
              ))}
          </section>

          {/* Stats */}
          <section className="mb-14">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                  <div className="text-3xl font-extrabold text-slate-900">{s.value}</div>
                  <div className="mt-1 text-sm font-medium text-slate-700">{s.label}</div>
                  {s.note && <div className="mt-1 text-xs text-slate-500">{s.note}</div>}
                </div>
              ))}
            </div>
          </section>

          {/* Mission / Vision / Values */}
          <section className="grid gap-6 lg:grid-cols-3 mb-14">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t("about.mission.title")}</h3>
              <p className="text-slate-700">{t("about.mission.desc")}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t("about.vision.title")}</h3>
              <p className="text-slate-700">{t("about.vision.desc")}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t("about.values.title")}</h3>
              <ul className="space-y-2">
                {values.map((v, i) => (
                  <li key={i}>
                    <span className="font-semibold text-slate-900">{v.title}:</span>{" "}
                    <span className="text-slate-700">{v.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Process */}
          <section className="mb-14">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{t("about.process.title")}</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {steps.map((st, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-sm text-slate-500 mb-1">
                    {t("about.process.stepLabel", { n: i + 1 })}
                  </div>
                  <div className="text-lg font-semibold text-slate-900">{st.title}</div>
                  <p className="mt-1 text-slate-700">{st.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="mb-14">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-3">{t("about.stack.title")}</h3>
            <div className="flex flex-wrap gap-2">
              {stack.map((tag, i) => (
                <span
                  key={i}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-3xl border border-slate-200 bg-gradient-to-tr from-red-50 to-white p-6 sm:p-8 shadow-sm text-center">
            <h4 className="text-xl sm:text-2xl font-bold text-slate-900">{t("about.cta.title")}</h4>
            <p className="mt-2 text-slate-700">{t("about.cta.desc")}</p>
            <a
              href="#quote"
              onClick={(e) => {
                e.preventDefault();
                open();
              }}
              className="mt-4 inline-block rounded-xl border border-red-600 px-5 py-3 text-sm font-medium text-black-700 hover:bg-red-700 hover:text-white"
            >
              {t("about.cta.btn")}
            </a>
            <p className="mt-3 text-sm text-black-600">
              {t("about.contactLine")} <span className="font-medium"><a href="tel:+201080002209">{phone}</a></span>
            </p>
          </section>

          {/* Schema JSON-LD */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </div>
      </section>

      {Footer && <Footer />}
    </>
  );
}

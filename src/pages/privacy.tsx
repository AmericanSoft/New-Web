import Footer from "@/components/Footer/Footer";
import SecNavbar from "@/components/SecNavbar";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

/**
 * PrivacyPolicyPage (i18n-ready)
 * - نصوص من i18next عبر privacy.*
 * - RTL/LTR تلقائي + محاذاة نص حسب اللغة
 * - JSON-LD
 */

type PrivacyProps = {
  brand?: string;
  companyName?: string;
  email?: string;
  address?: string;
  phone?: string;
  website?: string;
  lastUpdated?: string;
  rtl?: boolean; // اختياري: لو حابب تُجبر الاتجاه يدويًا
};

const SECTIONS = [
  { id: "intro", key: "toc.intro" },
  { id: "data-we-collect", key: "toc.data" },
  { id: "how-we-use", key: "toc.use" },
  { id: "legal-bases", key: "toc.legal" },
  { id: "cookies", key: "toc.cookies" },
  { id: "analytics", key: "toc.analytics" },
  { id: "sharing", key: "toc.sharing" },
  { id: "retention", key: "toc.retention" },
  { id: "security", key: "toc.security" },
  { id: "international", key: "toc.international" },
  { id: "your-rights", key: "toc.rights" },
  { id: "children", key: "toc.children" },
  { id: "changes", key: "toc.changes" },
  { id: "contact", key: "toc.contact" },
] as const;

export default function PrivacyPolicyPage({
  brand,
  companyName,
  email,
  address,
  phone,
  website,
  lastUpdated,
  rtl, // لاحظ: مفيش قيمة افتراضية هنا
}: PrivacyProps) {
  const { t, i18n } = useTranslation();

  // لو rtl مُمرّر، استخدمه. وإلا حدّد من لغة i18n.
  const isAr = rtl ?? i18n.language?.startsWith("ar");
  const dir = isAr ? "rtl" : "ltr";
  const align = isAr ? "text-right" : "text-left";

  // استخدم قيم props أولاً، وإلا خذها من i18n
  const brandV = brand ?? t("privacy.brand");
  const companyV = companyName ?? t("privacy.company");
  const emailV = email ?? t("privacy.email");
  const addressV = address ?? t("privacy.address");
  const phoneV = phone ?? t("privacy.phone");
  const websiteV = website ?? t("privacy.website");
  const lastUpdatedV = lastUpdated ?? t("privacy.lastUpdatedFallback");

  const pageTitle = t("privacy.headerTitle", { brand: brandV });
  const jsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: pageTitle,
      url: `${websiteV}/privacy`,
      isPartOf: {
        "@type": "WebSite",
        name: brandV,
        url: websiteV,
      },
      about: {
        "@type": "Organization",
        name: companyV,
        url: websiteV,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: emailV,
            telephone: phoneV,
            areaServed: "EG",
            availableLanguage: ["ar", "en"],
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: addressV,
          addressCountry: "EG",
        },
      },
      dateModified: lastUpdatedV,
    } as const;
  }, [addressV, brandV, companyV, emailV, pageTitle, phoneV, websiteV, lastUpdatedV]);

  return (
    <>
      <SecNavbar />
      {/* اجعل الاتجاه + المحاذاة على الجذر */}
      <section
        dir={dir}
        lang={isAr ? "ar" : "en"}
        className={`w-full bg-white pt-64 pb-132 ${align}`}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 rtl:text-right ltr:text-left">
              {pageTitle}
            </h1>
            <p className="mt-2 text-sm text-slate-600 rtl:text-right ltr:text-left">
              {t("privacy.lastUpdatedLabel")} {lastUpdatedV}
            </p>
          </header>

          {/* ToC */}
          <nav
            aria-label={t("privacy.tocTitle")}
            className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 rtl:text-right ltr:text-left"
          >
            <p className="mb-2 text-sm font-semibold text-slate-700">
              {t("privacy.tocTitle")}
            </p>
            {/* استخدم padding منطقي يشتغل مع RTL/LTR */}
            <ol className="list-decimal ps-5 text-sm text-slate-700 space-y-1">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-teal-700">
                    {t(`privacy.${s.key}`)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Body */}
          <article className="prose prose-slate max-w-none text-start rtl:prose-headings:text-right rtl:prose-p:text-right">
            <section id="intro" className="scroll-mt-24">
              <h2 className="rtl:text-right ltr:text-left">{t("privacy.toc.intro")}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: t("privacy.intro.p1", { brand: brandV, company: companyV }),
                }}
              />
            </section>

            <section id="data-we-collect" className="scroll-mt-24">
              <h2 className="rtl:text-right ltr:text-left">{t("privacy.toc.data")}</h2>
              <ul>
                <li dangerouslySetInnerHTML={{ __html: t("privacy.data.li1") }} />
                <li dangerouslySetInnerHTML={{ __html: t("privacy.data.li2") }} />
                <li dangerouslySetInnerHTML={{ __html: t("privacy.data.li3") }} />
                <li dangerouslySetInnerHTML={{ __html: t("privacy.data.li4") }} />
              </ul>
            </section>

            <section id="how-we-use" className="scroll-mt-24">
              <h2 className="rtl:text-right ltr:text-left">{t("privacy.toc.use")}</h2>
              <ul>
                <li>{t("privacy.use.li1")}</li>
                <li>{t("privacy.use.li2")}</li>
                <li>{t("privacy.use.li3")}</li>
                <li>{t("privacy.use.li4")}</li>
              </ul>
            </section>

            <section id="legal-bases" className="scroll-mt-24">
              <h2 className="rtl:text-right ltr:text-left">{t("privacy.toc.legal")}</h2>
              <p>{t("privacy.legal.p1")}</p>
            </section>

            <section id="cookies" className="scroll-mt-24">
              <h2 className="rtl:text-right ltr:text-left">{t("privacy.toc.cookies")}</h2>
              <p>{t("privacy.cookies.p1")}</p>
            </section>

            <section id="analytics" className="scroll-mt-24">
              <h2 className="rtl:text-right ltr:text-left">{t("privacy.toc.analytics")}</h2>
              <p>{t("privacy.analytics.p1")}</p>
            </section>

            <section id="sharing" className="scroll-mt-24">
              <h2 className="rtl:text-right ltr:text-left">{t("privacy.toc.sharing")}</h2>
              <ul>
                <li>{t("privacy.sharing.li1")}</li>
                <li>{t("privacy.sharing.li2")}</li>
                <li>{t("privacy.sharing.li3")}</li>
              </ul>
            </section>

            <section id="retention" className="scroll-mt-24">
              <h2 className="rtl:text-right ltr:text-left">{t("privacy.toc.retention")}</h2>
              <p>{t("privacy.retention.p1")}</p>
            </section>

            <section id="security" className="scroll-mt-24">
              <h2 className="rtl:text-right ltr:text-left">{t("privacy.toc.security")}</h2>
              <p>{t("privacy.security.p1")}</p>
            </section>

            <section id="international" className="scroll-mt-24">
              <h2 className="rtl:text-right ltr:text-left">{t("privacy.toc.international")}</h2>
              <p>{t("privacy.international.p1")}</p>
            </section>

            <section id="your-rights" className="scroll-mt-24">
              <h2 className="rtl:text-right ltr:text-left">{t("privacy.toc.rights")}</h2>
              <ul>
                <li>{t("privacy.rights.li1")}</li>
                <li>{t("privacy.rights.li2")}</li>
                <li>{t("privacy.rights.li3")}</li>
                <li>{t("privacy.rights.li4")}</li>
              </ul>
              <p>
                {t("privacy.rights.cta")}{" "}
                <a className="text-teal-700 hover:underline" href={`mailto:${emailV}`}>
                  {emailV}
                </a>
                .
              </p>
            </section>

            <section id="children" className="scroll-mt-24">
              <h2 className="rtl:text-right ltr:text-left">{t("privacy.toc.children")}</h2>
              <p>{t("privacy.children.p1")}</p>
            </section>

            <section id="changes" className="scroll-mt-24">
              <h2 className="rtl:text-right ltr:text-left">{t("privacy.toc.changes")}</h2>
              <p>{t("privacy.changes.p1")}</p>
            </section>

            <section id="contact" className="scroll-mt-24">
              <h2 className="rtl:text-right ltr:text-left">{t("privacy.toc.contact")}</h2>
              <p className="leading-7">
                {t("privacy.contact.email")}:{" "}
                <a className="text-teal-700 hover:underline" href={`mailto:${emailV}`}>
                  {emailV}
                </a>
                <br />
                {t("privacy.contact.phone")}:{" "}
                <a className="text-teal-700 hover:underline" href={`tel:${phoneV}`}>
                  {phoneV}
                </a>
                <br />
                {t("privacy.contact.address")}: {addressV}
              </p>
            </section>
          </article>

          {/* Schema JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

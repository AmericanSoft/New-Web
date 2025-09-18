import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
// اختياري لو عندك
import SecNavbar from "@/components/SecNavbar";
import Footer from "@/components/Footer/Footer";
import { useQuoteModal } from "../components/QuoteModalContext";


type ServicePageTemplateProps = {
  baseKey: string; // مثال: "service.android" أو "service.ios" أو "service.desktop"
  coverUrl?: string;
  rtl?: boolean;
};

export default function ServicePageTemplate({ baseKey, coverUrl, rtl }: ServicePageTemplateProps) {
  const { t, i18n } = useTranslation();
  const isAr = rtl ?? i18n.language?.startsWith("ar");
  const dir = isAr ? "rtl" : "ltr";

  const brand = t("about.meta.brand");
  const email = t("about.meta.email");
  const phone = t("about.meta.phone");
  const website = t("about.meta.website");

  const title = t(`${baseKey}.title`);
  const subtitle = t(`${baseKey}.subtitle`);
  const features = (t(`${baseKey}.features`, { returnObjects: true }) as string[]) || [];
  const benefits = (t(`${baseKey}.benefits`, { returnObjects: true }) as string[]) || [];
  const stack = (t(`${baseKey}.stack`, { returnObjects: true }) as string[]) || [];
  const { open } = useQuoteModal();
  

  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    serviceType: t(`${baseKey}.serviceType`, { defaultValue: title }),
    provider: {
      "@type": "Organization",
      name: brand,
      email,
      telephone: phone,
      url: website,
      address: { "@type": "PostalAddress", streetAddress: t("about.meta.address"), addressCountry: "EG" }
    },
    areaServed: ["EG", "MENA"],
    url: `${website}/${baseKey.split(".")[1] || "service"}`,
    description: subtitle
  }), [title, baseKey, brand, email, phone, website, subtitle, t]);

  return (
    <>
      {SecNavbar && <SecNavbar />}

      <section dir={dir} className="w-full bg-white pt-40 sm:pt-48 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <header className="text-center mb-8 sm:mb-12">
            {coverUrl && (
              <img
                src={coverUrl}
                alt={title}
                className="mx-auto mb-6 h-48 w-full max-w-5xl rounded-3xl object-cover"
                loading="eager"
              />
            )}
            <span className="inline-block rounded-full border px-3 py-1 text-xs font-semibold text-slate-600 mb-3">
              {t(`${baseKey}.badge`)}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              {title}
            </h1>
            <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-3xl mx-auto">{subtitle}</p>
          </header>

          {/* Features */}
          <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-slate-800">{f}</p>
              </div>
            ))}
          </section>

          {/* Benefits */}
          <section className="mb-10">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{t(`${baseKey}.benefitsTitle`)}</h3>
            <ul className="grid gap-3 list-disc marker:text-teal-600 ps-6">
              {benefits.map((b, i) => (
                <li key={i} className="text-slate-700">{b}</li>
              ))}
            </ul>
          </section>

          {/* Tech Stack */}
          <section className="mb-12">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-3">{t(`${baseKey}.stackTitle`)}</h3>
            <div className="flex flex-wrap gap-2">
              {stack.map((tag, i) => (
                <span key={i} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-3xl border border-slate-200 bg-gradient-to-tr from-red-50 to-white p-6 sm:p-8 shadow-sm text-center">
            <h4 className="text-xl sm:text-2xl font-bold text-slate-900">{t(`${baseKey}.cta.title`)}</h4>
            <p className="mt-2 text-slate-700">{t(`${baseKey}.cta.desc`)}</p>
            <a
              
              className="mt-4 inline-block rounded-xl border border-red-600 px-5 py-3 text-sm font-medium text-black-700 hover:bg-red-700 hover:text-white cursor-pointer"
              onClick={open}

            >
              {t(`${baseKey}.cta.btn`)}
            </a>
             <p className="mt-3 text-sm text-black-600">
              {t("about.contactLine")} <span className="font-medium"><a href="tel:+201080002209">{phone}</a></span>
            </p>
          </section>

          {/* JSON-LD */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </div>
      </section>

      {Footer && <Footer />}
    </>
  );
}

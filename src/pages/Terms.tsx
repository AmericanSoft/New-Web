import Footer from "@/components/Footer/Footer";
import SecNavbar from "@/components/SecNavbar";
import React from "react";
import { useTranslation } from "react-i18next";

type TermsProps = {
  companyName?: string;
  brand?: string;
  email?: string;
  address?: string;
  phone?: string;
  lastUpdated?: string;
  rtl?: boolean; // اختياري لو عايز تجبر الاتجاه يدويًا
};

const SECTIONS = [
  { id: "acceptance", key: "acceptance" },
  { id: "definitions", key: "definitions" },
  { id: "scope", key: "scope" },
  { id: "accounts", key: "accounts" },
  { id: "payments", key: "payments" },
  { id: "content", key: "content" },
  { id: "acceptable-use", key: "acceptableUse" },
  { id: "warranty", key: "warranty" },
  { id: "liability", key: "liability" },
  { id: "changes", key: "changes" },
  { id: "termination", key: "termination" },
  { id: "law", key: "law" },
  { id: "contact", key: "contact" },
] as const;

export default function TermsPage({
  companyName,
  brand,
  email,
  address,
  phone,
  lastUpdated,
  rtl,
}: TermsProps) {
  const { t, i18n } = useTranslation();
  const isAr = rtl ?? i18n.language?.startsWith("ar");
  const dir = isAr ? "rtl" : "ltr";

  // لو props مش متوفرة ناخدهم من i18n
  const companyV = companyName ?? t("terms.company");
  const brandV = brand ?? t("terms.brand");
  const emailV = email ?? t("terms.email");
  const addressV = address ?? t("terms.address");
  const phoneV = phone ?? t("terms.phone");
  const lastUpdatedV = lastUpdated ?? t("terms.lastUpdatedFallback");

  const pageTitle = t("terms.headerTitle", { brand: brandV });

  return (
    <>
    <SecNavbar/>
    <section dir={dir} className="w-full bg-white pt-64 pb-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 rtl:text-right ltr:text-left">
            {pageTitle}
          </h1>
          <p className="mt-2 text-sm text-slate-600 rtl:text-right ltr:text-left">
            {t("terms.lastUpdatedLabel")} {lastUpdatedV}
          </p>
        </header>

        {/* ToC */}
        <nav
          aria-label={t("terms.tocTitle")}
          className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 rtl:text-right ltr:text-left"
        >
          <p className="mb-2 text-sm font-semibold text-slate-700">
            {t("terms.tocTitle")}
          </p>
          <ol className="list-decimal ps-5 text-sm text-slate-700 space-y-1">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:text-teal-700">
                  {t(`terms.toc.${s.key}`)}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Body */}
        <article className="prose prose-slate max-w-none text-start rtl:prose-headings:text-right rtl:prose-p:text-right">
          {/* Acceptance */}
          <section id="acceptance" className="scroll-mt-24">
            <h2>{t("terms.toc.acceptance")}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: t("terms.sections.acceptance.p1", {
                  brand: brandV,
                  company: companyV,
                }),
              }}
            />
          </section>

          {/* Definitions */}
          <section id="definitions" className="scroll-mt-24">
            <h2>{t("terms.toc.definitions")}</h2>
            <ul>
              <li
                dangerouslySetInnerHTML={{ __html: t("terms.sections.definitions.li1") }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t("terms.sections.definitions.li2") }}
              />
              <li
                dangerouslySetInnerHTML={{ __html: t("terms.sections.definitions.li3") }}
              />
            </ul>
          </section>

          {/* Scope */}
          <section id="scope" className="scroll-mt-24">
            <h2>{t("terms.toc.scope")}</h2>
            <p>{t("terms.sections.scope.p1")}</p>
          </section>

          {/* Accounts & Privacy */}
          <section id="accounts" className="scroll-mt-24">
            <h2>{t("terms.toc.accounts")}</h2>
            <p>{t("terms.sections.accounts.p1")}</p>
          </section>

          {/* Payments */}
          <section id="payments" className="scroll-mt-24">
            <h2>{t("terms.toc.payments")}</h2>
            <ul>
              <li>{t("terms.sections.payments.li1")}</li>
              <li>{t("terms.sections.payments.li2")}</li>
              <li>{t("terms.sections.payments.li3")}</li>
            </ul>
          </section>

          {/* IP */}
          <section id="content" className="scroll-mt-24">
            <h2>{t("terms.toc.content")}</h2>
            <ul>
              <li>{t("terms.sections.content.li1")}</li>
              <li>{t("terms.sections.content.li2")}</li>
              <li>{t("terms.sections.content.li3")}</li>
            </ul>
          </section>

          {/* Acceptable Use */}
          <section id="acceptable-use" className="scroll-mt-24">
            <h2>{t("terms.toc.acceptableUse")}</h2>
            <ul>
              <li>{t("terms.sections.acceptableUse.li1")}</li>
              <li>{t("terms.sections.acceptableUse.li2")}</li>
              <li>{t("terms.sections.acceptableUse.li3")}</li>
            </ul>
          </section>

          {/* Warranty */}
          <section id="warranty" className="scroll-mt-24">
            <h2>{t("terms.toc.warranty")}</h2>
            <p>{t("terms.sections.warranty.p1")}</p>
          </section>

          {/* Liability */}
          <section id="liability" className="scroll-mt-24">
            <h2>{t("terms.toc.liability")}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: t("terms.sections.liability.p1", { company: companyV }),
              }}
            />
          </section>

          {/* Changes */}
          <section id="changes" className="scroll-mt-24">
            <h2>{t("terms.toc.changes")}</h2>
            <p>{t("terms.sections.changes.p1")}</p>
          </section>

          {/* Termination */}
          <section id="termination" className="scroll-mt-24">
            <h2>{t("terms.toc.termination")}</h2>
            <p>{t("terms.sections.termination.p1")}</p>
          </section>

          {/* Governing Law */}
          <section id="law" className="scroll-mt-24">
            <h2>{t("terms.toc.law")}</h2>
            <p>{t("terms.sections.law.p1")}</p>
          </section>

          {/* Contact */}
          <section id="contact" className="scroll-mt-24">
            <h2>{t("terms.toc.contact")}</h2>
            <p className="leading-7">
              {companyV} — {brandV}
              <br />
              {t("terms.sections.contact.email")}:{" "}
              <a className="text-teal-700 hover:underline" href={`mailto:${emailV}`}>
                {emailV}
              </a>
              <br />
              {t("terms.sections.contact.phone")}:{" "}
              <a className="text-teal-700 hover:underline" href={`tel:${phoneV}`}>
                {phoneV}
              </a>
              <br />
              {t("terms.sections.contact.address")}: {addressV}
            </p>
          </section>
        </article>
      </div>
    </section>
    <Footer/>
    </>
  );
}

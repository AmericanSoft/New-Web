// ContactPage.tsx
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import heroBG from "../../public/background-section1.png";
import formBG from "../../public/background-section2.png";
import infoBG from "../../public/background-section3.png";

import SecNavbar from "@/components/SecNavbar";
import Footer from "../components/Footer/Footer";

import countries from "world-countries";

type FormDataState = {
  fullName: string;
  email: string;
  phone: string;    // 10 أرقام محلية
  country: string;  // EG, SA, ...
  company: string;
  Subject: string;
  notes: string;
};

type CountryOpt = { code: string; name: string; dial: string };

const API_CONTACT = "https://sfgukli.american-softwares.com/api/contact-us";

const SUBJECT_TO_CATEGORY: Record<string, string> = {
  web_design: "Web Design",
  mobile_app: "Mobile Application",
  custom_software: "Custom Software",
  seo_strategy: "Seo Strategy",
  portfolio_examples: "Portfolio / Examples",
};

function buildCountryOptions(): CountryOpt[] {
  return countries
    .map((c) => {
      const name = (c.name as any)?.common || c.name?.official || c.cca2;
      const root = c.idd?.root || "";
      const suf = (c.idd?.suffixes && c.idd.suffixes[0]) || "";
      const dial = root && (root + suf) ? `${root}${suf}` : root || "";
      return { code: c.cca2, name, dial }; // مثال: +20, +966
    })
    .filter((c) => c.code)
    .sort((a, b) => a.name.localeCompare(b.name));
}

// خريطة أطوال محلية (10 للدول الشائعة)
const LOCAL_LEN: Record<string, number> = {
  EG: 10,
  SA: 10,
  AE: 10,
  US: 10,
  GB: 10,
};
const getLocalLen = (cc: string) => LOCAL_LEN[cc] ?? 10;

// خريطة كود اتصال بدون +
function buildDialMap(opts: CountryOpt[]) {
  const map: Record<string, string> = {};
  for (const c of opts) {
    const d = (c.dial || "").replace("+", "").trim();
    if (c.code && d) map[c.code] = d;
  }
  return map;
}

// نجهّز رقمين محتملين للباك: primary + fallback
function buildCandidates(
  cc: string,
  local10: string,
  dialMap: Record<string, string>
) {
  const digits = (local10 || "").replace(/\D+/g, "");
  const dial = dialMap[cc] || "";
  const noLeadZeros = digits.replace(/^0+/, "");

  if (cc === "EG") {
    // EG: جرب 0 + 10 (محلي) ثم E.164
    const primary = `0${digits}`;              // مثال: 010xxxxxxxx
    const fallback = dial ? `+${dial}${noLeadZeros}` : primary; // +2010xxxxxxx
    return { primary, fallback };
  }

  // باقي الدول: جرب E.164 ثم المحلي (10 أرقام)
  const primary = dial ? `+${dial}${noLeadZeros}` : digits;
  const fallback = digits;
  return { primary, fallback };
}

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const isRTL = dir === "rtl";

  const COUNTRIES = useMemo(buildCountryOptions, []);
  const DIAL_BY_CODE = useMemo(() => buildDialMap(COUNTRIES), [COUNTRIES]);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataState>({
    fullName: "",
    email: "",
    phone: "",
    country: "EG",
    company: "",
    Subject: "",
    notes: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const SUBJECT_OPTIONS = useMemo(
    () => [
      { value: "web_design", label: t("form.subject.options.web_design") || "Web Design" },
      { value: "mobile_app", label: t("form.subject.options.mobile_app") || "Mobile Application" },
      { value: "custom_software", label: t("form.subject.options.custom_software") || "Custom Software" },
      { value: "seo_strategy", label: t("form.subject.options.seo_strategy") || "SEO Strategy" },
      { value: "portfolio_examples", label: t("form.subject.options.portfolio_examples") || "Portfolio / Examples" },
    ],
    [t]
  );

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "country") {
      const len = getLocalLen(value);
      setFormData((p) => ({
        ...p,
        country: value,
        phone: (p.phone || "").replace(/\D+/g, "").slice(0, len),
      }));
      return;
    }
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // الهاتف: أرقام فقط وبحد أقصى الطول المطلوب (10 عادة)
  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const len = getLocalLen(formData.country);
    const digitsOnly = e.target.value.replace(/\D+/g, "").slice(0, len);
    setFormData((p) => ({ ...p, phone: digitsOnly }));
  };

  async function postOnce(payload: any) {
    const res = await fetch(API_CONTACT, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const ct = res.headers.get("content-type") || "";
    const body = ct.includes("application/json") ? await res.json() : await res.text();
    return { res, body };
  }

  function isMobileFormatError(body: any) {
    if (typeof body === "string") {
      return /mobile number.*format.*invalid/i.test(body);
    }
    if (body?.message && /format.*invalid/i.test(String(body.message))) return true;
    if (body?.errors?.mobile_number) {
      const msg = String(body.errors.mobile_number[0] || "");
      return /format.*invalid/i.test(msg);
    }
    return false;
    }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);

    const data = {
      fullName: (fd.get("fullName") as string || "").trim(),
      email: (fd.get("email") as string || "").trim(),
      phone: (fd.get("phone") as string || "").trim(),
      country: (fd.get("country") as string || formData.country).toString(),
      company: (fd.get("company") as string || "").trim(),
      Subject: (fd.get("Subject") as string || "").trim(),
      notes: (fd.get("notes") as string || "").trim(),
    };

    const needLen = getLocalLen(data.country);
    const missing: string[] = [];
    if (!data.fullName) missing.push(t("form.username") || "Your Name");
    if (!data.email) missing.push(t("form.mail") || "Your Email");
    if (!data.phone || data.phone.replace(/\D+/g, "").length !== needLen)
      missing.push(`${t("form.phone") || "Phone"} (${needLen} digits)`);
    if (!data.Subject) missing.push(t("form.subject.placeholder") || "Subject");
    if (missing.length) {
      toast.error(
        `${t("form.validationRequired") || "Please fill in all required fields"}: ${missing.join("، ")}`
      );
      return;
    }

    // جهّز المرشحين (primary + fallback)
    const { primary, fallback } = buildCandidates(data.country, data.phone, DIAL_BY_CODE);

    const basePayload = {
      name: data.fullName,
      email: data.email,
      country: data.country,
      company_name: data.company,
      category_name: SUBJECT_TO_CATEGORY[data.Subject] || data.Subject,
      message: data.notes,
    };

    try {
      setLoading(true);

      // 1) جرّب الـ primary
      let { res, body } = await postOnce({ ...basePayload, mobile_number: primary });

      // 2) لو رفض الباك صيغة الموبايل، جرّب fallback تلقائيًا
      if (!res.ok && res.status === 422 && isMobileFormatError(body) && fallback !== primary) {
        const retry = await postOnce({ ...basePayload, mobile_number: fallback });
        res = retry.res;
        body = retry.body;
      }

      if (!res.ok) {
        const serverMsg =
          typeof body === "string"
            ? body
            : body?.message ||
              (body?.errors
                ? Object.values(body.errors as Record<string, string[]>).flat()?.[0]
                : "");
        throw new Error(serverMsg || "Request failed");
      }

      toast.success(t("form.submitSuccess") || "Request submitted successfully!");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        country: "EG",
        company: "",
        Subject: "",
        notes: "",
      });
      formRef.current?.reset();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || (t("errors.tryAgain") || "تعذر الإرسال الآن. حاول لاحقًا."));
    } finally {
      setLoading(false);
    }
  };

  const notesCount = formData.notes?.length || 0;
  const needLen = getLocalLen(formData.country);
  const phonePattern = `\\d{${needLen}}`;
  const phonePlaceholder =
    formData.country === "EG"
      ? `XXXXXXXXXX (${needLen} digits, بدون 0 في الأول)`
      : `XXXXXXXXXX`.slice(0, needLen) + ` (${needLen} digits)`;

  return (
    <>
      <SecNavbar />

      {/* HERO */}
      <section dir={dir} className="relative w-full bg-white pt-28 sm:pt-36">
        <div className="relative overflow-hidden rounded-none sm:rounded-2xl mx-auto max-w-7xl" style={{ minHeight: 260 }}>
          <img src={heroBG} alt="" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <h1 className={["text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white", isRTL ? "text-right" : "text-left"].join(" ")}>
              {t("contactus.constactus") || "تواصل معنا"}
            </h1>
            <p className={["mt-3 text-white/90 max-w-2xl", isRTL ? "text-right ml-auto" : "text-left"].join(" ")}>
              {t("contactus.titlecontactus") || "التواصل الآن أصبح سهلًا — أخبرنا باحتياجك وسنعود إليك بخطة تنفيذ واضحة."}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section dir={dir} className="w-full bg-white py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Info */}
            <aside className="lg:col-span-1 rounded-2xl overflow-hidden shadow-elegant ring-1 ring-gray-100">
              <div
                className="relative h-48 p-6 sm:p-8 flex items/end"
                style={{ backgroundImage: `url(${infoBG})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <h2 className="text-2xl sm:text-3xl font-display text-white font-bold">
                  {t("contactus.constactus") || "تواصل معنا"}
                </h2>
              </div>

              <div className="bg-white p-5 sm:p-6">
                <ul className="space-y-4">
                  <InfoRow
                    label={t("contactus.mail") || "Email"}
                    value={<a className="text-teal-700 hover:underline" href="mailto:info@american-softwares.com">info@american-softwares.com</a>}
                  />
                  <InfoRow
                    label={t("contactus.phone") || "Phone"}
                    value={<a className="text-teal-700 hover:underline" href="tel:+201080877774">01080002209</a>}
                  />
                  <InfoRow
                    label={t("contactus.location") || "Location"}
                    value={t("contactus.street") || "Egypt, Giza, Haram"}
                  />
                  <InfoRow
                    label={t("contactus.workinghours") || "Working Hours"}
                    value={t("contactus.days") || "Sunday–Thursday"}
                  />
                </ul>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-elegant ring-1 ring-gray-100">
              <div
                className="relative h-44 sm:h-56 p-6 sm:p-8 flex flex-col items-start"
                style={{ backgroundImage: `url(${formBG})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="inline-block px-4 sm:px-6 py-2 border border-white text-white rounded-full text-xs mb-4">
                  {t("form.formbadge") || "Submit your request"}
                </div>
                <h2 className="text-2xl sm:text-3xl font-display text-white font-bold mt-auto">
                  {t("form.titleform") || "Unleash yourself and use the latest technologies."}
                </h2>
              </div>

              <div className="bg-white p-5 sm:p-8">
                <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:gap-6">
                  <LabeledInput
                    label={t("form.username") || "Your Name"}
                    name="fullName"
                    value={formData.fullName}
                    onChange={onChange}
                    required
                  />

                  {/* الدولة + الهاتف */}
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                    <label className="text-left">
                      <span className="mb-1 inline-block text-sm text-slate-700">
                        {t("form.country") || "Country"}
                      </span>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={onChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.name} {c.dial ? `(${c.dial})` : ""}
                          </option>
                        ))}
                      </select>
                    </label>

                    <LabeledInput
                      label={t("form.phone") || "Phone"}
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={onPhoneChange}
                      inputMode="numeric"
                      pattern={`\\d{${getLocalLen(formData.country)}}`}
                      placeholder={
                        formData.country === "EG"
                          ? `XXXXXXXXXX (${getLocalLen(formData.country)} digits, بدون 0 في الأول)`
                          : `XXXXXXXXXX`.slice(0, getLocalLen(formData.country)) +
                            ` (${getLocalLen(formData.country)} digits)`
                      }
                      required
                    />
                  </div>

                  <LabeledInput
                    label={t("form.mail") || "Your Email"}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    required
                  />

                  <LabeledInput
                    label={t("form.company") || "Company (optional)"}
                    name="company"
                    value={formData.company}
                    onChange={onChange}
                  />

                  <label className={isRTL ? "text-right" : "text-left"}>
                    <span className="mb-1 inline-block text-sm text-slate-700">
                      {t("form.subject.placeholder") || "Select a subject"}
                    </span>
                    <select
                      name="Subject"
                      value={formData.Subject}
                      onChange={onChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
                      required
                    >
                      <option value="">{t("form.subject.placeholder") || "Select a subject"}</option>
                      {SUBJECT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className={isRTL ? "text-right" : "text-left"}>
                    <span className="mb-1 inline-block text-sm text-slate-700">
                      {t("form.notesLabel") || "Notes (optional)"}
                    </span>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={onChange}
                      placeholder={t("form.notesPlaceholder") || "Any notes or extra details…"}
                      rows={4}
                      maxLength={1000}
                      dir="auto"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent resize-y"
                    />
                    <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                      <span>{t("form.notesHint") || "Optional — up to 1000 characters."}</span>
                      <span>{notesCount}/1000</span>
                    </div>
                  </label>

                  <div className={isRTL ? "text-left" : "text-right"}>
                    <button
                      type="submit"
                      disabled={loading}
                      className={[
                        "inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-medium transition",
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-black",
                      ].join(" ")}
                    >
                      {loading ? (t("form.submitting") || "Submitting…") : t("form.btnform") || "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function LabeledInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }
) {
  const { label, className, ...rest } = props;
  return (
    <label className="text-left">
      <span className="mb-1 inline-block text-sm text-slate-700">{label}</span>
      <input
        {...rest}
        className={[
          "w-full px-4 py-3 rounded-xl border border-gray-300",
          "focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent",
          className || "",
        ].join(" ")}
      />
    </label>
  );
}

function InfoRow({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center mt-1 flex-shrink-0">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex-1">
        <div className="p-3 rounded-lg bg-gray-50/80 backdrop-blur-sm border border-gray-100">
          <span className="font-semibold">{label} :</span> {value}
        </div>
      </div>
    </li>
  );
}

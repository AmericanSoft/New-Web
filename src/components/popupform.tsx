import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuoteModal } from "./QuoteModalContext";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import countries from "world-countries";

const SUBJECTS = (t: any) => [
  { value: "web_design",        label: t("form.subject.options.web_design") || "Web Design" },
  { value: "mobile_app",        label: t("form.subject.options.mobile_app") || "Mobile Application" },
  { value: "custom_software",   label: t("form.subject.options.custom_software") || "Custom Software" },
  { value: "portfolio_examples",label: t("form.subject.options.portfolio_examples") || "Portfolio / Examples" },
  { value: "seo_strategy",      label: t("form.subject.options.seo_strategy") || "Seo Strategy" },
];

const SUBJECT_TO_CATEGORY: Record<string, string> = {
  web_design: "Web Design",
  mobile_app: "Mobile Application",
  custom_software: "Custom Software",
  seo_strategy: "Seo Strategy",
  portfolio_examples: "Portfolio / Examples",
};

// -------- Countries helpers --------
type CountryOpt = { code: string; name: string; dial: string };

function buildCountryOptions(): CountryOpt[] {
  return countries
    .map((c) => {
      const name = (c.name as any)?.common || c.name?.official || c.cca2;
      const root = c.idd?.root || "";
      const suf = (c.idd?.suffixes && c.idd.suffixes[0]) || "";
      const dial = root && (root + suf) ? `${root}${suf}` : root || "";
      return { code: c.cca2, name, dial }; // ex: +20 , +966
    })
    .filter((c) => c.code)
    .sort((a, b) => a.name.localeCompare(b.name));
}

function buildDialMap(opts: CountryOpt[]) {
  const map: Record<string, string> = {};
  for (const c of opts) {
    const d = (c.dial || "").replace("+", "").trim();
    if (c.code && d) map[c.code] = d;
  }
  return map;
}

/** نفس منطق صفحة الكونتاكت:
 * - المستخدم يكتب 10 أرقام محلية فقط.
 * - EG  => نرجّع 0 + 10 (11 رقم محلي).
 * - غير EG => نرجّع E.164: +<dial><digits بدون أصفار البداية>.
 */
function preparePhoneForBackend(
  raw10: string,
  cc: string,
  dialMap: Record<string, string>,
  t: (k: string) => string
): { ok: true; send: string } | { ok: false; reason: string } {
  const digits = (raw10 || "").replace(/\D+/g, "");
  if (digits.length !== 10) {
    return {
      ok: false,
      reason: t("form.phoneMustBe10") || "Phone must be exactly 10 digits (country code is selected separately).",
    };
  }

  if (cc === "EG") {
    return { ok: true, send: `0${digits}` }; // 11 رقم محلي
  }

  const dial = dialMap[cc];
  if (!dial) {
    return { ok: false, reason: t("form.phoneHint") || "Please select a valid country." };
  }

  const noLeadingZeros = digits.replace(/^0+/, "");
  return { ok: true, send: `+${dial}${noLeadingZeros}` };
}

// ===================================

export default function Popupform() {
  const { t, i18n } = useTranslation();
  const { isOpen, close } = useQuoteModal();

  const COUNTRIES = useMemo(buildCountryOptions, []);
  const DIAL_BY_CODE = useMemo(() => buildDialMap(COUNTRIES), [COUNTRIES]);

  const [country, setCountry] = useState<string>("EG"); // default Egypt
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    mobile: "", // 10 digits only
    Subject: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // A11y + focus
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    setTimeout(() => firstFieldRef.current?.focus(), 0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // أرقام فقط + حد أقصى 10 أثناء الكتابة
  const onMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D+/g, "").slice(0, 10);
    setForm((prev) => ({ ...prev, mobile: digitsOnly }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.Subject || !form.mobile) {
      toast.error(t("form.validationRequired") || "Please fill in all required fields");
      return;
    }

    const prep = preparePhoneForBackend(form.mobile, country, DIAL_BY_CODE, t);
    if (!prep.ok) {
      toast.error(prep.reason);
      return;
    }

    const payload = {
      name: form.fullName,
      email: form.email,
      company_name: form.company || "",
      country,
      mobile_number: prep.send, // EG => 0 + 10 | غير EG => +dial+digits(without leading zeros)
      category_name: SUBJECT_TO_CATEGORY[form.Subject],
    };

    try {
      setSubmitting(true);
      const res = await fetch(
        "https://sfgukli.american-softwares.com/api/contact-us",
        {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const ct = res.headers.get("content-type") || "";
      const raw = ct.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        const msg =
          typeof raw === "string"
            ? raw
            : raw?.message || Object.values(raw?.errors || {})?.flat()?.[0];
        toast.error(msg || (t("form.submitFail") as string) || "Submission failed");
        return;
      }

      toast.success(t("form.submitSuccess") || "Request submitted successfully!");
      setForm({ fullName: "", email: "", company: "", mobile: "", Subject: "" });
      setCountry("EG");
      close();
    } catch (err) {
      console.error("Quote submit error:", err);
      toast.error(t("form.networkError") || "Network/server error");
    } finally {
      setSubmitting(false);
    }
  };

  const dir = i18n.dir();
  const titleId = "quoteDialogTitle";

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      dir={dir}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      <div
        ref={dialogRef}
        className="relative z-[101] w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-700 dark:bg-gray-900"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 id={titleId} className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {t("form.titleform") || "Request a Quote"}
          </h3>
          <button
            onClick={close}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <input
            ref={firstFieldRef}
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            placeholder={t("form.username") || "Full name"}
            autoComplete="name"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pulse-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder={t("form.mail") || "Email"}
            autoComplete="email"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pulse-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            required
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr,2fr]">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pulse-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              aria-label={t("form.country") || "Country"}
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} {c.dial ? `(${c.dial})` : ""}
                </option>
              ))}
            </select>

            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={onMobileChange}
              inputMode="numeric"
              pattern="\d{10}"
              placeholder={t("form.phone") || "XXXXXXXXXX (10 digits)"}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pulse-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              required
            />
          </div>

          <input
            name="company"
            value={form.company}
            onChange={onChange}
            placeholder={t("form.company") || "Company (optional)"}
            autoComplete="organization"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pulse-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />

          <select
            name="Subject"
            value={form.Subject}
            onChange={onChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pulse-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            required
          >
            <option value="">{t("form.subject.placeholder") || "Select a subject"}</option>
            {SUBJECTS(t).map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-red-500 px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (t("form.submitting") || "Submitting…") : (t("form.btnform") || "Send request")}
          </button>
        </form>
      </div>
    </div>
  );
}

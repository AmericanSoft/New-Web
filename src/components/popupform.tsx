import React, { useState } from "react";
import { useQuoteModal } from "./QuoteModalContext";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const SUBJECTS = (t: any) => [
  { value: "web_design",        label: t("form.subject.options.web_design") || "Web Design" },
  { value: "mobile_app",        label: t("form.subject.options.mobile_app") || "Mobile Application" },
  { value: "custom_software",   label: t("form.subject.options.custom_software") || "Custom Software" },
  { value: "portfolio_examples",label: t("form.subject.options.portfolio_examples") || "Portfolio / Examples" },
];

// خريطة تحويل قيمة الـSubject إلى category_name نصي يظهر كويس في الداشبورد/الـDB
const SUBJECT_TO_CATEGORY: Record<string, string> = {
  web_design: "Web Design",
  mobile_app: "Mobile Application",
  custom_software: "Custom Software",
  portfolio_examples: "Portfolio / Examples",
};

export default function Popupform() {
  const { t, i18n } = useTranslation();
  const { isOpen, close } = useQuoteModal();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    Subject: "",
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.Subject) {
      toast.error(t("form.validationRequired") || "Please fill in all required fields");
      return;
    }

    // تجهيز البودي حسب أسماء الحقول المتوقعة من الـAPI
    const payload = {
      name: form.fullName,
      email: form.email,
      company_name: form.company || "",                 // اختياري
      category_name: SUBJECT_TO_CATEGORY[form.Subject], // مهم
      // لو عايز تضيف حقول:
      // mobile_number: "",
      // address: "",
      // message: "",
    };

    try {
      setSubmitting(true);

      const res = await fetch(
        "https://american-softwares.com/api/public/index.php/api/contact-us",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // لو API محتاج توكن: Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          body: JSON.stringify(payload),
          redirect: "follow",
        }
      );

      // أمان في قراءة الرد (ممكن يرجّع HTML لو في ريديركت)
      const ct = res.headers.get("content-type") || "";
      const raw = ct.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        const msg = typeof raw === "string" ? raw : raw?.message;
        toast.error(msg || t("form.submitFail") || "Submission failed");
        return;
      }

      toast.success(t("form.submitSuccess") || "Request submitted successfully!");
      // تصفير
      setForm({ fullName: "", email: "", company: "", Subject: "" });
      close();
    } catch (err) {
      console.error("Quote submit error:", err);
      toast.error(t("form.networkError") || "Network/server error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      dir={i18n.language.startsWith("ar") ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" onClick={close} />
      <div className="relative z-[101] w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
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

        <form onSubmit={submit} className="space-y-4">
          <input
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            placeholder={t("form.username") || "Full name"}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pulse-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder={t("form.mail") || "Email"}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pulse-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            required
          />

          <input
            name="company"
            value={form.company}
            onChange={onChange}
            placeholder={t("form.company") || "Company (optional)"}
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

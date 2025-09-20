// ContactPage.tsx
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

// ⬅️ استبدل المسارات لو ما عندك alias "@"
import heroBG from "../../public/background-section1.png";
import formBG from "../../public/background-section2.png";
import infoBG from "../../public/background-section3.png";
import SecNavbar from "@/components/SecNavbar";
import Footer from '../components/Footer/Footer' 

// (اختياري) لو عندك هيدر/فوتر:
// import SecNavbar from "@/components/SecNavbar";
// import Footer from "@/components/Footer/Footer";

type FormData = {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  Subject: string;
  notes?: string;
};

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const isRTL = dir === "rtl";

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    Subject: "",
    notes: "",
  });

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
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.Subject) {
      toast.error(t("form.validationRequired") || "Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      // ✳️ API الحقيقية — لو عندك CORS على الباك، تأكد إنه متظبّط على السيرفر
      const res = await fetch(
        "https://american-softwares.com/api/public/index.php/api/contact-us",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Request failed");
      }

      toast.success(t("form.submitSuccess") || "Request submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        Subject: "",
        notes: "",
      });
    } catch (err) {
      console.error(err);
      // احتمال CORS أثناء الديف
      toast.error(t("errors.tryAgain") || "تعذر الإرسال الآن. حاول لاحقًا.");
    } finally {
      setLoading(false);
    }
  };

  const notesCount = formData.notes?.length || 0;

  return (
    <>
    <SecNavbar/>
      {/* <SecNavbar /> */}
      {/* HERO */}
      <section dir={dir} className="relative w-full bg-white pt-28 sm:pt-36">
        <div
          className="relative overflow-hidden rounded-none sm:rounded-2xl mx-auto max-w-7xl"
          style={{ minHeight: 260 }}
        >
          <img
            src={heroBG}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <h1
              className={[
                "text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white",
                isRTL ? "text-right" : "text-left",
              ].join(" ")}
            >
              {t("contactus.constactus") || "تواصل معنا"}
            </h1>
            <p
              className={[
                "mt-3 text-white/90 max-w-2xl",
                isRTL ? "text-right ml-auto" : "text-left",
              ].join(" ")}
            >
              {t("contactus.titlecontactus") ||
                "التواصل الآن أصبح سهلًا — أخبرنا باحتياجك وسنعود إليك بخطة تنفيذ واضحة."}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section dir={dir} className="w-full bg-white py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left info card */}
            <aside className="lg:col-span-1 rounded-2xl overflow-hidden shadow-elegant ring-1 ring-gray-100">
              <div
                className="relative h-48 p-6 sm:p-8 flex items-end"
                style={{
                  backgroundImage: `url(${infoBG})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h2 className="text-2xl sm:text-3xl font-display text-white font-bold">
                  {t("contactus.constactus") || "تواصل معنا"}
                </h2>
              </div>

              <div className="bg-white p-5 sm:p-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center mt-1 flex-shrink-0">
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="p-3 rounded-lg bg-gray-50/80 backdrop-blur-sm border border-gray-100">
                        <span className="font-semibold">{t("contactus.mail") || "Email"} :</span>{" "}
                        <a className="text-teal-700 hover:underline" href="mailto:americansoft8@gmail.com">
                          americansoft8@gmail.com
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center mt-1 flex-shrink-0">
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="p-3 rounded-lg bg-gray-50/80 backdrop-blur-sm border border-gray-100">
                        <span className="font-semibold">{t("contactus.phone") || "Phone"} :</span>{" "}
                        <a className="text-teal-700 hover:underline" href="tel:+201080877774">
                          +20 108 087 7774
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center mt-1 flex-shrink-0">
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="p-3 rounded-lg bg-gray-50/80 backdrop-blur-sm border border-gray-100">
                        <span className="font-semibold">{t("contactus.location") || "Location"} :</span>{" "}
                        {t("contactus.street") || "Egypt, Giza, Haram"}
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center mt-1 flex-shrink-0">
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="p-3 rounded-lg bg-gray-50/80 backdrop-blur-sm border border-gray-100">
                        <span className="font-semibold">{t("contactus.workinghours") || "Working Hours"} :</span>{" "}
                        {t("contactus.days") || "Sunday–Thursday"}
                      </div>
                    </div>
                  </li>
                </ul>

                {/* (اختياري) روابط سوشيال/واتساب */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/201080877774"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-teal-600 px-4 py-2 text-sm text-teal-700 hover:bg-teal-700 hover:text-white transition"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="mailto:americansoft8@gmail.com"
                    className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                  >
                    Email
                  </a>
                </div>
              </div>
            </aside>

            {/* Right form card */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-elegant ring-1 ring-gray-100">
              <div
                className="relative h-44 sm:h-56 p-6 sm:p-8 flex flex-col items-start"
                style={{
                  backgroundImage: `url(${formBG})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="inline-block px-4 sm:px-6 py-2 border border-white text-white rounded-full text-xs mb-4">
                  {t("form.formbadge") || "Submit your request"}
                </div>
                <h2 className="text-2xl sm:text-3xl font-display text-white font-bold mt-auto">
                  {t("form.titleform") || "Unleash yourself and use the latest technologies."}
                </h2>
              </div>

              <div className="bg-white p-5 sm:p-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:gap-6">
                  {/* Full name */}
                  <label className={isRTL ? "text-right" : "text-left"}>
                    <span className="mb-1 inline-block text-sm text-slate-700">
                      {t("form.username") || "Your Name"}
                    </span>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={onChange}
                      placeholder={t("form.username") || "Your Name"}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
                      required
                    />
                  </label>

                  {/* Email + Phone (2-cols on lg) */}
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                    <label className={isRTL ? "text-right" : "text-left"}>
                      <span className="mb-1 inline-block text-sm text-slate-700">
                        {t("form.mail") || "Your Email"}
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        placeholder={t("form.mail") || "Your Email"}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
                        required
                      />
                    </label>

                    <label className={isRTL ? "text-right" : "text-left"}>
                      <span className="mb-1 inline-block text-sm text-slate-700">
                        {t("form.phone") || "Phone (optional)"}
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={onChange}
                        placeholder="+20 ..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
                      />
                    </label>
                  </div>

                  {/* Company */}
                  <label className={isRTL ? "text-right" : "text-left"}>
                    <span className="mb-1 inline-block text-sm text-slate-700">
                      {t("form.company") || "Company (optional)"}
                    </span>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={onChange}
                      placeholder={t("form.company") || "Company (optional)"}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
                    />
                  </label>

                  {/* Subject */}
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

                  {/* Notes */}
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

                  {/* Submit */}
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

          {/* (اختياري) قسم صغير أسئلة سريعة/CTA */}
          <div className="mt-10 rounded-2xl border border-slate-200 p-5 sm:p-6 bg-slate-50/60">
            <h3 className={["text-lg sm:text-xl font-semibold text-slate-900", isRTL ? "text-right" : "text-left"].join(" ")}>
              {t("form.faq.miniTitle") || "أسئلة سريعة"}
            </h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              <li className="text-slate-700 text-sm">
                • {t("form.faq.q1") || "متى نرد على الرسائل؟"} — {t("form.faq.a1") || "عادة خلال 24 ساعة عمل."}
              </li>
              <li className="text-slate-700 text-sm">
                • {t("form.faq.q2") || "هل يمكن مكالمة سريعة؟"} — {t("form.faq.a2") || "نعم، بعد الاستفسار الأولي نحدد موعدًا مناسبًا."}
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
      <Footer/>
    </>
  );
}

import React, { useMemo, useState } from "react";
import "../i18";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import img1 from "../../public/background-section1.png";
import img2 from "../../public/background-section2.png";

/** كل أكواد الدول ISO-3166-1 alpha-2 */
const ISO_CODES = `
AF,AX,AL,DZ,AS,AD,AO,AI,AQ,AG,AR,AM,AW,AU,AT,AZ,BS,BH,BD,BB,BY,BE,BZ,BJ,BM,BT,BO,BQ,BA,BW,BV,BR,IO,BN,BG,BF,BI,KH,CM,CA,CV,KY,CF,TD,CL,CN,CX,CC,CO,KM,CG,CD,CK,CR,CI,HR,CU,CW,CY,CZ,DK,DJ,DM,DO,EC,EG,SV,GQ,ER,EE,SZ,ET,FK,FO,FJ,FI,FR,GF,PF,TF,GA,GM,GE,DE,GH,GI,GR,GL,GD,GP,GU,GT,GG,GN,GW,GY,HT,HM,VA,HN,HK,HU,IS,IN,ID,IR,IQ,IE,IM,IL,IT,JM,JP,JE,JO,KZ,KE,KI,KP,KR,KW,KG,LA,LV,LB,LS,LR,LY,LI,LT,LU,MO,MG,MW,MY,MV,ML,MT,MH,MQ,MR,MU,YT,MX,FM,MD,MC,MN,ME,MS,MA,MZ,MM,NA,NR,NP,NL,NC,NZ,NI,NE,NG,NU,NF,MP,NO,OM,PK,PW,PS,PA,PG,PY,PE,PH,PN,PL,PT,PR,QA,RE,RO,RU,RW,BL,SH,KN,LC,MF,PM,VC,WS,SM,ST,SA,SN,RS,SC,SL,SG,SX,SK,SI,SB,SO,ZA,GS,SS,ES,LK,SD,SR,SJ,SE,CH,SY,TW,TJ,TZ,TH,TL,TG,TK,TO,TT,TN,TR,TM,TC,TV,UG,UA,AE,GB,US,UM,UY,UZ,VU,VE,VN,VG,VI,WF,EH,YE,ZM,ZW
`.replace(/\s+/g, "").split(",");

/** subjects للـAPI */
const SUBJECT_TO_CATEGORY: Record<string, string> = {
  web_design: "Web Design",
  mobile_app: "Mobile Application",
  custom_software: "Custom Software",
  seo_strategy: "Seo Strategy",
  portfolio_examples: "Portfolio / Examples",
};

export default function DetailsSection() {
  const { t, i18n } = useTranslation();

  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    country: "EG", // افتراضي مصر
    mobile: "",    // لازم 11 رقم
    Subject: "",
    notes: "",
  });

  // أسماء الدول حسب لغة الواجهة
  const countries = useMemo(() => {
    const lang = i18n.language?.split("-")[0] || "en";
    const regionNames = new Intl.DisplayNames([lang], { type: "region" });
    return ISO_CODES.map((code) => ({
      code,
      name: regionNames.of(code) || code,
    })).sort((a, b) => a.name.localeCompare(b.name));
  }, [i18n.language]);

  // helper: السماح فقط بأرقام وBackspace وArrow… الخ (منع e/E/+)
  const onlyDigitKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Home",
      "End",
    ];
    if (allowed.includes(e.key)) return;
    if (!/^[0-9]$/.test(e.key)) e.preventDefault();
  };
  const onPasteDigitsOnly = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pasted)) e.preventDefault();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      const digits = value.replace(/\D/g, "").slice(0, 11); // قصّ أي زيادة
      setFormData((p) => ({ ...p, mobile: digits }));
      return;
    }
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const missing: string[] = [];
    if (!formData.fullName) missing.push(t("form.username") || "Your Name");
    if (!formData.email) missing.push(t("form.mail") || "Your Email");
    if (!formData.Subject) missing.push(t("form.subject.placeholder") || "Subject");
    if (!formData.mobile) missing.push(t("form.phone") || "Phone");

    if (missing.length) {
      toast.error(
        `${t("form.validationRequired") || "Please fill in all required fields"}: ${missing.join("، ")}`
      );
      return;
    }

    // تحقق صارم: 11 رقم بالضبط
    if (!/^\d{11}$/.test(formData.mobile)) {
      toast.error(t("form.phoneMustBe11") || "رقم الموبايل لازم يكون 11 رقم بالضبط");
      return;
    }

    const payload = {
      name: formData.fullName,
      email: formData.email,
      company_name: formData.company || "",
      country: formData.country,
      mobile_number: formData.mobile, // 11 رقم (بدون +)
      category_name: SUBJECT_TO_CATEGORY[formData.Subject] || formData.Subject,
      message: formData.notes || "",
    };

    try {
      setSubmitting(true);
      const res = await fetch(
        "https://sfgukli.american-softwares.com/api/contact-us",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const ct = res.headers.get("content-type") || "";
      const data = ct.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        // لو Laravel رجّع errors
        const msg =
          typeof data === "string"
            ? data
            : data?.message ||
              (data?.errors?.mobile_number?.[0] as string) ||
              (Object.values(data?.errors || {}) as any[])?.flat()?.[0];
        toast.error(msg || (t("form.submitFail") as string) || "Submission failed");
        return;
      }

      toast.success(t("form.submitSuccess") || "Request submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        company: "",
        country: "EG",
        mobile: "",
        Subject: "",
        notes: "",
      });
    } catch (err) {
      console.error("contact-us submit error:", err);
      toast.error(t("form.networkError") || "Network/server error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contactus" className="w-full bg-white py-0">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          {/* Left Card */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant">
            <div
              className="relative h-48 sm:h-64 p-6 sm:p-8 flex items-end"
              style={{
                backgroundImage: `url(${img1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h2 className="text-2xl sm:text-3xl font-display text-white font-bold">
                {t("contactus.constactus")}
              </h2>
            </div>

            <div
              className="bg-white p-5 sm:p-8"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #ECECEC" }}
            >
              <h3 className="text-lg sm:text-xl font-display mb-6 sm:mb-8">
                {t("contactus.titlecontactus")}
              </h3>

              <div className="space-y-4 sm:space-y-6">
                <InfoRow label={`${t("contactus.mail")} :`} value="americansoft8@gmail.com" />
                <InfoRow label={`${t("contactus.phone")} :`} value="+201080877774" />
                <InfoRow label={`${t("contactus.location")} :`} value={t("contactus.street")} />
                <InfoRow label={`${t("contactus.workinghours")} :`} value={t("contactus.days")} />
              </div>
            </div>
          </div>

          {/* Right Card - Form */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant">
            <div
              className="relative h-48 sm:h-64 p-6 sm:p-8 flex flex-col items-start"
              style={{
                backgroundImage: `url(${img2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="inline-block px-4 sm:px-6 py-2 border border-white text-white rounded-full text-xs mb-4">
                {t("form.formbadge")}
              </div>
              <h2 className="text-2xl sm:text-3xl font-display text-white font-bold mt-auto">
                {t("form.titleform")}
              </h2>
            </div>

            <div className="bg-white p-5 sm:p-8" style={{ border: "1px solid #ECECEC" }}>
              <form onSubmit={submit} className="space-y-4 sm:space-y-6">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={t("form.username")}
                  autoComplete="name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
                  required
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("form.mail")}
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
                  required
                />

                {/* الدولة + الهاتف (11 رقم فقط) */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(180px,220px)_1fr]">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <div>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      onKeyDown={onlyDigitKeys}
                      onPaste={onPasteDigitsOnly}
                      placeholder="XXXXXXXXXXX"
                      inputMode="numeric"
                      maxLength={11}
                      pattern="\d{11}"
                      title={t("form.phoneMustBe11") || "رقم الموبايل لازم يكون 11 رقم"}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
                      required
                    />
                    <div className="mt-1 text-xs text-gray-500">
                      {formData.mobile.length}/11 — {t("form.phoneHint") || "أدخل 11 رقمًا بدون رموز أو مسافات."}
                    </div>
                  </div>
                </div>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={t("form.company")}
                  autoComplete="organization"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
                />

                <select
                  name="Subject"
                  value={formData.Subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
                  required
                >
                  <option value="">{t("form.subject.placeholder") || "Select a subject"}</option>
                  {[
                    { value: "web_design", label: t("form.subject.options.web_design") || "Web Design" },
                    { value: "mobile_app", label: t("form.subject.options.mobile_app") || "Mobile Application" },
                    { value: "custom_software", label: t("form.subject.options.custom_software") || "Custom Software" },
                    { value: "seo_strategy", label: t("form.subject.options.seo_strategy") || "Seo Strategy" },
                    { value: "portfolio_examples", label: t("form.subject.options.portfolio_examples") || "Portfolio / Examples" },
                  ].map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {/* ملاحظات */}
                <div>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder={t("form.notesPlaceholder") || "أي ملاحظات أو تفاصيل إضافية…"}
                    rows={4}
                    maxLength={1000}
                    dir="auto"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent resize-y"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {t("form.notesHint") || "اختياري — بحد أقصى 1000 حرف."}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-6 py-3 bg-red-500 hover:bg-black text-white font-medium rounded-full transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (t("form.submitting") || "Submitting…") : t("form.btnform")}
                </button>
              </form>
            </div>
          </div>
          {/* End Right Card */}
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-dark-900 flex items-center justify-center mt-1 flex-shrink-0">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex-1">
        <div className="p-3 rounded-lg bg-gray-50/80 backdrop-blur-sm border border-gray-100">
          <span className="font-semibold text-base">{label}</span> {value}
        </div>
      </div>
    </div>
  );
}

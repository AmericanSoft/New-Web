// <= 70 سطر
export const COUNTRIES = [
  { iso: "EG", dial: "+20",  labelEn: "🇪🇬 Egypt",            labelAr: "🇪🇬 مصر" },
  { iso: "SA", dial: "+966", labelEn: "🇸🇦 Saudi Arabia",     labelAr: "🇸🇦 السعودية" },
  { iso: "AE", dial: "+971", labelEn: "🇦🇪 United Arab Emirates", labelAr: "🇦🇪 الإمارات" },
  { iso: "US", dial: "+1",   labelEn: "🇺🇸 United States",    labelAr: "🇺🇸 الولايات المتحدة" },
  { iso: "GB", dial: "+44",  labelEn: "🇬🇧 United Kingdom",   labelAr: "🇬🇧 المملكة المتحدة" },
];

export const CATEGORY_MAP_AR_TO_EN = {
  "تصميم مواقع": "Web Design",
  "تطبيقات الموبايل": "Mobile Application",
  "برمجيات مخصّصة": "Custom Software",
  "استراتيجية SEO": "Seo Strategy", // Seo مش SEO
};

export const SERVICE_VALUES = [
  "Web Design",
  "Mobile Application",
  "Custom Software",
  "Seo Strategy",
];

export const dialToIso = (dial) => {
  const m = COUNTRIES.find((c) => c.dial === dial);
  return m ? m.iso : "EG";
};

export const getCountryByIso = (iso) =>
  COUNTRIES.find((c) => c.iso === iso) || COUNTRIES[0];

export const countriesUi = (lang) =>
  COUNTRIES.map((c) => ({
    iso: c.iso,
    dial: c.dial,
    label: lang === "ar" ? c.labelAr : c.labelEn,
  }));

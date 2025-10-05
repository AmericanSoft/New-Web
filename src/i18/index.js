// src/i18/index.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// حمّل الموارد (JSON) — لو هتعمل lazy import مفيش مشكلة، بس هنا بنحمّل مباشر
import en from "./locales/en/common.json";
import ar from "./locales/ar/common.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: localStorage.getItem("lang") || "ar", // الإفتراضي
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;

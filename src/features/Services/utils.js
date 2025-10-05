// src/components/our-services/utils.js
export const resolveLangFromPath = (pathname, forcedLang) =>
  forcedLang ?? (pathname.startsWith("/en") ? "en" : "ar");

export const buildFinalServices = (incoming, strings, langKey, defaults) => {
  const base = Array.isArray(incoming) && incoming.length > 0 ? incoming : defaults[langKey];
  return base.map((s) => ({ cta: s.cta ?? strings.cta, ...s }));
};
  
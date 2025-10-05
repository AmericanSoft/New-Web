// helpers/getLang.js  (اختياري، لتفادي التكرار)
import { useLocation } from "react-router-dom";
export function useLang(forcedLang) {
  const { pathname } = useLocation();
  return forcedLang ?? (pathname.startsWith("/en") ? "en" : "ar");
}

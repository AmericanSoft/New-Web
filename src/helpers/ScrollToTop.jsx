import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // سكرول لأعلى كل ما المسار يتغيّر
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

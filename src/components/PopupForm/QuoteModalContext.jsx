// QuoteModalContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);

export function QuoteModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  // قفل/فتح سكرول الصفحة عند فتح المودال (مع حراسة SSR)
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!isOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // إغلاق بالمفتاح Esc
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onKey = (e) => {
      if (e.key === "Escape") close();
    };

    if (isOpen) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [isOpen]);

  return (
    <Ctx.Provider value={{ isOpen, open, close }}>
      {children}
    </Ctx.Provider>
  );
}

export function useQuoteModal() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useQuoteModal must be used within QuoteModalProvider");
  }
  return ctx;
}

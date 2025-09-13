// Navbar.tsx
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import "../i18"  
import { useQuoteModal } from "./QuoteModalContext";



const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
      const { open } = useQuoteModal();


  const changeLang = async () => {
    const newLang = i18n.language.startsWith("ar") ? "en" : "ar";
    await i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    // dir/lang هيتظبطوا من i18n.ts لو عاملهم هناك
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // تغيير لون الهيدر عند السكروول
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // فتح/غلق المينيو (ومنع سكرول الخلفية)
  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "";
      return next;
    });
  };

  // سكرول لأعلى + إغلاق المينيو إن كانت مفتوحة
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = "";
    }
  };

  return (
    <header
      id="navbar"
      className={cn(
        " flex align-center fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 transition-all duration-300 ",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm text-black" : "bg-transparent text-white"
      )}
    >
      <div className="container flex items-center justify-around px-4 sm:px-6 lg:px-8">
        {/* Logo */}

             <a href="#" className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); scrollToTop(); }} aria-label="American Soft"> 
                <img  src="/logo.png"  alt="American Soft"  className="w-[150px] h-[150px] rounded-full"  />
             </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <a
            href="#"
            className="nav-link text-current"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            {t("navbar.home")}
          </a>
          <a href="#Services" className="nav-link text-current">
            {t("navbar.services")}
          </a>
          <a href="#contactus" className="nav-link text-current">
            {t("navbar.contact")}
          </a>
          <a href="#ourproject" className="nav-link text-current">
            {t("navbar.ourProject")}
          </a>
          <a href="#blog" className="nav-link text-current">
            {t("navbar.blog")}
          </a>
          <button
            className="RequestQuote"
            style={{
              color: "white",
              backgroundColor: "red",
              padding: "10px",
              borderRadius: "25px",
              fontWeight:900 , 
            }}
 
            onClick={open}

          >
            {t("navbar.requestQuote") || "Request a Quote"}
          </button>

                  {/* Language switch */}
        <button
          className="lang"
          onClick={changeLang}
          style={{
            color: "black",
            backgroundColor: "white",
            border: "1px solid black",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          {i18n.language.startsWith("ar") ? t("navbar.english") : t("navbar.arabic")}
        </button>

        </nav>

        {/* Mobile menu button */}
        <button
          className={cn(
            "md:hidden p-3 focus:outline-none",
            (isMenuOpen || isScrolled) ? "text-black" : "text-white"
          )}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navbaar  */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white flex flex-col pt-16 px-6 md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Close button inside menu */}
        <button onClick={toggleMenu} className="absolute top-4 right-4 p-3 text-gray-800" aria-label="Close menu" > <X size={24} /> </button>

        <nav className="flex flex-col space-y-8 items-center mt-8 text-black">
          <a href="#" className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
              setIsMenuOpen(false);
              document.body.style.overflow = "";
            }}>
            {t("navbar.home")}
          </a>

          <a
            href="#ourproject"
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100"
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = "";
            }}
          >
            {t("navbar.ourProject")}
          </a>

          <a
            href="#Services"
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100"
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = "";
            }}
          >
            {t("navbar.services")}
          </a>

          <a href="#blog" className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100" onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = "";
            }}
          >
            {t("navbar.blog")}
          </a>

          <a
            href="#contactus"
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100"
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = "";
            }}
          >
            {t("navbar.contact")}
          </a>

          <button
            className="RequestQuote"
            style={{
              color: "black",
              backgroundColor: "red",
              padding: "10px",
              borderRadius: "25px",
            }}
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = "";
            }}
          >
            {t("navbar.requestQuote") || "Request a Quote"}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar  ;

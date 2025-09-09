import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import   "../i18";
import { useTranslation } from "react-i18next";

const Newsletter = () => {

   const { t , i18n } = useTranslation();
            
              const changLang = () => {
                const newLang = i18n.language === "ar" ? "en" : "ar";
                i18n.changeLanguage(newLang);
                localStorage.setItem("lang", newLang);
              };

              
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for subscribing!",
        description: "You'll receive updates about Atlas soon."
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };
  return <section id="newsletter" className="bg-white py-0">
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="pulse-chip gap-1">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white mr-2">06</span>
              <span>{t("Newsletter.headnewsletter")}</span>
            </div>
          </div>
          
          <h2 className="text-5xl font-display font-bold mb-4 ">{t("Newsletter.subscribe")}</h2>
          <p className="text-xl text-gray-700 mb-10 ">
            {t("Newsletter.titlesubscribe")}
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-grow">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t("Newsletter.mail")} className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pulse-500 text-gray-700" required />
            </div>
            <button type="submit" disabled={isSubmitting} className="bg-red-500 hover:bg-black text-white font-medium py-4 px-10 rounded-full transition-all duration-300 md:ml-4">
              {isSubmitting ? t("Newsletter.Submitting"):t("Newsletter.btnnew")}
            </button>
          </form>
        </div>
      </div>
    </section>;
};
export default Newsletter;
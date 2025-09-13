
import React from "react";
import   "../i18";
import { useTranslation } from "react-i18next";


const Blog = () => {

   const { t , i18n } = useTranslation();
              
                const changLang = () => {
                  const newLang = i18n.language === "ar" ? "en" : "ar";
                  i18n.changeLanguage(newLang);
                  localStorage.setItem("lang", newLang);
                };


  return (
    <section className="w-full pt-0 pb-8 sm:pb-12 bg-white" id="blog">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-gray-900 mb-3 sm:mb-4">
           {t("blog.headblog")}
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            {t("blog.titleblog")}
          </p>
        </div>
        
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant mx-auto max-w-4xl animate-on-scroll">
          <div className="w-full">
            <img 
              src="..\public\blog.png" 
              alt="Advanced humanoid robot with orange and white design" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="bg-white p-4 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4">{t("blog.articalblogtitle")}</h3>
            <p className="text-gray-700 text-sm sm:text-base">
             {t("blog.pragraphblogtitle")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;

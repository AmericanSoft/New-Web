import React from "react";
import   "../i18";
import { useTranslation } from "react-i18next";
import SecNavbar from "@/components/SecNavbar";


const BlogCard = () => {

   const { t , i18n } = useTranslation();
                
                  const changLang = () => {
                    const newLang = i18n.language === "ar" ? "en" : "ar";
                    i18n.changeLanguage(newLang);
                    localStorage.setItem("lang", newLang);
                  };
  return (
   <>

   <SecNavbar/>
    <section className="w-full pt-0 pb-8 sm:pb-12 bg-white mt-64" >

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-gray-900 mb-3 sm:mb-4">
           {t("blog.headblog")}
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            {t("blog.titleblog")}
          </p>
        </div>
        
        <div className="grid gap-5 sm:flex">

        <div className="rounded-2xl  grid align-center sm:rounded-3xl overflow-hidden shadow-elegant mx-auto max-w-4xl animate-on-scroll">

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

          <button type="button" className="text-black-700 m-5 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Read More</button>


        </div>

        <div className="rounded-2xl  grid align-center sm:rounded-3xl overflow-hidden shadow-elegant mx-auto max-w-4xl animate-on-scroll">

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

          <button type="button" className="text-black-700 m-5 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Read More</button>


        </div>


        <div className="rounded-2xl  grid align-center sm:rounded-3xl overflow-hidden shadow-elegant mx-auto max-w-4xl animate-on-scroll">

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

          <button type="button" className="text-black-700 m-5 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Read More</button>


        </div>


        </div>
      
      </div>

    </section>
   </>
  );
};

export default BlogCard ;
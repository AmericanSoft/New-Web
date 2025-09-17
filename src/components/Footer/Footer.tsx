// Footer.tsx
import React from "react";
import './Footer.css'
import   "../../i18";
import { useTranslation } from "react-i18next";


const Footer: React.FC = () => {


   const { t , i18n } = useTranslation();
                  
                    const changLang = () => {
                      const newLang = i18n.language === "ar" ? "en" : "ar";
                      i18n.changeLanguage(newLang);
                      localStorage.setItem("lang", newLang);
                    };

  return (
    <div>
      <footer className="new_footer_area bg_color">

        <div className="new_footer_top">
            
          <div className="container">

            <div className="row">

              {/* Get in Touch */}
              <div className="col-lg-3 col-md-6">
                <div className="f_widget company_widget wow fadeInLeft" data-wow-delay="0.2s" style={{ visibility: "visible", animationDelay: "0.2s", animationName: "fadeInLeft" }} >
                  <h3 className="f-title f_600 t_color f_size_18"> {t("footer.getin")}</h3>
                  <p> {t("footer.dontmiss")}</p>

                  <form action="#" className="f_subscribe_two mailchimp" method="post" noValidate>
                  <input type="email" name="EMAIL" className="form-control memail" placeholder={t("footer.mail")} />
                  <button className="btn btn_get btn_get_two" type="submit"> {t("footer.subscribe")} </button>
                  <p className="mchimp-errmessage" style={{ display: "none" }}></p>
                  <p className="mchimp-sucmessage" style={{ display: "none" }}></p>
                  </form>
                </div>
              </div>

              {/* Pages ---- mosatahp */}
              <div className="col-lg-3 col-md-6">
                <div className="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.4s" style={{ visibility: "visible", animationDelay: "0.4s", animationName: "fadeInLeft" }}>
                  <h3 className="f-title f_600 t_color f_size_18">{t("footer.pages")}</h3>
                  <ul className="list-unstyled f_list">
                    <li><a href="#">Company</a></li>
                    <li><a href="#">Android App</a></li>
                    <li><a href="#">iOS App</a></li>
                    <li><a href="#">Desktop</a></li>
                    <li><a href="#">Projects</a></li>
                    <li><a href="#">My tasks</a></li>
                  </ul>
                </div>
              </div>

              {/* Help --- mostafahp */}
              <div className="col-lg-3 col-md-6">
                <div
                  className="f_widget about-widget pl_70 wow fadeInLeft"
                  data-wow-delay="0.6s"
                  style={{ visibility: "visible", animationDelay: "0.6s", animationName: "fadeInLeft" }}
                >
                  <h3 className="f-title f_600 t_color f_size_18">{t("footer.help")}</h3>
                  <ul className="list-unstyled f_list">
                    <li><a href="/faq">{t("footer.faq")}</a></li>
                    <li><a href="/terms">{t("footer.terms")} </a></li>
                    <li><a href="/privacy">{t("footer.privacy")}</a></li>
                  </ul>
                </div>
              </div>

              {/* Social  ---- elmosttafa*/}
              <div className="col-lg-3 col-md-6">
                <div className="f_widget social-widget pl_70 wow fadeInLeft" data-wow-delay="0.8s" style={{ visibility: "visible", animationDelay: "0.8s", animationName: "fadeInLeft" }}>
                  <h3 className="f-title f_600 t_color f_size_18">{t("footer.social")}</h3>
                  <div className=" flex justify-center align-middle">
                    <a href="https://www.facebook.com/profile.php?id=61572671488146"  aria-label="Facebook"><svg class="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clip-rule="evenodd"/>
</svg>
</a>
                    <a href="https://www.linkedin.com/company/american-softwares/posts/?feedView=all"  aria-label="LinkedIn"><svg class="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
  <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
</svg>
</a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* decorative bg */}
          <div className="footer_bg">
            <div className="footer_bg_one"></div>
            <div className="footer_bg_two"></div>
          </div>
        </div>

        <div className="footer_bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-sm-7">
                <p className="mb-0 f_400">© American Soft Inc. 2025 — All rights reserved.</p>
              </div>
              <div className="col-lg-6 col-sm-5 text-right">
              
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

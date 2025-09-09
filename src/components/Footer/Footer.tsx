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
                    <li><a href="#">{t("footer.faq")}</a></li>
                    <li><a href="#">{t("footer.terms")} </a></li>
                    <li><a href="#">{t("footer.privacy")}</a></li>
                  </ul>
                </div>
              </div>

              {/* Social  ---- elmosttafa*/}
              <div className="col-lg-3 col-md-6">
                <div className="f_widget social-widget pl_70 wow fadeInLeft" data-wow-delay="0.8s" style={{ visibility: "visible", animationDelay: "0.8s", animationName: "fadeInLeft" }}>
                  <h3 className="f-title f_600 t_color f_size_18">{t("footer.social")}</h3>
                  <div className="f_social_icon">
                    <a href="#" className="fab fa-facebook" aria-label="Facebook"></a>
                    <a href="#" className="fab fa-twitter" aria-label="Twitter"></a>
                    <a href="#" className="fab fa-linkedin" aria-label="LinkedIn"></a>
                    <a href="#" className="fab fa-pinterest" aria-label="Pinterest"></a>
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

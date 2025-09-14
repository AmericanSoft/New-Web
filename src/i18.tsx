import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { subscribe } from "diagnostics_channel";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {

          navbar: {
            home: "Home",
            about: "About",
            contact: "Contact",
            ourProject: "Our Project",
            blog: "Blog",
            requestQuote: "Request a Quote",
            services:"Services", 
            arabic: "العربية",
            english: "English",
          },

           hero:
          {
              American:"American",
              Software: "Software" ,
              tagline: "Transforming ideas into powerful digital solutions with cutting-edge technology.\n" + "We build scalable software that drives business growth and innovation.",
              startproject : " Start Your Project Now ", 
              portfolio : " View Our Project ",
              tech:" Tech Used " ,
              leading:"Make your organization digital ", 
          } ,

          Services:
          {
            services:"Services " ,
            adv: " High Qaulity Tech " , 
            human: " To provide distinguished digital services " ,
            titleservices:"Your technology partner for building secure, fast, global products." , 
            customesoftware:" Custome Software ",
            titlecustomesoftware :"We are a custom software development company that engineers solutions precisely tailored to your needs—from requirements analysis and experience design to development, testing, and cloud deployment. We focus on performance, security, and scalability, with rapid phased delivery that ensures early returns.",
             webapp:'Web App ',
            titlewebapp: "Web apps deliver rich, install-free experiences that run on any browser, with instant updates and scalable security. We build high-performance, mobile-responsive interfaces backed by reliable cloud architecture. Our solutions integrate with your existing systems and APIs, follow security best practices, and can ship as PWAs for offline access and push notifications. ",
            mobiledev:" Mobile Devolpment  ",
            titlemobildev: "We build high-performance mobile apps with modern, intuitive UX—optimized for phones and tablets. Depending on your goals and budget, we deliver native (iOS/Android) or cross-platform (Flutter/React Native) solutions. Security, performance, offline capability, and push notifications come standard, with seamless API and back-office integrations. We use CI/CD for rapid, reliable releases and real-time analytics to continuously refine the product. " , 
            digitaltrans: "Digital Transformation " , 
            titledigitaltrans:" We help transform your organization into a smart, digital-first operation—accelerating processes, elevating customer experience, and unlocking new revenue streams. We start with a digital maturity assessment, then deliver a clear roadmap covering process automation, systems integration, data analytics, and secure cloud solutions. The outcome: higher efficiency, lower costs, and faster decision-making." ,
            uiux:"UI & UX  " , 
            titleuiux: " We turn business goals into intuitive, beautiful experiences. Starting with user and context research, we craft clear, scalable interfaces aligned with your brand. We prototype early, test with real users, measure, and iterate—until it converts and retains ",
            seo: " SEO Strategy " ,
            titleseo:" We grow your organic visibility with the right blend of Technical SEO, On-Page, and Off-Page. We map search intent, structure information, create intent-matched content, earn quality links, and optimize performance & Core Web Vitals for durable results." ,             
          },

           process:
          {
            process : " Process " ,
            headprocess: " Idea to product with quality execution measured by results " , 
            titleprocess: " We translate your goals into a reliable digital product, using the latest technologies and an agile methodology. " , 
            req: " Submit your offer now" , 
            titlereq: " Tell us about your idea or technical need in a few simple steps, and within a short time we'll get back to you with a clear implementation plan, estimated cost, and initial timeline—without complications. " , 
            offer:"Discuss the presentation " ,
            titleoffer: "  Each project has its own details. Once you submit your proposal, it will be discussed in detail." ,
            start: " Project implementation" , 
            titlestart: " We transform your idea into a clear implementation plan. We start with a discovery meeting to understand goals, audience, and scope, then develop documented requirements, anticipated risks, and a roadmap with phased releases to ensure early value is seen. " , 
            handover: " Handover " , 
            titlehandover: "We build the product in short sprints with testable releases. You receive ongoing betas, clean, documented code, and a playbook that makes it easy to get started." ,
          }, 

          testimonials :
          {
            test: " Testimonials " ,
            whatwesay:" What Other Say About us " , 
          },

          blog:
          {
            headblog:"Blog - Learn about the most prominent technical topics ",
            titleblog:"Every day we have a new technology where innovation meets execution, and ideas turn into products.." ,
            articalblogtitle:" New AI tricks are coming your way!" , 
            pragraphblogtitle:"Artificial intelligence has become a part of our daily lives—writing, summarizing, programming, and suggesting ideas. But the difference between an “average” result and a “wow!” result often lies not in the tool itself, but in how it is used. This article collects practical, proven tricks that will improve the quality of your output, whether you are a content creator, developer, or business owner.",
            readmore:"readmore ", 

          },

          Newsletter:
          {
            headnewsletter:" Newsletter " ,
            subscribe: " Subscribe now to the Technical Newsletter" ,
            titlesubscribe:" Learn about all the latest technologies and the latest offers and activities.",
            mail: "Your Mail",
            btnnew:"Subscribe Now ",
          },

          contactus:{

            constactus:"Contact   Us ", 
            titlecontactus:" Communication has now become very easy. You can",
            mail:"Email " ,
            phone: " Phone " ,
            location: "location ",
            workinghours :" Working Hours " ,
            days:" Sunday-Thursday" ,
            street: " Egypt , Giza , Haram"

          } ,

            form:{
            formbadge:" Submit your offer now" ,
            titleform:"Unleash yourself and use the latest technologies.",
            username:"Youe Name  " ,
            mail:"Your Mail " ,
            company:" Company ( OPtional  )" ,
            btnform:" Submit  ",
            validationRequired: "Please fill in all required fields",
            submitSuccess: "Request submitted successfully!",
            subject: {
            placeholder: "Select a subject",
            options: {
            web_design: "Web Design",
            mobile_app: "Mobile Application",
            custom_software: "Custom Software",
            portfolio_examples: "Portfolio / Examples",
            }
          },

          },

          project:{
            ourproject:"Our Project " ,
            btn:"View Full Project"
          },
          
           whyam:
          {
            whypadge:" Why Us " , 
            whyamerican:"  Why choose American Soft ?!",
            titleone:" We engineer software around your goals to deliver tailored solutions measured by outcomes: faster growth, lower cost, and a better user experience ." , 
            padgeone:" Mastery ",
            titletwo:" Short sprints, continuous releases, and clean, scalable, maintainable code" , 
            padgetwo:" Clean Code " ,
            titlethree:" High-quality work empowered by AI, with compelling and creative ideas " , 
            padgethree:" Our Vision ", 
            titlefour:" Your digital world at your fingertips "


          },
          footer:{
            getin: "Get Connect " , 
            dontmiss:"Sbscribe Now and Don't Miss Best Offer" , 
            mail:"Your Mail " , 
            subscribe:"Subscribe Now ", 
            pages:"Pages" , 
            help:"Support " , 
            faq:"FAQ" , 
            terms:"Terms " , 
            privacy:"Privacy", 
            social:"Follow On Socail Media" , 
          }


          

        },
      },
      ar: {
        translation: {

          navbar: {
            home: "الرئيسية",
            about: "من نحن",
            services:"خدامتنا ",
            contact: "تواصل",
            ourProject: "مشاريعنا",
            blog: "المدونة",
            requestQuote: "اطلب عرض سعر",
            arabic: "العربية",
            english: "English",
          },

          hero:
          {
             American:"امريكان",
            Software: "سوفت وير " ,
            tagline:" نُحوّل الأفكار إلى حلول رقمية فعّالة باستخدام أحدث التقنيات. نُطوّر برمجيات قابلة للتطوير تُحفّز نموّ الأعمال والابتكار." , 
            startproject : " ابدا مشروعك الأن ", 
            portfolio : " عرض المشاريع ",
            leading:" اجعل مؤسستك رقمية ",
            tech:"التقينات المتسخدمة "
          },
          Services:
          {
            services:"خدامتنا " ,
            adv: " تقنيات عالية الجودة" , 
            human: " لتقديم خدمات رقمية مميزة " ,
            titleservices:"شريكك التقني لبناء منتجات عالمية آمنة وسريعة " , 
            customesoftware:" برمجيات مخصّصة لك ",
            titlecustomesoftware :"نحن شركة تطوير برمجيات مخصّصة نُهندس حلولًا تلائم احتياجاتك بدقّة—من تحليل المتطلبات وتصميم التجربة، إلى التطوير، الاختبارات، والنشر على السحابة. نركز على الأداء والأمان وقابلية التوسّع، مع تسليم مرحلي سريع يضمن رؤية العائد مبكرًا.",
            webapp:'بناء موقع الكتروني ',
            titlewebapp:"تطبيقات الويب تمكّنك من تقديم تجربة غنية تعمل على أي متصفح بدون تثبيت، مع تحديثات فورية وأمان قابل للتوسع. نبني Web Apps بأداء عالٍ وواجهات سلسة، متوافقة مع الجوال وسطح المكتب، ومدعومة ببنية سحابية موثوقة. ندعم التكامل مع أنظمتك الحالية وواجهات API، ونستخدم أفضل ممارسات الأمان",
            mobiledev:" تطبيقات الهواتف ",
            titlemobildev: "نطوّر تطبيقات موبايل عالية الأداء تجمع بين تجربة مستخدم سلسة وواجهات عصرية، مع دعم كامل للهواتف والأجهزة اللوحية. نعمل بالتقنيات الأصلية (iOS/Android) أو الهجينة (Flutter/React Native) حسب ما يخدم أهدافك والميزانية. نهتم بالأمان، الأداء، والعمل دون اتصال، ونوفّر إشعارات فورية وتكاملًا سهلًا مع الـAPI وأنظمتك الداخلية. نعتمد CI/CD للاختبارات والإصدارات السريعة، مع تحليلات لحظية لتحسين المنتج بناءً على سلوك المستخدم." , 
            digitaltrans: "التحول الرقمي " , 
            titledigitaltrans:"نحوّل مؤسستك إلى منظومة رقمية ذكية تُسرّع العمليات وتُحسّن تجربة العملاء وتفتح مصادر دخل جديدة. نبدأ بتقييم نضجك الرقمي، ثم نضع خارطة طريق واضحة تشمل أتمتة العمليات، تكامل الأنظمة، التحليل بالبيانات، والحلول السحابية الآمنة. هدفنا نتائج ملموسة: كفاءة أعلى، تكلفة أقل، واتخاذ قرار أسرع." ,
            uiux:"واجهة وتجربة مستخدم " , 
            titleuiux: " نُحوّل الأهداف التجارية إلى تجارب استخدام بديهية وجميلة. نبدأ بفهم المستخدم والسياق، ثم نصمّم واجهات واضحة سريعة الاستيعاب، قابلة للتوسّع، ومتّسقة بصريًا مع هويّتك. نختبر مبكرًا، ونقيس بالأرقام، ونعدّل سريعًا للوصول لتجربة تُحوِّل وتُبقي المستخدمين",
            seo: "تحسين محرك البحث " ,
            titleseo:" نُحسّن حضورك على محركات البحث عبر مزيج متوازن من Technical SEO وOn-Page وOff-Page. نبدأ بفهم نية البحث وسلوك جمهورك، ثم نبني بنية معلومات واضحة، محتوى يطابق النية، وروابط موثوقة—مع تحسين أداء الموقع وCore Web Vitals لنتائج تدوم." , 


          

    
            
          },

          process:
          {
            process : " مراحل العمل " ,
            headprocess: " الفكرة إلى المنتج بجودة تنفيذ تُقاس بالنتائج " , 
            titleprocess: "  نترجم أهدافك إلى منتج رقمي موثوق، بأحدث التقنيات ومنهجية رشيقة" ,
            req: " قدم عرضك الأن " , 
            titlereq: " عرّفنا بفكرتك أو احتياجك التقني في خطوات بسيطة، وخلال وقت قصير نرجع لك بخطة تنفيذ واضحة وتكلفة تقديرية ومسار زمني مبدئي—بدون تعقيد. " , 
            offer:"مناقشة العرض  " ,
            titleoffer: "  كل مشروع ليه تفاصيله الخاصه بمجرد ما تبدا تقدم عرضك بتتم مناقشته بشكل تفصيلي " ,
            start: " تنفيذ المشروع " , 
            titlestart: " نحوّل فكرتك إلى خطة تنفيذ واضحة. نبدأ باجتماع اكتشاف لفهم الأهداف والجمهور والنطاق، ثم نخرج بمتطلبات موثّقة، مخاطر متوقعة، وخريطة طريق بإصدارات مرحلية تضمن رؤية القيمة مبكرًا. " , 
            handover: " التسليم " , 
            titlehandover:" نبني المنتج على سبرنتات قصيرة مع إصدارات قابلة للاختبار. تتلقى نسخة تجريبية مستمرة، وكود نظيف موثّق، ودليل تشغيل يسهّل الاستلام." ,
          } , 
          whyam:
          {
            whypadge:" لماذا نحن " , 
            whyamerican:"  لماذا تختار امريكان سوفت ?!",
            titleone:"نُهندس البرمجيات حول هدفك لتقديم حلول مخصّصة تُقاس بنتائجها: نمو أسرع، تكلفة أقل، وتجربة مستخدم أفضل." , 
            padgeone:" براعة ",
            titletwo:"سبرنتات قصيرة، إصدارات مستمرة، وكود نظيف قابل للتوسّع والصيانة." , 
            padgetwo:" كود نظيف " ,
            titlethree:" جودة عمل عالية بمساعده الذكاء الاصطناعي ووجود افكار جذابة ورائعة " , 
            padgethree:" رؤيتنا ", 
            titlefour:"عالمك الرقمي بين يديك "


          },
          project:{
            ourproject:"مشاريع من  تنفيذنا " ,
            btnproject:"عرض المشروع  "
          },

          testimonials :
          {
            test: " اراء عملائنا " ,
            whatwesay:" ماذا يقول عملاؤنا عنا " , 
          },

          Newsletter:
          {
            headnewsletter:" النشرة الاخبارية " ,
            subscribe: " اشترك الأن في النشرة الاخبارية التقنية " ,
            titlesubscribe:" تعرف علي جميع التقنيات الحديثة الموجودة واحدث العروض والنشاطات ",
            mail:"بريدك الالكتروني " ,
            btnnew:"اشترك الان " ,
            Submitting:" يتم الاشتراك ...... "
          },

          blog:
          {
            headblog:"المدونة - تعرف علي ابرز المواضيع التقينة ",
            titleblog:"كل يوم لدينا تقنية جديدة حيث يلتقي الابتكار بالتنفيذ، وتتحول الأفكار إلى منتجات." ,
            articalblogtitle:" حيل جديدة من الذكاء الاصظناعي قادمة اليكم في الطريق " , 
            pragraphblogtitle:"صار الذكاء الاصطناعي جزءًا من يومنا—يكتب، يلخّص، يبرمج، ويقترح أفكارًا. لكن الفرق بين نتيجة “عاديّة” ونتيجة “واو!” غالبًا مش في الأداة نفسها، بل في طريقة الاستخدام. هذه المقالة تجمع حِيلًا عملية مجرّبة ترفع جودة مخرجاتك، سواء كنت صانع محتوى، مطوّر، أو صاحب مشروع.", 
            readmore:"قراءة المزيد"

          },

          contactus:{

            constactus:"اتصل بنا ", 
            titlecontactus:" التواصل الأن اصبح سهل جدا يمكنك ",
            mail:"البريد الالكتروني " ,
            phone: " الهاتف " ,
            location: "المكان ",
            workinghours :" مواعيد العمل " ,
            days:" الاحد - الخميس" ,
            street: " مصر - الجيزة - الهرم "

          },

          form:{

            formbadge:" قدم عرضك الأن " ,
            titleform:"اطلق لنفسك العنان واستخدم احدث التقنيات",
            username:"اسمك " ,
            mail:"بريدك الالكتروني " ,
            company:"اسم شركتك (اختياري )" ,
            btnform:" تقديم عرض ",
            validationRequired: "من فضلك املئ جميع الحقول ",
            submitSuccess: "تم تسجيل طلبك بنجاح !",
            subject: {
            placeholder: "اختر الخدمة ",
            options: {
            web_design: "تصميم ويب ",
            mobile_app: "تطبيق للهاتف ",
            custom_software: "انظمة مخصصة ",
            portfolio_examples: "واجهات شخصية ",
            }
          },

            

          },

          footer:
          {
            getin:"تواصل معنا بسهولة " ,
            dontmiss:" لا تفوت احدث العروض والاخبار " , 
            mail:"بريدك الالكتروني " ,
            subscribe:"اشترك الان " ,
            pages:"صفحات اخري  " ,
            faq:"الاسئلة الشائعة " ,
            privacy:"سياسة الخصوصية " , 
            terms:"الاتفاقيات و الشروط " , 
           social:"تابعونا علي :" ,
           help:"الدعم " ,
          }


      

        },
      },
    },
    fallbackLng: "en",
    defaultNS: "translation",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "querystring", "cookie"],
      caches: ["localStorage"],
    },
    supportedLngs: ["en", "ar"],
    nonExplicitSupportedLngs: true, // يحوّل ar-EG -> ar
  });

// اضبط اتجاه الصفحة مع تغيير اللغة
const updateDir = (lng: string) => {
  const isAr = lng.startsWith("ar");
  document.documentElement.dir = isAr ? "rtl" : "ltr";
  document.documentElement.lang = isAr ? "ar" : "en";
};
i18n.on("languageChanged", updateDir);
updateDir(i18n.language || "en");

export default i18n;

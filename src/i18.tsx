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
            requestQuote: "Request a Servcies",
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
            readmore:"Read More ", 

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
            phone:"Phone",
            country:"Country" ,
            phoneHint:"Phone Hint",
            notesLabel:"Notes ", 
            company:" Company ( OPtional  )" ,
            btnform:" Submit  ",
            notesPlaceholder:"Write any information about you project",
            notesHint:"Notes Hint " ,
            validationRequired: "Please fill in all required fields",
            submitSuccess: "Request submitted successfully!",
            faq: {
    miniTitle: "Quick Questions",
    q1: "When will you respond to messages?",
    a1: "Usually within 24 business hours.",
    q2: "Can we do a quick call?",
    a2: "Yes—after the initial inquiry, we’ll schedule a suitable time.",
  },

            subject: {
            placeholder: "Select a subject",
            options: {
            web_design: "Web Design",
            mobile_app: "Mobile Application",
            custom_software: "Custom Software",
            portfolio_examples: "Portfolio / Examples",
            seo_strategy:"Seo Strategy",
            }
          },

          },

          projects: {
  title: "Our Projects",
  subtitle: "Browse our web, mobile and SEO work with quick filters.",
  tabs: { all: "All", web: "Web", mobile: "Mobile", seo: "SEO" },
  badge: { web: "Web", mobile: "Mobile", seo: "SEO" },
  viewBtn: "View Project",
  error: "Failed to load projects."
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
            dontmiss:"Subscribe Now and Don't Miss Best Offer" , 
            mail:"Your Mail " , 
            subscribe:"Subscribe Now ", 
            pages:"Pages" , 
            help:"Support " , 
            faq:"FAQ" , 
            terms:"Terms " , 
            privacy:"Privacy", 
            social:"Follow On Socail Media" , 
             company:"About Company ",
            androidapp:" Android App",
            ios:"IOS",
            desktop:"Desktop ",
            project:"Our Projects ",
         
          }, 
          privacy: {
             lastUpdatedLabel: "Last updated:",
             lastUpdatedFallback: "Sep 16, 2025",
             tocTitle: "Table of Contents",
             headerTitle:"Privacy Policy - American Soft",
             email:"email",
             phone:"phone number ",
             address:"Address",
              toc: {
                  intro: "Introduction",
                  data: "Data We Collect",
                  use: "How We Use Your Data",
                  legal: "Legal Bases",
                  cookies: "Cookies & Tracking",
                  analytics: "Analytics & Third-Party Tools",
                  sharing: "Data Sharing",
retention: "Data Retention",
security: "Security",
international: "International Transfers",
rights: "Your Rights",
children: "Children's Data",
changes: "Changes to this Policy",
contact: "Contact Us"
                 },
intro: {
p1: "At <strong>American Softwares</strong> , we are committed to protecting your privacy. This policy explains what data we collect, how we use it, and your choices. By using our site/services you agree to this policy."
},
data: {
li1: "<strong>Contact data:</strong> name, email, phone, company.",
li2: "<strong>Usage data:</strong> pages visited, session duration, referrals, engagement.",
li3: "<strong>Forms/uploads:</strong> content you submit via forms or files.",
li4: "<strong>Cookies/device IDs:</strong> for performance and personalization."
},
use: {
li1: "Provide and improve services and support.",
li2: "Analyze performance and UX; measure marketing effectiveness.",
li3: "Send relevant updates or offers (you can unsubscribe anytime).",
li4: "Comply with legal obligations and respond to official requests."
},
legal: { p1: "We rely on contract performance, explicit consent, legitimate interests (service improvement, security), and legal obligations." },
cookies: { p1: "We use cookies/localStorage and similar identifiers to enable core functions and analyze usage. Manage preferences via your browser or our cookie banner (if available)." },
analytics: { p1: "We may use tools like Google Analytics and Search Console. These tools process usage data under their own policies; you can limit tracking via browser add‑ons." },
sharing: {
li1: "Service providers (hosting, email, analytics) under data‑protection agreements.",
li2: "Where required by law or regulators.",
li3: "In mergers/acquisitions with appropriate notice."
},
retention: { p1: "We retain data only as long as necessary for the stated purposes or as required by law, then delete or anonymize it securely." },
security: { p1: "We apply appropriate technical/organizational measures (encryption, access control, backups) to protect data." },
international: { p1: "Some data may be transferred to servers/providers outside your country with appropriate safeguards." },
rights: {
li1: "Access, correct, or request deletion of your data.",
li2: "Object to or restrict processing in certain cases.",
li3: "Withdraw consent where processing is based on consent.",
li4: "Data portability where applicable.",
cta: "To exercise your rights, contact us at"
},
children: { p1: "Our services target adults; we do not knowingly collect data from children. If you believe a child provided data, please contact us." },
changes: { p1: "We may update this policy from time to time. Continued use means you accept the updated version; check the date above." },
contact: { email: "americansoft8@gmail.com", phone: "01080002209", address: "Egypt , Giza , Haram" }
          },



          faq: {
  title: "Frequently Asked Questions — American Soft",
  subtitle:
    "Clear, concise answers covering SEO, content, UX, performance, and development—aligned with search intent and Google updates.",
  searchLabel: "Search FAQs",
  searchPlaceholder: "Search: SEO, content plan, speed, migration…",
  noResults: "No matching results.",
  items: [
    {
      q: "What are American Soft’s core services? Do you support Arabic and English?",
      a: "We deliver an integrated stack: full SEO (technical/content/internal links), long-term content strategy, UX and speed optimization, schema setup, GA4/Search Console tracking, and WordPress/React front-end development. We fully support both Arabic and English."
    },
    {
      q: "How long until SEO results start to show with American Soft?",
      a: "You typically see early indicators in 4–8 weeks (impressions & visits trending up), with stronger growth in 3–6 months for competitive pages. Timelines vary by competition, content quality, and site history."
    },
    {
      q: "Do you rely on AI to write content?",
      a: "We use AI as an assistive tool only—every piece is human-edited, sourced, and aligned with E-E-A-T and your brand voice."
    },
    {
      q: "How do you run a Technical SEO audit at American Soft?",
      a: "We check crawl/indexing, sitemaps, hreflang, internal linking, speed and Core Web Vitals, schema, orphan pages, and technical conflicts. You receive a prioritized action plan and implementation roadmap."
    },
    {
      q: "Do you build full Topic Clusters?",
      a: "Yes. We create layered clusters (pillar pages + supporting articles), multi-intent coverage, FAQs, and smart internal links. We map short/long-tail keywords and synonyms to cover the market comprehensively."
    },
    {
      q: "What is your link-building policy?",
      a: "We focus on strong internal links and great UX; we avoid manipulative backlink tactics. We prefer editorial partnerships, brand mentions, and naturally earned links from high-value content."
    },
    {
      q: "Do you provide regular performance reports?",
      a: "Yes—monthly reports including keyword growth, organic traffic, top pages, indexing issues, and content plan progress, with actionable recommendations."
    },
    {
      q: "Do you build fast sites that pass Core Web Vitals?",
      a: "Yes. We apply performance best practices (image optimization, smart caching, lazy loading, clean code) and track CLS/LCP/INP for a smooth experience."
    },
    {
      q: "What CMS do you prefer? Do you support WooCommerce?",
      a: "WordPress is our first choice for flexibility and SEO. We fully support WooCommerce with custom themes, shortcodes, Google Sheets integrations, and Rank Math/Yoast setups."
    },
    {
      q: "Do you offer Local SEO (targeting specific areas)?",
      a: "Yes. We build location pages aligned with search intent, optimize Google Business Profiles, and create local content (e.g., Cairo, Giza, New Cairo), with LocalBusiness structured data."
    },
    {
      q: "How do you handle Google updates (SGE / Helpful Content)?",
      a: "We design evergreen content, prioritize reader experience, strong structure (H2/H3/tables), direct answers, and FAQ/Article/Service schema—reviewed regularly for updates."
    },
    {
      q: "What are your contract terms and payment options?",
      a: "Usually monthly plans with flexible contracts, clear goals and KPIs. Electronic payments and official invoicing are provided."
    },
    {
      q: "Do you write service pages and FAQ pages?",
      a: "Yes—SEO-optimized service pages with unique, varied FAQs, smart internal linking, CTAs, and structured data."
    },
    {
      q: "Can you migrate our site and improve its structure without losing indexing?",
      a: "Yes—with a migration plan including 301 maps, internal link checks, schema updates, and Search Console testing pre/post launch."
    },
    {
      q: "What makes American Soft different?",
      a: "We merge engineering and SEO: clean code, optimized React/Tailwind components, high-quality long-form content, and measurable outcomes."
    },
    {
      q: "How do we get started?",
      a: "Contact us for a free assessment: we review your site, identify gaps, and deliver a step-by-step roadmap with priorities and expected timelines."
    }
  ]
          },

          terms: {
  brand: "American Soft",
  company: "American Group for Software & Marketing",
  email: "americansoft8@gmail.com",
  address: "Cairo, Egypt",
  phone: "01080002209",
  lastUpdatedFallback: "Sep 16, 2025",

  headerTitle: "Terms & Conditions — {{brand}}",
  lastUpdatedLabel: "Last updated:",
  tocTitle: "Table of Contents",
  toc: {
    acceptance: "Acceptance of Terms",
    definitions: "Definitions",
    scope: "Scope of Service",
    accounts: "Accounts & Privacy",
    payments: "Payments & Billing",
    content: "Content & Intellectual Property",
    acceptableUse: "Acceptable Use & Prohibited Practices",
    warranty: "Disclaimer of Warranties",
    liability: "Limitation of Liability",
    changes: "Changes to the Terms",
    termination: "Termination",
    law: "Governing Law & Dispute Resolution",
    contact: "Contact Us"
  },

  sections: {
    acceptance: {
      p1: "By using the websites and services of <strong>American Softwares</strong> , you agree to these Terms & Conditions and the Privacy Policy. If you do not agree to any part, please discontinue use of the site and service."
    },
    definitions: {
      li1: "<strong>Service:</strong> includes SEO, content writing, front-end/WordPress development, performance/speed optimization, and consulting.",
      li2: "<strong>Client:</strong> any person or entity that contracts with us to receive the Service.",
      li3: "<strong>Content:</strong> texts, images, code, designs, files, and materials created or published within the project."
    },
    scope: {
      p1: "The scope is defined in a technical/financial proposal or a separate purchase order/contract including requirements, deliverables, delivery schedule, and responsibilities. Any extra work outside scope requires a new agreement with time/cost adjustments."
    },
    accounts: {
      p1: "Providing the Service may require access to the Client’s tools (e.g., WordPress, Google Search Console, Analytics, Facebook Business Manager). Both parties must keep access and data confidential. Data collection/use follows our Privacy Policy."
    },
    payments: {
      li1: "Fees are paid as per the proposal/contract and agreed payment milestones.",
      li2: "Fees for SEO hours/packages or development are non-refundable after commencement.",
      li3: "Prices may include applicable taxes and transfer/processing fees depending on country and payment method."
    },
    content: {
      li1: "Ownership of original materials supplied by the Client remains with the Client.",
      li2: "The Client is granted a license to use deliverables we create upon full settlement of dues.",
      li3: "Removing copyright notices or reselling templates/code without written permission is prohibited."
    },
    acceptableUse: {
      li1: "You must not use the Service for unlawful activities or to infringe others’ rights.",
      li2: "We reject misleading SEO practices (Spam/Bulk Backlinks/Hidden Text, etc.).",
      li3: "The Client must provide accurate, non-infringing data and content."
    },
    warranty: {
      p1: "Services are provided “as is” and “as available” without express or implied warranties. We do not guarantee top rankings or specific results within fixed timelines due to market variability and search engine updates."
    },
    liability: {
      p1: "To the extent permitted by law, <strong>American Softwares </strong> is not liable for indirect or consequential damages or loss of profits arising from use of the Service. In all cases, our total liability shall not exceed the amounts paid for the Service during the last three months."
    },
    changes: {
      p1: "We may update these Terms from time to time. Continued use after posting changes constitutes acceptance of the updated version. Please review the last-updated date above."
    },
    termination: {
      p1: "Either party may terminate according to the proposal/contract terms. Upon termination, completed, paid-for deliverables up to the termination date will be handed over."
    },
    law: {
      p1: "These Terms are governed by the laws of the Arab Republic of Egypt. Disputes will be resolved amicably first, then through the competent authorities in Egypt if necessary."
    },
    contact: {
      email: "Email",
      phone: "Phone",
      address: "Address"
    }
  }
          },

          about: {
  meta: {
    brand: "American Soft",
    company: "American Group for Software & Marketing",
    email: "americansoft8@gmail.com",
    phone: "01080002209",
    address: "Cairo, Egypt",
    website: "https://americansoft.example.com"
  },
  seo: {
    title: "About {{brand}}",
    desc: "{{brand}} builds secure, fast, scalable software that drives growth and great user experience."
  },
  badge: "About Us",
  title: "We turn ideas into reliable digital products",
  subtitle:
    "We’re a technology partner focused on outcomes—clean code, measurable SEO, and delightful UX. We combine engineering with growth to ship features faster and safer.",

  highlights: [
    "Custom software & web apps with clean, scalable architecture",
    "Mobile apps (iOS/Android or cross-platform) with modern UX",
    "Full-stack SEO: technical, on-page, content & internal links",
    "Core Web Vitals & performance budgets across the stack",
    "Secure cloud deployments, CI/CD and observability",
    "Discovery, roadmaps, and analytics for measurable results"
  ],

  stats: {
    items: [
      { label: "Projects delivered", value: "120+" },
      { label: "Avg. client satisfaction", value: "97%" },
      { label: "Core Web Vitals pass rate", value: "90%+" },
      { label: "Years of experience", value: "7+" }
    ]
  },

  mission: {
    title: "Our Mission",
    desc: "Deliver high-quality software and SEO that accelerate growth while keeping code maintainable, secure, and future-proof."
  },
  vision: {
    title: "Our Vision",
    desc: "Become a trusted engineering partner in MENA—where business impact meets technical excellence."
  },
  values: {
    title: "Values",
    items: [
      { title: "Ownership", desc: "We care about outcomes and take responsibility end-to-end." },
      { title: "Clarity", desc: "Simple, documented, measurable work that ships." },
      { title: "Quality", desc: "Clean code, strong UX, and sustainable SEO." }
    ]
  },

  process: {
    title: "How we work",
    stepLabel: "Step {{n}}",
    steps: [
      { title: "Discovery & plan", desc: "Goals, audience, scope, risks, and a phased roadmap." },
      { title: "Design & prototype", desc: "UX flows, UI patterns, and early validation with users." },
      { title: "Build & iterate", desc: "Short sprints, CI/CD, tests, and observability." },
      { title: "Launch & grow", desc: "Performance, SEO, analytics, and continuous improvement." }
    ]
  },

  stack: {
    title: "Tech we use",
    items: ["React", "Next.js", "Tailwind", "Node.js", "NestJS", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "GCP", "Flutter"]
  },

  cta: {
    title: "Ready to build?",
    desc: "Tell us about your idea. We’ll reply with a clear plan, timeline, and estimate.",
    btn: "Request a proposal"
  },
  contactLine: "Prefer a quick chat? Call"
          },

          service: {
  android: {
    badge: "Android Development",
    title: "High-performance Android apps — built for scale",
    subtitle: "Native or cross-platform Android apps with modern UI, offline support, and secure integrations.",
    serviceType: "Android application development",
    features: [
      "Native (Kotlin) or cross-platform (Flutter/React Native)",
      "Modern UI patterns (Material 3), responsive layouts",
      "Offline mode, background sync, push notifications",
      "Robust API integrations and secure auth",
      "CI/CD, automated tests, and analytics"
    ],
    benefitsTitle: "Why Android with us?",
    benefits: [
      "Faster time-to-market with clean, maintainable code",
      "Great performance and battery-aware design",
      "Scalable architecture for future features",
      "Release with monitoring, crash reporting, and KPIs"
    ],
    stackTitle: "Tech we use",
    stack: ["Kotlin", "Jetpack", "Compose", "Flutter", "React Native", "Firebase", "Room", "Retrofit"],
    cta: { title: "Ready to launch your Android app?", desc: "Tell us your idea and goals. We’ll propose the best approach and timeline.", btn: "Request a proposal" }
  },
  ios: {
    badge: "iOS Development",
    title: "Elegant iOS apps — performance and polish",
    subtitle: "Swift-based iOS apps with delightful UX, secure data, and best-in-class performance.",
    serviceType: "iOS application development",
    features: [
      "Native Swift/SwiftUI or cross-platform (Flutter/React Native)",
      "Beautiful UI, accessibility, and motion design",
      "Keychain, biometric auth, secure storage",
      "App Store delivery, TestFlight, and analytics",
      "CI/CD pipelines and QA automation"
    ],
    benefitsTitle: "Why iOS with us?",
    benefits: [
      "Pixel-perfect design aligned with Apple HIG",
      "Smooth animations and energy-efficient delivery",
      "Privacy-minded architecture and secure APIs",
      "Measurable growth with product analytics"
    ],
    stackTitle: "Tech we use",
    stack: ["Swift", "SwiftUI", "Combine", "UIKit", "Flutter", "React Native", "CoreData", "Alamofire"],
    cta: { title: "Build a premium iOS experience", desc: "We’ll help you ship fast with quality and metrics from day one.", btn: "Start your project" }
  },
  desktop: {
    badge: "Desktop Apps",
    title: "Reliable desktop applications for business and pro users",
    subtitle: "Cross-platform desktop apps with offline-first architecture and seamless updates.",
    serviceType: "Desktop application development",
    features: [
      "Cross-platform (Electron/Tauri) or native",
      "Auto-updates, crash reporting, and telemetry",
      "Local database and sync conflict handling",
      "Plugin-ready architecture and secure IPC",
      "Theming, accessibility, and keyboard-first UX"
    ],
    benefitsTitle: "Why Desktop with us?",
    benefits: [
      "Rock-solid releases with CI/CD and QA suites",
      "Optimized memory/CPU footprint and smooth UI",
      "Modular architecture for long-term evolution",
      "Enterprise security and signed installers"
    ],
    stackTitle: "Tech we use",
    stack: ["Electron", "Tauri", "Node.js", "Rust", "C#", ".NET", "SQLite", "LevelDB"],
    cta: { title: "Need a powerful desktop app?", desc: "Let’s plan features, roadmap, and the delivery pipeline together.", btn: "Request a proposal" }
  }
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
            whyamerican:"  لماذا تختار امريكان سوفت ؟!",
            titleone:"نُهندس البرمجيات حول هدفك لتقديم حلول مخصّصة تُقاس بنتائجها: نمو أسرع، تكلفة أقل، وتجربة مستخدم أفضل." , 
            padgeone:" براعة ",
            titletwo:"سبرنتات قصيرة، إصدارات مستمرة، وكود نظيف قابل للتوسّع والصيانة." , 
            padgetwo:" كود نظيف " ,
            titlethree:" جودة عمل عالية بمساعده الذكاء الاصطناعي ووجود افكار جذابة ورائعة " , 
            padgethree:" رؤيتنا ", 
            titlefour:"عالمك الرقمي بين يديك "


          },
         projects: {
  title: "مشاريعنا",
  subtitle: "استعرض أعمال الويب والتطبيقات والسيو مع فلاتر سريعة.",
  tabs: { all: "الكل", web: "ويب", mobile: "هواتف", seo: "سيو" },
  badge: { web: "ويب", mobile: "هواتف", seo: "سيو" },
  viewBtn: "عرض المشروع",
  error: "تعذّر تحميل المشاريع."
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
            phone:" رقم الهاتف " ,
            country:"الدولة" ,
            phoneHint:"تعليمات كتابة  الرقم ", 
            notesLabel:"ملاحظات اضافية ",
            notesPlaceholder:"اترك ملاحظاتك او اي معلومات بخصوص مشروعك ",
            notesHint:"اترك ملاحظاتك ",
            company:"اسم شركتك (اختياري )" ,
            btnform:" تقديم عرض ",
            validationRequired: "من فضلك املئ جميع الحقول ",
            submitSuccess: "تم تسجيل طلبك بنجاح !",
            faq: {
    miniTitle: "أسئلة سريعة",
    q1: "متى نرد على الرسائل؟",
    a1: "عادةً خلال 24 ساعة عمل.",
    q2: "هل يمكن مكالمة سريعة؟",
    a2: "نعم، بعد الاستفسار الأولي نحدّد موعدًا مناسبًا.",
  },

            subject: {
            placeholder: "اختر الخدمة ",
            options: {
            web_design: "تصميم ويب ",
            mobile_app: "تطبيق للهاتف ",
            custom_software: "انظمة مخصصة ",
            portfolio_examples: "واجهات شخصية ",
            seo_strategy:"استراتجيات سيو ",
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
            company:"عن الشركة",
            androidapp:" اندرويد",
            ios:"IOS",
            desktop:"سطح المكتب ",
            project:"اعمالنا",
          } , 
          privacy: {
brand: "امريكان سوفت",
company: "American Group for Software & Marketing",
email: "americansoft8@gmail.com",
address: "مصر – الجيزة – الهرم",
phone: "01080002209",
website: "https://americangroup-eg.com",
headerTitle: "سياسة الخصوصية — {{brand}}",
lastUpdatedLabel: "آخر تحديث:",
lastUpdatedFallback: "16 سبتمبر 2025",
tocTitle: "فهرس المحتوى",
toc: {
intro: "مقدمة",
data: "البيانات التي نجمعها",
use: "كيف نستخدم بياناتك",
legal: "الأسس القانونية",
cookies: "الكوكيز وتقنيات التتبّع",
analytics: "التحليلات وأدوات الطرف الثالث",
sharing: "مشاركة البيانات",
retention: "مدة الاحتفاظ بالبيانات",
security: "الأمن وحماية البيانات",
international: "نقل البيانات دوليًا",
rights: "حقوقك في الخصوصية",
children: "بيانات الأطفال",
changes: "التغييرات على هذه السياسة",
contact: "التواصل معنا"
},
intro: { p1: "في <strong> امريكان سوفت ويرز </strong>، نلتزم بحماية خصوصيتك. توضّح هذه السياسة أنواع البيانات التي نجمعها وكيفية استخدامها ومشاركتها والخيارات المتاحة لك. باستخدامك لموقعنا/خدماتنا فإنك توافق على هذه السياسة." },
data: {
li1: "<strong>بيانات الاتصال:</strong> الاسم، البريد الإلكتروني، الهاتف، الشركة.",
li2: "<strong>بيانات الاستخدام:</strong> الصفحات التي تزورها، مدة الجلسة، المصدر، التفاعل.",
li3: "<strong>النماذج/الملفات:</strong> المحتوى الذي ترسله عبر النماذج أو الملفات.",
li4: "<strong>الكوكيز/معرّفات الأجهزة:</strong> لتحسين الأداء وتخصيص التجربة."
},
use: {
li1: "تقديم الخدمات وتحسينها ودعم العملاء.",
li2: "تحليل الأداء وتجربة المستخدم وقياس فعالية التسويق.",
li3: "إرسال تحديثات أو عروض ذات صلة (مع إمكانية إلغاء الاشتراك).",
li4: "الامتثال للمتطلبات القانونية والرد على الطلبات الرسمية."
},
legal: { p1: "نعتمد على تنفيذ العقد، الموافقة الصريحة، المصالح المشروعة (تحسين الخدمة، الأمان)، والالتزامات القانونية." },
cookies: { p1: "نستخدم الكوكيز وlocalStorage ومعرّفات مماثلة لتمكين الوظائف الأساسية وتحليل الاستخدام. يمكنك إدارة التفضيلات من المتصفح أو عبر لافتة الكوكيز." },
analytics: { p1: "قد نستخدم أدوات مثل Google Analytics وSearch Console. تعالج هذه الأدوات بيانات الاستخدام وفق سياساتها، ويمكنك الحد من التتبّع عبر إضافات المتصفح." },
sharing: { li1: "مزوّدو خدمة (استضافة، بريد، تحليلات) ضمن اتفاقيات حماية بيانات.", li2: "عند طلب القانون أو الجهات التنظيمية.", li3: "في حالات الاندماج/الاستحواذ مع إخطار مناسب." },
retention: { p1: "نحتفظ بالبيانات للمدة اللازمة للأغراض المذكورة أو كما يقتضيه القانون، ثم نحذفها أو نجهّلها بأمان." },
security: { p1: "نطبّق إجراءات تقنية وتنظيمية مناسبة (تشفير، تحكّم صلاحيات، نسخ احتياطي) لحماية البيانات." },
international: { p1: "قد تُنقل بعض البيانات إلى خوادم/مزودين خارج بلدك مع ضمانات مناسبة." },
rights: { li1: "الوصول إلى بياناتك وتصحيحها أو طلب حذفها.", li2: "الاعتراض على المعالجة أو تقييدها في حالات معيّنة.", li3: "سحب الموافقة عندما يكون الأساس القانوني هو الموافقة.", li4: "نقل البيانات حيثما ينطبق.", cta: "لممارسة حقوقك، راسلنا على" },
children: { p1: "خدماتنا موجّهة للبالغين. لا نجمع عن قصد بيانات من الأطفال؛ إن ظننت خلاف ذلك تواصل معنا." },
changes: { p1: "قد نحدّث هذه السياسة من وقت لآخر. استمرار الاستخدام يعني موافقة على النسخة المحدّثة؛ راجع تاريخ آخر تحديث." },
contact: { email: "البريد الإلكتروني", phone: "الهاتف", address: "العنوان" }
          },  

          faq: {
  title: "الأسئلة الشائعة — American Soft",
  subtitle:
    "إجابات واضحة ومختصرة تغطي السيو والمحتوى وتجربة المستخدم والأداء والتطوير — متوافقة مع نية البحث وتحديثات جوجل.",
  searchLabel: "ابحث في الأسئلة",
  searchPlaceholder: "ابحث: سيو، خطة محتوى، سرعة، ترحيل…",
  noResults: "لا توجد نتائج مطابقة للبحث.",
  items: [
    {
      q: "ما هي خدمات American Soft الأساسية؟ وهل تدعمون العربية والإنجليزية؟",
      a: "نقدّم حزمة متكاملة: SEO شامل (تقني/محتوى/روابط داخلية)، إنشاء خطة محتوى طويلة الأمد، تحسين تجربة المستخدم والسرعة، إعداد السكيما، تتبّع الأداء عبر GA4 و Search Console، وتصميم/تطوير مواقع ووردبريس وواجهات React. ندعم العربية والإنجليزية بالكامل."
    },
    {
      q: "كم يستغرق ظهور نتائج السيو مع American Soft؟",
      a: "عادةً نبدأ بمؤشرات واضحة خلال 4–8 أسابيع (تحسّن الانطباعات والزيارات)، مع نمو أقوى خلال 3–6 أشهر للصفحات التنافسية. يعتمد ذلك على المنافسة وجودة المحتوى وسجلّ الموقع."
    },
    {
      q: "هل تعتمدون على الذكاء الاصطناعي في كتابة المحتوى؟",
      a: "نستخدم الذكاء الاصطناعي كأداة مساعدة فقط، مع تحرير بشري كامل، وتدعيم بالمصادر، وإضافة خبرة وتجربة (E-E-A-T) وصوت علامتكم التجارية."
    },
    {
      q: "كيف يتم تدقيق Technical SEO في American Soft؟",
      a: "نفحص الزحف والفهرسة، خريطة الموقع، hreflang، بنية الروابط الداخلية، السرعة و Core Web Vitals، السكيما، الصفحات اليتيمة، والتعارضات التقنية. نسلم تقريرًا بالإصلاحات مع أولويات واضحة وخطة تنفيذ."
    },
    {
      q: "هل تنشئون خطة محتوى متكاملة (Topic Cluster)؟",
      a: "نعم، نبني عناقيد موضوعية بطبقات (صفحات ركيزة + مقالات داعمة)، نية بحث متعددة، أسئلة شائعة، وروابط داخلية ذكية. نُدخل كلمات رئيسية قصيرة وطويلة ومترادفات لتغطية السوق بالكامل."
    },
    {
      q: "ما سياسة بناء الروابط لديكم؟",
      a: "نركّز على روابط داخلية قوية وتجربة مستخدم ممتازة، ونرفض ممارسات الباك لينك المضللة. نفضّل الشراكات التحريرية، وذكر العلامة، والروابط الطبيعية الناتجة عن محتوى عالي القيمة."
    },
    {
      q: "هل توفّر American Soft تقارير أداء دورية؟",
      a: "نعم، تقارير شهرية واضحة تشمل نمو الكلمات المفتاحية، الزيارات العضوية، الصفحات الأعلى أداءً، مشاكل الفهرسة، وسير خطة المحتوى، مع توصيات تنفيذ قابلة للتطبيق."
    },
    {
      q: "هل تبنون مواقع سريعة ومتوافقة مع Core Web Vitals؟",
      a: "نعم، نستخدم ممارسات تحسين الأداء (تحجيم الصور، كاشينج ذكي، تحميل كسول، كود نظيف)، ونقيس CLS/LCP/INP لضمان سرعة وتجربة سلسة."
    },
    {
      q: "ما نظام إدارة المحتوى المفضّل لديكم؟ وهل تدعمون WooCommerce؟",
      a: "ووردبريس هو الخيار الأول لدينا بسبب المرونة والسيو. ندعم WooCommerce بالكامل، مع قوالب مخصصة، شورت كود، ربط نماذج بجوجل شيت، وإعدادات Rank Math/Yoast."
    },
    {
      q: "هل تقدّمون Local SEO واستهداف مناطق معينة؟",
      a: "نعم، ننشئ صفحات محلية متوافقة مع نية البحث، ملفات Google Business Profile، ومحتوى محلي (Cairo, Giza, New Cairo…)، مع بيانات منظّمة لنوع LocalBusiness."
    },
    {
      q: "كيف تتعاملون مع تحديثات جوجل (SGE/Helpful Content)؟",
      a: "نصمّم محتوى طويل المدى (Evergreen)، ونركّز على تجربة القارئ، وضوح البنية (H2/H3/جداول)، إجابات مباشرة، وسكيما FAQ/Article/Service مع مراجعة دورية للتحديثات."
    },
    {
      q: "ما هي مدة العقود والدفع؟",
      a: "غالبًا باقات شهرية بعقود مرنة، مع أهداف واضحة ومؤشرات أداء. الدفع إلكترونيًا وفواتير رسمية."
    },
    {
      q: "هل تقدّمون كتابة صفحات الخدمة وصفحات الأسئلة الشائعة؟",
      a: "نعم، نكتب صفحات خدمة محسّنة للسيو مع أسئلة شائعة فريدة ومتنوعة، بروابط داخلية، وأزرار CTA وبيانات منظّمة."
    },
    {
      q: "هل يمكن ترحيل موقعنا وتحسين بنيته دون فقدان الفهرسة؟",
      a: "نعم، بخطة ترحيل تشمل خرائط 301، فحص الروابط الداخلية، تحديث السكيما، واختبار Search Console قبل/بعد الإطلاق."
    },
    {
      q: "ما الذي يميّز American Soft عن غيرها؟",
      a: "دمج التقنية بالسيو: كود نظيف، مكوّنات React/Tailwind محسّنة، محتوى طويل احترافي، وتركيز على نتائج قابلة للقياس."
    },
    {
      q: "كيف نبدأ معكم؟",
      a: "تواصلوا معنا لتقييم مجاني: نفحص وضع الموقع، نحدّد الفجوات، ونقدّم خارطة طريق بالخطوات والأولويات والزمن المتوقع."
    }
  ]
          },

          terms: {
  brand: "American Soft",
  company: "American Group for Software & Marketing",
  email: "americansoft8@gmail.com",
  address: "مصر – القاهرة",
  phone: "01080002209",
  lastUpdatedFallback: "16 سبتمبر 2025",

  headerTitle: "شروط وأحكام الاستخدام — {{brand}}",
  lastUpdatedLabel: "آخر تحديث:",
  tocTitle: "فهرس المحتوى",
  toc: {
    acceptance: "قبول الشروط",
    definitions: "التعريفات",
    scope: "نطاق الخدمة",
    accounts: "الحسابات والخصوصية",
    payments: "الدفع والفوترة",
    content: "المحتوى وحقوق الملكية الفكرية",
    acceptableUse: "الاستخدام المقبول والممارسات المحظورة",
    warranty: "إخلاء المسؤولية من الضمانات",
    liability: "تحديد المسؤولية",
    changes: "التعديلات على الشروط",
    termination: "إنهاء الخدمة",
    law: "القانون الحاكم وحل النزاعات",
    contact: "التواصل معنا"
  },

  sections: {
    acceptance: {
      p1: "باستخدامك لمواقع وخدمات <strong>امريكان سوفت ويرز</strong>، فإنك توافق على هذه الشروط والأحكام وسياسة الخصوصية. إذا لم توافق على أي جزء من هذه الشروط، فيُرجى التوقف عن استخدام الموقع والخدمة."
    },
    definitions: {
      li1: "<strong>الخدمة:</strong> تشمل خدمات السيو، كتابة المحتوى، تطوير الواجهات ووردبريس، تحسين الأداء/السرعة، والاستشارات.",
      li2: "<strong>العميل:</strong> أي شخص طبيعي أو اعتباري يتعاقد معنا للحصول على الخدمة.",
      li3: "<strong>المحتوى:</strong> النصوص، الصور، الشيفرات البرمجية، التصاميم، الملفات، والمواد التي يتم إنشاؤها أو نشرها ضمن المشروع."
    },
    scope: {
      p1: "يُحدَّد نطاق العمل في عرض فني/مالي أو في أمر شراء/عقد منفصل يتضمن المتطلبات، المخرجات، جدول التسليم، وحدود المسؤولية. أي أعمال إضافية خارج النطاق تستلزم اتفاقًا وتكلفة زمنية/مالية إضافية."
    },
    accounts: {
      p1: "قد يتطلّب تقديم الخدمة الوصول إلى حسابات وأدوات العميل (مثل: WordPress، Google Search Console، Analytics، Facebook Business Manager). يلتزم الطرفان بالحفاظ على سرية الوصول والبيانات. يخضع جمع واستخدام البيانات لسياسة الخصوصية الخاصة بنا."
    },
    payments: {
      li1: "تُسدد الرسوم حسب العرض الفني/العقد وبنسب الدفع المتفق عليها.",
      li2: "المبالغ المدفوعة مقابل ساعات/باقات السيو أو التطوير غير قابلة للاسترداد بعد بدء التنفيذ.",
      li3: "قد تتضمن الأسعار ضرائب ورسوم تحويل/معاملات حسب الدولة ووسيلة الدفع."
    },
    content: {
      li1: "تبقى ملكية المواد الأصلية التي يزوّدنا بها العميل له.",
      li2: "يُمنح العميل ترخيص استخدام للمخرجات التي ننشئها ضمن المشروع بعد سداد كافة المستحقات.",
      li3: "لا يجوز إزالة إشارات حقوق النشر أو إعادة بيع القوالب/الشيفرات دون إذن مكتوب."
    },
    acceptableUse: {
      li1: "يُحظر استخدام الخدمة في أنشطة مخالفة للقانون أو لانتهاك حقوق الغير.",
      li2: "نرفض ممارسات سيو مضللة (Spam/Backlinks عشوائية/نصوص مخفية… إلخ).",
      li3: "يلتزم العميل بتوفير بيانات ومحتوى دقيق وغير منتهك لحقوق الملكية."
    },
    warranty: {
      p1: "تُقدَّم الخدمات على أساس \"كما هي\" و\"كما هي متاحة\" دون أي ضمانات صريحة أو ضمنية. لا نضمن تصدُّر نتائج البحث أو تحقيق نتائج محددة خلال مدة زمنية ثابتة نظرًا لاختلاف عوامل السوق وتحديثات محركات البحث."
    },
    liability: {
      p1: "في حدود ما يسمح به القانون، لن تتحمّل <strong>امريكان سوفت ويرز </strong> مسؤولية أي أضرار غير مباشرة أو تبعية أو فقدان أرباح ناشئ عن استخدام الخدمة. في جميع الأحوال لا تتجاوز مسؤوليتنا إجمالي المبالغ المدفوعة مقابل الخدمة خلال آخر ثلاثة أشهر."
    },
    changes: {
      p1: "قد نقوم بتحديث هذه الشروط من وقت لآخر. يُعد استمرارك في استخدام الخدمة بعد نشر أي تعديلات موافقةً منك على النسخة المحدّثة. يُنصح بمراجعة تاريخ آخر تحديث أعلاه."
    },
    termination: {
      p1: "يجوز لأي من الطرفين إنهاء العقد وفق الشروط المذكورة في العرض/العقد. عند الإنهاء تُسلَّم المخرجات المكتملة والمدفوعة حتى تاريخ الإنهاء."
    },
    law: {
      p1: "تخضع هذه الشروط لقوانين جمهورية مصر العربية، وتُحل النزاعات وديًا أولًا، ثم عبر الجهات المختصة داخل مصر إذا لزم الأمر."
    },
    contact: {
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      address: "العنوان"
    }
  }
          },

          about: {
  meta: {
    brand: "American Soft",
    company: "American Group for Software & Marketing",
    email: "americansoft8@gmail.com",
    phone: "01080002209",
    address: "مصر – القاهرة",
    website: "https://americansoft.example.com"
  },
  seo: {
    title: "عن {{brand}}",
    desc: "{{brand}} تبني برمجيات آمنة وسريعة وقابلة للتوسّع تُحفّز نمو الأعمال وتجربة مستخدم رائعة."
  },
  badge: "من نحن",
  title: "نحوّل الأفكار إلى منتجات رقمية موثوقة",
  subtitle:
    "شريك تقني يركز على النتائج—كود نظيف، سيو قابل للقياس، وتجربة استخدام محبوبة. نمزج بين الهندسة والنمو لنُطلق الميزات بسرعة وأمان.",

  highlights: [
    "برمجيات مخصّصة وتطبيقات ويب ببنية نظيفة قابلة للتوسّع",
    "تطبيقات موبايل (iOS/Android أو Cross-platform) بتجربة عصرية",
    "سيو متكامل: تقني، داخل الصفحة، محتوى وروابط داخلية",
    "تحسين Core Web Vitals مع ميزانية أداء عبر الطبقات",
    "نشر سحابي آمن، CI/CD ورصد مستمر",
    "اكتشاف، خارطة طريق، وتحليلات لنتائج قابلة للقياس"
  ],

  stats: {
    items: [
      { label: "مشاريع مُسلّمة", value: "120+" },
      { label: "رضا العملاء", value: "97%" },
      { label: "اجتياز Core Web Vitals", value: "90%+" },
      { label: "سنوات خبرة", value: "7+" }
    ]
  },

  mission: {
    title: "مهمّتنا",
    desc: "تقديم برمجيات وسيو عالي الجودة يسرّع النمو مع الحفاظ على كود قابل للصيانة وآمن وقابل للتوسّع."
  },
  vision: {
    title: "رؤيتنا",
    desc: "أن نكون الشريك الهندسي الأكثر ثقة في المنطقة—حيث الأثر التجاري يلتقي بالتميّز التقني."
  },
  values: {
    title: "القيم",
    items: [
      { title: "المسؤولية", desc: "نهتم بالنتائج ونتحمّل المسؤولية من البداية للنهاية." },
      { title: "الوضوح", desc: "عمل بسيط موثّق قابل للقياس ويصل بسرعة." },
      { title: "الجودة", desc: "كود نظيف، تجربة قوية، وسيو مستدام." }
    ]
  },

  process: {
    title: "كيف نعمل",
    stepLabel: "الخطوة {{n}}",
    steps: [
      { title: "اكتشاف وخطة", desc: "أهداف، جمهور، نطاق، مخاطر، وخارطة طريق مرحلية." },
      { title: "تصميم ونمذجة", desc: "تدفقات UX، أنماط UI، وتحقق مبكّر مع المستخدمين." },
      { title: "بناء وتكرار", desc: "سبرنتات قصيرة، CI/CD، اختبارات ورصد مستمر." },
      { title: "إطلاق ونمو", desc: "أداء، سيو، تحليلات، وتحسين مستمر." }
    ]
  },

  stack: {
    title: "التقنيات المستخدمة",
    items: ["React", "Next.js", "Tailwind", "Node.js", "NestJS", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "GCP", "Flutter"]
  },

  cta: {
    title: "جاهز نبدأ؟",
    desc: "احكِ لنا فكرتك. نرجع لك بخطة تنفيذ واضحة، جدول زمني، وتكلفة تقديرية.",
    btn: "اطلب عرض سعر"
  },
  contactLine: "تحب مكالمة سريعة؟ اتصل على"
          },

          service: {
  android: {
    badge: "تطوير Android",
    title: "تطبيقات أندرويد عالية الأداء — قابلة للتوسّع",
    subtitle: "تطبيقات أندرويد أصلية أو هجينة بواجهات عصرية، دعم العمل دون اتصال، وتكاملات آمنة.",
    serviceType: "تطوير تطبيقات أندرويد",
    features: [
      "تطوير Native (Kotlin) أو Cross-platform (Flutter/React Native)",
      "واجهات حديثة (Material 3) وتخطيطات متجاوبة",
      "وضع أوفلاين، مزامنة خلفية، وإشعارات",
      "تكاملات API قوية وتوثيق آمن",
      "CI/CD واختبارات وتحليلات أداء"
    ],
    benefitsTitle: "لماذا أندرويد معنا؟",
    benefits: [
      "إطلاق أسرع بكود نظيف سهل الصيانة",
      "أداء قوي وتصميم واعٍ للبطارية",
      "بنية قابلة للتوسّع لإضافة الميزات مستقبلًا",
      "إطلاق مع مراقبة وتقارير أعطال ومؤشرات أداء"
    ],
    stackTitle: "التقنيات المستخدمة",
    stack: ["Kotlin", "Jetpack", "Compose", "Flutter", "React Native", "Firebase", "Room", "Retrofit"],
    cta: { title: "جاهز تطلق تطبيق أندرويد؟", desc: "احكِ لنا فكرتك وأهدافك، ونقترح أفضل نهج وخطة زمنية.", btn: "اطلب عرض سعر" }
  },
  ios: {
    badge: "تطوير iOS",
    title: "تطبيقات iOS أنيقة — أداء ولمسات احترافية",
    subtitle: "تطبيقات iOS بـ Swift وتجربة استخدام ممتعة، بيانات آمنة، وأداء فائق.",
    serviceType: "تطوير تطبيقات iOS",
    features: [
      "Native Swift/SwiftUI أو Cross-platform (Flutter/React Native)",
      "واجهات جميلة، إتاحة، وحركات سلسة",
      "Keychain وبصمة/وجه وتخزين آمن",
      "نشر عبر App Store و TestFlight وتحليلات",
      "خطوط CI/CD وأتمتة اختبارات"
    ],
    benefitsTitle: "لماذا iOS معنا؟",
    benefits: [
      "تصميم دقيق متوافق مع إرشادات Apple",
      "حركات سلسة واستهلاك طاقة محسّن",
      "خصوصية في المعمارية وتكاملات API آمنة",
      "نمو قابل للقياس بتحليلات المنتج"
    ],
    stackTitle: "التقنيات المستخدمة",
    stack: ["Swift", "SwiftUI", "Combine", "UIKit", "Flutter", "React Native", "CoreData", "Alamofire"],
    cta: { title: "ابنِ تجربة iOS مميزة", desc: "نساعدك تطلق بسرعة وبجودة ومؤشرات منذ اليوم الأول.", btn: "ابدأ مشروعك" }
  },
  desktop: {
    badge: "تطبيقات سطح المكتب",
    title: "تطبيقات سطح مكتب موثوقة للأعمال والمحترفين",
    subtitle: "تطبيقات متعددة المنصات ببنية Offline-first وتحديثات سلسة.",
    serviceType: "تطوير تطبيقات سطح المكتب",
    features: [
      "متعدد المنصات (Electron/Tauri) أو Native",
      "تحديثات تلقائية وتقارير أعطال وتتبع",
      "قاعدة بيانات محلية ومعالجة تعارضات المزامنة",
      "بنية قابلة للإضافات وواجهات IPC آمنة",
      "ثيمات وإتاحة وتجربة تعتمد على لوحة المفاتيح"
    ],
    benefitsTitle: "لماذا سطح المكتب معنا؟",
    benefits: [
      "إصدارات مستقرة مع CI/CD وحزم اختبارات",
      "بصمة ذاكرة/معالج محسّنة وتجربة سلسة",
      "معمارية معيارية للتطوّر طويل المدى",
      "أمان مؤسسي ومثبّتات موقّعة"
    ],
    stackTitle: "التقنيات المستخدمة",
    stack: ["Electron", "Tauri", "Node.js", "Rust", "C#", ".NET", "SQLite", "LevelDB"],
    cta: { title: "تحتاج تطبيق سطح مكتب قوي؟", desc: "خلّينا نخطّط الميزات وخارطة الطريق ومسار التسليم.", btn: "اطلب عرض سعر" }
  }
          },



          




      

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

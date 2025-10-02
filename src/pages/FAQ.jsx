// src/pages/FAQ.jsx (نسخة بدون i18n)
import React, { useMemo, useState } from "react";
import {
  Box, Container, Heading, Text as CText, Input, InputGroup, InputLeftElement,
  Icon, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
  VStack, useColorModeValue, Alert, AlertIcon, Divider,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

const STRINGS = {
  en: {
    dir: "ltr",
    title: "Frequently Asked Questions",
    subtitle: "Answers to common questions about web design, mobile apps, custom software, and SEO.",
    searchPlaceholder: "Search FAQs…",
    noResults: "No results found.",
    items: [
      { q: "What web design services do you provide?", a: "We design and develop responsive, SEO-friendly websites using modern stacks (React/Next.js, Chakra UI/Tailwind). We handle UX/UI, performance, accessibility, hosting, and ongoing support." },
      { q: "Do you build mobile applications for iOS and Android?", a: "Yes. We build native and cross-platform apps (React Native/Flutter), including push notifications, analytics, deep links, and App Store/Play Store submissions." },
      { q: "Can you deliver custom software tailored to my business?", a: "Absolutely. We build custom dashboards, CRMs/ERPs, APIs, and integrations with third-party services (payment gateways, shipping, invoicing), following scalable and secure best practices." },
      { q: "What does your SEO service include?", a: "Our SEO covers technical audits (Core Web Vitals), on-page optimization, content strategy, structured data, link building, local SEO, and monthly KPI reporting (traffic, rankings, conversions)." },
      { q: "How long does a typical website project take?", a: "Small sites: 2–4 weeks. Corporate/e-commerce: 4–10 weeks depending on scope, content readiness, and integrations." },
      { q: "How much does a website or app cost?", a: "Budgets vary by scope. We provide transparent estimates after a short discovery call. We also offer phased roadmaps to match your budget." },
      { q: "Do you build e-commerce stores?", a: "Yes. We implement secure, fast stores with product management, payment gateways, shipping, stock, coupons, and SEO-optimized product pages." },
      { q: "Can you migrate my old site without losing SEO?", a: "Yes. We plan redirects (301), preserve metadata, maintain URL structures where possible, and monitor rankings and crawl errors post-launch." },
      { q: "Do you provide hosting and maintenance?", a: "We offer managed hosting, continuous monitoring, backups, SSL, updates, and performance tuning, plus monthly support plans." },
      { q: "How do you ensure website performance and Core Web Vitals?", a: "We optimize images, code-split, cache, compress, prefetch, and use CDNs. We test with Lighthouse, PageSpeed Insights, and real-user monitoring." },
      { q: "Is security included?", a: "Yes. We follow OWASP best practices, HTTPS/SSL, secure auth, input validation, role-based access, backups, and regular patching." },
      { q: "Do you support multilingual and RTL websites?", a: "Yes. We implement i18n, Arabic RTL support, locale routing, and SEO tags per language." },
      { q: "Can you integrate third-party services and build APIs?", a: "Yes. We build REST/GraphQL APIs and integrate payments, shipping, CRMs, ERPs, analytics, chat, and marketing tools." },
      { q: "Do you offer analytics and conversion tracking?", a: "Yes. We set up GA4, server-side tracking where applicable, tag managers, heatmaps, events, and conversion funnels with regular reports." },
      { q: "Will you sign an NDA and provide a contract?", a: "Yes. We can sign an NDA, define scope, deliverables, timeline, and payment milestones in a clear agreement." },
      { q: "Do you implement AI features (chatbots, search, recommendations)?", a: "Yes. We integrate AI chat, semantic search, content assistants, and recommendation engines where they bring measurable value." },
    ],
  },
  ar: {
    dir: "rtl",
    title: "الأسئلة الشائعة",
    subtitle: "إجابات لأهم الأسئلة عن تصميم المواقع، تطبيقات الموبايل، البرمجيات المخصّصة، وتهيئة محركات البحث (SEO).",
    searchPlaceholder: "ابحث في الأسئلة…",
    noResults: "لا توجد نتائج.",
    items: [
      { q: "ما خدمات تصميم المواقع التي تقدّمونها؟", a: "نصمّم ونطوّر مواقع متجاوبة وسريعة ومتوافقة مع السيو باستخدام تقنيات حديثة (React/Next.js و Chakra UI/Tailwind). نهتم بالتجربة البصرية، الأداء، الوصولية، الاستضافة، والدعم المستمر." },
      { q: "هل تبنون تطبيقات موبايل للـ iOS وAndroid؟", a: "نعم، نبني تطبيقات أصلية ومتعددة المنصات (React Native/Flutter)، مع إشعارات، تحليلات، Deep Links ورفع للتطبيقات على المتاجر." },
      { q: "هل يمكن بناء برمجيات مخصّصة تناسب نشاطي؟", a: "بالتأكيد. ننفّذ لوحات تحكم، CRM/ERP، واجهات وبرامجيات متكاملة مع خدمات طرف ثالث (بوابات الدفع، الشحن، الفوترة) وفق معايير الأمان والقابلية للتوسّع." },
      { q: "ماذا تشمل خدمة SEO لديكم؟", a: "تشمل تدقيقًا تقنيًا (Core Web Vitals)، تحسين الصفحات، إستراتيجية محتوى، بيانات منظّمة، بناء روابط، سيو محلي، وتقارير شهرية للمؤشرات (زيارات، ترتيب، تحويلات)." },
      { q: "ما المدة المتوقعة لتنفيذ الموقع؟", a: "المواقع الصغيرة: 2–4 أسابيع. مواقع الشركات والمتاجر الإلكترونية: 4–10 أسابيع حسب النطاق وجاهزية المحتوى والتكاملات." },
      { q: "كم تبلغ تكلفة الموقع أو التطبيق؟", a: "التكلفة تعتمد على النطاق. نقدّم عرض سعر واضح بعد مكالمة تعريفية قصيرة، مع إمكانية التقسيم على مراحل بما يناسب الميزانية." },
      { q: "هل تبنون متاجر إلكترونية؟", a: "نعم. ننفّذ متاجر آمنة وسريعة مع إدارة منتجات، مدفوعات وشحن، مخزون، كوبونات، وصفحات منتجات محسّنة للسيو." },
      { q: "هل يمكن ترحيل موقعي القديم دون خسارة السيو؟", a: "نعم. نخطط لتحويلات 301، نحافظ على الميتاداتا والبُنى قدر الإمكان، ونراقب الترتيب وأخطاء الزحف بعد الإطلاق." },
      { q: "هل توفّرون استضافة وصيانة؟", a: "نعم. نقدّم استضافة مُدارة، مراقبة دائمة، نسخًا احتياطيًا، شهادات SSL، تحديثات، وتحسين أداء مع خطط دعم شهرية." },
      { q: "كيف تضمنون الأداء ونتائج Core Web Vitals؟", a: "نضغط الصور، نجزّئ الشيفرة، نفعّل الكاش والضغط، نُعدّ CDN وprefetch، ونختبر عبر Lighthouse وPageSpeed ومراقبة حقيقية للمستخدمين." },
      { q: "هل الأمان ضمن الخدمات؟", a: "نعم. نتبع أفضل ممارسات OWASP، تشفير HTTPS/SSL، صلاحيات آمنة، فحص الإدخال، نسخ احتياطي، وتحديثات مستمرة." },
      { q: "هل تدعمون مواقع متعددة اللغات والاتجاه RTL؟", a: "نعم. نوفّر i18n ودعم العربية RTL وتوجيه المسارات لكل لغة مع وسوم سيو مخصّصة." },
      { q: "هل تقدّمون تكاملات وخدمات APIs؟", a: "نبني REST/GraphQL ونربط أنظمة الدفع والشحن وCRM/ERP والتحليلات والدردشة وأدوات التسويق." },
      { q: "هل توفّرون إعداد تحليلات وتتبع التحويلات؟", a: "نعم. نُعدّ GA4 وإدارة الوسوم وقياس الأحداث ومسارات التحويل وتقارير دورية لقياس الأداء." },
      { q: "هل توقّعون NDA وتقدّمون عقدًا واضحًا؟", a: "نعم. نوقّع اتفاقية سرية ونحدّد النطاق والمخرجات والجدول الزمني والدفع في عقد واضح." },
      { q: "هل تضيفون ميزات ذكاء اصطناعي؟", a: "نعم. ندمج روبوتات محادثة وبحث دلالي ومساعدي محتوى وأنظمة توصية حيث تضيف قيمة قابلة للقياس." },
    ],
  },
};

export default function FAQ({ lang = "ar" }) {
  const t = STRINGS[lang] ?? STRINGS.en;
  const dir = t.dir;

  const QA = t.items;
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return QA;
    return QA.filter((item) =>
      (String(item.q) + " " + String(item.a)).toLowerCase().includes(q)
    );
  }, [QA, query]);

  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  const subText = useColorModeValue("gray.600", "gray.300");

  return (
    <Box dir={dir} bg={pageBg} pt={{ base: 24, md: 32 }} pb={{ base: 16, md: 24 }}>
      <Container maxW="6xl">
        <VStack align="start" spacing={2} mb={{ base: 6, md: 8 }}>
          <Heading as="h1" size={{ base: "lg", md: "2xl" }} fontWeight="extrabold">
            {t.title}
          </Heading>
        <CText color={subText}>{t.subtitle}</CText>
        </VStack>

        <Box
          bg={cardBg}
          border="1px solid"
          borderColor={cardBorder}
          rounded="2xl"
          boxShadow="sm"
          overflow="hidden"
        >
          {/* Search */}
          <Box p={{ base: 4, md: 6 }}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} />
              </InputLeftElement>
              <Input
                id="faq-search"
                placeholder={t.searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
          </Box>

          <Divider />

          {/* Accordion */}
          <Box p={{ base: 1, md: 2 }}>
            {filtered.length > 0 ? (
              <Accordion allowMultiple>
                {filtered.map((item, idx) => (
                  <AccordionItem key={idx} borderTopWidth={idx === 0 ? 0 : "1px"}>
                    <h3>
                      <AccordionButton py={4}>
                        <Box as="span" flex="1" textAlign="start" fontWeight="semibold">
                          {item.q}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h3>
                    <AccordionPanel pb={5}>
                      <CText lineHeight="tall">{item.a}</CText>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <Alert status="info" rounded="xl" m={4}>
                <AlertIcon />
                {t.noResults}
              </Alert>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

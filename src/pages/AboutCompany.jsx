// src/pages/AboutCompany.jsx
import React from "react";
import {
  Box, Container, Heading, Text, HStack, VStack, SimpleGrid, GridItem,
  Button, Icon, Badge, Image, useColorModeValue, Divider, List, ListItem, ListIcon,
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Avatar, chakra,
} from "@chakra-ui/react";
import { MdCheckCircle, MdOutlineSecurity, MdEmail, MdPhone } from "react-icons/md";
import { RiShieldCheckLine, RiTeamLine, RiTimeLine, RiMedalLine, RiBuilding2Line } from "react-icons/ri";
import { FaHandshake, FaRegFileAlt, FaMoneyCheckAlt, FaMapMarkerAlt, FaQuoteLeft } from "react-icons/fa";

// 👇 لو الصور تحت public/ يفضّل تستخدم مسارات مطلقة بدل import
// const imgss = [
//   "/assets/clients/AmericanGroups.png",
//   "/assets/clients/CairoStore.png",
//   "/assets/clients/Containertrend.png",
//   "/assets/clients/chiller.jpg",
// ];
import img1 from '../../public/assets/clients/AmericanGroups.png';
import img2 from '../../public/assets/clients/CairoStore.png';
import img3 from '../../public/assets/clients/Containertrend.png';
import img4 from '../../public/assets/clients/chiller.jpg';

const Section = ({ children, py }) => (
  <Box as="section" py={py || { base: 10, md: 14, lg: 16 }}>{children}</Box>
);

const StatCard = ({ label, value, hint }) => {
  const bg = useColorModeValue("white", "gray.800");
  const bd = useColorModeValue("gray.100", "gray.700");
  return (
    <VStack
      p={{ base: 4, md: 5 }}
      align="start"
      bg={bg}
      border="1px solid"
      borderColor={bd}
      rounded="2xl"
      spacing={1}
      w="100%"
    >
      <Heading size={{ base: "md", md: "lg" }}>{value}</Heading>
      <Text color="gray.600" _dark={{ color: "gray.300" }} fontSize={{ base: "sm", md: "md" }}>{label}</Text>
      {hint ? <Text fontSize="sm" color="gray.500">{hint}</Text> : null}
    </VStack>
  );
};

const TrustItem = ({ icon, title, desc }) => {
  const bg = useColorModeValue("white", "gray.800");
  const bd = useColorModeValue("gray.100", "gray.700");
  return (
    <HStack
      align="start"
      p={{ base: 4, md: 5 }}
      bg={bg}
      border="1px solid"
      borderColor={bd}
      rounded="2xl"
      spacing={3}
    >
      <Box color={useColorModeValue("green.600", "green.300")}>{icon}</Box>
      <VStack spacing={1} align="start">
        <Heading size="sm">{title}</Heading>
        <Text color="gray.600" _dark={{ color: "gray.300" }} fontSize={{ base: "sm", md: "md" }}>{desc}</Text>
      </VStack>
    </HStack>
  );
};

export default function AboutCompanyPage() {
  const sub = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "gray.800");
  const bd = useColorModeValue("gray.100", "gray.700");
  const grad = useColorModeValue(
    "linear-gradient(135deg, #F0FFF4 0%, #EFF6FF 100%)",
    "linear-gradient(135deg, rgba(26,32,44,.85) 0%, rgba(45,55,72,.85) 100%)"
  );

  const imgss = [img1, img2, img3, img4];

  return (
    <Box dir="rtl">
      {/* HERO */}
      <Box bg={grad} pt={{ base: 12, md: 16 }} pb={{ base: 8, md: 12 }}>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 10 }} alignItems="center">
            <GridItem>
              <HStack spacing={3} mb={3} wrap="wrap">
                <Badge colorScheme="green" rounded="full" px={3} py={1}>American Softwares</Badge>
                <Badge colorScheme="blue" rounded="full" px={3} py={1}>Enterprise Solutions</Badge>
              </HStack>
              <Heading
                fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
                lineHeight={1.25}
                fontWeight="extrabold"
              >
                شريكك التقني الموثوق لبناء حلول برمجية تقود النمو بثقة
              </Heading>
              <Text mt={3} fontSize={{ base: "sm", md: "md", lg: "lg" }} color={sub}>
                نقدّم استشارات وتطوير برمجيات مخصّصة، تكاملات API، لوحات معلومات، وأنظمة مؤسسية تُراعي الأمن والقابلية للتوسع وتجربة المستخدم—مع منهجية واضحة وتعاقدات شفافة.
              </Text>

              {/* إحصائيات: شبكة مرنة */}
              <SimpleGrid columns={{ base: 3 }} spacing={3} mt={{ base: 5, md: 6 }}>
                <StatCard value="10+" label="سنوات خبرة" />
                <StatCard value="180+" label="مشروع مُسلّم" hint="تطبيقات، مواقع، Dashboards" />
                <StatCard value="98%" label="رضا العملاء" />
              </SimpleGrid>

              {/* أزرار CTA */}
              <HStack mt={{ base: 5, md: 6 }} spacing={3} wrap="wrap">
                <Button colorScheme="green" size={{ base: "md", md: "lg" }} as="a" href="/contact">ابدأ معنا الآن</Button>
                <Button variant="outline" size={{ base: "md", md: "lg" }} as="a" href="/portfolio">اطّلع على أعمالنا</Button>
              </HStack>
            </GridItem>

            <GridItem>
              <Box
                bg={cardBg}
                border="1px solid"
                borderColor={bd}
                rounded="3xl"
                p={{ base: 4, md: 6 }}
                boxShadow="lg"
              >
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
                  alt="Our Team"
                  rounded="2xl"
                  objectFit="cover"
                  w="100%"
                  h={{ base: "220px", md: "320px" }}
                />
                <HStack spacing={3} mt={3} color="gray.500">
                  <Icon as={RiShieldCheckLine} />
                  <Icon as={RiTeamLine} />
                  <Icon as={RiTimeLine} />
                </HStack>
              </Box>
            </GridItem>
          </SimpleGrid>
        </Container>
      </Box>

      {/* ABOUT */}
      <Section>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 10 }}>
            <Box>
              <Heading size={{ base: "md", md: "lg" }} mb={3}>من نحن</Heading>
              <Text color={sub} fontSize={{ base: "sm", md: "md" }}>
                American Softwares شركة برمجيات تركّز على بناء منتجات رقمية وأنظمة مؤسسية وفق احتياجات كل عميل: من تحليل الأعمال، تصميم UI/UX، تطوير الواجهات والخلفيات، إلى التكامل مع الأنظمة الحالية وإطلاق مستقر مع دعم ما بعد الإطلاق.
              </Text>
              <List spacing={2} mt={3} color={sub} fontSize={{ base: "sm", md: "md" }}>
                <ListItem><ListIcon as={MdCheckCircle} color="green.400" />منهجية Agile بسبرنتات قصيرة وتقارير تقدم شفافة.</ListItem>
                <ListItem><ListIcon as={MdCheckCircle} color="green.400" />تعاقدات واضحة، توقيتات تسليم واقعية، وضمان ما بعد التسليم.</ListItem>
                <ListItem><ListIcon as={MdCheckCircle} color="green.400" />أمن وخصوصية منذ التصميم (Security by Design).</ListItem>
              </List>
            </Box>
            <Box>
              <Heading size={{ base: "md", md: "lg" }} mb={3}>لماذا يثق بنا عملاؤنا؟</Heading>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                <TrustItem icon={<Icon as={RiMedalLine} boxSize={6} />} title="معايير جودة" desc="مراجعات كود، CI/CD، وبيئات اختبار تضمن استقرار المنتج." />
                <TrustItem icon={<Icon as={MdOutlineSecurity} boxSize={6} />} title="التزام بالأمان" desc="تحكم في الوصول، تشفير بيانات حساسة، وسجلات تدقيق." />
                <TrustItem icon={<Icon as={FaRegFileAlt} boxSize={6} />} title="توثيق شامل" desc="توثيق API، أدلة استخدام، وكتيبات تسليم." />
                <TrustItem icon={<Icon as={FaHandshake} boxSize={6} />} title="عقود واضحة" desc="SLA، NDA، وسياسات خصوصية لحماية مصالحك." />
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        </Container>
      </Section>

      {/* SERVICES SNAPSHOT */}
      <Section>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <Heading size={{ base: "md", md: "lg" }} mb={{ base: 4, md: 6 }}>ماذا نقدّم؟</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <StatCard value="استشارات تقنية" label="تحليل، خارطة طريق، جدوى تقنية" />
            <StatCard value="تطوير مخصّص" label="Web, Mobile, Dashboards" hint="React, Node/Nest, .NET" />
            <StatCard value="تكاملات مؤسسية" label="APIs, ERP, Payment, Auth" hint="REST/GraphQL, SSO" />
          </SimpleGrid>
        </Container>
      </Section>

      {/* SOCIAL PROOF */}
      <Section>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <Heading size={{ base: "md", md: "lg" }} mb={3}>شركاء وثقوا بنا</Heading>
          <Text color={sub} mb={{ base: 4, md: 6 }} fontSize={{ base: "sm", md: "md" }}>
            شعارات مختارة من عملائنا وشركائنا.
          </Text>

          <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={{ base: 3, md: 4 }}>
            {imgss.map((src, index) => (
              <Box
                key={index}
                p={{ base: 3, md: 4 }}
                bg={cardBg}
                border="1px solid"
                borderColor={bd}
                rounded="xl"
                textAlign="center"
              >
                <Image
                  src={src}
                  alt={`Client ${index + 1}`}
                  mx="auto"
                  w="100%"
                  maxH={{ base: "50px", md: "70px", lg: "80px" }}
                  objectFit="contain"
                />
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <Heading size={{ base: "md", md: "lg" }} mb={{ base: 4, md: 6 }}>آراء العملاء</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            {[
              {name:"أحمد",role:"مدير تقنية",text:"التسليم كان في موعده والجودة ممتازة. لوحة التحكم فرّقت مع الفريق."},
              {name:"مي",role:"منتج رقمي",text:"مرونة عالية في التعديلات وسرعة في الاستجابة. تجربة تعامل رائعة."},
              {name:"خالد",role:"مؤسس",text:"التكاملات مع أنظمتنا تمت بسلاسة، والتوثيق واضح لفريقنا."},
            ].map((t,idx)=>(
              <VStack key={idx} align="start" p={{ base: 4, md: 6 }} bg={cardBg} border="1px solid" borderColor={bd} rounded="2xl" spacing={3}>
                <Icon as={FaQuoteLeft} color="gray.400" />
                <Text color={sub} fontSize={{ base: "sm", md: "md" }}>{t.text}</Text>
                <HStack pt={2}>
                  <Avatar name={t.name} />
                  <VStack spacing={0} align="start">
                    <Text fontWeight="semibold">{t.name}</Text>
                    <Text fontSize="sm" color="gray.500">{t.role}</Text>
                  </VStack>
                </HStack>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Section>

      {/* TEAM */}
      <Section>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <Heading size={{ base: "md", md: "lg" }} mb={{ base: 4, md: 6 }}>الفريق القيادي</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            {[
              {n:"Product Lead",d:"يقود الرؤية والـMVP وخارطة الطريق."},
              {n:"Tech Lead",d:"يضمن بنية قابلة للتوسع ومراجعات الكود."},
              {n:"Delivery Manager",d:"يدير السبرنتات والجداول الزمنية والتواصل."},
            ].map((m, i)=>(
              <VStack key={i} p={{ base: 4, md: 6 }} bg={cardBg} border="1px solid" borderColor={bd} rounded="2xl" align="start">
                <Avatar name={m.n} size="lg" />
                <Heading size="md">{m.n}</Heading>
                <Text color={sub} fontSize={{ base: "sm", md: "md" }}>{m.d}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Section>

      {/* COMPLIANCE / POLICIES */}
      <Section>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <Heading size={{ base: "md", md: "lg" }} mb={{ base: 4, md: 6 }}>الثقة والامتثال</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <VStack align="start" p={{ base: 4, md: 6 }} bg={cardBg} border="1px solid" borderColor={bd} rounded="2xl" spacing={3}>
              <HStack><Icon as={MdOutlineSecurity} /><Heading size="md">الأمان أولًا</Heading></HStack>
              <Text color={sub} fontSize={{ base: "sm", md: "md" }}>
                تحكم صلاحيات، تشفير حقول حساسة، مراجعة الأذونات، سجل تدقيق، واختبارات اختراق عند الطلب.
              </Text>
              <List spacing={2} color={sub} fontSize={{ base: "sm", md: "md" }}>
                <ListItem><ListIcon as={MdCheckCircle} color="green.400" />مبدأ أقل صلاحية (PoLP)</ListItem>
                <ListItem><ListIcon as={MdCheckCircle} color="green.400" />تحديثات تبعية وتتبّع CVEs</ListItem>
                <ListItem><ListIcon as={MdCheckCircle} color="green.400" />نسخ احتياطية وتخطّي الكوارث</ListItem>
              </List>
            </VStack>
            <VStack align="start" p={{ base: 4, md: 6 }} bg={cardBg} border="1px solid" borderColor={bd} rounded="2xl" spacing={3}>
              <HStack><Icon as={FaRegFileAlt} /><Heading size="md">سياسات واضحة</Heading></HStack>
              <Text color={sub} fontSize={{ base: "sm", md: "md" }}>
                اتفاقيات NDA، سياسة خصوصية، بنود حماية بيانات، وSLA بوقت استجابة محدد.
              </Text>
              <HStack spacing={3} pt={2}>
                <Badge colorScheme="purple">NDA</Badge>
                <Badge colorScheme="blue">Privacy</Badge>
                <Badge colorScheme="green">SLA</Badge>
              </HStack>
            </VStack>
          </SimpleGrid>
        </Container>
      </Section>

      {/* PROCESS */}
      <Section>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <Heading size={{ base: "md", md: "lg" }} mb={{ base: 4, md: 6 }}>آلية العمل معك</Heading>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
            {[
              {t:"01 • الاكتشاف",d:"جلسة لفهم الأهداف والمعايير ومؤشرات النجاح."},
              {t:"02 • الخطة",d:"خارطة طريق وجدول زمني ونطاق واضح للتسليم."},
              {t:"03 • التطوير",d:"سبرنتات قصيرة + مراجعات دورية وإصدارات مرحلية."},
              {t:"04 • الإطلاق والدعم",d:"تسليم مُوثّق ودعم وتحسينات مستقرة."},
            ].map((s,i)=>(
              <VStack key={i} align="start" p={{ base: 4, md: 6 }} bg={cardBg} border="1px solid" borderColor={bd} rounded="2xl">
                <Heading size="md">{s.t}</Heading>
                <Text color={sub} fontSize={{ base: "sm", md: "md" }}>{s.d}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Section>

      {/* COVERAGE */}
      <Section>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <Heading size={{ base: "md", md: "lg" }} mb={2}>نغطي العمل داخل وخارج مصر</Heading>
          <Text color={sub} mb={{ base: 4, md: 6 }} fontSize={{ base: "sm", md: "md" }}>
            فرقنا موزّعة وتدعم التعاون عن بعد، مع اجتماعات لدى العميل حسب الحاجة.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <TrustItem icon={<Icon as={FaMapMarkerAlt} boxSize={6} />} title="القاهرة والجيزة" desc="اجتماعات حضورية ودعم سريع للشركات." />
            <TrustItem icon={<Icon as={FaMapMarkerAlt} boxSize={6} />} title="القاهرة الجديدة و6 أكتوبر" desc="تعاون مرن وزيارات مجدولة." />
            <TrustItem icon={<Icon as={FaMapMarkerAlt} boxSize={6} />} title="مشاريع دولية" desc="تنفيذ كامل عن بُعد وتوثيق دوري." />
          </SimpleGrid>
        </Container>
      </Section>

      <Divider />

      {/* FAQ */}
      <Section>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <Heading size={{ base: "md", md: "lg" }} mb={{ base: 4, md: 6 }}>أسئلة شائعة</Heading>
          <Accordion allowMultiple>
            {[
              {q:"هل تلتزمون بعقود SLA وNDA؟", a:"نعم، نوفر نماذج SLA بوقت استجابة وحلول تصعيد، واتفاقيات NDA لحماية سرية البيانات."},
              {q:"هل توجد فواتير وضمانات بعد التسليم؟", a:"نقدّم فواتير رسمية وضمان عيوب برمجية لفترة محددة، مع خيارات دعم وصيانة شهرية."},
              {q:"كيف تتم متابعة التقدم؟", a:"تقارير سبرنت، لوحات مهام، وديمو نهاية كل سبرنت لضمان الشفافية."},
              {q:"هل تساعدون في الاستضافة والأمان؟", a:"نعم، نساعد في اختيار البنية السحابية، إعداد المراقبة والنسخ الاحتياطي، وسياسات الأمان."},
            ].map((it,i)=>(
              <AccordionItem key={i} border="1px solid" borderColor={bd} rounded="xl" mb={3}>
                <h3>
                  <AccordionButton _expanded={{ bg: useColorModeValue("gray.50","gray.700") }} rounded="xl">
                    <Box as="span" flex="1" textAlign="right" fontWeight="semibold">{it.q}</Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h3>
                <AccordionPanel pb={4} color={sub} fontSize={{ base: "sm", md: "md" }}>{it.a}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>

      {/* CTA */}
      <Section py={{ base: 10, md: 14, lg: 16 }}>
        <Container maxW="6xl" px={{ base: 4, md: 6 }}>
          <SimpleGrid columns={{ base: 1, md: 12 }} spacing={6} alignItems="center">
            <GridItem colSpan={{ base: 12, md: 8 }}>
              <Heading size={{ base: "lg", md: "xl" }}>جاهز نبدأ؟</Heading>
              <Text mt={2} color={sub} fontSize={{ base: "sm", md: "md" }}>
                أخبرنا بهدفك وميزانيتك وحدود الزمن—نجهّز لك خارطة طريق واضحة وخيارات تنفيذ تناسبك.
              </Text>
              <HStack mt={5} spacing={3} wrap="wrap">
                <Button colorScheme="green" rightIcon={<Icon as={RiBuilding2Line} />}>احجز جلسة تعريفية</Button>
                <Button variant="outline" rightIcon={<Icon as={FaMoneyCheckAlt} />}>اطلب عرض سعر</Button>
              </HStack>
            </GridItem>
            <GridItem colSpan={{ base: 12, md: 4 }}>
              <VStack p={{ base: 4, md: 6 }} bg={cardBg} border="1px solid" borderColor={bd} rounded="2xl" spacing={3} align="stretch">
                <HStack><Icon as={MdPhone} /><Text fontWeight="semibold">هاتف / واتساب</Text></HStack>
                <chakra.a href="tel:01080002209" color="green.500" fontWeight="bold">01080002209</chakra.a>
                <HStack><Icon as={MdEmail} /><Text fontWeight="semibold">البريد الإلكتروني</Text></HStack>
                <chakra.a href="mailto:info@american-softwares.com" color="blue.500" fontWeight="bold">info@american-softwares.com</chakra.a>
              </VStack>
            </GridItem>
          </SimpleGrid>
        </Container>
      </Section>
    </Box>
  );
}

// src/features/footer/components/Footer.jsx
import React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import SubscribeCard from "./SubscribeCard";
import LinkList from "./LinkList";
import SocialLinks from "./SocialLinks";
import FooterBottom from "./FooterBottom";
import { FOOTER_STRINGS } from "./strings";

// خلفيات متحركة (اختياري)
const carMarquee = keyframes`
  0% { left: -25%; }
  100% { left: 100%; }
`;
const bikeMarquee = keyframes`
  0% { left: -25%; }
  100% { left: 100%; }
`;

export default function Footer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const lang = pathname.startsWith("/en") ? "en" : "ar";
  const t = FOOTER_STRINGS[lang];
  const isAR = lang === "ar";

  const bg = useColorModeValue("#fbfbfd", "gray.900");
  const borderCol = useColorModeValue("gray.200", "whiteAlpha.300");

  // تبديل اللغة (توجّه للهوم المقابل)
  const changeLang = () => {
    navigate(isAR ? "/en" : "/");
    localStorage.setItem("lang", isAR ? "en" : "ar");
  };

  // مسارات محليّة حسب اللغة
  const faqPath      = isAR ? "/faq"      : "/en/faq";
  const policiesPath = isAR ? "/policies" : "/en/policies";
  const termsPath    = policiesPath; // بدّلها لو عندك صفحة Terms منفصلة
  const privacyPath  = policiesPath; // مؤقتًا نفس صفحة السياسات

  const helpLinks = [
    { label: t.faq,     href: faqPath },
    { label: t.terms,   href: termsPath },
    { label: t.privacy, href: privacyPath },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: اربط الإيميل مع مزود البريد
  };

  return (
    <Box as="footer" bg={bg} position="relative" overflowX="hidden" dir={t.dir}>
      {/* Top */}
      <Box pt={{ base: 16, md: 24 }} pb={{ base: 28, md: 44 }} position="relative">
        <Container maxW="6xl">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 10, md: 12 }}>
            <SubscribeCard
              title={t.getin}
              subtitle={t.dontmiss}
              placeholder={t.mail}
              cta={t.subscribe}
              onSubmit={handleSubmit}
            />
            <LinkList title={t.pages} links={t.navPages} />
            <LinkList title={t.help} links={helpLinks} />
            <SocialLinks title={t.social} langBtn={t.langBtn} onLangToggle={changeLang} />
          </SimpleGrid>
        </Container>

        {/* Decorative background image */}
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          h="266px"
          backgroundImage={`url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigB8iI5tb8WSVBuVUGc9UjjB8O0708X7Fdic_4O1LT4CmLHoiwhanLXiRhe82yw0R7LgACQ2IhZaTY0hhmGi0gYp_Ynb49CVzfmXtYHUVKgXXpWvJ_oYT8cB4vzsnJLe3iCwuzj-w6PeYq_JaHmy_CoGoa6nw0FBo-2xLdOPvsLTh_fmYH2xhkaZ-OGQ/s16000/footer_bg.png")`}
          backgroundRepeat="no-repeat"
          backgroundPosition="center 0"
          backgroundSize="cover"
          pointerEvents="none"
        />

        {/* moving car */}
        <Box
          position="absolute"
          bottom="-10"
          left="30%"
          w="300px"
          h="125px"
          bgImage={`url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEia0PYPxwT5ifToyP3SNZeQWfJEWrUENYA5IXM6sN5vLwAKvaJS1pQVu8mOFFUa_ET4JuHNTFAxKURFerJYHDUWXLXl1vDofYXuij45JZelYOjEFoCOn7E6Vxu0fwV7ACPzArcno1rYuVxGB7JY6G7__e4_KZW4lTYIaHSLVaVLzklZBLZnQw047oq5-Q/s16000/volks.gif")`}
          backgroundRepeat="no-repeat"
          backgroundSize="100% 100%"
          animation={`${carMarquee} 22s linear infinite`}
          pointerEvents="none"
        />

        {/* moving bike */}
        <Box
          position="absolute"
          bottom="0"
          left="38%"
          w="88px"
          h="100px"
          bgImage={`url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyLGwEUVwPK6Vi8xXMymsc-ZXVwLWyXhogZxbcXQYSY55REw_0D4VTQnsVzCrL7nsyjd0P7RVOI5NKJbQ75koZIalD8mqbMquP20fL3DxsWngKkOLOzoOf9sMuxlbyfkIBTsDw5WFUj-YJiI50yzgVjF8cZPHhEjkOP_PRTQXDHEq8AyWpBiJdN9SfQA/s16000/cyclist.gif")`}
          backgroundRepeat="no-repeat"
          backgroundSize="100% 100%"
          animation={`${bikeMarquee} 30s linear infinite`}
          pointerEvents="none"
        />
      </Box>

      {/* Bottom */}
      <FooterBottom text={t.bottom} isAR={isAR} />
    </Box>
  );
}

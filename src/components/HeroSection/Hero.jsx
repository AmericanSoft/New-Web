// src/components/Hero.jsx
import React, { useEffect, useRef, useMemo, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Heading,
  Text,
  Button,
  HStack,
  Icon,
  useBreakpointValue,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  Center,
  Link ,
} from "@chakra-ui/react";
import { IoShieldCheckmark } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import PartnerLogosCard from "./PartnerLogosCard";
import PopUpForm from "../PopupForm/popUpForm";

const STRINGS = {
  en: {
    badge: "Make your organization digital",
    heading: "American Software",
    subtitle:
      "Transforming ideas into powerful digital solutions with cutting-edge technology. We build scalable software that drives business growth and innovation.",
    ctaPrimary: "Hire Us Today",
    ctaSecondary: "Contact us",
    logosTitle: "Businesses we are a success partner for",
    dir: "ltr",
    font: "inherit",
    align: "center",
  },
  ar: {
    badge: "خلّي منظّمتك رقمية",
    heading: "أمريكان سوفت وير",
    subtitle:
      "نحوّل أفكارك إلى حلول رقمية قوية بتقنيات متقدمة. نبني برمجيات قابلة للتوسع تدفع نمو الأعمال والابتكار.",
    ctaPrimary: "اطلب خدمتنا الآن",
    ctaSecondary: "تواصل معنا",
    logosTitle: "شركاء نجاح لعلامات تجارية",
    dir: "rtl",
    font: "'Cairo', system-ui, -apple-system, Segoe UI, Tahoma, Arial",
    align: "center",
  },
};

export default function Hero() {
  const { pathname } = useLocation();

  // لغة الواجهة: عربي إذا لم يبدأ المسار بـ /en
  const lang = pathname.startsWith("/en") ? "en" : "ar";
  const t = STRINGS[lang];

  const vantaRef = useRef(null);
  const vantaInstance = useRef(null);

  const logosOverlap = useBreakpointValue({ base: -10, md: -16 });

  const badgeBg = useColorModeValue("blackAlpha.600", "blackAlpha.600");
  const badgeColor = useColorModeValue("white", "white");
  const subtitleColor = useColorModeValue("whiteAlpha.900", "whiteAlpha.900");

  // تحكم فتح/غلق المودال
  const [open, setOpen] = useState(false);
  const handleSubmit = (data) => {
    // TODO: ابعت الداتا لـ API بتاعك هنا
    setOpen(false);
  };

  const logos = useMemo(
    () => [
      { src: "/assets/Cairo%20Store.png", alt: "Cairo Store" },
      { src: "/assets/American%20Groups.png", alt: "American Groups" },
      { src: "/assets/ibond.png", alt: "iBond" },
      { src: "/assets/Container%20trend.png", alt: "Container Trend" },
      { src: "/assets/SEO.png", alt: "SEO" },
    ],
    []
  );

  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });

    let mounted = true;

    (async () => {
      try {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js");
        await loadScript("https://cdn.jsdelivr.net/npm/vanta/dist/vanta.net.min.js");

        if (!mounted || !vantaRef.current || !window.VANTA) return;

        vantaInstance.current = window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xff0c71,
          backgroundColor: 0x000000,
          points: 9.0,
          maxDistance: 28.0,
          spacing: 18.0,
        });
      } catch {
        /* fallback بدون أنيميشن */
      }
    })();

    return () => {
      mounted = false;
      if (vantaInstance.current) {
        vantaInstance.current.destroy();
        vantaInstance.current = null;
      }
    };
  }, []);

  return (
    <>
      <Box
        position="relative"
        overflow="hidden"
        minH={{ base: "70vh", md: "78vh" }}
        dir={t.dir}
        fontFamily={t.font}
      >
        {/* خلفية Vanta */}
        <Box ref={vantaRef} position="absolute" inset={0} zIndex={0} />

        {/* Overlay للتباين */}
        <Box
          position="absolute"
          inset={0}
          zIndex={1}
          bgGradient={`
            radial-gradient(1000px 400px at 50% -10%, rgba(36,124,255,0.25), transparent 70%),
            linear-gradient(to bottom, rgba(8,14,28,0.92), rgba(8,14,28,0.95))
          `}
        />

        {/* المحتوى */}
        <Container maxW="6xl" position="relative" zIndex={2} py={{ base: 20, md: 28 }}>
          <Stack spacing={6} align="center" textAlign={t.align}>
            <HStack
              spacing={3}
              bg={badgeBg}
              color={badgeColor}
              px={5}
              py={2.5}
              rounded="full"
              boxShadow="sm"
              flexDir={t.dir === "rtl" ? "row-reverse" : "row"}
            >
              <Icon as={IoShieldCheckmark} boxSize={5} />
              <Text fontWeight="600">{t.badge}</Text>
            </HStack>

            <Heading as="h1" size={{ base: "2xl", md: "3xl" }} lineHeight={1.1} color="white">
              {t.heading}
            </Heading>

            <Text fontSize={{ base: "lg", md: "l" }} fontWeight={600} maxW="3xl" color={subtitleColor}>
              {t.subtitle}
            </Text>

            <HStack spacing={4} pt={2} flexDir={t.dir === "rtl" ? "row-reverse" : "row"}>
              
              <Button size="lg" rounded="md" variant="solid" onClick={() => setOpen(true)}>
                {t.ctaPrimary}
              </Button>

<Modal isOpen={open} onClose={() => setOpen(false)} isCentered size="lg">
  <ModalOverlay />
  <ModalContent bg="transparent" shadow="none">
    <Center p={4}>
      <PopUpForm onClose={() => setOpen(false)} />
    </Center>
  </ModalContent>
</Modal>
<Button
  as={Link}
  href="https://wa.me/201080877774"
  isExternal
  size="lg"
  rounded="md"
  variant="outline"
  borderColor="white"
  color="white"
  _hover={{ bg: "whiteAlpha.300" }}
>
  {t.ctaSecondary}
</Button>
            </HStack>
          </Stack>
        </Container>
      </Box>

      {/* اللوجوز */}
      <PartnerLogosCard mt={logosOverlap} logos={logos} title={t.logosTitle} />
    </>
  );
}

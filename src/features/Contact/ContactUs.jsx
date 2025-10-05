// src/components/ContactUs.jsx
import React from "react";
import { Box, Container, useColorModeValue, useToast } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ContactInfo from "./ContactInfo";
import ContactHeader from "./ContactHeader";
import ContactBanner from "./ContactBanner";
import ContactForm from "./ContactForm";
import { CONTACT_STRINGS } from "./strings";

export default function ContactUs({ lang: forcedLang, sectionId = "contact" }) {
  const toast = useToast();
  const { pathname } = useLocation();
  const lang = forcedLang ?? (pathname.startsWith("/en") ? "en" : "ar");
  const t = CONTACT_STRINGS[lang];

  const cardBg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "whiteAlpha.300");

  // ContactForm بينادي onSubmit(payload) — هنا نستقبل payload مباشرة
  const handleSubmit = (payload) => {
    console.log("Contact payload:", payload);
    toast({
      status: "success",
      title: lang === "ar" ? "تم استلام البيانات" : "Payload received",
      duration: 3000,
    });
    // هنا تقدر تعمل أي لوجيك إضافي (tracking / navigation ... )
  };

  return (
    <Box id={sectionId} py={{ base: 12, md: 16 }} dir={t.dir}>
      <Container maxW="6xl">
        <ContactHeader t={t} />
        <ContactInfo t={t} />

        <Box
          bg={cardBg}
          border="1px solid"
          borderColor={border}
          rounded="xl"
          overflow="hidden"
          boxShadow="sm"
        >
          <ContactBanner t={t} />
          {/* مرر اللغة للاستمارة، وسيبها تبعت payload في onSubmit */}
          <ContactForm lang={lang} onSubmit={handleSubmit} />
        </Box>
      </Container>
    </Box>
  );
}

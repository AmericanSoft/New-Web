// src/components/ContactBanner.jsx
import { Box, Image, Text, Flex } from "@chakra-ui/react";
import React from "react";
import ContactBg from "/assets/ContactBg.png";
import { CONTACT_STRINGS } from "./strings"; // <-- غيّر المسار حسب مكان الملف
import { useLang } from "./getLang";

export default function ContactBanner({ lang: forcedLang }) {
  const lang = useLang(forcedLang);
  const t = CONTACT_STRINGS[lang];

  return (
    <Box position="relative" h={{ base: "220px", md: "280px" }} dir={t.dir}>
      <Image src={ContactBg} alt={t.bannerTitle} objectFit="cover" w="100%" h="100%" />
      <Box position="absolute" inset={0} bg="rgba(0,0,0,0.4)" />
      <Flex position="absolute" inset={0} align="center" justify="center" textAlign="center" px={4}>
        <Text
          color="white"
          fontWeight="800"
          fontSize={{ base: "2xl", md: "4xl" }}
          lineHeight="short"
          textShadow="0 2px 12px rgba(0,0,0,.8)"
        >
          {t.bannerTitle}
        </Text>
      </Flex>
    </Box>
  );
}

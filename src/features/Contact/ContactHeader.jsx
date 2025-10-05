// src/components/ContactHeader.jsx
import { Box, VStack, Heading } from "@chakra-ui/react";
import React from "react";
import { CONTACT_STRINGS } from "./strings"; // <-- غيّر المسار حسب مكان الملف
import { useLang } from "./getLang";

export default function ContactHeader({ lang: forcedLang }) {
  const lang = useLang(forcedLang);
  const t = CONTACT_STRINGS[lang];

  return (
    <VStack spacing={3} textAlign="center" mb={{ base: 8, md: 10 }} dir={t.dir}>
      <Box mx="auto" w="72px" h="6px" rounded="full" bg="primary" />
      <Heading as="h2" color="black" size="lg">{t.headerTitle}</Heading>
    </VStack>
  );
}

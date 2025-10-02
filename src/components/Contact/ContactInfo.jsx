// src/components/ContactInfo.jsx
import React from "react";
import { Box, Container, SimpleGrid, HStack, VStack, Image, Text, Heading, useColorModeValue } from "@chakra-ui/react";
import { CONTACT_STRINGS } from "./strings"; // <-- غيّر المسار حسب مكان الملف
import { useLang } from "./getLang";

function InfoCard({ icon, label, value }) {
  const textColor = useColorModeValue("gray.700", "gray.200");
  const labelColor = useColorModeValue("gray.500", "gray.400");

  return (
    <HStack spacing={4} align="center">
      <Image src={icon} alt={label} boxSize="74px" objectFit="contain" flexShrink={0} />
      <VStack align="start" spacing={0}>
        <Text fontSize="sm" fontWeight="600" color={labelColor}>{label}</Text>
        <Heading as="h4" fontSize="lg" fontWeight="700" color={textColor} whiteSpace="pre-line">
          {value}
        </Heading>
      </VStack>
    </HStack>
  );
}

export default function ContactInfo({ lang: forcedLang }) {
  const lang = useLang(forcedLang);
  const t = CONTACT_STRINGS[lang];

  return (
    <Box py={{ base: 8, md: 12 }} dir={t.dir}>
      <Container maxW="6xl">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 6, md: 12 }}>
          {t.info.items.map((item, idx) => <InfoCard key={idx} {...item} />)}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

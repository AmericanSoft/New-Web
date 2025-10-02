import React from "react";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ReasonCard from "./ReasonCard";
import SectionHeader from "./SectionHeader";
import { STRINGS } from "./strings";

export default function WhyChooseUs({
  title,
  subtitle,
  items,
  lang: forcedLang, // "ar" | "en" (اختياري)
}) {
  const { pathname } = useLocation();
  const lang = forcedLang ?? (pathname.startsWith("/en") ? "en" : "ar");
  const t = STRINGS[lang];

  const finalTitle = title ?? t.title;
  const finalSubtitle = subtitle ?? t.subtitle;
  const finalItems = Array.isArray(items) && items.length ? items : t.items;

  return (
    <Box py={{ base: 12, md: 16 }} dir={t.dir}>
      <Container maxW="6xl">
        <SectionHeader title={finalTitle} subtitle={finalSubtitle} />

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {finalItems.map((it, idx) => (
            <ReasonCard
              key={`${it.title}-${idx}`}
              icon={it.icon}
              title={it.title}
              desc={it.desc}
              index={idx + 1}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

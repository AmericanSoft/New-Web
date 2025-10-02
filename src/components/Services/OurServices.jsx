// src/components/our-services/OurServices.jsx
import React, { useMemo } from "react";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import OurServicesHeader from "./OurServicesHeader";
import ServiceCard from "./ServiceCard";
import { STRINGS } from "./strings";
import { DEFAULT_SERVICES } from "./defaults";
import { resolveLangFromPath, buildFinalServices } from "./utils";

export default function OurServices({
  title,            // اختياري
  subtitle,         // اختياري
  services,         // اختياري: [{icon,title,desc,cta,ctaHref}]
  lang: forcedLang, // اختياري: "ar" | "en"
  sectionId = "services",
}) {
  const { pathname } = useLocation();
  const lang = resolveLangFromPath(pathname, forcedLang);
  const t = STRINGS[lang];

  const finalServices = useMemo(
    () => buildFinalServices(services, t, lang, DEFAULT_SERVICES),
    [services, t, lang]
  );

  return (
    <Box id={sectionId} py={{ base: 12, md: 16 }} dir={t.dir} as="section" aria-labelledby="our-services-heading">
      <Container maxW="6xl">
        <OurServicesHeader title={title ?? t.title} subtitle={subtitle ?? t.subtitle} />

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {finalServices.map((s, i) => (
            <ServiceCard key={`${s.title}-${i}`} {...s} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

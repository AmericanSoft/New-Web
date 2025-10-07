// components/PartnerLogosCard.jsx
import React, { useMemo } from "react";
import {
  Box, Text, SimpleGrid, Image, useColorModeValue, Container, Link,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const STRINGS = {
  en: { title: "Businesses we are a success partner for", dir: "ltr", align: "left" },
  ar: { title: "شركاء نجاح لعلامات تجارية", dir: "rtl", align: "right" },
};

export default function PartnerLogosCard({
  // يمكنك تمرير عنوان مخصص؛ لو مش موجود هنستخدم ترجمة STRINGS حسب اللغة
  title,
  logos = [],
  maxH = 10,
  columns = { base: 2, sm: 3, md: 5 },
  lang: forcedLang,              // اختياري: فرض اللغة "ar" | "en"
  ...containerProps              // يسمح بتمرير mt/mb الخ
}) {
  const { pathname } = useLocation();
  const lang = forcedLang ?? (pathname.startsWith("/en") ? "en" : "ar");
  const t = STRINGS[lang] ?? STRINGS.en;
  const isAR = lang === "ar";

  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("rgba(0,0,0,0.06)", "whiteAlpha.300");
  const textColor = useColorModeValue("gray.800", "white");

  // عنوان نهائي: أولوية لـ prop title، وإلا ترجمة STRINGS
  const finalTitle = useMemo(() => title ?? t.title, [title, t.title]);

  return (
    <Container
      maxW="6xl"
      pb={{ base: 8, md: 14 }}
      position="relative"
      zIndex={2}
      dir={t.dir}
      {...containerProps}
    >
      <Box
        bg={cardBg}
        color={textColor}
        border="1px solid"
        borderColor={cardBorder}
        rounded="2xl"
        boxShadow="xl"
        px={{ base: 4, md: 10 }}
        py={{ base: 6, md: 8 }}
      >
        {finalTitle && (
          <Text fontWeight="700" fontSize="md" textAlign={t.align} mb={4}>
            {finalTitle}
          </Text>
        )}

        <SimpleGrid columns={columns} spacing={{ base: 6, md: 10 }} alignItems="center">
          {logos.map(({ src, alt, href }, i) => {
            const img = (
              <Image
                key={alt || i}
                src={src}
                alt={alt || `partner-${i + 1}`}
                h={maxH}
                objectFit="contain"
                fallbackSrc={src}
                mx="auto"
              />
            );
            return href ? (
              <Link key={`${alt || i}-link`} href={href} isExternal aria-label={alt || `partner-${i + 1}`}>
                {img}
              </Link>
            ) : (
              img
            );
          })}
        </SimpleGrid>
      </Box>
    </Container>
  );
}

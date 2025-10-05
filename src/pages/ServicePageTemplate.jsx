// src/pages/ServicePageTemplate.jsx
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Box, Container, Heading, Text, SimpleGrid, Stack, Tag, Button,
  Image, useColorModeValue, HStack, Badge
} from "@chakra-ui/react";
import Footer from "../components/Footer/Footer";

export default function ServicePageTemplate({ baseKey, coverUrl, rtl, onQuoteClick }) {
  const { t, i18n } = useTranslation();
  const isAr = rtl ?? i18n.language?.startsWith("ar");
  const dir = isAr ? "rtl" : "ltr";

  const brand   = t("about.meta.brand");
  const email   = t("about.meta.email");
  const phone   = t("about.meta.phone");
  const website = t("about.meta.website");

  const title    = t(`${baseKey}.title`);
  const subtitle = t(`${baseKey}.subtitle`);
  const features = t(`${baseKey}.features`,  { returnObjects: true }) || [];
  const benefits = t(`${baseKey}.benefits`,  { returnObjects: true }) || [];
  const stack    = t(`${baseKey}.stack`,     { returnObjects: true }) || [];

  const cardBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  const cardBg     = useColorModeValue("white", "gray.900");
  const subColor   = useColorModeValue("gray.600", "gray.300");
  const sectionBg  = useColorModeValue("red.50", "whiteAlpha.100");

  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    serviceType: t(`${baseKey}.serviceType`, { defaultValue: title }),
    provider: {
      "@type": "Organization",
      name: brand,
      email,
      telephone: phone,
      url: website,
      address: {
        "@type": "PostalAddress",
        streetAddress: t("about.meta.address"),
        addressCountry: "EG",
      },
    },
    areaServed: ["EG", "MENA"],
    url: `${website}/${baseKey.split(".")[1] || "service"}`,
    description: subtitle,
  }), [title, baseKey, brand, email, phone, website, subtitle, t]);

  const handleCTA = onQuoteClick || (() => {
    const tel = (phone || "").toString().replace(/\s+/g, "");
    if (tel) window.location.href = `tel:${tel}`;
  });

  return (
    <>
      <Box dir={dir} bg={useColorModeValue("white", "gray.950")} pt={{ base: 28, sm: 32 }} pb={16}>
        <Container maxW="6xl">
          {/* Hero */}
          <Stack spacing={4} textAlign="center" mb={{ base: 8, md: 12 }}>
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt={title}
                mx="auto"
                mb={4}
                h="200px"
                w="full"
                maxW="5xl"
                objectFit="cover"
                rounded="3xl"
              />
            ) : null}

            <HStack justify="center" mb={1}>
              <Badge
                rounded="full"
                px={3}
                py={1}
                colorScheme="gray"
                border="1px solid"
                borderColor={cardBorder}
                variant="subtle"
                fontWeight="semibold"
              >
                {t(`${baseKey}.badge`)}
              </Badge>
            </HStack>

            <Heading
              as="h1"
              size={{ base: "xl", sm: "2xl", md: "3xl" }}
              fontWeight="extrabold"
              color={useColorModeValue("gray.900", "white")}
            >
              {title}
            </Heading>

            <Text mt={1} color={subColor} fontSize={{ base: "md", sm: "lg" }} maxW="3xl" mx="auto">
              {subtitle}
            </Text>
          </Stack>

          {/* Features */}
          {features.length > 0 && (
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4} mb={10}>
              {features.map((f, i) => (
                <Box key={i} rounded="2xl" border="1px solid" borderColor={cardBorder} bg={cardBg} p={5} shadow="sm">
                  <Text color={useColorModeValue("gray.800", "gray.100")}>{f}</Text>
                </Box>
              ))}
            </SimpleGrid>
          )}

          {/* Benefits */}
          {benefits.length > 0 && (
            <Box mb={10}>
              <Heading as="h3" size="lg" mb={3} color={useColorModeValue("gray.900", "white")}>
                {t(`${baseKey}.benefitsTitle`)}
              </Heading>
              <Stack as="ul" ps={6} spacing={2}>
                {benefits.map((b, i) => (
                  <Box as="li" key={i}>
                    <Text color={useColorModeValue("gray.700", "gray.200")}>{b}</Text>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {/* Tech Stack */}
          {stack.length > 0 && (
            <Box mb={12}>
              <Heading as="h3" size="lg" mb={3} color={useColorModeValue("gray.900", "white")}>
                {t(`${baseKey}.stackTitle`)}
              </Heading>
              <HStack flexWrap="wrap" spacing={2}>
                {stack.map((tag, i) => (
                  <Tag key={i} size="sm" variant="subtle" border="1px solid" borderColor={cardBorder}>
                    {tag}
                  </Tag>
                ))}
              </HStack>
            </Box>
          )}

          {/* CTA */}
          <Box
            rounded="3xl"
            border="1px solid"
            borderColor={cardBorder}
            bg={sectionBg}
            p={{ base: 6, sm: 8 }}
            shadow="sm"
            textAlign="center"
          >
            <Heading as="h4" size="md" mb={2} color={useColorModeValue("gray.900", "white")}>
              {t(`${baseKey}.cta.title`)}
            </Heading>
            <Text color={useColorModeValue("gray.700", "gray.200")}>
              {t(`${baseKey}.cta.desc`)}
            </Text>

            <Button mt={4} variant="outline" borderColor="red.600" colorScheme="red" onClick={handleCTA}>
              {t(`${baseKey}.cta.btn`)}
            </Button>

            <Text mt={3} fontSize="sm" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>
              {t("about.contactLine")}{" "}
              <Box as="span" fontWeight="medium">
                <Box as="a" href={`tel:${(phone || "").toString().replace(/\s+/g, "")}`}>{phone}</Box>
              </Box>
            </Text>
          </Box>

          {/* JSON-LD */}
          <Box as="script" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </Container>
      </Box>

      <Footer />
    </>
  );
}

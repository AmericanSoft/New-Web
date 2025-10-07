// src/pages/Policies.jsx
import React, { useMemo, useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Heading,
  Text as CText,
  Button,
  HStack,
  VStack,
  Stack,
  useColorModeValue,
  Divider,
  Link as CLink,
  Badge,
  SimpleGrid,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { POLICIES_STRINGS as STR } from "./policies";

export default function Policies() {
  const { pathname, hash } = useLocation();
  const initialLang = pathname.startsWith("/en") ? "en" : "ar";
  const [lang, setLang] = useState(initialLang);
  const t = STR[lang];
  const dir = t.dir;

  // Colors
  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const subText = useColorModeValue("gray.600", "gray.300");
  const borderCol = useColorModeValue("gray.200", "whiteAlpha.300");

  // set html dir/lang
  useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [dir, lang]);

  // JSON-LD
  const org = {
    name: t.brand,
    url: "https://american-soft.example.com",
    email: t.contactEmail,
  };
  const lastUpdated = "October 2, 2025";

  const jsonLd = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "PrivacyPolicy",
        name: `${org.name} Privacy Policy`,
        url: `${org.url}/policies`,
        dateModified: lastUpdated,
        publisher: { "@type": "Organization", name: org.name, url: org.url },
      },
      {
        "@context": "https://schema.org",
        "@type": "TermsOfService",
        name: `${org.name} Terms of Service`,
        url: `${org.url}/policies`,
        dateModified: lastUpdated,
        publisher: { "@type": "Organization", name: org.name, url: org.url },
      },
    ],
    [org.name, org.url, lastUpdated]
  );

  // smooth scroll
  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 90;
    const y = window.scrollY + el.getBoundingClientRect().top - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  }, []);

  // scroll to hash if present
  useEffect(() => {
    if (hash && hash.startsWith("#")) {
      const id = hash.slice(1);
      setTimeout(() => scrollToId(id), 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // scroll spy
  const [activeId, setActiveId] = useState("tos");
  useEffect(() => {
    const ids = [
      "tos",
      "privacy",
      "cookies",
      "billing",
      "ip",
      "aup",
      "security",
      "rights",
      "law",
      "contact",
    ];
    const headerOffset = 100;
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - headerOffset <= 0) current = id;
        else break;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // section component
  const Sec = ({ id, title, children }) => (
    <Card
      id={id}
      bg={cardBg}
      border="1px solid"
      borderColor={borderCol}
      shadow="sm"
      sx={{ scrollMarginTop: "110px" }}
    >
      <CardBody>
        <Heading as="h2" size="md" mb={3}>
          {title}
        </Heading>
        <CText color={subText} lineHeight="tall">
          {children}
        </CText>
      </CardBody>
    </Card>
  );

  const anchorLink = (id) => (
    <CLink
      key={id}
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToId(id);
      }}
      fontSize="sm"
      color={activeId === id ? "teal.700" : "teal.600"}
      fontWeight={activeId === id ? "700" : "500"}
      textDecoration={activeId === id ? "underline" : "none"}
      _hover={{ textDecoration: "underline" }}
    >
      {t.sections[id]}
    </CLink>
  );

  return (
    <Box dir={dir} bg={pageBg} py={{ base: 12, md: 16 }}>
      <Container maxW="6xl">
        {/* Header */}
        <HStack mb={6} align="start">
          <VStack align="start" spacing={1} flex={1}>
            <Heading as="h1" size="lg">
              {t.title} — {t.brand}
            </Heading>
            <HStack>
              <Badge colorScheme="teal" variant="subtle">
                {t.updated}
              </Badge>
              <CText color={subText}>
                <time dateTime="2025-10-02">{lastUpdated}</time>
              </CText>
            </HStack>
            <CText color={subText}>{t.intro}</CText>
          </VStack>
          <Button
            onClick={() => setLang((p) => (p === "ar" ? "en" : "ar"))}
            variant="outline"
          >
            {t.langBtn}
          </Button>
        </HStack>

        <SimpleGrid columns={{ base: 1, lg: 4 }} gap={6}>
          {/* TOC */}
          <Card
            as="aside"
            bg={cardBg}
            border="1px solid"
            borderColor={borderCol}
            position="sticky"
            top="90px"
            h="fit-content"
          >
            <CardBody>
              <Heading as="h3" size="sm" mb={3}>
                {t.tocTitle}
              </Heading>
              <Stack spacing={2}>
                {anchorLink("tos")}
                {anchorLink("privacy")}
                {anchorLink("cookies")}
                {anchorLink("billing")}
                {anchorLink("ip")}
                {anchorLink("aup")}
                {anchorLink("security")}
                {anchorLink("rights")}
                {anchorLink("law")}
                {anchorLink("contact")}
              </Stack>
            </CardBody>
          </Card>

          {/* Content */}
          <Stack spacing={6} gridColumn={{ lg: "span 3" }}>
            <Sec id="tos" title={t.sections.tos}>
              <ul style={{ marginInlineStart: "1.2rem" }}>
                <li>{t.bullets.scope}</li>
                <li>{t.bullets.accounts}</li>
                <li>{t.bullets.deliverables}</li>
                <li>{t.bullets.changes}</li>
                <li>{t.bullets.support}</li>
                <li>{t.bullets.suspend}</li>
                <li>{t.bullets.disclaimer}</li>
                <li>{t.bullets.liability}</li>
              </ul>
            </Sec>

            <Sec id="privacy" title={t.sections.privacy}>
              <Heading as="h4" size="sm" mb={2}>
                {t.privacy.collectTitle}
              </Heading>
              <ul style={{ marginInlineStart: "1.2rem" }}>
                {t.privacy.collect.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
              <Divider my={3} />
              <Heading as="h4" size="sm" mb={2}>
                {t.privacy.useTitle}
              </Heading>
              <ul style={{ marginInlineStart: "1.2rem" }}>
                {t.privacy.use.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
              <Divider my={3} />
              <Heading as="h4" size="sm" mb={2}>
                {t.privacy.shareTitle}
              </Heading>
              <CText>{t.privacy.share}</CText>
              <Divider my={3} />
              <Heading as="h4" size="sm" mb={2}>
                {t.privacy.retainTitle}
              </Heading>
              <CText>{t.privacy.retain}</CText>
              <Divider my={3} />
              <Heading as="h4" size="sm" mb={2}>
                {t.privacy.rightsTitle}
              </Heading>
              <ul style={{ marginInlineStart: "1.2rem" }}>
                {t.privacy.rights.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </Sec>

            <Sec id="cookies" title={t.sections.cookies}>
              <ul style={{ marginInlineStart: "1.2rem" }}>
                {t.cookies.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </Sec>

            <Sec id="billing" title={t.sections.billing}>
              <ul style={{ marginInlineStart: "1.2rem" }}>
                {t.billing.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </Sec>

            <Sec id="ip" title={t.sections.ip}>
              <ul style={{ marginInlineStart: "1.2rem" }}>
                {t.ip.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </Sec>

            <Sec id="aup" title={t.sections.aup}>
              {t.aup}
            </Sec>

            <Sec id="security" title={t.sections.security}>
              <ul style={{ marginInlineStart: "1.2rem" }}>
                {t.security.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </Sec>

            <Sec id="rights" title={t.sections.rights}>
              <CText>
                {lang === "ar"
                  ? "لديك حقوق الوصول، التصحيح، الحذف، الاعتراض، وتقييد المعالجة – وحق نقل البيانات حيث ينطبق."
                  : "You have rights to access, rectification, erasure, objection, restriction, and data portability where applicable."}
              </CText>
            </Sec>

            <Sec id="law" title={t.sections.law}>
              {t.law}
            </Sec>

            <Sec id="contact" title={t.sections.contact}>
              <address style={{ fontStyle: "normal" }}>
                {org.name} — {t.contactLead}
                <br />
                {lang === "ar" ? "البريد" : "Email"}:{" "}
                <CLink
                  href={`mailto:${org.email}`}
                  color="teal.600"
                  textDecoration="underline"
                >
                  {org.email}
                </CLink>
              </address>
            </Sec>
          </Stack>
        </SimpleGrid>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Container>
    </Box>
  );
}

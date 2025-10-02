// src/components/Header.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Box, HStack, IconButton, Button, Link as CLink, useDisclosure,
  Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack, Image, Grid
} from "@chakra-ui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiGlobe, FiMenu } from "react-icons/fi";

export default function Header({ lang: forcedLang }) {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const lang = forcedLang ?? (pathname.startsWith("/en") ? "en" : "ar");
  const isAR = lang === "ar";

  // ✅ IDs الموجودة في الصفحة (أضفنا projects)
  const SECTIONS = useMemo(() => ["projects", "blog", "services", "contact"], []);

  // active link حسب السكشن الظاهر
  const [activeId, setActiveId] = useState(() => (hash ? hash.replace("#", "") : ""));

  // nav labels
  const nav = [
    { to: isAR ? "/" : "/en", label: isAR ? "الرئيسية" : "Home", type: "route" },
    { to: "#services", label: isAR ? "خدماتنا" : "Our Services", type: "hash" },
    { to: "#projects", label: isAR ? "مشاريعنا" : "Our projects", type: "hash" },
    { to: "#blog", label: isAR ? "المدونة" : "Blog", type: "hash" },
    { to: "#contact", label: isAR ? "تواصل معنا" : "Contact Us", type: "hash" },
  ];

  const linkBase = { fontWeight: 600, color: "gray.800" };
  const linkActive = { color: "red.500" };

  const scrollToId = useCallback(
    (id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // حدّث الـ URL من غير ريفرش
      const base = isAR ? "/" : "/en";
      window.history.replaceState(null, "", `${base}#${id}`);
      setActiveId(id);
      onClose(); // اقفل الدروِر على الموبايل
    },
    [isAR, onClose]
  );

  // ✅ IntersectionObserver لتحديد الـ active أثناء السّكرول
  useEffect(() => {
    if (typeof window === "undefined") return;
    const options = { root: null, rootMargin: "0px 0px -60% 0px", threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        if (entry.isIntersecting && id) setActiveId(id);
      });
    }, options);

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [SECTIONS]);

  // لو فتح الصفحة ومعاه هاش — انزل له
  useEffect(() => {
    if (hash && hash.startsWith("#")) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 0);
    }
  }, [hash]);

  // Anchor component يحترم الـ single-page
  const Anchor = ({ to, children }) => {
    const isHash = to.startsWith("#");
    const id = isHash ? to.slice(1) : null;

    if (isHash) {
      return (
        <CLink
          as="button"
          onClick={() => scrollToId(id)}
          style={{ ...linkBase, ...(activeId === id ? linkActive : {}) }}
        >
          {children}
        </CLink>
      );
    }
    // Home route
    return (
      <CLink
        as={NavLink}
        to={to}
        style={({ isActive }) => ({ ...linkBase, ...(isActive ? linkActive : {}) })}
        onClick={onClose}
      >
        {children}
      </CLink>
    );
  };

  const LangSwitch = (
    <Button
      size="sm"
      variant="outline"
      borderRadius="xl"
      onClick={() => navigate(isAR ? "/en" : "/")}
    >
      {isAR ? "EN" : "AR"}
    </Button>
  );

  const CTA = (
    <Button>
      {isAR ? "احجز استشارة" : "Hire Us Today "}
    </Button>
  );

  return (
    <Box
      as="header"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      position="sticky"
      top="0"
      zIndex="100"
      dir={isAR ? "rtl" : "ltr"}
    >
      <Grid
        templateColumns="1fr auto 1fr"
        alignItems="center"
        maxW="1200px"
        mx="auto"
        px={6}
        h="80px"
        gap={4}
      >
        {/* الشعار */}
        <HStack justify="flex-start">
          <Image src="/Logo.png" alt="AmericanSoft Logo" h="60px" />
        </HStack>

        {/* المنيو في النص */}
        <HStack spacing={8} justify="center" display={{ base: "none", md: "flex" }}>
          {nav.map((item) => (
            <Anchor key={item.label} to={item.to}>
              {item.label}
            </Anchor>
          ))}
        </HStack>

        {/* الأزرار */}
        <HStack justify="flex-end" spacing={3}>
          <Button
            size="sm"
            variant="outline"
            borderRadius="xl"
            leftIcon={<FiGlobe />}
            onClick={() => navigate(isAR ? "/en" : "/")}
          >
            {isAR ? "EN" : "AR"}
          </Button>

          <Button>
            {isAR ? "احجز استشارة" : "Hire Us Today "}
          </Button>

          {/* Mobile Menu Icon */}
          <IconButton
            aria-label="Menu"
            icon={<FiMenu />}
            display={{ base: "inline-flex", md: "none" }}
            onClick={onOpen}
            variant="ghost"
          />
        </HStack>
      </Grid>

      {/* Drawer */}
      <Drawer isOpen={isOpen} placement={isAR ? "right" : "left"} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <VStack align="stretch" p={6} spacing={4} mt={10} dir={isAR ? "rtl" : "ltr"}>
            {nav.map((item) => (
              <Anchor key={item.label} to={item.to}>
                {item.label}
              </Anchor>
            ))}
            {LangSwitch}
            {CTA}
          </VStack>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

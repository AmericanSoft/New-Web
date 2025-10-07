// src/components/Header.jsx
import  { useEffect, useMemo, useState, useCallback } from "react";
import {
  Box, HStack, IconButton, Button, Link as CLink, useDisclosure, Modal,
  ModalOverlay, ModalContent, Center, Drawer, DrawerOverlay, DrawerContent,
  DrawerCloseButton, VStack, Image, Grid
} from "@chakra-ui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiGlobe, FiMenu } from "react-icons/fi";
import i18n from "../../../i18";
import PopUpForm from "../../components/PopupForm/popUpForm"; // عدّل المسار لو مختلف

export default function Header({ lang: forcedLang }) {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const lang = forcedLang ?? (pathname.startsWith("/en") ? "en" : "ar");
  const isAR = lang === "ar";

  const [open, setOpen] = useState(false);
  const handleOpen = (e) => { if (e) e.preventDefault(); setOpen(true); };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (pathname.startsWith("/en")) i18n.changeLanguage("en");
    else i18n.changeLanguage("ar");
  }, [pathname]);

  const toggleLanguage = () => {
    let newPath = pathname;
    if (isAR) {
      newPath = pathname.startsWith("/en") ? pathname : `/en${pathname}`;
      i18n.changeLanguage("en");
      document.dir = "ltr";
    } else {
      newPath = pathname.replace(/^\/en/, "") || "/";
      i18n.changeLanguage("ar");
      document.dir = "rtl";
    }
    navigate(newPath);
  };

  const SECTIONS = useMemo(() => ["projects", "blog", "services", "contact"], []);
  const [activeId, setActiveId] = useState(() => (hash ? hash.replace("#", "") : ""));

  const nav = [
    { to: isAR ? "/" : "/en", label: isAR ? "الرئيسية" : "Home", type: "route" },
    { to: "#services", label: isAR ? "خدماتنا" : "Our Services", type: "hash" },
    { to: "#projects", label: isAR ? "مشاريعنا" : "Our Projects", type: "hash" },
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
      const base = isAR ? "/" : "/en";
      window.history.replaceState(null, "", `${base}#${id}`);
      setActiveId(id);
      onClose();
    },
    [isAR, onClose]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (entry.isIntersecting && id) setActiveId(id);
        });
      },
      { root: null, rootMargin: "0px 0px -60% 0px", threshold: 0 }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [SECTIONS]);

  useEffect(() => {
    if (hash && hash.startsWith("#")) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 0);
    }
  }, [hash]);

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
      leftIcon={<FiGlobe />}
      onClick={toggleLanguage}
    >
      {isAR ? "EN" : "AR"}
    </Button>
  );

  const CTA = (
    <Button onClick={handleOpen}>
      {isAR ? "احجز استشارة" : "Hire Us Today"}
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
      {/* ====== الهيدر ====== */}
      <Grid
        templateColumns="auto 1fr auto"
        alignItems="center"
        maxW="1200px"
        mx="auto"
        px={6}
        h="80px"
        gap={4}
      >
        {/* الشعار */}
        <HStack justify="flex-start">
          <Image
            src="/Logo.png"
            alt="AmericanSoft Logo"
            h="3em"         // ← المطلوب
            w="4em"         // ← المطلوب
            objectFit="contain"
          />
        </HStack>

        {/* الناف + زر/الفون (Flex space-around) */}
        <HStack
          as="nav"
          w="100%"
          justify="space-around"   // ← المطلوب
          spacing={6}
          display={{ base: "none", md: "flex" }}
        >
          <HStack spacing={6}>
            {nav.map((item) => (
              <Anchor key={item.label} to={item.to}>
                {item.label}
              </Anchor>
            ))}
          </HStack>

          {/* مجموعة الأزرار على اليمين عادة: لغة + CTA */}
          <HStack spacing={3}>
            {LangSwitch}
            {CTA}
          </HStack>
        </HStack>

        {/* زر المنيو للموبايل */}
        <HStack justify="flex-end">
          <IconButton
            aria-label="Menu"
            icon={<FiMenu />}
            display={{ base: "inline-flex", md: "none" }}
            onClick={onOpen}
            variant="ghost"
          />
        </HStack>
      </Grid>

      {/* Drawer للموبايل */}
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

      {/* مودال الاستشارة */}
      <Modal isOpen={open} onClose={handleClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent bg="transparent" shadow="none">
          <Center p={4}>
            <PopUpForm onClose={handleClose} />
          </Center>
        </ModalContent>
      </Modal>
    </Box>
  );
}

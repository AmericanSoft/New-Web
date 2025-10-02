// src/features/footer/components/LinkList.jsx
import React from "react";
import { Stack, Text as CText, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

/**
 * links: Array<{ label: string, href: string }>
 * - لو href يبدأ بـ http(s) نستخدم <a target="_blank">
 * - غير كده نستخدم <RouterLink to="..."> عشان يشتغل مع HashRouter/BrowserRouter
 */
export default function LinkList({ title, links = [] }) {
    const navigate = useNavigate();

  const go = (href) => (e) => {
    e.preventDefault();
    navigate(href);
    // scroll بعد التنقّل
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  };
  return (
    <Stack spacing={3}>
      <CText fontWeight="700">{title}</CText>
      {links.map((l, i) => {
        const isExternal = /^https?:\/\//i.test(l.href);
        return isExternal ? (
          <ChakraLink key={i} href={l.href} isExternal>
            {l.label}
          </ChakraLink>
        ) : (
          <ChakraLink key={i} as={RouterLink} to={l.href}>
            {l.label}
          </ChakraLink>
        );
      })}
    </Stack>
  );
}

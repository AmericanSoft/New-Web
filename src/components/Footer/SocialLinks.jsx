// src/features/footer/components/SocialLinks.jsx
import React from "react";
import {
  VStack,
  Heading,
  HStack,
  Link as CLink,
  IconButton,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default function SocialLinks({ title, langBtn, onLangToggle }) {
  const titleColor = useColorModeValue("#263b5e", "gray.100");

  // Brand colors
  const FB = "#1877F2";
  const FB_HOVER = "#166FE5";
  const IN = "#0A66C2";
  const IN_HOVER = "#0554A1";

  const common = {
    isRound: true,
    w: "44px",
    h: "44px",
    color: "white",
    _focusVisible: { boxShadow: "0 0 0 3px rgba(0,0,0,.15)" },
  };

  return (
    <VStack align="stretch" spacing={4}>
      <Heading as="h3" size="md" color={titleColor} fontWeight={700}>
        {title}
      </Heading>

      <HStack spacing={4}>
        <IconButton
          as={CLink}
          href="https://www.facebook.com/profile.php?id=61572671488146"
          isExternal
          aria-label="Facebook"
          icon={<FaFacebookF />}
          bg={FB}
          _hover={{ bg: FB_HOVER }}
          _active={{ bg: FB_HOVER }}
          {...common}
        />
        <IconButton
          as={CLink}
          href="https://www.linkedin.com/company/american-softwares/posts/?feedView=all"
          isExternal
          aria-label="LinkedIn"
          icon={<FaLinkedinIn />}
          bg={IN}
          _hover={{ bg: IN_HOVER }}
          _active={{ bg: IN_HOVER }}
          {...common}
        />
      </HStack>

      <Button
        onClick={onLangToggle}
        variant="outline"
        size="sm"
        borderRadius="md"
        w="fit-content"
      >
        {langBtn}
      </Button>
    </VStack>
  );
}

// src/components/Sidebar.jsx
import React from "react";
import {
  Box, VStack, Heading, Link as CLink, HStack, Icon,
  useColorModeValue, Button, Spacer, useToast
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { GoProject } from "react-icons/go";
import { FcBusinessContact } from "react-icons/fc";
import { useAuth } from "../../features/Auth/AuthContext"; // <-- غيّر المسار حسب تنظيمك

export default function Sidebar() {
  const bg = useColorModeValue("gray.900", "gray.900");
  const text = useColorModeValue("white", "white");
  const hoverBg = useColorModeValue("gray.800", "gray.800");
  const borderCol = useColorModeValue("whiteAlpha.200", "whiteAlpha.200");
  const navigate = useNavigate();
  const toast = useToast();
  const { signout } = useAuth();

  const itemProps = {
    display: "flex",
    alignItems: "center",
    gap: 2,
    px: 3,
    py: 2,
    rounded: "md",
    color: "gray.200",
    transition: "all .15s ease",
    _hover: { bg: hoverBg, color: "white", textDecoration: "none" },
    sx: { '&[aria-current="page"]': { bg: "blue.600", color: "white" } },
  };

  const handleLogout = () => {
    signout(); // <-- ده اللي بيصفّر الحالة
    toast({ title: "تم تسجيل الخروج", status: "info", duration: 2000, isClosable: true });
    navigate("/login", { replace: true });
  };

  return (
    <Box as="aside" h="100vh" w="250px" bg={bg} color={text} p={4} position="sticky" top={0}
         borderRight="1px solid" borderColor={borderCol} display="flex" flexDir="column" gap={4}>
      <Heading mb={2} size="md" letterSpacing="wide">
        Admin Panel
      </Heading>

      <VStack align="stretch" spacing={2}>
        <CLink as={NavLink} to="/ourprojects" {...itemProps}>
          <HStack spacing={2}>
            <Icon as={GoProject} boxSize={5} />
            <Box as="span">Projects</Box>
          </HStack>
        </CLink>

        <CLink as={NavLink} to="/ourcontacts" {...itemProps}>
          <HStack spacing={2}>
            <Icon as={FcBusinessContact} boxSize={5} />
            <Box as="span">Contact Us</Box>
          </HStack>
        </CLink>
      </VStack>

      <Spacer />

      <Button onClick={handleLogout} colorScheme="red" variant="solid" w="full">
        Logout
      </Button>
    </Box>
  );
}

// src/Layout/AdminDashboard.jsx
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Container,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Sidebar from "../../components/Admintool/Sidebar";

export default function AdminDashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("auth:user");
    navigate("/login");
  }

  const headerBg = useColorModeValue("white", "gray.800");
  const headerBd = useColorModeValue("gray.200", "whiteAlpha.300");
  const mainBg   = useColorModeValue("gray.50", "gray.900");

  return (
    <Flex minH="100vh" bg={mainBg}>
      {/* Sidebar */}
      <Box flexShrink={0}>
        <Sidebar />
      </Box>

      {/* Main content */}
      <Box flex="1" display="flex" flexDir="column">
        {/* Header */}
        <Box
          bg={headerBg}
          borderBottom="1px solid"
          borderColor={headerBd}
          py={3}
          px={{ base: 4, md: 6 }}
          position="sticky"
          top={0}
          zIndex={10}
        >
          <Container maxW="7xl" p={0}>
            <HStack>
              <Text fontWeight="semibold">Admin</Text>
              <Spacer />
              <Button colorScheme="red" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </HStack>
          </Container>
        </Box>

        {/* Page content */}
        <Box as="main" flex="1" p={{ base: 4, md: 6 }}>
          <Container maxW="7xl">
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Flex>
  );
}

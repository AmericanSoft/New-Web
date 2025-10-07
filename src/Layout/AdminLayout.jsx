
// src/Layout/AdminLayout.jsx
import { Flex, Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "../features/AdminSidebar/Sidebar";

export default function AdminLayout() {
  return (
    <Flex minH="100vh" bg="gray.50" _dark={{ bg: "gray.950" }}>
      {/* العمود الأيسر: السايدبار بعرض ثابت */}
      <Box flex="0 0 250px">
        <Sidebar />
      </Box>

      {/* العمود الأيمن: المحتوى */}
      <Box as="main" flex="1" overflowX="hidden" py={{ base: 4, md: 6 }} px={{ base: 2, md: 4 }}>
        {/* Container يحدّد عرض المحتوى وما يخليش البطاقات تلزق في السايدبار */}
        <Container maxW="7xl" px={{ base: 2, md: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Flex>
  );
}

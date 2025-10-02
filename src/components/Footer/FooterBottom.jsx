import React from "react";
import { Box, Container, HStack, Text, useColorModeValue } from "@chakra-ui/react";

export default function FooterBottom({ text, isAR }) {
  const borderCol = useColorModeValue("gray.200", "whiteAlpha.300");
  const bottomColor = useColorModeValue("#7f88a6", "gray.400");

  return (
    <Box borderTop="1px solid" borderColor={borderCol}>
      <Container maxW="6xl">
        <HStack
          py={4}
          color={bottomColor}
          spacing={4}
          flexDir={{ base: "column", md: isAR ? "row-reverse" : "row" }}
          justify="space-between"
          align="center"
          textAlign={{ base: "center", md: "start" }}
        >
          <Text>{text}</Text>
          <HStack spacing={4}>{/* يمكنك إضافة روابط إضافية هنا لاحقًا */}</HStack>
        </HStack>
      </Container>
    </Box>
  );
}

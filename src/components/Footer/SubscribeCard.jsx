import React from "react";
import { Box, Heading, Text, Input, Button, useColorModeValue, VStack } from "@chakra-ui/react";

export default function SubscribeCard({ title, subtitle, placeholder, cta, onSubmit }) {
  const cardBg = useColorModeValue("white", "whiteAlpha.100");
  const borderCol = useColorModeValue("gray.200", "whiteAlpha.300");
  const brand = "#4F46E5";

  return (
    <VStack align="stretch" spacing={4}>
      <Heading as="h3" size="md" color={useColorModeValue("#263b5e", "gray.100")} fontWeight={700}>
        {title}
      </Heading>
      <Text color={useColorModeValue("#6a7695", "gray.300")}>{subtitle}</Text>

      <Box
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(e);
        }}
        noValidate
        display="grid"
        gridTemplateColumns={{ base: "1fr", sm: "1fr auto" }}
        gap={3}
      >
        <Input
          name="EMAIL"
          type="email"
          placeholder={placeholder}
          bg={cardBg}
          border="1px solid"
          borderColor={borderCol}
          _focus={{ borderColor: brand, boxShadow: `0 0 0 1px ${brand}` }}
          py={6}
        />
        <Button
          type="submit"
          bg={brand}
          color="white"
          _hover={{ bg: "transparent", color: "black", borderColor: brand }}
          border="1px solid"
          borderColor={brand}
          px={6}
          py={6}
        >
          {cta}
        </Button>
      </Box>
    </VStack>
  );
}

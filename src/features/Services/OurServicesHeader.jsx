// src/components/our-services/OurServicesHeader.jsx
import React from "react";
import { Box, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export default function OurServicesHeader({ title, subtitle }) {
  const subtitleColor = useColorModeValue("gray.500", "gray.400");
  return (
    <Stack spacing={3} textAlign="center" mb={{ base: 8, md: 12 }}>
      <Box mx="auto" w="64px" h="6px" rounded="full" bg="primary" mb={2} />
      <Heading as="h2" color="black"  size="lg">
        {title}
      </Heading>
      <Text maxW="3xl" mx="auto" color={subtitleColor}>
        {subtitle}
      </Text>
    </Stack>
  );
}

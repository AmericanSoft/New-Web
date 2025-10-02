import React from "react";
import { Box, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export default function Header({ title, subtitle }) {
  const subtitleColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Stack spacing={3} textAlign="center" mb={{ base: 6, md: 10 }}>
      <Box mx="auto" w="64px" h="6px" rounded="full" bg="primary" />
      <Heading as="h2" color="black" size="lg">{title}</Heading>
      {subtitle && (
        <Text maxW="3xl" mx="auto" color={subtitleColor}>
          {subtitle}
        </Text>
      )}
    </Stack>
  );
}

import React from "react";
import { Box, Heading, Text, Stack, useColorModeValue } from "@chakra-ui/react";

export default function SectionHeader({ title, subtitle }) {
  const subtitleColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Stack spacing={3} textAlign="center" mb={{ base: 8, md: 12 }}>
      <Box mx="auto" w="70px" h="6px" bg="primary" rounded="full" mb={3} />
      <Heading as="h2" size="lg" color="black">
        {title}
      </Heading>
      <Text maxW="3xl" mx="auto" color={subtitleColor}>
        {subtitle}
      </Text>
    </Stack>
  );
}

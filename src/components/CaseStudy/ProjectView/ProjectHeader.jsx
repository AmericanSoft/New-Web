// src/components/ProjectView/ProjectHeader.jsx
import React from "react";
import {
  Box, Flex, VStack, HStack, Badge, Heading, Text, Image, useColorModeValue
} from "@chakra-ui/react";

export default function ProjectHeader({ project = {} }) {
  const {
    tag = "Web",
    title = "Project Title",
    description = "",
    company_logo,    // URL
    hero_image,      // URL (main hero)
    tech_icons = [], // Array of URLs
  } = project;

  const badgeBg = useColorModeValue("blue.50", "whiteAlpha.100");
  const badgeCol = useColorModeValue("blue.600", "blue.200");
  const subCol   = useColorModeValue("gray.700", "gray.300");
  const cardBg   = useColorModeValue("white", "gray.900");
  const border   = useColorModeValue("gray.200", "whiteAlpha.300");
  const holderBg = useColorModeValue("gray.100", "whiteAlpha.100");

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align={{ base: "stretch", md: "center" }}
      justify="space-between"
      gap={8}
      p={{ base: 6, md: 10 }}
      bg={cardBg}
      border="1px solid"
      borderColor={border}
      rounded="2xl"
      mb={8}
    >
      <VStack align="stretch" spacing={6} flex="1">
        <VStack align="stretch" spacing={4}>
          <Badge
            alignSelf="flex-start"
            rounded="full"
            px={4}
            py={1.5}
            bg={badgeBg}
            color={badgeCol}
            fontWeight="700"
            boxShadow="inset 0 0 0 1px rgba(36,124,255,.25)"
          >
            {tag}
          </Badge>

          <HStack spacing={3}>
            {company_logo && (
              <Box
                w="36px"
                h="36px"
                rounded="lg"
                overflow="hidden"
                border="1px solid"
                borderColor={border}
              >
                <Image src={company_logo} alt="Company" w="full" h="full" objectFit="cover" />
              </Box>
            )}
            <Heading as="h1" fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}>
              {title}
            </Heading>
          </HStack>
        </VStack>

        {description && (
          <Text fontSize={{ base: "md", md: "lg", lg: "xl" }} color={subCol} lineHeight="tall">
            {description}
          </Text>
        )}

        {!!tech_icons.length && (
          <VStack align="stretch" spacing={3}>
            <Text color={useColorModeValue("gray.600", "gray.400")} fontWeight="semibold">
              Technologies
            </Text>
            <HStack spacing={5}>
              {tech_icons.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`Tech ${i + 1}`}
                  boxSize={{ base: "10", md: "14" }}
                  objectFit="contain"
                />
              ))}
            </HStack>
          </VStack>
        )}
      </VStack>

      <Box
        w={{ base: "100%", md: "520px" }}
        h={{ base: "240px", md: "360px" }}
        rounded="xl"
        overflow="hidden"
        bg={holderBg}
        flexShrink={0}
      >
        {hero_image ? (
          <Image
            src={hero_image}
            alt="Project hero"
            w="full"
            h="full"
            objectFit="cover"
            transform={{ base: "none", md: "scale(1.06)" }}
          />
        ) : (
          <Flex w="full" h="full" align="center" justify="center" color="gray.400">
            No Preview
          </Flex>
        )}
      </Box>
    </Flex>
  );
}

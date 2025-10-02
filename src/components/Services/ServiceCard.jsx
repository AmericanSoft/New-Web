// src/components/our-services/ServiceCard.jsx
import React from "react";
import { Box, Image, Heading, Text, Button, useColorModeValue, Link } from "@chakra-ui/react";

const BRAND = "primary"; // غيّرها لـ "brand.500" لو عندك ثيم مخصص

export default function ServiceCard({ icon, title, desc, cta, ctaHref }) {
  const cardBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  const cardBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("black", "white");
  const descColor = useColorModeValue("gray.600", "gray.300");

  const media =
    typeof icon === "string" ? (
      <Image src={icon} alt={title} boxSize="100px" objectFit="contain" flexShrink={0} mb={4} />
    ) : (
      icon
    );

  const button = (
    <Button
      alignSelf="flex-start"
      variant="unstyled"
      display="flex"
      h="50px"
      px="27px"
      py="10px"
      border="0.5px solid"
      borderColor={BRAND}
      rounded="80px"
      color={BRAND}
      _hover={{ bg: "blue.50" }}
      _dark={{ _hover: { bg: "whiteAlpha.100" } }}
    >
      {cta}
    </Button>
  );

  return (
    <Box
      role="group"
      bg={cardBg}
      border="1px solid"
      borderColor={cardBorder}
      rounded="xl"
      p={6}
      transition="all .2s ease"
      _hover={{ transform: "translateY(-4px)", shadow: "md", borderColor: BRAND }}
      display="flex"
      flexDir="column"
    >
      {media}

      <Heading as="h3" fontSize="lg" color={headingColor} mb={2}>
        {title}
      </Heading>

      <Text lineHeight="1.7" noOfLines={3} flex="1" mb={4} color={descColor}>
        {desc}
      </Text>

      {ctaHref ? (
        <Link href={ctaHref} _hover={{ textDecoration: "none" }}>
          {button}
        </Link>
      ) : (
        button
      )}
    </Box>
  );
}

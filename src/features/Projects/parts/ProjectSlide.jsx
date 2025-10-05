import React from "react";
import {
  Box, Badge, Heading, Text, HStack, Button, Image, SimpleGrid,
  useColorModeValue, Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
export default function ProjectSlide({ project, t }) {
  const { title, description, main_image, id, live_url } = project || {};
  const cardBg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "whiteAlpha.300");

  return (
    <Box
      position="relative"
      bg={cardBg}
      border="1px solid"
      borderColor={border}
      rounded="24px"
      p={{ base: 6, md: 8 }}
      overflow="hidden"
      transition="all .25s ease"
      boxShadow="0 10px 24px rgba(0,0,0,.06)"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 18px 40px rgba(36,124,255,.18)",
        borderColor: "rgba(36,124,255,.35)",
      }}
      _before={{
        content: `""`,
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "8px",
        bgGradient: "linear(to-r, primary, #6AA4FF)",
        borderTopLeftRadius: "24px",
        borderTopRightRadius: "24px",
      }}
      _after={{
        content: `""`,
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,.35)",
        borderRadius: "24px",
      }}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 8 }} alignItems="center">
        <Box>
          <Badge
            rounded="full"
            px={3}
            py={1.5}
            bg="blue.50"
            color="blue.600"
            fontWeight="700"
            boxShadow="inset 0 0 0 1px rgba(36,124,255,.25)"
          >
            {project?.tag || "Web"}
          </Badge>

          <Heading as="h3" mt={4} fontSize={{ base: "xl", md: "2xl" }}>
            {title}
          </Heading>

          {description && (
            <Text mt={3} color="gray.600" _dark={{ color: "gray.300" }} lineHeight="1.8" noOfLines={{ base: 4, md: 3 }}>
              {description}
            </Text>
          )}

          <HStack spacing={4} pt={4} wrap="wrap">
<Button
  as={RouterLink}
  to={`/projects/${id}`}          // أو "/casestudy" لو عايز صفحة ثابتة
  state={{ project }}             // ← نمرّر كائن المشروع كله (يشمل other_images)
  variant="unstyled"
  h="50px"
  px="27px"
  py="10px"
  border="0.5px solid"
  borderColor="primary"
  rounded="80px"
  color="primary"
  _hover={{ bg: "blue.50" }}
  _dark={{ _hover: { bg: "whiteAlpha.100" } }}
>
  {t.ctaCase}
</Button>

            {live_url && (
              <Button
                as={Link}
                href={live_url}
                isExternal
                rightIcon={<ExternalLinkIcon />}
                variant="link"
                color="gray.800"
                _dark={{ color: "gray.100" }}
                fontWeight="600"
              >
                {t.ctaLive}
              </Button>
            )}
          </HStack>
        </Box>

        <Box>
          <Image
            src={main_image }
            alt={title}
            w="100%"
            maxH={{ base: "240px", md: "340px" }}
            objectFit="contain"
            draggable={false}
            loading="lazy"
            borderRadius="lg"
            filter="drop-shadow(0 10px 20px rgba(0,0,0,.18))"
            transform={{ base: "translateY(0)", md: "translateY(6px)" }}
            transition="transform .25s ease"
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
}

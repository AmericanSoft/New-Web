// src/pages/ProjectView/ScreenshotsGrid.jsx
import React, { useRef } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  useColorModeValue,
  IconButton,
  HStack,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export default function ScreenshotsGrid({ images = [], onOpenAt }) {
  const cardBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  const trackRef = useRef(null);

  // === استخدم فقط آخر 5 صور من other_images ===
  // images[0] = main_image (لو موجود)
  const othersAll = images.length > 1 ? images.slice(1) : [];
  const othersLast5 = othersAll.slice(-5);

  const hasAny = othersLast5.length > 0;

  const scrollByCard = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.88;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <Box px={{ base: 6, md: 12 }} mb={{ base: 16, md: 24 }}>
      <Heading as="h2" size="xl" textAlign="center" mb={10}>
        some screens
      </Heading>

      {/* ======== Mobile Slider (base, sm) ======== */}
      <Box display={{ base: "block", md: "none" }}>
        {!hasAny ? (
          <Box
            border="1px dashed"
            borderColor={cardBorder}
            rounded="lg"
            p={6}
            textAlign="center"
            color={useColorModeValue("gray.600", "gray.300")}
          >
            <Text>لا توجد صور للعرض</Text>
          </Box>
        ) : (
          <Box position="relative">
            {othersLast5.length > 1 && (
              <HStack
                justify="space-between"
                position="absolute"
                top="50%"
                transform="translateY(-50%)"
                w="full"
                px={2}
                zIndex={2}
              >
                <IconButton
                  aria-label="prev"
                  icon={<ArrowBackIcon />}
                  onClick={() => scrollByCard(-1)}
                  variant="solid"
                  size="sm"
                />
                <IconButton
                  aria-label="next"
                  icon={<ArrowForwardIcon />}
                  onClick={() => scrollByCard(1)}
                  variant="solid"
                  size="sm"
                />
              </HStack>
            )}

            <Box
              ref={trackRef}
              display="flex"
              gap={3}
              overflowX="auto"
              pb={2}
              scrollSnapType="x mandatory"
              sx={{
                "::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
              }}
            >
              {othersLast5.map((src, i) => {
                // لأننا بنعرض others فقط، الـ index الفعلي = 1 + i (نتخطى main)
                const actualIndex = (images.length > 1 ? 1 : 0) + (othersAll.length - othersLast5.length) + i;
                return (
                  <Box
                    key={`m-${actualIndex}`}
                    minW="85%"
                    maxW="85%"
                    h="260px"
                    rounded="lg"
                    overflow="hidden"
                    bg={useColorModeValue("gray.100", "gray.800")}
                    border="1px solid"
                    borderColor={cardBorder}
                    cursor="zoom-in"
                    scrollSnapAlign="center"
                    onClick={() => onOpenAt?.(actualIndex)}
                  >
                    <Image
                      src={src}
                      alt={`Screen ${actualIndex + 1}`}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      draggable={false}
                      loading="lazy"
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>

      {/* ======== Desktop Grid (md↑) ======== */}
      <Box display={{ base: "none", md: "block" }}>
        {!hasAny ? (
          <Box
            border="1px dashed"
            borderColor={cardBorder}
            rounded="lg"
            p={8}
            textAlign="center"
            color={useColorModeValue("gray.600", "gray.300")}
          >
            <Text>لا توجد صور للعرض</Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ md: 3 }} spacing={5}>
            {othersLast5.map((src, i) => {
              const actualIndex = (images.length > 1 ? 1 : 0) + (othersAll.length - othersLast5.length) + i;
              return (
                <Box
                  key={`d-${actualIndex}`}
                  h="320px"
                  rounded="lg"
                  overflow="hidden"
                  bg={useColorModeValue("gray.100", "gray.800")}
                  border="1px solid"
                  borderColor={cardBorder}
                  cursor="zoom-in"
                  onClick={() => onOpenAt?.(actualIndex)}
                >
                  <Image
                    src={src}
                    alt={`Screen ${actualIndex + 1}`}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    draggable={false}
                    loading="lazy"
                  />
                </Box>
              );
            })}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}

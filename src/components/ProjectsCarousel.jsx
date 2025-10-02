import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Box,
  Container,
  Heading,
  Text,
  HStack,
  VStack,
  Stack,
  Badge,
  Button,
  IconButton,
  Image,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon } from "@chakra-ui/icons";

/* Slide card */
function ProjectSlide({ tag = "Web", title, desc, caseHref, liveHref, mockSrc }) {
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
      /* شريط علوي متدرّج ومستوِي مع الانحناء */
      _before={{
        content: `""`,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "8px",
        bgGradient: "linear(to-r, primary, #6AA4FF)",
        borderTopLeftRadius: "24px",
        borderTopRightRadius: "24px",
      }}
      /* توهّج خفيف داخلي */
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
        {/* Left: content */}
        <VStack align="start" spacing={4}>
          <Badge
            rounded="full"
            px={3}
            py={1.5}
            bg="blue.50"
            color="blue.600"
            fontWeight="700"
            boxShadow="inset 0 0 0 1px rgba(36,124,255,.25)"
          >
            {tag}
          </Badge>

          <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} color="black" _dark={{ color: "white" }}>
            {title}
          </Heading>

          <Text color="gray.600" _dark={{ color: "gray.300" }} lineHeight="1.8" noOfLines={{ base: 4, md: 3 }}>
            {desc}
          </Text>

          <HStack spacing={4} pt={2} wrap="wrap">
            <Button
              alignSelf="flex-start"
              variant="unstyled"
              display="flex"
              h="50px"
              px="27px"
              py="10px"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              gap="10px"
              border="0.5px solid"
              borderColor="primary"
              rounded="80px"
              color="primary"
              _hover={{ bg: "blue.50" }}
              _dark={{ _hover: { bg: "whiteAlpha.100" } }}
            >
              Show case study
            </Button>

            <Button
              rightIcon={<ExternalLinkIcon />}
              variant="link"
              color="gray.800"
              _dark={{ color: "gray.100" }}
              as="a"
              href={liveHref}
              target="_blank"
              rel="noopener noreferrer"
              fontWeight="600"
            >
              Live project
            </Button>
          </HStack>
        </VStack>

        {/* Right: mock image */}
        <Box position="relative">
          <Image
            src={mockSrc}
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
            _groupHover={{ transform: { md: "translateY(0)" } }}
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
}


/* Carousel wrapper */
export default function ProjectsCarousel({ items = [], title = "Our Projects", subtitle }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <Box py={{ base: 12, md: 16 }}>
      <Container maxW="6xl">
        {/* Header */}
        <Stack spacing={3} textAlign="center" mb={{ base: 6, md: 10 }}>
          <Box mx="auto" w="64px" h="6px" rounded="full" bg="primary" />
          <Heading as="h2" size="lg" color="black" _dark={{ color: "white" }}>
            {title}
          </Heading>
          {subtitle && (
            <Text maxW="3xl" mx="auto" color={useColorModeValue("gray.500", "gray.400")}>
              {subtitle}
            </Text>
          )}
        </Stack>

        {/* Nav buttons */}
        <HStack justify="flex-end" mb={3} spacing={3}>
          <IconButton
            aria-label="Previous project"
            icon={<ChevronLeftIcon boxSize={6} />}
            onClick={scrollPrev}
            rounded="full"
            color="gray"
            bg="white"
            _dark={{ bg: "gray.700" }}
            shadow="md"
            _hover={{ transform: "translateY(-1px)" }}
          />
          <IconButton
            aria-label="Next project"
            icon={<ChevronRightIcon boxSize={6} />}
            onClick={scrollNext}
            rounded="full"
            color="gray"
            bg="white"
            _dark={{ bg: "gray.700" }}
            shadow="md"
            _hover={{ transform: "translateY(-1px)" }}
          />
        </HStack>

        {/* Embla viewport/track */}
        <Box ref={emblaRef} overflow="hidden">
          <HStack spacing={6} align="stretch">
            {/* Embla requires flex children with minWidth to act as slides */}
            {items.map((it, idx) => (
              <Box key={idx} flex="0 0 100%" minW="0">
                <ProjectSlide {...it} />
              </Box>
            ))}
          </HStack>
        </Box>
      </Container>
    </Box>
  );
}

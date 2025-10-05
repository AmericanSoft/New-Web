import React, { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Box, Container, Heading, Text, Skeleton, useColorModeValue } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { STRINGS } from "./strings";
import { useProjects } from "../../hooks/useProjects";
import Header from "./parts/Header";
import Controls from "./parts/Controls";
import Slides from "./parts/Slides";
import Dots from "./parts/Dots";

export default function ProjectsCarousel({ title, subtitle, lang: forcedLang ,sectionId = "projects"}) {
  const { pathname } = useLocation();
  const lang = forcedLang ?? (pathname.startsWith("/en") ? "en" : "ar");
  const t = STRINGS[lang];

  const { projects, loading, fetchError } = useProjects();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  // Embla selection + snaps
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onReInit = () => {
      setSnapCount(emblaApi.scrollSnapList().length);
      onSelect();
    };
    onReInit();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onReInit);
    return () => {
      emblaApi?.off("select", onSelect);
      emblaApi?.off("reInit", onReInit);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const goTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  const subtitleColor = useColorModeValue("gray.500", "gray.400");

  const body = useMemo(() => {
    if (loading) {
      return (
        <Box>
          <Skeleton height="240px" rounded="xl" mb={4} />
          <Skeleton height="240px" rounded="xl" />
        </Box>
      );
    }
    if (fetchError) {
      return (
        <Text textAlign="center" color="red.400" fontWeight="600" py={6}>
          {fetchError}
        </Text>
      );
    }
    if (!projects.length) {
      return (
        <Text textAlign="center" color={subtitleColor} py={6}>
          {t.empty}
        </Text>
      );
    }
    return (
      <>
        <Controls onPrev={scrollPrev} onNext={scrollNext} t={t} />
        <Slides emblaRef={emblaRef} projects={projects} t={t} />
        <Dots count={snapCount} active={selectedIndex} onDotClick={goTo} />
      </>
    );
  }, [loading, fetchError, projects, subtitleColor, t, scrollPrev, scrollNext, emblaRef, snapCount, selectedIndex, goTo]);

  return (
    <Box id={sectionId} py={{ base: 12, md: 16 }} dir={t.dir}>
      <Container maxW="6xl">
        <Header title={title ?? t.sectionTitle} subtitle={subtitle ?? t.sectionSubtitle} />
        {body}
      </Container>
    </Box>
  );
}

// src/pages/SingleProject.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Box, Container, Divider, useColorModeValue } from "@chakra-ui/react";

import CTAButtons from "./ProjectView/CTAButtons";
import ScreenshotsGrid from "./ProjectView/ScreenshotsGrid";
import ImageModal from "./ProjectView/ImageModal";
import ProjectHeader from "./ProjectView/ProjectHeader";


import { resolveImageUrl, FALLBACKS, BASE } from "../../helpers/images";
import ContactUs from "../../features/Contact/ContactUs";
import ProjectsCarousel from "../../features/Projects/ProjectsCarousel";

// جلب المشروع عند الحاجة
async function fetchProjectById(id) {
  const res = await fetch(`${BASE}/projects/${id}`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load project");
  return res.json();
}

export default function SingleProject() {
  const { id } = useParams();
  const location = useLocation();
  const stateProject = location.state?.project;

  const [fallbackProject, setFallbackProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!stateProject && id) {
      setLoading(true);
      fetchProjectById(id)
        .then((data) => setFallbackProject(data?.data || data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [stateProject, id]);

  const project = stateProject || fallbackProject;
  const pageBg = useColorModeValue("white", "gray.950");

  // صور الجاليري (main + others) بروابط مطلقة
  const images = useMemo(() => {
    if (!project) return [];
    const list = [];
    if (project?.main_image) list.push(resolveImageUrl(project.main_image));
    const rawOthers = Array.isArray(project?.other_images)
      ? project.other_images
      : typeof project?.other_images === "string"
      ? project.other_images.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    rawOthers.forEach((s) => list.push(resolveImageUrl(s)));
    return list.filter(Boolean);
  }, [project]);

  // مودال
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const openAt = (idx) => { setCurrent(idx); setIsOpen(true); };
  const onClose = () => setIsOpen(false);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  if (loading || (!project && id)) return <Box p={8}>جارِ تحميل المشروع…</Box>;
  if (!project) return <Box p={8}>لا توجد بيانات مشروع للعرض.</Box>;

  const { title, description, live_url, tag, main_image } = project;

  // ✅ نجهز object بالشكل الذي يتوقعه ProjectHeader
  const headerProject = {
    tag: tag || "Web",
    title: title || "Project Title",
    description: description || "",
    company_logo: undefined, // لو عندك لوجو ابعته هنا
    hero_image: resolveImageUrl(main_image) || FALLBACKS.HERO, // أهم سطر لظهور الصورة
    tech_icons: [FALLBACKS.TECH_REACT, FALLBACKS.TECH_PHP, FALLBACKS.TECH_FIGMA], // اختياري
  };

  return (
    <Box bg={pageBg} minH="100vh">
      <Container maxW="6xl" px={0}>
        <ProjectHeader project={headerProject} />

        <CTAButtons liveUrl={live_url} />

        <ScreenshotsGrid images={images} onOpenAt={openAt} />

        <Box id="contact" px={{ base: 6, md: 12 }} mt={4} mb={16}>
          <Divider />
          {/* <ContactUs /> */}
        </Box>
      </Container>

      <ImageModal
        isOpen={isOpen}
        onClose={onClose}
        images={images}
        current={current}
        onPrev={prev}
        onNext={next}
      />
      <ProjectsCarousel />
      <ContactUs />
    </Box>
  );
}

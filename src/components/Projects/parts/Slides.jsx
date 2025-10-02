import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import ProjectSlide from "./ProjectSlide";

export default function Slides({ emblaRef, projects, t }) {
  return (
 <Box ref={emblaRef} overflow="hidden" dir="ltr">
      <HStack spacing={6} align="stretch">
        {projects.map((p) => (
          <Box key={p.id} flex="0 0 100%" minW="0">
            <ProjectSlide project={p} t={t} />
          </Box>
        ))}
      </HStack>
    </Box>
  );
}

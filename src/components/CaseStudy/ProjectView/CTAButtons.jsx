// src/components/ProjectView/CTAButtons.jsx
import React from "react";
import { HStack, Button, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
const WA_NUMBER = "201080877774";
const WA_MSG = encodeURIComponent("مرحبًا، أودّ التواصل بخصوص مشروع.");
export default function CTAButtons({ liveUrl }) {
  return (
    
    <HStack px={{ base: 6, md: 12 }} spacing={4} mb={{ base: 10, md: 12 }} wrap="wrap" align="center">
      {liveUrl && (
        <Button
          as={Link}
          href={liveUrl}
          isExternal
          colorScheme="blue"
          size="lg"
          rightIcon={<ExternalLinkIcon />}
          rounded="full"
          px={7}
          py={6}
        >
          Live project
        </Button>
      )}

<Button
  as={Link}
  href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
  isExternal
  variant="outline"
  colorScheme="blue"
  size="lg"
  rounded="full"
  px={7}
  py={6}
>
  Contact us
</Button>
    </HStack>
  );
}

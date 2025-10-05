import React from "react";
import { HStack, Box } from "@chakra-ui/react";

export default function Dots({ count, active, onDotClick }) {
  return (
    <HStack mt={8} justify="center" spacing={2}>
      {Array.from({ length: count }).map((_, i) => (
        <Box
          as="button"
          key={i}
          onClick={() => onDotClick?.(i)}
          aria-label={`Go to slide ${i + 1}`}
          h="10px"
          rounded="full"
          transition="all .3s"
          w={i === active ? "24px" : "10px"}
          bg={i === active ? "white" : "whiteAlpha.700"}
          _dark={{ bg: i === active ? "white" : "whiteAlpha.500" }}
          boxShadow={i === active ? "md" : "none"}
        />
      ))}
    </HStack>
  );
}

import React from "react";
import { HStack, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export default function Controls({ onPrev, onNext, t }) {
  return (
    <HStack justify="flex-end" mb={3} spacing={3}>
      <IconButton
        aria-label={t.prev}
        icon={<ChevronLeftIcon boxSize={6} />}
        onClick={onPrev}
        rounded="full"
        color="gray"
        bg="white"
        _dark={{ bg: "gray.700" }}
        shadow="md"
        _hover={{ transform: "translateY(-1px)" }}
      />
      <IconButton
        aria-label={t.next}
        icon={<ChevronRightIcon boxSize={6} />}
        onClick={onNext}
        rounded="full"
        color="gray"
        bg="white"
        _dark={{ bg: "gray.700" }}
        shadow="md"
        _hover={{ transform: "translateY(-1px)" }}
      />
    </HStack>
  );
}

import React from "react";
import {
  Box,
  HStack,
  VStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

/** بطاقة ميزة مع ديكور جانبي ورقم كبير */
export default function ReasonCard({ icon, title, desc, index }) {
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const border = useColorModeValue("gray.200", "whiteAlpha.300");
  const ringColor = useColorModeValue("#E5E7EB", "whiteAlpha.300");
  const dotColor = useColorModeValue("#E5E7EB", "whiteAlpha.300");
  const bodyColor = useColorModeValue("gray.600", "gray.300");
  const titleColor = useColorModeValue("black", "white");

  return (
    <HStack
      spacing={5}
      align="stretch"
      bg={cardBg}
      border="1px solid"
      borderColor={border}
      rounded="md"
      px={{ base: 4, md: 6 }}
      py={{ base: 4, md: 6 }}
      position="relative"
      overflow="hidden"
    >
      {/* ديكور الدائرة الجانبية */}
      <Box
        minW="72px"
        w="72px"
        h="72px"
        position="relative"
        flexShrink={0}
        _before={{
          content: '""',
          position: "absolute",
          inset: "-10px",
          rounded: "full",
          border: `2px dashed ${dotColor}`,
        }}
      >
        <Box
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          w="86px"
          h="86px"
          rounded="full"
          border="10px solid"
          borderColor={ringColor}
          borderLeftColor="transparent"
          borderTopColor={ringColor}
          borderBottomColor={ringColor}
        />
        <Box
          position="relative"
          zIndex={1}
          w="72px"
          h="72px"
          rounded="full"
          bg="white"
          _dark={{ bg: "gray.800" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="sm"
          fontSize="26px"
          role="img"
          aria-label={title}
        >
          {icon}
        </Box>
      </Box>

      {/* النص */}
      <VStack align="start" spacing={1} flex="1">
        <Text fontWeight="700" fontSize="md" color={titleColor}>
          {title}
        </Text>
        <Text color={bodyColor} lineHeight="1.7">
          {desc}
        </Text>
      </VStack>

      {/* الرقم الكبير */}
      <Text
        fontWeight="800"
        fontSize={{ base: "3xl", md: "5xl" }}
        color={titleColor}
        ml={{ base: 2, md: 4 }}
        alignSelf="center"
      >
        {String(index).padStart(2, "0")}
      </Text>
    </HStack>
  );
}

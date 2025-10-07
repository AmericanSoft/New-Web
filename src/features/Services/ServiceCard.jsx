// src/components/our-services/ServiceCard.jsx
import React, { useState } from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  Center,
} from "@chakra-ui/react";
import PopUpForm from "../../components/PopupForm/popUpForm"; // عدّل المسار لو مختلف

const BRAND = "primary"; // غيّرها لـ "blue.500" أو أي توكن عندك لو مفيش primary

export default function ServiceCard({ icon, title, desc, cta, ctaHref }) {
  const cardBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  const cardBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("black", "white");
  const descColor = useColorModeValue("gray.600", "gray.300");

  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    // لو فيه href، امنع الانتقال وافتح المودال
    if (e) e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const media =
    typeof icon === "string" ? (
      <Image src={icon} alt={title} boxSize="100px" objectFit="contain" flexShrink={0} mb={4} />
    ) : (
      icon
    );

  const buttonEl = (
    <Button
      alignSelf="flex-start"
      variant="unstyled"
      display="flex"
      h="50px"
      px="27px"
      py="10px"
      border="0.5px solid"
      borderColor={BRAND}
      rounded="80px"
      color={BRAND}
      _hover={{ bg: "blue.50" }}
      _dark={{ _hover: { bg: "whiteAlpha.100" } }}
      onClick={handleOpen}
    >
      {cta}
    </Button>
  );

  return (
    <>
      <Box
        role="group"
        bg={cardBg}
        border="1px solid"
        borderColor={cardBorder}
        rounded="xl"
        p={6}
        transition="all .2s ease"
        _hover={{ transform: "translateY(-4px)", shadow: "md", borderColor: BRAND }}
        display="flex"
        flexDir="column"
      >
        {media}

        <Heading as="h3" fontSize="lg" color={headingColor} mb={2}>
          {title}
        </Heading>

        <Text lineHeight="1.7" noOfLines={3} flex="1" mb={4} color={descColor}>
          {desc}
        </Text>

        {ctaHref ? (
          <Link
            href={ctaHref}
            _hover={{ textDecoration: "none" }}
            onClick={handleOpen}
            role="button"
          >
            {buttonEl}
          </Link>
        ) : (
          buttonEl
        )}
      </Box>

      {/* المودال خارج الشرط، بيتحكّم فيه open */}
      <Modal isOpen={open} onClose={handleClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent bg="transparent" shadow="none">
          <Center p={4}>
            <PopUpForm onClose={handleClose} />
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
}

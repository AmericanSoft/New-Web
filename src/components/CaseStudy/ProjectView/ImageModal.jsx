// src/components/ProjectView/ImageModal.jsx
import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody, Image, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";

export default function ImageModal({ isOpen, onClose, images = [], current = 0, onPrev, onNext }) {
  const hasMany = images?.length > 1;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow="none">
        <ModalBody position="relative" p={0}>
          <Image
            src={images[current]}
            alt={`Preview ${current + 1}`}
            w="100%"
            maxH="80vh"
            objectFit="contain"
            borderRadius="lg"
            bg="black"
          />
          <IconButton aria-label="close" icon={<CloseIcon />} position="absolute" top={3} right={3} onClick={onClose} />
          {hasMany && (
            <>
              <IconButton
                aria-label="prev"
                icon={<ArrowBackIcon />}
                position="absolute"
                top="50%"
                left={3}
                transform="translateY(-50%)"
                onClick={onPrev}
              />
              <IconButton
                aria-label="next"
                icon={<ArrowForwardIcon />}
                position="absolute"
                top="50%"
                right={3}
                transform="translateY(-50%)"
                onClick={onNext}
              />
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

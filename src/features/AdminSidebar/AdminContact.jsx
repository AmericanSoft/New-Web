// src/pages/admin/OurContactus.jsx
import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Heading,
  Button,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tag,
  HStack,
  Skeleton,
  SkeletonText,
  Flex,
  Icon,
  useColorModeValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { RepeatIcon, DeleteIcon } from "@chakra-ui/icons";

// ====== .env ======
const API_BASE = (import.meta.env?.VITE_API_BASE_URL || "").replace(/\/+$/, "");

export default function OurContactus() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/contact-us`, {
        headers: { Accept: "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        setContacts(Array.isArray(data) ? data : data?.data ?? []);
      } else {
        throw new Error(data?.message || "Error fetching contacts");
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
      toast({
        status: "error",
        title: "تعذر تحميل طلبات التواصل",
        description: err?.message || "حاول مرة أخرى",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const removeFromList = (id) =>
    setContacts((prev) => prev.filter((c) => c.id !== id));

  const headerBg = useColorModeValue("gray.900", "gray.800");
  const headerColor = "white";
  const cardBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  const cardBg = useColorModeValue("white", "gray.900");

  return (
    <Box p={{ base: 4, md: 6, lg: 8 }}>
      {/* Header */}
      <Flex mb={6} align="center" justify="space-between" gap={3}>
        <Heading size="lg" color="pink.600">
          Client Contact Requests
        </Heading>
        <Button
          leftIcon={<Icon as={RepeatIcon} />}
          onClick={fetchContacts}
          variant="outline"
        >
          Refresh
        </Button>
      </Flex>

      {/* List / Loading / Empty */}
      {loading ? (
        <TableSkeleton />
      ) : contacts.length === 0 ? (
        <EmptyState onRefresh={fetchContacts} />
      ) : (
        <TableContainer
          border="1px solid"
          borderColor={cardBorder}
          bg={cardBg}
          rounded="xl"
          shadow="sm"
          overflowX="auto"
        >
          <Table size="sm" minW="1000px" tableLayout="fixed">
            <Thead bg={headerBg} color={headerColor}>
              <Tr>
                <Th w="56px" color={headerColor}>
                  #
                </Th>
                <Th w="180px" color={headerColor}>
                  Name
                </Th>
                <Th w="240px" color={headerColor}>
                  Email
                </Th>
                <Th w="160px" color={headerColor}>
                  Mobile
                </Th>
                <Th w="200px" color={headerColor}>
                  Company
                </Th>
                <Th w="260px" color={headerColor}>
                  Address
                </Th>
                <Th w="180px" color={headerColor}>
                  Category
                </Th>
                <Th w="120px" textAlign="center" color={headerColor}>
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {contacts.map((c, idx) => (
                <Tr key={c.id} _hover={{ bg: useColorModeValue("gray.50", "gray.800") }}>
                  <Td textAlign="center">{idx + 1}</Td>
                  <Td isTruncated title={c.name}>{c.name ?? "-"}</Td>
                  <Td isTruncated title={c.email}>{c.email ?? "-"}</Td>
                  <Td isTruncated title={c.mobile_number}>{c.mobile_number ?? "-"}</Td>
                  <Td isTruncated title={c.company_name}>{c.company_name ?? "-"}</Td>
                  <Td isTruncated title={c.address}>{c.address ?? "-"}</Td>
                  <Td>
                    <Tag colorScheme="purple" variant="subtle" maxW="full" overflow="hidden">
                      <Text noOfLines={1}>{c.category_name ?? "—"}</Text>
                    </Tag>
                  </Td>
                  <Td textAlign="center">
                    <ContactDeleteButton
                      id={c.id}
                      onDeleteSuccess={() => removeFromList(c.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

/* ---------- Delete Button with Confirm Dialog ---------- */
function ContactDeleteButton({ id, onDeleteSuccess }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      const res = await fetch(`${API_BASE}/contact-us/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        let msg = "فشل حذف الطلب";
        try {
          const data = await res.json();
          msg = data?.message || msg;
        } catch (_) {}
        throw new Error(msg);
      }

      toast({ status: "success", title: "تم حذف طلب التواصل" });
      onDeleteSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      toast({
        status: "error",
        title: "لم يتم الحذف",
        description: err?.message || "حاول مرة أخرى",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        size="sm"
        leftIcon={<DeleteIcon />}
        colorScheme="red"
        variant="outline"
        onClick={onOpen}
        isDisabled={loading}
      >
        Delete
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={loading ? () => {} : onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              تأكيد الحذف
            </AlertDialogHeader>
            <AlertDialogBody>
              هل تريد حذف طلب التواصل هذا؟ لا يمكن التراجع عن العملية.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} isDisabled={loading}>
                إلغاء
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3} isLoading={loading} loadingText="جار الحذف">
                حذف
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

/* ---------- Skeleton while loading ---------- */
function TableSkeleton() {
  const cardBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  const cardBg = useColorModeValue("white", "gray.900");

  return (
    <Box
      border="1px solid"
      borderColor={cardBorder}
      bg={cardBg}
      rounded="xl"
      shadow="sm"
      overflow="hidden"
    >
      <Box px={4} py={3} bg={useColorModeValue("gray.100", "gray.800/60")}>
        <Skeleton h="18px" w="20%" />
      </Box>
      <Box p={4}>
        <HStack spacing={3} mb={3}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} h="18px" flex="1" />
          ))}
        </HStack>
        {Array.from({ length: 6 }).map((_, i) => (
          <HStack key={i} spacing={3} mb={3}>
            {Array.from({ length: 8 }).map((__, j) => (
              <Skeleton key={j} h="14px" flex="1" />
            ))}
          </HStack>
        ))}
      </Box>
    </Box>
  );
}

/* ---------- Empty state ---------- */
function EmptyState({ onRefresh }) {
  const cardBorder = useColorModeValue("gray.300", "whiteAlpha.300");
  const cardBg = useColorModeValue("white", "gray.900");
  const descColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      textAlign="center"
      rounded="xl"
      border="1px dashed"
      borderColor={cardBorder}
      bg={cardBg}
      p={10}
      shadow="sm"
    >
      <Heading size="md" mb={2}>
        No contact data available
      </Heading>
      <Text color={descColor} maxW="md" mx="auto" mb={6}>
        You can refresh to fetch the latest client requests.
      </Text>
      <Button colorScheme="purple" onClick={onRefresh}>
        Refresh
      </Button>
    </Box>
  );
}

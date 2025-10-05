// src/pages/admin/OurProjects.jsx
import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  SimpleGrid,
  useColorModeValue,
  Image,
  Text,
  Stack,
  Tag,
  HStack,
  Skeleton,
  SkeletonText,
  Divider,
  useToast,
  Icon,
  AspectRatio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import CreateProject from "../../features/Admin/CreateProject";
import UpdateProject from "../../features/Admin/UpdateProject"; // <<=== المهم

// .env
const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
const STORAGE_BASE = (import.meta.env.VITE_STORAGE_BASE_URL || "").replace(/\/+$/, "");

/** حل مسار الصورة */
function resolveImage(src) {
  if (!src) return "/assets/default.png";
  if (/^https?:\/\//i.test(src)) return src;
  return `${STORAGE_BASE}/${String(src).replace(/^\/+/, "")}`;
}

/** دالة حذف مشروع — تستخدم env + توكن مخزن */
async function deleteProject(id) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("غير مسجل دخول");

  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    let message = "فشل في حذف المشروع";
    try {
      const data = await res.json();
      message = data?.message || message;
    } catch (_) {}
    throw new Error(message);
  }
  return true;
}

export default function OurProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);

  const toast = useToast();

  // مودال الإضافة
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

  // مودال التعديل
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();

  const cardBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  const cardBg = useColorModeValue("white", "gray.900");
  const descColor = useColorModeValue("gray.600", "gray.300");

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/projects`, { headers: { Accept: "application/json" } });
      const data = await res.json();
      setProjects(data?.data || data || []);
    } catch (e) {
      console.error(e);
      toast({
        status: "error",
        title: "خطأ أثناء تحميل المشاريع",
        description: e?.message || "حاول مرة أخرى",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // فتح مودال التعديل بمجرد اختيار مشروع
  useEffect(() => {
    if (editingProject) onUpdateOpen();
  }, [editingProject, onUpdateOpen]);

  // لما يتعمل إنشاء ناجح
  const handleProjectCreated = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    toast({ status: "success", title: "تم إضافة المشروع" });
    onCreateClose(); // اقفل مودال الإضافة
  };

  const handleProjectUpdated = (updatedProject) => {
    setProjects((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
    setEditingProject(null);
    onUpdateClose(); // اقفل مودال التعديل
    toast({ status: "success", title: "تم تحديث المشروع" });
  };

  const handleCancelUpdate = () => {
    setEditingProject(null);
    onUpdateClose();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد أنك تريد حذف هذا المشروع؟")) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast({ status: "success", title: "تم حذف المشروع" });
    } catch (e) {
      console.error(e);
      toast({
        status: "error",
        title: "فشل حذف المشروع",
        description: e?.message || "حاول مرة أخرى",
      });
    }
  };

  return (
    <Box p={{ base: 4, md: 6, lg: 8 }}>
      {/* Header */}
      <Flex mb={6} direction={{ base: "column", sm: "row" }} gap={3} align="center" justify="space-between">
        <Heading size="lg" color="pink.600">إدارة المشاريع</Heading>
        <HStack>
          <Button variant="outline" onClick={fetchProjects}>تحديث</Button>
          <Button leftIcon={<AddIcon />} colorScheme="green" onClick={onCreateOpen}>إضافة مشروع</Button>
        </HStack>
      </Flex>

      {/* Modal: Create Project */}
      <Modal isOpen={isCreateOpen} onClose={onCreateClose} isCentered size="3xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>إضافة مشروع جديد</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CreateProject onProjectCreated={handleProjectCreated} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal: Update Project */}
      <Modal isOpen={isUpdateOpen} onClose={handleCancelUpdate} isCentered size="3xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>تعديل مشروع</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {editingProject && (
              <UpdateProject
                project={editingProject}
                onProjectUpdated={handleProjectUpdated}
                onCancel={handleCancelUpdate}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* List / Loading / Empty */}
      {loading ? (
        <GridSkeleton />
      ) : projects.length === 0 ? (
        <EmptyState onAdd={onCreateOpen} />
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
          {projects.map((project) => {
            const imageUrl = resolveImage(project?.main_image);
            return (
              <Box
                key={project.id}
                role="group"
                overflow="hidden"
                rounded="xl"
                border="1px solid"
                borderColor={cardBorder}
                bg={cardBg}
                shadow="sm"
                transition="all .2s ease"
                _hover={{ shadow: "md" }}
                display="flex"
                flexDir="column"
              >
                <AspectRatio ratio={16 / 9} w="100%">
                  <Image
                    src={imageUrl}
                    alt={project.title || "Project"}
                    objectFit="cover"
                    transition="transform .5s"
                    _groupHover={{ transform: "scale(1.05)" }}
                    loading="lazy"
                  />
                </AspectRatio>

                <Stack flex="1" p={4} spacing={3}>
                  <Text noOfLines={1} fontSize="lg" fontWeight="semibold">
                    {project.title}
                  </Text>

                  <Text noOfLines={3} fontSize="sm" color={descColor}>
                    {project.description}
                  </Text>

                  {project?.category_name ? (
                    <Tag alignSelf="flex-start" colorScheme="purple" variant="subtle">
                      {project.category_name}
                    </Tag>
                  ) : null}

                  <HStack pt={1} spacing={3} mt="auto">
                    <Button
                      size="sm"
                      leftIcon={<EditIcon />}
                      variant="outline"
                      colorScheme="purple"
                      onClick={() => setEditingProject(project)}
                    >
                      تعديل المشروع
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<DeleteIcon />}
                      colorScheme="red"
                      variant="outline"
                      onClick={() => handleDelete(project.id)}
                    >
                      حذف المشروع
                    </Button>
                  </HStack>
                </Stack>
              </Box>
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
}

/* ---------- Skeleton while loading ---------- */
function GridSkeleton() {
  const cardBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  const cardBg = useColorModeValue("white", "gray.900");

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Box
          key={i}
          overflow="hidden"
          rounded="xl"
          border="1px solid"
          borderColor={cardBorder}
          bg={cardBg}
          shadow="sm"
        >
          <AspectRatio ratio={16 / 9} w="100%">
            <Skeleton />
          </AspectRatio>
          <Box p={4}>
            <Skeleton h="18px" w="66%" mb={3} />
            <SkeletonText noOfLines={3} spacing="2" />
            <HStack mt={4} spacing={3}>
              <Skeleton h="36px" w="96px" />
              <Skeleton h="36px" w="88px" />
            </HStack>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}

/* ---------- Empty state ---------- */
function EmptyState({ onAdd }) {
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
      <Heading size="md" mb={2}>لا توجد مشاريع بعد</Heading>
      <Text color={descColor} maxW="md" mx="auto" mb={6}>
        ابدأ بإضافة أول مشروع لك لعرضه هنا وإدارته من لوحة التحكم.
      </Text>
      <Divider mb={4} />
      <Button colorScheme="green" leftIcon={<Icon as={AddIcon} />} onClick={onAdd}>
        إضافة مشروع
      </Button>
    </Box>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box, Heading, Text, SimpleGrid, Image, IconButton, VStack, HStack,
  Button, useToast, useColorModeValue, FormControl, FormLabel, Input, Tooltip,
  Flex, Divider, Badge
} from "@chakra-ui/react";
import { DeleteIcon, RepeatIcon, AddIcon } from "@chakra-ui/icons";

const API_BASE = (import.meta.env?.VITE_API_BASE_URL || "").replace(/\/+$/, "");

// لو عندك نفس الهيلبرز في helpers/images استوردهم بدلاً من الدوال دي
function resolveImageUrl(src) {
  if (!src) return "";
  const trimmed = String(src).trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `${API_BASE}/${trimmed.replace(/^\/+/, "")}`;
}

function fileToPreview(file) {
  if (!file) return "";
  return URL.createObjectURL(file);
}

// تحاول PUT أولًا، ثم POST مع _method=PUT
async function requestMultipartPutOrPost(id, formData) {
  const token = localStorage.getItem("token") || "";
  // مهم: لا تضع Content-Type — المتصفح يحط boundary تلقائيًا
  const common = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: formData,
  };

  // 1) PUT
  const putRes = await fetch(`${API_BASE}/projects/${id}`, { method: "PUT", ...common });
  if (putRes.ok || putRes.status !== 405) {
    // إما نجح، أو فشل لكن مش 405 → رجّعه للمستدعي
    return putRes;
  }

  // 2) POST مع _method=PUT
  const fd = new FormData();
  for (const [k, v] of formData.entries()) fd.append(k, v);
  fd.set("_method", "PUT");

  const postRes = await fetch(`${API_BASE}/projects/${id}`, { method: "POST", ...common, body: fd });
  return postRes;
}

/**
 * props:
 * - project: { id, main_image, other_images }
 * - onProjectUpdated?: (updated) => void
 */
export default function UpdateProjectImages({ project, onProjectUpdated }) {
  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.900");
  const cardBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  const holderBg = useColorModeValue("gray.100", "whiteAlpha.200");

  const projectId = project?.id;
  const existingMain = project?.main_image ? resolveImageUrl(project.main_image) : "";

  // other_images ممكن تكون Array URLs / Array objects / string CSV
  const existingOthers = useMemo(() => {
    if (!project?.other_images) return [];
    if (Array.isArray(project.other_images)) {
      // لو عناصرها {id,url} أو {id,path}
      return project.other_images.map((item, idx) => {
        if (typeof item === "string") return { id: idx, url: resolveImageUrl(item) };
        const url = resolveImageUrl(item.url || item.path || item.src || "");
        return { id: item.id ?? idx, url };
      }).filter(x => x.url);
    }
    if (typeof project.other_images === "string") {
      return project.other_images
        .split(",")
        .map(s => s.trim())
        .filter(Boolean)
        .map((u, idx) => ({ id: idx, url: resolveImageUrl(u) }));
    }
    return [];
  }, [project]);

  // الحالة المحلية
  const [mainPreview, setMainPreview] = useState(existingMain);
  const [mainFile, setMainFile] = useState(null);

  const [gallery, setGallery] = useState(existingOthers);        // العناصر الموجودة (id + url)
  const [removedIds, setRemovedIds] = useState([]);              // لتتبع المحذوف
  const [newFiles, setNewFiles] = useState([]);                  // ملفات جديدة (File[])
  const [newPreviews, setNewPreviews] = useState([]);            // معاينات للملفات الجديدة

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // تحديث سريع لو وصل project جديد
    setMainPreview(existingMain);
    setMainFile(null);
    setGallery(existingOthers);
    setRemovedIds([]);
    setNewFiles([]);
    setNewPreviews([]);
  }, [existingMain, existingOthers]);

  const mainInputRef = useRef(null);
  const othersInputRef = useRef(null);

  const onPickMain = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setMainFile(f);
    setMainPreview(fileToPreview(f));
  };

  const onPickOthers = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const previews = files.map(fileToPreview);
    setNewFiles(prev => [...prev, ...files]);
    setNewPreviews(prev => [...prev, ...previews]);
  };

  const removeExisting = (id) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    setRemovedIds(prev => [...prev, id]);
  };

  const removeNewAt = (idx) => {
    setNewFiles(prev => prev.filter((_, i) => i !== idx));
    setNewPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const resetMain = () => {
    setMainFile(null);
    setMainPreview(existingMain);
  };

  const handleSubmit = async () => {
    if (!projectId) return;

    if (!mainFile && newFiles.length === 0 && removedIds.length === 0) {
      toast({ status: "info", title: "لا يوجد تغييرات لحفظها" });
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();

      // 1) صورة رئيسية جديدة (اختيارية)
      if (mainFile) {
        fd.append("main_image", mainFile);
      }

      // 2) صور جديدة للجاليري
      newFiles.forEach((f) => fd.append("other_images[]", f));

      // 3) IDs المحذوفة (لو الـ API يحتاجها)
      removedIds.forEach((rid) => fd.append("removed_other_ids[]", rid));

      const res = await requestMultipartPutOrPost(projectId, fd);
      const ct = res.headers.get("content-type") || "";
      const data = ct.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        const msg = typeof data === "string" ? data : (data?.message || "فشل في حفظ الصور");
        throw new Error(msg);
      }

      toast({ status: "success", title: "تم حفظ الصور بنجاح" });

      // حاول تحديث الحالة من الاستجابة إن كانت JSON،
      // وإلاّ فحدّث بشكل تفاؤلي محليًا
      if (typeof data === "object" && data) {
        onProjectUpdated?.(data);
      } else {
        const optimistic = {
          ...project,
          main_image: mainFile ? mainPreview : project.main_image,
          other_images: [
            ...gallery.map(g => g.url),
            ...newPreviews,
          ],
        };
        onProjectUpdated?.(optimistic);
      }

      // إعادة ضبط مدخلات الملفات
      if (mainInputRef.current) mainInputRef.current.value = "";
      if (othersInputRef.current) othersInputRef.current.value = "";
      setMainFile(null);
      setNewFiles([]);
      setNewPreviews([]);
      setRemovedIds([]);
    } catch (err) {
      console.error(err);
      toast({ status: "error", title: "خطأ أثناء الحفظ", description: err?.message || "حاول مرة أخرى" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box rounded="xl" border="1px solid" borderColor={cardBorder} bg={cardBg} p={5} shadow="sm">
      <Heading as="h5" size="md" mb={4}>تعديل صور المشروع</Heading>

      {/* ===== الصورة الرئيسية ===== */}
      <VStack align="stretch" spacing={3} mb={6}>
        <FormLabel fontWeight="700">الصورة الرئيسية (Main Image)</FormLabel>

        <Flex gap={4} align="stretch" direction={{ base: "column", md: "row" }}>
          <Box
            w={{ base: "100%", md: "420px" }}
            h={{ base: "220px", md: "260px" }}
            overflow="hidden"
            rounded="lg"
            bg={holderBg}
            border="1px solid"
            borderColor={cardBorder}
            position="relative"
          >
            {mainPreview ? (
              <Image src={mainPreview} alt="Main preview" w="100%" h="100%" objectFit="cover" />
            ) : (
              <Flex w="100%" h="100%" align="center" justify="center" color="gray.400">
                لا توجد صورة
              </Flex>
            )}
          </Box>

          <VStack align="stretch" spacing={3} flex="1">
            <FormControl>
              <FormLabel>استبدال الصورة</FormLabel>
              <Input ref={mainInputRef} type="file" accept="image/*" onChange={onPickMain} />
            </FormControl>
            <HStack>
              <Tooltip label="إرجاع الصورة كما كانت">
                <IconButton icon={<RepeatIcon />} aria-label="Reset main" onClick={resetMain} />
              </Tooltip>
            </HStack>
            <Text fontSize="sm" color="gray.500">
              يوصى بأبعاد 1200×800 أو نسبة 16:9. سيتم تصغير الصورة تلقائيًا.
            </Text>
          </VStack>
        </Flex>
      </VStack>

      <Divider my={4} />

      {/* ===== صور الجاليري ===== */}
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between" align="center">
          <FormLabel m={0} fontWeight="700">صور إضافية (Gallery)</FormLabel>
          <Badge colorScheme="blue">{gallery.length + newFiles.length} صورة</Badge>
        </HStack>

        {/* الصور الموجودة */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          {gallery.map((g) => (
            <Box key={g.id} position="relative" rounded="lg" overflow="hidden" border="1px solid" borderColor={cardBorder}>
              <Image src={g.url} alt="gallery" w="100%" h="180px" objectFit="cover" />
              <IconButton
                size="sm"
                aria-label="delete"
                icon={<DeleteIcon />}
                colorScheme="red"
                position="absolute"
                top={2}
                right={2}
                onClick={() => removeExisting(g.id)}
              />
            </Box>
          ))}

          {/* الصور الجديدة (لم تُرفع بعد) */}
          {newPreviews.map((src, idx) => (
            <Box key={`new-${idx}`} position="relative" rounded="lg" overflow="hidden" border="1px solid" borderColor={cardBorder}>
              <Image src={src} alt={`new-${idx}`} w="100%" h="180px" objectFit="cover" />
              <IconButton
                size="sm"
                aria-label="delete-new"
                icon={<DeleteIcon />}
                colorScheme="red"
                position="absolute"
                top={2}
                right={2}
                onClick={() => removeNewAt(idx)}
              />
            </Box>
          ))}
        </SimpleGrid>

        <HStack pt={2}>
          <Input
            ref={othersInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={onPickOthers}
          />
          <Tooltip label="إضافة صور">
            <IconButton aria-label="add" icon={<AddIcon />} onClick={() => othersInputRef.current?.click()} />
          </Tooltip>
        </HStack>
      </VStack>

      <HStack spacing={3} mt={6}>
        <Button colorScheme="purple" onClick={handleSubmit} isLoading={loading} loadingText="جارٍ الحفظ...">
          حفظ الصور
        </Button>
      </HStack>
    </Box>
  );
}

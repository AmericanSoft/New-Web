// features/Projects/UpdateProject.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  HStack,
  VStack,
  useToast,
  useColorModeValue,
  SimpleGrid,
  Image,
  IconButton,
  Tooltip,
  Flex,
  Divider,
  Badge,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon, RepeatIcon, AddIcon } from "@chakra-ui/icons";

const API_BASE = (import.meta.env?.VITE_API_BASE_URL || "").replace(/\/+$/, "");

// ===== Helpers
function resolveImageUrl(src) {
  if (!src) return "";
  const s = String(src).trim();
  if (/^https?:\/\//i.test(s)) return s;
  return `${API_BASE}/${s.replace(/^\/+/, "")}`;
}
function fileToPreview(file) {
  return file ? URL.createObjectURL(file) : "";
}

/** أرسل multipart كـ POST مع _method=PUT (أكثر توافقًا) */
async function requestMultipartAsPostPut(id, formData) {
  const token = localStorage.getItem("token") || "";
  formData.set("_method", "PUT"); // مهم

  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      // لا تضبط Content-Type يدويًا
    },
    body: formData,
  });
  return res;
}

/** عرض رسائل Laravel */
function extractLaravelErrors(data) {
  if (!data) return "";
  if (data.errors && typeof data.errors === "object") {
    const msgs = [];
    for (const arr of Object.values(data.errors)) {
      if (Array.isArray(arr)) msgs.push(...arr);
    }
    if (msgs.length) return msgs.join(" | ");
  }
  return typeof data === "string" ? data : data?.message || "فشل في تحديث المشروع";
}

export default function UpdateProject({ project, onProjectUpdated, onCancel }) {
  // ===== بيانات أساسية
  const initial = useMemo(
    () => ({
      title: project?.title || "",
      description: project?.description || "",
      category_name: project?.category_name || "",
    }),
    [project]
  );
  const [form, setForm] = useState(initial);

  // ===== صور (Main + Gallery)
  const existingMain = project?.main_image ? resolveImageUrl(project.main_image) : "";

  const existingOthers = useMemo(() => {
    if (!project?.other_images) return [];
    if (Array.isArray(project.other_images)) {
      return project.other_images
        .map((item, idx) => {
          if (typeof item === "string") return { id: idx, url: resolveImageUrl(item) };
          // نحاول نقرأ أكثر من مفتاح شائع
          const url = resolveImageUrl(item?.url || item?.path || item?.src || item?.image || "");
          return url ? { id: item?.id ?? idx, url } : null;
        })
        .filter(Boolean);
    }
    if (typeof project.other_images === "string") {
      return project.other_images
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((u, idx) => ({ id: idx, url: resolveImageUrl(u) }));
    }
    return [];
  }, [project]);

  const [mainPreview, setMainPreview] = useState(existingMain);
  const [mainFile, setMainFile] = useState(null);

  const [gallery, setGallery] = useState(existingOthers); // [{id,url}] المتبقية بعد الحذف
  const [removedIds, setRemovedIds] = useState([]);       // IDs المحذوفة
  const [newFiles, setNewFiles] = useState([]);           // ملفات جديدة
  const [newPreviews, setNewPreviews] = useState([]);     // معاينات الملفات الجديدة

  useEffect(() => {
    setForm(initial);
    setMainPreview(existingMain);
    setMainFile(null);
    setGallery(existingOthers);
    setRemovedIds([]);
    setNewFiles([]);
    setNewPreviews([]);
  }, [initial, existingMain, existingOthers]);

  const mainInputRef = useRef(null);
  const othersInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.900");
  const cardBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  const holderBg = useColorModeValue("gray.100", "whiteAlpha.200");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ==== Main image
  const onPickMain = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setMainFile(f);
    setMainPreview(fileToPreview(f));
  };
  const resetMain = () => {
    setMainFile(null);
    setMainPreview(existingMain);
    if (mainInputRef.current) mainInputRef.current.value = "";
  };

  // ==== Gallery
  const onPickOthers = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setNewFiles((p) => [...p, ...files]);
    setNewPreviews((p) => [...p, ...files.map(fileToPreview)]);
  };
  const removeExisting = (id) => {
    setGallery((p) => p.filter((g) => g.id !== id));
    setRemovedIds((p) => [...p, id]);
  };
  const removeNewAt = (i) => {
    setNewFiles((p) => p.filter((_, idx) => idx !== i));
    setNewPreviews((p) => p.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast({ status: "warning", title: "من فضلك أدخل اسم المشروع" });
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();

      // الحقول الأساسية
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("category_name", form.category_name);

      // أسماء بديلة محتملة (لو الـ API مختلف)
      fd.append("name", form.title);
      fd.append("details", form.description);
      fd.append("category", form.category_name);

      // الصور
      if (mainFile) fd.append("main_image", mainFile);
      newFiles.forEach((f) => fd.append("other_images[]", f));

      // ✅ الحذف بطريقتين:
      // 1) IDs (المفضلة)
      removedIds.forEach((rid) => fd.append("removed_other_ids[]", rid));
      // 2) قائمة الصور المتبقية (لو الـ API لا يدعم IDs)
      gallery.forEach((g) => fd.append("other_images_keep[]", g.url));

      const res = await requestMultipartAsPostPut(project.id, fd);

      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        const msg = extractLaravelErrors(data);
        throw new Error(msg);
      }

      toast({ status: "success", title: "تم تحديث المشروع بنجاح" });

      // تفاؤلي لو الـ API رجّع نص بدل JSON
      const optimistic =
        typeof data === "object" && data
          ? data
          : {
              ...project,
              ...form,
              main_image: mainFile ? mainPreview : project.main_image,
              other_images: [...gallery.map((g) => g.url), ...newPreviews],
            };

      onProjectUpdated?.(optimistic);
      onCancel?.();
    } catch (err) {
      console.error(err);
      toast({
        status: "error",
        title: "حدث خطأ أثناء التحديث",
        description: err?.message || "حاول مرة أخرى",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      rounded="xl"
      border="1px solid"
      borderColor={cardBorder}
      bg={cardBg}
      p={5}
      shadow="sm"
    >
      <Heading as="h5" size="md" mb={4}>
        تعديل مشروع: <Box as="span" color="purple.600">{project?.title}</Box>
      </Heading>

      {/* ===== بيانات أساسية ===== */}
      <FormControl mb={4} isRequired>
        <FormLabel>اسم المشروع</FormLabel>
        <Input name="title" value={form.title} onChange={onChange} placeholder="اسم المشروع" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>الوصف</FormLabel>
        <Textarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows={4}
          placeholder="وصف موجز للمشروع"
        />
      </FormControl>

      <FormControl mb={6}>
        <FormLabel>التصنيف</FormLabel>
        <Input
          name="category_name"
          value={form.category_name}
          onChange={onChange}
          placeholder="Web / Mobile / ERP ..."
        />
      </FormControl>

      <Divider my={5} />

      {/* ===== الصورة الرئيسية ===== */}
      <Heading as="h6" size="sm" mb={3}>
        الصورة الرئيسية (Main Image)
      </Heading>
      <Flex gap={4} align="stretch" direction={{ base: "column", md: "row" }} mb={6}>
        <Box
          w={{ base: "100%", md: "420px" }}
          h={{ base: "220px", md: "260px" }}
          overflow="hidden"
          rounded="lg"
          bg={holderBg}
          border="1px solid"
          borderColor={cardBorder}
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
            يُفضَّل أبعاد 1200×800 أو نسبة 16:9. سيتم تصغير الصورة تلقائيًا.
          </Text>
        </VStack>
      </Flex>

      <Divider my={4} />

      {/* ===== صور إضافية (الجاليري) ===== */}
      <HStack justify="space-between" align="center" mb={2}>
        <Heading as="h6" size="sm">صور إضافية (Gallery)</Heading>
        <Badge colorScheme="blue">{gallery.length + newFiles.length} صورة</Badge>
      </HStack>

      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
        {/* صور موجودة */}
        {gallery.map((g) => (
          <Box
            key={g.id}
            position="relative"
            rounded="lg"
            overflow="hidden"
            border="1px solid"
            borderColor={cardBorder}
          >
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

        {/* صور جديدة قبل الرفع */}
        {newPreviews.map((src, idx) => (
          <Box
            key={`new-${idx}`}
            position="relative"
            rounded="lg"
            overflow="hidden"
            border="1px solid"
            borderColor={cardBorder}
          >
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

      <HStack pt={3} mb={6}>
        <Input ref={othersInputRef} type="file" accept="image/*" multiple onChange={onPickOthers} />
        <Tooltip label="إضافة صور">
          <IconButton aria-label="add" icon={<AddIcon />} onClick={() => othersInputRef.current?.click()} />
        </Tooltip>
      </HStack>

      <HStack spacing={3} flexWrap="wrap">
        <Button type="submit" colorScheme="purple" isLoading={loading} loadingText="جارٍ التحديث...">
          تحديث
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} isDisabled={loading}>
          إلغاء
        </Button>
      </HStack>
    </Box>
  );
}

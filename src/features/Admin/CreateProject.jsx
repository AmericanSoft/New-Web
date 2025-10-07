// src/components/Admintool/Create-Project.jsx
import React, { useState } from "react";
import {
  Box, Heading, VStack, HStack, FormControl, FormLabel, Input, Textarea,
  Button, Image, Wrap, WrapItem, useColorModeValue, useToast, Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/Auth/AuthContext";

export default function CreateProject({ onProjectCreated }) {
  const [form, setForm] = useState({ title:"", description:"", link:"", category_name:"", main_image:null, other_images:[] });
  const [previewMain, setPreviewMain] = useState(null);
  const [previewOthers, setPreviewOthers] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useAuth(); // ⬅️ هنا التوكين
  const cardBg = useColorModeValue("white", "gray.900");
  const borderCol = useColorModeValue("gray.200", "whiteAlpha.300");

  const BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleMainImage = (e) => { const f = e.target.files?.[0]; if(!f) return; if(!f.type.startsWith("image/")) return toast({status:"warning", title:"الرجاء اختيار صورة رئيسية صالحة"}); setForm(p=>({...p,main_image:f})); setPreviewMain(URL.createObjectURL(f)); };
  const handleOtherImages = (e) => { const files = Array.from(e.target.files||[]).filter(f=>f.type.startsWith("image/")); setForm(p=>({...p, other_images: files})); setPreviewOthers(files.map(f=>URL.createObjectURL(f))); };
  const resetForm = () => { setForm({ title:"", description:"", link:"", category_name:"", main_image:null, other_images:[] }); setPreviewMain(null); setPreviewOthers([]); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, category_name, main_image } = form;
    if (!title || !description || !category_name || !main_image) {
      toast({ status: "error", title: "يرجى ملء الحقول الإلزامية" });
      return;
    }

    // لا يوجد توكين؟ رجّعه للّوجين
    const token = user?.token || localStorage.getItem("token");
    if (!token) {
      toast({ status: "error", title: "يجب تسجيل الدخول لإضافة مشروع" });
      navigate("/login", { replace: true, state: { from: { pathname: "/ourprojects" } } });
      return;
    }

    setLoading(true);
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    if (form.link) fd.append("link", form.link);
    fd.append("category_name", form.category_name);
    fd.append("main_image", form.main_image);
    form.other_images.forEach((img, i) => fd.append(`other_images[${i}]`, img));

    try {
      const res = await fetch(`${BASE}/projects`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "X-Requested-With": "XMLHttpRequest",
        },
        body: fd,
      });

      if (res.status === 401) {
        toast({ status: "error", title: "انتهت الجلسة. من فضلك سجّل دخولك مرة أخرى." });
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        navigate("/login", { replace: true, state: { from: { pathname: "/ourprojects" } } });
        return;
      }

      const data = (res.headers.get("content-type")||"").includes("application/json")
        ? await res.json()
        : await res.text();

      if (!res.ok) {
        const msg = typeof data === "string" ? data : data?.message || "فشل في إنشاء المشروع";
        toast({ status: "error", title: msg });
        return;
      }

      toast({ status: "success", title: "تم إضافة المشروع بنجاح" });
      onProjectCreated?.(typeof data === "string" ? {} : data);
      resetForm();
    } catch (err) {
      console.error(err);
      toast({ status: "error", title: "خطأ في الاتصال بالسيرفر" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} bg={cardBg} border="1px solid" borderColor={borderCol} rounded="xl" p={{ base: 4, md: 6 }} shadow="sm">
      <Heading size="md" mb={4}>إضافة مشروع جديد</Heading>

      <VStack align="stretch" spacing={4}>
        <FormControl isRequired><FormLabel>اسم المشروع</FormLabel><Input name="title" value={form.title} onChange={handleChange} placeholder="مثال: نظام إدارة المخازن" /></FormControl>
        <FormControl isRequired><FormLabel>الوصف</FormLabel><Textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="اكتب وصفًا موجزًا للمشروع..." /></FormControl>
        <FormControl><FormLabel>رابط المشروع (اختياري)</FormLabel><Input type="url" name="link" value={form.link} onChange={handleChange} placeholder="https://example.com" /></FormControl>
        <FormControl isRequired><FormLabel>التصنيف</FormLabel><Input name="category_name" value={form.category_name} onChange={handleChange} placeholder="Web / Mobile / ERP ..." /></FormControl>
        <Divider />
        <FormControl isRequired><FormLabel>الصورة الرئيسية</FormLabel><Input type="file" accept="image/*" onChange={handleMainImage} />{previewMain && <Image src={previewMain} alt="Main preview" mt={3} boxSize="144px" objectFit="cover" rounded="lg" border="1px solid" borderColor={borderCol} />}</FormControl>
        <FormControl><FormLabel>صور إضافية (اختياري)</FormLabel><Input type="file" accept="image/*" multiple onChange={handleOtherImages} />{previewOthers.length>0 && <Wrap mt={3} spacing={2}>{previewOthers.map((src,i)=>(<WrapItem key={i}><Image src={src} alt={`preview-${i}`} boxSize="96px" objectFit="cover" rounded="md" border="1px solid" borderColor={borderCol} /></WrapItem>))}</Wrap>}</FormControl>
        <HStack pt={2} spacing={3}><Button type="submit" colorScheme="blue" isLoading={loading} loadingText="جارٍ الحفظ...">حفظ المشروع</Button><Button variant="ghost" onClick={resetForm} isDisabled={loading}>إفراغ الحقول</Button></HStack>
      </VStack>
    </Box>
  );
}

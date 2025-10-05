import React, { useState } from "react";
import {
  Box, SimpleGrid, FormControl, FormLabel, Input, InputGroup, InputLeftAddon,
  Select, Textarea, Divider, Button, useColorModeValue, useToast, Text as CText
} from "@chakra-ui/react";

import { useSubmitContact } from "../../hooks/useSubmitContact";
import { CONTACT_STRINGS } from "./strings";
import { useLang } from "./getLang";

import { normalizeEgLocal, isValidEgMobile } from "../../lib/phone";
import { trim, cleanObject } from "../../helpers/utils";

const COUNTRY_FIXED = "EG";
const SERVICE_VALUES = ["Web Design", "Mobile Application", "Custom Software", "Seo Strategy"];

export default function ContactForm({ onSubmit, lang: forcedLang }) {
  const lang = useLang(forcedLang);
  const t = CONTACT_STRINGS[lang];
  const toast = useToast();
  const border = useColorModeValue("gray.200", "whiteAlpha.300");
  const { submit, loading } = useSubmitContact();

  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "", message: "", category_name: "",
  });

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      toast({ status: "warning", title: lang==="ar"?"املأ الحقول المطلوبة":"Please fill required fields" });
      return;
    }

    const mobileLocal = normalizeEgLocal(form.phone);
    if (!isValidEgMobile(mobileLocal)) {
      toast({
        status: "warning",
        title: lang==="ar"?"صيغة رقم الهاتف غير صحيحة":"Invalid phone number",
        description: lang==="ar"?"اكتب رقم مثل 010/011/012/015 + 8 أرقام":"Use 010/011/012/015 + 8 digits",
      });
      return;
    }

    let category = trim(form.category_name) || null;
    if (category && category.toLowerCase() === "seo strategy") category = "Seo Strategy";
    if (category && !SERVICE_VALUES.includes(category)) category = null;

    const payload = cleanObject({
      name: trim(form.name),
      company_name: trim(form.company) || null,
      email: trim(form.email),
      message: trim(form.message) || null,
      country: COUNTRY_FIXED,
      address: null,
      mobile_number: mobileLocal,
      whatsapp_number: null,
      category_name: category,
    });

    const res = await submit(payload);

    if (res.ok) {
      toast({ status: "success", title: lang==="ar"?"تم الإرسال بنجاح!":"Submitted successfully!" });
      setForm({ name:"", email:"", company:"", phone:"", message:"", category_name:"" });
      onSubmit?.(payload);
      return;
    }

    toast({
      status:"error",
      title: lang==="ar"?"فشل الإرسال":"Submission failed",
      description: res.message || (lang==="ar"?"حاول لاحقًا.":"Try again later."),
      duration: 8000,
      isClosable: true,
    });
  };

  return (
    <Box p={{ base: 4, md: 6 }} dir={t.dir}>
      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <FormControl isRequired>
            <FormLabel>{t.form.name}</FormLabel>
            <Input name="name" value={form.name} onChange={handle} placeholder={t.form.namePh}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>{t.form.phone}</FormLabel>
            <InputGroup>
              <InputLeftAddon p={0} border="none">
                <Box px={3} border="1px solid" borderColor={border} borderRightRadius={0}>
                  +20
                </Box>
              </InputLeftAddon>
              <Input
                name="phone" type="tel" value={form.phone} onChange={handle}
                placeholder={t.form.phonePh} borderLeftRadius={0}
                onBlur={() => setForm(f => ({ ...f, phone: normalizeEgLocal(f.phone) }))}
              />
            </InputGroup>
          </FormControl>
        </SimpleGrid>

        <FormControl mt={4} isRequired>
          <FormLabel>{t.form.email}</FormLabel>
          <Input name="email" type="email" value={form.email} onChange={handle} placeholder={t.form.emailPh}/>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>
            {t.form.company}{" "}
            <CText as="span" color="gray.500" fontWeight="400">{t.form.optional}</CText>
          </FormLabel>
          <Input name="company" value={form.company} onChange={handle} placeholder={t.form.companyPh}/>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>{lang==="ar"?"الخدمة":"Service"}</FormLabel>
          <Select name="category_name" value={form.category_name} onChange={handle}
                  placeholder={lang==="ar"?"اختر الخدمة":"Select a service"}>
            {SERVICE_VALUES.map(v => <option key={v} value={v}>{v}</option>)}
          </Select>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>{t.form.message}</FormLabel>
          <Textarea name="message" rows={6} value={form.message} onChange={handle} placeholder={t.form.messagePh}/>
        </FormControl>

        <Divider my={6}/>
        <Button type="submit" w="100%" h="52px" rounded="md" variant="solid" fontWeight="700"
                isLoading={loading} loadingText={lang==="ar"?"جاري الإرسال...":"Submitting..."}>
          {t.form.submit}
        </Button>
      </form>
    </Box>
  );
}

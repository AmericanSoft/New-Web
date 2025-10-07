// src/components/PopUpForm.jsx
import React from "react";
import {
  Box, VStack, HStack, Text, FormControl, Input, Select, Button,
  IconButton, useColorModeValue, InputGroup, InputLeftElement, InputRightElement,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useSubmitContact } from "../../hooks/useSubmitContact";
import { buildMobileForApi } from "../../helpers/Phone";

const COUNTRIES = [
  { code: "EG", name_en: "Egypt", name_ar: "مصر", dial: "+20" },
  { code: "SA", name_en: "Saudi Arabia", name_ar: "السعودية", dial: "+966" },
  { code: "AE", name_en: "United Arab Emirates", name_ar: "الإمارات", dial: "+971" },
  { code: "KW", name_en: "Kuwait", name_ar: "الكويت", dial: "+965" },
  { code: "QA", name_en: "Qatar", name_ar: "قطر", dial: "+974" },
  { code: "BH", name_en: "Bahrain", name_ar: "البحرين", dial: "+973" },
  { code: "OM", name_en: "Oman", name_ar: "عُمان", dial: "+968" },
  { code: "JO", name_en: "Jordan", name_ar: "الأردن", dial: "+962" },
];

const DICT = {
  ar: {
    heading: "انطلق باستخدام أحدث التقنيات",
    yourName: "الاسم الكامل",
    yourEmail: "البريد الإلكتروني",
    country: "الدولة",
    phone: "رقم الهاتف",
    company: "الشركة (اختياري)",
    service: "الخدمة المطلوبة",
    submit: "إرسال",
    sending: "جارٍ الإرسال...",
    services: [
      "تصميم مواقع",
      "تطبيق موبايل",
      "برمجيات مخصصة",
      "تكاملات API",
      "تحسين محركات البحث (SEO)",
      "استضافة وصيانة",
    ],
  },
  en: {
    heading: "Unleash yourself and use the latest technologies.",
    yourName: "Full Name",
    yourEmail: "Email Address",
    country: "Country",
    phone: "Phone Number",
    company: "Company (optional)",
    service: "Select a Service",
    submit: "Submit",
    sending: "Sending...",
    services: [
      "Web Design",
      "Mobile App",
      "Custom Software",
      "API Integrations",
      "SEO",
      "Hosting & Maintenance",
    ],
  },
};

export default function PopUpForm({
  onClose,
  defaults = { name: "", email: "", country: "EG", phone: "", company: "", service: "Web Design" },
  locale, // "ar" | "en" (اختياري)
}) {
  // حاول استنتاج اللغة من <html dir> كافتراضي
  const inferredDir =
    typeof document !== "undefined" && document.documentElement.dir
      ? document.documentElement.dir
      : "ltr";
  const isAr = (locale ?? (inferredDir === "rtl" ? "ar" : "en")) === "ar";
  const t = DICT[isAr ? "ar" : "en"];

  const [form, setForm] = React.useState({
    ...defaults,
    service: defaults.service || (isAr ? t.services[0] : DICT.en.services[0]),
  });

  const { submit, loading, error } = useSubmitContact();

  const cardBg   = useColorModeValue("white", "gray.800");
  const borderCol= useColorModeValue("gray.200", "whiteAlpha.300");
  const subText  = useColorModeValue("gray.600", "gray.300");
  const orange   = "#FF6A00";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const dial = React.useMemo(
    () => COUNTRIES.find((c) => c.code === form.country)?.dial ?? "",
    [form.country]
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const mobile = buildMobileForApi(dial, form.phone, form.country);

    const payload = {
      name: form.name?.trim(),
      company_name: form.company?.trim() || null,
      email: form.email?.trim(),
      message: "",
      country: form.country,
      address: null,
      mobile_number: mobile,
      whatsapp_number: mobile,
      category_name: form.service,
      source_url: typeof window !== "undefined" ? window.location.href : "",
      source_form: "Hero/PopUpForm",
    };

    const res = await submit(payload);
    if (res.ok) onClose?.();
  };

  const focusStyle = {
    _focus: { outline: "none", borderColor: orange, boxShadow: `0 0 0 3px ${orange}33` },
  };

  // عنصر كود الدولة: نبدّل يمين/يسار حسب RTL
  const DialAdornment = ({ children }) =>
    isAr ? (
      <InputLeftElement width="64px">
        <Box as="span" fontSize="sm" color={subText} ml="2" whiteSpace="nowrap">
          {children}
        </Box>
      </InputLeftElement>
    ) : (
      <InputRightElement width="64px">
        <Box as="span" fontSize="sm" color={subText} mr="2" whiteSpace="nowrap">
          {children}
        </Box>
      </InputRightElement>
    );

  return (
    <Box
      as="form"
      onSubmit={onSubmit}
      position="relative"
      bg={cardBg}
      border="1px solid"
      borderColor={borderCol}
      rounded="24px"
      p={{ base: 4, md: 6 }}
      w="full"
      boxShadow="md"
      dir={isAr ? "rtl" : "ltr"}
      textAlign={isAr ? "right" : "left"}
    >
      <IconButton
        aria-label="Close"
        icon={<CloseIcon boxSize={3} />}
        size="sm"
        variant="ghost"
        position="absolute"
        top="10px"
        {...(isAr ? { left: "20px" } : { right: "10px" })}
        onClick={onClose}
      />

      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {t.heading}
      </Text>

      {error ? (
        <Text fontSize="sm" color="red.500" mb={2}>
          {error}
        </Text>
      ) : null}

      <VStack align="stretch" spacing={3}>
        <FormControl isRequired>
          <Input
            name="name"
            placeholder={t.yourName}
            value={form.name}
            onChange={handleChange}
            rounded="16px"
            h="54px"
            {...focusStyle}
          />
        </FormControl>

        <FormControl isRequired>
          <Input
            type="email"
            name="email"
            placeholder={t.yourEmail}
            value={form.email}
            onChange={handleChange}
            rounded="16px"
            h="54px"
            {...focusStyle}
          />
        </FormControl>

        <HStack spacing={3} flexDir={isAr ? "row-reverse" : "row"}>

          <FormControl isRequired>

            <Select
              name="country"
              value={form.country}
              onChange={handleChange}
              rounded="16px"
              h="54px"
              {...focusStyle}
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {isAr ? c.name_ar : c.name_en} ({c.dial})
                </option>
              ))}
            </Select>

          </FormControl>

          <FormControl isRequired>
            
            <InputGroup >
              {/* بدل padding حسب اتجاه كود الدولة */}

              <Input
                name="phone"
                type="tel"
                placeholder={t.phone}
                value={form.phone}
                onChange={handleChange}
                rounded="16px"
                h="65px"
                {...(isAr ? { pl: "72px" } : { pr: "72px" })}
                {...focusStyle}
              />
              <DialAdornment>{dial}</DialAdornment>

            </InputGroup>

          </FormControl>
          
        </HStack>

        <FormControl>
          <Input
            name="company"
            placeholder={t.company}
            value={form.company}
            onChange={handleChange}
            rounded="16px"
            h="54px"
            {...focusStyle}
          />
        </FormControl>

        <FormControl isRequired>

          <Select
            name="service"
            value={form.service}
            onChange={handleChange}
            rounded="16px"
            h="54px"
            {...focusStyle}
          >
            {t.services.map((s) => (
              <option key={s} value={s}>
               {  s}
              </option>
            ))}
          </Select>

        </FormControl>

        <Button
          type="submit"
          h="56px"
          rounded="full"
          mt={2}
          fontWeight="bold"
          fontSize="md"
          color="white"
          bgGradient="linear(to-r, #643df2ff, #4c49f1ff)"
          _hover={{ opacity: 0.95 }}
          _active={{ transform: "scale(0.99)" }}
          isLoading={loading}
          loadingText={t.sending}
        >
          {t.submit}
        </Button>
      </VStack>
    </Box>
  );
}

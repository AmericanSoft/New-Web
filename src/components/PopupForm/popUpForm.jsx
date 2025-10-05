import React from "react";
import {
  Box, VStack, HStack, Text, FormControl, Input, Select, Button,
  IconButton, useColorModeValue, InputGroup, InputRightElement,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useSubmitContact } from "../../hooks/useSubmitContact";
import { buildMobileForApi } from "../../helpers/Phone";

const COUNTRIES = [
  { code: "EG", name: "Egypt", dial: "+20" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "KW", name: "Kuwait", dial: "+965" },
  { code: "QA", name: "Qatar", dial: "+974" },
  { code: "BH", name: "Bahrain", dial: "+973" },
  { code: "OM", name: "Oman", dial: "+968" },
  { code: "JO", name: "Jordan", dial: "+962" },
];

export default function PopUpForm({
  onClose,
  defaults = { name: "", email: "", country: "EG", phone: "", company: "", service: "Web Design" },
}) {
  const [form, setForm] = React.useState(defaults);
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
      message: "", // أو أضف Textarea لو حابب
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

  return (
    <Box as="form" onSubmit={onSubmit} position="relative" bg={cardBg}
         border="1px solid" borderColor={borderCol} rounded="24px"
         p={{ base: 4, md: 6 }} w="full" maxW="520px" boxShadow="md">
      <IconButton aria-label="Close" icon={<CloseIcon boxSize={3} />} size="sm"
                  variant="ghost" position="absolute" top="10px" right="10px" onClick={onClose} />

      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Unleash yourself and use the latest technologies.
      </Text>

      {error ? <Text fontSize="sm" color="red.500" mb={2}>{error}</Text> : null}

      <VStack align="stretch" spacing={3}>
        <FormControl isRequired>
          <Input name="name" placeholder="Your Name" value={form.name}
                 onChange={handleChange} rounded="16px" h="54px" {...focusStyle}/>
        </FormControl>

        <FormControl isRequired>
          <Input type="email" name="email" placeholder="Your Mail" value={form.email}
                 onChange={handleChange} rounded="16px" h="54px" {...focusStyle}/>
        </FormControl>

        <HStack spacing={3}>
          <FormControl isRequired>
            <Select name="country" value={form.country} onChange={handleChange}
                    rounded="16px" h="54px" {...focusStyle}>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>{c.name} ({c.dial})</option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <InputGroup>
              <Input name="phone" type="tel" placeholder="Phone" value={form.phone}
                     onChange={handleChange} rounded="16px" h="54px" pr="72px" {...focusStyle}/>
              <InputRightElement width="64px">
                <Box as="span" fontSize="sm" color={subText} mr="2" whiteSpace="nowrap">
                  {dial}
                </Box>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </HStack>

        <FormControl>
          <Input name="company" placeholder="Company " value={form.company}
                 onChange={handleChange} rounded="16px" h="54px" {...focusStyle}/>
        </FormControl>

        <FormControl isRequired>
          <Select name="service" value={form.service} onChange={handleChange}
                  rounded="16px" h="54px" {...focusStyle}>
            <option>Web Design</option>
            <option>Mobile App</option>
            <option>Custom Software</option>
            <option>API Integrations</option>
            <option>SEO</option>
            <option>Hosting & Maintenance</option>
          </Select>
        </FormControl>

        <Button type="submit" h="56px" rounded="full" mt={2} fontWeight="bold" fontSize="md"
                color="white" bgGradient="linear(to-r, #643df2ff, #4c49f1ff)"
                _hover={{ opacity: 0.95 }} _active={{ transform: "scale(0.99)" }}
                isLoading={loading} loadingText="Sending...">
          Submit
        </Button>
      </VStack>
    </Box>
  );
}

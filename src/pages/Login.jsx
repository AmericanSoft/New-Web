// src/pages/Login.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Image,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  useColorModeValue,
  Icon,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../features/Auth/AuthContext";

export default function Login() {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const cardBg  = useColorModeValue("white", "gray.800");
  const cardBd  = useColorModeValue("gray.200", "whiteAlpha.300");
  const pageBg  = useColorModeValue("gray.50", "gray.900");
  const subText = useColorModeValue("gray.600", "gray.300");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Please enter a valid email.";
    if (!form.password || form.password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return setErr(v);

    setErr("");
    setLoading(true);
    try {
      // اربط هنا بباك إندك داخل AuthContext (signin)
      const res = await signin({ email: form.email, password: form.password });
      if (res?.ok) {
        navigate(from, { replace: true });
      } else {
        setErr(res?.message || "Login failed. Try again.");
      }
    } catch (e) {
      setErr(e?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg={pageBg} py={12}>
      <Container maxW="lg">
        <Box
          as="form"
          onSubmit={onSubmit}
          bg={cardBg}
          border="1px solid"
          borderColor={cardBd}
          rounded="2xl"
          shadow="xl"
          px={{ base: 6, md: 10 }}
          py={{ base: 6, md: 8 }}
        >
          {/* Logo + Brand */}
          <HStack spacing={3} mb={6}>
            <Image
              src="/assets/Logo.png"          
              alt="American Software"
              boxSize="38px"
              objectFit="contain"
              rounded="md"
            />
            <Text fontSize="lg" fontWeight="semibold">
              Amirc​an Software
            </Text>
          </HStack>

          <Heading as="h1" size="lg" mb={4}>
            Log in
          </Heading>

          {err ? (
            <Alert status="error" rounded="md" mb={4}>
              <AlertIcon />
              {err}
            </Alert>
          ) : null}

          <VStack align="stretch" spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={onChange}
                h="48px"
                rounded="md"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={onChange}
                h="48px"
                rounded="md"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              h="48px"
              rounded="md"
              isLoading={loading}
            >
              Log in
            </Button>

            <HStack my={1}>
              <Divider />
              <Text fontSize="sm" color={subText}>
                OR
              </Text>
              <Divider />
            </HStack>

            <Button
              variant="solid"
              bg="#0EA56B"
              _hover={{ bg: "#0c8f5d" }}
              color="white"
              h="48px"
              rounded="md"
              leftIcon={<Icon as={AddIcon} />}
              onClick={() => (window.location.href = "/register")}
            >
              Create account
            </Button>
          </VStack>

          <Text mt={6} fontSize="sm" color={subText} textAlign="center">
            Forgot your password?{" "}
            <Button as="a" href="/forgot" variant="link" colorScheme="blue" size="sm">
              Reset it
            </Button>
          </Text>
        </Box>
      </Container>
    </Box>
  );
}

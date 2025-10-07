// src/features/Auth/RequireAuth.jsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";
import { useAuth } from "./AuthContext";

export default function RequireAuth({ roles = ["admin"] }) {
  const location = useLocation();
  const { user, loading } = useAuth(); // لازم الكونتكست هو مصدر الحقيقة

  if (loading) {
    return (
      <Center minH="50vh">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="lg" />
      </Center>
    );
  }

  // مش مسجّل دخول
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // دور غير مسموح
  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

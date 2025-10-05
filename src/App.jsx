// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./features/Auth/AuthContext.jsx";
import RequireAuth from "./features/Auth/requireAuth.jsx";

import AppLayout from "./Layout/AppLayout";
import AdminLayout from "./Layout/AdminLayout";

import Home from "./pages/Home";
import HomeEn from "./pages/HomeEn";
import FAQ from "./pages/FAQ";
import PoliciesPage from "./pages/Policies.jsx";
import Login from "./pages/Login.jsx";

import AndroidAppPage from "./pages/AndroidAppPage.jsx";
import DesktopAppPage from "./pages/DesktopAppPage.jsx";
import IOSAppPage from "./pages/iosPage.jsx";

import OurProjectsShowcase from "./pages/OurProject.jsx";
import SingleProject from "./components/CaseStudy/SingleProject.jsx";
import CaseStudy from "./pages/CaseStudy.jsx";

// Admin pages
import OurProjects from "./features/AdminSidebar/AdminProject.jsx";
import OurContactus from "./features/AdminSidebar/AdminContact.jsx";

import ScrollToTop from "./helpers/ScrollToTop.jsx";

function AdminDashboard() {
  return <div>Welcome, Admin 👋</div>;
}

function NotFound() {
  return <div style={{ padding: 24 }}>404 — الصفحة غير موجودة.</div>;
}

export default function App() {
  return (
    <AuthProvider>
      {/* 👇 لازم تكون خارج <Routes> */}
      <ScrollToTop />

      <Routes>
        {/* ===== الموقع العام (AR) ===== */}
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="policies" element={<PoliciesPage />} />

          {/* Showcase للمشاريع */}
          <Route path="projects" element={<OurProjectsShowcase />} />
          {/* تفاصيل مشروع */}
          <Route path="projects/:id" element={<SingleProject />} />

          {/* صفحة CaseStudy عامة (اختياري) */}
          <Route path="case-study" element={<CaseStudy />} />
        </Route>

        {/* ===== الموقع الإنجليزي (/en) ===== */}
        <Route path="/en" element={<AppLayout />}>
          <Route index element={<HomeEn />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="policies" element={<PoliciesPage />} />

          <Route path="android" element={<AndroidAppPage />} />
          <Route path="ios" element={<IOSAppPage />} />
          <Route path="desktop" element={<DesktopAppPage />} />

          <Route path="projects" element={<OurProjectsShowcase />} />
          <Route path="projects/:id" element={<SingleProject />} />
          <Route path="case-study" element={<CaseStudy />} />
        </Route>

        {/* ===== خدمات (AR) خارج /en ===== */}
        <Route path="android" element={<AndroidAppPage />} />
        <Route path="ios" element={<IOSAppPage />} />
        <Route path="desktop" element={<DesktopAppPage />} />

        {/* ===== لوجين ===== */}
        <Route path="/login" element={<Login />} />

        {/* ===== Aliases قديمة → تحويل ===== */}
        <Route path="/ourprojects" element={<Navigate to="/admin/projects" replace />} />
        <Route path="/ourcontacts" element={<Navigate to="/admin/contacts" replace />} />

        {/* ===== ADMIN (محمي) ===== */}
        <Route element={<RequireAuth roles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<OurProjects />} />
            <Route path="contacts" element={<OurContactus />} />
          </Route>
        </Route>

        {/* ===== 404 ===== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

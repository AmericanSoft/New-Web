// src/features/Auth/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthCtx = createContext(null);

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // { id, name, role, token, ... }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.user) setUser(parsed.user);
      }
    } catch {}
    setLoading(false);
  }, []);

  // ⬇️ ده اللوجين الحقيقي — عدّل المسار/الأسماء حسب الـ API عندك
  const signin = async ({ email, password }) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data?.message || "Login failed");
    }

    // توقّع أن الـ API بيرجع: { token, user: { id, name, role, ... } }
    const token = data.token || data.access_token;
    const userObj = {
      ...(data.user || {}),
      role: (data.user?.role || "admin"),
      token,
    };

    // خزّن للتطبيق كله
    setUser(userObj);
    localStorage.setItem("auth", JSON.stringify({ user: userObj }));
    localStorage.setItem("token", token);            // مهم لـ fetchات تانية
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("role", userObj.role);

    return { ok: true, user: userObj };
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
  };

  const value = useMemo(() => ({ user, loading, signin, signout }), [user, loading]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);

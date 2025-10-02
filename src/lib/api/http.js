// src/lib/api/http.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") || "";

/** مهلة افتراضية للطلبات (ms) */
const DEFAULT_TIMEOUT = 15000;

/** يبني URL كامل بالـ base + المسار + كويـري سترنج اختياري */
function buildUrl(path, query) {
  const cleanPath = String(path || "").replace(/^\/+/, "");
  const url = new URL(`${BASE_URL}/${cleanPath}`);
  if (query && typeof query === "object") {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
}

/** يحاول قراءة JSON بأمان */
async function safeJson(res) {
  // 204 No Content
  if (res.status === 204) return null;

  // لو السيرفر بيرجع JSON صح هتكون الهيدر مضبوط
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    try {
      return await res.json();
    } catch {
      // fallback للنص
    }
  }
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text || null;
  }
}

/** صياغة رسالة Laravel مفهومة */
function extractLaravelError(payload) {
  // Laravel الافتراضي:
  // { message: "The given data was invalid.", errors: { field: ["msg", ...] } }
  const errors = payload && payload.errors;
  const messageFromErrors =
    errors &&
    Object.entries(errors)
      .map(([f, msgs]) => `${f}: ${(msgs || []).join(", ")}`)
      .join(" | ");

  const message =
    messageFromErrors ||
    (payload && (payload.message || payload.error)) ||
    "Submission failed";

  return { message, fieldErrors: errors || null };
}

/** رمي خطأ غني بالمعلومات */
function throwHttpError(status, payload, url) {
  const { message, fieldErrors } = extractLaravelError(payload || {});
  const err = new Error(message || `HTTP ${status} for ${url}`);
  err.status = status;
  err.payload = payload;
  err.fieldErrors = fieldErrors; // مهم: عشان نعرضها في الواجهة
  err.url = url;

  if (import.meta.env.MODE !== "production") {
    console.groupCollapsed("%cHTTP ERROR", "color:#e11");
    console.log("Status:", status);
    console.log("URL:", url);
    console.log("Message:", err.message);
    console.log("FieldErrors:", fieldErrors);
    console.log("Payload:", payload);
    console.groupEnd();
  }

  throw err;
}

/**
 * استدعاء HTTP عام
 * @param {object} opts
 * @param {"GET"|"POST"|"PUT"|"PATCH"|"DELETE"} opts.method
 * @param {string} opts.path
 * @param {object} [opts.query]
 * @param {object|FormData} [opts.body]
 * @param {object} [opts.headers]
 * @param {number} [opts.timeout]
 */
export async function httpRequest({
  method = "GET",
  path,
  query,
  body,
  headers,
  timeout = DEFAULT_TIMEOUT,
} = {}) {
  const url = buildUrl(path, query);

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  const isJson = body && typeof body === "object" && !isFormData;

  let res;
  try {
    res = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        ...(isJson ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: isJson ? JSON.stringify(body) : body, // يدعم FormData أيضًا
      signal: controller.signal,
      credentials: "omit",
    });
  } catch (e) {
    clearTimeout(id);
    if (e.name === "AbortError") {
      const err = new Error(`Request timed out after ${timeout}ms: ${url}`);
      err.code = "TIMEOUT";
      err.url = url;
      throw err;
    }
    throw e;
  } finally {
    clearTimeout(id);
  }

  const data = await safeJson(res);

  if (!res.ok) {
    // ارمي خطأ مفيد (يشمل fieldErrors لو موجودة)
    throwHttpError(res.status, data, url);
  }

  if (import.meta.env.MODE !== "production") {
    console.debug("[HTTP OK]", method, url, { data });
  }

  return data;
}

// سهل الاستخدام: دوال مختصرة
export const api = {
  get: (path, query, opts) => httpRequest({ method: "GET", path, query, ...opts }),
  post: (path, body, opts) => httpRequest({ method: "POST", path, body, ...opts }),
  put: (path, body, opts) => httpRequest({ method: "PUT", path, body, ...opts }),
  patch: (path, body, opts) => httpRequest({ method: "PATCH", path, body, ...opts }),
  delete: (path, query, opts) => httpRequest({ method: "DELETE", path, query, ...opts }),
};

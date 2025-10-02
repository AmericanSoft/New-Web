// src/hooks/useSubmitContact.js
import { useState, useCallback } from "react";
import { createContact } from "../lib/api/contact";

export function useSubmitContact() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const submit = useCallback(async (values) => {
    setLoading(true);
    setError("");
    try {
      const result = await createContact(values);
      return { ok: true, result, status: 200, data: result };
    } catch (e) {
      // e جاي من http.js ويحمل fieldErrors + payload + status + message
      const message =
        e?.fieldErrors
          ? Object.entries(e.fieldErrors).map(([f, msgs]) => `${f}: ${(msgs||[]).join(", ")}`).join(" | ")
          : (e?.message || "Submission failed");

      setError(message);
      return {
        ok: false,
        status: e?.status,
        message,
        fieldErrors: e?.fieldErrors || null,
        data: e?.payload || null,
        raw: e,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  return { submit, loading, error };
}

// features/Projects/UpdateProject.jsx
import { useState } from "react";

export default function UpdateProject({ project, onProjectUpdated, onCancel }) {
  const [form, setForm] = useState({
    title: project.title || "",
    description: project.description || "",
    category_name: project.category_name || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // لو API عندك بيقبل POST فقط:
      // const body = JSON.stringify({ ...form, _method: "PUT" });
      // const method = "POST";

      const body = JSON.stringify(form);
      const method = "PUT";

      const response = await fetch(
        `https://american-softwares.com/api/public/index.php/api/projects/${project.id}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body,
        }
      );

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      if (response.ok) {
        alert("✅ تم تحديث المشروع بنجاح");
        onProjectUpdated?.(typeof data === "string" ? form : data);
        onCancel?.();
      } else {
        const msg =
          typeof data === "string"
            ? data
            : data?.message || "❌ فشل في تحديث المشروع";
        alert(msg);
      }
    } catch (err) {
      console.error("خطأ:", err);
      alert("حدث خطأ أثناء التحديث");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900"
    >
      <h5 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        تعديل مشروع: <span className="text-indigo-600">{project.title}</span>
      </h5>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
          اسم المشروع
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="اسم المشروع"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
          الوصف
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="وصف موجز للمشروع"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
          التصنيف
        </label>
        <input
          name="category_name"
          value={form.category_name}
          onChange={handleChange}
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="Web / Mobile / ERP ..."
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "جارٍ التحديث..." : "تحديث"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}

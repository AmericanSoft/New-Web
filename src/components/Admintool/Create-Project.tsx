import { useState } from "react";

export default function CreateProject({ onProjectCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    category_name: "",
    main_image: null as File | null,
    other_images: [] as File[],
  });

  const [previewMain, setPreviewMain] = useState<string | null>(null);
  const [previewOthers, setPreviewOthers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setForm((prev) => ({ ...prev, main_image: file }));
      setPreviewMain(URL.createObjectURL(file));
    } else {
      alert("الرجاء اختيار صورة رئيسية صالحة");
    }
  };

  const handleOtherImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) {
      alert("يرجى اختيار صور إضافية صالحة");
      return;
    }
    setForm((prev) => ({ ...prev, other_images: files }));
    setPreviewOthers(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, description, link, category_name, main_image, other_images } = form;
    if (!title || !description || !category_name || !main_image) {
      alert("يرجى ملء الحقول الإلزامية");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    formData.append("category_name", category_name);
    formData.append("main_image", main_image);
    other_images.forEach((img, index) => formData.append(`other_images[${index}]`, img));

    try {
      const response = await fetch(
        "https://american-softwares.com/api/public/index.php/api/projects",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            Accept: "application/json",
          },
          body: formData,
        }
      );

      // حاول قراءة JSON أولًا، لو فشل ارجع نص
      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      if (response.ok) {
        alert("تم إضافة المشروع بنجاح");
        onProjectCreated?.(typeof data === "string" ? {} : data);
        setForm({
          title: "",
          description: "",
          link: "",
          category_name: "",
          main_image: null,
          other_images: [],
        });
        setPreviewMain(null);
        setPreviewOthers([]);
      } else {
        const msg =
          typeof data === "string"
            ? data
            : data?.message || "فشل في إنشاء المشروع";
        alert(msg);
      }
    } catch (err) {
      console.error("خطأ:", err);
      alert("حدث خطأ أثناء الاتصال بالسيرفر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900"
    >
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        إضافة مشروع جديد
      </h3>

      {/* اسم المشروع */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
          اسم المشروع <span className="text-rose-600">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="مثال: نظام إدارة المخازن"
        />
      </div>

      {/* الوصف */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
          الوصف <span className="text-rose-600">*</span>
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="اكتب وصفًا موجزًا للمشروع..."
        />
      </div>

      {/* رابط المشروع */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
          رابط المشروع (اختياري)
        </label>
        <input
          type="url"
          name="link"
          value={form.link}
          onChange={handleChange}
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="https://example.com"
        />
      </div>

      {/* التصنيف */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
          التصنيف <span className="text-rose-600">*</span>
        </label>
        <input
          type="text"
          name="category_name"
          value={form.category_name}
          onChange={handleChange}
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="Web / Mobile / ERP ..."
        />
      </div>

      {/* الصورة الرئيسية */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
          الصورة الرئيسية <span className="text-rose-600">*</span>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleMainImage}
          className="block w-full cursor-pointer rounded-md border border-gray-300 bg-white file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
        />
        {previewMain && (
          <img
            src={previewMain}
            alt="Main preview"
            className="mt-3 h-36 w-36 rounded-lg object-cover ring-1 ring-gray-200 dark:ring-gray-700"
          />
        )}
      </div>

      {/* صور إضافية */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
          صور إضافية (اختياري)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleOtherImages}
          className="block w-full cursor-pointer rounded-md border border-gray-300 bg-white file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-indigo-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800"
        />

        {previewOthers.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {previewOthers.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`preview-${idx}`}
                className="h-24 w-24 rounded-md object-cover ring-1 ring-gray-200 dark:ring-gray-700"
              />
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "جارٍ الحفظ..." : "حفظ المشروع"}
      </button>
    </form>
  );
}

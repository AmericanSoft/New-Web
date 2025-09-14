// ContactDelete.jsx
import { useState } from "react";
import PropTypes from "prop-types";

export default function ContactDelete({ id, onDeleteSuccess, className = "" }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) return;

    try {
      setLoading(true);

      const response = await fetch(
        `https://american-softwares.com/api/public/index.php/api/contact-us/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );

      if (response.ok) {
        alert("✅ تم حذف العنصر بنجاح");
        onDeleteSuccess?.();
      } else {
        // حاول قراءة JSON، لو مش JSON ارجع نص
        const ct = response.headers.get("content-type") || "";
        const result = ct.includes("application/json")
          ? await response.json()
          : await response.text();
        alert(
          typeof result === "string"
            ? result || "❌ حدث خطأ أثناء الحذف"
            : result?.message || "❌ حدث خطأ أثناء الحذف"
        );
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("❌ فشل الاتصال بالسيرفر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className={[
        "inline-flex w-full items-center justify-center rounded-md bg-rose-600 px-3 py-2",
        "text-white shadow-sm transition hover:bg-rose-700",
        "focus:outline-none focus:ring-2 focus:ring-rose-500",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      ].join(" ")}
      aria-busy={loading ? "true" : "false"}
      title="حذف"
    >
      {loading ? (
        <>
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"
            />
          </svg>
          جارٍ الحذف...
        </>
      ) : (
        "حذف"
      )}
    </button>
  );
}

ContactDelete.propTypes = {
  id: PropTypes.number.isRequired,
  onDeleteSuccess: PropTypes.func,
  className: PropTypes.string,
};

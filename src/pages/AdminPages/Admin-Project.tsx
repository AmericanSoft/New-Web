import { useEffect, useState } from "react";
import CreateProject from "../../components/Admintool/Create-Project";
import UpdateProject from "../../components/Admintool/Update-Project";
import {deleteProject} from "../../components/Admintool/Delete-Project";

export default function OurProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);

  useEffect(() => {
    fetch("https://american-softwares.com/api/public/index.php/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data?.data || data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleProjectCreated = (newProject: any) => {
    setProjects((prev) => [newProject, ...prev]);
    setShowForm(false);
  };

  const handleProjectUpdated = (updatedProject: any) => {
    setProjects((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
    setEditingProject(null);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("هل أنت متأكد أنك تريد حذف هذا المشروع؟")) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      alert("✅ تم حذف المشروع بنجاح");
    } catch (error) {
      console.error(error);
      alert("❌ فشل في حذف المشروع");
    }
  };

  return (
    <section className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-rose-600">إدارة المشاريع</h2>

        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {showForm ? "إلغاء الإضافة" : "＋ إضافة مشروع"}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <CreateProject onProjectCreated={handleProjectCreated} />
        </div>
      )}

      {/* Update form */}
      {editingProject && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <UpdateProject
            project={editingProject}
            onProjectUpdated={handleProjectUpdated}
            onCancel={() => setEditingProject(null)}
          />
        </div>
      )}

      {/* List / Loading / Empty */}
      {loading ? (
        <GridSkeleton />
      ) : projects.length === 0 ? (
        <EmptyState onAdd={() => setShowForm(true)} />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const imageUrl = project?.main_image
              ? `${project.main_image}`
              : "/assets/default.png";

            return (
              <article
                key={project.id}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={project.title || "Project"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {project.title}
                  </h3>

                  <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                    <button
                      className="inline-flex items-center justify-center rounded-md border border-indigo-300 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-indigo-700/40 dark:bg-indigo-900/30 dark:text-indigo-200"
                      onClick={() => setEditingProject(project)}
                      style={{ marginBottom: "8px" }}
                    >
                      تعديل المشروع
                    </button>

                    <button
                      className="inline-flex items-center justify-center rounded-md border border-rose-300 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:border-rose-700/40 dark:bg-rose-900/30 dark:text-rose-200"
                      onClick={() => handleDelete(project.id)}
                    >
                      حذف المشروع
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

/* ---------- Skeleton while loading ---------- */
function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
        >
          <div className="aspect-[16/9] w-full bg-gray-200 dark:bg-gray-700" />
          <div className="p-4">
            <div className="mb-2 h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2 h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-4 h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="flex gap-3">
              <div className="h-9 w-24 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-9 w-20 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Empty state ---------- */
function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-900">
      <p className="mb-3 text-lg font-medium text-gray-800 dark:text-gray-100">لا توجد مشاريع بعد</p>
      <p className="mb-6 max-w-md text-sm text-gray-600 dark:text-gray-300">
        ابدأ بإضافة أول مشروع لك لعرضه هنا وإدارته من لوحة التحكم.
      </p>
      <button
        onClick={onAdd}
        className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        + إضافة مشروع
      </button>
    </div>
  );
}

export async function deleteProject(id) {
  const response = await fetch(`https://american-softwares.com/api/public/index.php/api/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) throw new Error("فشل في حذف المشروع");
}
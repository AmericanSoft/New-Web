export async function deleteProject(id) {
  const response = await fetch(`https://sfgukli.american-softwares.com/api/projects/${id}`, {
    method: "DELETE",
    headers: {

      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) throw new Error("فشل في حذف المشروع");
}


// utils/projectImage.ts
const PROJECTS_BASE = "https://sfgukli.american-softwares.com/projects/";
export function projectImageFromApi(u?: string) {
  if (!u) return "/project.png";
  const noQuery = u.split("?")[0];
  const file = noQuery.split("/").pop() || "";
  return file ? PROJECTS_BASE + file : "/project.png";
}

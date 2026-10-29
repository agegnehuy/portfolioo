const normalizeProjectName = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

export const isEzikrProject = (project) =>
  [project?.Title, project?.title, project?.name, project?.slug]
    .map(normalizeProjectName)
    .some((value) => value.includes("ezikr"));

export const withoutEzikrProject = (projects = []) =>
  projects.filter((project) => !isEzikrProject(project));

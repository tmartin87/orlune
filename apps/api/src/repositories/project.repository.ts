import type {
  CreateProjectInput,
  Project,
} from "@orlune/shared";

const projects: Project[] = [
  {
    id: "1",
    name: "Orlune",
  },
];

export function findAllProjects() {
  return projects;
}

export function createProjectInRepository(input: CreateProjectInput) {
  const project: Project = {
    id: String(projects.length + 1),
    name: input.name,
  };

  projects.push(project);

  return project;
}
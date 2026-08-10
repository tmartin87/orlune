import type { CreateProjectInput } from "@orlune/shared";

export function createProject(input: CreateProjectInput) {
  return {
    id: "2",
    name: input.name,
  };
}


export function getAllProjects() {
  return [
    {
      id: "1",
      name: "Orlune",
    },
  ];
}
import { api } from "../../lib/api";

import type {
  CreateProjectInput,
  Project,
  UpdateProjectInput,
} from "@orlune/shared";

export function getProjects() {
  return api<Project[]>("/projects");
}
export function deleteProject(projectId: string) {
  return api<void>(`/projects/${projectId}`, {
    method: "DELETE",
  });
}

export function createProject(input: CreateProjectInput) {
  return api<Project>("/projects", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateProject(projectId: string, input: UpdateProjectInput) {
  return api<Project>(`/projects/${projectId}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

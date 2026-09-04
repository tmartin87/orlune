import type { CreateProjectInput } from "@orlune/shared";
import { ConflictError } from "../errors/conflict.error.js";

import {
  createProjectWithBacklog,
  findAllProjects,
  hasTasksInProject,
  deleteProject as deleteProjectRepository,
} from "../repositories/project.repository.js";

export async function getAllProjects() {
  return findAllProjects();
}

export async function createProject(input: CreateProjectInput) {
  return createProjectWithBacklog(input);
}

export async function deleteProject(projectId: string) {
  const hasTasks = await hasTasksInProject(projectId);

if (hasTasks) {
  throw new ConflictError("Cannot delete project with tasks");
}
  return deleteProjectRepository(projectId);
}
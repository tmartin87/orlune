import type { CreateProjectInput } from "@orlune/shared";
import { ConflictError } from "../errors/conflict.error.js";

import {
  createProjectWithBacklog,
  findAllProjects,
  hasSectionsInProject,
  deleteProject as deleteProjectRepository,
} from "../repositories/project.repository.js";

export async function getAllProjects() {
  return findAllProjects();
}

export async function createProject(input: CreateProjectInput) {
  return createProjectWithBacklog(input);
}

export async function deleteProject(projectId: string) {
  const hasSections = await hasSectionsInProject(projectId);

  if (hasSections) {
    throw new ConflictError("Cannot delete project with sections");
  }

  return deleteProjectRepository(projectId);
}
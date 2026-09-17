import type { 
  CreateProjectInput,
  UpdateProjectInput,
 } from "@orlune/shared";
import { ConflictError } from "../errors/conflict.error.js";
import { NotFoundError } from "../errors/not-found.error.js";

import {
  createProjectWithBacklog,
  findProjectsByUserId,
  updateProjectByIdAndUserId as updateProjectRepository,
  deleteProjectByIdAndUserId,
} from "../repositories/project.repository.js";

export async function getProjectsByUserId(userId: string) {
  return findProjectsByUserId(userId);
}

export async function createProject(
  input: CreateProjectInput,
  userId: string
) {
  return createProjectWithBacklog(input, userId);
}
export async function deleteProject(
  projectId: string,
  userId: string,
) {
  const result = await deleteProjectByIdAndUserId(
    projectId,
    userId,
  );

  if (result.status === "not_found") {
    throw new NotFoundError("Project not found");
  }

  if (result.status === "has_tasks") {
    throw new ConflictError(
      "Cannot delete project with tasks",
    );
  }
}

export async function updateProject(
  projectId: string,
  userId: string,
  input: UpdateProjectInput,
) {
  const projects = await updateProjectRepository(
    projectId,
    userId,
    input,
  );

  if (projects.length === 0) {
    throw new NotFoundError("Project not found");
  }

  return projects[0];
}
import type { CreateProjectInput } from "@orlune/shared";

import {
  createProjectInRepository,
  findAllProjects,
} from "../repositories/project.repository.js";

export function getAllProjects() {
  return findAllProjects();
}

export function createProject(input: CreateProjectInput) {
  return createProjectInRepository(input);
}
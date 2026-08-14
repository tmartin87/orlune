import type { CreateProjectInput } from "@orlune/shared";

import {
  createProjectInRepository,
  findAllProjects,
} from "../repositories/project.repository.js";

export async function getAllProjects() {
  return  findAllProjects();
}

export async function createProject(input: CreateProjectInput) {
  return createProjectInRepository(input);
}
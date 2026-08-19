import type { CreateProjectInput } from "@orlune/shared";
q
import {
  createProjectWithBacklog,
  findAllProjects,
} from "../repositories/project.repository.js";

export async function getAllProjects() {
  return findAllProjects();
}

export async function createProject(input: CreateProjectInput) {
  return createProjectWithBacklog(input);
}



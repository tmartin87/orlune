import {
  createSection,
  findSectionsByProject,
} from "../repositories/section.repository.js";

import type {CreateSectionInput} from "@orlune/shared";


export async function getSectionsByProject(projectId: string) {
  return findSectionsByProject(projectId);
}

export async function createProjectSection(input: CreateSectionInput) {
  return createSection(input);
}
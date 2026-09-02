import {
  createSection,
  findSectionsByProject,
  updateSection as updateSectionRepository,
} from "../repositories/section.repository.js";

import type {CreateSectionInput, UpdateSectionInput} from "@orlune/shared";


export async function getSectionsByProject(projectId: string) {
  return findSectionsByProject(projectId);
}

export async function createProjectSection(input: CreateSectionInput) {
  return createSection(input);
}

export async function updateProjectSection(
  sectionId: string,
  input: UpdateSectionInput,
){
  return updateSectionRepository(sectionId, input);
  }
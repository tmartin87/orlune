import { ConflictError } from "../errors/conflict.error.js";
import {
  createSection,
  findSectionsByProject,
  updateSection as updateSectionRepository,
  hasTasksInSection,
  deleteSection as deleteSectionRepository,
} from "../repositories/section.repository.js";

import type {
  CreateSectionInput,
  UpdateSectionInput,
} from "@orlune/shared";


export async function getSectionsByProject(projectId: string) {
  return findSectionsByProject(projectId);
}

export async function createProjectSection(input: CreateSectionInput) {
  return createSection(input);
}

export async function updateProjectSection(
  sectionId: string,
  input: UpdateSectionInput,
) {
  return updateSectionRepository(sectionId, input);
}

export async function deleteProjectSection(sectionId: string) {
  const hasTasks = await hasTasksInSection(sectionId);

  if (hasTasks) {
    throw new ConflictError("Cannot delete section with tasks");
  }

  return deleteSectionRepository(sectionId);
}
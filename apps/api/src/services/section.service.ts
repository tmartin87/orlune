import { ConflictError } from "../errors/conflict.error.js";
import {
  createSectionByProjectAndUserId,
  updateSectionByIdAndUserId as updateSectionRepository,
  deleteSectionByIdAndUserId,
  findProjectSectionsByUserId,
} from "../repositories/section.repository.js";


import { NotFoundError } from "../errors/not-found.error.js";

import type {
  CreateSectionInput,
  UpdateSectionInput,
} from "@orlune/shared";

export async function getSectionsByProject(
  projectId: string,
  userId: string,

) {
  const project = await findProjectSectionsByUserId(
    projectId,
    userId,
  );

  if (!project) {
    throw new NotFoundError("Project not found");
  }

  return project.sections;
}


export async function createProjectSection(
  input: CreateSectionInput,
  userId: string,
) {
  const result = await createSectionByProjectAndUserId(
    input.projectId,
    userId,
    input,
  );

  if (result.status === "not_found") {
    throw new NotFoundError("Project not found");
  }

  return result.section;
}

export async function updateProjectSection(
  sectionId: string,
  userId: string,
  input: UpdateSectionInput,
) {
  const sections = await updateSectionRepository(
    sectionId,
    userId,
    input,
  );

  if (sections.length === 0) {
    throw new NotFoundError("Section not found");
  }

  return sections[0];
}

export async function deleteProjectSection(
  sectionId: string,
  userId: string,
) {
  const result = await deleteSectionByIdAndUserId(
    sectionId,
    userId,
  );

  if (result.status === "not_found") {
    throw new NotFoundError("Section not found");
  }

  if (result.status === "has_tasks") {
    throw new ConflictError(
      "Cannot delete section with tasks",
    );
  }
}
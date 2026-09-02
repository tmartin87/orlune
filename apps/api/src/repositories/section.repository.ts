import { prisma } from "../db/prisma.js";

import type {
  CreateSectionInput,
  UpdateSectionInput,
} from "@orlune/shared";

export async function findSectionsByProject(projectId: string) {
  return prisma.section.findMany({
    where: {
      projectId,
    },
  });
}

export async function createSection(input: CreateSectionInput) {
  return prisma.section.create({
    data: {
      name: input.name,
      projectId: input.projectId,
    },
  });
}

export async function updateSection(
  sectionId: string,
  input: UpdateSectionInput,
) {
  return prisma.section.update({
    where: {
      id: sectionId,
    },
    data: input,
  });
}
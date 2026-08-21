import { prisma } from "../db/prisma.js";
import type {CreateSectionInput} from "@orlune/shared";

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
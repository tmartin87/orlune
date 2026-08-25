import type { CreateTaskInput } from "@orlune/shared";

import { prisma } from "../db/prisma.js";

export async function createTask(input: CreateTaskInput) {
  return prisma.task.create({
    data: {
      title: input.title,
      description: input.description,
      sectionId: input.sectionId,
    },
  });
}

export async function findTasksBySection(sectionId: string) {
  return prisma.task.findMany({
    where: {
      sectionId,
    },
  });
}
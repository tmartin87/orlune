import type { CreateProjectInput } from "@orlune/shared";

import { prisma } from "../db/prisma.js";

export async function findAllProjects() {
  return prisma.project.findMany();
}

export async function createProjectWithBacklog(
  input: CreateProjectInput,
) {
  return prisma.$transaction(async (tx) => {
    const project = await tx.project.create({
      data: {
        name: input.name,
      },
    });

    await tx.section.create({
      data: {
        name: "Backlog",
        projectId: project.id,
      },
    });

    return project;
  });
}
import type { CreateProjectInput } from "@orlune/shared";

import { prisma } from "../db/prisma.js";

export async function findAllProjects() {
  return prisma.project.findMany();
}

export async function createProjectInRepository(
  input: CreateProjectInput,
) {
  return prisma.project.create({
    data: {
      name: input.name,
    },
  });
}
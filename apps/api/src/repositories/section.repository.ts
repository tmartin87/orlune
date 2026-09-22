import { prisma } from "../db/prisma.js";
import { Prisma } from "../generated/prisma/client.js";

import type {
  CreateSectionInput,
  UpdateSectionInput,
} from "@orlune/shared";

export async function findProjectSectionsByUserId(
  projectId: string,
  userId: string,
) {
  return prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
    select: {
      sections: true,
    },
  });
}

export async function createSectionByProjectAndUserId(
  projectId: string,
  userId: string,
  input: CreateSectionInput,
) {
  const MAX_ATTEMPTS = 3;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await prisma.$transaction(
        async (tx) => {
          const project = await tx.project.findFirst({
            where: {
              id: projectId,
              userId,
            },
          });

          if (!project) {
            return {
              status: "not_found" as const,
            };
          }

          const section = await tx.section.create({
            data: {
              name: input.name,
              projectId,
            },
          });

          return {
            status: "created" as const,
            section,
          };
        },
        {
          isolationLevel:
            Prisma.TransactionIsolationLevel.Serializable,
        },
      );
    } catch (error) {
      const isRetryableConflict =
        error instanceof
          Prisma.PrismaClientKnownRequestError &&
        error.code === "P2034";

      if (
        !isRetryableConflict ||
        attempt === MAX_ATTEMPTS
      ) {
        throw error;
      }
    }
  }

  throw new Error("Unexpected transaction retry state");
}

export async function updateSectionByIdAndUserId(
  sectionId: string,
  userId: string,
  input: UpdateSectionInput,
) {
  return prisma.section.updateManyAndReturn({
    where: {
      id: sectionId,
      project: {
        userId,
      },
    },
    data: input,
  });
}


export async function deleteSectionByIdAndUserId(
  sectionId: string,
  userId: string,
) {
  const MAX_ATTEMPTS = 3;

  for (
    let attempt = 1;
    attempt <= MAX_ATTEMPTS;
    attempt++
  ) {
    try {
      return await prisma.$transaction(
        async (tx) => {
          // 1. Comprobar que la Section existe
          // y pertenece al usuario autenticado.
          const section = await tx.section.findFirst({
            where: {
              id: sectionId,
              project: {
                userId,
              },
            },
          });

          if (!section) {
            return {
              status: "not_found" as const,
            };
          }

          // 2. Comprobar si contiene alguna Task.
          const task = await tx.task.findFirst({
            where: {
              sectionId,
            },
          });

          if (task) {
            return {
              status: "has_tasks" as const,
            };
          }

          // 3. Ya sabemos que pertenece al usuario
          // y que no contiene Tasks.
          await tx.section.delete({
            where: {
              id: sectionId,
            },
          });

          return {
            status: "deleted" as const,
          };
        },
        {
          isolationLevel:
            Prisma.TransactionIsolationLevel.Serializable,
        },
      );
    } catch (error) {
      const isRetryableConflict =
        error instanceof
          Prisma.PrismaClientKnownRequestError &&
        error.code === "P2034";

      if (
        !isRetryableConflict ||
        attempt === MAX_ATTEMPTS
      ) {
        throw error;
      }
    }
  }

  throw new Error("Unexpected transaction retry state");
}
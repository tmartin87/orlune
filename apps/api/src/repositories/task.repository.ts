import type {
  CreateTaskInput,
  UpdateTaskInput,
} from "@orlune/shared";

import { prisma } from "../db/prisma.js";
import { Prisma } from "../generated/prisma/client.js";

export async function createTaskBySectionAndUserId(
  input: CreateTaskInput,
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
          const section = await tx.section.findFirst({
            where: {
              id: input.sectionId,
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

          const task = await tx.task.create({
            data: {
              title: input.title,
              description: input.description,
              sectionId: input.sectionId,
            },
          });

          return {
            status: "created" as const,
            task,
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

export async function findSectionTasksByUserId(
  sectionId: string,
  userId: string,
) {
  return prisma.section.findFirst({
    where: {
      id: sectionId,
      project: {
        userId,
      },
    },
    select: {
      tasks: true,
    },
  });
}

export async function updateTaskByIdAndUserId(
  taskId: string,
  userId: string,
  input: UpdateTaskInput,
) {
  return prisma.task.updateManyAndReturn({
    where: {
      id: taskId,
      section: {
        project: {
          userId,
        },
      },
    },
    data: input,
  });
}

export async function deleteTaskByIdAndUserId(
  taskId: string,
  userId: string,
) {
  return prisma.task.deleteMany({
    where: {
      id: taskId,
      section: {
        project: {
          userId,
        },
      },
    },
  });
}
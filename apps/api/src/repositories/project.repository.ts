import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "@orlune/shared";
import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../db/prisma.js";

export async function findProjectsByUserId(userId: string) {
  return prisma.project.findMany({
    where: {
     userId,
    },
  });
}

export async function createProjectWithBacklog(
  input: CreateProjectInput,
  userId: string,
) {
  return prisma.$transaction(async (tx) => {
    const project = await tx.project.create({
      data: {
        name: input.name,
        userId,
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




export async function updateProjectByIdAndUserId(projectId: string, userId: string, input: UpdateProjectInput) {
  return prisma.project.updateManyAndReturn({
    where: {
      id: projectId,
      userId,
    },
    data: input,
  });
}

export async function deleteProjectByIdAndUserId(
  projectId: string,
  userId: string,
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

          const task = await tx.task.findFirst({
            where: {
              section: {
                projectId,
              },
            },
          });

          if (task) {
            return {
              status: "has_tasks" as const,
            };
          }

          await tx.project.delete({
            where: {
              id: projectId,
              userId,
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
        error instanceof Prisma.PrismaClientKnownRequestError &&
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
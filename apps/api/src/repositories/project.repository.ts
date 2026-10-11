import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "@orlune/shared";
import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../db/prisma.js";
import { landingBlockSchema } from "@orlune/shared";

export async function findProjectsByUserId(userId: string) {
  const projects = await prisma.project.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      publishedAt: true,
      _count: {
        select: {
          blocks: true,
        },
      },
      blocks: {
        where: {
          type: {
            in: ["hero", "imageText"],
          },
        },
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          type: true,
          content: true,
        },
      },
    },
  });

  return projects.map((project) => {
    let coverImageUrl: string | null = null;

    for (const block of project.blocks) {
      const result = landingBlockSchema.safeParse(block);

      if (!result.success) {
        continue;
      }

      const parsedBlock = result.data;

      if (
        parsedBlock.type !== "hero" &&
        parsedBlock.type !== "imageText"
      ) {
        continue;
      }

      const imageUrl = parsedBlock.content.imageUrl?.trim();

      if (imageUrl) {
        coverImageUrl = imageUrl;
        break;
      }
    }

    return {
      id: project.id,
      name: project.name,
      publishedAt: project.publishedAt?.toISOString() ?? null,
      blockCount: project._count.blocks,
      coverImageUrl,
    };
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

export async function findProjectByIdAndUserId(
  projectId: string,
  userId: string,
) {
  return prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
    select: {
      id: true,
    },
  });
}
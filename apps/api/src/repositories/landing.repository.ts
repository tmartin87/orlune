import type { SaveLandingInput } from "@orlune/shared";
import { prisma } from "../db/prisma.js";

export async function findLandingByProjectIdAndUserId(
  projectId: string,
  userId: string,
) {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
    select: {
      id: true,
      blocks: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!project) {
    return null;
  }

  return project.blocks;
}

export async function replaceLandingByProjectIdAndUserId(
  projectId: string,
  userId: string,
  input: SaveLandingInput,
) {
  return prisma.$transaction(async (tx) => {
    const project = await tx.project.findFirst({
      where: {
        id: projectId,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!project) {
      return null;
    }

    await tx.landingBlock.deleteMany({
      where: {
        projectId,
      },
    });

    if (input.blocks.length > 0) {
      await tx.landingBlock.createMany({
        data: input.blocks.map((block, position) => ({
          id: block.id,
          projectId,
          type: block.type,
          position,
          content: block.content,
        })),
      });
    }

    return tx.landingBlock.findMany({
      where: {
        projectId,
      },
      orderBy: {
        position: "asc",
      },
    });

  });
}

export async function publishLandingByProjectIdAndUserId(
  projectId: string,
  userId: string,
) {
  return prisma.$transaction(async (tx) => {
    const project = await tx.project.findFirst({
      where: {
        id: projectId,
        userId,
      },
      select: {
        blocks: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    if (!project) {
      return null;
    }

    const publishedBlocks = project.blocks.map((block) => ({
      id: block.id,
      type: block.type,
      content: block.content,
    }));

    return tx.project.update({
      where: {
        id: projectId,
        userId,
      },
      data: {
        publishedBlocks,
        publishedAt: new Date(),
      },
      select: {
        id: true,
        publishedAt: true,
      },
    });
  });
}

export async function findPublishedLandingByProjectId(
  projectId: string,
) {
  return prisma.project.findFirst({
    where: {
      id: projectId,
      publishedAt: {
        not: null,
      },
    },
    select: {
      name: true,
      publishedBlocks: true,
      publishedAt: true,
    },
  });
}
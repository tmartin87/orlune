import type { SaveLandingInput } from "@orlune/shared";
import { saveLandingSchema } from "@orlune/shared";

import { NotFoundError } from "../errors/not-found.error.js";

import {
  findLandingByProjectIdAndUserId,
  replaceLandingByProjectIdAndUserId,
   publishLandingByProjectIdAndUserId,
  findPublishedLandingByProjectId,
} from "../repositories/landing.repository.js";

export async function getLanding(
  projectId: string,
  userId: string,
) {
  const blocks = await findLandingByProjectIdAndUserId(
    projectId,
    userId,
  );

  if (blocks === null) {
    throw new NotFoundError("Project not found");
  }

  return blocks;
}

export async function saveLanding(
  projectId: string,
  userId: string,
  input: SaveLandingInput,
) {
  const blocks = await replaceLandingByProjectIdAndUserId(
    projectId,
    userId,
    input,
  );

  if (blocks === null) {
    throw new NotFoundError("Project not found");
  }

  return blocks;
}

export async function publishLanding(
  projectId: string,
  userId: string,
) {
  const publication = await publishLandingByProjectIdAndUserId(
    projectId,
    userId,
  );

  if (publication === null) {
    throw new NotFoundError("Project not found");
  }

  return publication;
}

export async function getPublishedLanding(projectId: string) {
  const publication = await findPublishedLandingByProjectId(
    projectId,
  );

  if (!publication) {
    throw new NotFoundError("Published landing not found");
  }

  const { blocks } = saveLandingSchema.parse({
    blocks: publication.publishedBlocks,
  });

  return {
    name: publication.name,
    blocks,
    publishedAt: publication.publishedAt,
  };
}
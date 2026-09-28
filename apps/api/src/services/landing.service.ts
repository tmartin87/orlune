import type { SaveLandingInput } from "@orlune/shared";

import { NotFoundError } from "../errors/not-found.error.js";

import {
  findLandingByProjectIdAndUserId,
  replaceLandingByProjectIdAndUserId,
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
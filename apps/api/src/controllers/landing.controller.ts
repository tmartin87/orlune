import type { Request, Response } from "express";

import {
  saveLandingSchema,
  type SaveLandingInput,
} from "@orlune/shared";

import {
  getLanding,
  saveLanding,
} from "../services/landing.service.js";

type LandingParams = {
  projectId: string;
};

export async function getLandingController(
  req: Request<LandingParams>,
  res: Response,
) {
  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const { projectId } = req.params;

  const blocks = await getLanding(
    projectId,
    req.user.id,
  );

  res.json({
    blocks,
  });
}

export async function saveLandingController(
  req: Request<LandingParams>,
  res: Response,
) {
  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const { projectId } = req.params;

  const input: SaveLandingInput =
    saveLandingSchema.parse(req.body);

  const blocks = await saveLanding(
    projectId,
    req.user.id,
    input,
  );

  res.json({
    blocks,
  });
}
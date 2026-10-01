import type { Request, Response } from "express";

import {
  createImageUploadSignature,
} from "../services/upload.service.js";

type UploadParams = {
  projectId: string;
};

export async function createImageUploadSignatureController(
  req: Request<UploadParams>,
  res: Response,
) {
  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const uploadAuthorization = await createImageUploadSignature(
    req.params.projectId,
    req.user.id,
  );

  res.setHeader("Cache-Control", "no-store");
  res.json(uploadAuthorization);
}
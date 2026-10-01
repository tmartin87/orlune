import { randomUUID } from "node:crypto";

import { cloudinary } from "../lib/cloudinary.js";
import { NotFoundError } from "../errors/not-found.error.js";
import {
  findProjectByIdAndUserId,
} from "../repositories/project.repository.js";

export async function createImageUploadSignature(
  projectId: string,
  userId: string,
) {
  const project = await findProjectByIdAndUserId(
    projectId,
    userId,
  );

  if (!project) {
    throw new NotFoundError("Project not found");
  }

  const config = cloudinary.config();

  if (!config.cloud_name || !config.api_key || !config.api_secret) {
    throw new Error("Cloudinary configuration is missing");
  }

  const params = {
    timestamp: Math.floor(Date.now() / 1000),
    public_id: `orlune/${project.id}/${randomUUID()}`,
    upload_preset: "orlune_hero_images",
    overwrite: false,
  };

  const signature = cloudinary.utils.api_sign_request(
    params,
    config.api_secret,
  );

  return {
    cloudName: config.cloud_name,
    apiKey: config.api_key,
    signature,
    params,
  };
}
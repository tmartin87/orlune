import { api } from "../../lib/api";

type UploadAuthorization = {
  cloudName: string;
  apiKey: string;
  signature: string;
  params: {
    timestamp: number;
    public_id: string;
    upload_preset: string;
    overwrite: boolean;
  };
};

export async function uploadHeroImage(
  projectId: string,
  file: File,
): Promise<string> {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Choose a JPG, PNG or WebP image.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("The image must be 5 MB or smaller.");
  }

  const authorization = await api<UploadAuthorization>(
    `/projects/${encodeURIComponent(projectId)}/images/upload-signature`,
    {
      method: "POST",
    },
  );

  const formData = new FormData();

  formData.append("file", file);
  formData.append("api_key", authorization.apiKey);
  formData.append("signature", authorization.signature);

  for (const [key, value] of Object.entries(authorization.params)) {
    formData.append(key, String(value));
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${encodeURIComponent(
      authorization.cloudName,
    )}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Could not upload image. Please try again.");
  }

  const result: unknown = await response.json();

  if (
    typeof result !== "object" ||
    result === null ||
    !("secure_url" in result) ||
    typeof result.secure_url !== "string"
  ) {
    throw new Error("The upload response did not contain an image URL.");
  }

  return result.secure_url;
}
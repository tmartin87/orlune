import type { LandingBlock } from "@orlune/shared";
import { api } from "../../lib/api";

export type PublishedLanding = {
  name: string;
  blocks: LandingBlock[];
  publishedAt: string;
};

export async function getPublishedLanding(
  projectId: string,
): Promise<PublishedLanding> {
  const response = await fetch(
    `http://localhost:3000/public/landings/${encodeURIComponent(projectId)}`,
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("This landing is not published.");
    }

    throw new Error("Could not load this landing.");
  }

  return response.json();
}
export type LandingPublication = {
  id: string;
  publishedAt: string;
};

export function publishLanding(projectId: string) {
  return api<LandingPublication>(
    `/projects/${encodeURIComponent(projectId)}/landing/publish`,
    {
      method: "POST",
    },
  );
}
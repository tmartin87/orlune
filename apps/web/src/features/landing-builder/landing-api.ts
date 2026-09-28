import type {
  LandingBlock,
  SaveLandingInput,
} from "@orlune/shared";

import { api } from "../../lib/api";

type LandingResponse = {
  blocks: LandingBlock[];
};

export function getLanding(projectId: string) {
  return api<LandingResponse>(
    `/projects/${projectId}/landing`,
  );
}

export function saveLanding(
  projectId: string,
  input: SaveLandingInput,
) {
  return api<LandingResponse>(
    `/projects/${projectId}/landing`,
    {
      method: "PUT",
      body: JSON.stringify(input),
    },
  );
}
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { SaveLandingInput } from "@orlune/shared";

import { publishLanding, saveLanding } from "./landing-api";

type PublishLandingVariables = {
  projectId: string;
  input: SaveLandingInput;
};

export function usePublishLanding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectId,
      input,
    }: PublishLandingVariables) => {
      const savedLanding = await saveLanding(projectId, input);

      queryClient.setQueryData(
        ["landing", projectId],
        savedLanding,
      );

      return publishLanding(projectId);
    },

    onSuccess: (_publication, variables) => {
      return queryClient.invalidateQueries({
        queryKey: ["published-landing", variables.projectId],
      });
    },
  });
}
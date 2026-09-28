import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { SaveLandingInput } from "@orlune/shared";

import { saveLanding } from "./landing-api";

type SaveLandingVariables = {
  projectId: string;
  input: SaveLandingInput;
};

export function useSaveLanding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      input,
    }: SaveLandingVariables) =>
      saveLanding(projectId, input),

    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ["landing", variables.projectId],
        data,
      );
    },
  });
}
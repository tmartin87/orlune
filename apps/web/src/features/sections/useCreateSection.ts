import type { CreateSectionInput } from "@orlune/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createSection } from "./sections-api";

type CreateSectionVariables = {
  projectId: string;
  input: CreateSectionInput;
};

export function useCreateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, input }: CreateSectionVariables) =>
      createSection(projectId, input),

    onSuccess: (_section, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["sections", variables.projectId],
      });
    },
  });
}
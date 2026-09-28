import type { UpdateSectionInput } from "@orlune/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSection } from "./sections-api";

type UpdateSectionVariables = {
  sectionId: string;
  projectId: string;
  input: UpdateSectionInput;
};

export function useUpdateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId, input }: UpdateSectionVariables) =>
      updateSection(sectionId, input),

    onSuccess: (_section, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["sections", variables.projectId],
      });
    },
  });
}
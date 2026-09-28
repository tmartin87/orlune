import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteSection } from "./sections-api";

type DeleteSectionVariables = {
  sectionId: string;
  projectId: string;
};

export function useDeleteSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId }: DeleteSectionVariables) =>
      deleteSection(sectionId),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["sections", variables.projectId],
      });
    },
  });
}
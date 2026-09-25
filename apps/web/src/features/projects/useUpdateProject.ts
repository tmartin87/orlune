import type { UpdateProjectInput } from "@orlune/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProject } from "./projects-api";

type UpdateProjectVariables = {
  projectId: string;
  input: UpdateProjectInput;
};

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, input }: UpdateProjectVariables) =>
      updateProject(projectId, input),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}
import type { CreateTaskInput } from "@orlune/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTask } from "./tasks-api";

type CreateTaskVariables = {
  sectionId: string;
  input: CreateTaskInput;
};

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId, input }: CreateTaskVariables) =>
      createTask(sectionId, input),

    onSuccess: (_task, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.sectionId],
      });
    },
  });
}
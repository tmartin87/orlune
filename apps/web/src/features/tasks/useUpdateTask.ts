import type { UpdateTaskInput } from "@orlune/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTask } from "./tasks-api";

type UpdateTaskVariables = {
  taskId: string;
  sectionId: string;
  input: UpdateTaskInput;
};

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, input }: UpdateTaskVariables) =>
      updateTask(taskId, input),

    onSuccess: (_task, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.sectionId],
      });
    },
  });
}
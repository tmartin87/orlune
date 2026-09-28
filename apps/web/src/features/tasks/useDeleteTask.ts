import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTask } from "./tasks-api";

type DeleteTaskVariables = {
  taskId: string;
  sectionId: string;
};

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId }: DeleteTaskVariables) =>
      deleteTask(taskId),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.sectionId],
      });
    },
  });
}
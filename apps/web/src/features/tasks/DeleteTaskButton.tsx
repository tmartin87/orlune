import { ApiError } from "../../lib/api";
import { useDeleteTask } from "./useDeleteTask";

type DeleteTaskButtonProps = {
  taskId: string;
  sectionId: string;
};

export function DeleteTaskButton({
  taskId,
  sectionId,
}: DeleteTaskButtonProps) {
  const deleteTaskMutation = useDeleteTask();

  return (
    <>
      <button
        type="button"
        disabled={deleteTaskMutation.isPending}
        onClick={() =>
          deleteTaskMutation.mutate({
            taskId,
            sectionId,
          })
        }
      >
        {deleteTaskMutation.isPending ? "Deleting..." : "Delete"}
      </button>

      {deleteTaskMutation.isError && (
        <span>
          {deleteTaskMutation.error instanceof ApiError
            ? deleteTaskMutation.error.message
            : "Something went wrong. Please try again."}
        </span>
      )}
    </>
  );
}
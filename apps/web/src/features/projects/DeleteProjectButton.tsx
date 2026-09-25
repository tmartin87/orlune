import { useDeleteProject } from "./useDeleteProject";
import { ApiError } from "../../lib/api";

type DeleteProjectButtonProps = {
  projectId: string;
};

export function DeleteProjectButton({ projectId }: DeleteProjectButtonProps) {
  const deleteProjectMutation = useDeleteProject();

  const handleDelete = () => {
    deleteProjectMutation.mutate(projectId);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleteProjectMutation.isPending}
      >
        {deleteProjectMutation.isPending ? "Deleting..." : "Delete"}
      </button>

      {deleteProjectMutation.isError && (
        <span>
          {deleteProjectMutation.error instanceof ApiError
            ? deleteProjectMutation.error.message
            : "Something went wrong. Please try again."}
        </span>
      )}
    </>
  );
}

import { useState } from "react";

import { useDeleteProject } from "./useDeleteProject";
import { ApiError } from "../../lib/api";

type DeleteProjectButtonProps = {
  projectId: string;
};

export function DeleteProjectButton({
  projectId,
}: DeleteProjectButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const deleteProjectMutation = useDeleteProject();

  const handleCancel = () => {
    setIsConfirming(false);
    deleteProjectMutation.reset();
  };

  return (
    <div className="space-y-3 border-t border-slate-100 pt-4">
      {isConfirming ? (
        <div className="space-y-3 rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-800">
            Delete this project? Its draft and published landing
            will be deleted. This cannot be undone.
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => deleteProjectMutation.mutate(projectId)}
              disabled={deleteProjectMutation.isPending}
              className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-wait disabled:opacity-60"
            >
              {deleteProjectMutation.isPending
                ? "Deleting..."
                : "Delete project"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={deleteProjectMutation.isPending}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsConfirming(true)}
          className="text-sm font-medium text-red-600 hover:text-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Delete project
        </button>
      )}

      {deleteProjectMutation.isError && (
        <p role="alert" className="text-sm text-red-600">
          {deleteProjectMutation.error instanceof ApiError
            ? deleteProjectMutation.error.message
            : "Could not delete project. Please try again."}
        </p>
      )}
    </div>
  );
}

import { ApiError } from "../../lib/api";
import { useDeleteSection } from "./useDeleteSection";

type DeleteSectionButtonProps = {
  sectionId: string;
  projectId: string;
};

export function DeleteSectionButton({
  sectionId,
  projectId,
}: DeleteSectionButtonProps) {
  const deleteSectionMutation = useDeleteSection();

  const handleDelete = () => {
    deleteSectionMutation.mutate({
      sectionId,
      projectId,
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleteSectionMutation.isPending}
      >
        {deleteSectionMutation.isPending ? "Deleting..." : "Delete"}
      </button>

      {deleteSectionMutation.isError && (
        <span>
          {deleteSectionMutation.error instanceof ApiError
            ? deleteSectionMutation.error.message
            : "Something went wrong. Please try again."}
        </span>
      )}
    </>
  );
}
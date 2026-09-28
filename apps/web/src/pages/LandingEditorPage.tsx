import { useParams } from "react-router-dom";

import type { LandingBlock } from "@orlune/shared";

import { LandingEditor } from "../features/landing-builder/editor/LandingEditor";
import { useLanding } from "../features/landing-builder/useLanding";
import { useSaveLanding } from "../features/landing-builder/useSaveLanding";

export function LandingEditorPage() {
  const { projectId } = useParams<{ projectId: string }>();

  if (!projectId) {
    return <p>Project not found.</p>;
  }

  return <LandingEditorPageContent projectId={projectId} />;
}

type LandingEditorPageContentProps = {
  projectId: string;
};

function LandingEditorPageContent({
  projectId,
}: LandingEditorPageContentProps) {
  const {
    data,
    isPending,
    isError,
  } = useLanding(projectId);

  const saveLandingMutation = useSaveLanding();

  if (isPending) {
    return <p>Loading landing...</p>;
  }

  if (isError) {
    return <p>Could not load landing.</p>;
  }

  const handleSave = (blocks: LandingBlock[]) => {
    saveLandingMutation.mutate({
      projectId,
      input: {
        blocks,
      },
    });
  };

  return (
    <>
      <LandingEditor
        initialBlocks={data.blocks}
        onSave={handleSave}
        isSaving={saveLandingMutation.isPending}
      />

      {saveLandingMutation.isSuccess && (
        <p>Landing saved.</p>
      )}

      {saveLandingMutation.isError && (
        <p>Could not save landing.</p>
      )}
    </>
  );
}
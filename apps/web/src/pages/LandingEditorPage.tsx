import { Link, useParams } from "react-router-dom";

import type { LandingBlock } from "@orlune/shared";

import { LandingEditor } from "../features/landing-builder/editor/LandingEditor";
import { useLanding } from "../features/landing-builder/useLanding";
import { useSaveLanding } from "../features/landing-builder/useSaveLanding";
import { usePublishLanding } from "../features/landing-builder/usePublishLanding";

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
  const { data, isPending, isError } = useLanding(projectId);

  const saveLandingMutation = useSaveLanding();
  const publishLandingMutation = usePublishLanding();

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

  const handlePublish = (blocks: LandingBlock[]) => {
    publishLandingMutation.mutate({
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
        onPublish={handlePublish}
        isPublishing={publishLandingMutation.isPending}
      />

      {saveLandingMutation.isSuccess && <p>Landing saved.</p>}

      {saveLandingMutation.isError && (
        <p>Could not save landing.</p>
      )}

      {publishLandingMutation.isSuccess && (
        <p role="status" className="p-4 text-green-700">
          Landing published.{" "}
          <Link
            to={`/p/${projectId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Open public landing
          </Link>
        </p>
      )}

      {publishLandingMutation.isError && (
        <p role="alert" className="p-4 text-red-600">
          Could not publish landing. Please try again.
        </p>
      )}
    </>
  );
}
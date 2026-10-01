import { useState } from "react";
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

  return (
    <LandingEditorPageContent
      key={projectId}
      projectId={projectId}
    />
  );
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

  const [draftVersion, setDraftVersion] = useState(0);
  const [savedVersion, setSavedVersion] = useState<number | null>(
    null,
  );
  const [publishedVersion, setPublishedVersion] = useState<
    number | null
  >(null);

  if (isPending) {
    return <p>Loading landing...</p>;
  }

  if (isError) {
    return <p>Could not load landing.</p>;
  }

  const handleDraftChange = () => {
    setDraftVersion((version) => version + 1);
  };

  const handleSave = (blocks: LandingBlock[]) => {
    setSavedVersion(draftVersion);

    saveLandingMutation.mutate({
      projectId,
      input: {
        blocks,
      },
    });
  };

  const handlePublish = (blocks: LandingBlock[]) => {
    setPublishedVersion(draftVersion);

    publishLandingMutation.mutate({
      projectId,
      input: {
        blocks,
      },
    });
  };

  return (
    <LandingEditor
    projectId={projectId}
      initialBlocks={data.blocks}
      onSave={handleSave}
      isSaving={saveLandingMutation.isPending}
      onPublish={handlePublish}
      isPublishing={publishLandingMutation.isPending}
      onDraftChange={handleDraftChange}
      feedback={
        <>
          {saveLandingMutation.isSuccess &&
            savedVersion === draftVersion && (
              <p role="status" className="text-sm text-green-700">
                Landing saved.
              </p>
            )}

          {saveLandingMutation.isError &&
            savedVersion === draftVersion && (
              <p role="alert" className="text-sm text-red-600">
                Could not save landing.
              </p>
            )}

          {publishLandingMutation.isSuccess &&
            publishedVersion === draftVersion && (
              <p role="status" className="text-sm text-green-700">
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

          {publishLandingMutation.isError &&
            publishedVersion === draftVersion && (
              <p role="alert" className="text-sm text-red-600">
                Could not publish landing. Please try again.
              </p>
            )}
        </>
      }
    />
  );
}
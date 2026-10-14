import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import type { LandingBlock } from "@orlune/shared";

import { LandingEditor } from "../features/landing-builder/editor/LandingEditor";
import { useLanding } from "../features/landing-builder/useLanding";
import { useSaveLanding } from "../features/landing-builder/useSaveLanding";
import { usePublishLanding } from "../features/landing-builder/usePublishLanding";

type Notice = {
  type: "success" | "error";
  message: string;
};

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
  const [savedVersion, setSavedVersion] = useState<number | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [noticePaused, setNoticePaused] = useState(false);

  useEffect(() => {
    if (!notice || notice.type !== "success" || noticePaused) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setNotice(null);
    }, 8000);

    return () => window.clearTimeout(timeout);
  }, [notice, noticePaused]);

  const handleDraftChange = () => {
    setDraftVersion((version) => version + 1);
  };

  const handleSave = (blocks: LandingBlock[]) => {
    const versionToSave = draftVersion;

    setNotice(null);

    saveLandingMutation.mutate(
      {
        projectId,
        input: { blocks },
      },
      {
        onSuccess: () => {
          setSavedVersion(versionToSave);
        },
        onError: () => {
          setNotice({
            type: "error",
            message: "Could not save landing. Please try again.",
          });
        },
      },
    );
  };

  const handlePublish = (blocks: LandingBlock[]) => {
    const versionToPublish = draftVersion;

    setNotice(null);

    publishLandingMutation.mutate(
      {
        projectId,
        input: { blocks },
      },
      {
        onSuccess: () => {
          setSavedVersion(versionToPublish);
          setNotice({
            type: "success",
            message: "Landing published.",
          });
        },
        onError: () => {
          setNotice({
            type: "error",
            message: "Could not publish landing. Please try again.",
          });
        },
      },
    );
  };

  if (isPending) {
    return <p>Loading landing...</p>;
  }

  if (isError) {
    return <p>Could not load landing.</p>;
  }

  return (
    <>
      <LandingEditor
        projectId={projectId}
        initialBlocks={data.blocks}
        onSave={handleSave}
        isSaving={saveLandingMutation.isPending}
        isSaved={savedVersion === draftVersion}
        onPublish={handlePublish}
        isPublishing={publishLandingMutation.isPending}
        onDraftChange={handleDraftChange}
      />

      {notice && (
        <div
          className="fixed bottom-6 right-4 z-[100] w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-lg sm:right-6"
          onMouseEnter={() => setNoticePaused(true)}
          onMouseLeave={() => setNoticePaused(false)}
          onFocusCapture={() => setNoticePaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setNoticePaused(false);
            }
          }}
        >
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              <p
                role={notice.type === "error" ? "alert" : "status"}
                className={`text-sm font-medium ${
                  notice.type === "error"
                    ? "text-red-700"
                    : "text-emerald-700"
                }`}
              >
                {notice.message}
              </p>

              {notice.type === "success" && (
                <Link
                  to={`/p/${projectId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block rounded text-sm font-medium text-sky-700 underline underline-offset-4 hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
                >
                  Open public landing
                </Link>
              )}
            </div>

            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => {
                setNotice(null);
                setNoticePaused(false);
              }}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-sky-700"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
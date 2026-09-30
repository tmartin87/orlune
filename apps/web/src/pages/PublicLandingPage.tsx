import { useParams } from "react-router-dom";

import { BlockRenderer } from "../features/landing-builder/blocks/BlockRenderer";
import { usePublishedLanding } from "../features/landing-builder/usePublishedLanding";

export function PublicLandingPage() {
  const { projectId } = useParams<{ projectId: string }>();

  if (!projectId) {
    return <p className="p-8">Landing not found.</p>;
  }

  return <PublicLandingContent projectId={projectId} />;
}

type PublicLandingContentProps = {
  projectId: string;
};

function PublicLandingContent({
  projectId,
}: PublicLandingContentProps) {
  const { data, isPending, isError, error } =
    usePublishedLanding(projectId);

  if (isPending) {
    return (
      <p role="status" className="p-8 text-center text-slate-500">
        Loading landing...
      </p>
    );
  }

  if (isError) {
    return (
      <p role="alert" className="p-8 text-center text-red-600">
        {error.message}
      </p>
    );
  }

  return (
    <main aria-label={data.name} className="min-h-screen bg-white">
      {data.blocks.length === 0 ? (
        <p className="p-8 text-center text-slate-500">
          This landing has no content yet.
        </p>
      ) : (
        data.blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))
      )}
    </main>
  );
}
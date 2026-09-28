import { Link, useParams } from "react-router-dom";

import { CreateSectionForm } from "../features/sections/CreateSectionForm";
import { useSections } from "../features/sections/useSections";
import { DeleteSectionButton } from "../features/sections/DeleteSectionButton";
import { UpdateSectionForm } from "../features/sections/UpdateSectionForm";

export function ProjectPage() {
  const { projectId } = useParams();

  const {
    data: sections,
    isPending,
    isError,
  } = useSections(projectId);

  if (!projectId) {
    return <p>Project not found.</p>;
  }

  if (isPending) {
    return <p>Loading sections...</p>;
  }

  if (isError) {
    return <p>Failed to load sections.</p>;
  }

  return (
    <main>
      <Link to="/projects">Back to projects</Link>

      <h1>Project</h1>

      <CreateSectionForm projectId={projectId} />

      <ul>
        {sections?.map((section) => (
          <li key={section.id}>
            {section.name}

            <UpdateSectionForm
              sectionId={section.id}
              projectId={projectId}
              currentName={section.name}
            />

            <DeleteSectionButton sectionId={section.id} projectId={projectId} />
          </li>
        ))}
      </ul>
    </main>
  );
}
import { Link, useParams } from "react-router-dom";

import { CreateSectionForm } from "../features/sections/CreateSectionForm";
import { DeleteSectionButton } from "../features/sections/DeleteSectionButton";
import { UpdateSectionForm } from "../features/sections/UpdateSectionForm";
import { useSections } from "../features/sections/useSections";
import { SectionTasks } from "../features/tasks/SectionTasks";

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
            <span>{section.name}</span>

            <UpdateSectionForm
              sectionId={section.id}
              projectId={projectId}
              currentName={section.name}
            />

            <DeleteSectionButton
              sectionId={section.id}
              projectId={projectId}
            />

            <SectionTasks sectionId={section.id} />
          </li>
        ))}
      </ul>
    </main>
  );
}
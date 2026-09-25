import { useNavigate } from "react-router-dom";
import { useProjects } from "../features/projects/useProjects";
import { useAuth } from "../features/auth/useAuth";
import { CreateProjectForm } from "../features/projects/CreateProjectForm";
import { DeleteProjectButton } from "../features/projects/DeleteProjectButton";
import { UpdateProjectForm } from "../features/projects/UpdateProjectForm";
export function ProjectsPage() {
  const { data: projects, isPending, isError } = useProjects();

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isPending) {
    return <p>Loading projects...</p>;
  }

  if (isError) {
    return <p>Failed to load projects.</p>;
  }
  return (
    <main>
      <h1>Projects</h1>

      <CreateProjectForm />

      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <span>{project.name}</span>

            <UpdateProjectForm
              projectId={project.id}
              currentName={project.name}
            />

            <DeleteProjectButton projectId={project.id} />
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </main>
  );
}

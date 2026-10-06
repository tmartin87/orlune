import { Link, useNavigate } from "react-router-dom";

import { useProjects } from "../features/projects/useProjects";
import { useAuth } from "../features/auth/useAuth";
import { CreateProjectForm } from "../features/projects/CreateProjectForm";
import { DeleteProjectButton } from "../features/projects/DeleteProjectButton";
import { UpdateProjectForm } from "../features/projects/UpdateProjectForm";

export function ProjectsPage() {
  const {
    data: projects,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useProjects();

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <Link
            to="/projects"
            aria-label="Orlune projects"
            className="flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white"
            >
              O
            </span>

            <span className="text-xl font-semibold tracking-tight text-slate-900">
              Orlune
            </span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Your projects
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Create a landing page and bring your next idea to life.
          </p>
        </div>

        <section
          aria-labelledby="create-project-title"
          className="rounded-2xl border border-slate-200 bg-white p-6"
        >
          <h2
            id="create-project-title"
            className="text-lg font-semibold text-slate-900"
          >
            Start something new
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Give your project a name. You can change it later.
          </p>

          <div className="mt-5">
            <CreateProjectForm />
          </div>
        </section>

        <section aria-labelledby="project-list-title">
          <h2
            id="project-list-title"
            className="mb-4 text-lg font-semibold text-slate-900"
          >
            Your landing pages
          </h2>

          {isPending ? (
            <p
              role="status"
              className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500"
            >
              Loading projects...
            </p>
          ) : isError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
              <p role="alert" className="text-sm text-red-700">
                Could not load your projects.
              </p>

              <button
                type="button"
                onClick={() => void refetch()}
                disabled={isFetching}
                className="mt-3 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
              >
                {isFetching ? "Retrying..." : "Try again"}
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 px-6 py-14 text-center">
              <h3 className="text-lg font-medium text-slate-900">
                Your first landing starts here
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Create a project above to open the editor.
              </p>
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="break-words text-lg font-semibold text-slate-900">
                    <Link
                      to={`/projects/${project.id}/editor`}
                      className="hover:text-indigo-600"
                    >
                      {project.name}
                    </Link>
                  </h3>

                  <Link
                    to={`/projects/${project.id}/editor`}
                    className="mt-5 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Open editor →
                  </Link>

                  <details className="mt-5 border-t border-slate-100 pt-4">
                    <summary className="cursor-pointer text-sm font-medium text-slate-500 hover:text-slate-900">
                      Project settings
                    </summary>

                    <div className="mt-4 space-y-4">
                      <UpdateProjectForm
                        projectId={project.id}
                        currentName={project.name}
                      />

                      <DeleteProjectButton projectId={project.id} />
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
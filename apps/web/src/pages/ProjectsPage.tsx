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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link
            to="/projects"
            aria-label="Orlune projects"
            className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500"
          >
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white"
            >
              O
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Orlune
            </span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-10 px-6 py-10 sm:py-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Your workspace
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Ideas start here.
          </h1>
          <p className="mt-3 max-w-xl leading-relaxed text-slate-500">
            Create a new landing or pick up where you left off.
          </p>
        </div>

        <section
          aria-labelledby="create-project-title"
          className="grid gap-6 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm lg:grid-cols-[1fr_1.5fr] lg:items-center lg:gap-10 lg:p-8"
        >
          <div>
            <h2
              id="create-project-title"
              className="text-lg font-semibold"
            >
              Start something new
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Give your idea a name. Build the rest one block at a time.
            </p>
          </div>

          <div className="min-w-0">
            <CreateProjectForm />
          </div>
        </section>

        <section aria-labelledby="project-list-title">
          <div className="mb-5 flex items-center gap-3">
            <h2
              id="project-list-title"
              className="text-lg font-semibold"
            >
              Your projects
            </h2>

            {!isPending && !isError && (
              <span className="rounded-full bg-slate-200/70 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                {projects.length}
              </span>
            )}
          </div>

          {isPending ? (
            <p
              role="status"
              className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500"
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
                className="mt-4 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:opacity-50"
              >
                {isFetching ? "Retrying..." : "Try again"}
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <span
                aria-hidden="true"
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl text-indigo-600"
              >
                +
              </span>
              <h3 className="mt-5 text-lg font-semibold">
                A blank canvas for your next idea
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                Create your first project using the form above, then
                make it yours in the editor.
              </p>
            </div>
          ) : (
            <ul className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <Link
                    to={`/projects/${project.id}/editor`}
                    className="group block rounded-t-2xl p-6 transition-colors hover:bg-indigo-50/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        aria-hidden="true"
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-lg font-semibold text-indigo-600"
                      >
                        {project.name.trim().charAt(0).toUpperCase() || "O"}
                      </span>

                      
                    </div>

                    <h3 className="mt-5 break-words text-lg font-semibold group-hover:text-indigo-700">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-indigo-600">
                      Open editor
                    </p>
                  </Link>

                  <details className="border-t border-slate-100">
                    <summary className="cursor-pointer rounded-b-2xl px-6 py-4 text-sm font-medium text-slate-500 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                      Project settings
                    </summary>

                    <div className="space-y-5 px-6 pb-6">
                      <UpdateProjectForm
                        projectId={project.id}
                        currentName={project.name}
                      />

                      <div className="border-t border-slate-100 pt-4">
                        <DeleteProjectButton projectId={project.id} />
                      </div>
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
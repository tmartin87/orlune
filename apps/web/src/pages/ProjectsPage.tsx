import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useProjects } from "../features/projects/useProjects";
import { useAuth } from "../features/auth/useAuth";
import { CreateProjectForm } from "../features/projects/CreateProjectForm";
import { DeleteProjectButton } from "../features/projects/DeleteProjectButton";
import { UpdateProjectForm } from "../features/projects/UpdateProjectForm";

export function ProjectsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

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
    <div className="min-h-screen bg-[#edf5fa] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-sky-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link
            to="/projects"
            aria-label="Orlune projects"
            className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
          >
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-700 text-lg font-bold text-white"
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
            className="rounded-lg border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-800 transition-colors hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 sm:py-12">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <h1
                id="projects-title"
                className="text-3xl font-bold tracking-tight"
              >
                Your projects
              </h1>

              {!isPending && !isError && (
                <span className="rounded-full border border-sky-200 bg-white px-2.5 py-0.5 text-xs font-semibold text-sky-800">
                  {projects.length}
                </span>
              )}
            </div>

            <p className="mt-2 text-sm text-slate-600">
              Create a new landing or pick up where you left off.
            </p>
          </div>

          <button
            type="button"
            aria-expanded={isCreateOpen}
            aria-controls="create-project-panel"
            onClick={() => setIsCreateOpen((current) => !current)}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            <span aria-hidden="true">
              {isCreateOpen ? "−" : "+"}
            </span>

            {isCreateOpen ? "Close form" : "New project"}
          </button>
        </div>

        <section
          id="create-project-panel"
          aria-labelledby="create-project-title"
          hidden={!isCreateOpen}
          className="mt-6 rounded-2xl border border-sky-200 bg-gradient-to-r from-[#dceef9] to-[#eaf4fb] p-6"
        >
          <div className="mb-5">
            <h2
              id="create-project-title"
              className="text-lg font-semibold"
            >
              Start something new
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Give your idea a name. Build the rest one block at a time.
            </p>
          </div>

          <CreateProjectForm />
        </section>

        <section
          aria-labelledby="projects-title"
          className="mt-8"
        >
          {isPending ? (
            <p
              role="status"
              className="rounded-2xl border border-sky-100 bg-white p-10 text-center text-sm text-slate-500"
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
            <div className="rounded-2xl border border-dashed border-sky-300 bg-white px-6 py-16 text-center">
              <span
                aria-hidden="true"
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-2xl text-sky-700"
              >
                +
              </span>

              <h2 className="mt-5 text-xl font-semibold">
                A blank canvas for your next idea
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
                Choose New project to create your first landing,
                then make it yours in the editor.
              </p>
            </div>
          ) : (
            <ul className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="min-w-0 rounded-2xl border border-sky-100 bg-white shadow-sm"
                >
                  <Link
                    to={`/projects/${project.id}/editor`}
                    className="group block rounded-t-2xl transition-colors hover:bg-sky-50/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-t-2xl border-b border-sky-100 bg-gradient-to-br from-[#e0f0fa] via-[#c4e0f1] to-[#8ebedc]">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center justify-center text-5xl font-semibold text-sky-800"
                      >
                        {project.name.trim().charAt(0).toUpperCase() || "O"}
                      </span>

                      {project.coverImageUrl && (
                        <img
                          key={project.coverImageUrl}
                          src={project.coverImageUrl}
                          alt=""
                          loading="lazy"
                          className="absolute inset-0 h-full w-full bg-white object-cover"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                    </div>

                    <div className="p-5">
                      <h2 className="break-words text-lg font-semibold group-hover:text-sky-800">
                        {project.name}
                      </h2>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            project.publishedAt
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {project.publishedAt
                            ? "Published"
                            : "Not published"}
                        </span>

                        <span className="text-xs text-slate-500">
                          {project.blockCount}{" "}
                          {project.blockCount === 1
                            ? "saved block"
                            : "saved blocks"}
                        </span>
                      </div>

                      <p className="mt-4 text-sm font-medium text-sky-700">
                        Open editor
                      </p>
                    </div>
                  </Link>

                  {project.publishedAt && (
                    <div className="px-5 pb-4">
                      <Link
                        to={`/p/${project.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-lg border border-sky-200 px-3 py-2 text-xs font-medium text-sky-800 transition-colors hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                      >
                        View published
                      </Link>
                    </div>
                  )}

                  <details className="border-t border-sky-100">
                    <summary className="cursor-pointer rounded-b-2xl px-5 py-3 text-sm font-medium text-slate-600 hover:text-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
                      Project settings
                    </summary>

                    <div className="space-y-5 px-5 pb-5 pt-2">
                      <UpdateProjectForm
                        projectId={project.id}
                        currentName={project.name}
                      />

                      <div className="border-t border-sky-100 pt-4">
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
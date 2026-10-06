import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProjectSchema,
  type CreateProjectInput,
} from "@orlune/shared";
import { useForm } from "react-hook-form";

import { ApiError } from "../../lib/api";
import { useCreateProject } from "./useCreateProject";

export function CreateProjectForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
    },
  });

  const createProjectMutation = useCreateProject();

  const onSubmit = async (data: CreateProjectInput) => {
    const { name } = data;
    try {
      await createProjectMutation.mutateAsync({ name });
      reset();
    } catch (error) {
      setError("root", {
        message:
          error instanceof ApiError
            ? error.message
            : "Could not create project. Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={createProjectMutation.isPending}
      className="space-y-3"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <label
            htmlFor="new-project-name"
            className="block text-sm font-medium text-slate-700"
          >
            Project name
          </label>

          <input
            id="new-project-name"
            type="text"
            placeholder="For example, Coffee Studio"
            disabled={createProjectMutation.isPending}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={
              errors.name ? "new-project-name-error" : undefined
            }
            {...register("name")}
            className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-60 aria-invalid:border-red-500"
          />
        </div>

        <button
          type="submit"
          disabled={createProjectMutation.isPending}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-wait disabled:opacity-60"
        >
          {createProjectMutation.isPending
            ? "Creating..."
            : "Create project"}
        </button>
      </div>

      {errors.name && (
        <p
          id="new-project-name-error"
          role="alert"
          className="text-sm text-red-600"
        >
          {errors.name.message}
        </p>
      )}

      {errors.root && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {errors.root.message}
        </p>
      )}
    </form>
  );
}
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProjectSchema,
  type UpdateProjectInput,
} from "@orlune/shared";
import { useForm } from "react-hook-form";

import { ApiError } from "../../lib/api";
import { useUpdateProject } from "./useUpdateProject";

type UpdateProjectFormProps = {
  projectId: string;
  currentName: string;
};

export function UpdateProjectForm({
  projectId,
  currentName,
}: UpdateProjectFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm<UpdateProjectInput>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      name: currentName,
    },
  });

  const updateProjectMutation = useUpdateProject();

  const inputId = `project-name-${projectId}`;
  const errorId = `${inputId}-error`;

  const onSubmit = async (data: UpdateProjectInput) => {
   const { name } = data;

    try {
      const project = await updateProjectMutation.mutateAsync({
        projectId,
        input: { name },
      });

      reset({ name: project.name });
    } catch (error) {
      setError("root", {
        message:
          error instanceof ApiError
            ? error.message
            : "Could not rename project. Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={updateProjectMutation.isPending}
      className="space-y-3"
    >
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700"
        >
          Project name
        </label>

        <input
          id={inputId}
          type="text"
          disabled={updateProjectMutation.isPending}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? errorId : undefined}
          {...register("name")}
          className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-60 aria-invalid:border-red-500"
        />

        {errors.name && (
          <p
            id={errorId}
            role="alert"
            className="text-sm text-red-600"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {errors.root && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {errors.root.message}
        </p>
      )}

      <button
        type="submit"
        disabled={updateProjectMutation.isPending || !isDirty}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {updateProjectMutation.isPending
          ? "Saving..."
          : "Save name"}
      </button>
    </form>
  );
}
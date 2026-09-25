import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema, type CreateProjectInput } from "@orlune/shared";
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
  });

  const createProjectMutation = useCreateProject();

  const onSubmit = async (data: CreateProjectInput) => {
    try {
      await createProjectMutation.mutateAsync(data);
      reset();
    } catch (error) {
      if (error instanceof ApiError) {
        setError("root", {
          message: error.message,
        });

        return;
      }

      setError("root", {
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Project name
        <input {...register("name")} />
      </label>

      {errors.name && <span>{errors.name.message}</span>}

      {errors.root && <span>{errors.root.message}</span>}

      <button type="submit" disabled={createProjectMutation.isPending}>
        {createProjectMutation.isPending ? "Creating..." : "Create project"}
      </button>
    </form>
  );
}

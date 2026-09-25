import { zodResolver } from "@hookform/resolvers/zod";
import { updateProjectSchema, type UpdateProjectInput } from "@orlune/shared";
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
    setError,
    formState: { errors },
  } = useForm<UpdateProjectInput>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      name: currentName,
    },
  });

  const updateProjectMutation = useUpdateProject();

  const onSubmit = async (data: UpdateProjectInput) => {
    try {
      await updateProjectMutation.mutateAsync({
        projectId,
        input: data,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        setError("root", {
          type: "server",
          message: error.message,
        });
      } else {
        setError("root", {
          message: "Something went wrong. Please try again.",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />

      {errors.name && <span>{errors.name.message}</span>}
      {errors.root && <span>{errors.root.message}</span>}

      <button type="submit" disabled={updateProjectMutation.isPending}>
        {updateProjectMutation.isPending ? "Updating..." : "Update"}
      </button>
    </form>
  );
}

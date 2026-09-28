import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateTaskSchema,
  type UpdateTaskInput,
} from "@orlune/shared";
import { useForm } from "react-hook-form";

import { ApiError } from "../../lib/api";
import { useUpdateTask } from "./useUpdateTask";

type UpdateTaskFormProps = {
  taskId: string;
  sectionId: string;
  currentTitle: string;
  currentDescription: string | null;
};

export function UpdateTaskForm({
  taskId,
  sectionId,
  currentTitle,
  currentDescription,
}: UpdateTaskFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UpdateTaskInput>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: currentTitle,
      description: currentDescription ?? "",
    },
  });

  const updateTaskMutation = useUpdateTask();

  const onSubmit = async (data: UpdateTaskInput) => {
    try {
      await updateTaskMutation.mutateAsync({
        taskId,
        sectionId,
        input: data,
      });
    } catch (error) {
      setError("root", {
        message:
          error instanceof ApiError
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} />
      <input {...register("description")} />

      {errors.title && <span>{errors.title.message}</span>}
      {errors.description && <span>{errors.description.message}</span>}
      {errors.root && <span>{errors.root.message}</span>}

      <button
        type="submit"
        disabled={updateTaskMutation.isPending}
      >
        {updateTaskMutation.isPending ? "Updating..." : "Update"}
      </button>
    </form>
  );
}
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTaskSchema,
  type CreateTaskInput,
} from "@orlune/shared";
import { useForm } from "react-hook-form";

import { ApiError } from "../../lib/api";
import { useCreateTask } from "./useCreateTask";

type CreateTaskFormProps = {
  sectionId: string;
};

export function CreateTaskForm({ sectionId }: CreateTaskFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      sectionId,
    },
  });

  const createTaskMutation = useCreateTask();

  const onSubmit = async (data: CreateTaskInput) => {
    try {
      await createTaskMutation.mutateAsync({
        sectionId,
        input: data,
      });

      reset({
        title: "",
        description: "",
        sectionId,
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
      <input
        {...register("title")}
        placeholder="Task title"
      />

      <input
        {...register("description")}
        placeholder="Description"
      />

      {errors.title && <span>{errors.title.message}</span>}
      {errors.description && <span>{errors.description.message}</span>}
      {errors.root && <span>{errors.root.message}</span>}

      <button
        type="submit"
        disabled={createTaskMutation.isPending}
      >
        {createTaskMutation.isPending ? "Creating..." : "Create task"}
      </button>
    </form>
  );
}
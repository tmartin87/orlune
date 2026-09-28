import { zodResolver } from "@hookform/resolvers/zod";
import {
  createSectionSchema,
  type CreateSectionInput,
} from "@orlune/shared";
import { useForm } from "react-hook-form";

import { ApiError } from "../../lib/api";
import { useCreateSection } from "./useCreateSection";

type CreateSectionFormProps = {
  projectId: string;
};

export function CreateSectionForm({
  projectId,
}: CreateSectionFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateSectionInput>({
    resolver: zodResolver(createSectionSchema),
    defaultValues: {
      name: "",
      projectId,
    },
  });

  const createSectionMutation = useCreateSection();

  const onSubmit = async (data: CreateSectionInput) => {
    try {
      await createSectionMutation.mutateAsync({
        projectId,
        input: data,
      });

      reset({
        name: "",
        projectId,
      });
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
        Section name
        <input {...register("name")} />
      </label>

      {errors.name && <span>{errors.name.message}</span>}
      {errors.root && <span>{errors.root.message}</span>}

      <button
        type="submit"
        disabled={createSectionMutation.isPending}
      >
        {createSectionMutation.isPending
          ? "Creating..."
          : "Create section"}
      </button>
    </form>
  );
}
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateSectionSchema,
  type UpdateSectionInput,
} from "@orlune/shared";
import { useForm } from "react-hook-form";

import { ApiError } from "../../lib/api";
import { useUpdateSection } from "./useUpdateSection";

type UpdateSectionFormProps = {
  sectionId: string;
  projectId: string;
  currentName: string;
};

export function UpdateSectionForm({
  sectionId,
  projectId,
  currentName,
}: UpdateSectionFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UpdateSectionInput>({
    resolver: zodResolver(updateSectionSchema),
    defaultValues: {
      name: currentName,
    },
  });

  const updateSectionMutation = useUpdateSection();

  const onSubmit = async (data: UpdateSectionInput) => {
    try {
      await updateSectionMutation.mutateAsync({
        sectionId,
        projectId,
        input: data,
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
      <input {...register("name")} />

      {errors.name && <span>{errors.name.message}</span>}
      {errors.root && <span>{errors.root.message}</span>}

      <button
        type="submit"
        disabled={updateSectionMutation.isPending}
      >
        {updateSectionMutation.isPending ? "Updating..." : "Update"}
      </button>
    </form>
  );
}
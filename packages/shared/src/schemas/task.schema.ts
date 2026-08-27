import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  sectionId: z.string(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;


export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),

})
  .refine(
    (data) => data.title !== undefined || data.description !== undefined,
    {
      message: "At least one field must be provided",
    },
  );

  export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
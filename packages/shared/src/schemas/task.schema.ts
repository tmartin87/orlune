import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  sectionId: z.string(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
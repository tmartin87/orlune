import { z } from "zod";

export const createSectionSchema = z.object({
  name: z.string().min(1),
  projectId: z.string(),
});

export type CreateSectionInput = z.infer<
  typeof createSectionSchema
>;

export const updateSectionSchema = z.object({
  name: z.string().min(1),
});

export type UpdateSectionInput = z.infer<typeof updateSectionSchema>;
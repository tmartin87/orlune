import { z } from "zod";

export const sectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  projectId: z.string(),
});

export const createSectionSchema = z.object({
  name: z.string().min(1),
  projectId: z.string(),
});

export const updateSectionSchema = z.object({
  name: z.string().min(1),
});

export type Section = z.infer<typeof sectionSchema>;
export type CreateSectionInput = z.infer<typeof createSectionSchema>;
export type UpdateSectionInput = z.infer<typeof updateSectionSchema>;
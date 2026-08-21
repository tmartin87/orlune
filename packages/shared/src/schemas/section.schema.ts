import { z } from "zod";

export const createSectionSchema = z.object({
  name: z.string().min(1),
  projectId: z.string(),
});

export type CreateSectionInput = z.infer<
  typeof createSectionSchema
>;


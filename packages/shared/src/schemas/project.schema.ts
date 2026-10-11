import { z } from "zod";

const projectNameSchema = z
  .string()
  .trim()
  .min(1, "Enter a project name.");

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const projectSummarySchema = projectSchema.extend({
  publishedAt: z.string().datetime().nullable(),
  blockCount: z.number().int().nonnegative(),
  coverImageUrl: z
    .string()
    .url()
    .regex(/^https?:\/\//i)
    .nullable(),
});

export const createProjectSchema = z.object({
  name: projectNameSchema,
});

export const updateProjectSchema = z.object({
  name: projectNameSchema,
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectSummary = z.infer<typeof projectSummarySchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
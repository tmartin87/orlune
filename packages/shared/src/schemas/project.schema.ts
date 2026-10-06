 import { z } from "zod";

const projectNameSchema = z
  .string()
  .trim()
  .min(1, "Enter a project name.");

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const createProjectSchema = z.object({
  name: projectNameSchema,
});

export const updateProjectSchema = z.object({
  name: projectNameSchema,
});

export type Project = z.infer<typeof projectSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
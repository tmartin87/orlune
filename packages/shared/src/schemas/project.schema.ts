import { z } from "zod";

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const createProjectSchema = projectSchema.pick({
  name: true,
});

export const updateProjectSchema = z.object({
  name: z.string().min(1),
});


export type Project = z.infer<typeof projectSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().trim().min(3),
  email: z.email(),
  password: z.string().min(12),
});

export type RegisterUserInput = z.infer<
  typeof registerUserSchema
>;
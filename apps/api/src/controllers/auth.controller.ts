import type { Request, Response } from "express";
import { registerUserSchema } from "@orlune/shared";
import { registerUser } from "../services/auth.service.js";

export async function registerController(
  req: Request,
  res: Response,
) {
  const input = registerUserSchema.parse(req.body);

  const user = await registerUser(input);

  return res.status(201).json(user);
}
import type { Request, Response } from "express";
import {
  registerUserSchema,
  loginUserSchema,
 } from "@orlune/shared";
import {
   registerUser,
   loginUser,
} from "../services/auth.service.js";


export async function registerController(
  req: Request,
  res: Response,
) {
  const input = registerUserSchema.parse(req.body);

  const user = await registerUser(input);

  return res.status(201).json(user);
}

export async function loginController(
  req: Request,
  res: Response,
) {
  const input = loginUserSchema.parse(req.body);
  const { user, token } = await loginUser(input);
  return res.status(200).json({ user, token });
}
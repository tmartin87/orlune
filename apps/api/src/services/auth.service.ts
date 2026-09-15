import type { RegisterUserInput } from "@orlune/shared";
import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repository.js";
import { hashPassword } from "../lib/password.js";
import { ConflictError } from "../errors/conflict.error.js";

export async function registerUser(input: RegisterUserInput) {
  const existingUser = await findUserByEmail(input.email);

  if (existingUser) {
    throw new ConflictError("User already exists");
  }

  const passwordHash = await hashPassword(input.password);

  return createUser({
    name: input.name,
    email: input.email,
    passwordHash,
  });
}
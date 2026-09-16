import type {
  LoginUserInput,
  RegisterUserInput
 } from "@orlune/shared";
import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repository.js";
import { hashPassword, verifyPassword } from "../lib/password.js";
import { ConflictError } from "../errors/conflict.error.js";
import { UnauthorizedError } from "../errors/unauthorized.error.js";
import { signToken } from "../lib/jwt.js";

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


export async function loginUser(input: LoginUserInput) {
  const user = await findUserByEmail(input.email);

  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const passwordMatches = await verifyPassword(
    input.password,
    user.passwordHash,
  );

  if (!passwordMatches) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const token = await signToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
}
import type { LoginUserInput } from "@orlune/shared";
import { api } from "../../lib/api";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type LoginResponse = {
  user: AuthUser;
  token: string;
};

export function login(credentials: LoginUserInput) {
  return api<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}
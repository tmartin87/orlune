import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginUserSchema,
  type LoginUserInput,
} from "@orlune/shared";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { login } from "./auth-api";
import { useAuth } from "./useAuth";
import { ApiError } from "../../lib/api";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { login: authenticate } = useAuth();

  const onSubmit = async (data: LoginUserInput) => {
    try {
      const response = await login(data);

      authenticate(response.token);
      navigate("/projects", { replace: true });
    } catch (error) {
      setError("root", {
        message:
          error instanceof ApiError
            ? error.message
            : "Could not connect. Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={isSubmitting}
      className="space-y-5"
    >
      <div className="space-y-2">
        <label
          htmlFor="login-email"
          className="block text-sm font-medium text-slate-700"
        >
          Email
        </label>

        <input
          id="login-email"
          type="email"
          autoComplete="username"
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "login-email-error" : undefined}
          {...register("email")}
          className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 aria-invalid:border-red-500"
        />

        {errors.email && (
          <p
            id="login-email-error"
            role="alert"
            className="text-sm text-red-600"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="login-password"
          className="block text-sm font-medium text-slate-700"
        >
          Password
        </label>

        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={
            errors.password ? "login-password-error" : undefined
          }
          {...register("password")}
          className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 aria-invalid:border-red-500"
        />

        {errors.password && (
          <p
            id="login-password-error"
            role="alert"
            className="text-sm text-red-600"
          >
            {errors.password.message}
          </p>
        )}
      </div>

      {errors.root && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {errors.root.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
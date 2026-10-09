import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerUserSchema,
  type RegisterUserInput,
} from "@orlune/shared";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { ApiError } from "../../lib/api";
import { registerUser } from "./auth-api";

const inputClassName =
  "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-60 aria-invalid:border-red-500";

export function RegisterForm() {
  const [isCreated, setIsCreated] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserInput>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterUserInput) => {
    try {
      await registerUser(data);
      reset();
      setIsCreated(true);
    } catch (error) {
      setError("root", {
        message:
          error instanceof ApiError
            ? error.status === 409
              ? "An account with this email already exists. Please sign in."
              : error.message
            : "Could not connect. Please try again.",
      });
    }
  };

  if (isCreated) {
    return (
      <div className="space-y-5">
        <p
          role="status"
          className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-relaxed text-green-800"
        >
          Your account is ready. Sign in to create your first landing page.
        </p>

        <Link
          to="/login"
          className="block rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Continue to sign in
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={isSubmitting}
      className="space-y-5"
    >
      <div className="space-y-2">
        <label
          htmlFor="register-name"
          className="block text-sm font-medium text-slate-700"
        >
          Name
        </label>

        <input
          id="register-name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={
            errors.name ? "register-name-error" : undefined
          }
          {...register("name")}
          className={inputClassName}
        />

        {errors.name && (
          <p
            id="register-name-error"
            role="alert"
            className="text-sm text-red-600"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="register-email"
          className="block text-sm font-medium text-slate-700"
        >
          Email
        </label>

        <input
          id="register-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={
            errors.email ? "register-email-error" : undefined
          }
          {...register("email")}
          className={inputClassName}
        />

        {errors.email && (
          <p
            id="register-email-error"
            role="alert"
            className="text-sm text-red-600"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="register-password"
          className="block text-sm font-medium text-slate-700"
        >
          Password
        </label>

        <input
          id="register-password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a password"
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={
            errors.password
              ? "register-password-help register-password-error"
              : "register-password-help"
          }
          {...register("password")}
          className={inputClassName}
        />

        <p
          id="register-password-help"
          className="text-xs text-slate-500"
        >
          Use at least 12 characters.
        </p>

        {errors.password && (
          <p
            id="register-password-error"
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
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
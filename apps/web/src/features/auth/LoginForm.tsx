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
    formState: { errors },
  } = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const navigate = useNavigate();
const { login: authenticate } = useAuth();

  const onSubmit = async (data: LoginUserInput) => {
    try {
    const response = await login(data);
    authenticate(response.token);
     navigate("/projects");

    } catch (error) {
  if (error instanceof ApiError) {
    setError("root", {
      message: error.message,
    });

    return;
  }

  setError("root", {
    message: "Something went wrong. Please try again.",
  });
}

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
  Email
  <input type="email" {...register("email")} />
</label>

{errors.email && <span>{errors.email.message}</span>}

<label>
  Password
  <input type="password" {...register("password")} />
</label>

{errors.password && <span>{errors.password.message}</span>}

{errors.root && <span>{errors.root.message}</span>}

<button type="submit">Login</button>
    </form>
  );
}
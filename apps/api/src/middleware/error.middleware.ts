import { ZodError } from "@orlune/shared";
import { Prisma } from "../generated/prisma/client.js";
import { ConflictError } from "../errors/conflict.error.js";

import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

export const errorMiddleware: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Invalid request data",
      issues: err.issues,
    });

    return;
  }

  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    res.status(409).json({
      message: "A section with this name already exists in the project",
    });

    return;
  }

  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2025"
  ) {
    res.status(404).json({
      message: "Resource not found",
    });

    return;
  }

  if (err instanceof ConflictError) {
    res.status(409).json({
      message: err.message,
    });

    return;
  }

  console.error(err);

  res.status(500).json({
    message: "Internal server error",
  });
};
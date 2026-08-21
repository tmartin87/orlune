import { ZodError } from "@orlune/shared";
import { Prisma } from "../generated/prisma/client.js";

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

  console.error(err);

  res.status(500).json({
    message: "Internal server error",
  });
};
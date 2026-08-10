import { ZodError } from "@orlune/shared";

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

  console.error(err);

  res.status(500).json({
    message: "Internal server error",
  });
};
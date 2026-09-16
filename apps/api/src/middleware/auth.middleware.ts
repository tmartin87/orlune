import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { verifyToken } from "../lib/jwt.js";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization;

if (!authorization) {
  res.status(401).json({
    message: "Unauthorized",
  });

  return;
}


const [scheme, token] = authorization.split(" ");

if (scheme !== "Bearer" || !token) {
  res.status(401).json({
    message: "Unauthorized",
  });

  return;
}

try {
  const userId = await verifyToken(token);

  req.user = {
    id: userId,
  };

  next();
} catch {
  res.status(401).json({
    message: "Unauthorized",
  });

  return;
}

}
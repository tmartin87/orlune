import { Router } from "express";

import {
  getPublishedLandingController,
} from "../controllers/landing.controller.js";

export const publicRouter = Router();

publicRouter.get(
  "/landings/:projectId",
  getPublishedLandingController,
);
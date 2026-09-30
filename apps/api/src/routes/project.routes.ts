import { Router } from "express";

import {
  createProjectController,
  getProjects,
  deleteProject as deleteProjectController,
  updateProject,
} from "../controllers/project.controller.js";

import {
  getLandingController,
  saveLandingController,
  publishLandingController,
} from "../controllers/landing.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

export const projectRouter = Router();

projectRouter.get(
  "/",
  authMiddleware,
  getProjects,
);

projectRouter.post(
  "/",
  authMiddleware,
  createProjectController,
);

projectRouter.get(
  "/:projectId/landing",
  authMiddleware,
  getLandingController,
);

projectRouter.put(
  "/:projectId/landing",
  authMiddleware,
  saveLandingController,
);

projectRouter.post(
  "/:projectId/landing/publish",
  authMiddleware,
  publishLandingController,
);


projectRouter.delete(
  "/:projectId",
  authMiddleware,
  deleteProjectController,
);

projectRouter.patch(
  "/:projectId",
  authMiddleware,
  updateProject,
);
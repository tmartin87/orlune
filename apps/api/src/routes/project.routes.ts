import { Router } from "express";

import {
  createProjectController,
  getProjects,
  deleteProject as deleteProjectController,
  updateProject,
} from "../controllers/project.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export const projectRouter = Router();

projectRouter.get("/", getProjects);
projectRouter.post(
  "/",
  authMiddleware,
  createProjectController,
);
projectRouter.delete("/:projectId", deleteProjectController);
projectRouter.patch("/:projectId", updateProject);
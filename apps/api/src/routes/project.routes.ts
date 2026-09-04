import { Router } from "express";

import {
  createProjectController,
  getProjects,
  deleteProject as deleteProjectController,
  updateProject,
} from "../controllers/project.controller.js";

export const projectRouter = Router();

projectRouter.get("/", getProjects);
projectRouter.post("/", createProjectController);
projectRouter.delete("/:projectId", deleteProjectController);
projectRouter.patch("/:projectId", updateProject);

import { Router } from "express";

import {
  createProjectController,
  getProjects,
} from "../controllers/project.controller.js";

export const projectRouter = Router();

projectRouter.get("/", getProjects);
projectRouter.post("/", createProjectController);
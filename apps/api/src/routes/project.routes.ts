import { Router } from "express";

import { getProjects } from "../controllers/project.controller.js";

export const projectRouter = Router();

projectRouter.get("/", getProjects);
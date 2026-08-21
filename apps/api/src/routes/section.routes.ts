import { Router } from "express";

import { createSection, getProjectSections } from "../controllers/section.controller.js";

export const sectionRouter = Router();

sectionRouter.get("/:projectId/sections", getProjectSections);

sectionRouter.post("/:projectId/sections", createSection);
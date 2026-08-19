import { Router } from "express";

import { getProjectSections } from "../controllers/section.controller.js";

export const sectionRouter = Router();

sectionRouter.get("/:projectId/sections", getProjectSections);
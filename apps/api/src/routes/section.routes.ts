import { Router } from "express";

import { 
    createSection, 
    getProjectSections, 
    updateSection } from "../controllers/section.controller.js";

export const projectSectionRouter = Router();
export const sectionRouter = Router();

projectSectionRouter.get("/:projectId/sections", getProjectSections);
projectSectionRouter.post("/:projectId/sections", createSection);

sectionRouter.patch("/:sectionId", updateSection);
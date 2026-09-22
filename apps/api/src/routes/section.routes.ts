import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";

import { 
    createSection, 
    getProjectSections, 
    updateSection,
    deleteSection
 } from "../controllers/section.controller.js";

export const projectSectionRouter = Router();
export const sectionRouter = Router();

projectSectionRouter.get(
  "/:projectId/sections",
  authMiddleware,
  getProjectSections,
);

projectSectionRouter.post(
  "/:projectId/sections",
  authMiddleware,
  createSection,
);

sectionRouter.patch(
  "/:sectionId",
  authMiddleware,
  updateSection,
);

sectionRouter.delete(
  "/:sectionId",
  authMiddleware,
  deleteSection,
);
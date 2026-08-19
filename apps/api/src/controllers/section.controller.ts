import type { Request, Response } from "express";

import { getSectionsByProject } from "../services/section.service.js";

type projectParams = {
projectId: string
};

export async function getProjectSections(
  req: Request<projectParams>,
  res: Response,
) {
  const { projectId } = req.params;

  const sections = await getSectionsByProject(projectId);

  res.json(sections);
}
import type { Request, Response } from "express";
import { createSectionSchema } from "@orlune/shared";

import {
  createProjectSection,
  getSectionsByProject,
} from "../services/section.service.js";

type ProjectParams = {
  projectId: string;
};

type CreateSectionBody = {
  name: string;
};

export async function getProjectSections(
  req: Request<ProjectParams>,
  res: Response,
) {
  const { projectId } = req.params;

  const sections = await getSectionsByProject(projectId);

  res.json(sections);
}

export async function createSection(
  req: Request<ProjectParams, {}, CreateSectionBody>,
  res: Response,
) {
  const body = createSectionSchema.parse({
    name: req.body.name,
    projectId: req.params.projectId,
  });

  const section = await createProjectSection(body);

  res.status(201).json(section);
}
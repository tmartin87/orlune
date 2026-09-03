import type { Request, Response } from "express";
import {
  createSectionSchema,
  updateSectionSchema,
} from "@orlune/shared";

import {
  createProjectSection,
  getSectionsByProject,
  updateProjectSection,
  deleteProjectSection,
} from "../services/section.service.js";

type ProjectParams = {
  projectId: string;
};

type SectionParams = {
  sectionId: string;
};

type CreateSectionBody = {
  name: string;
};

type UpdateSectionBody = {
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

export async function updateSection(
  req: Request<SectionParams, {}, UpdateSectionBody>,
  res: Response,
) {
  const { sectionId } = req.params;

  const body = updateSectionSchema.parse(req.body);

  const updatedSection = await updateProjectSection(sectionId, body);

  res.json(updatedSection);
}

export async function deleteSection(
  req: Request<SectionParams>,
  res: Response,
) {
  const { sectionId } = req.params;

  await deleteProjectSection(sectionId);

  res.status(204).send();
}
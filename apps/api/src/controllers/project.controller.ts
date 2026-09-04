import type { Request, Response } from "express";

import {
  createProjectSchema,
  type CreateProjectInput,
} from "@orlune/shared";

import {
  createProject,
  deleteProject as deleteProjectService,
  getAllProjects,
} from "../services/project.service.js";

type ProjectParams = {
  projectId: string;
};

export async function getProjects(_req: Request, res: Response) {
  const projects = await getAllProjects();

  res.json(projects);
}

export async function createProjectController(
  req: Request,
  res: Response,
) {
  const input: CreateProjectInput =
    createProjectSchema.parse(req.body);

  const project = await createProject(input);

  res.status(201).json(project);
}

export async function deleteProject(
  req: Request<ProjectParams>,
  res: Response,
) {
  const { projectId } = req.params;

  await deleteProjectService(projectId);

  res.status(204).send();
}
import type { Request, Response } from "express";


import {
  createProjectSchema,
  type CreateProjectInput,
} from "@orlune/shared";

import {
  createProject,
  getAllProjects,
} from "../services/project.service.js";

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
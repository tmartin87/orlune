import type { Request, Response } from "express";

import {
  createProjectSchema,
  type CreateProjectInput,
} from "@orlune/shared";

import {
  createProject,
  getAllProjects,
} from "../services/project.service.js";

export function getProjects(_req: Request, res: Response) {
  const projects = getAllProjects();

  res.json(projects);
}

export function createProjectController(req: Request, res: Response) {
  const input: CreateProjectInput = createProjectSchema.parse(req.body);

  const project = createProject(input);

  res.status(201).json(project);
}
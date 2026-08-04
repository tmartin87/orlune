import type { Request, Response } from "express";

import { getAllProjects } from "../services/project.service.js";

export function getProjects(_req: Request, res: Response) {
  const projects = getAllProjects();

  res.json(projects);
}
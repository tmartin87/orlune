import type { Request, Response } from "express";

import {
  createProjectSchema,
  updateProjectSchema,
  type CreateProjectInput,
} from "@orlune/shared";

import {
  createProject,
  updateProject as updateProjectService,
  deleteProject as deleteProjectService,
  getProjectsByUserId
} from "../services/project.service.js";

type ProjectParams = {
  projectId: string;
};

export async function getProjects(req: Request, res: Response) {

  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const projects = await getProjectsByUserId(req.user.id);

  res.json(projects);
}

export async function createProjectController(
  req: Request,
  res: Response,
) {
  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized",
    });

    return;
  }

  const input: CreateProjectInput =
    createProjectSchema.parse(req.body);

  const project = await createProject(
    input,
    req.user.id,
  );

  res.status(201).json(project);
}

export async function deleteProject(
  req: Request<ProjectParams>,
  res: Response,
) {
  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const { projectId } = req.params;

  await deleteProjectService(
    projectId,
    req.user.id,
  );

  res.status(204).send();
}

export async function updateProject(
  req: Request<ProjectParams>,
  res: Response,
) {
  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const { projectId } = req.params;
  const input = updateProjectSchema.parse(req.body);

  const project = await updateProjectService(
    projectId,
    req.user.id,
    input,
  );

  res.json(project);
}
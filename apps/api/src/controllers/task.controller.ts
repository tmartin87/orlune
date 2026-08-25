import type { Request, Response } from "express";
import { createTaskSchema } from "@orlune/shared";

import {
  createSectionTask,
  getTasksBySection,
} from "../services/task.service.js";

type SectionParams = {
  sectionId: string;
};

type CreateTaskBody = {
  title: string;
  description?: string;
};

export async function createTask(
  req: Request<SectionParams, {}, CreateTaskBody>,
  res: Response,
) {
  const body = createTaskSchema.parse({
    title: req.body.title,
    description: req.body.description,
    sectionId: req.params.sectionId,
  });

  const task = await createSectionTask(body);

  res.status(201).json(task);
}

export async function getSectionTasks(
  req: Request<SectionParams>,
  res: Response,
) {
  const { sectionId } = req.params; 

  const tasks = await getTasksBySection(sectionId);

  res.json(tasks);
}
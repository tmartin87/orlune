import type { Request, Response } from "express";
import { createTaskSchema } from "@orlune/shared";

import { createSectionTask } from "../services/task.service.js";

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
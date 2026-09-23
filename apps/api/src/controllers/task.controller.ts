import type { Request, Response } from "express";
import {
  createTaskSchema,
  updateTaskSchema,
} from "@orlune/shared";

import {
  createSectionTask,
  getTasksBySection,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
} from "../services/task.service.js";

type SectionParams = {
  sectionId: string;
};

type CreateTaskBody = {
  title: string;
  description?: string;
};

type TaskParams = {
  taskId: string;
};

type UpdateTaskBody = {
  title?: string;
  description?: string;
};

export async function createTask(
  req: Request<SectionParams, {}, CreateTaskBody>,
  res: Response,
) {
  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized",
    });

    return;
  }

  const body = createTaskSchema.parse({
    title: req.body.title,
    description: req.body.description,
    sectionId: req.params.sectionId,
  });

  const task = await createSectionTask(
    body,
    req.user.id,
  );

  res.status(201).json(task);
}

export async function getSectionTasks(
  req: Request<SectionParams>,
  res: Response,
) {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }


  const { sectionId } = req.params;

  const tasks = await getTasksBySection(
    sectionId,
    req.user.id,
  );

  res.json(tasks);
}

export async function updateTask(
  req: Request<TaskParams, {}, UpdateTaskBody>,
  res: Response,
) {
  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized",
    });

    return;
  }

  const { taskId } = req.params;

  const body = updateTaskSchema.parse(req.body);

  const task = await updateTaskService(
    taskId,
    req.user.id,
    body,
  );

  res.json(task);
}

export async function deleteTask(
  req: Request<TaskParams>,
  res: Response,
) {
  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized",
    });

    return;
  }

  const { taskId } = req.params;

  await deleteTaskService(
    taskId,
    req.user.id,
  );

  res.status(204).send();
}
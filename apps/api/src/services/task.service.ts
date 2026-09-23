import type {
  CreateTaskInput,
  UpdateTaskInput,
} from "@orlune/shared";

import { NotFoundError } from "../errors/not-found.error.js";

import {
  createTaskBySectionAndUserId,
  findSectionTasksByUserId,
  updateTaskByIdAndUserId,
  deleteTaskByIdAndUserId,
} from "../repositories/task.repository.js";

export async function createSectionTask(
  input: CreateTaskInput,
  userId: string,
) {
  const result = await createTaskBySectionAndUserId(
    input,
    userId,
  );

  if (result.status === "not_found") {
    throw new NotFoundError("Section not found");
  }

  return result.task;
}

export async function getTasksBySection(
  sectionId: string,
  userId: string,
) {
  const section = await findSectionTasksByUserId(
    sectionId,
    userId,
  );

  if (!section) {
    throw new NotFoundError("Section not found");
  }

  return section.tasks;
}

export async function updateTask(
  taskId: string,
  userId: string,
  input: UpdateTaskInput,
) {
  const tasks = await updateTaskByIdAndUserId(
    taskId,
    userId,
    input,
  );

  if (tasks.length === 0) {
    throw new NotFoundError("Task not found");
  }

  return tasks[0];
}

export async function deleteTask(
  taskId: string,
  userId: string,
) {
  const result = await deleteTaskByIdAndUserId(
    taskId,
    userId,
  );

  if (result.count === 0) {
    throw new NotFoundError("Task not found");
  }
}
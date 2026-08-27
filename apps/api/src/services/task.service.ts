import type { CreateTaskInput, UpdateTaskInput } from "@orlune/shared";

import {
  createTask,
  findTasksBySection,
  updateTask as updateTaskRepository,
} from "../repositories/task.repository.js";

export async function createSectionTask(input: CreateTaskInput) {
  return createTask(input);
}

export async function getTasksBySection(sectionId: string) {
  return findTasksBySection(sectionId);
}

export async function updateTask(
  taskId: string,
  input: UpdateTaskInput,
) {
  return updateTaskRepository(taskId, input);
}
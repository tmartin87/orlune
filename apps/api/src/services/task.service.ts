import type { CreateTaskInput } from "@orlune/shared";

import { createTask, findTasksBySection } from "../repositories/task.repository.js";

export async function createSectionTask(input: CreateTaskInput) {
  return createTask(input);
}

export async function getTasksBySection(sectionId: string) {
  return findTasksBySection(sectionId);
}

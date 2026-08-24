import type { CreateTaskInput } from "@orlune/shared";

import { createTask } from "../repositories/task.repository.js";

export async function createSectionTask(input: CreateTaskInput) {
  return createTask(input);
}
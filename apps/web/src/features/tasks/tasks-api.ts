import type {
  CreateTaskInput,
  Task,
  UpdateTaskInput,
} from "@orlune/shared";

import { api } from "../../lib/api";

export function getTasks(sectionId: string) {
  return api<Task[]>(`/sections/${sectionId}/tasks`);
}

export function createTask(
  sectionId: string,
  input: CreateTaskInput,
) {
  return api<Task>(`/sections/${sectionId}/tasks`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateTask(
  taskId: string,
  input: UpdateTaskInput,
) {
  return api<Task>(`/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteTask(taskId: string) {
  return api<void>(`/tasks/${taskId}`, {
    method: "DELETE",
  });
}
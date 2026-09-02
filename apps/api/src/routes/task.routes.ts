import { Router } from "express";

import {
  createTask,
  getSectionTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

export const sectionTaskRouter = Router();
export const taskRouter = Router();

sectionTaskRouter.get("/:sectionId/tasks", getSectionTasks);
sectionTaskRouter.post("/:sectionId/tasks", createTask);

taskRouter.patch("/:taskId", updateTask);
taskRouter.delete("/:taskId", deleteTask);
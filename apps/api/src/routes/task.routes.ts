import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";

import {
  createTask,
  getSectionTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

export const sectionTaskRouter = Router();
export const taskRouter = Router();

sectionTaskRouter.get(
  "/:sectionId/tasks",
  authMiddleware,
  getSectionTasks,
);

sectionTaskRouter.post(
  "/:sectionId/tasks",
  authMiddleware,
  createTask,
);

taskRouter.patch(
  "/:taskId",
  authMiddleware,
  updateTask,
);

taskRouter.delete(
  "/:taskId",
  authMiddleware,
  deleteTask,
);
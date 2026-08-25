import { Router } from "express";
import {
  createTask,
  getSectionTasks,
} from "../controllers/task.controller.js";

export const taskRouter = Router();

taskRouter.get("/:sectionId/tasks", getSectionTasks);
taskRouter.post("/:sectionId/tasks", createTask);

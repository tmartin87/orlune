import { Router } from "express";

import { createTask } from "../controllers/task.controller.js";

export const taskRouter = Router();

taskRouter.post("/:sectionId/tasks", createTask);
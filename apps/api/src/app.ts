import { errorMiddleware } from "./middleware/error.middleware.js";
import express from "express";
import { projectRouter } from "./routes/project.routes.js";
import {
  sectionTaskRouter,
  taskRouter,
} from "./routes/task.routes.js";
import { 
  projectSectionRouter,
  sectionRouter } from "./routes/section.routes.js";

export const app = express();

app.use(express.json());


app.use("/projects", projectRouter);
app.use("/projects", projectSectionRouter);


app.use("/sections", sectionRouter);
app.use("/sections", sectionTaskRouter);


app.use("/tasks", taskRouter);

app.get("/", (_req, res) => {
  res.json({
    message: "Orlune API",
  });
});

app.use(errorMiddleware);
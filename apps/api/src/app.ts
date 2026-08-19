import { errorMiddleware } from "./middleware/error.middleware.js";
import express from "express";
import { projectRouter } from "./routes/project.routes.js";
import { sectionRouter } from "./routes/section.routes.js";

export const app = express();

app.use(express.json());
app.use("/projects", sectionRouter);

app.get("/", (_req, res) => {
  res.json({
    message: "Orlune API",
  });
});


app.use("/projects", projectRouter);
app.use(errorMiddleware);
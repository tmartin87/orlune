import { lazy } from "react";

export const HomePage = lazy(() =>
  import("../pages/HomePage").then((module) => ({
    default: module.HomePage,
  })),
);

export const LoginPage = lazy(() =>
  import("../pages/LoginPage").then((module) => ({
    default: module.LoginPage,
  })),
);

export const RegisterPage = lazy(() =>
  import("../pages/RegisterPage").then((module) => ({
    default: module.RegisterPage,
  })),
);

export const ProjectsPage = lazy(() =>
  import("../pages/ProjectsPage").then((module) => ({
    default: module.ProjectsPage,
  })),
);

export const LandingEditorPage = lazy(() =>
  import("../pages/LandingEditorPage").then((module) => ({
    default: module.LandingEditorPage,
  })),
);

export const PublicLandingPage = lazy(() =>
  import("../pages/PublicLandingPage").then((module) => ({
    default: module.PublicLandingPage,
  })),
);
import { createBrowserRouter } from "react-router-dom";
import { LandingEditorPage } from "../pages/LandingEditorPage";
import { ProtectedRoute } from "../features/auth/ProtectedRoute";
import { LoginPage } from "../pages/LoginPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { ProjectPage } from "../pages/ProjectPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
  path: "/projects/:projectId/editor",
  element: (
    <ProtectedRoute>
      <LandingEditorPage />
    </ProtectedRoute>
  ),
},
  {
    path: "/projects",
    element: (
      <ProtectedRoute>
        <ProjectsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/projects/:projectId",
    element: (
      <ProtectedRoute>
        <ProjectPage />
      </ProtectedRoute>
    ),
  },
]);
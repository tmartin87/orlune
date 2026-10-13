import { Suspense, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "../features/auth/ProtectedRoute";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ProjectsPage,
  LandingEditorPage,
  PublicLandingPage,
} from "./lazy-pages";

function withLoading(page: ReactNode) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f5f9fc]">
          <p role="status" className="text-sm text-slate-600">
            Loading page...
          </p>
        </div>
      }
    >
      {page}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: withLoading(<HomePage />),
  },
  {
    path: "/login",
    element: withLoading(<LoginPage />),
  },
  {
    path: "/register",
    element: withLoading(<RegisterPage />),
  },
  {
    path: "/projects",
    element: (
      <ProtectedRoute>
        {withLoading(<ProjectsPage />)}
      </ProtectedRoute>
    ),
  },
  {
    path: "/projects/:projectId/editor",
    element: (
      <ProtectedRoute>
        {withLoading(<LandingEditorPage />)}
      </ProtectedRoute>
    ),
  },
  {
    path: "/projects/:projectId",
    element: (
      <ProtectedRoute>
        {withLoading(<LandingEditorPage />)}
      </ProtectedRoute>
    ),
  },
  {
    path: "/p/:projectId",
    element: withLoading(<PublicLandingPage />),
  },
]);
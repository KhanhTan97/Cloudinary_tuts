/**
 * Node modules
 */
import { createBrowserRouter } from "react-router";
import { Home } from "@/pages/drive/Home";

/**
 * Error pages
 */
import { RootError } from "@/pages/error/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    ErrorBoundary: RootError,
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        Component: Login,
      },
    ],
  },
]);

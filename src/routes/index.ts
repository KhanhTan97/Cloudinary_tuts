/**
 * Node modules
 */
import { createBrowserRouter } from "react-router";

/**
 * Error pages
 */
import { RootError } from "@/pages/error/Root";

/**
 * Pages
 */
import { Login } from "@/pages/auth/Login";

/**
 * Actions
 */
import { loginAction } from "@/routes/actions/login";

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
        action: loginAction,
      },
    ],
  },
]);

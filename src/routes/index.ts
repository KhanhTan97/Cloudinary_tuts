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
import { Signup } from "@/pages/auth/Signup";
import { ForgotPassword } from "@/pages/auth/ForgotPassword";

/**
 * Actions
 */
import { loginAction } from "@/routes/actions/login";
import { signupAction } from "@/routes/actions/signup";
import { forgotPasswordAction } from "@/routes/actions/forgotPassword";

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
      {
        path: "signup",
        Component: Signup,
        action: signupAction,
      },
      {
        path: "forgot-password",
        Component: ForgotPassword,
        action: forgotPasswordAction,
      },
    ],
  },
]);

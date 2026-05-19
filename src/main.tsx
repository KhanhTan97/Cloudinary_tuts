/**
 * Node modules
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

/**
 * Routes
 */
import { router } from "@/routes";

/**
 * Styles
 */
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

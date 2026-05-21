/**
 * Node modules
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

/**
 * Custom modules
 */
import { ThemeProvider } from "@/components/ThemeProvider";

/**
 * Components
 */
import { Toaster } from "@/components/ui/sonner";

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
    <ThemeProvider>
      <RouterProvider router={router} />

      <Toaster richColors />
    </ThemeProvider>
  </StrictMode>,
);

/**
 * Client-side hydration entry point
 *
 * This file is responsible for "hydrating" the server-rendered HTML
 * into a fully interactive React application on the client side.
 *
 * TanStack Start uses this pattern:
 * 1. Server renders the initial HTML (SSR)
 * 2. This file takes over and makes it interactive
 * 3. RouterProvider enables client-side navigation
 *
 * For React/Vite developers: This replaces the typical main.tsx
 * entry point you'd see in a standard Vite React app.
 */
import { hydrateRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";

// Create router instance with all routes and configuration
const router = getRouter();

// Hydrate the server-rendered HTML and make it interactive
// hydrateRoot is React 18+ API for SSR hydration
hydrateRoot(
  document.getElementById("root")!,
  <RouterProvider router={router} />,
);

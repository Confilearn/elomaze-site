import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

/**
 * Vite configuration for TanStack Start application
 *
 * TanStack Start is a full-stack React framework that extends Vite with:
 * - Server-side rendering (SSR) capabilities
 * - File-based routing system
 * - Built-in data fetching and caching
 * - Type-safe routing with TanStack Router
 *
 * For React/Vite developers: Think of this as Vite + Next.js features
 * but with better TypeScript support and developer experience.
 */
export default defineConfig({
  // Plugin order matters! TanStack Start must be first
  plugins: [
    // TanStack Start plugin - enables SSR, file-based routing, and server functions
    // This is the core plugin that makes this a "full-stack" React app
    tanstackStart(),

    // React plugin - enables Fast Refresh and React-specific optimizations
    // Same as standard Vite React projects
    react(),

    // TypeScript path mapping - allows absolute imports like @/components/Button
    // Reads paths from tsconfig.json and makes them work in Vite
    tsConfigPaths(),

    // Tailwind CSS v4 plugin - processes Tailwind utilities and provides hot reload
    // New v4 plugin is faster and requires less configuration
    tailwindcss(),
  ],

  server: {
    hmr: {
      // Disable error overlay to prevent conflicts with TanStack Start's error handling
      // TanStack Start has its own error boundary system that's more sophisticated
      overlay: false,
    },
  },
});

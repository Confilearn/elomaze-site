/**
 * Root route component - The main layout wrapper for the entire application
 *
 * This file defines the root layout structure using TanStack Start's file-based routing:
 * - HTML document structure with head and body
 * - Global styles and meta tags
 * - Layout components (Header, Footer, MobileNav)
 * - Route-specific layouts (admin vs public pages)
 * - 404 not found handling
 * - Global toast notifications
 *
 * Key TanStack Start patterns:
 * - createRootRoute() for the root layout
 * - shellComponent for HTML document structure
 * - component for page content layout
 * - head() for dynamic meta tags
 * - notFoundComponent for 404 pages
 * - Outlet for rendering child routes
 *
 * For React/Vite developers: This replaces App.tsx and main.tsx
 * with a more powerful, file-based routing system.
 */
import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
  useLocation,
  useSearch,
} from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { AgentMobileNav } from "@/components/AgentMobileNav";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

/**
 * 404 Not Found component
 *
 * Rendered when no route matches the current URL.
 * This provides a user-friendly error page with navigation back home.
 */
function NotFoundComponent() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-8xl mb-4">🏠</div>
        <h1 className="text-3xl font-bold text-foreground">
          Looks like this property moved out
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been relocated.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Root route configuration
 *
 * This defines the root route with:
 * - Dynamic meta tags and SEO
 * - HTML document structure
 * - Layout components
 * - Error handling
 */
export const Route = createRootRoute({
  /**
   * Dynamic head configuration for SEO and meta tags
   *
   * This function runs on both server and client to generate
   * appropriate meta tags for each page. TanStack Start handles
   * server-side rendering of these tags.
   */
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { title: "Elomaze — Trusted Homes in Nigeria" },
      {
        name: "description",
        content:
          "Find trusted, verified homes across Nigeria. Browse apartments, duplexes, shortlets, and more.",
      },
      { name: "author", content: "Elomaze" },
      { property: "og:title", content: "Elomaze — Trusted Homes in Nigeria" },
      {
        property: "og:description",
        content: "Find trusted, verified homes across Nigeria.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#153351" },
    ],
    links: [
      // Global styles import
      { rel: "stylesheet", href: appCss },
      // Favicon as inline SVG
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23153351'/><path d='M16 7L6 15h3v10h6v-6h2v6h6V15h3L16 7z' fill='white'/></svg>",
      },
    ],
  }),

  // HTML document structure (shell)
  shellComponent: RootShell,

  // Page content layout
  component: RootComponent,

  // 404 error handler
  notFoundComponent: NotFoundComponent,
});

/**
 * Shell component - HTML document structure
 *
 * This wraps the entire application in proper HTML structure.
 * TanStack Start uses this for server-side rendering.
 */
function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* HeadContent renders all meta tags and links from head() function */}
        <HeadContent />
      </head>
      <body>
        {children}
        {/* Scripts handles client-side hydration */}
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Root component - Main layout logic
 *
 * This handles conditional layout rendering based on route:
 * - Admin routes get minimal layout (no header/footer)
 * - Public routes get full layout with header and footer
 */
function RootComponent() {
  const location = useLocation();
  const search = useSearch({ strict: false }) as Record<
    string,
    string | undefined
  >;
  const isAdmin = location.pathname.startsWith("/admin");
  const isAgent = location.pathname.startsWith("/agent");
  const isAgentMessages = location.pathname.startsWith("/agent/messages");
  const isMessages =
    location.pathname.startsWith("/messages") ||
    location.pathname.startsWith("/agent/messages") ||
    location.pathname.startsWith("/admin/messages");

  // Messages route gets full-screen layout without footer
  // Mobile nav is hidden when a specific conversation is open (URL has chat parameter)
  const isChatOpen = isMessages && !!search.chat;

  // Admin routes get simplified layout with proper container
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Outlet />
        <Toaster position="top-right" richColors />
      </div>
    );
  }

  // Agent routes get agent-specific mobile navigation
  if (isAgent) {
    // Check if agent chat is open (URL has chat parameter)
    const isAgentChatOpen = isAgentMessages && !!search.chat;

    return (
      <>
        <Header />
        <main
          className={`h-[calc(100vh-5rem)] ${isAgentChatOpen ? "" : "pb-16 lg:pb-0"}`}
        >
          <Outlet />
        </main>
        {!isAgentChatOpen && <AgentMobileNav />}
        <Toaster position="top-right" richColors />
      </>
    );
  }

  if (isMessages) {
    return (
      <>
        <Header />
        <main
          className={`h-[calc(100vh-5rem)] lg:h-[calc(100vh-5rem)] ${isChatOpen ? "" : "pb-16"}`}
        >
          <Outlet />
        </main>
        {!isChatOpen && <MobileNav />}
        <Toaster position="top-right" richColors />
      </>
    );
  }

  // Public routes get full layout
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      <Toaster position="top-right" richColors />
    </>
  );
}

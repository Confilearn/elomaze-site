/**
 * Properties layout route - Parent route for all property-related pages
 *
 * This file demonstrates TanStack Start's nested routing pattern:
 * - /properties -> renders properties.index.tsx (list view)
 * - /properties/123 -> renders properties.$propertyId.tsx (detail view)
 * - /properties/search?q=lagos -> renders properties.index.tsx with search
 *
 * Key concepts:
 * - Layout routes act as parents for child routes
 * - Outlet component renders the matched child route
 * - File-based naming convention (.index.tsx for default child)
 * - Dynamic routes with $parameter syntax
 *
 * For React/Vite developers: This replaces complex route configuration
 * objects with a simple, intuitive file system approach.
 */
import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Layout route for /properties path
 *
 * This route acts as a layout container for all property routes.
 * The Outlet component renders whichever child route matches:
 * - properties.index.tsx for /properties
 * - properties.$propertyId.tsx for /properties/123
 */
export const Route = createFileRoute("/properties")({
  component: () => <Outlet />,
});

import { createFileRoute } from "@tanstack/react-router";
import Messages from "@/components/Messages";

/**
 * Messages route component
 *
 * This route renders the full messaging interface with:
 * - Two-column layout (conversation list + chat window)
 * - Real-time messaging capabilities
 * - Search and filter functionality
 * - Responsive design for mobile and desktop
 *
 * The component uses demo data for now, but is structured to easily
 * integrate with backend APIs when ready.
 */
export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Messages — Elomaze" },
      {
        name: "description",
        content:
          "Your messages on Elomaze. Chat with agents, sellers, and service providers about properties.",
      },
    ],
  }),
  component: MessagesPage,
});

/**
 * Messages page wrapper component
 *
 * This component serves as the route component and renders the Messages
 * component with all its functionality. In the future, this could be
 * extended to handle route-specific logic like:
 * - Authentication guards
 * - Initial data loading
 * - Error handling
 * - Analytics tracking
 */
function MessagesPage() {
  return <Messages />;
}

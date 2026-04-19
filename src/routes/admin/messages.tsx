import { createFileRoute } from "@tanstack/react-router";
import Messages from "@/components/Messages";

export const Route = createFileRoute("/admin/messages")({
  head: () => ({
    meta: [
      { title: "Messages — Elomaze Admin" },
      {
        name: "description",
        content:
          "Admin messages interface. Communicate with users and agents about listings, reports, and verifications.",
      },
    ],
  }),
  component: AdminMessages,
});

function AdminMessages() {
  return <Messages />;
}

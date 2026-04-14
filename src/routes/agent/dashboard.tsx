import { createFileRoute } from "@tanstack/react-router";
import { Eye, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/agent/dashboard")({
  head: () => ({
    meta: [
      { title: "Agent Dashboard — Elomaze" },
      { name: "description", content: "Manage your property listings on Elomaze." },
    ],
  }),
  component: AgentDashboard,
});

function AgentDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Dashboard Overview</h1>
      <p className="text-sm text-muted-foreground mb-8">Manage your listings and track performance</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Eye, label: "Total Views", value: "1,284" },
          { icon: Users, label: "Inquiries", value: "47" },
          { icon: TrendingUp, label: "Active Listings", value: "3" },
        ].map((stat) => (
          <div key={stat.label} className="p-5 rounded-2xl border border-border premium-shadow">
            <div className="flex items-center gap-3 mb-2">
              <stat.icon className="w-5 h-5 text-primary" />
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-4">Recent Inquiries</h2>
      <div className="space-y-3">
        {["Is the Lekki apartment still available?", "Can I schedule a visit to the Gwarinpa duplex?", "What's the final price for the Asaba shortlet?"].map((q, i) => (
          <div key={i} className="p-4 rounded-xl border border-border flex items-center justify-between">
            <p className="text-sm text-foreground">{q}</p>
            <Button variant="outline" size="sm">Reply</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const [platformName, setPlatformName] = useState("Elomaze");
  const [contactEmail, setContactEmail] = useState("admin@elomaze.com");
  const [notifications, setNotifications] = useState({
    newListings: true,
    newReports: true,
    newUsers: false,
    agentRequests: true,
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">Configure platform settings</p>
      </div>

      {/* General */}
      <div className="bg-card rounded-2xl border border-border/50 p-6 premium-shadow">
        <h3 className="text-base font-semibold text-foreground mb-4">General</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Platform Name</label>
            <input value={platformName} onChange={(e) => setPlatformName(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-secondary border-0 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Contact Email</label>
            <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-secondary border-0 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-2xl border border-border/50 p-6 premium-shadow">
        <h3 className="text-base font-semibold text-foreground mb-4">Notifications</h3>
        <div className="space-y-3">
          {[
            { key: "newListings" as const, label: "New listing submissions", desc: "Get notified when agents submit new listings" },
            { key: "newReports" as const, label: "New reports", desc: "Get notified when users report content" },
            { key: "newUsers" as const, label: "New user registrations", desc: "Get notified when new users sign up" },
            { key: "agentRequests" as const, label: "Agent verification requests", desc: "Get notified when agents request verification" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotifications((n) => ({ ...n, [item.key]: !n[item.key] }))}
                className={`w-10 h-6 rounded-full transition-colors relative ${notifications[item.key] ? "bg-primary" : "bg-secondary"}`}
              >
                <div className={`w-4 h-4 rounded-full bg-background absolute top-1 transition-all ${notifications[item.key] ? "left-5" : "left-1"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button variant="premium" size="lg" onClick={handleSave}>Save Changes</Button>
    </div>
  );
}

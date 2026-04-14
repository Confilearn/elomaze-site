import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/agent/settings")({
  component: AgentSettings,
});

function AgentSettings() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Settings</h1>
      <div className="rounded-2xl border border-border p-6 sm:p-8 premium-shadow">
        <form className="space-y-5" onSubmit={handleSave}>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Agency Name</label>
            <input type="text" defaultValue="Chidi Properties" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
            <input type="text" defaultValue="+234 801 234 5678" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
            <input type="email" defaultValue="chidi@elomaze.com" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <Button type="submit" variant="premium" size="lg">Save Changes</Button>
        </form>
      </div>
    </div>
  );
}

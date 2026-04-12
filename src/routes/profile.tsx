import { createFileRoute, Link } from "@tanstack/react-router";
import { User, Mail, Phone, Heart, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Elomaze" },
      { name: "description", content: "Your Elomaze profile." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-24 lg:pb-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-8">Profile</h1>

      <div className="rounded-2xl border border-border premium-shadow p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Adaeze Nwosu</h2>
            <p className="text-sm text-muted-foreground">Member since 2025</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm text-foreground">adaeze@example.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm text-foreground">+234 801 234 5678</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Heart className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Saved Properties</p>
              <Link to="/saved" className="text-sm text-primary font-medium hover:underline">3 saved homes</Link>
            </div>
          </div>
        </div>

        <Button variant="outline" className="mt-8 gap-2">
          <Edit2 className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Link to="/saved" className="px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-secondary transition-colors border border-border">
          Saved Properties
        </Link>
        <Link to="/messages" className="px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-secondary transition-colors border border-border">
          Messages
        </Link>
        <Link to="/agent-dashboard" className="px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-secondary transition-colors border border-border">
          Agent Dashboard
        </Link>
      </div>
    </div>
  );
}

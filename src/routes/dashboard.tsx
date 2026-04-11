import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutDashboard, Heart, Home, Wrench, MessageCircle, Settings, LogOut } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Elomaze" },
      { name: "description", content: "Your Elomaze dashboard. Manage saved properties, listings, and messages." },
    ],
  }),
  component: DashboardPage,
});

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Heart, label: "Saved" },
  { icon: Home, label: "Listings" },
  { icon: Wrench, label: "Services" },
  { icon: MessageCircle, label: "Messages" },
  { icon: Settings, label: "Settings" },
];

function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                  item.active
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
            <div className="pt-4">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <main>
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-sm text-muted-foreground mb-8">Here's what's happening with your account</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Saved Properties", value: "12" },
              { label: "Active Listings", value: "3" },
              { label: "Unread Messages", value: "5" },
            ].map((stat) => (
              <div key={stat.label} className="p-5 rounded-2xl border border-border premium-shadow">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border p-8 text-center">
            <p className="text-muted-foreground text-sm">Your dashboard is being set up. Check back soon!</p>
            <Link to="/properties" className="text-primary text-sm font-medium mt-2 inline-block hover:underline">
              Browse Properties →
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

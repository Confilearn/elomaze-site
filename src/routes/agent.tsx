import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Home, PlusCircle, MessageCircle, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/agent")({
  component: AgentLayout,
});

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/agent/dashboard" },
  { icon: Home, label: "My Listings", href: "/agent/listings" },
  { icon: PlusCircle, label: "Add Property", href: "/agent/add-property" },
  { icon: MessageCircle, label: "Messages", href: "/agent/messages" },
  { icon: Settings, label: "Settings", href: "/agent/settings" },
];

function AgentLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth pages don't get the dashboard layout
  if (location.pathname === "/agent/login" || location.pathname === "/agent/register") {
    return <Outlet />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4">
              <Link to="/" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                <LogOut className="w-4 h-4" />
                Log out
              </Link>
            </div>
          </nav>
        </aside>

        {/* Mobile Tabs */}
        <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Content */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

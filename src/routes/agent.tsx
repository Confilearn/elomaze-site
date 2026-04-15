import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Home, PlusCircle, MessageCircle, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

function AgentNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] px-4">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-primary">
            <path d="M12 3L3 10h2v10h5v-5h4v5h5V10h2L12 3z" fill="currentColor" opacity="0.3" />
            <path d="M12 3L3 10h2v10h5v-5h4v5h5V10h2L12 3z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Page Not Found</h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          This section is unavailable or may have moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link to="/agent/dashboard" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Back to Dashboard
          </Link>
          <Link to="/agent/listings" className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
            My Listings
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/agent")({
  component: AgentLayout,
  notFoundComponent: AgentNotFound,
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

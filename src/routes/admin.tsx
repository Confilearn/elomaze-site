import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Users, Building2, AlertTriangle, BadgeCheck, BarChart3, MessageCircle, Settings, LogOut, Menu, X, ChevronLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/admin" },
  { label: "Users", icon: Users, href: "/admin/users" },
  { label: "Listings", icon: Building2, href: "/admin/listings" },
  { label: "Reports", icon: AlertTriangle, href: "/admin/reports" },
  { label: "Verifications", icon: BadgeCheck, href: "/admin/verifications" },
  { label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
  { label: "Messages", icon: MessageCircle, href: "/admin/messages" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't show sidebar on login page
  if (location.pathname === "/admin/login") {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border/50 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-5 flex items-center justify-between border-b border-border/50">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M12 3L3 10h2v10h5v-5h4v5h5V10h2L12 3z" fill="white" />
              </svg>
            </div>
            <div>
              <span className="text-base font-bold text-foreground tracking-tight">Elomaze</span>
              <span className="block text-[10px] text-muted-foreground font-medium -mt-0.5">Admin Panel</span>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.href === "/admin"
              ? location.pathname === "/admin"
              : location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border/50">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Site
          </Link>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-md border-b border-border/50 px-4 lg:px-8 h-14 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-secondary">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-semibold text-foreground capitalize">
            {location.pathname === "/admin" ? "Overview" : location.pathname.split("/").pop()}
          </h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">A</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

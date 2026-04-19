import {
  createFileRoute,
  Outlet,
  Link,
  useLocation,
} from "@tanstack/react-router";
import {
  LayoutDashboard,
  Home,
  PlusCircle,
  MessageCircle,
  Settings,
  LogOut,
} from "lucide-react";
import Messages from "@/components/Messages";

export const Route = createFileRoute("/agent/messages")({
  head: () => ({
    meta: [
      { title: "Messages — Elomaze Agent" },
      {
        name: "description",
        content:
          "Your messages as an agent on Elomaze. Chat with clients, buyers, and tenants about properties.",
      },
    ],
  }),
  component: AgentMessages,
});

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/agent/dashboard" },
  { icon: Home, label: "My Listings", href: "/agent/listings" },
  { icon: PlusCircle, label: "Add Property", href: "/agent/add-property" },
  { icon: MessageCircle, label: "Messages", href: "/agent/messages" },
  { icon: Settings, label: "Settings", href: "/agent/settings" },
];

function AgentMessages() {
  const location = useLocation();

  return (
    <div className="flex h-full bg-background overflow-hidden">
      {/* Agent Sidebar */}
      <aside className="hidden lg:block w-60 border-r border-border bg-card">
        <nav className="space-y-1 p-4">
          {sidebarItems.map((item) => {
            const isActive =
              location.pathname === item.href ||
              location.pathname.startsWith(item.href + "/");
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
            <Link
              to="/"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </Link>
          </div>
        </nav>
      </aside>

      {/* Messages Content */}
      <div className="flex-1 min-w-0">
        <Messages />
      </div>
    </div>
  );
}

import React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Home, PlusCircle, MessageCircle, Settings } from "lucide-react";

export function AgentMobileNav() {
  const location = useLocation();

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Overview",
      href: "/agent/dashboard",
    },
    {
      icon: Home,
      label: "Listings",
      href: "/agent/listings",
    },
    {
      icon: PlusCircle,
      label: "Add",
      href: "/agent/add-property",
    },
    {
      icon: MessageCircle,
      label: "Messages",
      href: "/agent/messages",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/agent/settings",
    },
  ];

  // Don't show on auth pages
  if (
    location.pathname === "/agent/login" ||
    location.pathname === "/agent/register"
  ) {
    return null;
  }

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.href ||
            location.pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

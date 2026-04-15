import React from "react";
import { Link } from "@tanstack/react-router";
import { Home, Search, Heart, MessageCircle, User } from "lucide-react";

export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16">
        <Link
          to="/"
          className="flex flex-col items-center gap-1 text-muted-foreground transition-colors"
          activeProps={{
            className: "flex flex-col items-center gap-1 text-primary",
          }}
          activeOptions={{ exact: true }}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link
          to="/properties"
          className="flex flex-col items-center gap-1 text-muted-foreground transition-colors"
          activeProps={{
            className: "flex flex-col items-center gap-1 text-primary",
          }}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium">Search</span>
        </Link>
        <Link
          to="/saved"
          className="flex flex-col items-center gap-1 text-muted-foreground transition-colors"
          activeProps={{
            className: "flex flex-col items-center gap-1 text-primary",
          }}
        >
          <Heart className="w-5 h-5" />
          <span className="text-[10px] font-medium">Saved</span>
        </Link>
        <Link
          to="/messages"
          className="flex flex-col items-center gap-1 text-muted-foreground transition-colors"
          activeProps={{
            className: "flex flex-col items-center gap-1 text-primary",
          }}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-medium">Messages</span>
        </Link>
        <Link
          to="/profile"
          className="flex flex-col items-center gap-1 text-muted-foreground transition-colors"
          activeProps={{
            className: "flex flex-col items-center gap-1 text-primary",
          }}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>
    </nav>
  );
}

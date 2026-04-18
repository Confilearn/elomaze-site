/**
 * Main application header component with navigation and search
 *
 * This component handles:
 * - Site branding and logo
 * - Global search functionality with TanStack Router navigation
 * - Main navigation menu with active state highlighting
 * - Mobile responsive hamburger menu
 * - User authentication links
 *
 * Key TanStack Start patterns used:
 * - useNavigate() hook for programmatic navigation
 * - Link component with activeProps for active route styling
 * - Search parameters in navigation (search queries)
 *
 * For React/Vite developers: This replaces react-router-dom
 * with better TypeScript support and performance.
 */
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, Heart, MessageCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Header() {
  // Mobile menu state management
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // TanStack Router navigation hook for programmatic navigation
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo and branding - links to homepage */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
                <path d="M12 3L3 10h2v10h5v-5h4v5h5V10h2L12 3z" fill="white" />
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              Elomaze
            </span>
          </Link>

          {/* Desktop navigation - hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Properties link with active state styling */}
            <Link
              to="/properties"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{
                className: "px-4 py-2 text-sm font-medium text-foreground",
              }}
            >
              Properties
            </Link>

            {/* Saved properties with heart icon */}
            <Link
              to="/saved"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{
                className: "px-3 py-2 text-sm font-medium text-foreground",
              }}
            >
              <Heart className="w-4 h-4" />
            </Link>

            {/* Messages with message icon */}
            <Link
              to="/messages"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{
                className: "px-3 py-2 text-sm font-medium text-foreground",
              }}
            >
              <MessageCircle className="w-4 h-4" />
            </Link>

            {/* About page link */}
            <Link
              to="/about"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{
                className: "px-4 py-2 text-sm font-medium text-foreground",
              }}
            >
              About
            </Link>

            {/* Visual separator */}
            <div className="w-px h-6 bg-border mx-2" />

            {/* User authentication links */}
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Log in
            </Link>
            <Button variant="premium" size="sm" asChild>
              <Link to="/register">Sign up</Link>
            </Button>

            {/* Agent portal separator and link */}
            <div className="w-px h-6 bg-border mx-2" />
            <Button variant="outline" size="sm" asChild>
              <Link to="/agent/login">Agent Login</Link>
            </Button>
          </nav>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile navigation menu - shown when hamburger is clicked */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 animate-fade-up">
            {/* Mobile navigation links */}
            <nav className="flex flex-col gap-1">
              <Link
                to="/properties"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-secondary transition-colors"
              >
                Properties
              </Link>
              <Link
                to="/saved"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-secondary transition-colors"
              >
                Saved Homes
              </Link>
              <Link
                to="/messages"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-secondary transition-colors"
              >
                Messages
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-secondary transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-secondary transition-colors"
              >
                Contact
              </Link>

              {/* Mobile menu separator */}
              <div className="h-px bg-border my-2" />

              {/* Mobile authentication links */}
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-secondary transition-colors"
              >
                Log in
              </Link>
              <Button variant="premium" className="mt-2" asChild>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  Sign up
                </Link>
              </Button>
              <Button variant="outline" className="mt-2" asChild>
                <Link
                  to="/agent/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Agent Login
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

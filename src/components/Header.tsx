import { Link } from "@tanstack/react-router";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
                <path d="M12 3L3 10h2v10h5v-5h4v5h5V10h2L12 3z" fill="white" />
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              <span className="sr-only">E</span>lomaze
            </span>
          </Link>

          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search city, area, or property..."
                className="w-full h-10 pl-10 pr-4 rounded-full bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
              />
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/properties" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" activeProps={{ className: "px-4 py-2 text-sm font-medium text-foreground" }}>
              Properties
            </Link>
            <Link to="/about" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" activeProps={{ className: "px-4 py-2 text-sm font-medium text-foreground" }}>
              About
            </Link>
            <Link to="/contact" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" activeProps={{ className: "px-4 py-2 text-sm font-medium text-foreground" }}>
              Contact
            </Link>
            <div className="w-px h-6 bg-border mx-2" />
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </Link>
            <Button variant="premium" size="sm" asChild>
              <Link to="/register">Sign up</Link>
            </Button>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 animate-fade-up">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search city, area, or property..."
                className="w-full h-10 pl-10 pr-4 rounded-full bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <nav className="flex flex-col gap-1">
              <Link to="/properties" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-secondary transition-colors">Properties</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-secondary transition-colors">About</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-secondary transition-colors">Contact</Link>
              <div className="h-px bg-border my-2" />
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-secondary transition-colors">Log in</Link>
              <Button variant="premium" className="mt-2" asChild>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Sign up</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

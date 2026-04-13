import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login — Elomaze" },
      { name: "description", content: "Admin login for Elomaze" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: any credentials work
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M12 3L3 10h2v10h5v-5h4v5h5V10h2L12 3z" fill="white" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-foreground tracking-tight">Elomaze</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Admin Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to access the admin dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="bg-card rounded-2xl border border-border/50 p-8 premium-shadow">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@elomaze.com"
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-10 rounded-xl bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4 rounded accent-primary" />
                <span className="text-sm text-foreground">Remember me</span>
              </label>
              <Link to="/admin/login" className="text-sm text-primary hover:underline">Forgot password?</Link>
            </div>
          </div>

          <Button type="submit" variant="premium" size="lg" className="w-full mt-6">
            Sign In
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <Link to="/" className="text-primary hover:underline">← Back to Elomaze</Link>
        </p>
      </div>
    </div>
  );
}

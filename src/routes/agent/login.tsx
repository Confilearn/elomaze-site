import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/agent/login")({
  head: () => ({
    meta: [
      { title: "Agent Login — Elomaze" },
      { name: "description", content: "Log in to your Elomaze agent account." },
    ],
  }),
  component: AgentLoginPage,
});

function AgentLoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M12 3L3 10h2v10h5v-5h4v5h5V10h2L12 3z" fill="white" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Agent Login</h1>
          <p className="text-sm text-muted-foreground mt-1">Access your Elomaze agent dashboard</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
            <input type="email" placeholder="agent@example.com" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
            <input type="password" placeholder="••••••••" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <Button variant="premium" size="lg" className="w-full" asChild>
            <Link to="/agent/dashboard">Log in</Link>
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an agent account?{" "}
          <Link to="/agent/register" className="text-primary font-medium hover:underline">Sign up as Agent</Link>
        </p>
        <p className="text-center text-sm text-muted-foreground mt-2">
          <Link to="/login" className="text-primary font-medium hover:underline">User Login</Link>
        </p>
      </div>
    </div>
  );
}

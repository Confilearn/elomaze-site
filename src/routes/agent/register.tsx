import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/agent/register")({
  head: () => ({
    meta: [
      { title: "Agent Sign Up — Elomaze" },
      { name: "description", content: "Create your Elomaze agent account." },
    ],
  }),
  component: AgentRegisterPage,
});

function AgentRegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M12 3L3 10h2v10h5v-5h4v5h5V10h2L12 3z" fill="white" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Become an Agent</h1>
          <p className="text-sm text-muted-foreground mt-1">Create your agent account on Elomaze</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
            <input type="text" placeholder="Your full name" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Agency Name</label>
            <input type="text" placeholder="Your agency name" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
            <input type="email" placeholder="agent@example.com" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
            <input type="text" placeholder="+234 ..." className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
            <input type="password" placeholder="Create a password" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <Button type="submit" variant="premium" size="lg" className="w-full">
            Create Agent Account
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an agent account?{" "}
          <Link to="/agent/login" className="text-primary font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}

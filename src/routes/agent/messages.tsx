import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/agent/messages")({
  component: AgentMessages,
});

function AgentMessages() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Messages</h1>
      <div className="space-y-3">
        {[
          { name: "Adaeze Nwosu", msg: "Is the Lekki apartment available?", time: "2h ago" },
          { name: "Uche Eze", msg: "Can I visit the Gwarinpa duplex tomorrow?", time: "5h ago" },
          { name: "Fatima Bello", msg: "What's the final price?", time: "1d ago" },
        ].map((m, i) => (
          <div key={i} className="p-4 rounded-xl border border-border flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-primary">{m.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{m.name}</p>
              <p className="text-xs text-muted-foreground truncate">{m.msg}</p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">{m.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

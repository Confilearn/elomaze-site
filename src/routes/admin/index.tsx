import { createFileRoute } from "@tanstack/react-router";
import { Users, Building2, BadgeCheck, AlertTriangle, UserPlus, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

const stats = [
  { label: "Total Users", value: "12,847", change: "+12%", up: true, icon: Users },
  { label: "Total Listings", value: "3,259", change: "+8%", up: true, icon: Building2 },
  { label: "Verified Listings", value: "2,841", change: "+15%", up: true, icon: BadgeCheck },
  { label: "Pending Reports", value: "23", change: "-5%", up: false, icon: AlertTriangle },
  { label: "Active Agents", value: "487", change: "+6%", up: true, icon: UserPlus },
  { label: "New Signups", value: "342", change: "+18%", up: true, icon: TrendingUp },
];

const recentActivity = [
  { action: "New listing submitted", detail: "3-Bedroom Flat in Lekki Phase 1", time: "2 min ago", type: "listing" },
  { action: "User verified", detail: "Chidi Okafor — Agent", time: "15 min ago", type: "verify" },
  { action: "Report filed", detail: "Fake listing — Property #2847", time: "32 min ago", type: "report" },
  { action: "New user registered", detail: "amina.bello@gmail.com", time: "1 hr ago", type: "user" },
  { action: "Listing approved", detail: "Luxury Shortlet in Victoria Island", time: "2 hrs ago", type: "listing" },
  { action: "Agent suspended", detail: "Suspicious activity — Agent #391", time: "3 hrs ago", type: "report" },
  { action: "New listing submitted", detail: "5-Bedroom Duplex in Gwarinpa", time: "4 hrs ago", type: "listing" },
  { action: "Payment received", detail: "Premium listing upgrade — ₦25,000", time: "5 hrs ago", type: "listing" },
];

function AdminOverview() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-2xl border border-border/50 p-5 premium-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? "text-success" : "text-destructive"}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-card rounded-2xl border border-border/50 p-6 premium-shadow">
          <h2 className="text-base font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-border/30 last:border-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.type === "report" ? "bg-destructive" : item.type === "verify" ? "bg-success" : "bg-primary"}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground font-medium">{item.action}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="bg-card rounded-2xl border border-border/50 p-6 premium-shadow">
          <h2 className="text-base font-semibold text-foreground mb-4">Listings Growth</h2>
          <div className="h-64 rounded-xl bg-secondary/50 flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Chart visualization</p>
              <p className="text-xs text-muted-foreground">Connect analytics to see live data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-2xl border border-border/50 p-6 premium-shadow">
        <h2 className="text-base font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Review Reports", count: "23", color: "bg-destructive/10 text-destructive" },
            { label: "Pending Listings", count: "47", color: "bg-warning/10 text-warning-foreground" },
            { label: "Agent Requests", count: "12", color: "bg-primary/10 text-primary" },
            { label: "Verify Listings", count: "31", color: "bg-success/10 text-success" },
          ].map((action) => (
            <button key={action.label} className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left">
              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold ${action.color} mb-2`}>
                {action.count}
              </span>
              <p className="text-sm font-medium text-foreground">{action.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

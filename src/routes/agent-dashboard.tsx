import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Home, PlusCircle, MessageCircle, Settings, LogOut, Eye, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { properties } from "@/lib/data";
import { useState } from "react";

export const Route = createFileRoute("/agent-dashboard")({
  head: () => ({
    meta: [
      { title: "Agent Dashboard — Elomaze" },
      { name: "description", content: "Manage your property listings and messages on Elomaze." },
    ],
  }),
  component: AgentDashboardPage,
});

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", key: "overview" },
  { icon: Home, label: "My Listings", key: "listings" },
  { icon: PlusCircle, label: "Add Property", key: "add" },
  { icon: MessageCircle, label: "Messages", key: "messages" },
  { icon: Settings, label: "Settings", key: "settings" },
];

function AgentDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const agentListings = properties.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                  activeTab === item.key
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
            <div className="pt-4">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            </div>
          </nav>
        </aside>

        {/* Mobile Tabs */}
        <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${
                activeTab === item.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <main>
          {activeTab === "overview" && (
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Dashboard Overview</h1>
              <p className="text-sm text-muted-foreground mb-8">Manage your listings and track performance</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Eye, label: "Total Views", value: "1,284" },
                  { icon: Users, label: "Inquiries", value: "47" },
                  { icon: TrendingUp, label: "Active Listings", value: "3" },
                ].map((stat) => (
                  <div key={stat.label} className="p-5 rounded-2xl border border-border premium-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <stat.icon className="w-5 h-5 text-primary" />
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-lg font-semibold text-foreground mb-4">Recent Inquiries</h2>
              <div className="space-y-3">
                {["Is the Lekki apartment still available?", "Can I schedule a visit to the Gwarinpa duplex?", "What's the final price for the Asaba shortlet?"].map((q, i) => (
                  <div key={i} className="p-4 rounded-xl border border-border flex items-center justify-between">
                    <p className="text-sm text-foreground">{q}</p>
                    <Button variant="outline" size="sm">Reply</Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "listings" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-foreground">My Listings</h1>
                <Button variant="premium" size="sm" onClick={() => setActiveTab("add")}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Property
                </Button>
              </div>
              <div className="space-y-4">
                {agentListings.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl border border-border flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-full sm:w-24 h-20 rounded-xl bg-secondary overflow-hidden shrink-0">
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <Home className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                      <p className="text-xs text-muted-foreground">{p.location}</p>
                      <p className="text-sm font-bold text-primary mt-1">{p.priceLabel}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-destructive">Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "add" && (
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-6">Add New Property</h1>
              <div className="rounded-2xl border border-border p-6 sm:p-8 premium-shadow">
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Property Title</label>
                      <input type="text" placeholder="e.g. 3-Bedroom Apartment" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Property Type</label>
                      <select className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Apartment</option>
                        <option>Duplex</option>
                        <option>Self Contain</option>
                        <option>Student Lodge</option>
                        <option>Shortlet</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Price (₦)</label>
                      <input type="text" placeholder="e.g. 2,500,000" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Location</label>
                      <input type="text" placeholder="e.g. Lekki Phase 1, Lagos" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Bedrooms</label>
                      <input type="number" placeholder="3" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Bathrooms</label>
                      <input type="number" placeholder="2" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
                    <textarea placeholder="Describe your property..." rows={4} className="w-full px-4 py-3 rounded-2xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                  </div>
                  <Button variant="premium" size="lg" className="w-full sm:w-auto">
                    Publish Listing
                  </Button>
                </form>
              </div>
            </div>
          )}

          {activeTab === "messages" && (
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
          )}

          {activeTab === "settings" && (
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-6">Settings</h1>
              <div className="rounded-2xl border border-border p-6 sm:p-8 premium-shadow">
                <form className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Agency Name</label>
                    <input type="text" defaultValue="Chidi Properties" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                    <input type="text" defaultValue="+234 801 234 5678" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <input type="email" defaultValue="chidi@elomaze.com" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <Button variant="premium" size="lg">Save Changes</Button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

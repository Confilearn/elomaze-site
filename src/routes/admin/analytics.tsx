import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Users, Building2, MapPin, Eye } from "lucide-react";

export const Route = createFileRoute("/admin/analytics")({
  component: AdminAnalyticsPage,
});

const topStates = [
  { state: "Lagos", searches: 12450, percentage: 35 },
  { state: "Abuja (FCT)", searches: 8230, percentage: 23 },
  { state: "Rivers", searches: 4120, percentage: 12 },
  { state: "Edo", searches: 3080, percentage: 9 },
  { state: "Delta", searches: 2540, percentage: 7 },
  { state: "Oyo", searches: 1890, percentage: 5 },
  { state: "Enugu", searches: 1650, percentage: 5 },
  { state: "Anambra", searches: 1420, percentage: 4 },
];

const topListings = [
  { title: "Luxury 3-Bedroom Apartment", location: "Lekki Phase 1, Lagos", views: 4521 },
  { title: "5-Bedroom Detached Duplex", location: "Gwarinpa, Abuja", views: 3892 },
  { title: "Luxury Penthouse in Ikoyi", location: "Ikoyi, Lagos", views: 3456 },
  { title: "4-Bedroom Detached House", location: "GRA, Port Harcourt", views: 2987 },
  { title: "Furnished Shortlet in Victoria Island", location: "Victoria Island, Lagos", views: 2654 },
];

function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-foreground">Analytics</h2>
        <p className="text-sm text-muted-foreground">Platform insights and performance metrics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "New Users This Month", value: "1,247", icon: Users, change: "+18%" },
          { label: "Listings Growth", value: "+156", icon: Building2, change: "+12%" },
          { label: "Total Searches", value: "35,420", icon: MapPin, change: "+22%" },
          { label: "Page Views", value: "128,900", icon: Eye, change: "+15%" },
        ].map((card) => (
          <div key={card.label} className="bg-card rounded-2xl border border-border/50 p-5 premium-shadow">
            <div className="flex items-center justify-between mb-3">
              <card.icon className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium text-success">{card.change}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top States */}
        <div className="bg-card rounded-2xl border border-border/50 p-6 premium-shadow">
          <h3 className="text-base font-semibold text-foreground mb-4">Top States Searched</h3>
          <div className="space-y-3">
            {topStates.map((state, i) => (
              <div key={state.state} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{state.state}</span>
                    <span className="text-xs text-muted-foreground">{state.searches.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${state.percentage}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Viewed */}
        <div className="bg-card rounded-2xl border border-border/50 p-6 premium-shadow">
          <h3 className="text-base font-semibold text-foreground mb-4">Most Viewed Listings</h3>
          <div className="space-y-3">
            {topListings.map((listing, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-border/30 last:border-0">
                <span className="text-xs font-bold text-primary w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{listing.title}</p>
                  <p className="text-xs text-muted-foreground">{listing.location}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                  <Eye className="w-3 h-3" /> {listing.views.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="bg-card rounded-2xl border border-border/50 p-6 premium-shadow">
        <h3 className="text-base font-semibold text-foreground mb-4">Conversion Metrics</h3>
        <div className="h-64 rounded-xl bg-secondary/50 flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Connect analytics to see live conversion data</p>
          </div>
        </div>
      </div>
    </div>
  );
}

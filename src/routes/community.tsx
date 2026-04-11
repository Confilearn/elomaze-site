import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, MessageSquarePlus, TrendingUp, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommunityCard } from "@/components/CommunityCard";
import { communityQuestions, trendingLocations } from "@/lib/data";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Elomaze" },
      { name: "description", content: "Ask and see what people say about places across Nigeria. Real insights from real people." },
      { property: "og:title", content: "Community — Elomaze" },
      { property: "og:description", content: "Ask and see what people say about places across Nigeria." },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-24 lg:pb-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          Ask and see what people say about places
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Real insights from people who actually live in these areas
        </p>
      </div>

      {/* Search */}
      <div className="max-w-lg mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Apapa, Awka, Festac, Gwarinpa..."
            className="w-full h-12 pl-12 pr-4 rounded-full bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 premium-shadow"
          />
        </div>
      </div>

      {/* Ask Button */}
      <div className="text-center mb-10">
        <Button variant="premium" size="lg" className="gap-2">
          <MessageSquarePlus className="w-4 h-4" />
          Ask a Question
        </Button>
      </div>

      {/* Trending Locations */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Trending Locations</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingLocations.map((loc) => (
            <Link
              key={loc}
              to="/community/$locationId"
              params={{ locationId: loc.toLowerCase().replace(/\s+/g, "-") }}
              className="flex items-center gap-1.5 bg-secondary px-4 py-2 rounded-full text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <MapPin className="w-3 h-3" />
              {loc}
            </Link>
          ))}
        </div>
      </div>

      {/* Questions */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communityQuestions.map((q) => (
            <CommunityCard key={q.id} question={q} />
          ))}
        </div>
      </div>
    </div>
  );
}

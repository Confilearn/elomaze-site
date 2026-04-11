import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { properties, cities } from "@/lib/data";
import { useState } from "react";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Properties — Elomaze" },
      { name: "description", content: "Browse verified apartments, duplexes, shortlets, and student hostels across Nigeria." },
      { property: "og:title", content: "Properties — Elomaze" },
      { property: "og:description", content: "Browse verified apartments, duplexes, shortlets, and student hostels across Nigeria." },
    ],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const [selectedCity, setSelectedCity] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = selectedCity === "All"
    ? properties
    : properties.filter((p) => p.city === selectedCity);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-24 lg:pb-12">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Properties</h1>
        <p className="mt-2 text-sm text-muted-foreground">Find your perfect home across Nigeria</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full h-11 pl-10 pr-4 rounded-full bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Filter Pills */}
      {showFilters && (
        <div className="mb-6 p-4 rounded-2xl bg-secondary/50 border border-border/50 animate-fade-up">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Type</label>
              <div className="flex flex-wrap gap-2">
                {["All", "Apartment", "Duplex", "Shortlet", "Mini Flat", "Hostel", "House"].map((type) => (
                  <button key={type} className="px-3 py-1.5 text-xs rounded-full bg-background border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Bedrooms</label>
              <div className="flex gap-2">
                {["Any", "1", "2", "3", "4", "5+"].map((bed) => (
                  <button key={bed} className="px-3 py-1.5 text-xs rounded-full bg-background border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                    {bed}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* City Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {["All", ...cities].map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${
              selectedCity === city
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Results */}
      <p className="text-sm text-muted-foreground mb-4">{filteredProperties.length} properties found</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

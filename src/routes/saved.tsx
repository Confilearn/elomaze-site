import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { properties } from "@/lib/data";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved Properties — Elomaze" },
      { name: "description", content: "View your saved properties on Elomaze." },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  // Demo: show first 3 properties as "saved"
  const savedProperties = properties.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-24 lg:pb-12">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Saved Properties</h1>
          <p className="text-sm text-muted-foreground mt-1">{savedProperties.length} homes saved</p>
        </div>
      </div>

      {savedProperties.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-border">
          <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-foreground">No saved properties yet</h2>
          <p className="text-sm text-muted-foreground mt-2 mb-6">Start browsing and save homes you love</p>
          <Button variant="premium" asChild>
            <Link to="/properties">Browse Properties</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedProperties.map((property) => (
            <div key={property.id} className="relative">
              <PropertyCard property={property} />
              <button className="absolute top-3 right-3 z-10 w-9 h-9 bg-destructive/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-destructive transition-colors">
                <Trash2 className="w-4 h-4 text-destructive-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Trash2, MapPin, Bed, Bath, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { properties } from "@/lib/data";
import { usePropertyImage } from "@/hooks/use-property-images";
import { useState } from "react";
import { toast } from "sonner";

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
  const [savedIds, setSavedIds] = useState(() => properties.slice(0, 3).map((p) => p.id));
  const savedProperties = properties.filter((p) => savedIds.includes(p.id));

  const handleRemove = (id: string, title: string) => {
    setSavedIds((prev) => prev.filter((x) => x !== id));
    toast.success("Removed from saved", { description: title });
  };

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
            <SavedPropertyCard key={property.id} property={property} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
}

function SavedPropertyCard({ property, onRemove }: { property: typeof properties[0]; onRemove: (id: string, title: string) => void }) {
  const imageSrc = usePropertyImage(property.image);

  return (
    <div className="relative group">
      <Link to="/properties/$propertyId" params={{ propertyId: property.id }} className="block">
        <div className="rounded-2xl overflow-hidden bg-card border border-border/50 card-hover premium-shadow">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={imageSrc} alt={property.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            {property.verified && (
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-success text-success-foreground px-2.5 py-1 rounded-full text-xs font-medium">
                <BadgeCheck className="w-3 h-3" />
                Verified
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-1">{property.title}</h3>
            <div className="flex items-center gap-1 mt-1.5">
              <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
              <p className="text-xs text-muted-foreground truncate">{property.location}</p>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Bed className="w-3.5 h-3.5" />
                <span>{property.beds} Beds</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Bath className="w-3.5 h-3.5" />
                <span>{property.baths} Baths</span>
              </div>
            </div>
            <p className="mt-3 text-base font-bold text-primary">{property.priceLabel}</p>
          </div>
        </div>
      </Link>
      <button
        onClick={() => onRemove(property.id, property.title)}
        className="absolute top-3 right-3 z-10 w-9 h-9 bg-destructive/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-destructive transition-colors"
      >
        <Trash2 className="w-4 h-4 text-destructive-foreground" />
      </button>
    </div>
  );
}

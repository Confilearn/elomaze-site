import { Link } from "@tanstack/react-router";
import { Heart, MapPin, Bed, Bath, BadgeCheck } from "lucide-react";
import type { Property } from "@/lib/data";
import { usePropertyImage } from "@/hooks/use-property-images";

export function PropertyCard({ property }: { property: Property }) {
  const imageSrc = usePropertyImage(property.image);

  return (
    <Link to="/properties/$propertyId" params={{ propertyId: property.id }} className="block group">
      <div className="rounded-2xl overflow-hidden bg-card border border-border/50 card-hover premium-shadow">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageSrc}
            alt={property.title}
            loading="lazy"
            width={800}
            height={600}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button className="absolute top-3 right-3 w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors">
            <Heart className="w-4 h-4 text-foreground" />
          </button>
          {property.verified && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-success text-success-foreground px-2.5 py-1 rounded-full text-xs font-medium">
              <BadgeCheck className="w-3 h-3" />
              Verified
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-1">{property.title}</h3>
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
            <p className="text-xs text-muted-foreground truncate">{property.location}</p>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Bed className="w-3.5 h-3.5" />
              <span>{property.beds} {property.beds === 1 ? "Bed" : "Beds"}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Bath className="w-3.5 h-3.5" />
              <span>{property.baths} {property.baths === 1 ? "Bath" : "Baths"}</span>
            </div>
          </div>
          <p className="mt-3 text-base font-bold text-primary">{property.priceLabel}</p>
        </div>
      </div>
    </Link>
  );
}

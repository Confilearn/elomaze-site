/**
 * Property card component for displaying real estate listings
 *
 * This component renders a property card with:
 * - Property image with lazy loading and hover effects
 * - Save/unsave functionality with toast notifications
 * - Verification badge for trusted properties
 * - Property details (title, location, beds, baths, price)
 * - Click navigation to property detail page
 *
 * Key TanStack Start patterns:
 * - Link component with dynamic route parameters
 * - Custom hook for image optimization (usePropertyImage)
 * - Toast notifications for user feedback
 *
 * For React/Vite developers: This demonstrates how to create
 * reusable, interactive components with proper state management.
 */
import { Link } from "@tanstack/react-router";
import { Heart, MapPin, Bed, Bath, BadgeCheck } from "lucide-react";
import type { Property } from "@/lib/data";
import { usePropertyImage } from "@/hooks/use-property-images";
import { useState } from "react";
import { toast } from "sonner";

export function PropertyCard({ property }: { property: Property }) {
  // Get optimized image URL using custom hook
  const imageSrc = usePropertyImage(property.image);

  // Local state for save/unsave functionality
  const [saved, setSaved] = useState(false);

  /**
   * Handle save/unsave property action
   *
   * Prevents link navigation and toggles save state.
   * Shows toast notification for user feedback.
   *
   * @param e - Click event
   */
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);

    // Show appropriate toast notification
    if (!saved) {
      toast.success("Property saved", { description: property.title });
    } else {
      toast("Property removed from saved");
    }
  };

  return (
    // Link component with dynamic route parameter
    // Creates URLs like /properties/123 where 123 is the property ID
    // TanStack Router automatically handles type-safe parameter passing
    <Link
      to="/properties/$propertyId"
      params={{ propertyId: property.id }}
      className="block group"
    >
      <div className="rounded-2xl overflow-hidden bg-card border border-border/50 card-hover premium-shadow">
        {/* Property image section with overlay elements */}
        <div className="relative aspect-4/3 overflow-hidden">
          <img
            src={imageSrc}
            alt={property.title}
            loading="lazy" // Performance optimization for images
            width={800}
            height={600}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Save/unsave button overlay */}
          <button
            onClick={handleSave}
            className={`absolute top-3 right-3 w-9 h-9 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${saved ? "bg-red-500 hover:bg-red-600" : "bg-background/80 hover:bg-background"}`}
          >
            <Heart
              className={`w-4 h-4 ${saved ? "text-white fill-white" : "text-foreground"}`}
            />
          </button>

          {/* Verification badge for trusted properties */}
          {property.verified && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-success text-success-foreground px-2.5 py-1 rounded-full text-xs font-medium">
              <BadgeCheck className="w-3 h-3" />
              Verified
            </div>
          )}
        </div>

        {/* Property information section */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-1">
              {property.title}
            </h3>
          </div>

          {/* Location with icon */}
          <div className="flex items-center gap-1 mt-1.5">
            <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
            <p className="text-xs text-muted-foreground truncate">
              {property.location}
            </p>
          </div>

          {/* Property specifications (beds and baths) */}
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Bed className="w-3.5 h-3.5" />
              <span>
                {property.beds} {property.beds === 1 ? "Bed" : "Beds"}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Bath className="w-3.5 h-3.5" />
              <span>
                {property.baths} {property.baths === 1 ? "Bath" : "Baths"}
              </span>
            </div>
          </div>

          {/* Price display */}
          <p className="mt-3 text-base font-bold text-primary">
            {property.priceLabel}
          </p>
        </div>
      </div>
    </Link>
  );
}

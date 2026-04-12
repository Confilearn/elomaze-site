import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Bed, Bath, BadgeCheck, Phone, ArrowLeft, Heart, Share2, Shield, Zap, Car, Droplets, Gauge, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { properties } from "@/lib/data";
import { PropertyCard } from "@/components/PropertyCard";
import { getPropertyImage } from "@/hooks/use-property-images";

export const Route = createFileRoute("/properties/$propertyId")({
  head: ({ params }) => {
    const property = properties.find((p) => p.id === params.propertyId);
    return {
      meta: [
        { title: property ? `${property.title} — Elomaze` : "Property — Elomaze" },
        { name: "description", content: property?.description || "Property details on Elomaze" },
        { property: "og:title", content: property ? `${property.title} — Elomaze` : "Property — Elomaze" },
        { property: "og:description", content: property?.description || "Property details on Elomaze" },
      ],
    };
  },
  component: PropertyDetailsPage,
  notFoundComponent: () => (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-foreground">Property not found</h1>
      <Link to="/properties" className="text-primary mt-4 inline-block">Back to properties</Link>
    </div>
  ),
});

const amenityIcons: Record<string, React.ReactNode> = {
  "Borehole": <Droplets className="w-4 h-4" />,
  "Security": <Shield className="w-4 h-4" />,
  "24/7 Security": <Shield className="w-4 h-4" />,
  "Parking": <Car className="w-4 h-4" />,
  "Generator Backup": <Zap className="w-4 h-4" />,
  "Prepaid Meter": <Gauge className="w-4 h-4" />,
};

function PropertyDetailsPage() {
  const { propertyId } = Route.useParams();
  const property = properties.find((p) => p.id === propertyId);

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Property not found</h1>
        <Link to="/properties" className="text-primary mt-4 inline-block">Back to properties</Link>
      </div>
    );
  }

  const imageSrc = getPropertyImage(property.image);
  const relatedProperties = properties.filter((p) => p.id !== property.id).slice(0, 3);

  return (
    <div className="pb-32 lg:pb-12">
      {/* Top Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/properties" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <Heart className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl lg:rounded-3xl overflow-hidden aspect-[16/9] lg:aspect-[2.2/1]">
          <img src={imageSrc} alt={property.title} width={1200} height={600} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main */}
          <div className="lg:col-span-2">
            <div className="flex items-start gap-3">
              {property.verified && (
                <div className="flex items-center gap-1 bg-success text-success-foreground px-2.5 py-1 rounded-full text-xs font-medium shrink-0 mt-1">
                  <BadgeCheck className="w-3 h-3" />
                  Verified
                </div>
              )}
              <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full mt-1">{property.type}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mt-3 tracking-tight">{property.title}</h1>

            <div className="flex items-center gap-1 mt-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{property.location}</span>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-sm text-foreground">
                <Bed className="w-4 h-4 text-muted-foreground" />
                {property.beds} {property.beds === 1 ? "Bedroom" : "Bedrooms"}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-foreground">
                <Bath className="w-4 h-4 text-muted-foreground" />
                {property.baths} {property.baths === 1 ? "Bathroom" : "Bathrooms"}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">Description</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/50">
                    <div className="text-primary">
                      {amenityIcons[amenity] || <BadgeCheck className="w-4 h-4" />}
                    </div>
                    <span className="text-sm text-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">Location</h2>
              <div className="rounded-2xl bg-secondary h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">{property.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-border p-6 premium-shadow">
                <p className="text-2xl font-bold text-primary">{property.priceLabel}</p>
                <div className="mt-6 space-y-3">
                  <Button variant="premium" size="lg" className="w-full gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Message Agent
                  </Button>
                  <Button variant="outline" size="lg" className="w-full gap-2">
                    <Phone className="w-4 h-4" />
                    Call Agent
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-border p-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Listed by</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{property.agent.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{property.agent.name}</p>
                    <p className="text-xs text-muted-foreground">{property.agent.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-foreground mb-6">Similar Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border/50 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-lg font-bold text-primary truncate">{property.priceLabel}</p>
          </div>
          <Button variant="premium" size="sm" className="gap-1.5 shrink-0">
            <MessageCircle className="w-4 h-4" />
            Message
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
            <Phone className="w-4 h-4" />
            Call
          </Button>
        </div>
      </div>
    </div>
  );
}

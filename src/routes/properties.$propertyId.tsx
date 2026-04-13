import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Bed, Bath, BadgeCheck, Phone, ArrowLeft, Heart, Share2, Shield, Zap, Car, Droplets, Gauge, MessageCircle, Maximize, ParkingCircle, Wifi, Wind, Home as HomeIcon, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { properties } from "@/lib/data";
import { PropertyCard } from "@/components/PropertyCard";
import { getPropertyImage } from "@/hooks/use-property-images";
import { useState } from "react";

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
  "Swimming Pool": <Droplets className="w-4 h-4" />,
  "AC": <Wind className="w-4 h-4" />,
  "WiFi": <Wifi className="w-4 h-4" />,
  "Smart TV": <HomeIcon className="w-4 h-4" />,
  "Gym": <HomeIcon className="w-4 h-4" />,
  "Fenced Compound": <Shield className="w-4 h-4" />,
  "POP Ceiling": <HomeIcon className="w-4 h-4" />,
  "Boys Quarter": <HomeIcon className="w-4 h-4" />,
  "Garden": <HomeIcon className="w-4 h-4" />,
  "CCTV": <Shield className="w-4 h-4" />,
  "Elevator": <HomeIcon className="w-4 h-4" />,
  "Smart Home": <HomeIcon className="w-4 h-4" />,
  "Balcony": <HomeIcon className="w-4 h-4" />,
  "Kitchen": <HomeIcon className="w-4 h-4" />,
};

function PropertyDetailsPage() {
  const { propertyId } = Route.useParams();
  const property = properties.find((p) => p.id === propertyId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [saved, setSaved] = useState(false);

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🏠</div>
        <h1 className="text-2xl font-bold text-foreground">Property not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">This listing may have been removed or doesn't exist.</p>
        <Button variant="premium" className="mt-6" asChild>
          <Link to="/properties">Browse Properties</Link>
        </Button>
      </div>
    );
  }

  // Generate gallery images (use different property images for variety)
  const galleryImages = [
    getPropertyImage(property.image),
    getPropertyImage(`property-${((parseInt(property.id) + 1) % 6) + 1}`),
    getPropertyImage(`property-${((parseInt(property.id) + 2) % 6) + 1}`),
    getPropertyImage(`property-${((parseInt(property.id) + 3) % 6) + 1}`),
  ];

  const relatedProperties = properties
    .filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type))
    .slice(0, 3);

  return (
    <div className="pb-32 lg:pb-12">
      {/* Top Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/properties" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to listings
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${saved ? "bg-primary border-primary" : "border-border hover:bg-secondary"}`}
            >
              <Heart className={`w-4 h-4 ${saved ? "text-primary-foreground fill-primary-foreground" : ""}`} />
            </button>
            <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden">
          {/* Main Image */}
          <div className="aspect-[16/9] lg:aspect-[2.2/1]">
            <img
              src={galleryImages[currentImageIndex]}
              alt={`${property.title} - Image ${currentImageIndex + 1}`}
              width={1200}
              height={600}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
          {/* Gallery Nav */}
          <button
            onClick={() => setCurrentImageIndex((i) => (i > 0 ? i - 1 : galleryImages.length - 1))}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentImageIndex((i) => (i < galleryImages.length - 1 ? i + 1 : 0))}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === currentImageIndex ? "bg-background" : "bg-background/50"}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails - Desktop */}
        <div className="hidden lg:grid grid-cols-4 gap-2 mt-2">
          {galleryImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`rounded-xl overflow-hidden aspect-[16/9] border-2 transition-colors ${i === currentImageIndex ? "border-primary" : "border-transparent hover:border-border"}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 flex-wrap">
              {property.verified && (
                <div className="flex items-center gap-1 bg-success text-success-foreground px-2.5 py-1 rounded-full text-xs font-medium">
                  <BadgeCheck className="w-3 h-3" />
                  Verified
                </div>
              )}
              <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">{property.type}</span>
              {property.furnished && (
                <span className="text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full font-medium">Furnished</span>
              )}
              <span className="text-xs text-success bg-success/10 px-2.5 py-1 rounded-full font-medium">Available</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mt-3 tracking-tight">{property.title}</h1>

            <div className="flex items-center gap-1 mt-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{property.location}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{property.state} · {property.lga} LGA</p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 p-4 rounded-2xl bg-secondary/50">
              <div className="text-center">
                <Bed className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-sm font-semibold text-foreground">{property.beds}</p>
                <p className="text-xs text-muted-foreground">{property.beds === 1 ? "Bedroom" : "Bedrooms"}</p>
              </div>
              <div className="text-center">
                <Bath className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-sm font-semibold text-foreground">{property.baths}</p>
                <p className="text-xs text-muted-foreground">{property.baths === 1 ? "Bathroom" : "Bathrooms"}</p>
              </div>
              <div className="text-center">
                <ParkingCircle className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-sm font-semibold text-foreground">{property.parking}</p>
                <p className="text-xs text-muted-foreground">Parking</p>
              </div>
              <div className="text-center">
                <Maximize className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-sm font-semibold text-foreground">{property.sqm}</p>
                <p className="text-xs text-muted-foreground">Sq. Meters</p>
              </div>
            </div>

            {/* Description */}
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
                  <p className="text-xs text-muted-foreground mt-1">{property.state}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24 space-y-4">
              {/* Price Card */}
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
                  <Button variant="secondary" size="lg" className="w-full gap-2">
                    <Calendar className="w-4 h-4" />
                    Schedule Inspection
                  </Button>
                </div>
              </div>

              {/* Agent Card */}
              <div className="rounded-2xl border border-border p-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Listed by</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{property.agent.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-foreground">{property.agent.name}</p>
                      <BadgeCheck className="w-3.5 h-3.5 text-success" />
                    </div>
                    <p className="text-xs text-muted-foreground">{property.agent.phone}</p>
                    <p className="text-xs text-muted-foreground">Verified Agent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-foreground mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border/50 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-primary truncate">{property.priceLabel}</p>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-colors ${saved ? "bg-primary border-primary" : "border-border"}`}
          >
            <Heart className={`w-4 h-4 ${saved ? "text-primary-foreground fill-primary-foreground" : ""}`} />
          </button>
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

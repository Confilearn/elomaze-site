/**
 * Property detail page - Dynamic route for individual property listings
 *
 * This file demonstrates TanStack Start's dynamic routing with parameters:
 * - Route pattern: /properties/$propertyId
 * - URL example: /properties/123
 * - Parameter access: params.propertyId
 *
 * Key features:
 * - Dynamic meta tags based on property data
 * - Type-safe parameter access
 * - Custom not found handling for invalid property IDs
 * - Server-side rendering with property data
 *
 * For React/Vite developers: This replaces useParams() and useEffect()
 * data fetching patterns with built-in, type-safe routing.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin,
  Bed,
  Bath,
  BadgeCheck,
  Phone,
  ArrowLeft,
  Heart,
  Share2,
  Shield,
  Zap,
  Car,
  Droplets,
  Gauge,
  MessageCircle,
  Maximize,
  ParkingCircle,
  Wifi,
  Wind,
  Home as HomeIcon,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Star,
  Users,
  Flag,
  Play,
  Grid,
  List,
  Camera,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { properties } from "@/lib/data";
import { PropertyCard } from "@/components/PropertyCard";
import { getPropertyImage } from "@/hooks/use-property-images";
import { useState } from "react";

/**
 * Dynamic route configuration for property detail pages
 *
 * This route handles:
 * - Dynamic parameter extraction (propertyId)
 * - Dynamic meta tags based on property data
 * - Custom 404 handling for invalid properties
 * - Server-side data loading
 */
export const Route = createFileRoute("/properties/$propertyId")({
  /**
   * Dynamic head configuration based on route parameters
   *
   * This function receives route parameters and generates
   * appropriate meta tags for SEO and social sharing.
   * TanStack Start handles server-side rendering of these tags.
   *
   * @param params - Route parameters containing propertyId
   */
  head: ({ params }) => {
    const property = properties.find((p) => p.id === params.propertyId);
    return {
      meta: [
        {
          title: property
            ? `${property.title} — Elomaze`
            : "Property — Elomaze",
        },
        {
          name: "description",
          content: property?.description || "Property details on Elomaze",
        },
        {
          property: "og:title",
          content: property
            ? `${property.title} — Elomaze`
            : "Property — Elomaze",
        },
        {
          property: "og:description",
          content: property?.description || "Property details on Elomaze",
        },
      ],
    };
  },

  // Main component for this route
  component: PropertyDetailsPage,

  // Custom 404 component for invalid property IDs
  notFoundComponent: () => (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-foreground">Property not found</h1>
      <Link to="/properties" className="text-primary mt-4 inline-block">
        Back to properties
      </Link>
    </div>
  ),
});

/**
 * Icon mapping for property amenities
 *
 * This provides consistent iconography for different amenity types.
 * In production, this could be moved to a separate utilities file.
 */
const amenityIcons: Record<string, React.ReactNode> = {
  Borehole: <Droplets className="w-4 h-4" />,
  Security: <Shield className="w-4 h-4" />,
  "24/7 Security": <Shield className="w-4 h-4" />,
  Parking: <Car className="w-4 h-4" />,
  "Generator Backup": <Zap className="w-4 h-4" />,
  "Prepaid Meter": <Gauge className="w-4 h-4" />,
  "Swimming Pool": <Droplets className="w-4 h-4" />,
  AC: <Wind className="w-4 h-4" />,
  WiFi: <Wifi className="w-4 h-4" />,
  "Smart TV": <HomeIcon className="w-4 h-4" />,
  Gym: <HomeIcon className="w-4 h-4" />,
  "Fenced Compound": <Shield className="w-4 h-4" />,
  "POP Ceiling": <HomeIcon className="w-4 h-4" />,
  "Boys Quarter": <HomeIcon className="w-4 h-4" />,
  Garden: <HomeIcon className="w-4 h-4" />,
  CCTV: <Shield className="w-4 h-4" />,
  Elevator: <HomeIcon className="w-4 h-4" />,
  "Smart Home": <HomeIcon className="w-4 h-4" />,
  Balcony: <HomeIcon className="w-4 h-4" />,
  Kitchen: <HomeIcon className="w-4 h-4" />,
};

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "SJ",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Amazing apartment! The location is perfect and the landlord is very responsive. Highly recommend!",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "MC",
    rating: 4,
    date: "1 month ago",
    comment:
      "Great place to live. Clean, spacious, and well-maintained. Only minor issue is parking can be tight.",
  },
  {
    id: 3,
    name: "Amina Bello",
    avatar: "AB",
    rating: 5,
    date: "2 months ago",
    comment:
      "Excellent value for money. The apartment has everything you need and more. Very happy with my choice!",
  },
];

function PropertyDetailsPage() {
  const { propertyId } = Route.useParams();
  const property = properties.find((p) => p.id === propertyId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🏠</div>
        <h1 className="text-2xl font-bold text-foreground">
          Property not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This listing may have been removed or doesn't exist.
        </p>
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
    getPropertyImage(`property-${((parseInt(property.id) + 4) % 6) + 1}`),
  ];

  const relatedProperties = properties
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.city === property.city || p.type === property.type),
    )
    .slice(0, 3);

  const averageRating = 4.7;
  const totalReviews = 47;

  return (
    <div className="pb-32 lg:pb-12">
      {/* Top Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/properties"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to listings
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${saved ? "bg-primary border-primary" : "border-border hover:bg-secondary"}`}
            >
              <Heart
                className={`w-4 h-4 ${saved ? "text-primary-foreground fill-primary-foreground" : ""}`}
              />
            </button>
            <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Property Title Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
          Modern 2BHK Apartment with City View
        </h1>
        <div className="flex items-center gap-2 mt-3">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {property.location}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          5 min walk to metro station, 10 min to University Campus
        </p>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden">
          {/* Main Image */}
          <div className="aspect-video lg:aspect-[2.2/1]">
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
            onClick={() =>
              setCurrentImageIndex((i) =>
                i > 0 ? i - 1 : galleryImages.length - 1,
              )
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() =>
              setCurrentImageIndex((i) =>
                i < galleryImages.length - 1 ? i + 1 : 0,
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* View Photos Button */}
          <button className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-background transition-colors">
            <Camera className="w-4 h-4" />
            <span className="text-sm font-medium">View all photos</span>
          </button>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-5 gap-2 mt-4">
          {galleryImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`rounded-xl overflow-hidden aspect-video border-2 transition-colors ${i === currentImageIndex ? "border-primary" : "border-transparent hover:border-border"}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Property Overview & Pricing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6 lg:space-y-8">
            {/* Property Overview */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-secondary/50">
              <div className="text-center">
                <Bed className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1 sm:mb-2" />
                <p className="text-base sm:text-lg font-semibold text-foreground">
                  {property.beds}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {property.beds === 1 ? "Bedroom" : "Bedrooms"}
                </p>
              </div>
              <div className="text-center">
                <Bath className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1 sm:mb-2" />
                <p className="text-base sm:text-lg font-semibold text-foreground">
                  {property.baths}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {property.baths === 1 ? "Bathroom" : "Bathrooms"}
                </p>
              </div>
              <div className="text-center">
                <Maximize className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1 sm:mb-2" />
                <p className="text-base sm:text-lg font-semibold text-foreground">
                  {property.sqm}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Sq. Meters
                </p>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 rounded-2xl border border-border gap-4">
              <div className="text-center sm:text-left">
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
                  N1,000,000/year
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Available from March 1, 2026
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto min-h-11"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Tour
                </Button>
                <Button
                  variant="premium"
                  size="lg"
                  className="w-full sm:w-auto min-h-11"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </div>
            </div>

            {/* About this property */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                About this property
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Welcome to your dream home! This modern 2BHK apartment offers
                the perfect blend of comfort, style, and convenience. Located in
                the heart of the city, this property boasts stunning city views
                and is just minutes away from essential amenities including
                metro stations, shopping centers, and educational institutions.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                The apartment features spacious rooms with plenty of natural
                light, a well-equipped kitchen, modern bathrooms, and a cozy
                living area perfect for entertaining guests. The building offers
                24/7 security, parking facilities, and a range of amenities
                designed to make your life comfortable and enjoyable.
              </p>
            </div>

            {/* Amenities & Features */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Amenities & Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="text-primary shrink-0">
                      {amenityIcons[amenity] || (
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </div>
                    <span className="text-xs sm:text-sm text-foreground truncate">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Tour */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Video Tour
              </h2>
              <div className="aspect-video rounded-2xl overflow-hidden bg-secondary">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Property Video Tour"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Property Details
              </h2>
              <div className="rounded-2xl border border-border overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-0">
                    <div className="flex border-b border-border">
                      <div className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground bg-secondary/50 w-full sm:w-1/2">
                        Property Type
                      </div>
                      <div className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground font-medium w-full sm:w-1/2">
                        {property.type}
                      </div>
                    </div>
                    <div className="flex border-b border-border">
                      <div className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground bg-secondary/50 w-full sm:w-1/2">
                        Bedrooms
                      </div>
                      <div className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground font-medium w-full sm:w-1/2">
                        {property.beds}
                      </div>
                    </div>
                    <div className="flex border-b border-border">
                      <div className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground bg-secondary/50 w-full sm:w-1/2">
                        Bathrooms
                      </div>
                      <div className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground font-medium w-full sm:w-1/2">
                        {property.baths}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-0">
                    <div className="flex border-b border-border">
                      <div className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground bg-secondary/50 w-full sm:w-1/2">
                        Year Built
                      </div>
                      <div className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground font-medium w-full sm:w-1/2">
                        2022
                      </div>
                    </div>
                    <div className="flex border-b border-border">
                      <div className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground bg-secondary/50 w-full sm:w-1/2">
                        Area
                      </div>
                      <div className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground font-medium w-full sm:w-1/2">
                        {property.sqm} sqm
                      </div>
                    </div>
                    <div className="flex">
                      <div className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground bg-secondary/50 w-full sm:w-1/2">
                        Last Updated
                      </div>
                      <div className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground font-medium w-full sm:w-1/2">
                        2 days ago
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews & Ratings */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Reviews & Ratings
              </h2>

              {/* Rating Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-2xl bg-secondary/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl font-bold text-primary">
                      {averageRating}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-border"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {totalReviews} reviews
                      </p>
                    </div>
                  </div>

                  {/* Rating Breakdown */}
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-4">
                          {rating}
                        </span>
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{
                              width:
                                rating === 5
                                  ? "70%"
                                  : rating === 4
                                    ? "20%"
                                    : rating === 3
                                      ? "7%"
                                      : rating === 2
                                        ? "2%"
                                        : "1%",
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-8 text-right">
                          {rating === 5
                            ? "70%"
                            : rating === 4
                              ? "20%"
                              : rating === 3
                                ? "7%"
                                : rating === 2
                                  ? "2%"
                                  : "1%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-secondary/50">
                  <h3 className="font-semibold text-foreground mb-4">
                    Rating Breakdown
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Cleanliness
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Communication
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-border"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Value</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-border"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Reviews */}
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-6 rounded-2xl border border-border"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">
                          {review.avatar}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold text-foreground">
                              {review.name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-border"}`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Listed by */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Listed by
              </h2>
              <div className="p-4 sm:p-6 rounded-2xl border border-border">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-base sm:text-lg font-bold text-primary">
                      {property.agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-base sm:text-lg font-semibold text-foreground truncate">
                        {property.agent.name}
                      </p>
                      <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-success shrink-0" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                        <span className="text-xs sm:text-sm text-muted-foreground ml-1">
                          4.8
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Member since 2020
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {property.agent.phone}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto min-h-11"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto min-h-11"
                    >
                      <Flag className="w-4 h-4 mr-2" />
                      Report
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Quick Info
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-secondary/50">
                  <p className="text-sm text-muted-foreground">
                    Property Status
                  </p>
                  <p className="font-semibold text-foreground mt-1">
                    Available
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50">
                  <p className="text-sm text-muted-foreground">Date Listed</p>
                  <p className="font-semibold text-foreground mt-1">
                    Feb 15, 2026
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50">
                  <p className="text-sm text-muted-foreground">Property ID</p>
                  <p className="font-semibold text-foreground mt-1">
                    PROP-{property.id}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50">
                  <p className="text-sm text-muted-foreground">Land Size</p>
                  <p className="font-semibold text-foreground mt-1">
                    {property.sqm} sqm
                  </p>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Safety Tips
              </h2>
              <div className="p-6 rounded-2xl bg-secondary/50">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Verify the agent's profile: check if verified, has a
                      profile picture, and active listings.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Never pay before viewing the property.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Meet in safe locations during inspections.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Confirm ownership documents if necessary.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Bring someone along when visiting the property.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Use Elomaze messaging to track communication with the
                      agent.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Report suspicious activity immediately.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar - Hidden on Mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="rounded-2xl border border-border p-6 premium-shadow">
                <p className="text-2xl font-bold text-primary">
                  N1,000,000/year
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Available from March 1, 2026
                </p>
                <div className="mt-6 space-y-3">
                  <Button
                    variant="premium"
                    size="lg"
                    className="w-full sm:w-auto min-h-11"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Message Agent
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto min-h-11"
                  >
                    <Phone className="w-4 h-4" />
                    Call Agent
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Inspection
                  </Button>
                </div>
              </div>

              {/* Agent Card */}
              <div className="rounded-2xl border border-border p-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Listed by
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {property.agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-foreground">
                        {property.agent.name}
                      </p>
                      <BadgeCheck className="w-3.5 h-3.5 text-success" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {property.agent.phone}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Verified Agent
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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
            <p className="text-base font-bold text-primary truncate">
              N1,000,000/year
            </p>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-colors ${saved ? "bg-primary border-primary" : "border-border"}`}
          >
            <Heart
              className={`w-4 h-4 ${saved ? "text-primary-foreground fill-primary-foreground" : ""}`}
            />
          </button>
          <Button variant="premium" size="sm" className="gap-1.5 shrink-0">
            <MessageCircle className="w-4 h-4" />
            Message
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 shrink-0 min-h-11"
          >
            <Phone className="w-4 h-4" />
            Call
          </Button>
        </div>
      </div>
    </div>
  );
}

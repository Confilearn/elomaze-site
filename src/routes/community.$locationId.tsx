import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Shield, ArrowLeft } from "lucide-react";
import { CommunityCard } from "@/components/CommunityCard";
import { PropertyCard } from "@/components/PropertyCard";
import { ServiceCard } from "@/components/ServiceCard";
import { communityQuestions, properties, services } from "@/lib/data";

export const Route = createFileRoute("/community/$locationId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.locationId.charAt(0).toUpperCase() + params.locationId.slice(1).replace(/-/g, " ")} — Elomaze Community` },
      { name: "description", content: `Community insights, questions, and answers about ${params.locationId.replace(/-/g, " ")} on Elomaze.` },
    ],
  }),
  component: LocationPage,
});

function LocationPage() {
  const { locationId } = Route.useParams();
  const locationName = locationId.charAt(0).toUpperCase() + locationId.slice(1).replace(/-/g, " ");

  const locationQuestions = communityQuestions.filter(
    (q) => q.location.toLowerCase() === locationName.toLowerCase()
  );
  const allQuestions = locationQuestions.length > 0 ? locationQuestions : communityQuestions.slice(0, 3);
  const nearbyProperties = properties.slice(0, 3);
  const nearbyServices = services.slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-24 lg:pb-12">
      <Link to="/community" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to community
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{locationName}</h1>
          <p className="text-sm text-muted-foreground">Community insights & local info</p>
        </div>
      </div>

      {/* Safety Score */}
      <div className="mt-6 p-4 rounded-2xl bg-success/5 border border-success/20 flex items-center gap-3">
        <Shield className="w-5 h-5 text-success" />
        <div>
          <p className="text-sm font-medium text-foreground">Safety Score: Good</p>
          <p className="text-xs text-muted-foreground">Based on community feedback and local data</p>
        </div>
      </div>

      {/* Questions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Questions about {locationName}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allQuestions.map((q) => (
            <CommunityCard key={q.id} question={q} />
          ))}
        </div>
      </div>

      {/* Nearby Properties */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">Homes nearby</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {nearbyProperties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>

      {/* Nearby Services */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">Services nearby</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {nearbyServices.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Star, MapPin, BadgeCheck, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data";
import { ServiceCard } from "@/components/ServiceCard";

export const Route = createFileRoute("/services/$serviceId")({
  head: ({ params }) => {
    const service = services.find((s) => s.id === params.serviceId);
    return {
      meta: [
        { title: service ? `${service.name} — Elomaze` : "Service — Elomaze" },
        { name: "description", content: service?.description || "Service details on Elomaze" },
      ],
    };
  },
  component: ServiceDetailsPage,
});

function ServiceDetailsPage() {
  const { serviceId } = Route.useParams();
  const service = services.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Service not found</h1>
        <Link to="/services" className="text-primary mt-4 inline-block">Back to services</Link>
      </div>
    );
  }

  const relatedServices = services.filter((s) => s.id !== service.id && s.category === service.category).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-24 lg:pb-12">
      <Link to="/services" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to services
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-3xl shrink-0">
              {service.image}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">{service.name}</h1>
                {service.verified && <BadgeCheck className="w-5 h-5 text-success" />}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{service.category}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <span className="text-sm font-medium">{service.rating}</span>
                  <span className="text-sm text-muted-foreground">({service.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{service.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">About</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
          </div>

          {/* Reviews Placeholder */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Reviews</h2>
            <div className="space-y-4">
              {[
                { author: "Emeka O.", text: "Very professional and on time. Highly recommended!", rating: 5, date: "2 weeks ago" },
                { author: "Aisha M.", text: "Great service at a fair price. Will use again.", rating: 4, date: "1 month ago" },
                { author: "David I.", text: "Excellent work. They went above and beyond.", rating: 5, date: "3 weeks ago" },
              ].map((review) => (
                <div key={review.author} className="p-4 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{review.author[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{review.author}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-warning fill-warning" />
                        ))}
                      </div>
                    </div>
                    <span className="ml-auto text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="sticky top-24 space-y-4">
            <div className="rounded-2xl border border-border p-6 premium-shadow">
              <p className="text-xl font-bold text-primary">{service.price}</p>
              <div className="mt-4 space-y-3">
                <Button variant="premium" size="lg" className="w-full gap-2">
                  <Phone className="w-4 h-4" />
                  Contact Provider
                </Button>
                <Button variant="outline" size="lg" className="w-full gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Send Message
                </Button>
              </div>
            </div>

            {/* Trust Score */}
            <div className="rounded-2xl border border-border p-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Trust Score</h3>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-success">{service.rating}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Excellent</p>
                  <p className="text-xs text-muted-foreground">{service.reviews} verified reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {relatedServices.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-foreground mb-6">Similar Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

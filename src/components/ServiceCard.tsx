import { Link } from "@tanstack/react-router";
import { Star, MapPin, BadgeCheck } from "lucide-react";
import type { Service } from "@/lib/data";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link to="/services/$serviceId" params={{ serviceId: service.id }} className="block group">
      <div className="rounded-2xl overflow-hidden bg-card border border-border/50 p-5 card-hover premium-shadow">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-2xl shrink-0">
            {service.image}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground text-sm truncate">{service.name}</h3>
              {service.verified && <BadgeCheck className="w-4 h-4 text-success shrink-0" />}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{service.category}</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                <span className="text-xs font-medium text-foreground">{service.rating}</span>
                <span className="text-xs text-muted-foreground">({service.reviews})</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{service.location}</span>
              </div>
            </div>
            <p className="mt-2 text-sm font-semibold text-primary">{service.price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

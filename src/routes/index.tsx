import { createFileRoute } from "@tanstack/react-router";
import { Search, ArrowRight, Shield, Star, Users, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { ServiceCard } from "@/components/ServiceCard";
import { CommunityCard } from "@/components/CommunityCard";
import { properties, services, communityQuestions, trendingLocations } from "@/lib/data";
import { Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-lagos.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elomaze — Trusted Homes, Services & Community in Nigeria" },
      { name: "description", content: "Find trusted homes, discover local services, and get real community insights across Nigeria. Premium property platform built for Nigerians." },
      { property: "og:title", content: "Elomaze — Trusted Homes, Services & Community in Nigeria" },
      { property: "og:description", content: "Find trusted homes, discover local services, and get real community insights across Nigeria." },
    ],
  }),
  component: Index,
});

function Index() {
  const featuredProperties = properties.filter((p) => p.featured);
  const featuredServices = services.slice(0, 4);
  const trendingQuestions = communityQuestions.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Nigerian estate" width={1920} height={1080} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-background leading-tight tracking-tight animate-fade-up">
              Find trusted homes.{" "}
              <span className="opacity-80">Discover real places.</span>{" "}
              <span className="opacity-60">Move with confidence.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-background/70 max-w-lg leading-relaxed animate-fade-up stagger-1">
              Find homes, local services, and honest community advice across Nigeria.
            </p>

            {/* Search Bar */}
            <div className="mt-8 animate-fade-up stagger-2">
              <div className="flex items-center bg-background rounded-full p-1.5 premium-shadow-lg max-w-xl">
                <div className="flex items-center flex-1 px-4">
                  <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="Search city, area, property, or place..."
                    className="flex-1 ml-3 text-sm text-foreground placeholder:text-muted-foreground bg-transparent border-0 outline-none"
                  />
                </div>
                <Button variant="premium" size="lg" className="shrink-0">
                  Search
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-xs text-background/50">Popular:</span>
                {["Lekki", "Yaba", "Apapa", "Benin", "Awka"].map((city) => (
                  <span key={city} className="text-xs text-background/70 bg-background/10 px-2.5 py-1 rounded-full hover:bg-background/20 cursor-pointer transition-colors">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Featured Properties</h2>
            <p className="mt-2 text-sm text-muted-foreground">Handpicked homes verified by our team</p>
          </div>
          <Link to="/properties" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featuredProperties.map((property, i) => (
            <div key={property.id} className={`animate-fade-up stagger-${i + 1}`}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
        <div className="sm:hidden mt-6 text-center">
          <Button variant="outline" asChild>
            <Link to="/properties">View all properties</Link>
          </Button>
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Trusted Services</h2>
              <p className="mt-2 text-sm text-muted-foreground">Verified professionals for every need</p>
            </div>
            <Link to="/services" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Community */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Community Insights</h2>
            <p className="mt-2 text-sm text-muted-foreground">Real answers from real people about real places</p>
          </div>
          <Link to="/community" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingQuestions.map((q) => (
            <CommunityCard key={q.id} question={q} />
          ))}
        </div>

        {/* Trending Locations */}
        <div className="mt-10">
          <h3 className="text-sm font-semibold text-foreground mb-4">Trending Locations</h3>
          <div className="flex flex-wrap gap-2">
            {trendingLocations.map((loc) => (
              <span key={loc} className="flex items-center gap-1.5 bg-secondary px-4 py-2 rounded-full text-sm text-foreground hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                <MapPin className="w-3 h-3" />
                {loc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Elomaze */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Why Elomaze</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">Built for Nigeria. Trusted by thousands.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Verified Listings", desc: "Every property is physically verified by our local team" },
              { icon: Star, title: "Trusted Services", desc: "Background-checked professionals with real reviews" },
              { icon: Users, title: "Community Driven", desc: "Get honest advice from people who actually live there" },
              { icon: CheckCircle, title: "Nigeria First", desc: "Built specifically for the Nigerian property market" },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="bg-primary rounded-3xl p-8 sm:p-12 lg:p-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground tracking-tight">
            Ready to find your next home?
          </h2>
          <p className="mt-3 text-sm text-primary-foreground/70 max-w-md mx-auto">
            Join thousands of Nigerians who trust Elomaze to find homes, services, and community insights.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="hero-outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/properties">Browse Properties</Link>
            </Button>
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90 rounded-full" asChild>
              <Link to="/register">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

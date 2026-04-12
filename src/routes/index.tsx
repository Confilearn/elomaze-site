import { createFileRoute } from "@tanstack/react-router";
import { Search, ArrowRight, Shield, BadgeCheck, Sparkles, MapPin, Star, Building2, Home as HomeIcon, Hotel, GraduationCap, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { properties, cities, propertyTypes, testimonials } from "@/lib/data";
import { Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-lagos.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elomaze — Trusted Homes in Nigeria" },
      { name: "description", content: "Find trusted, verified homes across Nigeria. Browse apartments, duplexes, shortlets, and more with Elomaze." },
      { property: "og:title", content: "Elomaze — Trusted Homes in Nigeria" },
      { property: "og:description", content: "Find trusted, verified homes across Nigeria. Premium property platform built for Nigerians." },
    ],
  }),
  component: Index,
});

const typeIcons: Record<string, React.ReactNode> = {
  "Apartment": <Building2 className="w-6 h-6" />,
  "Duplex": <HomeIcon className="w-6 h-6" />,
  "Self Contain": <Hotel className="w-6 h-6" />,
  "Student Lodge": <GraduationCap className="w-6 h-6" />,
  "Shortlet": <CalendarDays className="w-6 h-6" />,
};

function Index() {
  const featuredProperties = properties.filter((p) => p.featured);

  return (
    <div>
      {/* Hero — PRESERVED */}
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
              Find verified homes and apartments across Nigeria. Your next home is one search away.
            </p>

            <div className="mt-8 animate-fade-up stagger-2">
              <div className="flex items-center bg-background rounded-full p-1.5 premium-shadow-lg max-w-xl">
                <div className="flex items-center flex-1 px-4">
                  <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="Search city, area, or property..."
                    className="flex-1 ml-3 text-sm text-foreground placeholder:text-muted-foreground bg-transparent border-0 outline-none"
                  />
                </div>
                <Button variant="premium" size="lg" className="shrink-0">
                  Search
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-xs text-background/50">Popular:</span>
                {["Lekki", "Yaba", "Gwarinpa", "Benin", "Asaba"].map((city) => (
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

      {/* Browse By City */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Browse By City</h2>
            <p className="mt-2 text-sm text-muted-foreground">Explore properties in Nigeria's top cities</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {cities.map((city, i) => (
              <Link
                key={city}
                to="/properties"
                className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-card border border-border/50 card-hover premium-shadow text-center animate-fade-up stagger-${i + 1}`}
              >
                <MapPin className="w-6 h-6 text-primary mb-2" />
                <span className="text-sm font-semibold text-foreground">{city}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Elomaze */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Why Choose Elomaze</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">Built for Nigeria. Trusted by thousands.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { icon: BadgeCheck, title: "Verified Listings", desc: "Every property is physically verified by our local team before it goes live. No fake listings, no surprises." },
            { icon: Shield, title: "Trusted Agents", desc: "All agents are background-checked and reviewed. Connect with professionals who deliver on their word." },
            { icon: Sparkles, title: "Easy Search Experience", desc: "Find your perfect home in minutes with smart filters, city browsing, and instant results." },
          ].map((item) => (
            <div key={item.title} className="text-center p-8 rounded-2xl border border-border/50 premium-shadow">
              <div className="w-14 h-14 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-base mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Browse By Property Type */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Browse By Property Type</h2>
            <p className="mt-2 text-sm text-muted-foreground">Find the right type of property for your needs</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {propertyTypes.map((type) => (
              <Link
                key={type}
                to="/properties"
                className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-card border border-border/50 card-hover premium-shadow text-center"
              >
                <div className="text-primary mb-3">
                  {typeIcons[type] || <Building2 className="w-6 h-6" />}
                </div>
                <span className="text-sm font-semibold text-foreground">{type}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">What People Are Saying</h2>
          <p className="mt-2 text-sm text-muted-foreground">Real stories from real renters across Nigeria</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="p-6 rounded-2xl border border-border/50 premium-shadow">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{t.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="bg-primary rounded-3xl p-8 sm:p-12 lg:p-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground tracking-tight">
            Ready to find your next home?
          </h2>
          <p className="mt-3 text-sm text-primary-foreground/70 max-w-md mx-auto">
            Join thousands of Nigerians who trust Elomaze to find verified homes and apartments.
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

import { createFileRoute } from "@tanstack/react-router";
import { Shield, Users, Globe, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Elomaze" },
      { name: "description", content: "Learn about Elomaze — Nigeria's trusted platform for homes, services, and community insights." },
      { property: "og:title", content: "About — Elomaze" },
      { property: "og:description", content: "Learn about Elomaze — Nigeria's trusted platform for homes, services, and community insights." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pb-24 lg:pb-12">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight max-w-2xl mx-auto leading-tight">
          Building trust in Nigeria's property market
        </h1>
        <p className="mt-4 text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Elomaze is on a mission to make finding homes, services, and community insights in Nigeria as easy and trustworthy as it should be.
        </p>
      </section>

      {/* Values */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-2xl font-bold text-foreground text-center mb-12">What drives us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Trust First", desc: "Every listing is verified. Every service provider is vetted. We earn trust through transparency." },
              { icon: Users, title: "Community Powered", desc: "Real insights from real Nigerians who know their neighborhoods inside out." },
              { icon: Globe, title: "Nigeria First", desc: "Built specifically for the Nigerian market, understanding local needs and context." },
              { icon: CheckCircle, title: "Premium Quality", desc: "We believe every Nigerian deserves a world-class property discovery experience." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: "5,000+", label: "Verified Properties" },
            { value: "2,500+", label: "Service Providers" },
            { value: "50,000+", label: "Community Members" },
            { value: "7", label: "Cities & Growing" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl sm:text-4xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

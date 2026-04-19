import { createFileRoute } from "@tanstack/react-router";

// Route regenerated to clear cache
import { Shield, Globe, CheckCircle, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Elomaze" },
      {
        name: "description",
        content:
          "Learn about Elomaze — Nigeria's trusted platform for finding verified homes.",
      },
      { property: "og:title", content: "About — Elomaze" },
      {
        property: "og:description",
        content:
          "Learn about Elomaze — Nigeria's trusted platform for finding verified homes.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pb-24 lg:pb-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight max-w-2xl mx-auto leading-tight">
          Building trust in Nigeria's property market
        </h1>
        <p className="mt-4 text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Elomaze was founded with a simple belief: every Nigerian deserves a
          trustworthy, stress-free experience finding a place to call home.
        </p>
      </section>

      {/* Founder Story */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl border border-border p-6 sm:p-8 premium-shadow">
          <h2 className="text-lg font-bold text-foreground mb-4">Our Story</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Elomaze started when our founder experienced the frustration of
            searching for a home in Lagos — fake listings, unresponsive agents,
            and zero transparency. After months of wasted time and money, we
            decided to build the platform we wished existed.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Today, Elomaze is the trusted property platform for Nigerians —
            verifying every listing, vetting every agent, and making the home
            search experience as seamless as it should be. We're on a mission to
            bring trust and transparency to Nigeria's property market, one
            verified listing at a time.
          </p>
        </div>
      </section>

      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-2xl font-bold text-foreground text-center mb-12">
            What drives us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Trust First",
                desc: "Every listing is physically verified. Every agent is vetted. We earn trust through transparency.",
              },
              {
                icon: Heart,
                title: "People Driven",
                desc: "We build for real Nigerians — students, families, professionals — not just investors.",
              },
              {
                icon: Globe,
                title: "Nigeria First",
                desc: "Built specifically for the Nigerian market, understanding local needs and context.",
              },
              {
                icon: CheckCircle,
                title: "Premium Quality",
                desc: "We believe every Nigerian deserves a world-class property discovery experience.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: "5,000+", label: "Verified Properties" },
            { value: "1,200+", label: "Trusted Agents" },
            { value: "50,000+", label: "Happy Users" },
            { value: "7", label: "Cities & Growing" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl sm:text-4xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

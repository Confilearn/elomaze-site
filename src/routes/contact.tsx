import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Elomaze" },
      { name: "description", content: "Get in touch with the Elomaze team. We're here to help you find your next home." },
      { property: "og:title", content: "Contact — Elomaze" },
      { property: "og:description", content: "Get in touch with the Elomaze team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 pb-24 lg:pb-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Get In Touch</h1>
        <p className="mt-3 text-base text-muted-foreground max-w-md mx-auto">Have a question or feedback? We'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
        <div className="rounded-2xl border border-border p-6 sm:p-8 premium-shadow">
          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                <input type="text" placeholder="Your name" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <input type="email" placeholder="you@example.com" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
              <input type="text" placeholder="How can we help?" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
              <textarea placeholder="Tell us more..." rows={5} className="w-full px-4 py-3 rounded-2xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
            </div>
            <Button variant="premium" size="lg" className="w-full sm:w-auto">
              Send Message
            </Button>
          </form>
        </div>

        <div className="space-y-6">
          {[
            { icon: Mail, label: "Email", value: "hello@elomaze.com" },
            { icon: Phone, label: "Phone", value: "+234 800 ELO MAZE" },
            { icon: MapPin, label: "Office", value: "Lagos, Nigeria" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

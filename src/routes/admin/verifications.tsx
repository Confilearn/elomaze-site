import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, X, MessageCircle, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/verifications")({
  component: AdminVerificationsPage,
});

const pendingAgents = [
  { id: "va1", name: "Yemi Alade", email: "yemi@email.com", phone: "+234 815 678 9012", license: "Pending Upload", submitted: "Apr 11, 2026" },
  { id: "va2", name: "Chinwe Okoro", email: "chinwe@email.com", phone: "+234 816 789 0123", license: "Uploaded", submitted: "Apr 10, 2026" },
  { id: "va3", name: "Dayo Akintola", email: "dayo@email.com", phone: "+234 817 890 1234", license: "Uploaded", submitted: "Apr 9, 2026" },
];

const pendingListings = [
  { id: "vl1", title: "3-Bedroom Flat in Lekki Phase 1", agent: "Chidi Okafor", address: "12 Admiralty Way, Lekki Phase 1, Lagos", images: 6, ownership: "Title deed uploaded", submitted: "Apr 12, 2026" },
  { id: "vl2", title: "2-Bedroom Apartment in Maitama", agent: "Amina Bello", address: "5 Amazon Street, Maitama, Abuja", images: 4, ownership: "C of O uploaded", submitted: "Apr 11, 2026" },
  { id: "vl3", title: "4-Bedroom Duplex in GRA PH", agent: "Ngozi Ibe", address: "23 Stadium Road, GRA, Port Harcourt", images: 8, ownership: "Pending", submitted: "Apr 10, 2026" },
];

function AdminVerificationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-foreground">Verifications</h2>
        <p className="text-sm text-muted-foreground">Manage agent and listing verification requests</p>
      </div>

      {/* Agents Pending */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-primary" /> Agents Pending Verification
        </h3>
        <div className="space-y-3">
          {pendingAgents.map((agent) => (
            <div key={agent.id} className="bg-card rounded-2xl border border-border/50 p-5 premium-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">{agent.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{agent.name}</p>
                  <p className="text-xs text-muted-foreground">{agent.email} · {agent.phone}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${agent.license === "Uploaded" ? "bg-success/10 text-success" : "bg-warning/10 text-warning-foreground"}`}>
                      <FileText className="w-2.5 h-2.5 inline mr-0.5" /> License: {agent.license}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{agent.submitted}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" variant="premium" className="gap-1"><BadgeCheck className="w-3 h-3" /> Approve</Button>
                <Button size="sm" variant="outline" className="gap-1"><X className="w-3 h-3" /> Reject</Button>
                <Button size="sm" variant="secondary" className="gap-1"><MessageCircle className="w-3 h-3" /> Request Info</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Listings Pending */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <BadgeCheck className="w-4 h-4 text-primary" /> Listings Pending Verification
        </h3>
        <div className="space-y-3">
          {pendingListings.map((listing) => (
            <div key={listing.id} className="bg-card rounded-2xl border border-border/50 p-5 premium-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">{listing.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{listing.address}</p>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <span className="text-[10px] text-muted-foreground">Agent: {listing.agent}</span>
                  <span className="text-[10px] text-muted-foreground">{listing.images} photos</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${listing.ownership.includes("uploaded") ? "bg-success/10 text-success" : "bg-warning/10 text-warning-foreground"}`}>
                    Ownership: {listing.ownership}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{listing.submitted}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" variant="premium" className="gap-1"><BadgeCheck className="w-3 h-3" /> Approve</Button>
                <Button size="sm" variant="outline" className="gap-1"><X className="w-3 h-3" /> Reject</Button>
                <Button size="sm" variant="secondary" className="gap-1"><MessageCircle className="w-3 h-3" /> Request Info</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Eye, Trash2, Ban, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/reports")({
  component: AdminReportsPage,
});

const demoReports = [
  { id: "r1", reporter: "Uche Obi", type: "Fake Listing", target: "3-Bed Flat in Lekki (Property #12)", reason: "Property photos are from a different location. Visited the address and it doesn't match.", date: "Apr 12, 2026", status: "Pending" },
  { id: "r2", reporter: "Blessing Okoh", type: "Wrong Price", target: "2-Bed Apartment in Yaba (Property #5)", reason: "Agent is asking for ₦2.5M but listing says ₦1.2M. Misleading pricing.", date: "Apr 11, 2026", status: "Pending" },
  { id: "r3", reporter: "Emeka Nwosu", type: "Scam Suspicion", target: "Agent: Folake Adebayo", reason: "Agent asked for upfront payment before inspection. Refused to show property first.", date: "Apr 10, 2026", status: "Under Review" },
  { id: "r4", reporter: "Kola Bankole", type: "Duplicate Listing", target: "Luxury Apartment in Ikoyi (Property #7)", reason: "Same property listed twice with different prices by different agents.", date: "Apr 9, 2026", status: "Resolved" },
  { id: "r5", reporter: "Ifeoma Nwachukwu", type: "Fake Listing", target: "5-Bed Duplex in Gwarinpa (Property #10)", reason: "Property doesn't exist at the listed address. Complete fabrication.", date: "Apr 8, 2026", status: "Pending" },
  { id: "r6", reporter: "Halima Yusuf", type: "Inappropriate Content", target: "Shortlet in Asaba (Property #23)", reason: "Listing description contains inappropriate and misleading claims.", date: "Apr 7, 2026", status: "Resolved" },
];

function AdminReportsPage() {
  const [openAction, setOpenAction] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Reports</h2>
        <p className="text-sm text-muted-foreground">Review and moderate reported content</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl border border-border/50 p-5 premium-shadow">
          <p className="text-2xl font-bold text-destructive">{demoReports.filter(r => r.status === "Pending").length}</p>
          <p className="text-xs text-muted-foreground">Pending Reports</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/50 p-5 premium-shadow">
          <p className="text-2xl font-bold text-warning-foreground">{demoReports.filter(r => r.status === "Under Review").length}</p>
          <p className="text-xs text-muted-foreground">Under Review</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/50 p-5 premium-shadow">
          <p className="text-2xl font-bold text-success">{demoReports.filter(r => r.status === "Resolved").length}</p>
          <p className="text-xs text-muted-foreground">Resolved</p>
        </div>
      </div>

      <div className="space-y-3">
        {demoReports.map((report) => (
          <div key={report.id} className="bg-card rounded-2xl border border-border/50 p-5 premium-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${report.status === "Pending" ? "bg-destructive/10" : report.status === "Under Review" ? "bg-warning/10" : "bg-success/10"}`}>
                  <AlertTriangle className={`w-5 h-5 ${report.status === "Pending" ? "text-destructive" : report.status === "Under Review" ? "text-warning-foreground" : "text-success"}`} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">{report.type}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${report.status === "Pending" ? "bg-warning/10 text-warning-foreground" : report.status === "Under Review" ? "bg-primary/10 text-primary" : "bg-success/10 text-success"}`}>{report.status}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground mt-1.5">{report.target}</p>
                  <p className="text-xs text-muted-foreground mt-1">{report.reason}</p>
                  <p className="text-[10px] text-muted-foreground mt-2">Reported by {report.reporter} · {report.date}</p>
                </div>
              </div>
              {report.status !== "Resolved" && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors" title="Review">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-success/10 transition-colors" title="Dismiss">
                    <Check className="w-4 h-4 text-success" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors" title="Remove Listing">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors" title="Suspend User">
                    <Ban className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

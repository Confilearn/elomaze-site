import { createFileRoute } from "@tanstack/react-router";
import { Search, MoreHorizontal, Eye, Check, X, Star, Trash2, Edit } from "lucide-react";
import { properties } from "@/lib/data";
import { getPropertyImage } from "@/hooks/use-property-images";
import { useState } from "react";

export const Route = createFileRoute("/admin/listings")({
  component: AdminListingsPage,
});

function AdminListingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const listingsWithStatus = properties.map((p, i) => ({
    ...p,
    status: i < 3 ? "Pending" : p.verified ? "Approved" : "Pending",
    createdDate: `Apr ${(15 - i % 15)}, 2026`,
  }));

  const filtered = listingsWithStatus.filter((l) => {
    const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Listings</h2>
        <p className="text-sm text-muted-foreground">Manage all property listings</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search listings..." className="w-full h-10 pl-10 pr-4 rounded-xl bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-10 px-3 rounded-xl bg-secondary border-0 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="All">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden premium-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-secondary/30">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Property</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Price</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Agent</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Date</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 20).map((listing) => (
                <tr key={listing.id} className="border-b border-border/30 last:border-0 hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={getPropertyImage(listing.image)} alt="" className="w-12 h-9 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate max-w-[200px]">{listing.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{listing.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-primary hidden sm:table-cell">{listing.priceLabel}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">{listing.agent.name}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${listing.status === "Approved" ? "bg-success/10 text-success" : "bg-warning/10 text-warning-foreground"}`}>
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">{listing.createdDate}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="relative inline-block">
                      <button onClick={() => setOpenMenu(openMenu === listing.id ? null : listing.id)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                      {openMenu === listing.id && (
                        <div className="absolute right-0 mt-1 w-44 bg-card border border-border rounded-xl shadow-lg z-10 overflow-hidden">
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-secondary" onClick={() => setOpenMenu(null)}><Eye className="w-3 h-3" /> View</button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-secondary" onClick={() => setOpenMenu(null)}><Check className="w-3 h-3" /> Approve</button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-secondary" onClick={() => setOpenMenu(null)}><X className="w-3 h-3" /> Reject</button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-secondary" onClick={() => setOpenMenu(null)}><Edit className="w-3 h-3" /> Edit</button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-secondary" onClick={() => setOpenMenu(null)}><Star className="w-3 h-3" /> Feature</button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-destructive hover:bg-destructive/10" onClick={() => setOpenMenu(null)}><Trash2 className="w-3 h-3" /> Delete</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

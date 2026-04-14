import { createFileRoute } from "@tanstack/react-router";
import { Search, MoreHorizontal, Eye, Check, X as XIcon, Star, Trash2, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { properties } from "@/lib/data";
import { getPropertyImage } from "@/hooks/use-property-images";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/listings")({
  component: AdminListingsPage,
});

const ITEMS_PER_PAGE = 10;

function AdminListingsPage() {
  const [listings, setListings] = useState(() =>
    properties.map((p, i) => ({
      ...p,
      status: i < 3 ? "Pending" as const : p.verified ? "Approved" as const : "Pending" as const,
      featured: p.featured,
      createdDate: `Apr ${(15 - i % 15)}, 2026`,
    }))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [viewListing, setViewListing] = useState<typeof listings[0] | null>(null);
  const [editListing, setEditListing] = useState<typeof listings[0] | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = listings.filter((l) => {
    const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleApprove = (id: string) => {
    setListings((prev) => prev.map((l) => l.id === id ? { ...l, status: "Approved" as const, verified: true } : l));
    setOpenMenu(null);
    toast.success("Listing approved!");
  };

  const handleReject = (id: string) => {
    setListings((prev) => prev.map((l) => l.id === id ? { ...l, status: "Pending" as const, verified: false } : l));
    setOpenMenu(null);
    toast.success("Listing rejected!");
  };

  const handleFeature = (id: string) => {
    setListings((prev) => prev.map((l) => l.id === id ? { ...l, featured: !l.featured } : l));
    setOpenMenu(null);
    const listing = listings.find((l) => l.id === id);
    toast.success(listing?.featured ? "Listing unfeatured!" : "Listing featured!");
  };

  const handleDelete = (id: string) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
    setDeleteConfirm(null);
    toast.success("Listing deleted!");
  };

  const handleEditOpen = (listing: typeof listings[0]) => {
    setEditTitle(listing.title);
    setEditPrice(listing.price.toString());
    setEditListing(listing);
    setOpenMenu(null);
  };

  const handleEditSave = () => {
    if (editListing) {
      setListings((prev) =>
        prev.map((l) =>
          l.id === editListing.id
            ? { ...l, title: editTitle, price: parseInt(editPrice) || l.price, priceLabel: `₦${(parseInt(editPrice) || l.price).toLocaleString()}` }
            : l
        )
      );
      setEditListing(null);
      toast.success("Listing updated!");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Listings</h2>
        <p className="text-sm text-muted-foreground">Manage all property listings</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} placeholder="Search listings..." className="w-full h-10 pl-10 pr-4 rounded-xl bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="h-10 px-3 rounded-xl bg-secondary border-0 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
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
              {paginated.map((listing) => (
                <tr key={listing.id} className="border-b border-border/30 last:border-0 hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={getPropertyImage(listing.image)} alt="" className="w-12 h-9 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-medium text-foreground truncate max-w-[200px]">{listing.title}</p>
                          {listing.featured && <Star className="w-3 h-3 text-warning fill-warning shrink-0" />}
                        </div>
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
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-secondary" onClick={() => { setViewListing(listing); setOpenMenu(null); }}><Eye className="w-3 h-3" /> View</button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-secondary" onClick={() => handleApprove(listing.id)}><Check className="w-3 h-3" /> Approve</button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-secondary" onClick={() => handleReject(listing.id)}><XIcon className="w-3 h-3" /> Reject</button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-secondary" onClick={() => handleEditOpen(listing)}><Edit className="w-3 h-3" /> Edit</button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-secondary" onClick={() => handleFeature(listing.id)}><Star className="w-3 h-3" /> {listing.featured ? "Unfeature" : "Feature"}</button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-destructive hover:bg-destructive/10" onClick={() => { setDeleteConfirm(listing.id); setOpenMenu(null); }}><Trash2 className="w-3 h-3" /> Delete</button>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</span>
          <Button variant="outline" size="icon" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* View Modal */}
      {viewListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-foreground/30 backdrop-blur-sm" onClick={() => setViewListing(null)}>
          <div className="bg-background rounded-2xl border border-border premium-shadow p-6 w-full max-w-md animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Listing Details</h2>
              <button onClick={() => setViewListing(null)} className="p-1.5 rounded-lg hover:bg-secondary"><XIcon className="w-4 h-4" /></button>
            </div>
            <img src={getPropertyImage(viewListing.image)} alt="" className="w-full h-40 rounded-xl object-cover mb-4" />
            <h3 className="text-base font-semibold text-foreground mb-1">{viewListing.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{viewListing.location}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Price</span><span className="text-primary font-medium">{viewListing.priceLabel}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Agent</span><span className="text-foreground">{viewListing.agent.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className={viewListing.status === "Approved" ? "text-success" : "text-warning-foreground"}>{viewListing.status}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="text-foreground">{viewListing.type}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Beds/Baths</span><span className="text-foreground">{viewListing.beds}/{viewListing.baths}</span></div>
            </div>
            <Button variant="outline" className="w-full mt-6" onClick={() => setViewListing(null)}>Close</Button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-foreground/30 backdrop-blur-sm" onClick={() => setEditListing(null)}>
          <div className="bg-background rounded-2xl border border-border premium-shadow p-6 w-full max-w-md animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Edit Listing</h2>
              <button onClick={() => setEditListing(null)} className="p-1.5 rounded-lg hover:bg-secondary"><XIcon className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Title</label>
                <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Price (₦)</label>
                <input type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setEditListing(null)}>Cancel</Button>
                <Button variant="premium" className="flex-1" onClick={handleEditSave}>Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-foreground/30 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-background rounded-2xl border border-border premium-shadow p-6 w-full max-w-sm animate-fade-up text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-destructive" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">Delete Listing?</h2>
            <p className="text-sm text-muted-foreground mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <Button variant="destructive" className="flex-1" onClick={() => handleDelete(deleteConfirm)}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

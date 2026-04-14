import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, PlusCircle, X, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { properties } from "@/lib/data";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/agent/listings")({
  component: AgentListings,
});

function AgentListings() {
  const [listings, setListings] = useState(() => properties.slice(0, 5));
  const [editModal, setEditModal] = useState<typeof listings[0] | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const handleEdit = (listing: typeof listings[0]) => {
    setEditTitle(listing.title);
    setEditPrice(listing.price.toString());
    setEditModal(listing);
  };

  const handleSaveEdit = () => {
    if (editModal) {
      setListings((prev) =>
        prev.map((l) =>
          l.id === editModal.id
            ? { ...l, title: editTitle, price: parseInt(editPrice) || l.price, priceLabel: `₦${(parseInt(editPrice) || l.price).toLocaleString()}/yr` }
            : l
        )
      );
      setEditModal(null);
      toast.success("Listing updated successfully!");
    }
  };

  const handleDelete = (id: string) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
    setDeleteConfirm(null);
    toast.success("Listing removed successfully!");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Listings</h1>
        <Button variant="premium" size="sm" asChild>
          <Link to="/agent/add-property">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Property
          </Link>
        </Button>
      </div>
      <div className="space-y-4">
        {listings.map((p) => (
          <div key={p.id} className="p-4 rounded-2xl border border-border flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-full sm:w-24 h-20 rounded-xl bg-secondary overflow-hidden shrink-0">
              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <Home className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
              <p className="text-xs text-muted-foreground">{p.location}</p>
              <p className="text-sm font-bold text-primary mt-1">{p.priceLabel}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(p)}>
                <Edit2 className="w-3 h-3 mr-1" /> Edit
              </Button>
              <Button variant="outline" size="sm" className="text-destructive" onClick={() => setDeleteConfirm(p.id)}>
                <Trash2 className="w-3 h-3 mr-1" /> Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-foreground/30 backdrop-blur-sm" onClick={() => setEditModal(null)}>
          <div className="bg-background rounded-2xl border border-border premium-shadow p-6 w-full max-w-md animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Edit Listing</h2>
              <button onClick={() => setEditModal(null)} className="p-1.5 rounded-lg hover:bg-secondary"><X className="w-4 h-4" /></button>
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
                <Button variant="outline" className="flex-1" onClick={() => setEditModal(null)}>Cancel</Button>
                <Button variant="premium" className="flex-1" onClick={handleSaveEdit}>Save Changes</Button>
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
            <h2 className="text-lg font-bold text-foreground mb-2">Remove Listing?</h2>
            <p className="text-sm text-muted-foreground mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <Button variant="destructive" className="flex-1" onClick={() => handleDelete(deleteConfirm)}>Remove</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

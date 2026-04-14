import { createFileRoute } from "@tanstack/react-router";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allStates, getCitiesForState, getLGAsForState } from "@/lib/nigeria-data";
import { propertyTypes } from "@/lib/data";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/agent/add-property")({
  component: AgentAddProperty,
});

function AgentAddProperty() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLGA, setSelectedLGA] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const stateCities = selectedState ? getCitiesForState(selectedState) : [];
  const stateLGAs = selectedState ? getLGAsForState(selectedState) : [];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Listing published successfully!", {
      description: "Your property is now live on Elomaze.",
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Add New Property</h1>
      <div className="rounded-2xl border border-border p-6 sm:p-8 premium-shadow">
        <form className="space-y-5" onSubmit={handlePublish}>
          {/* Images */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Property Images</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive flex items-center justify-center">
                    <X className="w-3 h-3 text-destructive-foreground" />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/50 transition-colors">
                <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                <span className="text-xs text-muted-foreground">Upload</span>
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            <p className="text-xs text-muted-foreground">Upload up to 10 images. First image will be the cover.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Property Title</label>
              <input type="text" placeholder="e.g. 3-Bedroom Apartment" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Property Type</label>
              <select className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="">Select type</option>
                {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">State</label>
              <select value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedCity(""); setSelectedLGA(""); }} className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="">Select state</option>
                {allStates.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">City</label>
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState} className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="">{selectedState ? "Select city" : "Select state first"}</option>
                {stateCities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">LGA</label>
              <select value={selectedLGA} onChange={(e) => setSelectedLGA(e.target.value)} disabled={!selectedState} className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="">{selectedState ? "Select LGA" : "Select state first"}</option>
                {stateLGAs.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Price (₦)</label>
              <input type="text" placeholder="e.g. 2,500,000" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Address</label>
              <input type="text" placeholder="e.g. Lekki Phase 1, Lagos" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Bedrooms</label>
              <input type="number" placeholder="3" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Bathrooms</label>
              <input type="number" placeholder="2" className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
            <textarea placeholder="Describe your property..." rows={4} className="w-full px-4 py-3 rounded-2xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
          </div>

          <Button type="submit" variant="premium" size="lg" className="w-full sm:w-auto">
            Publish Listing
          </Button>
        </form>
      </div>
    </div>
  );
}

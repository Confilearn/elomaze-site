import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import { useState } from "react";
import { propertyTypes as dataPropertyTypes } from "@/lib/data";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  onClearAll: () => void;
  initialFilters: FilterState;
}

export interface FilterState {
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  minPrice: string;
  maxPrice: string;
  amenities: string[];
  verifiedOnly: boolean;
}

const propertyTypes = ["Any", ...dataPropertyTypes];
const bedroomOptions = ["Any", "1", "2", "3", "4", "5+"];
const bathroomOptions = ["Any", "1", "2", "3", "4", "5+"];
const amenityOptions = [
  "WiFi",
  "Parking",
  "AC",
  "Security",
  "Water",
  "Generator",
  "Swimming Pool",
  "Borehole",
  "Gym",
  "Garden",
  "Elevator",
  "Smart TV",
];

export function FilterModal({
  isOpen,
  onClose,
  onApplyFilters,
  onClearAll,
  initialFilters,
}: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [showAmenities, setShowAmenities] = useState(true);

  const handlePropertyTypeChange = (type: string) => {
    setFilters((prev) => ({ ...prev, propertyType: type }));
  };

  const handleBedroomsChange = (bedrooms: string) => {
    setFilters((prev) => ({ ...prev, bedrooms }));
  };

  const handleBathroomsChange = (bathrooms: string) => {
    setFilters((prev) => ({ ...prev, bathrooms }));
  };

  const handleMinPriceChange = (value: string) => {
    setFilters((prev) => ({ ...prev, minPrice: value }));
  };

  const handleMaxPriceChange = (value: string) => {
    setFilters((prev) => ({ ...prev, maxPrice: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleVerifiedToggle = (checked: boolean) => {
    setFilters((prev) => ({ ...prev, verifiedOnly: checked }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClearAll = () => {
    const clearedFilters: FilterState = {
      propertyType: "Any",
      bedrooms: "Any",
      bathrooms: "Any",
      minPrice: "",
      maxPrice: "",
      amenities: [],
      verifiedOnly: false,
    };
    setFilters(clearedFilters);
    onClearAll();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-1/2 top-1/2 z-50 grid w-full min-w-72 max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 rounded-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] max-h-[85vh] sm:max-h-[90vh] overflow-y-auto scrollbar-hide">
        <DialogHeader className="border-b border-border pb-4">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Property Type */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">
              Property Type
            </h3>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handlePropertyTypeChange(type)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    filters.propertyType === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">
              Bedrooms
            </h3>
            <div className="flex flex-wrap gap-2">
              {bedroomOptions.map((beds) => (
                <button
                  key={beds}
                  onClick={() => handleBedroomsChange(beds)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    filters.bedrooms === beds
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {beds}
                </button>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">
              Bathrooms
            </h3>
            <div className="flex flex-wrap gap-2">
              {bathroomOptions.map((baths) => (
                <button
                  key={baths}
                  onClick={() => handleBathroomsChange(baths)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    filters.bathrooms === baths
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {baths}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">
              Price Range
            </h3>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleMinPriceChange(e.target.value)}
                  className="bg-secondary border-0 rounded-lg"
                />
                <span className="text-xs text-muted-foreground mt-1 block">
                  ₦
                </span>
              </div>
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleMaxPriceChange(e.target.value)}
                  className="bg-secondary border-0 rounded-lg"
                />
                <span className="text-xs text-muted-foreground mt-1 block">
                  ₦
                </span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-foreground">Amenities</h3>
              <button
                onClick={() => setShowAmenities(!showAmenities)}
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {showAmenities ? "Hide" : "Show"}
              </button>
            </div>
            {showAmenities && (
              <div className="flex flex-wrap gap-2">
                {amenityOptions.map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                      filters.amenities.includes(amenity)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Show verified listings only */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Show verified listings only
            </span>
            <Switch
              checked={filters.verifiedOnly}
              onCheckedChange={handleVerifiedToggle}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleClearAll}
            className="text-sm text-muted-foreground hover:text-foreground p-0 h-auto"
          >
            Clear all
          </Button>
          <Button onClick={handleApply} className="px-6 rounded-lg">
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

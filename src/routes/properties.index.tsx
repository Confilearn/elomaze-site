import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { FilterModal, FilterState } from "@/components/FilterModal";
import { properties, cities, propertyTypes } from "@/lib/data";
import {
  allStates,
  getCitiesForState,
  getLGAsForState,
} from "@/lib/nigeria-data";
import { useState, useMemo, useEffect } from "react";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [
      { title: "Properties — Elomaze" },
      {
        name: "description",
        content:
          "Browse verified apartments, duplexes, shortlets, and student hostels across Nigeria.",
      },
      { property: "og:title", content: "Properties — Elomaze" },
      {
        property: "og:description",
        content:
          "Browse verified apartments, duplexes, shortlets, and student hostels across Nigeria.",
      },
    ],
  }),
  component: PropertiesPage,
});

type SortOption =
  | "recommended"
  | "price-low"
  | "price-high"
  | "newest"
  | "oldest";
const ITEMS_PER_PAGE = 15;

function PropertiesPage() {
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : "",
  );
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filterState, setFilterState] = useState<FilterState>({
    propertyType: "Any",
    bedrooms: "Any",
    bathrooms: "Any",
    minPrice: "",
    maxPrice: "",
    amenities: [],
    verifiedOnly: false,
  });
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  // Get current filter values from either modal or legacy state
  const selectedState = "All"; // These can be added to modal later if needed
  const selectedCity = "All";
  const selectedLGA = "All";
  const selectedType = filterState.propertyType;
  const selectedBeds = filterState.bedrooms;
  const selectedBaths = filterState.bathrooms;
  const verifiedOnly = filterState.verifiedOnly;
  const furnishedOnly = false; // Can be added to modal later
  const minPrice = filterState.minPrice;
  const maxPrice = filterState.maxPrice;

  const stateCities =
    selectedState !== "All" ? getCitiesForState(selectedState) : [];
  const stateLGAs =
    selectedState !== "All" ? getLGAsForState(selectedState) : [];

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Search query filtering
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.lga.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q),
      );
    }

    // Property type filtering
    if (selectedType !== "Any") {
      result = result.filter((p) => p.type === selectedType);
    }

    // Bedrooms filtering
    if (selectedBeds !== "Any") {
      if (selectedBeds === "5+") {
        result = result.filter((p) => p.beds >= 5);
      } else {
        const beds = parseInt(selectedBeds);
        result = result.filter((p) => p.beds === beds);
      }
    }

    // Bathrooms filtering
    if (selectedBaths !== "Any") {
      if (selectedBaths === "5+") {
        result = result.filter((p) => p.baths >= 5);
      } else {
        const baths = parseInt(selectedBaths);
        result = result.filter((p) => p.baths === baths);
      }
    }

    // Verified only filtering
    if (verifiedOnly) {
      result = result.filter((p) => p.verified);
    }

    // Price filtering
    if (minPrice) {
      const min = parseInt(minPrice);
      result = result.filter((p) => p.price >= min);
    }
    if (maxPrice) {
      const max = parseInt(maxPrice);
      result = result.filter((p) => p.price <= max);
    }

    // Amenities filtering - show properties with ANY selected amenity
    if (filterState.amenities.length > 0) {
      result = result.filter((property) => {
        return filterState.amenities.some((selectedAmenity) => {
          const selected = selectedAmenity.toLowerCase();
          return property.amenities.some((propertyAmenity) => {
            const property = propertyAmenity.toLowerCase();

            // Direct match
            if (property.includes(selected) || selected.includes(property)) {
              return true;
            }

            // Specific mappings
            switch (selected) {
              case "wifi":
                return property.includes("wifi");
              case "parking":
                return property.includes("parking");
              case "ac":
                return property.includes("ac");
              case "security":
                return (
                  property.includes("security") ||
                  property.includes("guard") ||
                  property.includes("24/7 security")
                );
              case "water":
                return (
                  property.includes("water") || property.includes("borehole")
                );
              case "generator":
                return (
                  property.includes("generator") ||
                  property.includes("generator backup")
                );
              case "swimming pool":
                return (
                  property.includes("swimming") || property.includes("pool")
                );
              case "gym":
                return property.includes("gym");
              case "garden":
                return property.includes("garden");
              case "elevator":
                return property.includes("elevator");
              case "smart tv":
                return property.includes("smart tv") || property.includes("tv");
              default:
                return false;
            }
          });
        });
      });
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "oldest":
        result.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        break;
    }

    return result;
  }, [
    searchQuery,
    selectedState,
    selectedCity,
    selectedLGA,
    selectedType,
    selectedBeds,
    selectedBaths,
    verifiedOnly,
    furnishedOnly,
    minPrice,
    maxPrice,
    sortBy,
    filterState,
  ]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedState,
    selectedCity,
    selectedLGA,
    selectedType,
    selectedBeds,
    selectedBaths,
    verifiedOnly,
    furnishedOnly,
    minPrice,
    maxPrice,
    sortBy,
    filterState,
  ]);

  const activeFilterCount = [
    filterState.propertyType !== "Any",
    filterState.bedrooms !== "Any",
    filterState.bathrooms !== "Any",
    filterState.verifiedOnly,
    !!filterState.minPrice,
    !!filterState.maxPrice,
    filterState.amenities.length > 0,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFilterState({
      propertyType: "Any",
      bedrooms: "Any",
      bathrooms: "Any",
      minPrice: "",
      maxPrice: "",
      amenities: [],
      verifiedOnly: false,
    });
  };

  const sortLabels: Record<SortOption, string> = {
    recommended: "Recommended",
    "price-low": "Lowest Price",
    "price-high": "Highest Price",
    newest: "Newest",
    oldest: "Oldest",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-24 lg:pb-12">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          Properties
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Find your perfect home across Nigeria
        </p>
      </div>

      {/* Search & Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by state, city, LGA, property type..."
            className="w-full h-11 pl-10 pr-4 rounded-full bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilterModal(true)}
            className="gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </Button>
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowSort(!showSort)}
              className="gap-2"
            >
              {sortLabels[sortBy]}
              <ChevronDown className="w-3 h-3" />
            </Button>
            {showSort && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg z-20 overflow-hidden animate-fade-up">
                {(Object.entries(sortLabels) as [SortOption, string][]).map(
                  ([key, label]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSortBy(key);
                        setShowSort(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${sortBy === key ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-secondary"}`}
                    >
                      {label}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filter Pills */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filterState.propertyType !== "Any" && (
            <FilterPill
              label={`Type: ${filterState.propertyType}`}
              onRemove={() =>
                setFilterState((prev) => ({ ...prev, propertyType: "Any" }))
              }
            />
          )}
          {filterState.bedrooms !== "Any" && (
            <FilterPill
              label={`${filterState.bedrooms} Bed${filterState.bedrooms === "1+" ? "" : "s"}`}
              onRemove={() =>
                setFilterState((prev) => ({ ...prev, bedrooms: "Any" }))
              }
            />
          )}
          {filterState.bathrooms !== "Any" && (
            <FilterPill
              label={`${filterState.bathrooms} Bath${filterState.bathrooms === "1+" ? "" : "s"}`}
              onRemove={() =>
                setFilterState((prev) => ({ ...prev, bathrooms: "Any" }))
              }
            />
          )}
          {filterState.verifiedOnly && (
            <FilterPill
              label="Verified"
              onRemove={() =>
                setFilterState((prev) => ({ ...prev, verifiedOnly: false }))
              }
            />
          )}
          {filterState.minPrice && (
            <FilterPill
              label={`Min ₦${parseInt(filterState.minPrice).toLocaleString()}`}
              onRemove={() =>
                setFilterState((prev) => ({ ...prev, minPrice: "" }))
              }
            />
          )}
          {filterState.maxPrice && (
            <FilterPill
              label={`Max ₦${parseInt(filterState.maxPrice).toLocaleString()}`}
              onRemove={() =>
                setFilterState((prev) => ({ ...prev, maxPrice: "" }))
              }
            />
          )}
          {filterState.amenities.map((amenity) => (
            <FilterPill
              key={amenity}
              label={amenity}
              onRemove={() =>
                setFilterState((prev) => ({
                  ...prev,
                  amenities: prev.amenities.filter((a) => a !== amenity),
                }))
              }
            />
          ))}
        </div>
      )}

      {/* Results */}
      <p className="text-sm text-muted-foreground mb-4">
        {filteredProperties.length} properties found
      </p>

      {filteredProperties.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🏠</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No properties found
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Try adjusting your filters or search query
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear all filters
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(page)}
                    className="w-10 h-10"
                  >
                    {page}
                  </Button>
                ),
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={(filters) => setFilterState(filters)}
        onClearAll={clearFilters}
        initialFilters={filterState}
      />
    </div>
  );
}

function FilterPill({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
      {label}
      <button
        onClick={onRemove}
        className="hover:bg-primary/20 rounded-full p-0.5"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

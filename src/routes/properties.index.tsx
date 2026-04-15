import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal, ChevronDown, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { properties, cities, propertyTypes } from "@/lib/data";
import { allStates, getCitiesForState, getLGAsForState } from "@/lib/nigeria-data";
import { useState, useMemo, useEffect } from "react";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [
      { title: "Properties — Elomaze" },
      { name: "description", content: "Browse verified apartments, duplexes, shortlets, and student hostels across Nigeria." },
      { property: "og:title", content: "Properties — Elomaze" },
      { property: "og:description", content: "Browse verified apartments, duplexes, shortlets, and student hostels across Nigeria." },
    ],
  }),
  component: PropertiesPage,
});

type SortOption = "recommended" | "price-low" | "price-high" | "newest" | "oldest";
const ITEMS_PER_PAGE = 15;

function PropertiesPage() {
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedLGA, setSelectedLGA] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedBeds, setSelectedBeds] = useState("Any");
  const [selectedBaths, setSelectedBaths] = useState("Any");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [furnishedOnly, setFurnishedOnly] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const stateCities = selectedState !== "All" ? getCitiesForState(selectedState) : [];
  const stateLGAs = selectedState !== "All" ? getLGAsForState(selectedState) : [];

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.lga.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q)
      );
    }

    if (selectedState !== "All") result = result.filter((p) => p.state === selectedState);
    if (selectedCity !== "All") result = result.filter((p) => p.city === selectedCity);
    if (selectedLGA !== "All") result = result.filter((p) => p.lga === selectedLGA);
    if (selectedType !== "All") result = result.filter((p) => p.type === selectedType);

    if (selectedBeds !== "Any") {
      const beds = selectedBeds === "5+" ? 5 : parseInt(selectedBeds);
      result = result.filter((p) => (selectedBeds === "5+" ? p.beds >= beds : p.beds === beds));
    }

    if (selectedBaths !== "Any") {
      const baths = selectedBaths === "5+" ? 5 : parseInt(selectedBaths);
      result = result.filter((p) => (selectedBaths === "5+" ? p.baths >= baths : p.baths === baths));
    }

    if (verifiedOnly) result = result.filter((p) => p.verified);
    if (furnishedOnly) result = result.filter((p) => p.furnished);
    if (minPrice) result = result.filter((p) => p.price >= parseInt(minPrice));
    if (maxPrice) result = result.filter((p) => p.price <= parseInt(maxPrice));

    switch (sortBy) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "newest": result.sort((a, b) => parseInt(b.id) - parseInt(a.id)); break;
      case "oldest": result.sort((a, b) => parseInt(a.id) - parseInt(b.id)); break;
    }

    return result;
  }, [searchQuery, selectedState, selectedCity, selectedLGA, selectedType, selectedBeds, selectedBaths, verifiedOnly, furnishedOnly, minPrice, maxPrice, sortBy]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = filteredProperties.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedState, selectedCity, selectedLGA, selectedType, selectedBeds, selectedBaths, verifiedOnly, furnishedOnly, minPrice, maxPrice, sortBy]);

  const activeFilterCount = [
    selectedState !== "All", selectedCity !== "All", selectedLGA !== "All",
    selectedType !== "All", selectedBeds !== "Any", selectedBaths !== "Any",
    verifiedOnly, furnishedOnly, !!minPrice, !!maxPrice,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedState("All"); setSelectedCity("All"); setSelectedLGA("All");
    setSelectedType("All"); setSelectedBeds("Any"); setSelectedBaths("Any");
    setVerifiedOnly(false); setFurnishedOnly(false); setMinPrice(""); setMaxPrice("");
  };

  const sortLabels: Record<SortOption, string> = {
    recommended: "Recommended", "price-low": "Lowest Price",
    "price-high": "Highest Price", newest: "Newest", oldest: "Oldest",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-24 lg:pb-12">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Properties</h1>
        <p className="mt-2 text-sm text-muted-foreground">Find your perfect home across Nigeria</p>
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
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">{activeFilterCount}</span>
            )}
          </Button>
          <div className="relative">
            <Button variant="outline" onClick={() => setShowSort(!showSort)} className="gap-2">
              {sortLabels[sortBy]}
              <ChevronDown className="w-3 h-3" />
            </Button>
            {showSort && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg z-20 overflow-hidden animate-fade-up">
                {(Object.entries(sortLabels) as [SortOption, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => { setSortBy(key); setShowSort(false); }}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${sortBy === key ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-secondary"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="mb-6 p-5 rounded-2xl bg-card border border-border/50 premium-shadow animate-fade-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Filters</h3>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="text-xs text-primary hover:underline">Clear all</button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">State</label>
              <select value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedCity("All"); setSelectedLGA("All"); }} className="w-full h-10 px-3 rounded-xl bg-secondary border-0 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="All">All States</option>
                {allStates.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">City</label>
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-secondary border-0 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="All">All Cities</option>
                {(selectedState !== "All" ? stateCities : cities).map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">LGA</label>
              <select value={selectedLGA} onChange={(e) => setSelectedLGA(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-secondary border-0 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" disabled={selectedState === "All"}>
                <option value="All">{selectedState === "All" ? "Select state first" : "All LGAs"}</option>
                {stateLGAs.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Type</label>
              <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-secondary border-0 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="All">All Types</option>
                {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Bedrooms</label>
              <div className="flex gap-1.5">
                {["Any", "1", "2", "3", "4", "5+"].map((bed) => (
                  <button key={bed} onClick={() => setSelectedBeds(bed)} className={`flex-1 py-2 text-xs rounded-lg transition-colors ${selectedBeds === bed ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"}`}>{bed}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Bathrooms</label>
              <div className="flex gap-1.5">
                {["Any", "1", "2", "3", "4", "5+"].map((bath) => (
                  <button key={bath} onClick={() => setSelectedBaths(bath)} className={`flex-1 py-2 text-xs rounded-lg transition-colors ${selectedBaths === bath ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"}`}>{bath}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Min Price ₦</label>
              <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="0" className="w-full h-10 px-3 rounded-xl bg-secondary border-0 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Max Price ₦</label>
              <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Any" className="w-full h-10 px-3 rounded-xl bg-secondary border-0 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border/50">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="w-4 h-4 rounded accent-primary" />
              <span className="text-sm text-foreground">Verified only</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={furnishedOnly} onChange={(e) => setFurnishedOnly(e.target.checked)} className="w-4 h-4 rounded accent-primary" />
              <span className="text-sm text-foreground">Furnished only</span>
            </label>
          </div>
        </div>
      )}

      {/* Active Filter Pills */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedState !== "All" && <FilterPill label={`State: ${selectedState}`} onRemove={() => { setSelectedState("All"); setSelectedCity("All"); setSelectedLGA("All"); }} />}
          {selectedCity !== "All" && <FilterPill label={`City: ${selectedCity}`} onRemove={() => setSelectedCity("All")} />}
          {selectedLGA !== "All" && <FilterPill label={`LGA: ${selectedLGA}`} onRemove={() => setSelectedLGA("All")} />}
          {selectedType !== "All" && <FilterPill label={`Type: ${selectedType}`} onRemove={() => setSelectedType("All")} />}
          {selectedBeds !== "Any" && <FilterPill label={`${selectedBeds} Bed${selectedBeds === "1" ? "" : "s"}`} onRemove={() => setSelectedBeds("Any")} />}
          {selectedBaths !== "Any" && <FilterPill label={`${selectedBaths} Bath${selectedBaths === "1" ? "" : "s"}`} onRemove={() => setSelectedBaths("Any")} />}
          {verifiedOnly && <FilterPill label="Verified" onRemove={() => setVerifiedOnly(false)} />}
          {furnishedOnly && <FilterPill label="Furnished" onRemove={() => setFurnishedOnly(false)} />}
          {minPrice && <FilterPill label={`Min ₦${parseInt(minPrice).toLocaleString()}`} onRemove={() => setMinPrice("")} />}
          {maxPrice && <FilterPill label={`Max ₦${parseInt(maxPrice).toLocaleString()}`} onRemove={() => setMaxPrice("")} />}
        </div>
      )}

      {/* Results */}
      <p className="text-sm text-muted-foreground mb-4">{filteredProperties.length} properties found</p>

      {filteredProperties.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🏠</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No properties found</h3>
          <p className="text-sm text-muted-foreground mb-6">Try adjusting your filters or search query</p>
          <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(page)}
                  className="w-10 h-10"
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function FilterPill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
      {label}
      <button onClick={onRemove} className="hover:bg-primary/20 rounded-full p-0.5">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

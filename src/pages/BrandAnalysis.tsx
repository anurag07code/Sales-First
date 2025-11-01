import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CompanyCard from "@/components/CompanyCard";
import { MOCK_COMPANY_LIST } from "@/lib/mockData";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";

const BrandAnalysis = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const filteredCompanies = useMemo(() => 
    MOCK_COMPANY_LIST.filter(
      (company) =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.region.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [searchQuery]
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Brand Analysis</h1>
          <p className="text-muted-foreground">
            Explore comprehensive company profiles and market intelligence
          </p>
        </div>

        {/* Large Central Search */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground z-10" />
              <Input
                placeholder="Search for a company logo..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowAutocomplete(e.target.value.length > 0);
                }}
                onFocus={() => searchQuery.length > 0 && setShowAutocomplete(true)}
                className="pl-14 pr-4 h-16 text-lg bg-card shadow-elegant border-2 border-border focus:border-primary transition-all"
              />
            </div>

            {/* Autocomplete Dropdown */}
            {showAutocomplete && searchQuery && (
              <div className="absolute top-full mt-2 w-full z-20 animate-fade-in">
                <Command className="rounded-lg border shadow-elegant bg-card">
                  <CommandList>
                    {filteredCompanies.length === 0 ? (
                      <CommandEmpty>No companies found.</CommandEmpty>
                    ) : (
                      <CommandGroup heading="Companies">
                        {filteredCompanies.slice(0, 5).map((company) => (
                          <CommandItem
                            key={company.id}
                            onSelect={() => {
                              setSearchQuery(company.name);
                              setShowAutocomplete(false);
                            }}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <img 
                                src={company.logoUrl} 
                                alt={company.name}
                                className="w-8 h-8 rounded"
                              />
                              <div className="flex-1">
                                <p className="font-medium">{company.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {company.country} • {company.region}
                                </p>
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </div>
            )}
          </div>

          <div className="mt-4 text-center">
            <Button 
              size="lg"
              onClick={() => setShowAutocomplete(false)}
              className="gap-2"
            >
              <Search className="h-5 w-5" />
              Search Companies
            </Button>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredCompanies.length} {filteredCompanies.length === 1 ? "company" : "companies"} found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} {...company} />
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No companies found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandAnalysis;

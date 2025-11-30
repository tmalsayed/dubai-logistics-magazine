import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search as SearchIcon, 
  MapPin, 
  Globe, 
  Phone,
  Building2 
} from "lucide-react";
import { useState } from "react";
import { 
  companies, 
  companyCategories, 
  searchCompanies,
  type Company 
} from "@/lib/magazine-data";

function CompanyCard({ company }: { company: Company }) {
  return (
    <Card className="hover-elevate overflow-visible h-full flex flex-col" data-testid={`card-company-${company.id}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-lg flex-shrink-0">
            {company.logoPlaceholder}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">
              <Link href={`/directory/${company.slug}`} className="hover:text-primary transition-colors" data-testid={`link-company-${company.id}`}>
                {company.name}
              </Link>
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">{company.category}</Badge>
              {company.featured && <Badge variant="default" className="text-xs">Featured</Badge>}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{company.description}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          {company.location}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex flex-wrap gap-1">
          {company.services.slice(0, 3).map((service, i) => (
            <Badge key={i} variant="secondary" className="text-xs">{service}</Badge>
          ))}
          {company.services.length > 3 && (
            <Badge variant="secondary" className="text-xs">+{company.services.length - 3}</Badge>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export default function Directory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCompanies = searchQuery 
    ? searchCompanies(searchQuery)
    : selectedCategory 
      ? companies.filter(c => c.categorySlug === selectedCategory)
      : companies;

  return (
    <Layout>
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Company Directory" }
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4" data-testid="text-directory-title">
            Dubai Logistics Company Directory
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find trusted freight forwarders, shipping lines, warehouses, and logistics providers in Dubai
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search companies by name or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-company-search"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              data-testid="button-filter-all"
            >
              All Companies
            </Button>
            {companyCategories.map(cat => (
              <Button 
                key={cat.slug}
                variant={selectedCategory === cat.slug ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setSearchQuery("");
                }}
                data-testid={`button-filter-${cat.slug}`}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center text-muted-foreground" data-testid="text-results-count">
          Showing {filteredCompanies.length} compan{filteredCompanies.length !== 1 ? 'ies' : 'y'}
          {selectedCategory && ` in ${companyCategories.find(c => c.slug === selectedCategory)?.name}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>

        {/* Companies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map(company => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No companies found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              data-testid="button-clear-filters"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Category Browse */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-center mb-8" data-testid="text-browse-categories">
            Browse by Category
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {companyCategories.map(category => (
              <Link key={category.slug} href={`/directory/category/${category.slug}`}>
                <Card className="hover-elevate overflow-visible h-full cursor-pointer" data-testid={`card-browse-category-${category.slug}`}>
                  <CardHeader className="pb-2">
                    <Building2 className="w-8 h-8 text-primary mb-2" />
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>
                    <Badge variant="secondary" className="mt-3">{category.companyCount} Companies</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* List Your Company CTA */}
        <section className="mt-16 text-center bg-muted/50 rounded-lg p-8">
          <h2 className="font-heading text-2xl font-bold mb-4" data-testid="text-list-cta">
            List Your Company
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Are you a logistics provider in Dubai? Get listed in our directory and reach thousands of potential clients.
          </p>
          <Button asChild data-testid="button-contact-listing">
            <Link href="/contact">Contact Us for Listing</Link>
          </Button>
        </section>
      </div>
    </Layout>
  );
}

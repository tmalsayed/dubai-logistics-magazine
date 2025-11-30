import { Link, useParams } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin } from "lucide-react";
import { 
  getCompaniesByCategory,
  getCompanyCategoryBySlug,
  companyCategories,
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
              <Link href={`/directory/${company.slug}`} className="hover:text-primary transition-colors">
                {company.name}
              </Link>
            </CardTitle>
            {company.featured && <Badge variant="default" className="text-xs mt-1">Featured</Badge>}
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

export default function CompanyCategory() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCompanyCategoryBySlug(slug) : undefined;
  const categoryCompanies = slug ? getCompaniesByCategory(slug) : [];

  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist.</p>
          <Button asChild data-testid="button-back-directory">
            <Link href="/directory">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Directory
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Directory", href: "/directory" },
          { label: category.name }
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">{category.companyCount} Companies</Badge>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4" data-testid="text-category-title">
            {category.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>

        {/* Companies Grid */}
        {categoryCompanies.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryCompanies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No companies in this category yet.</p>
          </div>
        )}

        {/* Other Categories */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-center mb-8" data-testid="text-other-categories">
            Explore Other Categories
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {companyCategories
              .filter(c => c.slug !== slug)
              .map(cat => (
                <Button 
                  key={cat.slug} 
                  asChild 
                  variant="outline"
                  data-testid={`button-category-${cat.slug}`}
                >
                  <Link href={`/directory/category/${cat.slug}`}>
                    {cat.name}
                    <Badge variant="secondary" className="ml-2">{cat.companyCount}</Badge>
                  </Link>
                </Button>
              ))}
          </div>
        </section>

        {/* Back to All */}
        <div className="mt-12 text-center">
          <Button asChild variant="ghost" data-testid="button-back-all">
            <Link href="/directory">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Full Directory
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}

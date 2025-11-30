import { Link, useParams } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  MapPin, 
  Globe, 
  Phone,
  Mail,
  Calendar,
  Users,
  Building2,
  ExternalLink
} from "lucide-react";
import { 
  getCompanyBySlug,
  getCompaniesByCategory,
  companyCategories,
  type Company 
} from "@/lib/magazine-data";

function RelatedCompanyCard({ company }: { company: Company }) {
  return (
    <Card className="hover-elevate overflow-visible" data-testid={`card-related-${company.id}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
            {company.logoPlaceholder}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base truncate">
              <Link href={`/directory/${company.slug}`} className="hover:text-primary transition-colors">
                {company.name}
              </Link>
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-2">{company.description}</p>
      </CardContent>
    </Card>
  );
}

export default function CompanyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const company = slug ? getCompanyBySlug(slug) : undefined;

  if (!company) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Company Not Found</h1>
          <p className="text-muted-foreground mb-8">The company you're looking for doesn't exist.</p>
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

  const relatedCompanies = getCompaniesByCategory(company.categorySlug)
    .filter(c => c.id !== company.id)
    .slice(0, 3);

  const category = companyCategories.find(c => c.slug === company.categorySlug);

  return (
    <Layout>
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Directory", href: "/directory" },
          { label: category?.name || company.category, href: `/directory/category/${company.categorySlug}` },
          { label: company.name }
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Company Header */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
            <div className="w-20 h-20 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl flex-shrink-0">
              {company.logoPlaceholder}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{company.category}</Badge>
                {company.featured && <Badge variant="default">Featured</Badge>}
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2" data-testid="text-company-name">
                {company.name}
              </h1>
              <p className="text-lg text-muted-foreground" data-testid="text-company-description">
                {company.description}
              </p>
            </div>
          </div>

          {/* Contact Info Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div data-testid="text-location">{company.location}</div>
                  </div>
                </div>
                {company.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Phone</div>
                      <div data-testid="text-phone">{company.phone}</div>
                    </div>
                  </div>
                )}
                {company.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div data-testid="text-email">{company.email}</div>
                    </div>
                  </div>
                )}
                {company.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Website</div>
                      <a 
                        href={`https://${company.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                        data-testid="link-website"
                      >
                        {company.website}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
                {company.established && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Established</div>
                      <div data-testid="text-established">{company.established}</div>
                    </div>
                  </div>
                )}
                {company.employees && (
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Employees</div>
                      <div data-testid="text-employees">{company.employees}</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Services Offered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {company.services.map((service, i) => (
                  <Badge key={i} variant="secondary" className="text-sm">{service}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Full Description */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">About {company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none" data-testid="text-full-description">
                {company.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          <Separator className="my-8" />

          {/* Related Companies */}
          {relatedCompanies.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-bold mb-6" data-testid="text-related-heading">
                Similar Companies
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedCompanies.map(company => (
                  <RelatedCompanyCard key={company.id} company={company} />
                ))}
              </div>
              <div className="text-center mt-8">
                <Button asChild variant="outline" data-testid="button-more-in-category">
                  <Link href={`/directory/category/${company.categorySlug}`}>
                    More {company.category}
                  </Link>
                </Button>
              </div>
            </section>
          )}

          {/* Navigation */}
          <div className="mt-12">
            <Button asChild variant="ghost" data-testid="button-back">
              <Link href="/directory">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Directory
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

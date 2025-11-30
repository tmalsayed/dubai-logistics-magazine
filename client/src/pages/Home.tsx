import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Newspaper, 
  Building2, 
  TrendingUp, 
  Clock, 
  ArrowRight,
  BookOpen,
  Users,
  Globe
} from "lucide-react";
import { 
  getFeaturedArticles, 
  getLatestArticles, 
  getFeaturedCompanies,
  articleCategories,
  companyCategories,
  type Article,
  type Company
} from "@/lib/magazine-data";

function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="hover-elevate overflow-visible h-full flex flex-col" data-testid={`card-article-${article.id}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" data-testid={`badge-category-${article.id}`}>{article.category}</Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>
        <CardTitle className="text-lg leading-tight line-clamp-2">
          <Link href={`/articles/${article.slug}`} className="hover:text-primary transition-colors" data-testid={`link-article-${article.id}`}>
            {article.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground text-sm line-clamp-3" data-testid={`text-excerpt-${article.id}`}>{article.excerpt}</p>
      </CardContent>
      <CardFooter className="pt-0 flex items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">{article.author}</span>
        <span className="text-xs text-muted-foreground">{new Date(article.publishedDate).toLocaleDateString()}</span>
      </CardFooter>
    </Card>
  );
}

function FeaturedArticle({ article }: { article: Article }) {
  return (
    <Card className="hover-elevate overflow-visible bg-gradient-to-br from-primary/5 to-transparent border-primary/20" data-testid={`card-featured-article-${article.id}`}>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="default" data-testid={`badge-featured-${article.id}`}>Featured</Badge>
          <Badge variant="secondary">{article.category}</Badge>
        </div>
        <CardTitle className="text-2xl leading-tight">
          <Link href={`/articles/${article.slug}`} className="hover:text-primary transition-colors" data-testid={`link-featured-article-${article.id}`}>
            {article.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-base mt-2">{article.excerpt}</CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{article.author}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {article.readTime}
          </span>
        </div>
        <Button asChild variant="outline" size="sm" data-testid={`button-read-featured-${article.id}`}>
          <Link href={`/articles/${article.slug}`}>
            Read Article <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function CompanyCard({ company }: { company: Company }) {
  return (
    <Card className="hover-elevate overflow-visible h-full flex flex-col" data-testid={`card-company-${company.id}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
            {company.logoPlaceholder}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base truncate">
              <Link href={`/directory/${company.slug}`} className="hover:text-primary transition-colors" data-testid={`link-company-${company.id}`}>
                {company.name}
              </Link>
            </CardTitle>
            <Badge variant="outline" className="text-xs mt-1">{company.category}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground text-sm line-clamp-2">{company.description}</p>
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

export default function Home() {
  const featuredArticles = getFeaturedArticles().slice(0, 3);
  const latestArticles = getLatestArticles(6);
  const featuredCompanies = getFeaturedCompanies().slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4" data-testid="badge-hero-tag">
              Dubai's Premier Logistics Publication
            </Badge>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="text-hero-title">
              Your Source for Dubai <span className="text-primary">Logistics</span> Intelligence
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8" data-testid="text-hero-subtitle">
              Industry news, expert insights, and a comprehensive directory of logistics companies powering Dubai's global trade.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" data-testid="button-browse-articles">
                <Link href="/articles">
                  <Newspaper className="w-5 h-5 mr-2" />
                  Browse Articles
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" data-testid="button-company-directory">
                <Link href="/directory">
                  <Building2 className="w-5 h-5 mr-2" />
                  Company Directory
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div data-testid="stat-articles">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Articles Published</div>
            </div>
            <div data-testid="stat-companies">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Companies Listed</div>
            </div>
            <div data-testid="stat-categories">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">8</div>
              <div className="text-muted-foreground">Industry Categories</div>
            </div>
            <div data-testid="stat-readers">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Monthly Readers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold" data-testid="text-featured-heading">Featured Articles</h2>
              <p className="text-muted-foreground mt-1">Top stories from Dubai's logistics industry</p>
            </div>
            <Button asChild variant="outline" data-testid="button-all-articles">
              <Link href="/articles">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map(article => (
              <FeaturedArticle key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold" data-testid="text-latest-heading">Latest Articles</h2>
              <p className="text-muted-foreground mt-1">Stay updated with recent publications</p>
            </div>
            <Button asChild variant="outline" data-testid="button-more-articles">
              <Link href="/articles">
                More Articles <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Article Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4" data-testid="text-categories-heading">Explore by Topic</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dive deep into specific areas of Dubai's logistics industry
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {articleCategories.map(category => (
              <Link key={category.slug} href={`/articles/category/${category.slug}`}>
                <Card className="hover-elevate overflow-visible h-full cursor-pointer" data-testid={`card-category-${category.slug}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>
                    <Badge variant="secondary" className="mt-3">{category.articleCount} Articles</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold" data-testid="text-companies-heading">Featured Companies</h2>
              <p className="text-muted-foreground mt-1">Leading logistics providers in Dubai</p>
            </div>
            <Button asChild variant="outline" data-testid="button-full-directory">
              <Link href="/directory">
                Full Directory <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCompanies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </section>

      {/* Company Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4" data-testid="text-directory-categories-heading">Browse Company Directory</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find logistics service providers by category
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {companyCategories.map(category => (
              <Link key={category.slug} href={`/directory/category/${category.slug}`}>
                <Card className="hover-elevate overflow-visible h-full cursor-pointer" data-testid={`card-company-category-${category.slug}`}>
                  <CardHeader className="pb-2">
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
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4" data-testid="text-newsletter-heading">
              Stay Informed
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Get the latest logistics news, industry insights, and company updates delivered to your inbox.
            </p>
            <Button asChild size="lg" variant="secondary" data-testid="button-subscribe">
              <Link href="/subscribe">
                Subscribe to Newsletter <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center" data-testid="card-about-news">
              <CardHeader>
                <Newspaper className="w-10 h-10 mx-auto text-primary mb-2" />
                <CardTitle>Industry News</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Breaking news and updates from Dubai's dynamic logistics sector, covering ports, airports, and free zones.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center" data-testid="card-about-insights">
              <CardHeader>
                <TrendingUp className="w-10 h-10 mx-auto text-primary mb-2" />
                <CardTitle>Expert Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  In-depth analysis, market trends, and expert guides to help you navigate the logistics landscape.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center" data-testid="card-about-directory">
              <CardHeader>
                <Building2 className="w-10 h-10 mx-auto text-primary mb-2" />
                <CardTitle>Company Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive listing of freight forwarders, shipping lines, warehouses, and logistics providers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}

import { useState, useEffect } from "react";
import { useSearch, useLocation, Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  searchArticles, 
  searchCompanies,
  type Article,
  type Company
} from "@/lib/magazine-data";
import { Search as SearchIcon, X, Clock, MapPin, Newspaper, Building2 } from "lucide-react";

function ArticleResult({ article }: { article: Article }) {
  return (
    <Card className="hover-elevate overflow-visible" data-testid={`result-article-${article.id}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{article.category}</Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>
        <CardTitle className="text-lg leading-tight">
          <Link href={`/articles/${article.slug}`} className="hover:text-primary transition-colors">
            {article.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
      </CardContent>
      <CardFooter className="pt-0 flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>{article.author}</span>
        <span>{new Date(article.publishedDate).toLocaleDateString()}</span>
      </CardFooter>
    </Card>
  );
}

function CompanyResult({ company }: { company: Company }) {
  return (
    <Card className="hover-elevate overflow-visible" data-testid={`result-company-${company.id}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
            {company.logoPlaceholder}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">
              <Link href={`/directory/${company.slug}`} className="hover:text-primary transition-colors">
                {company.name}
              </Link>
            </CardTitle>
            <Badge variant="outline" className="text-xs mt-1">{company.category}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{company.description}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          {company.location}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Search() {
  const searchParams = useSearch();
  const [, setLocation] = useLocation();
  const urlQuery = new URLSearchParams(searchParams).get("q") || "";
  const [query, setQuery] = useState(urlQuery);
  const [activeTab, setActiveTab] = useState("all");

  const articleResults = query ? searchArticles(query) : [];
  const companyResults = query ? searchCompanies(query) : [];
  const totalResults = articleResults.length + companyResults.length;

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setLocation(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setLocation('/search');
  };

  return (
    <Layout>
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Search" }
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-center mb-6" data-testid="text-search-title">
            Search
          </h1>
          <form onSubmit={handleSearch} className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles and companies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-12 py-6 text-lg"
              data-testid="input-search"
            />
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={clearSearch}
                data-testid="button-clear-search"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </form>
        </div>

        {/* Results */}
        {urlQuery ? (
          <>
            {/* Results Summary */}
            <div className="text-center mb-8" data-testid="text-results-summary">
              <p className="text-muted-foreground">
                Found <span className="font-semibold text-foreground">{totalResults}</span> result{totalResults !== 1 ? 's' : ''} for "{urlQuery}"
              </p>
            </div>

            {totalResults > 0 ? (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="all" data-testid="tab-all">
                    All ({totalResults})
                  </TabsTrigger>
                  <TabsTrigger value="articles" data-testid="tab-articles">
                    <Newspaper className="w-4 h-4 mr-2" />
                    Articles ({articleResults.length})
                  </TabsTrigger>
                  <TabsTrigger value="companies" data-testid="tab-companies">
                    <Building2 className="w-4 h-4 mr-2" />
                    Companies ({companyResults.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {articleResults.length > 0 && (
                    <div className="mb-8">
                      <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                        <Newspaper className="w-5 h-5" />
                        Articles
                      </h2>
                      <div className="grid gap-4">
                        {articleResults.slice(0, 3).map(article => (
                          <ArticleResult key={article.id} article={article} />
                        ))}
                      </div>
                      {articleResults.length > 3 && (
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => setActiveTab("articles")}
                          data-testid="button-view-all-articles"
                        >
                          View all {articleResults.length} articles
                        </Button>
                      )}
                    </div>
                  )}
                  {companyResults.length > 0 && (
                    <div>
                      <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        Companies
                      </h2>
                      <div className="grid gap-4">
                        {companyResults.slice(0, 3).map(company => (
                          <CompanyResult key={company.id} company={company} />
                        ))}
                      </div>
                      {companyResults.length > 3 && (
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => setActiveTab("companies")}
                          data-testid="button-view-all-companies"
                        >
                          View all {companyResults.length} companies
                        </Button>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="articles" className="space-y-4">
                  {articleResults.map(article => (
                    <ArticleResult key={article.id} article={article} />
                  ))}
                  {articleResults.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No articles found matching your search.
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="companies" className="space-y-4">
                  {companyResults.map(company => (
                    <CompanyResult key={company.id} company={company} />
                  ))}
                  {companyResults.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No companies found matching your search.
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No results found for "{urlQuery}"
                </p>
                <p className="text-muted-foreground mb-6">
                  Try different keywords or browse our content:
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild variant="outline" data-testid="button-browse-articles">
                    <Link href="/articles">Browse Articles</Link>
                  </Button>
                  <Button asChild variant="outline" data-testid="button-browse-directory">
                    <Link href="/directory">Browse Directory</Link>
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-6">
              Enter a search term to find articles and companies
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline" data-testid="button-browse-articles">
                <Link href="/articles">Browse Articles</Link>
              </Button>
              <Button asChild variant="outline" data-testid="button-browse-directory">
                <Link href="/directory">Browse Directory</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

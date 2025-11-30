import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { 
  articles, 
  articleCategories, 
  searchArticles,
  type Article 
} from "@/lib/magazine-data";

function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="hover-elevate overflow-visible h-full flex flex-col" data-testid={`card-article-${article.id}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{article.category}</Badge>
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
        <p className="text-muted-foreground text-sm line-clamp-3">{article.excerpt}</p>
      </CardContent>
      <CardFooter className="pt-0 flex items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">{article.author}</span>
        <span className="text-xs text-muted-foreground">{new Date(article.publishedDate).toLocaleDateString()}</span>
      </CardFooter>
    </Card>
  );
}

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredArticles = searchQuery 
    ? searchArticles(searchQuery)
    : selectedCategory 
      ? articles.filter(a => a.categorySlug === selectedCategory)
      : articles;

  return (
    <Layout>
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Articles" }
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4" data-testid="text-articles-title">
            Logistics Industry Articles
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert insights, news, and analysis covering Dubai's dynamic logistics sector
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-article-search"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              data-testid="button-filter-all"
            >
              All Articles
            </Button>
            {articleCategories.map(cat => (
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
          Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
          {selectedCategory && ` in ${articleCategories.find(c => c.slug === selectedCategory)?.name}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
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
            {articleCategories.map(category => (
              <Link key={category.slug} href={`/articles/category/${category.slug}`}>
                <Card className="hover-elevate overflow-visible h-full cursor-pointer" data-testid={`card-browse-category-${category.slug}`}>
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
        </section>
      </div>
    </Layout>
  );
}

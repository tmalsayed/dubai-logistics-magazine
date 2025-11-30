import { Link, useParams } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { 
  getArticlesByCategory,
  getArticleCategoryBySlug,
  articleCategories,
  type Article 
} from "@/lib/magazine-data";

function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="hover-elevate overflow-visible h-full flex flex-col" data-testid={`card-article-${article.id}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          {article.featured && <Badge variant="default">Featured</Badge>}
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>
        <CardTitle className="text-lg leading-tight line-clamp-2">
          <Link href={`/articles/${article.slug}`} className="hover:text-primary transition-colors">
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

export default function ArticleCategory() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getArticleCategoryBySlug(slug) : undefined;
  const categoryArticles = slug ? getArticlesByCategory(slug) : [];

  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist.</p>
          <Button asChild data-testid="button-back-articles">
            <Link href="/articles">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
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
          { label: "Articles", href: "/articles" },
          { label: category.name }
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">{category.articleCount} Articles</Badge>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4" data-testid="text-category-title">
            {category.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>

        {/* Articles Grid */}
        {categoryArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles in this category yet.</p>
          </div>
        )}

        {/* Other Categories */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-center mb-8" data-testid="text-other-categories">
            Explore Other Categories
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {articleCategories
              .filter(c => c.slug !== slug)
              .map(cat => (
                <Button 
                  key={cat.slug} 
                  asChild 
                  variant="outline"
                  data-testid={`button-category-${cat.slug}`}
                >
                  <Link href={`/articles/category/${cat.slug}`}>
                    {cat.name}
                    <Badge variant="secondary" className="ml-2">{cat.articleCount}</Badge>
                  </Link>
                </Button>
              ))}
          </div>
        </section>

        {/* Back to All */}
        <div className="mt-12 text-center">
          <Button asChild variant="ghost" data-testid="button-back-all">
            <Link href="/articles">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Articles
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}

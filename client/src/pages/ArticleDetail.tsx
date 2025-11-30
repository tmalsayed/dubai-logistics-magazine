import { Link, useParams } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  User, 
  Share2,
  Bookmark,
  Tag
} from "lucide-react";
import { 
  getArticleBySlug,
  getArticlesByCategory,
  getLatestArticles,
  articleCategories,
  type Article 
} from "@/lib/magazine-data";

function RelatedArticleCard({ article }: { article: Article }) {
  return (
    <Card className="hover-elevate overflow-visible" data-testid={`card-related-${article.id}`}>
      <CardHeader className="pb-2">
        <Badge variant="secondary" className="w-fit">{article.category}</Badge>
        <CardTitle className="text-base leading-tight mt-2">
          <Link href={`/articles/${article.slug}`} className="hover:text-primary transition-colors">
            {article.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
      </CardContent>
    </Card>
  );
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
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

  const relatedArticles = getArticlesByCategory(article.categorySlug)
    .filter(a => a.id !== article.id)
    .slice(0, 3);

  const category = articleCategories.find(c => c.slug === article.categorySlug);

  return (
    <Layout>
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Articles", href: "/articles" },
          { label: category?.name || article.category, href: `/articles/category/${article.categorySlug}` },
          { label: article.title }
        ]}
      />

      <article className="container mx-auto px-4 py-8">
        {/* Article Header */}
        <header className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="default">{article.category}</Badge>
            {article.featured && <Badge variant="secondary">Featured</Badge>}
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight" data-testid="text-article-title">
            {article.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-6" data-testid="text-article-excerpt">
            {article.excerpt}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(article.publishedDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
          </div>
        </header>

        <Separator className="max-w-3xl mx-auto mb-12" />

        {/* Article Content */}
        <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert" data-testid="text-article-content">
          {article.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return (
                <h2 key={index} className="font-heading text-xl font-bold mt-8 mb-4">
                  {paragraph.replace(/\*\*/g, '')}
                </h2>
              );
            }
            return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
          })}
        </div>

        {/* Tags */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-muted-foreground" />
            {article.tags.map(tag => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </div>

        {/* References */}
        {article.references && article.references.length > 0 && (
          <div className="max-w-3xl mx-auto mt-12 p-6 bg-muted rounded-lg">
            <h3 className="font-heading text-lg font-bold mb-4" data-testid="text-references-heading">
              Sources & References
            </h3>
            <ul className="space-y-3">
              {article.references.map((ref, index) => (
                <li key={index} className="text-sm" data-testid={`text-reference-${index}`}>
                  <div className="font-medium text-foreground">{ref.title}</div>
                  <div className="text-muted-foreground">
                    {ref.url ? (
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        {ref.source}
                      </a>
                    ) : (
                      <span>{ref.source}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Share Actions */}
        <div className="max-w-3xl mx-auto mt-8 flex items-center gap-4">
          <Button variant="outline" size="sm" data-testid="button-share">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" data-testid="button-bookmark">
            <Bookmark className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>

        <Separator className="max-w-3xl mx-auto my-12" />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="max-w-5xl mx-auto">
            <h2 className="font-heading text-2xl font-bold mb-6" data-testid="text-related-heading">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map(article => (
                <RelatedArticleCard key={article.id} article={article} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline" data-testid="button-more-in-category">
                <Link href={`/articles/category/${article.categorySlug}`}>
                  More in {article.category} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="max-w-3xl mx-auto mt-12">
          <Button asChild variant="ghost" data-testid="button-back">
            <Link href="/articles">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Articles
            </Link>
          </Button>
        </div>
      </article>
    </Layout>
  );
}

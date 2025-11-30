import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center bg-muted">
        <div className="max-w-xl mx-auto px-4 text-center py-16">
          <div className="text-8xl font-heading font-bold text-primary/20 mb-4">
            404
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button className="font-heading gap-2" data-testid="button-go-home">
                <Home className="w-4 h-4" />
                Go Home
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="font-heading gap-2" data-testid="button-browse-services">
                Browse Services
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/search">
              <Button variant="outline" className="font-heading gap-2" data-testid="button-search-404">
                <Search className="w-4 h-4" />
                Search
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

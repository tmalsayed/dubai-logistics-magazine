import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="bg-muted py-3 border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <ol className="flex items-center gap-1 text-sm flex-wrap">
          <li>
            <Link 
              href="/" 
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="breadcrumb-home"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only">Home</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1">
              <ChevronRight className="w-4 h-4 text-muted-foreground/60" />
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`breadcrumb-${index}`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium" data-testid={`breadcrumb-${index}`}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  Newspaper, Building2, Search, Menu, X, Mail, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { articleCategories, companyCategories } from "@/lib/magazine-data";

export function Header() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="hidden lg:block bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span>Dubai's Premier Logistics Publication</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/subscribe" className="hover:underline flex items-center gap-1" data-testid="link-subscribe-top">
              <Mail className="w-3.5 h-3.5" />
              Subscribe
            </Link>
            <Link href="/contact" className="hover:underline" data-testid="link-contact-top">
              Advertise With Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" data-testid="link-home-logo">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="font-heading font-bold text-lg leading-tight block text-foreground">Dubai Logistics</span>
              <span className="font-heading text-xs text-muted-foreground leading-tight block">MAGAZINE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Articles Mega Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-heading font-medium" data-testid="nav-articles">
                    Articles
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-6">
                      <div className="grid grid-cols-2 gap-4">
                        {articleCategories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/articles/category/${category.slug}`}
                            className="group block p-3 rounded-md hover-elevate"
                            data-testid={`nav-article-category-${category.slug}`}
                          >
                            <span className="font-heading font-semibold text-sm text-foreground block mb-1">
                              {category.name}
                            </span>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {category.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-border">
                        <Link 
                          href="/articles" 
                          className="text-sm font-medium text-primary hover:underline"
                          data-testid="link-all-articles"
                        >
                          View All Articles
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Directory Mega Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-heading font-medium" data-testid="nav-directory">
                    Directory
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-6">
                      <div className="grid grid-cols-2 gap-4">
                        {companyCategories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/directory/category/${category.slug}`}
                            className="group block p-3 rounded-md hover-elevate"
                            data-testid={`nav-company-category-${category.slug}`}
                          >
                            <span className="font-heading font-semibold text-sm text-foreground block mb-1">
                              {category.name}
                            </span>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {category.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-border">
                        <Link 
                          href="/directory" 
                          className="text-sm font-medium text-primary hover:underline"
                          data-testid="link-full-directory"
                        >
                          Browse Full Directory
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/about" className="font-heading font-medium px-4 py-2" data-testid="nav-about">
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/contact" className="font-heading font-medium px-4 py-2" data-testid="nav-contact">
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <Input
                    type="search"
                    placeholder="Search articles & companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 lg:w-64"
                    autoFocus
                    data-testid="input-search"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setSearchOpen(false)}
                    data-testid="button-close-search"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </form>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                  data-testid="button-open-search"
                >
                  <Search className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Subscribe CTA */}
            <div className="hidden sm:block">
              <Button 
                asChild
                className="font-heading" 
                data-testid="button-subscribe"
              >
                <Link href="/subscribe">
                  Subscribe
                </Link>
              </Button>
            </div>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="space-y-4">
              <div>
                <h3 className="font-heading font-semibold text-sm text-muted-foreground mb-2">Articles</h3>
                <div className="grid grid-cols-2 gap-2">
                  {articleCategories.slice(0, 4).map((category) => (
                    <Link
                      key={category.slug}
                      href={`/articles/category/${category.slug}`}
                      className="block p-2 text-sm rounded-md hover-elevate"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`mobile-nav-article-${category.slug}`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/articles"
                  className="block p-2 text-sm text-primary font-medium mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="mobile-nav-all-articles"
                >
                  View All Articles
                </Link>
              </div>
              <div className="pt-4 border-t border-border">
                <h3 className="font-heading font-semibold text-sm text-muted-foreground mb-2">Directory</h3>
                <div className="grid grid-cols-2 gap-2">
                  {companyCategories.slice(0, 4).map((category) => (
                    <Link
                      key={category.slug}
                      href={`/directory/category/${category.slug}`}
                      className="block p-2 text-sm rounded-md hover-elevate"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`mobile-nav-company-${category.slug}`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/directory"
                  className="block p-2 text-sm text-primary font-medium mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="mobile-nav-full-directory"
                >
                  Browse Full Directory
                </Link>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/about"
                    className="block p-2 text-sm rounded-md hover-elevate"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-nav-about"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="block p-2 text-sm rounded-md hover-elevate"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-nav-contact"
                  >
                    Contact
                  </Link>
                </div>
              </div>
              <div className="pt-4">
                <Button 
                  asChild
                  className="w-full font-heading" 
                  data-testid="mobile-button-subscribe"
                >
                  <Link href="/subscribe" onClick={() => setMobileMenuOpen(false)}>
                    Subscribe
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

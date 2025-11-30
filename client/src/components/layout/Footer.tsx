import { Link } from "wouter";
import { 
  BookOpen, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram
} from "lucide-react";
import { articleCategories, companyCategories } from "@/lib/magazine-data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const articleLinks = articleCategories.slice(0, 6).map(cat => ({
    label: cat.name,
    href: `/articles/category/${cat.slug}`
  }));

  const directoryLinks = companyCategories.slice(0, 6).map(cat => ({
    label: cat.name,
    href: `/directory/category/${cat.slug}`
  }));

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Subscribe", href: "/subscribe" },
    { label: "Advertise", href: "/contact" },
    { label: "List Your Company", href: "/contact" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4" data-testid="footer-logo">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="font-heading font-bold text-lg leading-tight block">Dubai Logistics</span>
                <span className="font-heading text-xs opacity-70 leading-tight block">MAGAZINE</span>
              </div>
            </Link>
            <p className="text-sm opacity-80 mb-6 max-w-md">
              Dubai's premier publication covering the logistics and freight industry. 
              We provide industry news, expert insights, and a comprehensive directory 
              of logistics companies operating in Dubai.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 opacity-70" />
                <span>Media City, Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 opacity-70" />
                <span>+971 4 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 opacity-70" />
                <span>info@dubailogisticsmagazine.ae</span>
              </div>
            </div>
          </div>

          {/* Article Categories */}
          <div>
            <h3 className="font-heading font-semibold text-base mb-4">Articles</h3>
            <ul className="space-y-2">
              {articleLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm opacity-80 hover:opacity-100 hover:underline"
                    data-testid={`footer-link-${link.href.replace(/\//g, '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/articles" 
                  className="text-sm text-primary hover:underline"
                  data-testid="footer-link-all-articles"
                >
                  View All Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Directory */}
          <div>
            <h3 className="font-heading font-semibold text-base mb-4">Directory</h3>
            <ul className="space-y-2">
              {directoryLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm opacity-80 hover:opacity-100 hover:underline"
                    data-testid={`footer-link-${link.href.replace(/\//g, '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/directory" 
                  className="text-sm text-primary hover:underline"
                  data-testid="footer-link-full-directory"
                >
                  Full Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Magazine */}
          <div>
            <h3 className="font-heading font-semibold text-base mb-4">Magazine</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link 
                    href={link.href} 
                    className="text-sm opacity-80 hover:opacity-100 hover:underline"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-70">
              {currentYear} Dubai Logistics Magazine. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Facebook"
                data-testid="social-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Twitter"
                data-testid="social-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="opacity-70 hover:opacity-100 transition-opacity"
                aria-label="LinkedIn"
                data-testid="social-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Instagram"
                data-testid="social-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/privacy" className="opacity-70 hover:opacity-100 hover:underline" data-testid="link-privacy">
                Privacy Policy
              </Link>
              <Link href="/terms" className="opacity-70 hover:opacity-100 hover:underline" data-testid="link-terms">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

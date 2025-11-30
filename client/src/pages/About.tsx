import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  BookOpen, 
  Target, 
  Users, 
  Award,
  Newspaper,
  Building2,
  TrendingUp,
  Globe,
  ArrowRight
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Accuracy",
      description: "We are committed to delivering accurate, verified information that our readers can trust and rely on."
    },
    {
      icon: Users,
      title: "Community",
      description: "We serve the logistics community by connecting professionals, companies, and industry stakeholders."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in our journalism, providing in-depth analysis and expert perspectives."
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description: "While focused on Dubai, we cover global trends that impact the region's logistics landscape."
    }
  ];

  const stats = [
    { value: "2015", label: "Founded" },
    { value: "100+", label: "Articles Published" },
    { value: "50+", label: "Companies Listed" },
    { value: "10K+", label: "Monthly Readers" }
  ];

  return (
    <Layout>
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "About" }
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <BookOpen className="w-12 h-12 mx-auto text-primary mb-4" />
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4" data-testid="text-about-title">
            About Dubai Logistics Magazine
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted source for logistics industry news, insights, and company information in Dubai
          </p>
        </div>

        {/* Mission Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-center leading-relaxed" data-testid="text-mission">
                Dubai Logistics Magazine is dedicated to informing, connecting, and empowering 
                logistics professionals in Dubai and the wider region. We provide comprehensive 
                coverage of the logistics industry, from breaking news and market analysis to 
                in-depth guides and a trusted company directory.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} data-testid={`stat-${index}`}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-12" data-testid="text-offer-heading">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover-elevate overflow-visible">
              <CardHeader>
                <Newspaper className="w-10 h-10 mx-auto text-primary mb-2" />
                <CardTitle>Industry News</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Stay informed with the latest developments in Dubai's logistics sector, 
                  from port expansions to regulatory changes.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover-elevate overflow-visible">
              <CardHeader>
                <TrendingUp className="w-10 h-10 mx-auto text-primary mb-2" />
                <CardTitle>Expert Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  In-depth market analysis, trend reports, and expert perspectives 
                  to help you make informed decisions.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover-elevate overflow-visible">
              <CardHeader>
                <Building2 className="w-10 h-10 mx-auto text-primary mb-2" />
                <CardTitle>Company Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A comprehensive listing of logistics companies in Dubai, 
                  from freight forwarders to warehousing providers.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-12" data-testid="text-values-heading">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover-elevate overflow-visible" data-testid={`card-value-${index}`}>
                <CardHeader>
                  <value.icon className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16 max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">Our Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground mb-6" data-testid="text-team">
                Dubai Logistics Magazine is powered by a team of experienced journalists, 
                industry analysts, and logistics professionals. Our diverse backgrounds 
                enable us to provide comprehensive coverage that serves both newcomers 
                and veterans of the industry.
              </p>
              <p className="text-center text-muted-foreground">
                Our editorial team has decades of combined experience covering logistics, 
                supply chain, and trade in the Middle East region.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="font-heading text-2xl font-bold mb-4" data-testid="text-cta-heading">
            Get In Touch
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Have a news tip? Want to list your company in our directory? 
            Interested in advertising opportunities? We'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild data-testid="button-contact">
              <Link href="/contact">
                Contact Us <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" data-testid="button-subscribe">
              <Link href="/subscribe">
                Subscribe
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
}

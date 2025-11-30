import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Newspaper, 
  TrendingUp, 
  Building2,
  CheckCircle,
  Bell
} from "lucide-react";

export default function Subscribe() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preferences, setPreferences] = useState({
    industryNews: true,
    marketAnalysis: true,
    companyUpdates: false,
    weeklyDigest: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate subscription
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Successfully Subscribed!",
      description: "Thank you for subscribing to Dubai Logistics Magazine.",
    });
    
    setEmail("");
    setName("");
    setIsSubmitting(false);
  };

  const benefits = [
    {
      icon: Newspaper,
      title: "Industry News",
      description: "Stay updated with the latest developments in Dubai's logistics sector"
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Receive exclusive analysis and trends affecting the industry"
    },
    {
      icon: Building2,
      title: "Company Updates",
      description: "Learn about new players and developments in the logistics ecosystem"
    },
    {
      icon: Bell,
      title: "Weekly Digest",
      description: "Get a curated summary of the week's most important stories"
    }
  ];

  return (
    <Layout>
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Subscribe" }
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Mail className="w-12 h-12 mx-auto text-primary mb-4" />
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4" data-testid="text-subscribe-title">
            Subscribe to Our Newsletter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of logistics professionals receiving industry insights directly in their inbox
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Subscription Form */}
          <Card>
            <CardHeader>
              <CardTitle>Join Our Mailing List</CardTitle>
              <CardDescription>
                Subscribe to receive the latest news and updates from Dubai Logistics Magazine
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name (Optional)</Label>
                  <Input 
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    data-testid="input-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    data-testid="input-email"
                  />
                </div>

                <div className="space-y-3 pt-4">
                  <Label className="text-base">Email Preferences</Label>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="industryNews"
                      checked={preferences.industryNews}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, industryNews: !!checked }))
                      }
                      data-testid="checkbox-industry-news"
                    />
                    <Label htmlFor="industryNews" className="font-normal">Industry News & Updates</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="marketAnalysis"
                      checked={preferences.marketAnalysis}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, marketAnalysis: !!checked }))
                      }
                      data-testid="checkbox-market-analysis"
                    />
                    <Label htmlFor="marketAnalysis" className="font-normal">Market Analysis & Trends</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="companyUpdates"
                      checked={preferences.companyUpdates}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, companyUpdates: !!checked }))
                      }
                      data-testid="checkbox-company-updates"
                    />
                    <Label htmlFor="companyUpdates" className="font-normal">New Company Listings</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="weeklyDigest"
                      checked={preferences.weeklyDigest}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, weeklyDigest: !!checked }))
                      }
                      data-testid="checkbox-weekly-digest"
                    />
                    <Label htmlFor="weeklyDigest" className="font-normal">Weekly Digest</Label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full mt-6"
                  disabled={isSubmitting}
                  data-testid="button-subscribe"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe Now"}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  By subscribing, you agree to receive emails from Dubai Logistics Magazine. 
                  You can unsubscribe at any time.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-bold mb-6" data-testid="text-benefits-heading">
              What You'll Receive
            </h2>
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover-elevate overflow-visible">
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-primary/5 border-primary/20 mt-8">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Free to Subscribe</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Our newsletter is completely free. We believe in keeping the logistics community informed and connected.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

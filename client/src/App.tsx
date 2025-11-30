import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import ArticleCategory from "@/pages/ArticleCategory";
import Directory from "@/pages/Directory";
import CompanyDetail from "@/pages/CompanyDetail";
import CompanyCategory from "@/pages/CompanyCategory";
import Subscribe from "@/pages/Subscribe";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Search from "@/pages/Search";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      {/* Articles */}
      <Route path="/articles" component={Articles} />
      <Route path="/articles/category/:slug" component={ArticleCategory} />
      <Route path="/articles/:slug" component={ArticleDetail} />
      
      {/* Directory */}
      <Route path="/directory" component={Directory} />
      <Route path="/directory/category/:slug" component={CompanyCategory} />
      <Route path="/directory/:slug" component={CompanyDetail} />
      
      {/* Other pages */}
      <Route path="/subscribe" component={Subscribe} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/search" component={Search} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AccessibilityProvider } from "@/hooks/use-accessibility";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Products from "@/pages/products";
import Categories from "@/pages/categories";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import AdminLogin from "@/pages/admin-login";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/categories" component={Categories} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={AdminLogin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AccessibilityProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AccessibilityProvider>
    </QueryClientProvider>
  );
}

export default App;

import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AccessibilityProvider } from "@/hooks/use-accessibility";

import Home from "@/pages/home";
import Products from "@/pages/products";
import ProductDetailsPage from "@/pages/product-details";
import Categories from "@/pages/categories";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import NotFound from "@/pages/not-found";
import GalleryPage from "@/pages/gallery";

function Router() {
  return (
    <Switch>
      {/* PUBLIC */}
      <Route path="/" component={Home} />

      {/* PRODUCTS */}
      <Route path="/products/:id">
        <ProductDetailsPage />
      </Route>
      <Route path="/products" component={Products} />

      <Route path="/gallery" component={GalleryPage} />

      {/* PAGES */}
      <Route path="/categories" component={Categories} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />

      {/* ADMIN */}
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />

      {/* 404 – ALWAYS LAST */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
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

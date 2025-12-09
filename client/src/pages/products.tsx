import Layout from "@/components/layout";
import { useProducts, useCategories } from "@/lib/hooks";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Search, Filter } from "lucide-react";

export default function Products() {
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.categoryId === parseInt(categoryFilter);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading font-bold mb-4">Our Products</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Browse our catalog of high-quality, accessible products designed to improve navigation and independence.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center bg-card p-4 rounded-lg shadow-sm border">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search products"
              data-testid="input-search"
            />
          </div>
          <div className="w-full md:w-[200px]">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger aria-label="Filter by category" data-testid="select-category">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        {productsLoading || categoriesLoading ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">Loading products...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const category = categories.find(c => c.id === product.categoryId);
                return (
                  <Card key={product.id} className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow" data-testid={`card-product-${product.id}`}>
                    <div className="aspect-video bg-muted relative overflow-hidden group">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="font-bold shadow-sm" data-testid={`text-price-${product.id}`}>{product.price}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 flex-1">
                      <div className="text-sm text-primary font-medium mb-2 uppercase tracking-wide">
                        {category?.name}
                      </div>
                      <h3 className="text-xl font-bold mb-3" data-testid={`text-name-${product.id}`}>{product.name}</h3>
                      <p className="text-muted-foreground">{product.description}</p>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button className="w-full" variant="outline" data-testid={`button-details-${product.id}`}>View Details</Button>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                <p className="text-xl">No products found matching your criteria.</p>
                <Button 
                  variant="link" 
                  onClick={() => {setSearchTerm(""); setCategoryFilter("all");}}
                  className="mt-2"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { getCurrentUser, logout } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProducts, useCategories, usePartners } from "@/lib/hooks";
import { LayoutDashboard, Package, FolderTree, Users, LogOut, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();
  const { data: partners = [] } = usePartners();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/admin");
    }
  }, [user, isLoading, setLocation]);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "Successfully logged out",
      });
      setLocation("/admin");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">TactileOne Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user.username}</span>
            <Button variant="outline" size="sm" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-products">{products.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
              <FolderTree className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-categories">{categories.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Partners</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-partners">{partners.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Contact Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Management Tabs */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="products" data-testid="tab-products">Products</TabsTrigger>
                <TabsTrigger value="categories" data-testid="tab-categories">Categories</TabsTrigger>
                <TabsTrigger value="partners" data-testid="tab-partners">Partners</TabsTrigger>
                <TabsTrigger value="contact" data-testid="tab-contact">Contact Messages</TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Manage Products</h3>
                  <Button data-testid="button-add-product">Add Product</Button>
                </div>
                <div className="border rounded-lg">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Price</th>
                        <th className="text-right p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => {
                        const category = categories.find(c => c.id === product.categoryId);
                        return (
                          <tr key={product.id} className="border-t" data-testid={`row-product-${product.id}`}>
                            <td className="p-4">{product.name}</td>
                            <td className="p-4">{category?.name}</td>
                            <td className="p-4">{product.price}</td>
                            <td className="p-4 text-right space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="destructive" size="sm">Delete</Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="categories" className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Manage Categories</h3>
                  <Button data-testid="button-add-category">Add Category</Button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map(category => (
                    <Card key={category.id} data-testid={`card-category-${category.id}`}>
                      <CardContent className="p-4">
                        <img src={category.image} alt={category.name} className="w-full h-32 object-cover rounded mb-3" />
                        <h4 className="font-bold mb-1">{category.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                          <Button variant="destructive" size="sm" className="flex-1">Delete</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="partners" className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Manage Partners</h3>
                  <Button data-testid="button-add-partner">Add Partner</Button>
                </div>
                <div className="border rounded-lg">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Type</th>
                        <th className="text-right p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {partners.map(partner => (
                        <tr key={partner.id} className="border-t" data-testid={`row-partner-${partner.id}`}>
                          <td className="p-4">{partner.name}</td>
                          <td className="p-4">{partner.type}</td>
                          <td className="p-4 text-right space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="destructive" size="sm">Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="mt-6">
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No contact messages yet</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

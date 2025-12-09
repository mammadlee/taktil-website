import Layout from "@/components/layout";
import { useCategories } from "@/lib/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Categories() {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <Layout>
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Product Categories</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Explore our specialized range of accessibility solutions tailored for different environments and needs.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">Loading categories...</p>
          </div>
        ) : (
          <div className="grid gap-12">
            {categories.map((category, idx) => (
              <div 
                key={category.id} 
                className={`flex flex-col md:flex-row gap-8 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                data-testid={`category-${category.id}`}
              >
                <div className="flex-1 w-full">
                  <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={category.image} 
                      alt={`${category.name} category`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 w-full space-y-6">
                  <h2 className="text-3xl font-bold text-foreground">{category.name}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {category.description}
                    {" "}
                    Designed to meet rigorous accessibility standards while maintaining aesthetic appeal. Our {category.name.toLowerCase()} solutions are trusted by institutions worldwide for their durability and clarity.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-foreground font-medium">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      High-contrast visibility
                    </li>
                    <li className="flex items-center gap-2 text-foreground font-medium">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      Durable, long-lasting materials
                    </li>
                    <li className="flex items-center gap-2 text-foreground font-medium">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      Customizable options available
                    </li>
                  </ul>
                  <div className="pt-4">
                    <Link href="/products">
                      <Button size="lg" className="group" data-testid={`button-browse-${category.id}`}>
                        Browse {category.name} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

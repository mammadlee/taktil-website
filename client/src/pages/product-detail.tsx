import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
};

async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error("Məhsul tapılmadı");
  return res.json();
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Yüklənir...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Məhsul tapılmadı</p>
        <Link href="/">
          <Button variant="outline">Ana səhifəyə qayıt</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Back */}
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Ana səhifəyə qayıt
          </Button>
        </Link>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="rounded-lg overflow-hidden border bg-background">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[420px] object-cover"
          />
        </div>

        <div>
          <div className="mb-2 text-sm text-muted-foreground">
            {product.category}
          </div>

          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <p className="text-muted-foreground mb-6 whitespace-pre-line">
            {product.description}
          </p>

          <div className="flex gap-3">
            <a href="#contact">
              <Button size="lg">Bizimlə əlaqə</Button>
            </a>

            <Link href="/">
              <Button size="lg" variant="outline">
                Geri
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
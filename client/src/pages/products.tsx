import { useMemo, useState } from "react";
import { Link } from "wouter";
import { useProducts } from "@/lib/hooks";
import { SEO } from "@/components/seo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ChevronRight, ArrowRight, FilterX, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout";

const PAGE_SIZE = 6;

export default function ProductsPage() {
  const { data: products = [], isLoading } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => { if (p.category) set.add(p.category); });
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    let list = products;
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => 
        p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, category, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  return (
    <Layout>
      <SEO
        title="Məhsul Kataloqu - Taktil.az"
        description="Beynəlxalq standartlara uyğun taktil döşəmələr və braille lövhələr."
      />

      <div className="min-h-screen bg-white">
        {/* ================= HERO HEADER (FULLY RESPONSIVE) ================= */}
        <section className="relative pt-24 pb-10 md:pt-32 md:pb-16 lg:pt-40 lg:pb-24 overflow-hidden px-4">
          <div className="container mx-auto">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              
              <div className="space-y-4 md:space-y-6 max-w-3xl text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] md:text-xs font-bold uppercase tracking-widest border border-blue-100"
                >
                  <Sparkles className="w-3 h-3" /> Eksklüziv Kolleksiya
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[1.1]"
                >
                  Məhsul <span className="text-blue-600 italic font-serif">Kataloqu</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm md:text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
                >
                  Beynəlxalq standartlara uyğun, peşəkar mühəndislər tərəfindən test edilmiş həllər.
                </motion.p>
              </div>

              {/* Search Box - Optimized for mobile touch */}
              <motion.div 
                className="w-full lg:w-[400px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600 z-10" />
                  <Input
                    placeholder="Məhsul axtar..."
                    className="pl-12 h-14 md:h-16 rounded-2xl border-slate-100 bg-slate-50 text-base focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= FILTER BAR (TOUCH FRIENDLY) ================= */}
        <section className="sticky top-[64px] z-30 py-4 bg-white/90 backdrop-blur-md border-y border-slate-100">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              <FilterButton 
                active={category === "all"} 
                label="Hamısı" 
                onClick={() => { setCategory("all"); setPage(1); }} 
              />
              {categories.map((c) => (
                <FilterButton 
                  key={c}
                  active={category === c} 
                  label={c} 
                  onClick={() => { setCategory(c); setPage(1); }} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* ================= PRODUCT GRID ================= */}
        <section className="py-10 md:py-20 px-4">
          <div className="container mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-[400px] w-full rounded-[2.5rem]" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <FilterX className="h-12 w-12 text-slate-200 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900">Məhsul tapılmadı</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-12">
                <AnimatePresence mode="popLayout">
                  {paginated.map((p, idx) => (
                    <ProductCard key={p.id} product={p} index={idx} />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* ================= PAGINATION (RESPONSIVE) ================= */}
            {totalPages > 1 && (
              <div className="mt-12 md:mt-20 flex justify-center items-center gap-2 sm:gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={page === 1}
                  onClick={() => { setPage(p => p - 1); window.scrollTo(0, 400); }}
                  className="rounded-xl h-10 w-10 md:h-12 md:w-12"
                >
                  <ChevronRight className="rotate-180" />
                </Button>
                
                <div className="flex gap-1 sm:gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setPage(i + 1); window.scrollTo(0, 400); }}
                      className={`min-w-[40px] md:min-w-[48px] h-10 md:h-12 rounded-xl text-sm font-bold transition-all ${
                        page === i + 1 
                          ? "bg-blue-600 text-white shadow-lg" 
                          : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  disabled={page === totalPages}
                  onClick={() => { setPage(p => p + 1); window.scrollTo(0, 400); }}
                  className="rounded-xl h-10 w-10 md:h-12 md:w-12"
                >
                  <ChevronRight />
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}

function FilterButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap active:scale-95 ${
        active 
          ? "bg-blue-600 text-white shadow-md shadow-blue-100" 
          : "bg-slate-50 text-slate-500 border border-transparent hover:border-slate-200"
      }`}
    >
      {label}
    </button>
  );
}

function ProductCard({ product, index }: { product: any; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="group border-none bg-slate-50/50 rounded-[2rem] overflow-hidden hover:bg-white hover:shadow-2xl transition-all duration-500">
        <CardContent className="p-0">
          <Link href={`/products/${product.id}`}>
            <div className="relative aspect-[4/3] overflow-hidden cursor-pointer">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-blue-600 uppercase tracking-widest shadow-sm">
                  {product.category}
                </span>
              </div>
            </div>
          </Link>

          <div className="p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-slate-500 text-sm md:text-base line-clamp-2 mb-6 font-light">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between pt-5 border-t border-slate-100">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Standart</span>
                <span className="text-xs font-bold text-slate-900">ISO 9001:2015</span>
              </div>
              <Link href={`/products/${product.id}`}>
                <Button size="sm" className="rounded-xl bg-white text-blue-600 border border-blue-100 hover:bg-blue-600 hover:text-white shadow-none group/btn">
                  Bax <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
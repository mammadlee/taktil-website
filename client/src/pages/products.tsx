import { useMemo, useState } from "react";
import { Link } from "wouter";
import { useProducts } from "@/lib/hooks";
import { SEO } from "@/components/seo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ChevronRight, ArrowRight, FilterX, LayoutGrid, List, Sparkles } from "lucide-react";
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

  // ✅ STRUCTURED DATA for Product Catalog
  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Məhsul Kataloqu - Taktil.az",
    "description": "Taktil döşəmələr, braille lövhələr və əlçatanlıq həlləri - Beynəlxalq standartlara uyğun məhsullar",
    "url": "https://taktil.az/products",
    "numberOfItems": products.length
  };

  return (
    <Layout>
      <SEO
        title="Məhsul Kataloqu - Taktil Döşəmələr və Braille Lövhələr"
        description="Taktil.az məhsul kataloqu: Beynəlxalq standartlara uyğun taktil döşəmələr, braille informasiya lövhələri, əlçatanlıq sistemləri və görməyə məhdudiyyəti olan şəxslər üçün innovativ həllər."
        keywords="taktil döşəmə qiyməti, braille lövhə, əlçatanlıq məhsulları, taktil plitələr, yönləndirici lövhələr, Azərbaycan"
        ogImage="/logo.png"
        structuredData={productListSchema}
      />

      <div className="min-h-screen bg-white">
        {/* ================= HERO HEADER ================= */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.05),transparent)] pointer-events-none" />
          
          <div className="container mx-auto px-6">
            <motion.nav 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 text-sm font-semibold text-slate-400 mb-10 uppercase tracking-[0.2em]"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-blue-600 transition-colors">Ana Səhifə</Link>
              <ChevronRight className="w-4 h-4 text-slate-200" />
              <span className="text-blue-600">Kataloq</span>
            </motion.nav>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
              <div className="max-w-3xl space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-widest border border-blue-100"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Eksklüziv Kolleksiya
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none"
                >
                  Məhsul <span className="text-blue-600 italic font-serif">Kataloqu</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-slate-500 max-w-xl leading-relaxed font-light border-l-4 border-blue-600 pl-6"
                >
                  Hər bir məhsul beynəlxalq əlçatanlıq standartlarına uyğun, 
                  peşəkar mühəndislərimiz tərəfindən test edilmişdir.
                </motion.p>
              </div>

              {/* Quick Search Widget */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full lg:w-[400px] p-2 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />
                  <Input
                    placeholder="Kataloqda axtarın..."
                    className="pl-12 h-14 rounded-2xl border-none bg-slate-50/50 text-lg focus-visible:ring-0"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    aria-label="Məhsul axtar"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= FILTER BAR (STICKY PRO) ================= */}
        <section className="sticky top-20 z-40 py-6 bg-white/80 backdrop-blur-xl border-y border-slate-100">
          <div className="container mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Kateqoriyalar:</span>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
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
            
            <div className="hidden sm:flex items-center gap-2 text-slate-400 bg-slate-50 p-1.5 rounded-xl">
               <button className="p-2 bg-white rounded-lg shadow-sm text-blue-600" aria-label="Grid görünüşü"><LayoutGrid className="w-4 h-4" /></button>
               <button className="p-2 hover:text-slate-600" aria-label="Siyahı görünüşü"><List className="w-4 h-4" /></button>
            </div>
          </div>
        </section>

        {/* ================= PRODUCT GRID ================= */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-6">
                    <Skeleton className="h-[400px] w-full rounded-[3rem]" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="py-32 text-center"
              >
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FilterX className="h-10 w-10 text-slate-200" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Məhsul tapılmadı</h3>
                <p className="text-slate-400 mt-2">Axtarış meyarlarınızı dəyişməyə çalışın.</p>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                <AnimatePresence mode="popLayout">
                  {paginated.map((p, idx) => (
                    <ProductCard key={p.id} product={p} index={idx} />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* ================= PAGINATION (PRO) ================= */}
            {totalPages > 1 && (
              <div className="mt-24 flex justify-center items-center gap-8">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 disabled:opacity-30 transition-all"
                  aria-label="Əvvəlki səhifə"
                >
                  <ChevronRight className="w-6 h-6 rotate-180" />
                </button>
                
                <div className="flex gap-3">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-12 h-12 rounded-2xl font-bold transition-all ${
                        page === i + 1 
                          ? "bg-blue-600 text-white shadow-xl shadow-blue-200" 
                          : "text-slate-400 hover:bg-slate-50"
                      }`}
                      aria-label={`Səhifə ${i + 1}`}
                      aria-current={page === i + 1 ? "page" : undefined}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 disabled:opacity-30 transition-all"
                  aria-label="Növbəti səhifə"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}

/* ================= COMPONENT: FILTER BUTTON ================= */
function FilterButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
        active 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-100 scale-105" 
          : "bg-white text-slate-500 border border-slate-100 hover:border-blue-200"
      }`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

/* ================= COMPONENT: PRODUCT CARD (PRO) ================= */
function ProductCard({ product, index }: { product: any; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card className="group relative h-full border-none bg-white rounded-[3rem] overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 hover:-translate-y-3">
        <CardContent className="p-0">
          {/* Image Zone */}
          <div className="relative h-[340px] overflow-hidden bg-slate-50">
            <img
              src={product.image}
              alt={`${product.name} - Taktil.az`}
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Badge Overlay */}
            <div className="absolute top-8 left-8">
              <span className="bg-white/90 backdrop-blur-xl px-4 py-2 rounded-2xl text-[10px] font-black text-blue-600 uppercase tracking-widest shadow-xl">
                {product.category}
              </span>
            </div>

            {/* Quick View Button (Glass) */}
            <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <Link href={`/products/${product.id}`}>
                <Button className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white rounded-2xl px-8 h-14 font-bold shadow-2xl transition-all scale-90 group-hover:scale-100">
                  Məhsula Bax
                </Button>
              </Link>
            </div>
          </div>

          {/* Content Zone */}
          <div className="p-10">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-extrabold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
            </div>
            
            <p className="text-slate-500 line-clamp-2 text-lg font-light leading-relaxed mb-10">
              {product.description}
            </p>

            <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Sertifikat</span>
                <span className="text-xs font-bold text-slate-900 uppercase">ISO 9001:2015</span>
              </div>
              <Link href={`/products/${product.id}`}>
                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-[-10deg] transition-all duration-500">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
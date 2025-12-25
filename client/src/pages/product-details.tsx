import { useMemo } from "react";
import { useLocation, Link } from "wouter";
import { useProducts } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, FileText, Share2, Info } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout";

export default function ProductDetailsPage() {
  const [location, setLocation] = useLocation();

  const productId = useMemo(() => {
    const parts = location.split("/");
    return Number(parts[parts.length - 1]);
  }, [location]);

  const { data: products = [], isLoading } = useProducts();

  const product = useMemo(
    () => products.find((p) => p.id === productId),
    [products, productId]
  );

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="h-[450px] w-full rounded-3xl" />
            <div className="space-y-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <Info className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900">Məhsul tapılmadı</h2>
          <Button onClick={() => setLocation("/products")} className="mt-4 bg-blue-600">Geri qayıt</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* ================= NAV BAR ================= */}
        <div className="sticky top-16 md:top-20 z-30 bg-white/90 backdrop-blur-md border-b border-slate-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setLocation("/products")}
              className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kataloqa qayıt</span>
            </button>
            <button className="p-2.5 rounded-full border border-slate-100 hover:bg-slate-50 text-slate-400 transition-all">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= PRODUCT DISPLAY ================= */}
        <section className="py-10 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* IMAGE */}
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-slate-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[400px] md:h-[550px] lg:h-[650px] object-cover"
                  />
                </Card>
              </motion.div>

              {/* DETAILS */}
              <div className="flex flex-col">
                <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6 w-fit">
                  {product.category}
                </span>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                  {product.name}
                </h1>
                
                <p className="text-base md:text-lg text-slate-600 leading-relaxed font-normal mb-10 border-l-4 border-blue-500 pl-6 py-2">
                  {product.description}
                </p>

                {/* FEATURE GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  <FeatureItem icon={<ShieldCheck />} title="Sertifikatlı" desc="ISO & Standart" />
                  <FeatureItem icon={<CheckCircle2 />} title="Dayanıqlı" desc="Uzunömürlü material" />
                  <FeatureItem icon={<Truck />} title="Quraşdırma" desc="Peşəkar xidmət" />
                  <FeatureItem icon={<FileText />} title="Layihə" desc="Pulsuz dizayn" />
                </div>

                <div className="flex flex-col gap-4">
                  <Link href="/contact">
                    <Button className="w-full h-14 md:h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
                      Qiymət Təklifi Al
                    </Button>
                  </Link>
                  <p className="text-center text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                    ⚡ Sorğular 1 iş günü ərzində cavablanır
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BOTTOM CTA ================= */}
        <section className="px-4 pb-20">
          <div className="container mx-auto bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                Texniki sualınız var?
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-10 text-sm md:text-base">
                Mühəndisimiz layihənizə uyğun ən yaxşı taktil həlləri seçməkdə sizə köməklik göstərəcək.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-blue-600 hover:text-white rounded-xl h-14 px-10 font-bold transition-all">
                  Məsləhətçi ilə Əlaqə
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50/50 border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-900 mb-0.5">{title}</h4>
        <p className="text-[11px] text-slate-500 font-medium uppercase">{desc}</p>
      </div>
    </div>
  );
}
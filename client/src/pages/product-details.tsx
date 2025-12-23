import { useMemo } from "react";
import { useLocation, Link } from "wouter";
import { useProducts } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, FileText, Share2 } from "lucide-react";
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
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16">
            <Skeleton className="h-[600px] w-full rounded-[3rem]" />
            <div className="space-y-6">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-32 w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-14 w-40 rounded-xl" />
                <Skeleton className="h-14 w-40 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-32 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Məhsul tapılmadı</h2>
          <Button variant="link" onClick={() => setLocation("/products")} className="text-blue-600">
            Kataloqa qayıt
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* ================= BREADCRUMB & ACTIONS ================= */}
        <div className="container mx-auto px-6 pt-10 pb-6">
          <div className="flex items-center justify-between">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setLocation("/products")}
              className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors"
            >
              <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-blue-100 group-hover:bg-blue-50 transition-all">
                <ArrowLeft className="h-4 w-4" />
              </div>
              Kataloqa qayıt
            </motion.button>

            <button className="p-3 rounded-full border border-slate-100 hover:bg-slate-50 text-slate-400 transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <section className="pb-24">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              
              {/* LEFT: IMAGE SHOWCASE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-blue-50/50 rounded-[4rem] -z-10 blur-2xl" />
                <Card className="border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden bg-slate-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[650px] object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </Card>
              </motion.div>

              {/* RIGHT: PRODUCT INFO */}
              <div className="lg:py-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest mb-6">
                      {product.category}
                    </span>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-6">
                      {product.name}
                    </h1>
                    <p className="text-xl text-slate-500 leading-relaxed font-light">
                      {product.description}
                    </p>
                  </div>

                  {/* VIZUAL ÖZƏLLİKLƏR (ICONS) */}
                  <div className="grid grid-cols-2 gap-4">
                    <FeatureItem icon={<ShieldCheck className="w-5 h-5" />} title="Yüksək Keyfiyyət" desc="Beynəlxalq standart" />
                    <FeatureItem icon={<CheckCircle2 className="w-5 h-5" />} title="Tam Uyğunluq" desc="AZ standartları" />
                    <FeatureItem icon={<Truck className="w-5 h-5" />} title="Sürətli Quraşdırma" desc="Peşəkar komanda" />
                    <FeatureItem icon={<FileText className="w-5 h-5" />} title="Texniki Zəmanət" desc="5 il rəsmi" />
                  </div>

                  <hr className="border-slate-100" />

                  {/* CTA BUTTONS */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link href="/contact" className="flex-1">
                      <Button className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-lg font-bold shadow-xl shadow-blue-200 transition-all">
                        Qiymət təklifi al
                      </Button>
                    </Link>
                    <Link href="/contact" className="flex-1">
                      <Button variant="outline" className="w-full h-16 rounded-2xl border-slate-200 text-lg font-bold hover:bg-slate-50 transition-all">
                        Kataloqu endir (.PDF)
                      </Button>
                    </Link>
                  </div>

                  {/* ADDITIONAL TRUST TEXT */}
                  <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest pt-4">
                    Bütün məhsullarımız laboratoriya şəraitində test edilmişdir.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= RELATED / CTA SECTION ================= */}
        <section className="bg-slate-900 py-24 rounded-t-[4rem]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">
              Bu məhsul haqqında daha çox <br /> məlumat lazımdır?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg">
              Mühəndisimizlə canlı əlaqə saxlayaraq layihənizə uyğun texniki dəstək və spesifikasiyaları ala bilərsiniz.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-blue-600 hover:text-white rounded-2xl h-16 px-12 font-bold text-lg transition-all">
                Məsləhətçi ilə danış
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

/* ================= MINI COMPONENT: FEATURE ITEM ================= */
function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all">
      <div className="text-blue-600">{icon}</div>
      <div>
        <h4 className="text-sm font-bold text-slate-900">{title}</h4>
        <p className="text-[11px] text-slate-400 font-medium uppercase tracking-tighter">{desc}</p>
      </div>
    </div>
  );
}
import Layout from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/api";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await submitContactForm(data);
      toast({
        title: "Mesaj göndərildi",
        description: "Biz sizinlə tez bir zamanda əlaqə saxlayacağıq.",
      });
      reset();
    } catch (error: any) {
      toast({
        title: "Xəta",
        description: error.message || "Mesaj göndərilmədi. Yenidən cəhd edin.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEO 
        title="Əlaqə - Taktil.az"
        description="Sualınız var? Bizimlə əlaqə saxlayın, əlçatanlıq üzrə mütəxəssislərimiz sizə kömək etsin."
      />

      {/* ================= HERO SECTION (FULLY RESPONSIVE) ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-600 to-blue-800 pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-white rounded-full blur-[60px] md:blur-[120px] translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 mb-4 text-[10px] md:text-xs font-bold tracking-widest text-blue-100 uppercase bg-blue-500/30 rounded-full border border-blue-400/30 backdrop-blur-md"
          >
            Bizimlə Əlaqə
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight leading-tight"
          >
            Sualınız Var? <br className="xs:hidden" /> <span className="text-blue-200 italic font-serif">Bizə Yazın</span>
          </motion.h1>
          <p className="text-sm md:text-lg text-blue-50 max-w-2xl mx-auto opacity-90 font-light px-2 leading-relaxed">
            Məhsullarımızla bağlı sualınız var və ya xüsusi qiymət təklifi almaq
            istəyirsiniz? Sizə kömək etməyə hazırıq.
          </p>
        </div>
      </section>

      {/* ================= CONTENT SECTION (FULLY RESPONSIVE) ================= */}
      <section className="container mx-auto px-4 py-8 md:py-16 lg:py-20 -mt-10 md:-mt-16 relative z-20">
        <div className="grid lg:grid-cols-12 gap-6 md:gap-10 items-start">
          
          {/* LEFT INFO CARDS */}
          <div className="lg:col-span-5 space-y-4 md:space-y-6">
            <div className="bg-white p-6 md:p-10 rounded-[24px] md:rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                Əlaqə Məlumatları
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
                <InfoCard
                  icon={<Phone className="w-4 h-4" />}
                  title="Əlaqə nömrəsi"
                  lines={["+994 (50) 212 91 44"]}
                />
                <InfoCard
                  icon={<Mail className="w-4 h-4" />}
                  title="Email"
                  lines={["info@taktil.az"]}
                />
                <InfoCard
                  icon={<MapPin className="w-4 h-4" />}
                  title="Ünvan"
                  lines={["Rəşid Behbudov 44, Baku"]}
                />
                <InfoCard
                  icon={<Clock className="w-4 h-4" />}
                  title="İş saatları"
                  lines={["B.e – Cümə: 09:00 – 18:00"]}
                />
              </div>
            </div>

            {/* Accessibility Statement Card */}
            <div className="bg-blue-600 rounded-[24px] md:rounded-[32px] p-6 md:p-8 text-white relative overflow-hidden group">
              <ShieldCheck className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" /> Əlçatanlıq
              </h3>
              <p className="text-blue-100 text-xs md:text-sm leading-relaxed opacity-90">
                Taktil.az hər kəs üçün maneəsiz rəqəmsal təcrübə təmin etməyə sadiqdir.
              </p>
            </div>
          </div>

          {/* RIGHT FORM CARD */}
          <div className="lg:col-span-7">
            <Card className="border-none shadow-2xl shadow-slate-200/60 rounded-[24px] md:rounded-[32px] overflow-hidden bg-white">
              <CardContent className="p-6 md:p-10 lg:p-12">
                <div className="mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                    Bizə Mesaj Göndərin
                  </h2>
                  <p className="text-sm text-slate-500">Mütəxəssisimiz 24 saat ərzində sizinlə əlaqə saxlayacaq.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-slate-700 font-semibold text-xs md:text-sm ml-1">Ad və Soyad</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Adınız"
                        className="h-12 rounded-xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all text-sm md:text-base"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-slate-700 font-semibold text-xs md:text-sm ml-1">Telefon</Label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        placeholder="(050) 000-00-00"
                        className="h-12 rounded-xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all text-sm md:text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-slate-700 font-semibold text-xs md:text-sm ml-1">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="nümunə@mail.com"
                      className="h-12 rounded-xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all text-sm md:text-base"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-slate-700 font-semibold text-xs md:text-sm ml-1">Mesajınız</Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Sizə necə kömək edə bilərik?"
                      className="min-h-[120px] md:min-h-[160px] rounded-xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all py-3 text-sm md:text-base"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 md:h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm md:text-base font-bold shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">Gözləyin...</span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Mesajı Göndər <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}

/* ================= INFO CARD COMPONENT (RESPONSIVE) ================= */
function InfoCard({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-blue-100 hover:bg-white hover:shadow-md transition-all duration-300 group flex items-start gap-4">
      <div className="w-10 h-10 shrink-0 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-slate-900 text-[10px] md:text-xs uppercase tracking-wider mb-1">{title}</h3>
        {lines.map((l, i) => (
          <p key={i} className="text-sm text-slate-600 font-medium">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}
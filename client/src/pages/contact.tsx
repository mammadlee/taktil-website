import Layout from "@/components/layout";
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

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await submitContactForm(data);
      toast({
        title: "Mesaj gönderildi",
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
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-600 to-blue-800 py-20 md:py-28 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-blue-100 uppercase bg-blue-500/30 rounded-full border border-blue-400/30 backdrop-blur-md">
            Bizimlə Əlaqə
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Sualınız Var? <span className="text-blue-200">Bizə Yazın</span>
          </h1>
          <p className="text-lg text-blue-50 max-w-2xl mx-auto opacity-90 font-light">
            Məhsullarımızla bağlı sualınız var və ya xüsusi qiymət təklifi almaq
            istəyirsiniz? Sizə kömək etməyə hazırıq.
          </p>
        </div>
      </section>

      {/* ================= CONTENT SECTION ================= */}
      <section className="container mx-auto px-4 py-20 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT INFO (4 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Əlaqə Məlumatları
              </h2>
              <p className="text-slate-500 text-lg mb-8">
                Əlçatanlıq üzrə mütəxəssislərimiz obyektiniz üçün ən uyğun
                həlləri tapmaqda sizə kömək edəcək.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <InfoCard
                  icon={<Phone className="w-5 h-5" />}
                  title="Əlaqə nömrəsi"
                  lines={["+994", "(50) 212 91 44"]}
                />
                <InfoCard
                  icon={<Mail className="w-5 h-5" />}
                  title="Email"
                  lines={["info@taktil.az", "sales@taktil.az"]}
                />
                <InfoCard
                  icon={<MapPin className="w-5 h-5" />}
                  title="Ünvan"
                  lines={["Rəşid Behbudov 44", "Chinar Plaza"]}
                />
                <InfoCard
                  icon={<Clock className="w-5 h-5" />}
                  title="İş saatları"
                  lines={["B.e – Cümə: 09:00 – 18:00", "Şənbə & Bazar: Bağlıdır"]}
                />
              </div>
            </div>

            {/* Statement Box */}
            <div className="bg-blue-600 rounded-[32px] p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-24 h-24" />
              </div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6" /> Əlçatanlıq Bəyanatı
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed opacity-90">
                Taktil.az fiziki məhdudiyyətli şəxslər üçün rəqəmsal
                əlçatanlığın təmin edilməsinə sadiqdir. Biz hər kəs üçün
                istifadəçi təcrübəsini daim təkmilləşdiririk.
              </p>
            </div>
          </div>

          {/* FORM (7 Columns) */}
          <div className="lg:col-span-7">
            <Card className="border-none shadow-2xl rounded-[32px] overflow-hidden bg-white">
              <CardContent className="p-10">
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Bizə Mesaj Göndərin
                  </h2>
                  <p className="text-slate-500">Bütün sahələri doldurmağınız xahiş olunur.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700 font-medium">Ad və Soyad</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Mehdi Məmmədli"
                        className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700 font-medium">Əlaqə nömrəsi</Label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        placeholder="(050) 123-45-67"
                        className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 font-medium">Email Ünvanı</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="mehdi@example.com"
                      className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-slate-700 font-medium">Mövzu</Label>
                    <Input
                      id="subject"
                      {...register("subject")}
                      placeholder="Məhsul sorğusu və ya təklif"
                      className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-700 font-medium">Mesajınız</Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Sizə necə kömək edə bilərik?"
                      className="min-h-[150px] rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500 py-3"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 active:scale-[0.98]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Göndərilir..."
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Mesajı Göndər <Send className="w-5 h-5" />
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

/* ================= INFO CARD COMPONENT ================= */
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
    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group">
      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wide">{title}</h3>
        {lines.map((l, i) => (
          <p key={i} className="text-sm text-slate-600 font-medium leading-relaxed">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}
import Layout from "@/components/layout";
import { SEO } from "@/components/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, ShieldCheck, Star } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <SEO 
        title="Haqqımızda - Taktil.az"
        description="2018-ci ildən bəri Azərbaycanda görmə məhdudiyyətli şəxslər üçün beynəlxalq standartlara uyğun əlçatan mühit yaradırıq."
      />

      {/* ================= HERO SECTION (FULLY RESPONSIVE) ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-600 to-blue-800 pt-24 pb-12 md:pt-36 md:pb-24 lg:pt-44 lg:pb-32">
        {/* Background Decorative Blurs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-white rounded-full blur-[60px] md:blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-blue-400 rounded-full blur-[60px] md:blur-[120px] translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center max-w-4xl">
          <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 mb-4 md:mb-6 text-[10px] sm:text-xs md:text-sm font-bold tracking-wider text-blue-100 uppercase bg-blue-500/30 rounded-full border border-blue-400/30 backdrop-blur-md">
            Bizim Missiyamız
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 md:mb-6 text-white tracking-tight leading-tight">
            Toxunuşla Gələn <br className="hidden sm:block" /> 
            <span className="text-blue-200 italic font-serif">Müstəqillik</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-50 leading-relaxed font-light opacity-90 max-w-2xl mx-auto px-2">
            Taktil.az olaraq görmə imkanlarından asılı olmayaraq, hər bir fərdin mühiti 
            tam maneəsiz və təhlükəsiz şəkildə qavraması üçün innovativ həllər təqdim edirik.
          </p>
        </div>
      </section>

      {/* ================= STORY SECTION (FULLY RESPONSIVE) ================= */}
      <section className="py-12 md:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* IMAGE WRAPPER - Mobile optimized order */}
            <div className="relative group order-first lg:order-none">
              <div className="absolute -inset-2 bg-blue-100/50 rounded-[24px] md:rounded-[40px] transform -rotate-2 transition group-hover:rotate-0 duration-500" />
              <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-square rounded-[20px] md:rounded-[32px] overflow-hidden shadow-2xl border-2 sm:border-4 border-white">
                <img
                  src="/about.png"
                  alt="Taktil.az workshop"
                  className="w-full h-full object-cover transition transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Floating Badge - Hidden on tiny mobile, visible on sm+ */}
              <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-xl border border-blue-50 hidden xs:flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-blue-600 rounded-lg sm:rounded-xl text-white">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase">Sertifikatlı</p>
                  <p className="text-xs sm:text-base font-bold text-slate-900">Beynəlxalq Standart</p>
                </div>
              </div>
            </div>

            {/* TEXT CONTENT */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-blue-600 font-bold tracking-widest uppercase text-xs md:text-sm mx-auto lg:mx-0">
                <span className="w-6 md:w-8 h-px bg-blue-600"></span> Hekayəmiz
              </div>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-snug">
                2018-ci ildən Bəri Maneəsiz <br className="hidden md:block" /> Bir Azərbaycan Üçün
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base md:text-lg">
                <p>
                  Taktil.az-ın təməli Azərbaycanda görmə məhdudiyyətli şəxslər üçün 
                  dünya standartlarına uyğun maneəsiz mühit yaratmaq məqsədilə qoyulub.
                </p>
                <p>
                  Bizim üçün əlçatanlıq yalnız qanuni tələb deyil, həm də sosial məsuliyyətdir. 
                  Dizayn və funksionallığı birləşdirərək, estetik və texniki cəhətdən qüsursuz taktil həllər hazırlayırıq.
                </p>
                
                {/* Stats - Responsive Grid */}
                <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-6 border-t border-slate-100">
                  <div className="text-center lg:text-left">
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-600">500+</h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">Layihə</p>
                  </div>
                  <div className="text-center lg:text-left">
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-600">100%</h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">Uyğunluq</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES SECTION (FULLY RESPONSIVE) ================= */}
      <section className="bg-slate-50 py-12 md:py-24 border-y border-slate-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">Dəyərlərimiz</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600">
              Bizim işimizdə kiçik bir səhv, yanlış istiqamət deməkdir. Buna görə də hər detala həssaslıqla yanaşırıq.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ValueCard
              icon={<Target className="w-full h-full" />}
              title="Dəqiqlik"
              text="Brail əlifbasından tutmuş taktil yer örtüklərinə qədər hər şey millimetrik dəqiqliklə hesablanır."
            />
            <ValueCard
              icon={<Heart className="w-full h-full" />}
              title="İnsan Mərkəzli"
              text="Həllərimizi birbaşa istifadəçilərin ehtiyaclarını dinləyərək və onları anlayaraq formalaşdırırıq."
            />
            <div className="sm:col-span-2 lg:col-span-1">
              <ValueCard
                icon={<Star className="w-full h-full" />}
                title="İnnovasiya"
                text="Ən son texnologiyaları tətbiq edərək, davamlı materiallarla gələcəyin şəhərlərini qururuq."
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

/* ================= VALUE CARD COMPONENT (RESPONSIVE) ================= */
function ValueCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Card className="group border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[20px] md:rounded-[32px] overflow-hidden bg-white h-full">
      <CardContent className="p-6 sm:p-8 md:p-10 text-center flex flex-col items-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-50 rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center p-3 sm:p-4 md:p-5 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 mb-4 sm:mb-6 md:mb-8">
          {icon}
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-slate-900">{title}</h3>
        <p className="text-slate-500 leading-relaxed text-xs sm:text-sm md:text-base">{text}</p>
      </CardContent>
    </Card>
  );
}
import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Award, Heart, ShieldCheck, Star, Users } from "lucide-react";
import heroImage from "@assets/generated_images/close_up_of_hand_reading_braille.png";

export default function About() {
  return (
    <Layout>
      {/* ================= HERO SECTION (Modern Gradient) ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-600 to-blue-800 py-24 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-blue-100 uppercase bg-blue-500/30 rounded-full border border-blue-400/30 backdrop-blur-md">
            Bizim Missiyamız
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight">
            Toxunuşla Gələn <span className="text-blue-200">Müstəqillik</span>
          </h1>
          <p className="text-xl text-blue-50 leading-relaxed font-light opacity-90">
            Taktil.az olaraq görmə imkanlarından asılı olmayaraq, hər bir fərdin mühiti 
            tam maneəsiz və təhlükəsiz şəkildə qavraması üçün innovativ həllər təqdim edirik.
          </p>
        </div>
      </section>

      {/* ================= STORY SECTION (Clean White) ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* IMAGE WITH PRO SHADOW */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-blue-100/50 rounded-[40px] transform -rotate-2 transition group-hover:rotate-0 duration-500" />
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={heroImage}
                  alt="Taktil.az workshop"
                  className="w-full h-full object-cover transition transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-blue-50 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-600 rounded-lg text-white">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Sertifikatlı</p>
                    <p className="text-lg font-bold text-slate-900">Beynəlxalq Standart</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TEXT CONTENT */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-blue-600 font-bold tracking-widest uppercase text-sm">
                <span className="w-8 h-px bg-blue-600"></span> Hekayəmiz
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                2018-ci ildən Bəri Maneəsiz <br /> Bir Azərbaycan Üçün
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Taktil.az-ın təməli Azərbaycanda görmə məhdudiyyətli şəxslər üçün 
                  dünya standartlarına uyğun maneəsiz mühit yaratmaq məqsədilə qoyulub.
                </p>
                <p>
                  Bizim üçün əlçatanlıq yalnız qanuni tələb deyil, həm də sosial məsuliyyətdir. 
                  Dizayn və funksionallığı birləşdirərək, estetik cəhətdən gözəl və texniki 
                  cəhətdən qüsursuz taktil həllər hazırlayırıq.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div>
                    <h4 className="text-3xl font-bold text-blue-600">500+</h4>
                    <p className="text-sm text-slate-500 uppercase tracking-wide">Tamamlanmış Layihə</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-blue-600">100%</h4>
                    <p className="text-sm text-slate-500 uppercase tracking-wide">Standartlara Uyğunluq</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES SECTION (Soft Blue/Grey) ================= */}
      <section className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Dəyərlərimiz</h2>
            <p className="text-lg text-slate-600">
              Bizim işimizdə kiçik bir səhv, yanlış istiqamət deməkdir. Buna görə də hər detala həssaslıqla yanaşırıq.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Target className="h-8 w-8" />}
              title="Dəqiqlik"
              text="Brail əlifbasından tutmuş taktil yer örtüklərinə qədər hər şey millimetrik dəqiqliklə hesablanır."
            />
            <ValueCard
              icon={<Heart className="h-8 w-8" />}
              title="İnsan Mərkəzli"
              text="Həllərimizi birbaşa istifadəçilərin ehtiyaclarını dinləyərək və onları anlayaraq formalaşdırırıq."
            />
            <ValueCard
              icon={<Star className="h-8 w-8" />}
              title="İnnovasiya"
              text="Ən son texnologiyaları tətbiq edərək, davamlı və müasir materiallarla gələcəyin şəhərlərini qururuq."
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

/* ================= VALUE CARD COMPONENT ================= */
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
    <Card className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden bg-white">
      <CardContent className="p-10 text-center">
        <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-8 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-4 text-slate-900">{title}</h3>
        <p className="text-slate-500 leading-relaxed text-base">{text}</p>
      </CardContent>
    </Card>
  );
}
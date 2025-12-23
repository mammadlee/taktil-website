import Layout from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { CheckCircle, Award, Users, Play, Pause, Volume2, VolumeX, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/close_up_of_hand_reading_braille.png";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.6);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = videoWrapperRef.current;
    if (!video || !wrapper) return;

    video.muted = muted;
    video.volume = volume;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [muted, volume]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.paused ? (video.play(), setIsPlaying(true)) : (video.pause(), setIsPlaying(false));
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  // ✅ STRUCTURED DATA for Home Page
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Taktil.az",
    "url": "https://taktil.az",
    "description": "Azərbaycanda əlçatanlıq həlləri - Taktil döşəmələr, Braille lövhələr və görməyə məhdudiyyəti olan şəxslər üçün innovativ məhsullar",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://taktil.az/products?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Layout>
      <SEO
        title="Ana Səhifə - Əlçatan Həllər və Taktil Sistemlər"
        description="Taktil.az - Azərbaycanda görməyə məhdudiyyəti olan şəxslər üçün beynəlxalq standartlara uyğun taktil döşəmələr, braille informasiya lövhələri və əlçatanlıq həlləri təqdim edirik."
        keywords="taktil döşəmə, braille lövhələr, əlçatanlıq həlləri, görməyə məhdudiyyət, Azərbaycan, taktil sistemlər, əlçatan mühit"
        ogImage="/logo.png"
        structuredData={homeStructuredData}
      />

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-blue-50/50 rounded-l-[100px] hidden lg:block" />
        <div className="absolute top-[10%] left-[5%] -z-10 w-72 h-72 bg-blue-200/30 blur-[120px] rounded-full" />
        
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                Azərbaycanda Əlçatanlıq Lideri
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
                Həyatlara <span className="text-blue-600 italic font-serif">toxunuruq</span>, dünyanı əlçatan edirik.
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                Görmə məhdudiyyətli insanlar üçün beynəlxalq standartlara uyğun taktil həllər və maneəsiz mühit layihələri təqdim edirik.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="h-16 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-lg shadow-xl shadow-blue-200 transition-all hover:-translate-y-1">
                    Məhsulları kəşf et <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-2 hover:bg-slate-50 text-lg transition-all">
                    Pulsuz Konsultasiya
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-blue-300 rounded-[40px] opacity-10 blur-2xl group-hover:opacity-20 transition duration-500" />
              <div className="relative rounded-[40px] overflow-hidden border-8 border-white shadow-2xl transform lg:rotate-2 group-hover:rotate-0 transition duration-500">
                <img
                  src={heroImage}
                  alt="Braille əlifbası ilə oxuma - Taktil sistemlər"
                  className="w-full aspect-[4/5] object-cover scale-105 group-hover:scale-100 transition duration-700"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Niyə Taktil.az?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Biz sadəcə məhsul satmırıq, biz hər kəsin bərabər hüquqlu hərəkət edə biləcəyi gələcəyi inşa edirik.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8" />}
              title="Layihələndirmə və Mühəndislik"
              text="Əməkdaşlarımız beynəlxalq standartlar əsasında prosesindən əvvəlindən etibarən yerində baxış keçirərək uyğun layihə hazırlayır, icrasına buna uyğun davam edirlər."
            />
            <FeatureCard
              icon={<Award className="w-8 h-8" />}
              title="Yüksək Keyfiyyət"
              text="Ən müasir texnologiyalar və uzunömürlü, sertifikatlı materiallarla zəmanətli icra."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Əlçatan mühit"
              text="Məkanın hər kəs üçün bərabər və maneəsiz istifadəsini təmin edən qlobal həllər."
            />
          </div>
        </div>
      </section>

      {/* ================= VIDEO EXPERIENCE ================= */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div
                ref={videoWrapperRef}
                className="relative rounded-[32px] overflow-hidden shadow-2xl bg-black aspect-video group"
              >
                <video
                  ref={videoRef}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  aria-label="Taktil sistemlərin quraşdırılması haqqında video"
                >
                  <source src="/video/intro.mp4" type="video/mp4" />
                  Brauzeriniz video formatını dəstəkləmir.
                </video>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-300" />
                
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button 
                    onClick={togglePlay} 
                    className="bg-white/20 backdrop-blur-md text-white p-4 rounded-2xl hover:bg-white/30 transition"
                    aria-label={isPlaying ? "Videonu dayandır" : "Videonu oynat"}
                  >
                    {isPlaying ? <Pause /> : <Play />}
                  </button>
                  <button 
                    onClick={toggleMute} 
                    className="bg-white/20 backdrop-blur-md text-white p-4 rounded-2xl hover:bg-white/30 transition"
                    aria-label={muted ? "Səsi aç" : "Səsi bağla"}
                  >
                    {muted ? <VolumeX /> : <Volume2 />}
                  </button>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-4xl font-bold text-slate-900 leading-tight">
                Əlçatanlıq necə işləyir? <br />
                <span className="text-blue-600">Video bələdçimizə baxın.</span>
              </h2>
              <div className="space-y-4">
                {[
                  "İstiqamətləndirici taktil plitələr",
                  "Braille informasiya lövhələri",
                  "Standartlara tam uyğun quraşdırma",
                  "İstifadəçi təhlükəsizliyi testi"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-lg text-slate-700">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-blue-600 rounded-[48px] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <h2 className="text-3xl md:text-5xl font-bold mb-8 max-w-3xl mx-auto leading-tight">
              Məkanınızı hər kəs üçün əlçatan etməyə hazırsınız?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-xl mx-auto font-light">
              Mütəxəssis rəyi və pulsuz layihələndirmə üçün bizimlə əlaqə saxlayın.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 h-16 px-12 rounded-2xl text-lg font-bold shadow-lg transition-transform hover:-translate-y-1">
                Təklif Alın
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FeatureCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="group bg-white rounded-[32px] p-10 shadow-sm border border-slate-50 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500">
      <div className="w-16 h-16 mb-8 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 rotate-3 group-hover:rotate-0">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-slate-900">{title}</h3>
      <p className="text-slate-500 text-lg leading-relaxed">{text}</p>
    </div>
  );
}
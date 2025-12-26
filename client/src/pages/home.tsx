import Layout from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { CheckCircle, Award, Users, Play, Pause, Volume2, VolumeX, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
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
      { threshold: 0.5 } // Slightly lowered for better mobile trigger
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [muted, volume]);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    const video = videoRef.current;
    if (!video) return;
    video.paused ? (video.play(), setIsPlaying(true)) : (video.pause(), setIsPlaying(false));
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

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

      {/* HERO SECTION */}
      <section className="relative min-h-[auto] lg:min-h-[80vh] flex items-center pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
        {/* Background Decorations - Adjusted for Mobile */}
        <div className="absolute top-0 right-0 -z-10 w-full lg:w-1/2 h-full bg-blue-50/50 rounded-b-[40px] lg:rounded-b-none lg:rounded-l-[80px]" />
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* TEXT CONTENT */}
            <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 border border-blue-200 text-blue-700 text-xs md:text-sm font-bold mx-auto lg:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                Azərbaycan İnklüziv Mühit Lideri
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
                Həyatlara <span className="text-blue-600 italic font-serif">toxunuruq</span>, dünyanı əlçatan edirik.
              </h1>

              <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Görmə məhdudiyyətli insanlar üçün beynəlxalq standartlara uyğun taktil həllər və maneəsiz mühit layihələri təqdim edirik.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                <Link href="/products" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full h-12 md:h-14 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-base shadow-lg shadow-blue-200 transition-all active:scale-95">
                    Məhsulları kəşf et <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full h-12 md:h-14 px-8 rounded-xl border-2 hover:bg-slate-50 text-base active:scale-95">
                    Pulsuz Konsultasiya
                  </Button>
                </Link>
              </div>
            </div>

            {/* HERO IMAGE */}
            <div className="relative group order-1 lg:order-2 px-4 sm:px-10 lg:px-0">
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-blue-300 rounded-[32px] opacity-15 blur-2xl" />
              <div className="relative rounded-[32px] overflow-hidden border-4 border-white shadow-2xl transform lg:rotate-2 transition duration-500">
                <img
                  src="/braille.png"
                  alt="Braille əlifbası ilə oxuma"
                  className="w-full aspect-[4/3] lg:aspect-square object-cover scale-105"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">Niyə Taktil.az?</h2>
            <p className="text-slate-600 text-base md:text-lg">
              Biz hər kəsin bərabər hüquqlu hərəkət edə biləcəyi maneəsiz gələcəyi inşa edirik.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <FeatureCard
              icon={<ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />}
              title="Layihələndirmə"
              text="Beynəlxalq standartlar əsasında yerində baxış keçirərək peşəkar layihə hazırlayırıq."
            />
            <FeatureCard
              icon={<Award className="w-6 h-6 md:w-8 md:h-8" />}
              title="Yüksək Keyfiyyət"
              text="Ən müasir texnologiyalar və uzunömürlü, sertifikatlı materiallarla zəmanətli icra."
            />
            <FeatureCard
              icon={<Users className="w-6 h-6 md:w-8 md:h-8" />}
              title="Əlçatan Mühit"
              text="Məkanın hər kəs üçün bərabər və maneəsiz istifadəsini təmin edən qlobal həllər."
            />
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black group" ref={videoWrapperRef}>
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/video/intro.mp4" type="video/mp4" />
              </video>
              
              {/* Mobile Friendly Controls */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="flex gap-4">
                  <button onClick={togglePlay} className="p-4 bg-white/20 backdrop-blur-xl rounded-full text-white hover:bg-white/40 transition">
                    {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                  </button>
                  <button onClick={toggleMute} className="p-4 bg-white/20 backdrop-blur-xl rounded-full text-white hover:bg-white/40 transition">
                    {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                İnkluziv cəmiyyətə inteqrasiya necə işləyir? <br className="hidden md:block" />
                <span className="text-blue-600">Video bələdçimizə baxın.</span>
              </h2>
              <div className="grid gap-4">
                {[
                  "İstiqamətləndirici taktil plitələr",
                  "Braille informasiya lövhələri",
                  "Standartlara tam uyğun quraşdırma",
                  "İstifadəçi təhlükəsizliyi testi"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-blue-600 rounded-[32px] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">Məkanınızı hər kəs üçün əlçatan etməyə hazırsınız?</h2>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">Mütəxəssis rəyi və pulsuz layihələndirmə üçün bizimlə əlaqə saxlayın.</p>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 h-14 px-10 rounded-xl text-lg font-bold transition-transform active:scale-95">
                  Təklif Alın
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FeatureCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="bg-slate-50 p-8 rounded-3xl border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-xl transition-all duration-300">
      <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{text}</p>
    </div>
  );
}
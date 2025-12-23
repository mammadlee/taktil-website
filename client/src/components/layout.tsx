import { Link, useLocation } from "wouter";
import { useAccessibility } from "@/hooks/use-accessibility";
import {
  Eye,
  Menu,
  MessageCircle,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  ArrowUpRight,
  Accessibility
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { toggleHighContrast, toggleLargeText } = useAccessibility();

  const navLinks = [
    { href: "/", label: "Ana səhifə" },
    { href: "/products", label: "Məhsullar" },
    { href: "/gallery", label: "Qalereya" },
    { href: "/about", label: "Haqqımızda" },
    { href: "/contact", label: "Əlaqə" },
  ];

  const isActive = (path: string) => location === path;

  // ✅ GLOBAL STRUCTURED DATA (Organization Schema)
  useEffect(() => {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Taktil.az",
      "url": "https://taktil.az",
      "logo": "https://taktil.az/logo.png",
      "description": "Azərbaycanda görməyə məhdudiyyəti olan şəxslər üçün taktil həllər və əlçatan mühit yaratmaq üzrə lider şirkət",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rəşid Behbudov 44, Chinar Plaza",
        "addressLocality": "Bakı",
        "addressCountry": "AZ"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+994-50-212-91-44",
        "contactType": "Müştəri Xidmətləri",
        "email": "info@taktil.az",
        "availableLanguage": ["az", "en", "ru"]
      },
      "sameAs": [
        "https://www.instagram.com/taktil.az",
        "https://www.linkedin.com/company/taktil-az",
        "https://www.facebook.com/taktil.az"
      ]
    };

    let script = document.getElementById('organization-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'organization-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(organizationSchema);

    return () => {
      const s = document.getElementById('organization-schema');
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-blue-600 selection:text-white">
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:p-4 focus:bg-blue-600 focus:text-white rounded-xl shadow-2xl"
      >
        Məzmuna keçid
      </a>

      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-slate-100/50" />
        
        <div className="container mx-auto px-6 h-20 relative flex items-center justify-between">
          
          {/* LOGO AREA */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-10 h-10 md:w-14 md:h-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <img
                src="/logo.png"
                alt="Taktil.az - Əlçatan həllər və taktil sistemlər"
                className="relative z-10 w-full h-full object-contain"
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 leading-none">
                Taktil<span className="text-blue-600">.az</span>
              </span>
              <span className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                Əlçatan Həllər
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center bg-slate-50/50 p-1.5 rounded-2xl border border-slate-100" aria-label="Əsas naviqasiya">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  isActive(link.href) ? "text-blue-600" : "text-slate-500 hover:text-slate-900"
                }`}>
                  {isActive(link.href) && (
                    <motion.div 
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white shadow-sm rounded-xl border border-slate-100"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </div>
              </Link>
            ))}
          </nav>

          {/* RIGHT TOOLS */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-2xl border-slate-200 hover:bg-blue-50 hover:text-blue-600 transition-all" aria-label="Əlçatanlıq parametrləri">
                  <Accessibility className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-3 rounded-2xl shadow-2xl border-slate-100">
                <DropdownMenuLabel className="text-xs font-black uppercase tracking-widest text-slate-400 pb-3">Əlçatanlıq</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleHighContrast} className="rounded-xl py-3 cursor-pointer focus:bg-blue-50">
                  <Eye className="mr-3 h-4 w-4 text-blue-600" />
                  <span className="font-bold">Yüksək Kontrast</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleLargeText} className="rounded-xl py-3 cursor-pointer focus:bg-blue-50">
                  <span className="mr-3 font-black text-blue-600">A+</span>
                  <span className="font-bold">Böyük Mətn</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/contact" className="hidden lg:block">
              <Button className="rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-bold px-6 transition-all group">
                Layihə Başla
                <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </Link>

            {/* MOBILE MENU */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden rounded-xl bg-slate-50" aria-label="Menyu">
                  <Menu className="h-6 w-6 text-slate-900" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] rounded-l-[2.5rem] border-none p-0">
                <div className="flex flex-col h-full bg-white p-8">
                  <div className="mb-12 font-black text-2xl tracking-tighter">Menyu</div>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <span className={`text-3xl font-black tracking-tighter hover:text-blue-600 transition-colors ${isActive(link.href) ? "text-blue-600" : "text-slate-900"}`}>
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto pt-10 border-t border-slate-100">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Bizimlə əlaqə</p>
                    <p className="text-lg font-bold text-slate-900">+994 50 212 91 44</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main id="main-content" className="flex-1 pt-20">
        {children}
      </main>

      {/* FLOATING ASSISTANT */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button className="rounded-[2rem] h-16 w-16 bg-blue-600 hover:bg-blue-700 shadow-[0_20px_40px_rgba(37,99,235,0.4)] border-4 border-white" aria-label="Onlayn dəstək">
            <MessageCircle className="h-8 w-8 text-white" />
          </Button>
        </motion.div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 text-white rounded-t-[3rem] md:rounded-t-[5rem] overflow-hidden pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 mb-20">
            <div className="lg:col-span-5 space-y-8">
              <Link href="/" className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                  <span className="text-slate-950 font-black text-2xl">T</span>
                </div>
                <span className="text-3xl font-black tracking-tighter">Taktil.az</span>
              </Link>
              <p className="text-xl text-slate-400 font-light leading-relaxed max-w-md">
                Hər toxunuşda və hər addımda dünyanı daha əlçatan etmək üçün innovativ həllər təqdim edirik.
              </p>
              <div className="flex gap-4">
                <SocialLink icon={<Instagram />} href="https://instagram.com/taktil.az" label="Instagram" />
                <SocialLink icon={<Linkedin />} href="https://linkedin.com/company/taktil-az" label="LinkedIn" />
                <SocialLink icon={<Facebook />} href="https://facebook.com/taktil.az" label="Facebook" />
              </div>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 mb-8">Naviqasiya</h4>
              <ul className="space-y-4">
                {navLinks.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-lg font-medium text-slate-300 hover:text-white transition-colors flex items-center group">
                      {link.label}
                      <ArrowUpRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 mb-8">Mərkəz Ofis</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-blue-500"><Phone className="w-5 h-5" /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Telefon</p>
                    <a href="tel:+994502129144" className="text-lg font-bold hover:text-blue-400 transition-colors">+994 50 212 91 44</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-blue-500"><Mail className="w-5 h-5" /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">E-poçt</p>
                    <a href="mailto:info@taktil.az" className="text-lg font-bold hover:text-blue-400 transition-colors">info@taktil.az</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 font-medium text-sm">
              © {new Date().getFullYear()} Taktil.az. Müəllif hüquqları qorunur.
            </p>
            <div className="flex gap-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Gizlilik Siyasəti</a>
              <a href="#" className="hover:text-white transition-colors">Şərtlər</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SocialLink({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
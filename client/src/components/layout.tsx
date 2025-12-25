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
  Accessibility,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { toggleHighContrast, toggleLargeText } = useAccessibility();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Ana səhifə" },
    { href: "/products", label: "Məhsullar" },
    { href: "/gallery", label: "Qalereya" },
    { href: "/about", label: "Haqqımızda" },
    { href: "/contact", label: "Əlaqə" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-blue-600 selection:text-white">
      {/* Skip link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:p-4 focus:bg-blue-600 focus:text-white rounded-xl shadow-2xl">
        Məzmuna keçid
      </a>

      {/* ================= HEADER ================= */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
        <div className={`absolute inset-0 bg-white/80 backdrop-blur-lg border-b border-slate-100/50 transition-opacity ${scrolled ? "opacity-100" : "opacity-0 md:opacity-100"}`} />
        
        <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 relative flex items-center justify-between">
          
          {/* LOGO AREA */}
          <Link href="/" className="flex items-center gap-2 md:gap-4 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img src="/logo.png" alt="Taktil.az" className="relative z-10 w-full h-full object-contain" loading="eager" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg md:text-2xl font-black tracking-tighter text-slate-900 leading-none">
                Taktil<span className="text-blue-600">.az</span>
              </span>
              <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Əlçatan Həllər
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center bg-slate-50/80 p-1 rounded-2xl border border-slate-100" aria-label="Əsas naviqasiya">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div className={`relative px-5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  isActive(link.href) ? "text-blue-600" : "text-slate-500 hover:text-slate-900"
                }`}>
                  {isActive(link.href) && (
                    <motion.div layoutId="nav-pill" className="absolute inset-0 bg-white shadow-sm rounded-xl border border-slate-100" transition={{ type: "spring", duration: 0.5 }} />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </div>
              </Link>
            ))}
          </nav>

          {/* RIGHT TOOLS */}
          <div className="flex items-center gap-2 md:gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="w-10 h-10 md:w-11 md:h-11 rounded-xl border-slate-200" aria-label="Əlçatanlıq">
                  <Accessibility className="h-5 w-5 text-slate-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-2xl border-slate-100 bg-white">
                <DropdownMenuLabel className="text-[10px] font-black uppercase text-slate-400 p-2">Parametrlər</DropdownMenuLabel>
                <DropdownMenuItem onClick={toggleHighContrast} className="rounded-xl py-3 cursor-pointer focus:bg-blue-50">
                  <Eye className="mr-3 h-4 w-4 text-blue-600" /> <span className="font-bold">Kontrast</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleLargeText} className="rounded-xl py-3 cursor-pointer focus:bg-blue-50">
                  <span className="mr-3 font-black text-blue-600 text-xs">A+</span> <span className="font-bold">Böyük Mətn</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/contact" className="hidden lg:block">
              <Button className="rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold h-11 px-6 transition-all group">
                Layihə Başla <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </Link>

            {/* MOBILE MENU TRIGGER */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden w-10 h-10 rounded-xl bg-slate-100" aria-label="Menyu">
                  <Menu className="h-6 w-6 text-slate-900" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[350px] p-0 border-none bg-white">
                <div className="flex flex-col h-full">
                  <div className="p-6 flex justify-between items-center border-b border-slate-50">
                    <span className="text-lg font-black tracking-tighter uppercase text-slate-400">Menyu</span>
                    <SheetClose className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-900">
                      <X className="w-5 h-5" />
                    </SheetClose>
                  </div>
                  <nav className="flex flex-col p-6 gap-1">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <SheetClose asChild>
                          <span className={`block py-4 text-xl font-bold tracking-tight transition-colors ${
                            isActive(link.href) ? "text-blue-600" : "text-slate-900"
                          }`}>
                            {link.label}
                          </span>
                        </SheetClose>
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto p-8 bg-slate-50 rounded-t-[2.5rem]">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Bizimlə əlaqə</p>
                    <a href="tel:+994502129144" className="text-lg font-black text-slate-900 block mb-1">
                      +994 50 212 91 44
                    </a>
                    <a href="mailto:info@taktil.az" className="text-sm text-slate-500 font-medium underline underline-offset-4">
                      info@taktil.az
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main id="main-content" className="flex-1 pt-16 md:pt-20">
        {children}
      </main>

      {/* FLOATING ACTION BUTTON */}
      <div className="fixed bottom-6 right-6 z-40 md:bottom-10 md:right-10">
        <motion.a
          href="https://wa.me/994502129144"
          target="_blank"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl shadow-blue-500/40 ring-4 ring-white"
        >
          <MessageCircle className="h-7 w-7 md:h-8 md:w-8" />
        </motion.a>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 text-white rounded-t-[2.5rem] md:rounded-t-[5rem] overflow-hidden pt-16 md:pt-24 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-16 mb-16">
            <div className="lg:col-span-5 space-y-6 md:space-y-8 text-left">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center">
                  <span className="text-slate-950 font-black text-xl md:text-2xl">T</span>
                </div>
                <span className="text-2xl md:text-3xl font-black tracking-tighter">Taktil.az</span>
              </Link>
              <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed max-w-sm">
                Maneəsiz həyat üçün innovativ taktil həllər və əlçatan mühit dizaynı.
              </p>
              <div className="flex gap-3">
                <SocialLink icon={<Instagram size={20} />} href="https://instagram.com/taktil.az" label="Instagram" />
                <SocialLink icon={<Linkedin size={20} />} href="https://linkedin.com/company/taktil-az" label="LinkedIn" />
                <SocialLink icon={<Facebook size={20} />} href="https://facebook.com/taktil.az" label="Facebook" />
              </div>
            </div>

            <div className="lg:col-span-3 text-left">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-6 md:mb-8">Menyu</h4>
              <ul className="grid grid-cols-2 sm:grid-cols-1 gap-4">
                {navLinks.map(link => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <span className="text-sm md:text-base font-medium text-slate-300 hover:text-white transition-colors flex items-center group cursor-pointer">
                        {link.label}
                        <ArrowUpRight className="ml-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all hidden md:block" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4 text-left">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-6 md:mb-8">Əlaqə</h4>
              <div className="space-y-5">
                <FooterContactItem icon={<Phone size={18} />} title="Telefon" content="+994 50 212 91 44" href="tel:+994502129144" />
                <FooterContactItem icon={<Mail size={18} />} title="Email" content="info@taktil.az" href="mailto:info@taktil.az" />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-slate-500 font-medium text-[11px] md:text-xs">
              © {new Date().getFullYear()} Taktil.az. Müəllif hüquqları qorunur. <br className="md:hidden" />
              <span className="text-slate-700 ml-1">POWERED BY M2TECH</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function SocialLink({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all" aria-label={label}>
      {icon}
    </a>
  );
}

function FooterContactItem({ icon, title, content, href }: { icon: React.ReactNode, title: string, content: string, href: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-2.5 rounded-lg bg-white/5 text-blue-500 border border-white/10">{icon}</div>
      <div>
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">{title}</p>
        <a href={href} className="text-sm md:text-base font-bold hover:text-blue-400 transition-colors">{content}</a>
      </div>
    </div>
  );
}
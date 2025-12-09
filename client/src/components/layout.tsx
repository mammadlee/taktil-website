import { Link, useLocation } from "wouter";
import { useAccessibility } from "@/hooks/use-accessibility";
import { 
  Eye, 
  Type, 
  Menu, 
  Phone, 
  MapPin, 
  Mail, 
  Facebook, 
  Twitter, 
  Linkedin,
  MessageCircle,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { highContrast, largeText, toggleHighContrast, toggleLargeText } = useAccessibility();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Skip to content for screen readers */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-background focus:text-foreground focus:border focus:border-primary">
        Skip to main content
      </a>

      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-sm hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> 1-800-TACTILE</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@tactileone.com</span>
          </div>
          <div className="flex gap-4">
            <span aria-hidden="true">Accessibility First Design</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-heading font-bold tracking-tight text-primary flex items-center gap-2">
            <span className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground">
              <span className="text-xl">⠞</span>
            </span>
            TactileOne
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-base font-medium transition-colors hover:text-primary ${isActive(link.href) ? 'text-primary font-bold decoration-2 underline-offset-4 underline' : 'text-muted-foreground'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Accessibility Tools */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full" aria-label="Accessibility Options">
                  <Eye className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2">
                <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">Accessibility Tools</div>
                <DropdownMenuItem onClick={toggleHighContrast} className="cursor-pointer flex items-center justify-between p-3 focus:bg-accent">
                  <span className="flex items-center gap-2">
                    <Eye className="h-4 w-4" /> High Contrast
                  </span>
                  <div className={`w-8 h-4 rounded-full relative transition-colors ${highContrast ? 'bg-primary' : 'bg-muted'}`}>
                    <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all shadow-sm ${highContrast ? 'left-4.5' : 'left-0.5'}`} />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleLargeText} className="cursor-pointer flex items-center justify-between p-3 focus:bg-accent">
                  <span className="flex items-center gap-2">
                    <Type className="h-4 w-4" /> Larger Text
                  </span>
                  <div className={`w-8 h-4 rounded-full relative transition-colors ${largeText ? 'bg-primary' : 'bg-muted'}`}>
                    <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all shadow-sm ${largeText ? 'left-4.5' : 'left-0.5'}`} />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      className={`text-xl font-medium ${isActive(link.href) ? 'text-primary' : 'text-foreground'}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="h-px bg-border my-2" />
                  <Button variant="outline" className="justify-start gap-2" onClick={toggleHighContrast}>
                    <Eye className="h-4 w-4" /> Toggle High Contrast
                  </Button>
                  <Button variant="outline" className="justify-start gap-2" onClick={toggleLargeText}>
                    <Type className="h-4 w-4" /> Toggle Large Text
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Chatbot Mockup */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="lg" className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground" aria-label="Open AI Assistant">
          <MessageCircle className="h-7 w-7" />
        </Button>
      </div>

      {/* Footer */}
      <footer className="bg-muted text-muted-foreground pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-foreground font-heading font-bold text-xl mb-4">TactileOne</h3>
              <p className="mb-4">Making the world accessible, one touch at a time.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
                <a href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-foreground font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/products" className="hover:underline">All Products</Link></li>
                <li><Link href="/categories" className="hover:underline">Categories</Link></li>
                <li><Link href="/about" className="hover:underline">About Us</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-foreground font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Accessibility Statement</a></li>
                <li><a href="#" className="hover:underline">Installation Guides</a></li>
                <li><a href="#" className="hover:underline">Shipping & Returns</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-foreground font-bold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
                  <span>123 Access Way, Suite 100<br />Innovation City, ST 12345</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-5 w-5 shrink-0" />
                  <span>1-800-TACTILE</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-5 w-5 shrink-0" />
                  <span>info@tactileone.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-muted-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; {new Date().getFullYear()} TactileOne. All rights reserved.</p>
            <Link href="/admin" className="flex items-center gap-1 hover:text-foreground transition-colors">
              <Lock className="h-3 w-3" /> Admin Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

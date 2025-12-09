import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { categories, partners } from "@/lib/data";
import { ArrowRight, CheckCircle, Award, Users, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/close_up_of_hand_reading_braille.png";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-background py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl animate-in slide-in-from-left duration-700">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6 text-foreground">
                Touching Lives, <br />
                <span className="text-primary">Navigating Worlds.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
                We create high-quality tactile maps, braille signage, and accessibility tools that empower visually impaired individuals to navigate the world with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="text-lg px-8 h-14 rounded-full">
                    View Products
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-lg px-8 h-14 rounded-full border-2">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-in slide-in-from-right duration-700 delay-200">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
                <img 
                  src={heroImage} 
                  alt="Close up of fingers reading braille dots on a modern sign" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative circle */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary rounded-full -z-10 opacity-50 blur-2xl" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary rounded-full -z-10 opacity-20 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Highlight */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive accessibility products designed for public spaces, educational institutions, and private facilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((category, idx) => (
              <Link key={category.id} href={`/categories`}>
                <a className="group block h-full">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img 
                        src={category.image} 
                        alt={`${category.name} example`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{category.name}</h3>
                      <p className="text-muted-foreground mb-4">{category.description}</p>
                      <span className="inline-flex items-center text-primary font-medium group-hover:underline decoration-2 underline-offset-4">
                        Explore Category <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Why Choose TactileOne?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We combine accessibility standards with modern design to create products that are both functional and aesthetically pleasing.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">ADA & ISO Compliant</h3>
                    <p className="text-muted-foreground">All our products meet strict international accessibility standards.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Premium Durability</h3>
                    <p className="text-muted-foreground">Materials tested to withstand heavy traffic and environmental factors.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">User-Centric Design</h3>
                    <p className="text-muted-foreground">Developed in collaboration with visually impaired user groups.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary/30 rounded-3xl p-8 md:p-12">
              <div className="bg-card rounded-xl p-8 shadow-lg">
                <ShieldCheck className="h-12 w-12 text-primary mb-6" />
                <blockquote className="text-xl font-medium leading-relaxed mb-6">
                  "The tactile maps provided by TactileOne have completely transformed how our blind students navigate the campus. The quality and detail are unmatched."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full overflow-hidden">
                    {/* Avatar placeholder */}
                    <div className="w-full h-full bg-gray-300" />
                  </div>
                  <div>
                    <div className="font-bold">Sarah Jenkins</div>
                    <div className="text-sm text-muted-foreground">Accessibility Director, State University</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Slider */}
      <section className="py-16 border-t bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-8">Trusted by Organizations Worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {partners.map((partner, idx) => (
              <div key={idx} className="flex items-center gap-2 group cursor-default">
                 {/* Placeholder Logo */}
                <div className="w-10 h-10 rounded bg-foreground/10 group-hover:bg-primary/20 transition-colors" />
                <span className="text-lg font-bold group-hover:text-primary transition-colors">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ready to make your space accessible?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Contact our team for a free consultation and quote for your accessibility project.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8 h-14 rounded-full font-bold text-primary">
              Get a Quote
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

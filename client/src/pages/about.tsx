import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Target, Award, Heart } from "lucide-react";
import heroImage from "@assets/generated_images/close_up_of_hand_reading_braille.png";

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Mission */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8">Empowering Independence Through Touch</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            At TactileOne, our mission is simple yet profound: to create a world where information and environments are accessible to everyone, regardless of visual ability. We believe that independence is a fundamental right, and our products are the tools that help secure it.
          </p>
        </div>

        {/* History/Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl bg-muted">
               <img src={heroImage} alt="Our workshop" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-lg text-muted-foreground">
              Founded in 2010 by a team of industrial designers and accessibility advocates, TactileOne began in a small workshop with a single 3D printer and a vision.
            </p>
            <p className="text-lg text-muted-foreground">
              We recognized a gap in the market: accessibility products were often functional but poorly designed, or well-designed but not truly compliant. We set out to bridge this gap.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, we are a leading provider of tactile solutions, serving universities, government buildings, and transit systems across the country.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="bg-secondary/20 border-none">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6 text-primary shadow-sm">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Precision</h3>
              <p className="text-muted-foreground">
                Every dot, every line, and every texture is engineered with millimeter precision to ensure readability and compliance.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-secondary/20 border-none">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6 text-primary shadow-sm">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Empathy</h3>
              <p className="text-muted-foreground">
                We design with the user, not just for them. Our testing process involves continuous feedback from the visually impaired community.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-secondary/20 border-none">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6 text-primary shadow-sm">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality</h3>
              <p className="text-muted-foreground">
                We use premium, durable materials that stand the test of time, ensuring accessibility features remain functional for years.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

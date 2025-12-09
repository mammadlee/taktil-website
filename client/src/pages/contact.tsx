import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();

  const onSubmit = (data: any) => {
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });
    reset();
  };

  return (
    <Layout>
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question about our products or need a custom quote? We're here to help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Our accessibility experts are available to discuss your specific needs and help you find the right solutions for your facility.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Phone</h3>
                    <p className="text-muted-foreground">1-800-TACTILE</p>
                    <p className="text-sm text-muted-foreground">(1-800-822-8453)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@tactileone.com</p>
                    <p className="text-sm text-muted-foreground">sales@tactileone.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Address</h3>
                    <p className="text-muted-foreground">123 Access Way, Suite 100</p>
                    <p className="text-muted-foreground">Innovation City, ST 12345</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Hours</h3>
                    <p className="text-muted-foreground">Mon-Fri: 9am - 6pm EST</p>
                    <p className="text-muted-foreground">Sat-Sun: Closed</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted p-6 rounded-lg border">
              <h3 className="font-bold mb-2">Accessibility Statement</h3>
              <p className="text-sm text-muted-foreground">
                TactileOne is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 rounded-2xl shadow-lg border">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" {...register("name")} placeholder="Jane Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" {...register("phone")} placeholder="(555) 123-4567" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...register("email")} placeholder="jane@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" {...register("subject")} placeholder="Product Inquiry" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  {...register("message")} 
                  placeholder="How can we help you?" 
                  className="min-h-[150px]" 
                  required 
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Map Embed Mockup */}
      <div className="h-96 bg-muted relative w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
           <span className="text-muted-foreground font-bold text-xl flex items-center gap-2">
             <MapPin className="h-6 w-6" /> Google Maps Embed Placeholder
           </span>
        </div>
      </div>
    </Layout>
  );
}

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, ShieldCheck, Eye, EyeOff, ArrowRight, Fingerprint } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { login } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";


export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      toast({
        title: "Giriş təsdiqləndi",
        description: "Admin panelinə yönləndirilirsiniz...",
      });
      setLocation("/admin/dashboard");
    } catch (error: any) {
      toast({
        title: "Giriş rədd edildi",
        description: error.message || "İstifadəçi adı və ya şifrə yanlışdır",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="relative min-h-[85vh] flex items-center justify-center py-12 px-4 overflow-hidden">
        {/* ================= BACKGROUND ELEMENTS ================= */}
        <div className="absolute inset-0 bg-[#FDFDFD] -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.03)_0%,transparent_70%)] -z-10" />
        
        {/* Dekorativ həndəsi formalar */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-96 h-96 border border-blue-50 rounded-full opacity-50" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -left-24 w-80 h-80 border border-slate-100 rounded-[3rem] opacity-50" 
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[440px]"
        >
          <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] bg-white/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
            {/* Üst dekorativ xətt */}
            <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
            
            <CardHeader className="text-center pt-10 pb-6 space-y-4">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, delay: 0.2 }}
                className="mx-auto w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center relative"
              >
                <div className="absolute inset-0 bg-blue-100 rounded-[2rem] animate-ping opacity-20" />
                <Fingerprint className="h-10 w-10 text-blue-600 relative z-10" />
              </motion.div>
              
              <div className="space-y-2">
                <CardTitle className="text-3xl font-black text-slate-900 tracking-tighter">
                  Sistemə <span className="text-blue-600">Giriş</span>
                </CardTitle>
                <CardDescription className="text-slate-500 font-medium">
                  Taktil.az İdarəetmə Paneli (v2.0)
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="px-10 pb-12">
              <form onSubmit={handleLogin} className="space-y-6">
                {/* İstifadəçi Adı */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-1">
                    Admin İdentifikatoru
                  </Label>
                  <div className="relative group">
                    <Input 
                      id="username" 
                      type="text" 
                      placeholder="İstifadəçi adı" 
                      required 
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all pl-4 text-lg"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center text-slate-300 group-focus-within:text-blue-600 transition-colors">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Şifrə */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-1">
                    Təhlükəsizlik Şifrəsi
                  </Label>
                  <div className="relative group">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      required 
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all pl-4 pr-12 text-lg tracking-widest"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Giriş Düyməsi */}
                <Button 
                  type="submit" 
                  className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100 group transition-all" 
                  disabled={loading}
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="flex items-center gap-2"
                      >
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Doğrulanır...
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="ready"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="flex items-center gap-2 text-lg font-bold"
                      >
                        Sistemə daxil ol
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </form>

              {/* Alt Bilgi */}
              <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                  <Lock className="w-3 h-3" /> 256-bit SSL Təhlükəsizlik
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="mt-8 text-center text-sm font-medium text-slate-400">
            Şifrənizi unutmusunuzsa, <a href="mailto:it@taktil.az" className="text-blue-600 hover:underline">Sistem Admini</a> ilə əlaqə saxlayın.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
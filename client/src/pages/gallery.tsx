import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useGallery } from "@/lib/hooks";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, ChevronRight, ImageIcon, Layers, Share2, Download, X } from "lucide-react";
import Layout from "@/components/layout";

export default function Gallery() {
  const { data = [], isLoading } = useGallery();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="relative flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border-t-4 border-b-4 border-blue-600 rounded-full" 
          />
          <ImageIcon className="absolute w-8 h-8 text-blue-600 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white relative overflow-hidden">
        
        {/* ================= DYNAMIC BACKGROUND ELEMENTS ================= */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated Mesh Gradients */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -left-[10%] w-[700px] h-[700px] bg-blue-100/40 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -60, 0],
              y: [0, -40, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px]" 
          />
          {/* Subtle Texture Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-[0.05]" />
        </div>

        {/* ================= HEADER SECTION ================= */}
        <section className="relative pt-24 pb-12">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-xs font-bold text-blue-600/60 uppercase tracking-[0.3em] mb-8"
            >
              <Link href="/" className="hover:text-blue-600 transition-colors">Ana Səhifə</Link>
              <ChevronRight className="w-3 h-3" />
              <span>Arxiv</span>
            </motion.div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-100"
                >
                  <Layers className="w-3.5 h-3.5" /> Eksklüziv Portfoliomuz
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85]"
                >
                  Foto <br /> <span className="text-blue-600">Arxivimiz</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-slate-500 max-w-xl leading-relaxed font-light"
                >
                  Həyata keçirdiyimiz hər bir layihə əlçatanlıq və estetikanın 
                  mükəmməl vəhdətidir.
                </motion.p>
              </div>

              {/* Minimalist Counter Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group hidden lg:block"
              >
                <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[3rem] shadow-2xl flex items-center gap-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="block text-4xl font-black text-slate-900 tracking-tight">{data.length}+</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vizual Nümunə</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= MASONRY GRID SECTION ================= */}
        <section className="pb-32 relative pt-10">
          <div className="container mx-auto px-6">
            <motion.div 
              layout
              className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10"
            >
              {data.map((item: any, idx: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative break-inside-avoid group rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.2)] hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden" onClick={() => setActiveImage(item.image)}>
                    <img
                      src={item.image}
                      alt="Project"
                      className="w-full h-auto object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                    />
                    
                    {/* High-End Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/60 via-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute top-6 right-6 flex flex-col gap-3 transform translate-x-10 group-hover:translate-x-0 transition-transform duration-500">
                        <button className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white hover:text-blue-600 transition-all">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center text-blue-600 cursor-pointer"
                        >
                          <Maximize2 className="w-8 h-8" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Info Bar */}
                  <div className="p-8 bg-white/50 backdrop-blur-md flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Layihə Detalı</p>
                      <h3 className="text-lg font-bold text-slate-800 tracking-tight">Taktil İnteqrasiya</h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                       <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= PRO LIGHTBOX ================= */}
        <Dialog open={!!activeImage} onOpenChange={() => setActiveImage(null)}>
          <DialogContent className="max-w-none w-screen h-screen p-0 bg-slate-950/95 backdrop-blur-2xl border-none shadow-none focus:outline-none flex items-center justify-center overflow-hidden">
            <DialogTitle className="sr-only">Vizual Baxış</DialogTitle>
            
            <button 
              onClick={() => setActiveImage(null)}
              className="absolute top-8 right-8 z-[100] p-4 bg-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <AnimatePresence mode="wait">
              {activeImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="relative w-full h-full flex flex-col items-center justify-center p-6"
                >
                  <img
                    src={activeImage}
                    alt="Full View"
                    className="max-w-[90%] max-h-[75vh] object-contain rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10"
                  />
                  
                  {/* Bottom Controls Bar */}
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 flex items-center gap-6 px-10 py-5 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem]"
                  >
                    <div className="text-left pr-8 border-r border-white/10">
                      <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Taktil.az Arxiv</p>
                      <p className="text-white font-medium">Professional İcrası</p>
                    </div>
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 transition-all">
                         Paylaş <Share2 className="w-4 h-4" />
                      </button>
                      <a 
                        href={activeImage} 
                        download 
                        className="p-3 bg-white/10 text-white rounded-2xl border border-white/10 hover:bg-white hover:text-black transition-all"
                      >
                        <Download className="w-5 h-5" />
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
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
            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border-t-4 border-b-4 border-blue-600 rounded-full" 
          />
          <ImageIcon className="absolute w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-blue-600 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white relative overflow-hidden">
        
        {/* ================= BACKGROUND ELEMENTS (RESPONSIVE) ================= */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, 20, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -left-[10%] w-[400px] h-[400px] md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px] bg-blue-100/30 md:bg-blue-100/40 rounded-full blur-[80px] md:blur-[100px] lg:blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[10%] -right-[10%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-blue-50 rounded-full blur-[70px] md:blur-[90px] lg:blur-[100px]" 
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-[0.03] md:opacity-[0.05]" />
        </div>

        {/* ================= HEADER SECTION (RESPONSIVE) ================= */}
        <section className="relative pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-10 lg:pb-12">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-blue-600/60 uppercase tracking-[0.2em] md:tracking-[0.3em] mb-6 md:mb-8"
            >
              <Link href="/" className="hover:text-blue-600 transition-colors">Ana Səhifə</Link>
              <ChevronRight className="w-3 h-3" />
              <span>Arxiv</span>
            </motion.div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8 lg:gap-10">
              <div className="space-y-3 md:space-y-4 lg:space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-blue-50 text-blue-700 text-[10px] md:text-xs font-black uppercase tracking-wider border border-blue-100"
                >
                  <Layers className="w-3 h-3 md:w-3.5 md:h-3.5" /> Ekskl üziv Portfoliomuz
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85]"
                >
                  Foto <br /> <span className="text-blue-600">Arxivimiz</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm md:text-base lg:text-xl text-slate-500 max-w-xl leading-relaxed font-light"
                >
                  Həyata keçirdiyimiz hər bir layihə əlçatanlıq və estetikanın 
                  mükəmməl vəhdətidir.
                </motion.p>
              </div>

              {/* Counter Card - responsive, hidden on small mobile */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group hidden sm:flex"
              >
                <div className="absolute inset-0 bg-blue-600 blur-xl md:blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-white/80 backdrop-blur-xl border border-white p-5 md:p-6 lg:p-8 rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem] shadow-xl md:shadow-2xl flex items-center gap-4 md:gap-5 lg:gap-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <ImageIcon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                  </div>
                  <div>
                    <span className="block text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">{data.length}+</span>
                    <span className="text-[9px] md:text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest">Vizual Nümunə</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= MASONRY GRID (RESPONSIVE) ================= */}
        <section className="pb-16 md:pb-24 lg:pb-32 relative pt-6 md:pt-8 lg:pt-10">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              layout
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 lg:gap-10 space-y-4 md:space-y-6 lg:space-y-10"
            >
              {data.map((item: any, idx: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative break-inside-avoid group rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 transition-all duration-700 hover:shadow-lg md:hover:shadow-xl lg:hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.2)] hover:-translate-y-1 md:hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden" onClick={() => setActiveImage(item.image)}>
                    <img
                      src={item.image}
                      alt="Project"
                      className="w-full h-auto object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 cursor-pointer"
                    />
                    
                    {/* Hover Overlay - responsive */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/60 via-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute top-3 right-3 md:top-4 md:right-4 lg:top-6 lg:right-6 flex flex-col gap-2 md:gap-3 transform translate-x-10 group-hover:translate-x-0 transition-transform duration-500">
                        <button className="p-2 md:p-3 lg:p-4 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white hover:text-blue-600 transition-all">
                          <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white shadow-2xl flex items-center justify-center text-blue-600 cursor-pointer"
                        >
                          <Maximize2 className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Info Bar - responsive */}
                  <div className="p-4 md:p-6 lg:p-8 bg-white/50 backdrop-blur-md flex justify-between items-center">
                    <div className="space-y-0.5 md:space-y-1">
                      <p className="text-[9px] md:text-[10px] font-black text-blue-600 uppercase tracking-widest">Layihə Detalı</p>
                      <h3 className="text-sm md:text-base lg:text-lg font-bold text-slate-800 tracking-tight">Taktil İnteqrasiya</h3>
                    </div>
                    <div className="w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg md:rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                       <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= LIGHTBOX (RESPONSIVE) ================= */}
        <Dialog open={!!activeImage} onOpenChange={() => setActiveImage(null)}>
          <DialogContent className="max-w-none w-screen h-screen p-0 bg-slate-950/95 backdrop-blur-2xl border-none shadow-none focus:outline-none flex items-center justify-center overflow-hidden">
            <DialogTitle className="sr-only">Vizual Baxış</DialogTitle>
            
            <button 
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 z-[100] p-2 md:p-3 lg:p-4 bg-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <AnimatePresence mode="wait">
              {activeImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-6"
                >
                  <img
                    src={activeImage}
                    alt="Full View"
                    className="max-w-[95%] md:max-w-[90%] max-h-[70vh] md:max-h-[75vh] object-contain rounded-2xl md:rounded-3xl shadow-[0_30px_60px_-10px_rgba(0,0,0,0.5)] md:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10"
                  />
                  
                  {/* Bottom Controls - responsive */}
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 md:mt-10 lg:mt-12 flex flex-col sm:flex-row items-center gap-4 md:gap-6 px-5 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[2.5rem]"
                  >
                    <div className="text-center sm:text-left sm:pr-6 md:pr-8 sm:border-r border-white/10">
                      <p className="text-[9px] md:text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-0.5 md:mb-1">Taktil.az Arxiv</p>
                      <p className="text-sm md:text-base text-white font-medium">Professional İcrasıı</p>
                    </div>
                    <div className="flex gap-3 md:gap-4">
                      <button className="flex items-center gap-2 px-4 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 bg-blue-600 text-white rounded-xl md:rounded-2xl text-sm md:text-base font-bold hover:bg-blue-500 transition-all">
                         Paylaş <Share2 className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                      <a 
                        href={activeImage} 
                        download 
                        className="p-2 md:p-2.5 lg:p-3 bg-white/10 text-white rounded-xl md:rounded-2xl border border-white/10 hover:bg-white hover:text-black transition-all"
                      >
                        <Download className="w-4 h-4 md:w-5 md:h-5" />
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
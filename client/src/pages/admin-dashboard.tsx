import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGallery } from "@/lib/hooks";
import { createGallery, deleteGallery } from "@/lib/adminApi";
import { motion, AnimatePresence } from "framer-motion";

import type { Product, ContactSubmission } from "@shared/schema";
import { getCurrentUser, logout } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

import { 
  LayoutDashboard, 
  Package, 
  Trash2, 
  Plus, 
  Image as ImageIcon, 
  LogOut, 
  MessageSquare, 
  Search, 
  ExternalLink,
  Edit3,
  Calendar,
  User,
  UploadCloud,
  CheckCircle2
} from "lucide-react";

/* =========================
   HELPERS & API
========================= */
async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    let msg = `Request failed: ${res.status}`;
    try {
      const data = await res.json();
      msg = data?.message || msg;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

async function signUpload() {
  return fetchJSON<{
    timestamp: number;
    signature: string;
    cloudName: string;
    apiKey: string;
    folder: string;
  }>("/api/uploads/sign", { method: "POST" });
}

async function uploadToCloudinary(file: File): Promise<string> {
  const sign = await signUpload();
  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sign.apiKey);
  form.append("timestamp", String(sign.timestamp));
  form.append("signature", sign.signature);
  form.append("folder", sign.folder);

  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`, {
    method: "POST",
    body: form,
  });

  if (!uploadRes.ok) throw new Error("Cloudinary upload failed");
  const uploaded = await uploadRes.json();
  return uploaded.secure_url;
}

/* =========================
   PRODUCT DIALOG (PRO)
========================= */
export function ProductDialog({ open, onOpenChange, initial, onSubmit, isSaving }: any) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setName(initial?.name ?? "");
    setCategory(initial?.category ?? "");
    setDescription(initial?.description ?? "");
    setImage(initial?.image ?? "");
    setUploading(false);
  }, [initial, open]);

  const canSubmit = !!name.trim() && !!category.trim() && !!image.trim() && !uploading && !isSaving;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden">
        <div className="h-2 w-full bg-blue-600" />
        <div className="p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-black tracking-tight">
              {initial?.mode === "create" ? "Yeni Məhsul" : "Məhsulu Redaktə Et"}
            </DialogTitle>
            <DialogDescription>Məhsul məlumatlarını daxil edin və yadda saxlayın.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Məhsul Adı</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl bg-slate-50 border-none h-12" placeholder="Məs: Taktil Döşəmə" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Kateqoriya</label>
                <Input value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-xl bg-slate-50 border-none h-12" placeholder="Məs: Sənaye" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Məhsul Şəkli</label>
              <div className="flex items-center gap-4 p-4 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
                {image ? (
                  <img src={image} className="w-20 h-20 rounded-xl object-cover shadow-md" />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400"><ImageIcon /></div>
                )}
                <div className="flex-1">
                  <Button asChild variant="outline" className="rounded-lg h-9" disabled={uploading}>
                    <label className="cursor-pointer">
                      {uploading ? "Yüklənir..." : "Şəkil Seç"}
                      <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploading(true);
                        try { const url = await uploadToCloudinary(file); setImage(url); }
                        catch { alert("Yükləmə xətası"); }
                        finally { setUploading(false); }
                      }} />
                    </label>
                  </Button>
                  <p className="text-[10px] text-slate-400 mt-2 italic">PNG, JPG formatları tövsiyə olunur.</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Təsvir</label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="rounded-xl bg-slate-50 border-none min-h-[100px]" placeholder="Məhsul haqqında qısa məlumat..." />
            </div>
          </div>

          <DialogFooter className="mt-8 gap-3">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl">Ləğv et</Button>
            <Button disabled={!canSubmit} className="rounded-xl bg-blue-600 px-8" onClick={() => onSubmit({
              mode: initial.mode, id: initial.id, name, category, description, image
            })}>
              {isSaving ? "Yadda saxlanılır..." : "Yadda Saxla"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* =========================
   MAIN ADMIN DASHBOARD
========================= */
export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = useState("products");

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });

  useEffect(() => {
    if (!userLoading && !user) setLocation("/admin");
  }, [user, userLoading, setLocation]);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => fetchJSON<Product[]>("/api/products"),
  });

  const { data: submissions = [], isLoading: submissionsLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["contactSubmissions"],
    queryFn: () => fetchJSON<ContactSubmission[]>("/api/contact"),
  });

  const { data: gallery = [], isLoading: galleryLoading } = useGallery();

  // Mutations
  const createProductMut = useMutation({
    mutationFn: (payload: any) => fetchJSON("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["products"] }); setProductDialogOpen(false); toast({ title: "Uğurlu", description: "Məhsul əlavə edildi" }); },
  });

  const updateProductMut = useMutation({
    mutationFn: ({ id, data }: any) => fetchJSON(`/api/products/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["products"] }); setProductDialogOpen(false); toast({ title: "Yeniləndi", description: "Məhsul məlumatları dəyişdirildi" }); },
  });

  const deleteProductMut = useMutation({
    mutationFn: (id: number) => fetchJSON(`/api/products/${id}`, { method: "DELETE" }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["products"] }); toast({ title: "Silindi", description: "Məhsul sistemdən silindi" }); },
  });

  const addGalleryMut = useMutation({
    mutationFn: (image: string) => createGallery({ image }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["gallery"] }); toast({ title: "Əlavə edildi" }); },
  });

  const deleteGalleryMut = useMutation({
    mutationFn: (id: number) => deleteGallery(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["gallery"] }); toast({ title: "Şəkil silindi" }); },
  });

  // Dialog States
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [productDialogInitial, setProductDialogInitial] = useState<any>({ mode: "create" });
  const [confirmDelete, setConfirmDelete] = useState({ open: false, title: "", description: "", onConfirm: () => {} });

  const handleLogout = async () => {
    await logout();
    toast({ title: "Çıxış edildi" });
    setLocation("/admin");
  };

  if (userLoading) return <div className="h-screen flex items-center justify-center bg-slate-50 font-bold text-slate-400">Yüklənir...</div>;
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* SIDEBAR */}
      <aside className="w-72 bg-slate-900 text-white hidden lg:flex flex-col sticky top-0 h-screen shadow-2xl">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10 group cursor-pointer" onClick={() => setLocation("/")}>
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl italic group-hover:rotate-6 transition-transform">T</div>
            <span className="text-xl font-black tracking-tighter uppercase">Taktil Admin</span>
          </div>
          
          <nav className="space-y-2">
            {[
              { id: "products", label: "Məhsullar", icon: Package },
              { id: "gallery", label: "Qalereya", icon: ImageIcon },
              { id: "contact", label: "Mesajlar", icon: MessageSquare },
            ].map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "text-slate-400 hover:bg-slate-800"
                }`}>
                <item.icon className="w-5 h-5" />
                <span className="font-bold text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-2xl mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold uppercase">{user.username[0]}</div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold truncate">{user.username}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Sistem Admini</span>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Çıxış
          </Button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-4 lg:p-10 max-w-[1400px] mx-auto w-full">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">İdarəetmə Paneli</h2>
            <p className="text-slate-500 font-medium">Sistemə tam nəzarət buradadır.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="rounded-xl border-slate-200 bg-white" asChild>
                <a href="/" target="_blank"><ExternalLink className="w-4 h-4 mr-2" /> Saytı gör</a>
             </Button>
             <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100 px-6" onClick={() => {
                setProductDialogInitial({ mode: "create" });
                setProductDialogOpen(true);
             }}>
                <Plus className="w-4 h-4 mr-2" /> Yeni Məhsul
             </Button>
          </div>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard title="Məhsullar" value={products.length} icon={Package} color="blue" />
          <StatCard title="Yeni Mesajlar" value={submissions.length} icon={MessageSquare} color="orange" />
          <StatCard title="Qalereya" value={gallery.length} icon={ImageIcon} color="purple" />
        </div>

        {/* CONTENT */}
        <AnimatePresence mode="wait">
          {activeTab === "products" && (
            <motion.div key="p" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden bg-white">
                <CardHeader className="border-b border-slate-50 px-8 py-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <CardTitle className="text-xl font-black">Məhsul Bazası</CardTitle>
                    <div className="relative w-full md:w-72">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input placeholder="Məhsul axtar..." className="pl-10 rounded-xl bg-slate-50 border-none h-11" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                        <tr>
                          <th className="px-8 py-5">Məhsul Məlumatı</th>
                          <th className="px-4 py-5">Kateqoriya</th>
                          <th className="px-8 py-5 text-right">İdarəetmə</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {products.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-8 py-4">
                              <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                                  <img src={p.image} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <p className="font-bold text-slate-900 leading-tight">{p.name}</p>
                                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 max-w-[200px]">{p.description}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-none rounded-lg px-3 py-1 font-bold text-[10px] uppercase">
                                {p.category}
                              </Badge>
                            </td>
                            <td className="px-8 py-4 text-right">
                              <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="icon" variant="ghost" className="rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50" onClick={() => {
                                  setProductDialogInitial({ ...p, mode: "edit" });
                                  setProductDialogOpen(true);
                                }}>
                                  <Edit3 className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => setConfirmDelete({
                                  open: true, title: "Məhsulu sil?", description: `"${p.name}" birdəfəlik silinəcək.`, onConfirm: () => deleteProductMut.mutate(p.id)
                                })}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "gallery" && (
             <motion.div key="g" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {gallery.map((item) => (
                  <div key={item.id} className="relative aspect-square rounded-[2rem] overflow-hidden border-4 border-white shadow-xl group hover:scale-[1.02] transition-transform cursor-zoom-in">
                    <img src={item.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                       <Button variant="destructive" size="icon" className="rounded-2xl w-12 h-12 shadow-2xl" onClick={() => deleteGalleryMut.mutate(item.id)}>
                         <Trash2 className="w-5 h-5" />
                       </Button>
                    </div>
                  </div>
                ))}
                <label className="aspect-square rounded-[2rem] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:bg-white hover:border-blue-400 hover:text-blue-500 transition-all cursor-pointer group">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-blue-50 transition-colors">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">Yüklə</span>
                  <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const url = await uploadToCloudinary(file);
                    addGalleryMut.mutate(url);
                  }} />
                </label>
             </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {submissions.map((s) => (
                <Card key={s.id} className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] p-8 bg-white group hover:shadow-2xl transition-all">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500"><User className="w-6 h-6"/></div>
                        <div>
                           <h4 className="font-black text-xl text-slate-900 tracking-tight">{s.name}</h4>
                           <p className="text-sm font-bold text-blue-600">{s.email} <span className="text-slate-300 mx-2">|</span> {s.phone}</p>
                        </div>
                      </div>
                      <div className="bg-slate-50/80 p-6 rounded-[2rem] text-sm text-slate-600 leading-relaxed font-medium border border-slate-100 relative">
                        <div className="absolute -top-3 left-6 px-3 bg-white border border-slate-100 rounded-full text-[10px] font-black uppercase text-slate-400">Mesaj</div>
                        "{s.message}"
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between min-w-[180px]">
                      <Badge className="bg-slate-900 text-white border-none rounded-xl px-4 py-1.5 font-bold text-[10px] tracking-widest uppercase">{s.subject || "Ümumi"}</Badge>
                      <div className="flex items-center text-[11px] font-black text-slate-300 uppercase tracking-[0.2em]">
                        <Calendar className="w-3.5 h-3.5 mr-2" /> {new Date(s.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* DIALOGS */}
      <ProductDialog 
        open={productDialogOpen} 
        onOpenChange={setProductDialogOpen} 
        initial={productDialogInitial}
        isSaving={createProductMut.isPending || updateProductMut.isPending}
        onSubmit={(payload: any) => {
          const data = { name: payload.name, category: payload.category, description: payload.description, image: payload.image };
          if (payload.mode === "create") createProductMut.mutate(data);
          else updateProductMut.mutate({ id: payload.id, data });
        }}
      />

      <AlertDialog open={confirmDelete.open} onOpenChange={(v) => setConfirmDelete((prev) => ({ ...prev, open: v }))}>
        <AlertDialogContent className="rounded-[2rem] border-none p-8">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-black">Əminsiniz?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 font-medium">{confirmDelete.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 gap-2">
            <AlertDialogCancel className="rounded-xl border-none bg-slate-100 font-bold">Ləğv et</AlertDialogCancel>
            <AlertDialogAction className="rounded-xl bg-red-500 hover:bg-red-600 font-bold px-8" onClick={confirmDelete.onConfirm}>Bəli, Sil</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/* =========================
   UI SUB-COMPONENTS
========================= */
function StatCard({ title, value, icon: Icon, color }: any) {
  const themes: any = {
    blue: "text-blue-600 bg-blue-50 shadow-blue-100",
    orange: "text-orange-600 bg-orange-50 shadow-orange-100",
    purple: "text-purple-600 bg-purple-50 shadow-purple-100",
  };

  return (
    <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] p-8 bg-white relative overflow-hidden group">
      <div className={`absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700`}>
        <Icon className="w-32 h-32 rotate-12" />
      </div>
      <div className="flex items-center gap-5 relative z-10">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${themes[color]}`}>
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</p>
          <h3 className="text-4xl font-black text-slate-900 tracking-tighter mt-1">{value}</h3>
        </div>
      </div>
    </Card>
  );
}
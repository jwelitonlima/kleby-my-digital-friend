import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { useSiteContent, useUpdateSiteContent, useUploadSiteImage, useSiteImages } from "@/hooks/use-site-content";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, LogOut, Upload, Plus, Trash2, KeyRound, Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Password validation ── */
const PASSWORD_RULES = {
  minLength: 8,
  hasNumber: /\d/,
  hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
};

function validatePassword(pw: string) {
  return {
    minLength: pw.length >= PASSWORD_RULES.minLength,
    hasNumber: PASSWORD_RULES.hasNumber.test(pw),
    hasSpecial: PASSWORD_RULES.hasSpecial.test(pw),
    isValid: pw.length >= PASSWORD_RULES.minLength && PASSWORD_RULES.hasNumber.test(pw) && PASSWORD_RULES.hasSpecial.test(pw),
  };
}

/* ── Types ── */
type FieldDef = { key: string; label: string; type: "text" | "textarea" };
type GroupDef = { label: string; keys: FieldDef[] };
type JsonArrayGroupDef = { label: string; key: string; fields: { name: string; label: string }[] };

/* ── Simple text fields by page ── */
const contentGroups: GroupDef[] = [
  {
    label: "Hero (Home)",
    keys: [
      { key: "hero_label", label: "Label (topo)", type: "text" },
      { key: "hero_line1", label: "Linha 1", type: "text" },
      { key: "hero_line2", label: "Linha 2", type: "text" },
      { key: "hero_line3", label: "Linha 3 (destaque)", type: "text" },
      { key: "hero_subtitle", label: "Subtítulo", type: "text" },
      { key: "hero_cta", label: "Botão principal", type: "text" },
      { key: "hero_cta2", label: "Botão secundário", type: "text" },
    ],
  },
  {
    label: "Método (Home)",
    keys: [
      { key: "metodo_label", label: "Label da seção", type: "text" },
      { key: "metodo_title", label: "Título", type: "text" },
      { key: "metodo_subtitle", label: "Subtítulo", type: "textarea" },
    ],
  },
  {
    label: "Áreas de Atuação (Home)",
    keys: [
      { key: "areas_label", label: "Label", type: "text" },
      { key: "areas_title", label: "Título", type: "text" },
      { key: "areas_subtitle", label: "Subtítulo", type: "text" },
    ],
  },
  {
    label: "Resultados (Home)",
    keys: [
      { key: "resultados_label", label: "Label", type: "text" },
      { key: "resultados_title", label: "Título", type: "text" },
    ],
  },
  {
    label: "CTA Final",
    keys: [
      { key: "cta_title", label: "Título", type: "text" },
      { key: "cta_subtitle", label: "Subtítulo", type: "text" },
    ],
  },
  {
    label: "Sobre",
    keys: [
      { key: "sobre_bio_1", label: "Parágrafo 1", type: "textarea" },
      { key: "sobre_bio_2", label: "Parágrafo 2", type: "textarea" },
      { key: "sobre_bio_3", label: "Parágrafo 3", type: "textarea" },
    ],
  },
  {
    label: "Serviços (Textos)",
    keys: [
      { key: "servicos_label", label: "Label", type: "text" },
      { key: "servicos_title", label: "Título", type: "text" },
      { key: "servicos_subtitle", label: "Subtítulo", type: "text" },
    ],
  },
  {
    label: "Resultados (Página)",
    keys: [
      { key: "resultados_page_label", label: "Label", type: "text" },
      { key: "resultados_page_title", label: "Título", type: "text" },
      { key: "resultados_page_subtitle", label: "Subtítulo", type: "text" },
    ],
  },
  {
    label: "Planos (Textos)",
    keys: [
      { key: "planos_label", label: "Label", type: "text" },
      { key: "planos_title", label: "Título", type: "text" },
      { key: "planos_subtitle", label: "Subtítulo", type: "text" },
      { key: "planos_note", label: "Nota de rodapé", type: "text" },
    ],
  },
  {
    label: "Contato",
    keys: [
      { key: "whatsapp_number", label: "Número WhatsApp (com DDI)", type: "text" },
      { key: "whatsapp_message", label: "Mensagem padrão WhatsApp", type: "textarea" },
      { key: "instagram_link", label: "Link Instagram", type: "text" },
      { key: "instagram_handle", label: "@ Instagram", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "cref", label: "CREF", type: "text" },
      { key: "contato_local", label: "Local de atendimento", type: "text" },
    ],
  },
  {
    label: "Footer",
    keys: [
      { key: "footer_desc", label: "Descrição do footer", type: "text" },
    ],
  },
];

/* ── JSON array definitions ── */
const jsonArrayGroups: JsonArrayGroupDef[] = [
  { label: "Etapas do Método (Home)", key: "metodo_steps", fields: [{ name: "num", label: "Número" }, { name: "title", label: "Título" }, { name: "desc", label: "Descrição" }] },
  { label: "Áreas de Atuação (Home)", key: "areas_list", fields: [{ name: "title", label: "Título" }, { name: "desc", label: "Descrição" }, { name: "msg", label: "Mensagem WhatsApp" }] },
  { label: "Estatísticas (Home)", key: "resultados_stats", fields: [{ name: "label", label: "Label" }, { name: "valor", label: "Valor" }, { name: "sub", label: "Subtexto" }] },
  { label: "Depoimentos (Home)", key: "depoimentos_home", fields: [{ name: "nome", label: "Nome" }, { name: "texto", label: "Texto" }] },
  { label: "Formações (Sobre)", key: "sobre_formacoes", fields: [{ name: "value", label: "Formação" }] },
  { label: "Pilares (Sobre)", key: "sobre_pilares", fields: [{ name: "title", label: "Título" }, { name: "desc", label: "Descrição" }] },
  { label: "Lista de Serviços", key: "servicos_list", fields: [{ name: "title", label: "Título" }, { name: "desc", label: "Descrição" }, { name: "msg", label: "Mensagem WhatsApp" }] },
  { label: "Métricas (Resultados)", key: "resultados_metricas", fields: [{ name: "label", label: "Label" }, { name: "valor", label: "Valor" }] },
  { label: "Depoimentos (Resultados)", key: "resultados_depoimentos", fields: [{ name: "nome", label: "Nome" }, { name: "texto", label: "Texto" }, { name: "objetivo", label: "Objetivo" }] },
  { label: "Planos", key: "planos_list", fields: [{ name: "nome", label: "Nome" }, { name: "freq", label: "Frequência" }, { name: "msg", label: "Mensagem WhatsApp" }] },
  { label: "Features dos Planos", key: "planos_features", fields: [{ name: "value", label: "Feature" }] },
];

const imageSlots = [
  { key: "hero_photo", label: "Foto do Hero (desktop)" },
  { key: "logo_dark", label: "Logo (tema escuro)" },
  { key: "logo_light", label: "Logo (tema claro)" },
  { key: "sobre_photo", label: "Foto da página Sobre" },
  { key: "resultado_1", label: "Antes/Depois 1" },
  { key: "resultado_2", label: "Antes/Depois 2" },
  { key: "resultado_3", label: "Antes/Depois 3" },
];

/* ── Collapsible Section ── */
function CollapsibleSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border/40 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 active:bg-muted/50 transition-colors"
      >
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</span>
        {open ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
      </button>
      {open && <div className="p-4 space-y-3">{children}</div>}
    </div>
  );
}

/* ── Password Change Component ── */
function PasswordChange() {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const validation = validatePassword(newPw);
  const passwordsMatch = newPw === confirmPw && confirmPw.length > 0;

  const handleChange = async () => {
    if (!validation.isValid) {
      toast.error("A nova senha não atende aos requisitos");
      return;
    }
    if (!passwordsMatch) {
      toast.error("As senhas não coincidem");
      return;
    }
    setSaving(true);
    try {
      // Re-authenticate with current password first
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) throw new Error("Usuário não encontrado");

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPw,
      });
      if (signInError) {
        toast.error("Senha atual incorreta");
        setSaving(false);
        return;
      }

      const { error } = await supabase.auth.updateUser({ password: newPw });
      if (error) throw error;
      toast.success("Senha alterada com sucesso!");
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
    } catch (err: any) {
      toast.error(err?.message || "Erro ao alterar senha");
    } finally {
      setSaving(false);
    }
  };

  const ruleClass = (ok: boolean) =>
    cn("text-xs transition-colors", ok ? "text-primary" : "text-muted-foreground");

  return (
    <div className="space-y-4">
      {/* Current password */}
      <div className="space-y-1.5">
        <label className="text-xs text-muted-foreground">Senha atual</label>
        <div className="relative">
          <Input
            type={showCurrent ? "text" : "password"}
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
            placeholder="Digite sua senha atual"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {/* New password */}
      <div className="space-y-1.5">
        <label className="text-xs text-muted-foreground">Nova senha</label>
        <div className="relative">
          <Input
            type={showNew ? "text" : "password"}
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            placeholder="Digite a nova senha"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {newPw.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
            <span className={ruleClass(validation.minLength)}>
              {validation.minLength ? "✓" : "○"} 8+ caracteres
            </span>
            <span className={ruleClass(validation.hasNumber)}>
              {validation.hasNumber ? "✓" : "○"} Número
            </span>
            <span className={ruleClass(validation.hasSpecial)}>
              {validation.hasSpecial ? "✓" : "○"} Caractere especial
            </span>
          </div>
        )}
      </div>

      {/* Confirm password */}
      <div className="space-y-1.5">
        <label className="text-xs text-muted-foreground">Confirmar nova senha</label>
        <Input
          type="password"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          placeholder="Repita a nova senha"
        />
        {confirmPw.length > 0 && !passwordsMatch && (
          <span className="text-xs text-destructive">As senhas não coincidem</span>
        )}
      </div>

      <Button
        onClick={handleChange}
        disabled={saving || !validation.isValid || !passwordsMatch || !currentPw}
        className="w-full h-12 font-semibold rounded-xl"
      >
        {saving ? "Alterando..." : "Alterar senha"}
      </Button>
    </div>
  );
}

/* ── JSON Array Editor Component ── */
function JsonArrayEditor({ 
  group, value, onChange 
}: { 
  group: JsonArrayGroupDef; 
  value: string; 
  onChange: (val: string) => void;
}) {
  let items: any[] = [];
  try { items = JSON.parse(value || "[]"); } catch { items = []; }
  
  const isSimpleArray = group.fields.length === 1 && group.fields[0].name === "value";

  const updateItem = (index: number, field: string, val: string) => {
    const updated = [...items];
    if (isSimpleArray) {
      updated[index] = val;
    } else {
      updated[index] = { ...updated[index], [field]: val };
    }
    onChange(JSON.stringify(updated));
  };

  const addItem = () => {
    if (isSimpleArray) {
      onChange(JSON.stringify([...items, ""]));
    } else {
      const newItem: Record<string, string> = {};
      group.fields.forEach(f => { newItem[f.name] = ""; });
      onChange(JSON.stringify([...items, newItem]));
    }
  };

  const removeItem = (index: number) => {
    onChange(JSON.stringify(items.filter((_, i) => i !== index)));
  };

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border border-border/50 rounded-xl p-3 space-y-2 relative">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-semibold text-muted-foreground">#{i + 1}</span>
            <button onClick={() => removeItem(i)} className="p-2 -m-2 text-destructive/60 hover:text-destructive active:scale-95 transition-transform">
              <Trash2 size={14} />
            </button>
          </div>
          {isSimpleArray ? (
            <Input
              value={typeof item === 'string' ? item : ''}
              onChange={(e) => updateItem(i, "value", e.target.value)}
              placeholder={group.fields[0].label}
            />
          ) : (
            group.fields.map((field) => (
              <div key={field.name}>
                <label className="text-[10px] text-muted-foreground">{field.label}</label>
                <Input
                  value={item?.[field.name] ?? ""}
                  onChange={(e) => updateItem(i, field.name, e.target.value)}
                />
              </div>
            ))
          )}
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addItem} className="gap-1.5 w-full h-11 rounded-xl active:scale-[0.98] transition-transform">
        <Plus size={14} /> Adicionar item
      </Button>
    </div>
  );
}

/* ── Tab Button (mobile-optimized) ── */
function TabButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2.5 text-sm font-medium rounded-xl whitespace-nowrap transition-all active:scale-[0.97]",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-muted/50 text-muted-foreground hover:bg-muted"
      )}
    >
      {label}
    </button>
  );
}

/* ── Main Admin ── */
export default function Admin() {
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: content, isLoading } = useSiteContent();
  const { data: images } = useSiteImages();
  const updateContent = useUpdateSiteContent();
  const uploadImage = useUploadSiteImage();
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("textos");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [authLoading, user, isAdmin, navigate]);

  useEffect(() => {
    if (content) setEdits({ ...content });
  }, [content]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Carregando...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  const handleSave = async (key: string) => {
    if (edits[key] === content?.[key]) return;
    try {
      await updateContent.mutateAsync({ key, value: edits[key] });
      toast.success("Salvo!");
    } catch {
      toast.error("Erro ao salvar");
    }
  };

  const handleSaveAll = async () => {
    const changes = Object.entries(edits).filter(
      ([k, v]) => content?.[k] !== v
    );
    if (changes.length === 0) {
      toast.info("Nenhuma alteração");
      return;
    }
    try {
      await Promise.all(
        changes.map(([key, value]) => updateContent.mutateAsync({ key, value }))
      );
      toast.success(`${changes.length} campo(s) salvo(s)!`);
    } catch {
      toast.error("Erro ao salvar");
    }
  };

  const handleImageUpload = async (key: string, file: File) => {
    try {
      await uploadImage.mutateAsync({ key, file });
      toast.success("Imagem atualizada!");
    } catch {
      toast.error("Erro ao fazer upload");
    }
  };

  const tabs = [
    { id: "textos", label: "Textos" },
    { id: "listas", label: "Listas" },
    { id: "blog", label: "Blog" },
    { id: "imagens", label: "Imagens" },
    { id: "senha", label: "Senha" },
  ];

  return (
    <div className="min-h-screen pb-safe">
      {/* Sticky header */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-lg border-b border-border/40">
        <div className="container max-w-2xl">
          <div className="flex items-center justify-between py-3">
            <h1 className="text-lg font-bold">Painel</h1>
            <div className="flex gap-2">
              <Button onClick={handleSaveAll} size="sm" className="gap-1.5 h-9 rounded-xl text-xs active:scale-[0.97] transition-transform">
                <Save size={13} /> Salvar
              </Button>
              <Button variant="outline" size="sm" onClick={() => signOut()} className="gap-1.5 h-9 rounded-xl text-xs active:scale-[0.97] transition-transform">
                <LogOut size={13} />
              </Button>
            </div>
          </div>

          {/* Scrollable tab bar */}
          <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                label={tab.label}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container max-w-2xl py-6 space-y-4">
        {/* TEXTOS */}
        {activeTab === "textos" && (
          <div className="space-y-4">
            {contentGroups.map((group) => (
              <CollapsibleSection key={group.label} title={group.label}>
                {group.keys.map((field) => (
                  <div key={field.key} className="space-y-1.5">
                    <label className="text-xs text-muted-foreground">{field.label}</label>
                    {field.type === "textarea" ? (
                      <Textarea
                        value={edits[field.key] ?? ""}
                        onChange={(e) =>
                          setEdits((prev) => ({ ...prev, [field.key]: e.target.value }))
                        }
                        onBlur={() => handleSave(field.key)}
                        rows={3}
                      />
                    ) : (
                      <Input
                        value={edits[field.key] ?? ""}
                        onChange={(e) =>
                          setEdits((prev) => ({ ...prev, [field.key]: e.target.value }))
                        }
                        onBlur={() => handleSave(field.key)}
                      />
                    )}
                  </div>
                ))}
              </CollapsibleSection>
            ))}
          </div>
        )}

        {/* LISTAS */}
        {activeTab === "listas" && (
          <div className="space-y-4">
            {jsonArrayGroups.map((group) => (
              <CollapsibleSection key={group.key} title={group.label}>
                <JsonArrayEditor
                  group={group}
                  value={edits[group.key] ?? "[]"}
                  onChange={(val) => setEdits((prev) => ({ ...prev, [group.key]: val }))}
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSave(group.key)}
                  className="gap-1.5 w-full h-11 rounded-xl active:scale-[0.98] transition-transform"
                >
                  <Save size={13} /> Salvar {group.label}
                </Button>
              </CollapsibleSection>
            ))}
          </div>
        )}

        {/* BLOG */}
        {activeTab === "blog" && (
          <div className="space-y-4">
            <CollapsibleSection title="Artigos do Blog" defaultOpen>
              <BlogEditor
                value={edits["blog_posts"] ?? "[]"}
                onChange={(val) => setEdits((prev) => ({ ...prev, blog_posts: val }))}
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSave("blog_posts")}
                className="gap-1.5 w-full h-11 rounded-xl active:scale-[0.98] transition-transform"
              >
                <Save size={13} /> Salvar artigos
              </Button>
            </CollapsibleSection>
          </div>
        )}

        {/* IMAGENS */}
        {activeTab === "imagens" && (
          <div className="space-y-4">
            {imageSlots.map((slot) => (
              <div key={slot.key} className="border border-border/40 rounded-xl p-4 space-y-3">
                <label className="text-xs text-muted-foreground font-medium">{slot.label}</label>
                {images?.[slot.key] && (
                  <img
                    src={images[slot.key]}
                    alt={slot.label}
                    className="h-20 object-contain rounded-lg bg-muted p-2"
                  />
                )}
                <label className="flex items-center justify-center gap-2 cursor-pointer text-sm text-primary font-medium h-11 rounded-xl border border-primary/20 bg-primary/5 active:bg-primary/10 transition-colors">
                  <Upload size={14} />
                  Trocar imagem
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(slot.key, file);
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
        )}

        {/* SENHA */}
        {activeTab === "senha" && (
          <div className="space-y-4">
            <CollapsibleSection title="Alterar Senha" defaultOpen>
              <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                <KeyRound size={16} />
                <span className="text-xs">Mínimo 8 caracteres, com número e caractere especial</span>
              </div>
              <PasswordChange />
            </CollapsibleSection>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Blog Editor Component ── */
function BlogEditor({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  let posts: any[] = [];
  try { posts = JSON.parse(value || "[]"); } catch { posts = []; }

  const updatePost = (index: number, field: string, val: string) => {
    const updated = [...posts];
    updated[index] = { ...updated[index], [field]: val };
    if (field === "title") {
      updated[index].slug = val
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    onChange(JSON.stringify(updated));
  };

  const addPost = () => {
    onChange(JSON.stringify([...posts, { slug: "", title: "", resumo: "", categoria: "", data: new Date().toISOString().slice(0, 10), conteudo: "" }]));
  };

  const removePost = (index: number) => {
    onChange(JSON.stringify(posts.filter((_, i) => i !== index)));
  };

  return (
    <div className="space-y-4">
      {posts.map((post, i) => (
        <div key={i} className="border border-border/50 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Artigo #{i + 1}</span>
            <button onClick={() => removePost(i)} className="p-2 -m-2 text-destructive/60 hover:text-destructive active:scale-95 transition-transform">
              <Trash2 size={14} />
            </button>
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground">Título</label>
            <Input value={post.title ?? ""} onChange={(e) => updatePost(i, "title", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-muted-foreground">Categoria</label>
              <Input value={post.categoria ?? ""} onChange={(e) => updatePost(i, "categoria", e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground">Data</label>
              <Input type="date" value={post.data ?? ""} onChange={(e) => updatePost(i, "data", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground">Resumo</label>
            <Input value={post.resumo ?? ""} onChange={(e) => updatePost(i, "resumo", e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground">Conteúdo (Markdown)</label>
            <Textarea rows={5} value={post.conteudo ?? ""} onChange={(e) => updatePost(i, "conteudo", e.target.value)} />
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addPost} className="gap-1.5 w-full h-11 rounded-xl active:scale-[0.98] transition-transform">
        <Plus size={14} /> Novo artigo
      </Button>
    </div>
  );
}

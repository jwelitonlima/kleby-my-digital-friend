import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { useSiteContent, useUpdateSiteContent, useUploadSiteImage, useSiteImages } from "@/hooks/use-site-content";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, LogOut, Upload, Plus, Trash2 } from "lucide-react";

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
  
  // Handle simple string arrays (like formações, features)
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
        <div key={i} className="border border-border/50 rounded-lg p-3 space-y-2 relative">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-semibold text-muted-foreground">#{i + 1}</span>
            <button onClick={() => removeItem(i)} className="text-destructive/60 hover:text-destructive">
              <Trash2 size={12} />
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
      <Button variant="outline" size="sm" onClick={addItem} className="gap-1.5 w-full">
        <Plus size={12} /> Adicionar item
      </Button>
    </div>
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

  return (
    <div className="container max-w-2xl py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold">Painel Admin</h1>
        <div className="flex gap-2">
          <Button onClick={handleSaveAll} size="sm" className="gap-1.5">
            <Save size={14} /> Salvar tudo
          </Button>
          <Button variant="outline" size="sm" onClick={() => signOut()} className="gap-1.5">
            <LogOut size={14} /> Sair
          </Button>
        </div>
      </div>

      <Tabs defaultValue="textos">
        <TabsList className="mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger value="textos">Textos</TabsTrigger>
          <TabsTrigger value="listas">Listas</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="imagens">Imagens</TabsTrigger>
        </TabsList>

        {/* TEXTOS */}
        <TabsContent value="textos" className="space-y-8">
          {contentGroups.map((group) => (
            <div key={group.label} className="space-y-4">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {group.label}
              </h2>
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
            </div>
          ))}
        </TabsContent>

        {/* LISTAS (JSON arrays) */}
        <TabsContent value="listas" className="space-y-8">
          {jsonArrayGroups.map((group) => (
            <div key={group.key} className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {group.label}
              </h2>
              <JsonArrayEditor
                group={group}
                value={edits[group.key] ?? "[]"}
                onChange={(val) => setEdits((prev) => ({ ...prev, [group.key]: val }))}
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSave(group.key)}
                className="gap-1.5"
              >
                <Save size={12} /> Salvar {group.label}
              </Button>
            </div>
          ))}
        </TabsContent>

        {/* BLOG */}
        <TabsContent value="blog" className="space-y-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Artigos do Blog
          </h2>
          <BlogEditor
            value={edits["blog_posts"] ?? "[]"}
            onChange={(val) => setEdits((prev) => ({ ...prev, blog_posts: val }))}
          />
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleSave("blog_posts")}
            className="gap-1.5"
          >
            <Save size={12} /> Salvar artigos
          </Button>
        </TabsContent>

        {/* IMAGENS */}
        <TabsContent value="imagens" className="space-y-6">
          {imageSlots.map((slot) => (
            <div key={slot.key} className="space-y-2">
              <label className="text-xs text-muted-foreground">{slot.label}</label>
              {images?.[slot.key] && (
                <img
                  src={images[slot.key]}
                  alt={slot.label}
                  className="h-20 object-contain rounded bg-muted p-2"
                />
              )}
              <label className="flex items-center gap-2 cursor-pointer text-sm text-primary hover:underline">
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
        </TabsContent>
      </Tabs>
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
    // Auto-generate slug from title
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
        <div key={i} className="border border-border/50 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Artigo #{i + 1}</span>
            <button onClick={() => removePost(i)} className="text-destructive/60 hover:text-destructive">
              <Trash2 size={12} />
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
      <Button variant="outline" size="sm" onClick={addPost} className="gap-1.5 w-full">
        <Plus size={12} /> Novo artigo
      </Button>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { useSiteContent, useUpdateSiteContent, useUploadSiteImage, useSiteImages } from "@/hooks/use-site-content";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, LogOut, Upload } from "lucide-react";

const contentGroups = [
  {
    label: "Hero",
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
    label: "Método",
    keys: [
      { key: "metodo_label", label: "Label da seção", type: "text" },
      { key: "metodo_title", label: "Título", type: "text" },
      { key: "metodo_subtitle", label: "Subtítulo", type: "textarea" },
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
    label: "Contato",
    keys: [
      { key: "whatsapp_number", label: "Número WhatsApp (com DDI)", type: "text" },
      { key: "whatsapp_message", label: "Mensagem padrão WhatsApp", type: "textarea" },
      { key: "instagram_link", label: "Link Instagram", type: "text" },
      { key: "instagram_handle", label: "@ Instagram", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "cref", label: "CREF", type: "text" },
    ],
  },
  {
    label: "Footer",
    keys: [
      { key: "footer_desc", label: "Descrição do footer", type: "text" },
    ],
  },
];

const imageSlots = [
  { key: "hero_photo", label: "Foto do Hero (desktop)" },
  { key: "logo_dark", label: "Logo (tema escuro)" },
  { key: "logo_light", label: "Logo (tema claro)" },
];

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
        <TabsList className="mb-6">
          <TabsTrigger value="textos">Textos</TabsTrigger>
          <TabsTrigger value="imagens">Imagens</TabsTrigger>
        </TabsList>

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

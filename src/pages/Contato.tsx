import { useState } from "react";
import { Section, SectionLabel, SectionTitle, SectionSubtitle } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WHATSAPP_LINK, INSTAGRAM_LINK, EMAIL } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const contatos = [
  { label: "WhatsApp", sub: "Principal", href: WHATSAPP_LINK },
  { label: "Instagram", sub: "@klebyalmeida", href: INSTAGRAM_LINK },
  { label: "E-mail", sub: EMAIL, href: `mailto:${EMAIL}` },
  { label: "Local", sub: "Picos, PI", href: "#" },
];

const Contato = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ nome: "", objetivo: "", preferencia: "", mensagem: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Mensagem enviada!", description: "Entrarei em contato em breve." });
    setForm({ nome: "", objetivo: "", preferencia: "", mensagem: "" });
  };

  return (
    <Section>
      <div className="grid lg:grid-cols-2 gap-14">
        <div>
          <SectionLabel>Contato</SectionLabel>
          <SectionTitle>Vamos conversar</SectionTitle>
          <SectionSubtitle className="mb-8">Escolha o canal que preferir.</SectionSubtitle>
          <div className="space-y-0">
            {contatos.map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-4 border-b border-border/40 group hover:text-primary transition-colors">
                <span className="text-[15px] font-semibold">{c.label}</span>
                <span className="text-[13px] text-muted-foreground group-hover:text-primary/70 transition-colors">{c.sub}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-6">Enviar mensagem</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground block mb-1.5">Nome</label>
              <Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required className="rounded-lg border-border/50 h-10" />
            </div>
            <div>
              <label className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground block mb-1.5">Objetivo</label>
              <Input placeholder="Ex: Emagrecimento, hipertrofia..." value={form.objetivo} onChange={(e) => setForm({ ...form, objetivo: e.target.value })} className="rounded-lg border-border/50 h-10" />
            </div>
            <div>
              <label className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground block mb-1.5">Preferência</label>
              <div className="flex gap-2 mt-1">
                {["Online", "Presencial"].map((opt) => (
                  <button key={opt} type="button" className={cn("px-4 py-2 text-[13px] font-medium rounded-lg border transition-colors", form.preferencia === opt ? "border-primary text-primary bg-primary/5" : "border-border/50 text-muted-foreground hover:border-foreground hover:text-foreground")} onClick={() => setForm({ ...form, preferencia: opt })}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground block mb-1.5">Mensagem</label>
              <Textarea rows={3} value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} className="rounded-lg border-border/50 resize-none" />
            </div>
            <Button type="submit" className="font-semibold h-10 px-6 text-[13px] rounded-lg">Enviar</Button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Contato;

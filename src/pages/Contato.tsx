import { useState } from "react";
import { Section, SectionLabel, SectionTitle, SectionSubtitle } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WHATSAPP_LINK, INSTAGRAM_LINK, EMAIL } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const contatos = [
  { label: "WhatsApp", sublabel: "Principal", href: WHATSAPP_LINK },
  { label: "Instagram", sublabel: "@klebyalmeida", href: INSTAGRAM_LINK },
  { label: "E-mail", sublabel: EMAIL, href: `mailto:${EMAIL}` },
  { label: "Local", sublabel: "Picos, PI (presencial)", href: "#" },
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
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <SectionLabel>Contato</SectionLabel>
          <SectionTitle>Vamos conversar</SectionTitle>
          <SectionSubtitle className="mb-10">
            Escolha o canal que preferir. Estou pronta para ajudar.
          </SectionSubtitle>
          <div className="space-y-0">
            {contatos.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-4 border-b border-border/50 group hover:text-primary transition-colors"
              >
                <span className="text-base font-semibold">{c.label}</span>
                <span className="text-[13px] text-muted-foreground group-hover:text-primary/70 transition-colors">
                  {c.sublabel}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-7">Enviar mensagem</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground block mb-2">
                Nome
              </label>
              <Input
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                required
                className="rounded-md border-border/60 h-11"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground block mb-2">
                Objetivo
              </label>
              <Input
                placeholder="Ex: Emagrecimento, hipertrofia..."
                value={form.objetivo}
                onChange={(e) => setForm({ ...form, objetivo: e.target.value })}
                className="rounded-md border-border/60 h-11"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground block mb-2">
                Preferência
              </label>
              <div className="flex gap-3 mt-1">
                {["Online", "Presencial"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={cn(
                      "px-5 py-2.5 text-[13px] font-medium rounded-md border transition-colors",
                      form.preferencia === opt
                        ? "border-primary text-primary bg-primary/5"
                        : "border-border/60 text-muted-foreground hover:border-foreground hover:text-foreground"
                    )}
                    onClick={() => setForm({ ...form, preferencia: opt })}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground block mb-2">
                Mensagem
              </label>
              <Textarea
                rows={4}
                value={form.mensagem}
                onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                className="rounded-md border-border/60 resize-none"
              />
            </div>
            <Button type="submit" className="font-semibold tracking-wide h-11 px-8 text-sm rounded-md">
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Contato;

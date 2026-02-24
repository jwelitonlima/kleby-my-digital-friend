import { useState } from "react";
import { Section, SectionTitle, SectionSubtitle } from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Instagram, Mail, MapPin } from "lucide-react";
import { WHATSAPP_LINK, INSTAGRAM_LINK, EMAIL } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

const contatos = [
  { icon: MessageCircle, label: "WhatsApp (principal)", href: WHATSAPP_LINK },
  { icon: Instagram, label: "Instagram", href: INSTAGRAM_LINK },
  { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
  { icon: MapPin, label: "São Paulo, SP (presencial)", href: "#" },
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
      <div className="grid md:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <SectionTitle>Contato</SectionTitle>
          <SectionSubtitle className="mb-8">
            Vamos conversar sobre seu objetivo. Escolha o canal que preferir.
          </SectionSubtitle>
          <div className="space-y-4">
            {contatos.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <c.icon size={18} className="text-primary" />
                </div>
                <span className="text-sm font-medium">{c.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardContent className="p-6 md:p-8">
            <h3 className="font-heading font-semibold text-lg mb-6">Enviar mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="objetivo">Objetivo</Label>
                <Input
                  id="objetivo"
                  placeholder="Ex: Emagrecimento, hipertrofia..."
                  value={form.objetivo}
                  onChange={(e) => setForm({ ...form, objetivo: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="preferencia">Preferência</Label>
                <div className="flex gap-3 mt-1">
                  {["Online", "Presencial"].map((opt) => (
                    <Button
                      key={opt}
                      type="button"
                      variant={form.preferencia === opt ? "default" : "outline"}
                      size="sm"
                      className="rounded-full text-xs font-heading"
                      onClick={() => setForm({ ...form, preferencia: opt })}
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea
                  id="mensagem"
                  rows={4}
                  value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full rounded-full font-heading font-semibold">
                Enviar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};

export default Contato;

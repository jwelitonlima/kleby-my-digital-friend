import { useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionLabel, SectionTitle } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK, INSTAGRAM_LINK, EMAIL } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";

/* ── Floating label input ── */
function FloatingInput({
  label, value, onChange, required, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className={cn(
          "w-full bg-muted/50 rounded-2xl px-4 pt-7 pb-2.5 text-[16px] text-foreground",
          "border border-transparent outline-none transition-all duration-200",
          "focus:border-primary/30 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.08)]",
          "placeholder-transparent min-h-[56px]"
        )}
        placeholder={label}
      />
      <span className={cn(
        "absolute left-4 transition-all duration-200 pointer-events-none",
        active ? "top-2.5 text-[10px] font-semibold tracking-wider uppercase text-primary/70" : "top-1/2 -translate-y-1/2 text-[14px] text-muted-foreground"
      )}>{label}</span>
    </div>
  );
}

/* ── Floating label textarea ── */
function FloatingTextarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4}
        className={cn(
          "w-full bg-muted/50 rounded-2xl px-4 pt-7 pb-3 text-[16px] text-foreground resize-none",
          "border border-transparent outline-none transition-all duration-200",
          "focus:border-primary/30 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.08)]",
          "placeholder-transparent min-h-[120px]"
        )}
        placeholder={label}
      />
      <span className={cn(
        "absolute left-4 transition-all duration-200 pointer-events-none",
        active ? "top-2.5 text-[10px] font-semibold tracking-wider uppercase text-primary/70" : "top-5 text-[14px] text-muted-foreground"
      )}>{label}</span>
    </div>
  );
}

const Contato = () => {
  const { toast } = useToast();
  const { data: c } = useSiteContent();
  const [form, setForm] = useState({ nome: "", objetivo: "", preferencia: "", mensagem: "" });

  const whatsappLink = c ? `https://wa.me/${c.whatsapp_number}?text=${encodeURIComponent(c.whatsapp_message)}` : WHATSAPP_LINK;
  const instagramLink = c?.instagram_link ?? INSTAGRAM_LINK;
  const instagramHandle = c?.instagram_handle ?? "@kleby.almeida_personal";
  const email = c?.email ?? EMAIL;
  const local = c?.contato_local ?? "Picos, PI";

  const contatos = [
    { label: "WhatsApp", sub: "Principal", href: whatsappLink },
    { label: "Instagram", sub: instagramHandle, href: instagramLink },
    { label: "E-mail", sub: email, href: `mailto:${email}` },
    { label: "Local", sub: local, href: "#" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Mensagem enviada!", description: "Entrarei em contato em breve." });
    setForm({ nome: "", objetivo: "", preferencia: "", mensagem: "" });
  };

  return (
    <Section>
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
        <div>
          <SectionLabel>Contato</SectionLabel>
          <SectionTitle>Vamos conversar</SectionTitle>
          <div className="mt-8 md:mt-10 space-y-3">
            {contatos.map((ct, i) => (
              <motion.a
                key={i}
                href={ct.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
                className={cn(
                  "flex items-center justify-between px-5 py-5 md:py-4 rounded-2xl",
                  "bg-muted/40 hover:bg-muted/80 active:bg-muted/60 transition-all duration-150",
                  "group cursor-pointer min-h-[56px]"
                )}
              >
                <span className="text-[15px] md:text-[14px] font-semibold group-hover:text-primary transition-colors duration-200">{ct.label}</span>
                <span className="text-[12px] text-muted-foreground group-hover:text-foreground/60 transition-colors duration-200">{ct.sub}</span>
              </motion.a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-[11px] md:text-[13px] font-semibold tracking-wider uppercase text-muted-foreground mb-6 md:mb-8">
            Enviar mensagem
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <FloatingInput label="Nome" value={form.nome} onChange={(v) => setForm({ ...form, nome: v })} required />
            <FloatingInput label="Objetivo" value={form.objetivo} onChange={(v) => setForm({ ...form, objetivo: v })} />
            <div>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground block mb-3">Preferência</span>
              <div className="flex gap-3">
                {["Online", "Presencial"].map((opt) => (
                  <button key={opt} type="button" className={cn(
                    "flex-1 md:flex-none px-5 py-3.5 md:py-2.5 text-[14px] md:text-[13px] font-medium rounded-2xl transition-all duration-200 min-h-[48px] active:scale-[0.97]",
                    form.preferencia === opt ? "bg-primary/10 text-primary border border-primary/20" : "bg-muted/50 text-muted-foreground border border-transparent hover:bg-muted/80 hover:text-foreground"
                  )} onClick={() => setForm({ ...form, preferencia: opt })}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <FloatingTextarea label="Mensagem" value={form.mensagem} onChange={(v) => setForm({ ...form, mensagem: v })} />
            <Button type="submit" className="w-full font-semibold h-[52px] md:h-12 text-[15px] md:text-[13px] rounded-2xl md:rounded-xl group transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 active:scale-[0.98]">
              Enviar mensagem
              <ArrowRight size={14} className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Contato;

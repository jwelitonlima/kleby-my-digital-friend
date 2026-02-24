import { useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionLabel, SectionTitle } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK, INSTAGRAM_LINK, EMAIL } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const contatos = [
  { label: "WhatsApp", sub: "Principal", href: WHATSAPP_LINK },
  { label: "Instagram", sub: "@kleby.almeida_personal", href: INSTAGRAM_LINK },
  { label: "E-mail", sub: EMAIL, href: `mailto:${EMAIL}` },
  { label: "Local", sub: "Picos, PI", href: "#" },
];

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
          "w-full bg-muted/50 rounded-xl px-4 pt-6 pb-2 text-[14px] text-foreground",
          "border border-transparent outline-none transition-all duration-200",
          "focus:border-primary/30 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.08)]",
          "placeholder-transparent"
        )}
        placeholder={label}
      />
      <span
        className={cn(
          "absolute left-4 transition-all duration-200 pointer-events-none",
          active
            ? "top-2 text-[10px] font-semibold tracking-wider uppercase text-primary/70"
            : "top-1/2 -translate-y-1/2 text-[13px] text-muted-foreground"
        )}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Floating label textarea ── */
function FloatingTextarea({
  label, value, onChange,
}: {
  label: string; value: string; onChange: (v: string) => void;
}) {
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
          "w-full bg-muted/50 rounded-xl px-4 pt-6 pb-3 text-[14px] text-foreground resize-none",
          "border border-transparent outline-none transition-all duration-200",
          "focus:border-primary/30 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.08)]",
          "placeholder-transparent"
        )}
        placeholder={label}
      />
      <span
        className={cn(
          "absolute left-4 transition-all duration-200 pointer-events-none",
          active
            ? "top-2 text-[10px] font-semibold tracking-wider uppercase text-primary/70"
            : "top-4 text-[13px] text-muted-foreground"
        )}
      >
        {label}
      </span>
    </div>
  );
}

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
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
        {/* Left – channels */}
        <div>
          <SectionLabel>Contato</SectionLabel>
          <SectionTitle>Vamos conversar</SectionTitle>

          <div className="mt-10 space-y-3">
            {contatos.map((c, i) => (
              <motion.a
                key={i}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className={cn(
                  "flex items-center justify-between px-5 py-4 rounded-xl",
                  "bg-muted/40 hover:bg-muted/80 transition-all duration-200",
                  "group cursor-pointer"
                )}
              >
                <span className="text-[14px] font-semibold group-hover:text-primary transition-colors duration-200">
                  {c.label}
                </span>
                <span className="text-[12px] text-muted-foreground group-hover:text-foreground/60 transition-colors duration-200">
                  {c.sub}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right – form */}
        <div>
          <h3 className="text-[13px] font-semibold tracking-wider uppercase text-muted-foreground mb-8">
            Enviar mensagem
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <FloatingInput
              label="Nome"
              value={form.nome}
              onChange={(v) => setForm({ ...form, nome: v })}
              required
            />

            <FloatingInput
              label="Objetivo"
              value={form.objetivo}
              onChange={(v) => setForm({ ...form, objetivo: v })}
            />

            <div>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground block mb-2.5">
                Preferência
              </span>
              <div className="flex gap-2.5">
                {["Online", "Presencial"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={cn(
                      "px-5 py-2.5 text-[13px] font-medium rounded-xl transition-all duration-200",
                      form.preferencia === opt
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "bg-muted/50 text-muted-foreground border border-transparent hover:bg-muted/80 hover:text-foreground"
                    )}
                    onClick={() => setForm({ ...form, preferencia: opt })}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <FloatingTextarea
              label="Mensagem"
              value={form.mensagem}
              onChange={(v) => setForm({ ...form, mensagem: v })}
            />

            <Button
              type="submit"
              className="w-full font-semibold h-12 text-[13px] rounded-xl group transition-all duration-200 hover:shadow-lg hover:shadow-primary/10"
            >
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

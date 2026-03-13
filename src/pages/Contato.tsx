import { useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionLabel, SectionTitle } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK, INSTAGRAM_LINK, EMAIL } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ArrowRight, MessageCircle, Instagram, Mail, MapPin, Send } from "lucide-react";
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
    <div className="relative group">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className={cn(
          "w-full bg-background/60 backdrop-blur-sm rounded-xl px-5 pt-7 pb-2.5 text-[16px] text-foreground",
          "border border-border/50 outline-none transition-all duration-300",
          "focus:border-primary/40 focus:bg-background/80",
          "focus:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.15)]",
          "placeholder-transparent min-h-[56px]"
        )}
        placeholder={label}
      />
      <span className={cn(
        "absolute left-5 transition-all duration-300 pointer-events-none",
        active
          ? "top-2 text-[10px] font-semibold tracking-[0.12em] uppercase text-primary/80"
          : "top-1/2 -translate-y-1/2 text-[14px] text-muted-foreground"
      )}>{label}</span>
      <div className={cn(
        "absolute bottom-0 left-5 right-5 h-[1px] transition-all duration-500",
        focused ? "bg-gradient-to-r from-transparent via-primary/60 to-transparent" : "bg-transparent"
      )} />
    </div>
  );
}

/* ── Floating label textarea ── */
function FloatingTextarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative group">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4}
        className={cn(
          "w-full bg-background/60 backdrop-blur-sm rounded-xl px-5 pt-7 pb-3 text-[16px] text-foreground resize-none",
          "border border-border/50 outline-none transition-all duration-300",
          "focus:border-primary/40 focus:bg-background/80",
          "focus:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.15)]",
          "placeholder-transparent min-h-[140px]"
        )}
        placeholder={label}
      />
      <span className={cn(
        "absolute left-5 transition-all duration-300 pointer-events-none",
        active
          ? "top-2 text-[10px] font-semibold tracking-[0.12em] uppercase text-primary/80"
          : "top-5 text-[14px] text-muted-foreground"
      )}>{label}</span>
      <div className={cn(
        "absolute bottom-0 left-5 right-5 h-[1px] transition-all duration-500",
        focused ? "bg-gradient-to-r from-transparent via-primary/60 to-transparent" : "bg-transparent"
      )} />
    </div>
  );
}

/* ── Contact channel card ── */
const channelIcons = {
  WhatsApp: MessageCircle,
  Instagram: Instagram,
  "E-mail": Mail,
  Local: MapPin,
};

function ChannelCard({ label, sub, href, index }: { label: string; sub: string; href: string; index: number }) {
  const Icon = channelIcons[label as keyof typeof channelIcons] || Mail;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "group relative flex items-center gap-4 px-5 py-5 rounded-xl",
        "bg-background/40 backdrop-blur-sm border border-border/30",
        "hover:border-primary/30 hover:bg-background/70",
        "active:scale-[0.98] transition-all duration-300",
        "cursor-pointer overflow-hidden"
      )}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/[0.03] to-transparent pointer-events-none" />

      <div className={cn(
        "flex items-center justify-center w-10 h-10 rounded-lg",
        "bg-primary/8 text-primary/70 group-hover:bg-primary/15 group-hover:text-primary",
        "transition-all duration-300"
      )}>
        <Icon size={18} strokeWidth={1.8} />
      </div>

      <div className="flex-1 min-w-0">
        <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted-foreground/60 block mb-0.5">
          {label}
        </span>
        <span className="text-[14px] text-foreground/80 group-hover:text-foreground transition-colors duration-300 truncate block">
          {sub}
        </span>
      </div>

      <ArrowRight
        size={14}
        className="text-muted-foreground/30 group-hover:text-primary/60 group-hover:translate-x-0.5 transition-all duration-300"
      />
    </motion.a>
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
    { label: "WhatsApp", sub: whatsappLink.includes("wa.me") ? "Resposta rápida" : "Principal", href: whatsappLink },
    { label: "Instagram", sub: instagramHandle, href: instagramLink },
    { label: "E-mail", sub: email, href: `mailto:${email}` },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Mensagem enviada!", description: "Entrarei em contato em breve." });
    setForm({ nome: "", objetivo: "", preferencia: "", mensagem: "" });
  };

  return (
    <Section>
      {/* Header */}
      <div className="mb-10 md:mb-16">
        <SectionLabel>Contato</SectionLabel>
        <SectionTitle>Vamos conversar</SectionTitle>
        <p className="text-muted-foreground text-[14px] md:text-[15px] mt-3 max-w-md leading-relaxed">
          Escolha o canal de sua preferência ou envie uma mensagem diretamente.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Left — channels */}
        <div className="lg:col-span-2 space-y-3">
          {contatos.map((ct, i) => (
            <ChannelCard key={ct.label} {...ct} index={i} />
          ))}

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2.5 pt-4 px-1"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-[12px] text-muted-foreground/70 font-medium">
              Disponível para novos alunos
            </span>
          </motion.div>
        </div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="relative rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm p-6 md:p-8">
            {/* Subtle corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/[0.04] to-transparent rounded-tr-2xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Send size={14} className="text-primary" />
              </div>
              <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase text-foreground/70">
                Enviar mensagem
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <FloatingInput label="Nome" value={form.nome} onChange={(v) => setForm({ ...form, nome: v })} required />
                <FloatingInput label="Objetivo" value={form.objetivo} onChange={(v) => setForm({ ...form, objetivo: v })} />
              </div>

              <div>
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-muted-foreground/60 block mb-3">
                  Modalidade
                </span>
                <div className="flex gap-3">
                  {["Online", "Presencial", "Híbrido"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={cn(
                        "flex-1 px-4 py-3 text-[13px] font-medium rounded-xl transition-all duration-300 min-h-[44px]",
                        "active:scale-[0.97]",
                        form.preferencia === opt
                          ? "bg-primary/12 text-primary border border-primary/25 shadow-[0_0_12px_-3px_hsl(var(--primary)/0.2)]"
                          : "bg-background/50 text-muted-foreground border border-border/40 hover:border-border hover:text-foreground"
                      )}
                      onClick={() => setForm({ ...form, preferencia: opt })}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <FloatingTextarea label="Sua mensagem" value={form.mensagem} onChange={(v) => setForm({ ...form, mensagem: v })} />

              <Button
                type="submit"
                className={cn(
                  "w-full font-semibold h-12 text-[13px] rounded-xl group",
                  "transition-all duration-300",
                  "hover:shadow-[0_8px_24px_-6px_hsl(var(--primary)/0.3)]",
                  "active:scale-[0.98]"
                )}
              >
                Enviar mensagem
                <ArrowRight size={14} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contato;

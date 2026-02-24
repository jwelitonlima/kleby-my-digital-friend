import { Section, SectionLabel, SectionTitle, SectionSubtitle } from "@/components/Section";
import { User } from "lucide-react";
import { motion } from "framer-motion";

const formacoes = [
  "CREF 000849-G/PI",
  "Pós-graduação em Fisiologia do Exercício",
  "Especialista em Personal Trainer",
];

const pilares = [
  { title: "Consistência", desc: "Resultados vêm com disciplina e regularidade." },
  { title: "Segurança", desc: "Treino correto para evoluir sem lesões." },
  { title: "Evolução", desc: "Cada fase planejada para avançar com inteligência." },
];

const Sobre = () => {
  return (
    <>
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="aspect-[3/4] max-w-sm mx-auto lg:mx-0 bg-card rounded-2xl overflow-hidden flex items-center justify-center">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-3">
                  <User size={22} className="text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">Foto da Kléby</p>
              </div>
            </div>
          </motion.div>
          <div>
            <SectionLabel>Sobre</SectionLabel>
            <SectionTitle>Kléby Almeida</SectionTitle>
            <div className="space-y-3 text-muted-foreground text-[15px] leading-relaxed mt-4">
              <p>Personal Trainer com foco em treino inteligente, seguro e individualizado. Minha missão é ajudar cada aluno a alcançar seus objetivos de forma sustentável.</p>
              <p>Abordagem baseada em ciência, escuta e adaptação. Cada treino pensado para a sua realidade.</p>
              <p>Atendo em Picos-PI, presencial e online. Do iniciante ao avançado.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border/40">
        <SectionLabel>Formação</SectionLabel>
        <SectionTitle>Certificações</SectionTitle>
        <div className="max-w-md mt-6 space-y-0">
          {formacoes.map((item, i) => (
            <div key={i} className="flex items-start gap-4 py-3.5 border-b border-border/30 last:border-0">
              <span className="text-xs font-bold text-primary/30 pt-0.5 select-none">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[14px] text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border/40">
        <SectionLabel>Pilares</SectionLabel>
        <SectionTitle>O que guia cada treino</SectionTitle>
        <div className="grid sm:grid-cols-3 gap-6 mt-8">
          {pilares.map((item, i) => (
            <div key={i} className="bg-card rounded-xl p-5">
              <h3 className="text-base font-semibold mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Sobre;

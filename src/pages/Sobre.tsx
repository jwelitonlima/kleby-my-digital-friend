import { Section, SectionLabel, SectionTitle, SectionSubtitle } from "@/components/Section";
import { User } from "lucide-react";
import { motion } from "framer-motion";

const formacoes = [
  "Bacharel em Educação Física – CREF XXXXX",
  "Pós-graduação em Treinamento Esportivo",
  "Certificação em Avaliação Funcional",
  "Formação em Periodização de Treino",
  "Curso de Nutrição Aplicada ao Exercício",
];

const valores = [
  { title: "Consistência", desc: "Resultados vêm com disciplina e regularidade." },
  { title: "Segurança", desc: "Treino correto para evoluir sem lesões." },
  { title: "Evolução", desc: "Cada fase planejada para avançar com inteligência." },
];

const Sobre = () => {
  return (
    <>
      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] max-w-md mx-auto lg:mx-0 bg-muted border border-border/40 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-3">
                  <User size={28} className="text-primary/40" />
                </div>
                <p className="text-xs text-muted-foreground">Foto da Kléby</p>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-primary/15 -z-10 hidden lg:block" />
          </motion.div>

          <div>
            <SectionLabel>Sobre</SectionLabel>
            <SectionTitle>Kléby Almeida</SectionTitle>
            <div className="space-y-5 text-muted-foreground text-[15px] leading-relaxed">
              <p>
                Sou Personal Trainer com foco em treino inteligente, seguro e individualizado. 
                Minha missão é ajudar cada aluno a alcançar seus objetivos de forma sustentável, 
                com método e constância.
              </p>
              <p>
                Minha abordagem é baseada em ciência, escuta e adaptação. Cada treino é pensado 
                para a sua realidade — seu corpo, sua rotina, seus limites e metas.
              </p>
              <p>
                Atendo em Picos-PI, de forma presencial e online. Do iniciante ao avançado, 
                com seriedade e empatia.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Formação */}
      <Section className="border-t border-border/40">
        <SectionLabel>Formação</SectionLabel>
        <SectionTitle>Formação e Certificações</SectionTitle>
        <SectionSubtitle className="mb-12">
          Investimento contínuo em conhecimento e atualização.
        </SectionSubtitle>
        <div className="max-w-lg space-y-0">
          {formacoes.map((item, i) => (
            <div key={i} className="flex items-start gap-4 py-4 border-b border-border/40 last:border-b-0">
              <span className="text-[11px] font-body font-medium tracking-label text-primary/60 pt-0.5 flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Valores */}
      <Section className="border-t border-border/40">
        <SectionLabel>Valores</SectionLabel>
        <SectionTitle>Pilares que guiam cada treino</SectionTitle>
        <div className="grid sm:grid-cols-3 gap-12 mt-12">
          {valores.map((item, i) => (
            <div key={i}>
              <span className="text-[11px] font-body font-medium tracking-label text-primary/60 block mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-heading font-light mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Sobre;
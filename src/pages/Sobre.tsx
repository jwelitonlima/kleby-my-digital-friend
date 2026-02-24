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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[3/4] max-w-md mx-auto lg:mx-0 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <User size={24} className="text-primary/50" />
                </div>
                <p className="text-xs text-muted-foreground">Foto da Kléby</p>
              </div>
            </div>
          </motion.div>

          <div>
            <SectionLabel>Sobre</SectionLabel>
            <SectionTitle>Kléby Almeida</SectionTitle>
            <div className="space-y-4 text-muted-foreground text-[15px] leading-relaxed">
              <p>
                Sou Personal Trainer com foco em treino inteligente, seguro e individualizado. 
                Minha missão é ajudar cada aluno a alcançar seus objetivos de forma sustentável.
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

      <Section className="border-t border-border/50">
        <SectionLabel>Formação</SectionLabel>
        <SectionTitle>Formação e Certificações</SectionTitle>
        <SectionSubtitle className="mb-10">
          Investimento contínuo em conhecimento e atualização.
        </SectionSubtitle>
        <div className="max-w-lg space-y-0">
          {formacoes.map((item, i) => (
            <div key={i} className="flex items-start gap-4 py-4 border-b border-border/40 last:border-b-0">
              <span className="text-[11px] font-semibold tracking-label text-primary pt-0.5 flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border/50">
        <SectionLabel>Valores</SectionLabel>
        <SectionTitle>Pilares que guiam cada treino</SectionTitle>
        <div className="grid sm:grid-cols-3 gap-10 mt-10">
          {valores.map((item, i) => (
            <div key={i}>
              <span className="text-[11px] font-semibold tracking-label text-primary block mb-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Sobre;

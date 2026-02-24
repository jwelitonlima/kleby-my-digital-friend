import { Section, SectionLabel, SectionTitle, SectionSubtitle } from "@/components/Section";
import { motion } from "framer-motion";
import { User } from "lucide-react";

const depoimentos = [
  { nome: "Ana S.", texto: "Em 6 meses, transformei meu corpo e minha relação com o exercício.", objetivo: "Emagrecimento" },
  { nome: "Rafael M.", texto: "O acompanhamento faz toda a diferença. Nunca tive tanta consistência.", objetivo: "Hipertrofia" },
  { nome: "Juliana C.", texto: "Treino que cabe na minha rotina e resultados incríveis.", objetivo: "Condicionamento" },
  { nome: "Pedro L.", texto: "Profissional sério, método claro e evolução visível.", objetivo: "Hipertrofia" },
  { nome: "Mariana R.", texto: "Voltei a treinar depois de anos. O acolhimento foi essencial.", objetivo: "Saúde" },
  { nome: "Lucas T.", texto: "Finalmente entendi o que é treinar com inteligência.", objetivo: "Emagrecimento" },
];

const metricas = [
  { label: "Alunos", valor: "+100" },
  { label: "Experiência", valor: "+5 anos" },
  { label: "Retenção", valor: "95%" },
];

const Resultados = () => (
  <>
    <Section>
      <SectionLabel>Resultados</SectionLabel>
      <SectionTitle>Dados reais</SectionTitle>
      <SectionSubtitle className="mb-10">Números de quem treina com constância.</SectionSubtitle>

      <div className="grid grid-cols-3 gap-4 mb-14">
        {metricas.map((m, i) => (
          <div key={i} className="bg-card rounded-xl p-5">
            <p className="text-2xl md:text-3xl font-bold">{m.valor}</p>
            <p className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="mb-14">
        <span className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground block mb-6">Transformações</span>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-[3/4] bg-card rounded-xl flex items-center justify-center">
              <div className="text-center">
                <User size={20} className="text-muted-foreground/30 mx-auto mb-1.5" />
                <p className="text-[10px] text-muted-foreground">Antes / Depois</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>

    <Section className="border-t border-border/40">
      <SectionLabel>Depoimentos</SectionLabel>
      <SectionTitle>O que dizem os alunos</SectionTitle>
      <div className="max-w-lg mt-8 space-y-5">
        {depoimentos.map((d, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
            <p className="text-[15px] leading-relaxed text-foreground/90 mb-1">"{d.texto}"</p>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground">{d.nome}</span>
              <span className="text-[10px] text-muted-foreground/50">· {d.objetivo}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  </>
);

export default Resultados;

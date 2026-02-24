import { Section, SectionLabel, SectionTitle, SectionSubtitle } from "@/components/Section";
import { motion } from "framer-motion";
import { User } from "lucide-react";

const depoimentos = [
  { nome: "Ana S.", texto: "Em 6 meses, transformei meu corpo e minha relação com o exercício. O Kléby é excepcional.", objetivo: "Emagrecimento" },
  { nome: "Rafael M.", texto: "O acompanhamento faz toda a diferença. Nunca tive tanta consistência nos treinos.", objetivo: "Hipertrofia" },
  { nome: "Juliana C.", texto: "Treino que cabe na minha rotina e resultados que eu nunca imaginei alcançar.", objetivo: "Condicionamento" },
  { nome: "Pedro L.", texto: "Profissional sério, método claro e evolução visível a cada mês.", objetivo: "Hipertrofia" },
  { nome: "Mariana R.", texto: "Voltei a treinar depois de anos parada. O acolhimento e a paciência foram essenciais.", objetivo: "Saúde" },
  { nome: "Lucas T.", texto: "Finalmente entendi o que é treinar com inteligência. Resultado sustentável.", objetivo: "Emagrecimento" },
];

const metricas = [
  { label: "Alunos acompanhados", valor: "+100" },
  { label: "Meses de experiência", valor: "+60" },
];

const Resultados = () => {
  return (
    <>
      <Section>
        <SectionLabel>Resultados</SectionLabel>
        <SectionTitle>Provas de quem treina com método</SectionTitle>
        <SectionSubtitle className="mb-16">
          Resultados reais de alunos que decidiram evoluir com constância.
        </SectionSubtitle>

        {/* Métricas */}
        <div className="flex gap-12 mb-20">
          {metricas.map((m, i) => (
            <div key={i}>
              <p className="text-3xl md:text-4xl font-heading font-light text-foreground">{m.valor}</p>
              <p className="text-[13px] text-muted-foreground mt-1">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Transformações */}
        <div className="mb-20">
          <span className="text-[11px] font-body font-medium tracking-label uppercase text-primary/60 block mb-8">
            Transformações
          </span>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[3/4] bg-muted border border-border/40 flex items-center justify-center">
                <div className="text-center">
                  <User size={24} className="text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-[11px] text-muted-foreground">Antes / Depois {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Depoimentos */}
      <Section className="border-t border-border/40">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <SectionLabel>Depoimentos</SectionLabel>
            <SectionTitle>O que dizem meus alunos</SectionTitle>
          </div>
          <div className="space-y-8">
            {depoimentos.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="border-l-[1.5px] border-primary/30 pl-6 py-1"
              >
                <p className="text-base leading-relaxed mb-3 font-heading font-light italic text-foreground/90">
                  {d.texto}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-body font-medium tracking-wide text-muted-foreground uppercase">
                    {d.nome}
                  </span>
                  <span className="text-[11px] text-muted-foreground/60">— {d.objetivo}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};

export default Resultados;
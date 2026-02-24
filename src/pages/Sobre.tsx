import { Section, SectionTitle, SectionSubtitle } from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { User, ShieldCheck, TrendingUp, Zap } from "lucide-react";

const valores = [
  { icon: TrendingUp, title: "Consistência", desc: "Resultados vêm com disciplina e regularidade." },
  { icon: ShieldCheck, title: "Segurança", desc: "Treino correto para evoluir sem lesões." },
  { icon: Zap, title: "Evolução", desc: "Cada fase planejada para avançar com inteligência." },
];

const formacoes = [
  "Bacharel em Educação Física – CREF XXXXX",
  "Pós-graduação em Treinamento Esportivo",
  "Certificação em Avaliação Funcional",
  "Formação em Periodização de Treino",
  "Curso de Nutrição Aplicada ao Exercício",
];

const Sobre = () => {
  return (
    <>
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo placeholder */}
          <div className="aspect-[3/4] max-w-sm mx-auto md:mx-0 rounded-2xl bg-muted border border-border flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <User size={36} className="text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Foto da Kléby</p>
            </div>
          </div>

          <div>
            <span className="text-primary font-heading text-sm font-semibold tracking-widest uppercase mb-3 block">
              Sobre
            </span>
            <SectionTitle>Kléby Almeida</SectionTitle>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
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
                Atendo pessoas que buscam emagrecimento, hipertrofia, condicionamento físico, 
                qualidade de vida e performance. Do iniciante ao avançado, com seriedade e empatia.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Formação */}
      <Section className="bg-muted/50">
        <SectionTitle>Formação e Certificações</SectionTitle>
        <SectionSubtitle className="mb-8">
          Investimento contínuo em conhecimento e atualização.
        </SectionSubtitle>
        <ul className="space-y-3 max-w-lg">
          {formacoes.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Valores */}
      <Section>
        <SectionTitle>Meus Valores</SectionTitle>
        <SectionSubtitle className="mb-12">
          Pilares que guiam cada treino e cada orientação.
        </SectionSubtitle>
        <div className="grid sm:grid-cols-3 gap-6">
          {valores.map((item, i) => (
            <Card key={i} className="border-0 shadow-none bg-muted/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Sobre;

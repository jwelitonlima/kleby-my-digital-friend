import { Section, SectionTitle, SectionSubtitle } from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Monitor, ClipboardCheck, Flame, Dumbbell, Heart } from "lucide-react";

const servicos = [
  {
    icon: User,
    title: "Personal Presencial",
    para: "Quem busca acompanhamento direto e correção em tempo real.",
    como: "Treinos presenciais individuais, com planejamento semanal e progressão contínua.",
    frequencia: "2 a 5x por semana",
    msg: "Olá, Kléby! Tenho interesse no serviço de Personal Presencial.",
  },
  {
    icon: Monitor,
    title: "Consultoria Online",
    para: "Quem treina por conta mas quer um plano profissional.",
    como: "Planilha de treino personalizada, vídeos de execução e acompanhamento remoto.",
    frequencia: "Planos mensais ou trimestrais",
    msg: "Olá, Kléby! Tenho interesse na Consultoria Online.",
  },
  {
    icon: ClipboardCheck,
    title: "Avaliação Física",
    para: "Quem quer medir seu ponto de partida e acompanhar a evolução.",
    como: "Avaliação antropométrica, testes funcionais e relatório completo.",
    frequencia: "Avaliação unitária ou periódica",
    msg: "Olá, Kléby! Quero agendar uma Avaliação Física.",
  },
  {
    icon: Flame,
    title: "Treino para Emagrecimento",
    para: "Quem busca perda de gordura com saúde e sem dietas malucas.",
    como: "Combinação de treino resistido e metabólico, com orientações de rotina.",
    frequencia: "3 a 5x por semana",
    msg: "Olá, Kléby! Quero saber mais sobre o Treino para Emagrecimento.",
  },
  {
    icon: Dumbbell,
    title: "Hipertrofia",
    para: "Quem quer ganhar massa muscular de forma eficiente.",
    como: "Periodização focada em volume e intensidade, com ajustes frequentes.",
    frequencia: "4 a 6x por semana",
    msg: "Olá, Kléby! Quero saber sobre o treino de Hipertrofia.",
  },
  {
    icon: Heart,
    title: "Condicionamento e Saúde",
    para: "Quem busca qualidade de vida, mobilidade e disposição.",
    como: "Treinos adaptados com foco em funcionalidade, equilíbrio e bem-estar.",
    frequencia: "2 a 4x por semana",
    msg: "Olá, Kléby! Quero saber mais sobre Condicionamento e Saúde.",
  },
];

const Servicos = () => {
  return (
    <Section>
      <SectionTitle>Serviços</SectionTitle>
      <SectionSubtitle className="mb-12">
        Soluções personalizadas para cada objetivo e estilo de vida.
      </SectionSubtitle>
      <div className="grid md:grid-cols-2 gap-6">
        {servicos.map((s, i) => (
          <Card key={i} className="group hover:border-primary/30 transition-colors">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <s.icon size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg">{s.title}</h3>
                </div>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground ml-14">
                <p><strong className="text-foreground">Para quem:</strong> {s.para}</p>
                <p><strong className="text-foreground">Como funciona:</strong> {s.como}</p>
                <p><strong className="text-foreground">Frequência:</strong> {s.frequencia}</p>
              </div>
              <div className="mt-6 ml-14">
                <a
                  href={`https://wa.me/5500000000000?text=${encodeURIComponent(s.msg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="rounded-full font-heading text-xs">
                    Quero este serviço
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Servicos;

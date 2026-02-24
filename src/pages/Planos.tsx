import { Section, SectionTitle, SectionSubtitle } from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";

const planos = [
  {
    nome: "Essencial",
    desc: "Para quem quer começar com orientação profissional.",
    itens: [
      "Avaliação física inicial",
      "Planilha de treino personalizada",
      "Acompanhamento mensal",
      "Suporte por mensagem",
    ],
    frequencia: "2-3x por semana",
    destaque: false,
  },
  {
    nome: "Evolução",
    desc: "Para quem busca resultados consistentes e acompanhamento próximo.",
    itens: [
      "Tudo do plano Essencial",
      "Ajustes quinzenais de treino",
      "Orientação de rotina e hábitos",
      "Acompanhamento por vídeo",
      "Prioridade no suporte",
    ],
    frequencia: "3-4x por semana",
    destaque: true,
  },
  {
    nome: "Performance",
    desc: "Para quem quer o máximo de personalização e suporte.",
    itens: [
      "Tudo do plano Evolução",
      "Treinos presenciais ou online ao vivo",
      "Ajustes semanais",
      "Relatório de evolução mensal",
      "Acesso direto e prioritário",
      "Periodização avançada",
    ],
    frequencia: "4-6x por semana",
    destaque: false,
  },
];

const Planos = () => {
  return (
    <Section>
      <div className="text-center mb-12">
        <SectionTitle className="text-center">Planos</SectionTitle>
        <SectionSubtitle className="mx-auto text-center">
          Escolha o plano que se encaixa no seu objetivo e disponibilidade.
        </SectionSubtitle>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {planos.map((p, i) => (
          <Card
            key={i}
            className={`relative ${p.destaque ? "border-primary shadow-lg scale-[1.02]" : ""}`}
          >
            {p.destaque && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-heading font-semibold px-4 py-1 rounded-full">
                Mais popular
              </span>
            )}
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl font-heading">{p.nome}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-3 mb-6">
                {p.itens.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mb-6">
                Frequência sugerida: {p.frequencia}
              </p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button
                  className="w-full rounded-full font-heading font-semibold"
                  variant={p.destaque ? "default" : "outline"}
                >
                  Agendar
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8 max-w-md mx-auto">
        Planos podem variar conforme objetivo e disponibilidade. Entre em contato para uma proposta personalizada.
      </p>
    </Section>
  );
};

export default Planos;

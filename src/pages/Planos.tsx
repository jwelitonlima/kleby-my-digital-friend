import { Section, SectionLabel, SectionTitle, SectionSubtitle } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK } from "@/lib/constants";
import { cn } from "@/lib/utils";

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
    desc: "Resultados consistentes e acompanhamento próximo.",
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
    desc: "Máxima personalização e suporte dedicado.",
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

const features = [
  "Avaliação física inicial",
  "Planilha personalizada",
  "Acompanhamento mensal",
  "Suporte por mensagem",
  "Ajustes quinzenais",
  "Orientação de rotina",
  "Acompanhamento por vídeo",
  "Prioridade no suporte",
  "Treinos ao vivo",
  "Ajustes semanais",
  "Relatório mensal",
  "Periodização avançada",
];

const planFeatures: Record<string, boolean[]> = {
  Essencial:    [true, true, true, true, false, false, false, false, false, false, false, false],
  Evolução:     [true, true, true, true, true, true, true, true, false, false, false, false],
  Performance:  [true, true, true, true, true, true, true, true, true, true, true, true],
};

const Planos = () => {
  return (
    <Section>
      <div className="text-center mb-16">
        <SectionLabel className="text-center">Planos</SectionLabel>
        <SectionTitle className="text-center">Escolha seu plano</SectionTitle>
        <SectionSubtitle className="mx-auto text-center">
          Cada plano pensado para um momento diferente da sua evolução.
        </SectionSubtitle>
      </div>

      {/* Comparison table */}
      <div className="max-w-4xl mx-auto overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40">
              <th className="text-left py-4 pr-4 font-body font-normal text-muted-foreground text-[13px]" />
              {planos.map((p) => (
                <th key={p.nome} className="text-center py-4 px-4 min-w-[140px]">
                  <div className="font-heading font-light text-xl mb-1">{p.nome}</div>
                  <div className="text-[11px] text-muted-foreground font-body font-normal">{p.frequencia}</div>
                  {p.destaque && (
                    <span className="inline-block mt-2 text-[10px] font-body font-medium tracking-label uppercase text-primary">
                      Recomendado
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((f, i) => (
              <tr key={i} className="border-b border-border/20">
                <td className="py-3.5 pr-4 text-[13px] text-muted-foreground">{f}</td>
                {planos.map((p) => (
                  <td key={p.nome} className="text-center py-3.5 px-4">
                    {planFeatures[p.nome][i] ? (
                      <span className="text-primary text-sm">✓</span>
                    ) : (
                      <span className="text-border">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="pt-8" />
              {planos.map((p) => (
                <td key={p.nome} className="text-center pt-8 px-4">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    <Button
                      className={cn(
                        "rounded-none font-body font-medium tracking-wide text-xs h-10 px-6 w-full",
                        !p.destaque && "bg-transparent border border-border text-foreground hover:bg-muted"
                      )}
                    >
                      Agendar
                    </Button>
                  </a>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="text-center text-[12px] text-muted-foreground mt-10 max-w-md mx-auto">
        Planos podem variar conforme objetivo e disponibilidade. Entre em contato para uma proposta personalizada.
      </p>
    </Section>
  );
};

export default Planos;
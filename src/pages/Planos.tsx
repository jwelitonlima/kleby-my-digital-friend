import { Section, SectionLabel, SectionTitle, SectionSubtitle } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK } from "@/lib/constants";
import { cn } from "@/lib/utils";

const planos = [
  { nome: "Essencial", freq: "2-3x/sem", destaque: false },
  { nome: "Evolução", freq: "3-4x/sem", destaque: true },
  { nome: "Performance", freq: "4-6x/sem", destaque: false },
];

const features = [
  "Avaliação física",
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
  Essencial:   [true, true, true, true, false, false, false, false, false, false, false, false],
  Evolução:    [true, true, true, true, true, true, true, true, false, false, false, false],
  Performance: [true, true, true, true, true, true, true, true, true, true, true, true],
};

const Planos = () => (
  <Section>
    <div className="text-center mb-12">
      <SectionLabel className="text-center">Planos</SectionLabel>
      <SectionTitle className="text-center">Escolha seu plano</SectionTitle>
      <SectionSubtitle className="mx-auto text-center">
        Cada plano pensado para um momento da sua evolução.
      </SectionSubtitle>
    </div>

    <div className="max-w-3xl mx-auto overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/40">
            <th className="text-left py-3 pr-4 font-normal text-muted-foreground text-[13px]" />
            {planos.map((p) => (
              <th key={p.nome} className="text-center py-3 px-3 min-w-[120px]">
                <div className="font-bold text-lg mb-0.5">{p.nome}</div>
                <div className="text-[11px] text-muted-foreground font-normal">{p.freq}</div>
                {p.destaque && <span className="inline-block mt-1.5 text-[10px] font-semibold tracking-label uppercase text-primary">Recomendado</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={i} className="border-b border-border/20">
              <td className="py-2.5 pr-4 text-[13px] text-muted-foreground">{f}</td>
              {planos.map((p) => (
                <td key={p.nome} className="text-center py-2.5 px-3">
                  {planFeatures[p.nome][i] ? <span className="text-primary font-bold">✓</span> : <span className="text-border">—</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="pt-6" />
            {planos.map((p) => (
              <td key={p.nome} className="text-center pt-6 px-3">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button className={cn("font-semibold text-[12px] h-9 px-5 w-full rounded-lg", !p.destaque && "bg-transparent border border-border text-foreground hover:bg-accent")}>
                    Começar
                  </Button>
                </a>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
    <p className="text-center text-[11px] text-muted-foreground mt-8 max-w-sm mx-auto">
      Planos variam conforme objetivo e disponibilidade.
    </p>
  </Section>
);

export default Planos;

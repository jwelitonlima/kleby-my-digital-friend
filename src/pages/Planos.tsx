import { Section, SectionLabel, SectionTitle, SectionSubtitle } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSiteContent, parseJson } from "@/hooks/use-site-content";

const defaultPlanos = [
  { nome: "Essencial", freq: "2-3x/sem", destaque: false, msg: "Olá, Kléby! Tenho interesse no plano Essencial. Pode me passar mais detalhes?" },
  { nome: "Evolução", freq: "3-4x/sem", destaque: true, msg: "Olá, Kléby! Tenho interesse no plano Evolução. Pode me passar mais detalhes?" },
  { nome: "Performance", freq: "4-6x/sem", destaque: false, msg: "Olá, Kléby! Tenho interesse no plano Performance. Pode me passar mais detalhes?" },
];

const defaultFeatures = [
  "Avaliação física", "Planilha personalizada", "Acompanhamento mensal", "Suporte por mensagem",
  "Ajustes quinzenais", "Orientação de rotina", "Acompanhamento por vídeo", "Prioridade no suporte",
  "Treinos ao vivo", "Ajustes semanais", "Relatório mensal", "Periodização avançada",
];

const defaultFeaturesMap: Record<string, boolean[]> = {
  Essencial:   [true, true, true, true, false, false, false, false, false, false, false, false],
  Evolução:    [true, true, true, true, true, true, true, true, false, false, false, false],
  Performance: [true, true, true, true, true, true, true, true, true, true, true, true],
};

const Planos = () => {
  const { data: c } = useSiteContent();
  const planos = parseJson(c, "planos_list", defaultPlanos);
  const features = parseJson<string[]>(c, "planos_features", defaultFeatures);
  const planFeatures = parseJson<Record<string, boolean[]>>(c, "planos_features_map", defaultFeaturesMap);
  const whatsappNumber = c?.whatsapp_number ?? "5589988038518";

  function getWhatsAppLink(msg: string) {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }

  return (
    <Section>
      <div className="text-center mb-12">
        <SectionLabel className="text-center">{c?.planos_label ?? 'Planos'}</SectionLabel>
        <SectionTitle className="text-center">{c?.planos_title ?? 'Escolha seu plano'}</SectionTitle>
        <SectionSubtitle className="mx-auto text-center">
          {c?.planos_subtitle ?? 'Cada plano pensado para um momento da sua evolução.'}
        </SectionSubtitle>
      </div>

      {/* Mobile: cards */}
      <div className="flex flex-col gap-6 md:hidden">
        {planos.map((p: any) => (
          <div key={p.nome} className={cn("rounded-xl border p-6", p.destaque ? "border-primary bg-primary/5 shadow-md" : "border-border bg-card")}>
            <div className="text-center mb-5">
              <div className="font-bold text-xl">{p.nome}</div>
              <div className="text-[12px] text-muted-foreground mt-0.5">{p.freq}</div>
              {p.destaque && <span className="inline-block mt-2 text-[10px] font-semibold tracking-label uppercase text-primary">Recomendado</span>}
            </div>
            <ul className="space-y-2.5 mb-6">
              {features.map((f: string, i: number) => (
                <li key={i} className="flex items-center gap-2.5 text-[13px]">
                  {planFeatures[p.nome]?.[i] ? <span className="text-primary font-bold text-sm">✓</span> : <span className="text-border text-sm">—</span>}
                  <span className={cn(!planFeatures[p.nome]?.[i] && "text-muted-foreground/50")}>{f}</span>
                </li>
              ))}
            </ul>
            <a href={getWhatsAppLink(p.msg)} target="_blank" rel="noopener noreferrer">
              <Button className={cn("w-full h-12 font-semibold text-[13px] rounded-lg", !p.destaque && "bg-transparent border border-border text-foreground hover:bg-accent")}>
                Começar
              </Button>
            </a>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="max-w-3xl mx-auto hidden md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40">
              <th className="text-left py-3 pr-4 font-normal text-muted-foreground text-[13px]" />
              {planos.map((p: any) => (
                <th key={p.nome} className="text-center py-3 px-3 min-w-[120px]">
                  <div className="font-bold text-lg mb-0.5">{p.nome}</div>
                  <div className="text-[11px] text-muted-foreground font-normal">{p.freq}</div>
                  {p.destaque && <span className="inline-block mt-1.5 text-[10px] font-semibold tracking-label uppercase text-primary">Recomendado</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((f: string, i: number) => (
              <tr key={i} className="border-b border-border/20">
                <td className="py-2.5 pr-4 text-[13px] text-muted-foreground">{f}</td>
                {planos.map((p: any) => (
                  <td key={p.nome} className="text-center py-2.5 px-3">
                    {planFeatures[p.nome]?.[i] ? <span className="text-primary font-bold">✓</span> : <span className="text-border">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="pt-6" />
              {planos.map((p: any) => (
                <td key={p.nome} className="text-center pt-6 px-3">
                  <a href={getWhatsAppLink(p.msg)} target="_blank" rel="noopener noreferrer">
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
        {c?.planos_note ?? 'Planos variam conforme objetivo e disponibilidade.'}
      </p>
    </Section>
  );
};

export default Planos;

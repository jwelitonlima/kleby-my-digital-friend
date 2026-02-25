import { useState } from "react";
import { Section, SectionLabel, SectionTitle, SectionSubtitle } from "@/components/Section";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteContent, parseJson } from "@/hooks/use-site-content";

const defaultServicos = [
  { title: "Personal Presencial", desc: "Treinos individuais com planejamento semanal e progressão contínua.", msg: "Olá, Kléby! Tenho interesse no Personal Presencial." },
  { title: "Consultoria Online", desc: "Planilha personalizada, vídeos de execução e acompanhamento remoto.", msg: "Olá, Kléby! Tenho interesse na Consultoria Online." },
  { title: "Avaliação Física", desc: "Avaliação antropométrica, testes funcionais e relatório completo.", msg: "Olá, Kléby! Quero agendar uma Avaliação Física." },
  { title: "Emagrecimento", desc: "Treino resistido e metabólico com orientações de rotina.", msg: "Olá, Kléby! Quero saber sobre Emagrecimento." },
  { title: "Hipertrofia", desc: "Periodização focada em volume e intensidade com ajustes frequentes.", msg: "Olá, Kléby! Quero saber sobre Hipertrofia." },
  { title: "Condicionamento", desc: "Treinos adaptados com foco em funcionalidade e bem-estar.", msg: "Olá, Kléby! Quero saber sobre Condicionamento." },
];

function ServiceItem({ item, whatsappNumber }: { item: { title: string; desc: string; msg: string }; whatsappNumber: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-border/40 cursor-pointer group active:bg-muted/30 transition-colors duration-150"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5 md:py-6">
        <h3 className="text-title group-hover:text-primary transition-colors duration-200">{item.title}</h3>
        <ChevronRight size={16} className={cn("text-muted-foreground transition-transform duration-300", open && "rotate-90")} />
      </div>
      <div className={cn("overflow-hidden transition-all duration-300", open ? "max-h-40 pb-5" : "max-h-0")}>
        <p className="text-[14px] md:text-sm text-muted-foreground leading-relaxed mb-3 max-w-md">{item.desc}</p>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(item.msg)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-block text-primary text-[14px] md:text-[13px] font-semibold py-1 active:opacity-70 transition-opacity"
        >
          Quero este serviço →
        </a>
      </div>
    </div>
  );
}

const Servicos = () => {
  const { data: c } = useSiteContent();
  const servicos = parseJson(c, "servicos_list", defaultServicos);
  const whatsappNumber = c?.whatsapp_number ?? "5589988038518";

  return (
    <Section>
      <SectionLabel>{c?.servicos_label ?? 'Serviços'}</SectionLabel>
      <SectionTitle>{c?.servicos_title ?? 'Soluções para cada objetivo'}</SectionTitle>
      <SectionSubtitle className="mb-8 md:mb-10">{c?.servicos_subtitle ?? 'Do presencial ao online. Sempre com método.'}</SectionSubtitle>
      <div className="max-w-lg">
        {servicos.map((s: any, i: number) => <ServiceItem key={i} item={s} whatsappNumber={whatsappNumber} />)}
      </div>
    </Section>
  );
};

export default Servicos;

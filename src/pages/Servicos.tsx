import { useState } from "react";
import { Section, SectionLabel, SectionTitle, SectionSubtitle } from "@/components/Section";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const servicos = [
  { title: "Personal Presencial", desc: "Treinos individuais com planejamento semanal e progressão contínua.", msg: "Olá, Kléby! Tenho interesse no Personal Presencial." },
  { title: "Consultoria Online", desc: "Planilha personalizada, vídeos de execução e acompanhamento remoto.", msg: "Olá, Kléby! Tenho interesse na Consultoria Online." },
  { title: "Avaliação Física", desc: "Avaliação antropométrica, testes funcionais e relatório completo.", msg: "Olá, Kléby! Quero agendar uma Avaliação Física." },
  { title: "Emagrecimento", desc: "Treino resistido e metabólico com orientações de rotina.", msg: "Olá, Kléby! Quero saber sobre Emagrecimento." },
  { title: "Hipertrofia", desc: "Periodização focada em volume e intensidade com ajustes frequentes.", msg: "Olá, Kléby! Quero saber sobre Hipertrofia." },
  { title: "Condicionamento", desc: "Treinos adaptados com foco em funcionalidade e bem-estar.", msg: "Olá, Kléby! Quero saber sobre Condicionamento." },
];

function ServiceItem({ item }: { item: typeof servicos[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/40 cursor-pointer group" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between py-5 md:py-6">
        <h3 className="text-title group-hover:text-primary transition-colors duration-200">{item.title}</h3>
        <ChevronRight size={16} className={cn("text-muted-foreground transition-transform duration-300", open && "rotate-90")} />
      </div>
      <div className={cn("overflow-hidden transition-all duration-400", open ? "max-h-40 pb-5" : "max-h-0")}>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3 max-w-md">{item.desc}</p>
        <a
          href={`https://wa.me/5589988038518?text=${encodeURIComponent(item.msg)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-primary text-[13px] font-semibold hover:underline"
        >
          Quero este serviço →
        </a>
      </div>
    </div>
  );
}

const Servicos = () => (
  <Section>
    <SectionLabel>Serviços</SectionLabel>
    <SectionTitle>Soluções para cada objetivo</SectionTitle>
    <SectionSubtitle className="mb-10">Do presencial ao online. Sempre com método.</SectionSubtitle>
    <div className="max-w-lg">
      {servicos.map((s, i) => <ServiceItem key={i} item={s} />)}
    </div>
  </Section>
);

export default Servicos;

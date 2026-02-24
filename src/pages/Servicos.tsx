import { useState } from "react";
import { Section, SectionLabel, SectionTitle, SectionSubtitle } from "@/components/Section";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const servicos = [
  {
    title: "Personal Presencial",
    para: "Quem busca acompanhamento direto e correção em tempo real.",
    como: "Treinos presenciais individuais, com planejamento semanal e progressão contínua.",
    entregas: "Avaliação, planilha de treino, ajustes semanais.",
    frequencia: "2 a 5x por semana",
    msg: "Olá, Kléby! Tenho interesse no serviço de Personal Presencial.",
  },
  {
    title: "Consultoria Online",
    para: "Quem treina por conta mas quer um plano profissional.",
    como: "Planilha de treino personalizada, vídeos de execução e acompanhamento remoto.",
    entregas: "Planilha digital, suporte por mensagem, ajustes mensais.",
    frequencia: "Planos mensais ou trimestrais",
    msg: "Olá, Kléby! Tenho interesse na Consultoria Online.",
  },
  {
    title: "Avaliação Física",
    para: "Quem quer medir seu ponto de partida e acompanhar a evolução.",
    como: "Avaliação antropométrica, testes funcionais e relatório completo.",
    entregas: "Relatório detalhado, fotos comparativas, metas iniciais.",
    frequencia: "Avaliação unitária ou periódica",
    msg: "Olá, Kléby! Quero agendar uma Avaliação Física.",
  },
  {
    title: "Treino para Emagrecimento",
    para: "Quem busca perda de gordura com saúde e sem dietas malucas.",
    como: "Combinação de treino resistido e metabólico, com orientações de rotina.",
    entregas: "Plano de treino, orientação alimentar básica, check-ins.",
    frequencia: "3 a 5x por semana",
    msg: "Olá, Kléby! Quero saber mais sobre o Treino para Emagrecimento.",
  },
  {
    title: "Hipertrofia",
    para: "Quem quer ganhar massa muscular de forma eficiente.",
    como: "Periodização focada em volume e intensidade, com ajustes frequentes.",
    entregas: "Planilha progressiva, suporte técnico, ajustes quinzenais.",
    frequencia: "4 a 6x por semana",
    msg: "Olá, Kléby! Quero saber sobre o treino de Hipertrofia.",
  },
  {
    title: "Condicionamento e Saúde",
    para: "Quem busca qualidade de vida, mobilidade e disposição.",
    como: "Treinos adaptados com foco em funcionalidade, equilíbrio e bem-estar.",
    entregas: "Plano de treino funcional, acompanhamento, ajustes mensais.",
    frequencia: "2 a 4x por semana",
    msg: "Olá, Kléby! Quero saber mais sobre Condicionamento e Saúde.",
  },
];

function ServiceItem({ item }: { item: typeof servicos[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border/40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-7 md:py-9 text-left group"
      >
        <h3 className="text-xl md:text-2xl font-heading font-light group-hover:text-primary transition-colors duration-300">
          {item.title}
        </h3>
        <ChevronDown
          size={18}
          className={cn(
            "text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-4",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-out",
          isOpen ? "max-h-[500px] pb-9" : "max-h-0"
        )}
      >
        <div className="grid md:grid-cols-4 gap-6 text-sm text-muted-foreground">
          <div>
            <span className="text-[11px] font-body font-medium tracking-label uppercase text-foreground block mb-2">
              Para quem
            </span>
            {item.para}
          </div>
          <div>
            <span className="text-[11px] font-body font-medium tracking-label uppercase text-foreground block mb-2">
              Como funciona
            </span>
            {item.como}
          </div>
          <div>
            <span className="text-[11px] font-body font-medium tracking-label uppercase text-foreground block mb-2">
              Entregas
            </span>
            {item.entregas}
          </div>
          <div>
            <span className="text-[11px] font-body font-medium tracking-label uppercase text-foreground block mb-2">
              Frequência
            </span>
            <p className="mb-4">{item.frequencia}</p>
            <a
              href={`https://wa.me/5589988038518?text=${encodeURIComponent(item.msg)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-primary text-[13px] font-medium border-b border-primary/40 hover:border-primary transition-colors pb-0.5">
                Quero este serviço →
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const Servicos = () => {
  return (
    <Section>
      <SectionLabel>Serviços</SectionLabel>
      <SectionTitle>Soluções personalizadas para cada objetivo</SectionTitle>
      <SectionSubtitle className="mb-14">
        Do presencial ao online. Sempre com método, ciência e personalização.
      </SectionSubtitle>
      <div>
        {servicos.map((s, i) => (
          <ServiceItem key={i} item={s} />
        ))}
      </div>
    </Section>
  );
};

export default Servicos;
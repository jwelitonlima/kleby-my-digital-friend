import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Section, SectionLabel, SectionTitle, SectionSubtitle } from "@/components/Section";
import { WHATSAPP_LINK, INSTAGRAM_LINK } from "@/lib/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

const metodo = [
  { num: "01", title: "Avaliação e meta", desc: "Entendemos seu corpo, rotina e objetivo para traçar um caminho claro." },
  { num: "02", title: "Plano e execução", desc: "Treino personalizado, progressivo e adaptado à sua realidade." },
  { num: "03", title: "Ajustes e progressão", desc: "Revisão periódica para garantir evolução contínua e segura." },
  { num: "04", title: "Resultado sustentável", desc: "Constância e método que se transformam em hábito de vida." },
];

const servicos = [
  {
    title: "Personal Presencial",
    para: "Quem busca acompanhamento direto e correção em tempo real.",
    como: "Treinos presenciais individuais com planejamento semanal e progressão contínua.",
    entregas: "Avaliação, planilha de treino, ajustes semanais.",
    msg: "Olá, Kléby! Tenho interesse no serviço de Personal Presencial.",
  },
  {
    title: "Consultoria Online",
    para: "Quem treina por conta mas quer um plano profissional.",
    como: "Planilha de treino personalizada, vídeos de execução e acompanhamento remoto.",
    entregas: "Planilha digital, suporte por mensagem, ajustes mensais.",
    msg: "Olá, Kléby! Tenho interesse na Consultoria Online.",
  },
  {
    title: "Avaliação Física",
    para: "Quem quer medir seu ponto de partida e acompanhar a evolução.",
    como: "Avaliação antropométrica, testes funcionais e relatório completo.",
    entregas: "Relatório detalhado, fotos comparativas, metas iniciais.",
    msg: "Olá, Kléby! Quero agendar uma Avaliação Física.",
  },
  {
    title: "Periodização",
    para: "Quem busca planejamento estratégico de médio e longo prazo.",
    como: "Organização de fases de treino com foco em evolução sustentável.",
    entregas: "Plano trimestral/semestral, metas progressivas.",
    msg: "Olá, Kléby! Quero saber mais sobre Periodização de treino.",
  },
];

const depoimentos = [
  { nome: "Ana S.", texto: "Em 6 meses, transformei meu corpo e minha relação com o exercício. O Kléby é excepcional." },
  { nome: "Rafael M.", texto: "O acompanhamento faz toda a diferença. Nunca tive tanta consistência nos treinos." },
  { nome: "Juliana C.", texto: "Treino que cabe na minha rotina e resultados que eu nunca imaginei alcançar." },
  { nome: "Pedro L.", texto: "Profissional sério, método claro e evolução visível a cada mês." },
];

function ServiceAccordion({ item }: { item: typeof servicos[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border/40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
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
          isOpen ? "max-h-96 pb-8" : "max-h-0"
        )}
      >
        <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
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
            <p className="mb-4">{item.entregas}</p>
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

const Home = () => {
  const [depIdx, setDepIdx] = useState(0);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="text-[11px] font-body font-medium tracking-label uppercase text-primary mb-8 block">
                Personal Trainer
              </span>
              <h1 className="text-display font-heading font-light mb-8">
                Treino com método.{" "}
                <br className="hidden sm:block" />
                Corpo com <span className="text-primary italic">estratégia</span>.
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-md mb-10 leading-relaxed">
                Acompanhamento personalizado para evolução com segurança e constância.
              </p>
              <div className="flex items-center gap-6">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-none font-body font-medium tracking-wide h-12 px-8 text-sm">
                    Agendar Avaliação
                  </Button>
                </a>
                <Link
                  to="/sobre"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-muted-foreground/30 hover:border-foreground pb-0.5"
                >
                  Ver método
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[3/4] max-w-sm ml-auto bg-muted flex items-center justify-center border border-border/40">
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-3">
                    <User size={28} className="text-primary/40" />
                  </div>
                  <p className="text-xs text-muted-foreground">Foto profissional</p>
                </div>
              </div>
              {/* Accent line */}
              <div className="absolute -bottom-3 -left-3 w-full h-full border border-primary/15 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Micro-dados strip */}
      <div className="border-y border-border/40">
        <div className="container py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 sm:justify-between text-[13px] text-muted-foreground">
          <span>Treino personalizado</span>
          <span className="hidden sm:block w-px h-3 bg-border" />
          <span>Acompanhamento semanal</span>
          <span className="hidden sm:block w-px h-3 bg-border" />
          <span>Evolução com consistência</span>
        </div>
      </div>

      {/* O Método */}
      <Section>
        <SectionLabel>O Método</SectionLabel>
        <SectionTitle>Cada etapa pensada para sua evolução</SectionTitle>
        <SectionSubtitle className="mb-16">
          Um processo claro, do primeiro treino ao resultado sustentável.
        </SectionSubtitle>
        <div className="space-y-0">
          {metodo.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-6 md:gap-10 py-8 border-b border-border/40 last:border-b-0"
            >
              <span className="text-[11px] font-body font-medium tracking-label text-primary/60 pt-1">
                {item.num}
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-heading font-light mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground max-w-md leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Serviços */}
      <Section className="border-t border-border/40">
        <SectionLabel>Serviços</SectionLabel>
        <SectionTitle>Soluções para cada objetivo</SectionTitle>
        <SectionSubtitle className="mb-12">
          Do presencial ao online. Sempre com método e personalização.
        </SectionSubtitle>
        <div>
          {servicos.map((s, i) => (
            <ServiceAccordion key={i} item={s} />
          ))}
        </div>
        <div className="mt-10">
          <Link to="/servicos" className="text-sm text-muted-foreground hover:text-foreground border-b border-muted-foreground/30 hover:border-foreground pb-0.5 transition-colors">
            Ver todos os serviços →
          </Link>
        </div>
      </Section>

      {/* Provas sociais */}
      <Section className="border-t border-border/40">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <SectionLabel>Resultados</SectionLabel>
            <SectionTitle>Resultados reais de quem treina com método</SectionTitle>
            <SectionSubtitle>
              Depoimentos de alunos que decidiram evoluir com acompanhamento profissional.
            </SectionSubtitle>
          </div>
          <div className="space-y-8">
            {depoimentos.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border-l-[1.5px] border-primary/30 pl-6"
              >
                <p className="text-base leading-relaxed mb-3 font-heading font-light italic text-foreground/90">
                  {d.texto}
                </p>
                <span className="text-[12px] font-body font-medium tracking-wide text-muted-foreground uppercase">
                  {d.nome}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Final */}
      <section className="border-t border-border/40">
        <div className="bg-muted/30">
          <div className="container py-24 md:py-32 text-center max-w-2xl mx-auto">
            <SectionLabel className="text-center">Comece agora</SectionLabel>
            <h2 className="text-display-sm font-heading font-light tracking-tight mb-6">
              Pronto para evoluir?
            </h2>
            <p className="text-muted-foreground text-base mb-10 max-w-md mx-auto leading-relaxed">
              Evolua com segurança e estratégia. Vamos conversar sobre seu objetivo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-none font-body font-medium tracking-wide h-12 px-8 text-sm w-full sm:w-auto">
                  Falar no WhatsApp
                </Button>
              </a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-none font-body font-medium tracking-wide h-12 px-8 text-sm w-full sm:w-auto">
                  Seguir no Instagram
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
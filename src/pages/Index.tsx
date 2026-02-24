import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Section, SectionLabel, SectionTitle, SectionSubtitle } from "@/components/Section";
import { WHATSAPP_LINK, INSTAGRAM_LINK } from "@/lib/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, User } from "lucide-react";
import { cn } from "@/lib/utils";

const metodo = [
  { num: "01", title: "Avaliação", desc: "Entendemos seu corpo, rotina e objetivo." },
  { num: "02", title: "Planejamento", desc: "Treino personalizado e progressivo." },
  { num: "03", title: "Execução", desc: "Acompanhamento constante com ajustes." },
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
  { nome: "Ana S.", texto: "Em 6 meses, transformei meu corpo e minha relação com o exercício." },
  { nome: "Rafael M.", texto: "Nunca tive tanta consistência nos treinos. O acompanhamento faz toda a diferença." },
  { nome: "Juliana C.", texto: "Treino que cabe na minha rotina e resultados que eu nunca imaginei alcançar." },
  { nome: "Pedro L.", texto: "Profissional sério, método claro e evolução visível a cada mês." },
];

function ServiceAccordion({ item }: { item: typeof servicos[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 md:py-7 text-left group"
      >
        <h3 className="text-lg md:text-xl font-semibold group-hover:text-primary transition-colors duration-200">
          {item.title}
        </h3>
        <ChevronDown
          size={16}
          className={cn(
            "text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-4",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-400 ease-out",
          isOpen ? "max-h-96 pb-7" : "max-h-0"
        )}
      >
        <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
          <div>
            <span className="text-[11px] font-semibold tracking-label uppercase text-foreground block mb-2">
              Para quem
            </span>
            {item.para}
          </div>
          <div>
            <span className="text-[11px] font-semibold tracking-label uppercase text-foreground block mb-2">
              Como funciona
            </span>
            {item.como}
          </div>
          <div>
            <span className="text-[11px] font-semibold tracking-label uppercase text-foreground block mb-2">
              Entregas
            </span>
            <p className="mb-4">{item.entregas}</p>
            <a
              href={`https://wa.me/5589988038518?text=${encodeURIComponent(item.msg)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-primary text-[13px] font-semibold hover:underline transition-colors">
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
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-lg"
            >
              <span className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground mb-6 block">
                Personal Trainer · Picos, PI
              </span>
              <h1 className="text-display mb-6">
                Método. Constância.{" "}
                <span className="text-primary">Resultado.</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-md mb-10 leading-relaxed">
                Acompanhamento personalizado para evolução com segurança e estratégia.
              </p>
              <div className="flex items-center gap-5">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button className="font-semibold tracking-wide h-12 px-8 text-sm rounded-md">
                    Agendar Avaliação
                  </Button>
                </a>
                <Link
                  to="/sobre"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-foreground"
                >
                  Conhecer o método
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/5] w-full max-w-md ml-auto bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <User size={24} className="text-primary/50" />
                  </div>
                  <p className="text-xs text-muted-foreground">Foto profissional</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strip */}
      <div className="border-y border-border/50">
        <div className="container py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 sm:justify-between text-[13px] text-muted-foreground">
          <span>Treino personalizado</span>
          <span className="hidden sm:block w-px h-3 bg-border" />
          <span>Acompanhamento semanal</span>
          <span className="hidden sm:block w-px h-3 bg-border" />
          <span>Evolução com consistência</span>
        </div>
      </div>

      {/* O Método — horizontal */}
      <Section>
        <SectionLabel>O Método</SectionLabel>
        <SectionTitle>Três etapas para sua evolução</SectionTitle>
        <SectionSubtitle className="mb-14">
          Um processo claro, do primeiro treino ao resultado sustentável.
        </SectionSubtitle>
        <div className="grid sm:grid-cols-3 gap-8 md:gap-12">
          {metodo.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="text-[11px] font-semibold tracking-label text-primary block mb-3">
                {item.num}
              </span>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Serviços */}
      <Section className="border-t border-border/50">
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
          <Link to="/servicos" className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-foreground transition-colors">
            Ver todos os serviços →
          </Link>
        </div>
      </Section>

      {/* Resultados */}
      <Section className="border-t border-border/50">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <SectionLabel>Resultados</SectionLabel>
            <SectionTitle>Quem treina com método, evolui</SectionTitle>
            <SectionSubtitle>
              Depoimentos de alunos que decidiram evoluir com acompanhamento profissional.
            </SectionSubtitle>
          </div>
          <div className="space-y-6">
            {depoimentos.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border-l-2 border-primary/30 pl-5"
              >
                <p className="text-[15px] leading-relaxed mb-2 text-foreground/90">
                  "{d.texto}"
                </p>
                <span className="text-[12px] font-semibold tracking-wide text-muted-foreground uppercase">
                  {d.nome}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Final */}
      <section className="border-t border-border/50">
        <div className="bg-muted/40">
          <div className="container py-24 md:py-28 text-center max-w-2xl mx-auto">
            <SectionLabel className="text-center">Comece agora</SectionLabel>
            <h2 className="text-display-sm tracking-tight mb-5">
              Pronto para evoluir?
            </h2>
            <p className="text-muted-foreground text-base mb-10 max-w-md mx-auto leading-relaxed">
              Evolua com segurança e estratégia. Vamos conversar sobre seu objetivo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="font-semibold tracking-wide h-12 px-8 text-sm w-full sm:w-auto rounded-md">
                  Falar no WhatsApp
                </Button>
              </a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="font-semibold tracking-wide h-12 px-8 text-sm w-full sm:w-auto rounded-md">
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

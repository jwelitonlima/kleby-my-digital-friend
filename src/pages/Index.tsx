import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Section, SectionLabel, SectionTitle, SectionSubtitle } from "@/components/Section";
import { WHATSAPP_LINK, INSTAGRAM_LINK } from "@/lib/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, User } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Data ── */
const metodo = [
  { num: "01", title: "Avaliação", desc: "Análise completa do seu corpo, rotina e objetivo." },
  { num: "02", title: "Planejamento", desc: "Treino personalizado com progressão estratégica." },
  { num: "03", title: "Execução", desc: "Acompanhamento constante com correção em tempo real." },
  { num: "04", title: "Ajustes", desc: "Revisão periódica para evolução contínua e segura." },
];

const areas = [
  {
    title: "Hipertrofia",
    desc: "Ganho de massa muscular com periodização inteligente e volume progressivo.",
    msg: "Olá, Kléby! Quero saber sobre treino de Hipertrofia.",
  },
  {
    title: "Emagrecimento",
    desc: "Perda de gordura com saúde, sem dietas extremas. Treino + hábitos.",
    msg: "Olá, Kléby! Quero saber sobre treino para Emagrecimento.",
  },
  {
    title: "Consultoria Online",
    desc: "Planilha personalizada, vídeos de execução e suporte remoto.",
    msg: "Olá, Kléby! Tenho interesse na Consultoria Online.",
  },
];

const resultados = [
  { label: "Evolução Física", valor: "+100", sub: "alunos acompanhados" },
  { label: "Constância", valor: "95%", sub: "taxa de retenção" },
  { label: "Experiência", valor: "+5", sub: "anos de atuação" },
];

const depoimentos = [
  { nome: "Ana S.", texto: "Em 6 meses, transformei meu corpo e minha relação com o exercício." },
  { nome: "Rafael M.", texto: "Nunca tive tanta consistência. O acompanhamento faz toda a diferença." },
  { nome: "Juliana C.", texto: "Treino que cabe na minha rotina e resultados que eu nunca imaginei." },
];

/* ── Area item (interactive list) ── */
function AreaItem({ item }: { item: typeof areas[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-border/50 cursor-pointer group"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5 md:py-6">
        <span className="text-title group-hover:text-primary transition-colors duration-200">
          {item.title}
        </span>
        <ChevronRight
          size={16}
          className={cn(
            "text-muted-foreground transition-transform duration-300",
            open && "rotate-90"
          )}
        />
      </div>
      <div className={cn(
        "overflow-hidden transition-all duration-400",
        open ? "max-h-40 pb-5" : "max-h-0"
      )}>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3 max-w-md">
          {item.desc}
        </p>
        <a
          href={`https://wa.me/5589988038518?text=${encodeURIComponent(item.msg)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-primary text-[13px] font-semibold hover:underline"
        >
          Começar →
        </a>
      </div>
    </div>
  );
}

/* ── Home ── */
const Home = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-lg"
            >
              <span className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground mb-5 block">
                Personal Trainer · Picos, PI
              </span>
              <h1 className="text-hero mb-5">
                Performance{" "}
                <span className="text-primary">com método.</span>
              </h1>
              <p className="text-muted-foreground text-[15px] md:text-base max-w-sm mb-8 leading-relaxed">
                Treinamento estratégico para evolução real.
              </p>
              <div className="flex items-center gap-3">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button className="font-semibold h-11 px-7 text-[13px] rounded-lg">
                    Iniciar Avaliação
                  </Button>
                </a>
                <Link to="/sobre">
                  <Button variant="outline" className="font-semibold h-11 px-7 text-[13px] rounded-lg">
                    Conhecer o método
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative hidden lg:flex justify-end"
            >
              <div className="w-full max-w-[420px] aspect-[3/4] rounded-2xl bg-card overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-3">
                    <User size={24} className="text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">Foto profissional</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard strip */}
      <div className="border-y border-border/50">
        <div className="container py-4 grid grid-cols-3 divide-x divide-border/50 text-center">
          {["Acompanhamento personalizado", "Ajustes semanais", "Evolução contínua"].map((t) => (
            <div key={t} className="px-2">
              <span className="text-[12px] md:text-[13px] text-muted-foreground font-medium">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* O Método — timeline vertical */}
      <Section>
        <SectionLabel>O Método</SectionLabel>
        <SectionTitle>Como funciona</SectionTitle>
        <SectionSubtitle className="mb-12">
          Um sistema claro de evolução, do primeiro treino ao resultado.
        </SectionSubtitle>
        <div className="max-w-lg space-y-0">
          {metodo.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-5 py-6 border-b border-border/40 last:border-0"
            >
              <span className="text-2xl md:text-3xl font-bold text-primary/20 leading-none pt-0.5 select-none">
                {item.num}
              </span>
              <div>
                <h3 className="text-base font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Áreas de Atuação — interactive list */}
      <Section className="border-t border-border/40">
        <SectionLabel>Áreas de Atuação</SectionLabel>
        <SectionTitle>Escolha sua evolução</SectionTitle>
        <SectionSubtitle className="mb-10">
          Cada objetivo exige uma estratégia diferente.
        </SectionSubtitle>
        <div className="max-w-lg">
          {areas.map((a, i) => (
            <AreaItem key={i} item={a} />
          ))}
        </div>
        <div className="mt-8">
          <Link to="/servicos" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border hover:decoration-foreground">
            Ver todos os serviços →
          </Link>
        </div>
      </Section>

      {/* Resultados — data panel */}
      <Section className="border-t border-border/40">
        <SectionLabel>Resultados</SectionLabel>
        <SectionTitle>Dados de quem treina com método</SectionTitle>
        <div className="grid grid-cols-3 gap-4 mt-10 mb-14">
          {resultados.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card rounded-xl p-5 md:p-6"
            >
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">{r.valor}</p>
              <p className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground mb-0.5">{r.label}</p>
              <p className="text-xs text-muted-foreground/70">{r.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Depoimentos */}
        <div className="max-w-lg space-y-6">
          {depoimentos.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <p className="text-[15px] leading-relaxed text-foreground/90 mb-1.5">
                "{d.texto}"
              </p>
              <span className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground">
                {d.nome}
              </span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Final — impacto */}
      <section className="bg-foreground text-background">
        <div className="container py-20 md:py-28 text-center max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-headline tracking-tight mb-4">
              Comece agora.
            </h2>
            <p className="text-sm opacity-60 mb-8">
              Evolua com segurança e estratégia.
            </p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="font-semibold h-12 px-8 text-sm rounded-lg">
                Iniciar Avaliação
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;

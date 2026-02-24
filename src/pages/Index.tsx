import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section, SectionTitle, SectionSubtitle } from "@/components/Section";
import { WHATSAPP_LINK, INSTAGRAM_LINK } from "@/lib/constants";
import { Target, RefreshCw, TrendingUp, User, Monitor, ClipboardCheck, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const diferenciais = [
  { icon: Target, title: "Treino personalizado", desc: "Planejamento exclusivo para seu corpo e objetivo." },
  { icon: RefreshCw, title: "Acompanhamento e ajustes", desc: "Evolução contínua com revisão periódica do treino." },
  { icon: TrendingUp, title: "Evolução com constância", desc: "Método progressivo para resultados duradouros." },
];

const servicos = [
  { icon: User, title: "Personal Presencial", desc: "Treino presencial com acompanhamento direto." },
  { icon: Monitor, title: "Consultoria Online", desc: "Treino remoto com suporte completo." },
  { icon: ClipboardCheck, title: "Avaliação Física", desc: "Análise completa para medir sua evolução." },
  { icon: Calendar, title: "Periodização", desc: "Planejamento estratégico de longo prazo." },
];

const depoimentos = [
  { nome: "Ana S.", texto: "Em 6 meses, transformei meu corpo e minha relação com o exercício. O Kléby é excepcional." },
  { nome: "Rafael M.", texto: "O acompanhamento faz toda a diferença. Nunca tive tanta consistência nos treinos." },
  { nome: "Juliana C.", texto: "Treino que cabe na minha rotina e resultados que eu nunca imaginei alcançar." },
  { nome: "Pedro L.", texto: "Profissional sério, método claro e evolução visível a cada mês." },
];

const Home = () => {
  const [depIdx, setDepIdx] = useState(0);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container pt-12 pb-16 md:pt-24 md:pb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-primary font-heading text-sm font-semibold tracking-widest uppercase mb-4">
                Personal Trainer
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-[1.1] mb-6">
                Treino inteligente.{" "}
                <span className="text-primary">Resultado real.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
                Acompanhamento personalizado para evolução com segurança e constância. 
                Treino que cabe na sua rotina.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="rounded-full font-heading font-semibold w-full sm:w-auto">
                    Agendar Avaliação
                  </Button>
                </a>
                <Link to="/servicos">
                  <Button variant="outline" size="lg" className="rounded-full font-heading font-semibold w-full sm:w-auto">
                    Ver Serviços
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[4/5] max-w-md mx-auto md:ml-auto"
            >
              <div className="w-full h-full rounded-2xl bg-muted border border-border flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <User size={40} className="text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Foto profissional</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl bg-primary/10 -z-10" />
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-xl bg-primary/5 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <Section className="bg-muted/50">
        <SectionTitle>Por que treinar comigo</SectionTitle>
        <SectionSubtitle className="mb-12">
          Método, consistência e acompanhamento para você evoluir de verdade.
        </SectionSubtitle>
        <div className="grid sm:grid-cols-3 gap-6">
          {diferenciais.map((item, i) => (
            <Card key={i} className="border-0 shadow-none bg-background">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Serviços */}
      <Section>
        <SectionTitle>Serviços em destaque</SectionTitle>
        <SectionSubtitle className="mb-12">
          Soluções para diferentes objetivos e rotinas.
        </SectionSubtitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicos.map((item, i) => (
            <Card key={i} className="group hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/servicos">
            <Button variant="outline" className="rounded-full font-heading text-sm">
              Ver todos os serviços
            </Button>
          </Link>
        </div>
      </Section>

      {/* Depoimentos */}
      <Section className="bg-muted/50">
        <SectionTitle>O que dizem meus alunos</SectionTitle>
        <SectionSubtitle className="mb-12">
          Resultados reais de quem já treina com método.
        </SectionSubtitle>
        <div className="relative max-w-2xl mx-auto">
          <Card className="border-0 shadow-none bg-background">
            <CardContent className="p-8 text-center">
              <p className="text-lg leading-relaxed mb-6 italic text-foreground">
                "{depoimentos[depIdx].texto}"
              </p>
              <p className="font-heading font-semibold text-primary">
                {depoimentos[depIdx].nome}
              </p>
            </CardContent>
          </Card>
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => setDepIdx((prev) => (prev === 0 ? depoimentos.length - 1 : prev - 1))}
              className="p-2 rounded-full border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setDepIdx((prev) => (prev === depoimentos.length - 1 ? 0 : prev + 1))}
              className="p-2 rounded-full border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Section>

      {/* CTA Final */}
      <Section>
        <div className="text-center max-w-xl mx-auto">
          <SectionTitle className="text-center">Pronto(a) para começar?</SectionTitle>
          <p className="text-muted-foreground text-lg mb-8">
            Evolua com segurança e estratégia. Vamos conversar sobre seu objetivo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full font-heading font-semibold w-full sm:w-auto">
                Falar no WhatsApp
              </Button>
            </a>
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="rounded-full font-heading font-semibold w-full sm:w-auto">
                Seguir no Instagram
              </Button>
            </a>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Home;

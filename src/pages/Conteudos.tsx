import { useState } from "react";
import { Link } from "react-router-dom";
import { Section, SectionTitle, SectionSubtitle } from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export interface BlogPost {
  slug: string;
  title: string;
  resumo: string;
  categoria: string;
  data: string;
  conteudo: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "como-manter-consistencia-no-treino",
    title: "Como manter a consistência no treino",
    resumo: "Dicas práticas para não abandonar o treino depois das primeiras semanas.",
    categoria: "Rotina",
    data: "2026-02-10",
    conteudo: "A consistência é o fator mais importante para resultados duradouros. Muitas pessoas começam com motivação alta, mas sem um plano realista, acabam desistindo. Aqui vão 5 estratégias que uso com meus alunos:\n\n1. **Comece com o mínimo viável** – Melhor treinar 20 min do que não treinar.\n2. **Planeje a semana** – Defina dias e horários fixos.\n3. **Tenha um parceiro ou profissional** – Compromisso externo ajuda.\n4. **Registre seu progresso** – Ver evolução motiva.\n5. **Aceite dias ruins** – Treino feito é treino contado.",
  },
  {
    slug: "treino-em-casa-funciona",
    title: "Treino em casa funciona?",
    resumo: "Entenda quando o treino em casa pode ser eficiente e quando não é a melhor opção.",
    categoria: "Treino",
    data: "2026-01-25",
    conteudo: "Sim, treino em casa pode funcionar — mas depende do objetivo, dos equipamentos e do acompanhamento. Para iniciantes e para quem busca saúde e condicionamento, é uma boa opção com a orientação certa. Já para hipertrofia avançada, a academia oferece mais recursos.\n\nO mais importante é ter um plano personalizado e progressivo, independente do local.",
  },
  {
    slug: "alimentacao-e-treino",
    title: "Alimentação e treino: o que priorizar",
    resumo: "Sem dieta maluca, sem suplemento milagroso. O básico bem feito funciona.",
    categoria: "Nutrição",
    data: "2026-01-12",
    conteudo: "Não existe treino que compense uma alimentação ruim, mas também não precisa de dietas radicais. Priorize:\n\n- **Proteínas** em todas as refeições\n- **Carboidratos** adequados ao seu nível de atividade\n- **Hidratação** constante\n- **Sono de qualidade**\n\nSuplementos podem ajudar, mas são o último passo, não o primeiro.",
  },
  {
    slug: "motivacao-vs-disciplina",
    title: "Motivação vs Disciplina",
    resumo: "Por que depender de motivação é uma armadilha. Disciplina é o caminho.",
    categoria: "Motivação",
    data: "2025-12-28",
    conteudo: "Motivação é um sentimento. Ela vai e volta. Disciplina é decisão — e é o que sustenta qualquer resultado de longo prazo. Crie hábitos, não dependa de vontade. Nos dias sem motivação, a rotina te carrega.",
  },
];

const categorias = ["Todos", "Treino", "Nutrição", "Rotina", "Motivação"];

const Conteudos = () => {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");

  const filtered = blogPosts.filter((post) => {
    const matchBusca =
      post.title.toLowerCase().includes(busca.toLowerCase()) ||
      post.resumo.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoria === "Todos" || post.categoria === categoria;
    return matchBusca && matchCategoria;
  });

  return (
    <Section>
      <SectionTitle>Conteúdos</SectionTitle>
      <SectionSubtitle className="mb-8">
        Artigos sobre treino, nutrição, rotina e mindset para sua evolução.
      </SectionSubtitle>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar artigo..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categorias.map((cat) => (
            <Button
              key={cat}
              variant={categoria === cat ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs font-heading"
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="grid sm:grid-cols-2 gap-6">
        {filtered.map((post) => (
          <Link key={post.slug} to={`/conteudos/${post.slug}`}>
            <Card className="h-full hover:border-primary/30 transition-colors group">
              <CardContent className="p-6">
                <span className="text-xs text-primary font-heading font-semibold uppercase tracking-wider">
                  {post.categoria}
                </span>
                <h3 className="font-heading font-semibold text-lg mt-2 mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {post.resumo}
                </p>
                <span className="text-xs text-muted-foreground">{post.data}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          Nenhum artigo encontrado.
        </p>
      )}
    </Section>
  );
};

export default Conteudos;

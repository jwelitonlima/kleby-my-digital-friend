import { useState } from "react";
import { Link } from "react-router-dom";
import { Section, SectionLabel, SectionTitle, SectionSubtitle } from "@/components/Section";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <Section>
      <SectionLabel>Conteúdos</SectionLabel>
      <SectionTitle>Artigos e reflexões</SectionTitle>
      <SectionSubtitle className="mb-10">
        Treino, nutrição, rotina e mindset para sua evolução.
      </SectionSubtitle>

      <div className="flex flex-col sm:flex-row gap-4 mb-12 border-b border-border/50 pb-5">
        <Input
          placeholder="Buscar artigo..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="max-w-xs rounded-md border-border/60 text-sm h-10"
        />
        <div className="flex gap-3 flex-wrap">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={cn(
                "text-[13px] font-medium transition-colors pb-0.5",
                categoria === cat
                  ? "text-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {featured && (
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Link to={`/conteudos/${featured.slug}`} className="lg:col-span-2 group">
            <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center mb-5">
              <p className="text-xs text-muted-foreground">Imagem de capa</p>
            </div>
            <span className="text-[11px] font-semibold tracking-label uppercase text-primary">
              {featured.categoria}
            </span>
            <h3 className="text-xl md:text-2xl font-bold mt-2 mb-2 group-hover:text-primary transition-colors duration-200">
              {featured.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">{featured.resumo}</p>
            <span className="text-[12px] text-muted-foreground/60 mt-3 block">{featured.data}</span>
          </Link>

          <div className="space-y-0">
            {rest.map((post) => (
              <Link
                key={post.slug}
                to={`/conteudos/${post.slug}`}
                className="block py-5 border-b border-border/40 last:border-b-0 group"
              >
                <span className="text-[11px] font-semibold tracking-label uppercase text-primary/60">
                  {post.categoria}
                </span>
                <h4 className="text-base font-semibold mt-1 mb-1 group-hover:text-primary transition-colors duration-200">
                  {post.title}
                </h4>
                <p className="text-[13px] text-muted-foreground line-clamp-2">{post.resumo}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-16 text-sm">
          Nenhum artigo encontrado.
        </p>
      )}
    </Section>
  );
};

export default Conteudos;

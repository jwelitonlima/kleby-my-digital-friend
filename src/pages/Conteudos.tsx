import { useState } from "react";
import { Link } from "react-router-dom";
import { Section, SectionLabel, SectionTitle, SectionSubtitle } from "@/components/Section";
import { cn } from "@/lib/utils";
import { useSiteContent, parseJson } from "@/hooks/use-site-content";

export interface BlogPost {
  slug: string;
  title: string;
  resumo: string;
  categoria: string;
  data: string;
  conteudo: string;
}

const defaultPosts: BlogPost[] = [
  { slug: "como-manter-consistencia-no-treino", title: "Como manter a consistência no treino", resumo: "Dicas práticas para não abandonar o treino depois das primeiras semanas.", categoria: "Rotina", data: "2026-02-10", conteudo: "" },
  { slug: "treino-em-casa-funciona", title: "Treino em casa funciona?", resumo: "Entenda quando o treino em casa pode ser eficiente.", categoria: "Treino", data: "2026-01-25", conteudo: "" },
  { slug: "alimentacao-e-treino", title: "Alimentação e treino: o que priorizar", resumo: "Sem dieta maluca, sem suplemento milagroso. O básico bem feito funciona.", categoria: "Nutrição", data: "2026-01-12", conteudo: "" },
  { slug: "motivacao-vs-disciplina", title: "Motivação vs Disciplina", resumo: "Por que depender de motivação é uma armadilha.", categoria: "Motivação", data: "2025-12-28", conteudo: "" },
];

const Conteudos = () => {
  const { data: c } = useSiteContent();
  const blogPosts = parseJson<BlogPost[]>(c, "blog_posts", defaultPosts);
  
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");

  const categorias = ["Todos", ...Array.from(new Set(blogPosts.map(p => p.categoria)))];

  const filtered = blogPosts.filter((post) => {
    const matchBusca = post.title.toLowerCase().includes(busca.toLowerCase()) || post.resumo.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoria === "Todos" || post.categoria === categoria;
    return matchBusca && matchCategoria;
  });

  return (
    <Section>
      <SectionLabel>Conteúdos</SectionLabel>
      <SectionTitle>Artigos e reflexões</SectionTitle>
      <SectionSubtitle className="mb-6 md:mb-8">Treino, nutrição, rotina e mindset.</SectionSubtitle>

      {/* Search + filters */}
      <div className="flex flex-col gap-3 mb-8 md:mb-10 border-b border-border/40 pb-4">
        <input
          placeholder="Buscar..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full md:max-w-[200px] bg-muted/50 rounded-2xl md:rounded-lg px-4 py-3 md:py-2 text-[16px] md:text-sm text-foreground border border-transparent outline-none focus:border-primary/30 transition-colors min-h-[48px] md:min-h-0 md:h-9 placeholder:text-muted-foreground"
        />
        <div className="flex gap-2 flex-wrap -mx-1">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={cn(
                "text-[13px] md:text-[12px] font-medium px-4 md:px-3 py-2 md:py-1 rounded-2xl md:rounded-lg transition-colors active:scale-[0.97] min-h-[40px] md:min-h-0",
                categoria === cat ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-0 max-w-lg">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            to={`/conteudos/${post.slug}`}
            className="block py-5 md:py-4 border-b border-border/30 last:border-0 group active:bg-muted/30 -mx-4 px-4 md:mx-0 md:px-0 rounded-xl md:rounded-none transition-colors"
          >
            <div className="flex items-center gap-2 mb-1.5 md:mb-1">
              <span className="text-[11px] md:text-[10px] font-semibold tracking-label uppercase text-primary">{post.categoria}</span>
              <span className="text-[11px] md:text-[10px] text-muted-foreground/50">{post.data}</span>
            </div>
            <h3 className="text-[16px] md:text-base font-semibold group-hover:text-primary transition-colors duration-200 mb-1">{post.title}</h3>
            <p className="text-[14px] md:text-[13px] text-muted-foreground line-clamp-2 md:line-clamp-1">{post.resumo}</p>
          </Link>
        ))}
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-12 text-[14px] md:text-sm">Nenhum artigo encontrado.</p>}
      </div>
    </Section>
  );
};

export default Conteudos;

import { useState } from "react";
import { Link } from "react-router-dom";
import { Section, SectionLabel, SectionTitle, SectionSubtitle } from "@/components/Section";
import { Input } from "@/components/ui/input";
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
      <SectionSubtitle className="mb-8">Treino, nutrição, rotina e mindset.</SectionSubtitle>

      <div className="flex flex-col sm:flex-row gap-3 mb-10 border-b border-border/40 pb-4">
        <Input placeholder="Buscar..." value={busca} onChange={(e) => setBusca(e.target.value)} className="max-w-[200px] rounded-lg border-border/50 text-sm h-9" />
        <div className="flex gap-2 flex-wrap">
          {categorias.map((cat) => (
            <button key={cat} className={cn("text-[12px] font-medium px-3 py-1 rounded-lg transition-colors", categoria === cat ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent")} onClick={() => setCategoria(cat)}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-0 max-w-lg">
        {filtered.map((post) => (
          <Link key={post.slug} to={`/conteudos/${post.slug}`} className="block py-4 border-b border-border/30 last:border-0 group">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-semibold tracking-label uppercase text-primary">{post.categoria}</span>
              <span className="text-[10px] text-muted-foreground/50">{post.data}</span>
            </div>
            <h3 className="text-base font-semibold group-hover:text-primary transition-colors duration-200 mb-0.5">{post.title}</h3>
            <p className="text-[13px] text-muted-foreground line-clamp-1">{post.resumo}</p>
          </Link>
        ))}
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-12 text-sm">Nenhum artigo encontrado.</p>}
      </div>
    </Section>
  );
};

export default Conteudos;

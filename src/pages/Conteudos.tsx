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
  { slug: "como-manter-consistencia-no-treino", title: "Como manter a consistência no treino", resumo: "Dicas práticas para não abandonar o treino depois das primeiras semanas.", categoria: "Rotina", data: "2026-02-10", conteudo: "A consistência é o fator mais importante para resultados duradouros. Muitas pessoas começam com motivação alta, mas sem um plano realista, acabam desistindo. Aqui vão 5 estratégias que uso com meus alunos:\n\n1. **Comece com o mínimo viável** – Melhor treinar 20 min do que não treinar.\n2. **Planeje a semana** – Defina dias e horários fixos.\n3. **Tenha um parceiro ou profissional** – Compromisso externo ajuda.\n4. **Registre seu progresso** – Ver evolução motiva.\n5. **Aceite dias ruins** – Treino feito é treino contado." },
  { slug: "treino-em-casa-funciona", title: "Treino em casa funciona?", resumo: "Entenda quando o treino em casa pode ser eficiente.", categoria: "Treino", data: "2026-01-25", conteudo: "Sim, treino em casa pode funcionar — mas depende do objetivo, dos equipamentos e do acompanhamento. Para iniciantes e para quem busca saúde e condicionamento, é uma boa opção com a orientação certa. Já para hipertrofia avançada, a academia oferece mais recursos.\n\nO mais importante é ter um plano personalizado e progressivo, independente do local." },
  { slug: "alimentacao-e-treino", title: "Alimentação e treino: o que priorizar", resumo: "Sem dieta maluca, sem suplemento milagroso. O básico bem feito funciona.", categoria: "Nutrição", data: "2026-01-12", conteudo: "Não existe treino que compense uma alimentação ruim, mas também não precisa de dietas radicais. Priorize:\n\n- **Proteínas** em todas as refeições\n- **Carboidratos** adequados ao seu nível de atividade\n- **Hidratação** constante\n- **Sono de qualidade**\n\nSuplementos podem ajudar, mas são o último passo, não o primeiro." },
  { slug: "motivacao-vs-disciplina", title: "Motivação vs Disciplina", resumo: "Por que depender de motivação é uma armadilha.", categoria: "Motivação", data: "2025-12-28", conteudo: "Motivação é um sentimento. Ela vai e volta. Disciplina é decisão — e é o que sustenta qualquer resultado de longo prazo. Crie hábitos, não dependa de vontade. Nos dias sem motivação, a rotina te carrega." },
];

const categorias = ["Todos", "Treino", "Nutrição", "Rotina", "Motivação"];

const Conteudos = () => {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");

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

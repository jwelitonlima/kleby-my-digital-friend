import { useParams, Link } from "react-router-dom";
import { blogPosts } from "./Conteudos";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Section>
        <p className="text-center text-muted-foreground">Artigo não encontrado.</p>
        <div className="text-center mt-4">
          <Link to="/conteudos">
            <Button variant="outline" className="rounded-full">Voltar</Button>
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="max-w-2xl mx-auto">
        <Link to="/conteudos" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft size={14} /> Voltar aos conteúdos
        </Link>

        <span className="text-xs text-primary font-heading font-semibold uppercase tracking-wider block mb-2">
          {post.categoria}
        </span>
        <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">
          {post.title}
        </h1>
        <p className="text-sm text-muted-foreground mb-8">{post.data}</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {post.conteudo.split("\n\n").map((p, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default BlogPost;

import { useParams, Link } from "react-router-dom";
import { blogPosts } from "./Conteudos";
import { Section } from "@/components/Section";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Section>
        <p className="text-center text-muted-foreground">Artigo não encontrado.</p>
        <div className="text-center mt-6">
          <Link
            to="/conteudos"
            className="text-sm text-muted-foreground hover:text-foreground border-b border-muted-foreground/30 pb-0.5 transition-colors"
          >
            ← Voltar aos conteúdos
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="max-w-2xl mx-auto">
        <Link
          to="/conteudos"
          className="text-[13px] text-muted-foreground hover:text-foreground border-b border-muted-foreground/30 hover:border-foreground pb-0.5 transition-colors mb-12 inline-block"
        >
          ← Voltar aos conteúdos
        </Link>

        <span className="text-[11px] font-body font-medium tracking-label uppercase text-primary block mb-4">
          {post.categoria}
        </span>
        <h1 className="text-display-sm font-heading font-light tracking-tight mb-4">
          {post.title}
        </h1>
        <p className="text-[13px] text-muted-foreground mb-12">{post.data}</p>

        <div className="space-y-5">
          {post.conteudo.split("\n\n").map((p, i) => (
            <p
              key={i}
              className="text-[15px] text-muted-foreground leading-[1.8]"
              dangerouslySetInnerHTML={{
                __html: p.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="text-foreground font-medium">$1</strong>'
                ),
              }}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default BlogPost;
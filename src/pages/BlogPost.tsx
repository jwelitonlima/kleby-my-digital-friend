import { useParams, Link } from "react-router-dom";
import { Section } from "@/components/Section";
import { useSiteContent, parseJson } from "@/hooks/use-site-content";
import type { BlogPost as BlogPostType } from "./Conteudos";

const BlogPost = () => {
  const { slug } = useParams();
  const { data: c } = useSiteContent();
  const blogPosts = parseJson<BlogPostType[]>(c, "blog_posts", []);
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Section>
        <p className="text-center text-muted-foreground text-[15px]">Artigo não encontrado.</p>
        <div className="text-center mt-4">
          <Link to="/conteudos" className="text-[14px] text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors py-2 inline-block">← Voltar</Link>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="max-w-xl mx-auto">
        <Link to="/conteudos" className="text-[14px] md:text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors mb-6 md:mb-8 inline-block py-1">← Voltar</Link>
        <span className="text-[11px] md:text-[10px] font-semibold tracking-label uppercase text-primary block mb-3">{post.categoria}</span>
        <h1 className="text-headline tracking-tight mb-3">{post.title}</h1>
        <p className="text-[14px] md:text-[13px] text-muted-foreground mb-8">{post.data}</p>
        <div className="space-y-4">
          {post.conteudo.split("\n\n").map((p, i) => (
            <p key={i} className="text-[16px] md:text-[15px] text-muted-foreground leading-[1.8] md:leading-[1.75]" dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>') }} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default BlogPost;

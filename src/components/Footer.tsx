import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { WHATSAPP_LINK, INSTAGRAM_LINK, EMAIL } from "@/lib/constants";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

export function Footer() {
  const { theme } = useTheme();
  return (
    <footer className="border-t border-border/40">
      <div className="container py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img src={theme === "dark" ? logoDark : logoLight} alt="Kléby Almeida" className="h-6 w-auto mb-3" />
            <p className="text-[13px] text-muted-foreground leading-relaxed max-w-xs">
              Treinamento estratégico para evolução real.
            </p>
          </div>
          <div>
            <span className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground/50 block mb-3">Navegação</span>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Início", path: "/" },
                { label: "Método", path: "/sobre" },
                { label: "Serviços", path: "/servicos" },
                { label: "Planos", path: "/planos" },
                { label: "Contato", path: "/contato" },
              ].map((item) => (
                <Link key={item.path} to={item.path} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">{item.label}</Link>
              ))}
            </nav>
          </div>
          <div>
            <span className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground/50 block mb-3">Contato</span>
            <div className="flex flex-col gap-2">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">WhatsApp</a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
              <a href={`mailto:${EMAIL}`} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">{EMAIL}</a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-4 border-t border-border/30 text-[11px] text-muted-foreground/40">
          © {new Date().getFullYear()} Kléby Almeida Personal Trainer
        </div>
      </div>
    </footer>
  );
}

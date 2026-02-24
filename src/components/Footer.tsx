import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { WHATSAPP_LINK, INSTAGRAM_LINK, EMAIL } from "@/lib/constants";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

export function Footer() {
  const { theme } = useTheme();
  return (
    <footer className="border-t border-border/40">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <img
              src={theme === "dark" ? logoDark : logoLight}
              alt="Kléby Almeida"
              className="h-8 w-auto mb-4"
            />
            <p className="text-[13px] text-muted-foreground leading-relaxed max-w-xs">
              Método, consistência e acompanhamento.
              <br />
              Evolua com segurança e estratégia.
            </p>
          </div>

          {/* Links */}
          <div>
            <span className="text-[11px] font-body font-medium tracking-label uppercase text-muted-foreground/60 block mb-5">
              Navegação
            </span>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Início", path: "/" },
                { label: "Método", path: "/sobre" },
                { label: "Serviços", path: "/servicos" },
                { label: "Planos", path: "/planos" },
                { label: "Contato", path: "/contato" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <span className="text-[11px] font-body font-medium tracking-label uppercase text-muted-foreground/60 block mb-5">
              Contato
            </span>
            <div className="flex flex-col gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
              >
                Instagram
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border/30 text-[11px] text-muted-foreground/50">
          © {new Date().getFullYear()} Kléby Almeida Personal Trainer
        </div>
      </div>
    </footer>
  );
}
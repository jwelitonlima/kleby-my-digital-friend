import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { WHATSAPP_LINK, INSTAGRAM_LINK, EMAIL } from "@/lib/constants";
import { useSiteContent } from "@/hooks/use-site-content";
import logoDark from "@/assets/logo-dark.svg";
import logoLight from "@/assets/logo-light.svg";

export function Footer() {
  const { theme } = useTheme();
  const { data: c } = useSiteContent();

  const whatsappLink = c
    ? `https://wa.me/${c.whatsapp_number}?text=${encodeURIComponent(c.whatsapp_message)}`
    : WHATSAPP_LINK;
  const instagramLink = c?.instagram_link ?? INSTAGRAM_LINK;
  const email = c?.email ?? EMAIL;
  const cref = c?.cref ?? "000849-G/PI";

  const navItems = [
    { label: "Início", path: "/" },
    { label: "Método", path: "/sobre" },
    { label: "Serviços", path: "/servicos" },
    { label: "Planos", path: "/planos" },
    { label: "Contato", path: "/contato" },
  ];

  return (
    <footer className="border-t border-border/40">
      <div className="container py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div>
            <img src={theme === "dark" ? logoDark : logoLight} alt="Kléby Almeida" className="h-[80px] md:h-[100px] w-auto mb-4" />
            <p className="text-[14px] md:text-[13px] text-muted-foreground leading-relaxed max-w-xs">
              {c?.footer_desc ?? 'Treinamento estratégico para evolução real.'}
            </p>
          </div>
          <div>
            <span className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground/50 block mb-4 md:mb-3">Navegação</span>
            <nav className="flex flex-col gap-0 md:gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-[15px] md:text-[13px] text-muted-foreground hover:text-foreground active:text-foreground transition-colors py-2 md:py-0"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <span className="text-[11px] font-semibold tracking-label uppercase text-muted-foreground/50 block mb-4 md:mb-3">Contato</span>
            <div className="flex flex-col gap-0 md:gap-2">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-[15px] md:text-[13px] text-muted-foreground hover:text-foreground active:text-foreground transition-colors py-2 md:py-0">WhatsApp</a>
              <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="text-[15px] md:text-[13px] text-muted-foreground hover:text-foreground active:text-foreground transition-colors py-2 md:py-0">Instagram</a>
              <a href={`mailto:${email}`} className="text-[15px] md:text-[13px] text-muted-foreground hover:text-foreground active:text-foreground transition-colors py-2 md:py-0">{email}</a>
            </div>
          </div>
        </div>
        <div className="mt-10 md:mt-10 pt-4 border-t border-border/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-muted-foreground/40">
          <span>© {new Date().getFullYear()} Kléby Almeida Personal Trainer</span>
          <div className="flex items-center gap-3">
            <span>CREF {cref}</span>
            <Link to="/admin/login" className="hover:text-muted-foreground transition-colors p-1">·</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

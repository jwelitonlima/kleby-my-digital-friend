import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK } from "@/lib/constants";
import { cn } from "@/lib/utils";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

const navItems = [
  { label: "Início", path: "/" },
  { label: "Método", path: "/sobre" },
  { label: "Serviços", path: "/servicos" },
  { label: "Resultados", path: "/resultados" },
  { label: "Planos", path: "/planos" },
  { label: "Conteúdos", path: "/conteudos" },
  { label: "Contato", path: "/contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/40"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center relative z-50">
          <img
            src={theme === "dark" ? logoDark : logoLight}
            alt="Kléby Almeida Personal Trainer"
            className="h-8 md:h-9 w-auto"
          />
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-[13px] font-body font-medium tracking-wide transition-colors relative group",
                location.pathname === item.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300",
                  location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 relative z-50">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Alternar tema"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hidden md:block">
            <Button size="sm" className="rounded-none text-xs font-body font-medium tracking-wide h-9 px-5">
              Agendar Avaliação
            </Button>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-foreground relative w-8 h-8 flex flex-col items-center justify-center"
            aria-label="Menu"
          >
            <span
              className={cn(
                "block w-5 h-px bg-current transition-all duration-300 absolute",
                open ? "rotate-45" : "-translate-y-1.5"
              )}
            />
            <span
              className={cn(
                "block w-5 h-px bg-current transition-all duration-300",
                open ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              className={cn(
                "block w-5 h-px bg-current transition-all duration-300 absolute",
                open ? "-rotate-45" : "translate-y-1.5"
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-background z-40 flex flex-col justify-center transition-all duration-500",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="container flex flex-col gap-1">
          {navItems.map((item, i) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={cn(
                "text-3xl font-heading font-light py-3 border-b border-border/30 transition-all duration-300",
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                location.pathname === item.path ? "text-primary" : "text-foreground"
              )}
              style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-8">
            <Button className="w-full rounded-none font-body font-medium tracking-wide h-12">
              Agendar Avaliação
            </Button>
          </a>
        </nav>
      </div>
    </header>
  );
}
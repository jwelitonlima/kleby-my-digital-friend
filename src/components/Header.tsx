import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Início", path: "/" },
  { label: "Sobre", path: "/sobre" },
  { label: "Serviços", path: "/servicos" },
  { label: "Resultados", path: "/resultados" },
  { label: "Planos", path: "/planos" },
  { label: "Conteúdos", path: "/conteudos" },
  { label: "Contato", path: "/contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl tracking-tight">
          <span className="text-primary">K</span>
          <span className="hidden sm:inline">Kléby Almeida</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary",
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Alternar tema"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hidden md:block">
            <Button size="sm" className="rounded-full font-heading text-xs font-semibold">
              Agendar Avaliação
            </Button>
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background z-40 animate-fade-up">
          <nav className="flex flex-col p-6 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-4 py-3 text-lg font-heading font-medium rounded-lg transition-colors",
                  location.pathname === item.path
                    ? "text-primary bg-primary/5"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-4">
              <Button className="w-full rounded-full font-heading font-semibold">
                Agendar Avaliação
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

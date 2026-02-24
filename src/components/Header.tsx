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
  { label: "Resultados", path: "/resultados" },
  { label: "Contato", path: "/contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/40"
          : "bg-transparent"
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="container flex items-center justify-between h-11 md:h-14">
        <Link to="/" className="flex items-center relative z-50">
          <img
            src={theme === "dark" ? logoDark : logoLight}
            alt="Kléby Almeida"
            className="h-5 md:h-7 w-auto"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-[12px] tracking-wide transition-colors",
                location.pathname === item.path
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground font-normal hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 relative z-50">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
            aria-label="Alternar tema"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hidden md:block">
            <Button size="sm" className="text-[12px] font-semibold h-8 px-4 rounded-lg">
              Iniciar Avaliação
            </Button>
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-foreground relative w-7 h-7 flex flex-col items-center justify-center"
            aria-label="Menu"
          >
            <span className={cn("block w-4 h-[1.5px] bg-current transition-all duration-200 absolute", open ? "rotate-45" : "-translate-y-1")} />
            <span className={cn("block w-4 h-[1.5px] bg-current transition-all duration-200", open ? "opacity-0" : "opacity-100")} />
            <span className={cn("block w-4 h-[1.5px] bg-current transition-all duration-200 absolute", open ? "-rotate-45" : "translate-y-1")} />
          </button>
        </div>
      </div>

      {/* Mobile fullscreen overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-[9999] bg-background flex flex-col"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          {/* Close bar */}
          <div className="flex items-center justify-between h-11 px-6">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center">
              <img
                src={theme === "dark" ? logoDark : logoLight}
                alt="Kléby Almeida"
                className="h-5 w-auto"
              />
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Alternar tema"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-foreground"
                aria-label="Fechar menu"
              >
                <span className="block w-4 h-[1.5px] bg-current rotate-45 absolute" />
                <span className="block w-4 h-[1.5px] bg-current -rotate-45" />
              </button>
            </div>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-6">
            {navItems.map((item, i) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-2xl font-semibold py-5 border-b border-border/30",
                  "animate-in fade-in slide-in-from-bottom-2",
                  location.pathname === item.path ? "text-primary" : "text-foreground"
                )}
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: "both" }}
              >
                {item.label}
              </Link>
            ))}
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-10">
              <Button className="w-full font-semibold h-14 rounded-2xl text-[15px] active:scale-[0.98] transition-transform">
                Iniciar Avaliação
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

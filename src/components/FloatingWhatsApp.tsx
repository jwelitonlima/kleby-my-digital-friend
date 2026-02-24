import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-primary text-primary-foreground rounded-xl shadow-md shadow-primary/10 hover:scale-105 active:scale-95 transition-transform duration-200"
      style={{
        bottom: "calc(20px + env(safe-area-inset-bottom))",
        right: "calc(20px + env(safe-area-inset-right))",
      }}
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={15} />
    </a>
  );
}

import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-transform md:bottom-6 md:right-6"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={16} />
    </a>
  );
}

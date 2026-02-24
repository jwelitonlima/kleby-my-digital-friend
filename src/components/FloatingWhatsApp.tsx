import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 bg-primary text-primary-foreground shadow-sm hover:scale-105 transition-transform md:bottom-8 md:right-8"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={18} />
    </a>
  );
}
import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/data/products";

const FloatingWhatsApp = () => {
  return (
    <a
      href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hello! I'd like to know more about your products.")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 bg-whatsapp text-primary-foreground px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-full shadow-xl font-heading font-bold text-xs sm:text-sm animate-pulse-glow hover:brightness-110 transition-all group whitespace-nowrap"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
      <span>Talk to Us</span>
    </a>
  );
};

export default FloatingWhatsApp;

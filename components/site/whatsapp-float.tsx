import { MessageCircle } from "lucide-react";
import { whatsappFor } from "@/lib/whatsapp";

/** Persistent mobile-friendly WhatsApp shortcut. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappFor("general")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-amber text-ink shadow-xl shadow-black/40 transition-transform hover:scale-105 sm:hidden"
      aria-label="Chat with Fresh Wind Music on WhatsApp (opens in a new tab)"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}

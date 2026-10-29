import { MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappFor, whatsappUrl, type WhatsAppTopic } from "@/lib/whatsapp";
import type { VariantProps } from "class-variance-authority";

interface Props extends VariantProps<typeof buttonVariants> {
  topic?: WhatsAppTopic;
  /** Overrides `topic` with a custom prefilled message */
  message?: string;
  children?: React.ReactNode;
  className?: string;
  icon?: boolean;
}

/** An <a> that opens WhatsApp with a prefilled message to the confirmed business number. */
export function WhatsAppButton({ topic = "general", message, children = "Enquire on WhatsApp", variant, size, className, icon = true }: Props) {
  return (
    <a
      href={message ? whatsappUrl(message) : whatsappFor(topic)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {icon && <MessageCircle aria-hidden="true" />}
      {children}
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </a>
  );
}

import { WhatsAppButton } from "./whatsapp-button";
import type { WhatsAppTopic } from "@/lib/whatsapp";
import { SiteImage } from "./site-image";

export function CtaBand({ title = "Let's Create Something Worth Listening To.", text = "Tell us about your project, your music or the lessons you are looking for. WhatsApp is the quickest way to reach us.", topic = "general", label = "Start a Conversation on WhatsApp" }: { title?: string; text?: string; topic?: WhatsAppTopic; label?: string }) {
  return (
    <section className="relative isolate overflow-hidden border-t border-line-soft">
      <div className="absolute inset-0 -z-10">
        <SiteImage name="consoleWide" sizes="100vw" alt="" />
        <div className="absolute inset-0 bg-ink/90" />
      </div>
      <div className="container-x py-24 text-center sm:py-32">
        <h2 className="display mx-auto max-w-3xl text-4xl sm:text-6xl">{title}</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">{text}</p>
        <div className="mt-10 flex justify-center">
          <WhatsAppButton topic={topic} size="lg">{label}</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

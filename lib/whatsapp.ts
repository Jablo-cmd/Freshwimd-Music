import { site } from "@/content/site";

export const whatsappMessages = {
  general: "Hello Fresh Wind Music, I would like to find out more about your services.",
  production: "Hello Fresh Wind Music, I would like to enquire about music production for a project.",
  mixingMastering: "Hello Fresh Wind Music, I would like to enquire about audio mixing and mastering.",
  recording: "Hello Fresh Wind Music, I would like to enquire about audio recording.",
  songwriting: "Hello Fresh Wind Music, I would like to discuss songwriting or composition services.",
  vocal: "Hello Fresh Wind Music, I would like to enquire about vocal coaching.",
  artistDevelopment: "Hello Fresh Wind Music, I would like to discuss artist development.",
  lessons: "Hello Fresh Wind Music, I would like to enquire about piano, keyboard or music production lessons.",
  lessonsGeneral: "Hello Fresh Wind Music, I would like to enquire about music lessons.",
  equipment: "Hello Fresh Wind Music, I would like advice on recommended music equipment.",
  featured: "Hello Fresh Wind Music, I would like to discuss a project and being featured on your website.",
} as const;

export type WhatsAppTopic = keyof typeof whatsappMessages;

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function whatsappFor(topic: WhatsAppTopic) {
  return whatsappUrl(whatsappMessages[topic]);
}

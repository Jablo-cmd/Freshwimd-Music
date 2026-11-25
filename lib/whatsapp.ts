import { site } from "@/content/site";

export const whatsappMessages = {
  general: "Hello Fresh Wind Music, I would like to find out more about your services.",
  production: "Hello Fresh Wind Music, I would like to enquire about music production for a project.",
  recordingProject: "Hello Fresh Wind Music, I would like to discuss a recording project.",
  album: "Hello Fresh Wind Music, I would like to enquire about recording a full album.",
  ep: "Hello Fresh Wind Music, I would like to enquire about recording an EP.",
  single: "Hello Fresh Wind Music, I would like to enquire about recording a single song.",
  choir: "Hello Fresh Wind Music, I would like to enquire about recording our choir.",
  schoolChoir: "Hello Fresh Wind Music, I would like to enquire about recording a school choir.",
  universityChoir: "Hello Fresh Wind Music, I would like to enquire about recording a university or college choir.",
  churchChoir: "Hello Fresh Wind Music, I would like to enquire about recording a church choir.",
  worshipTeam: "Hello Fresh Wind Music, I would like to enquire about recording a praise and worship team.",
  gospel: "Hello Fresh Wind Music, I would like to enquire about gospel recording and production.",
  jazz: "Hello Fresh Wind Music, I would like to enquire about jazz recording and production.",
  mixingMastering: "Hello Fresh Wind Music, I would like to enquire about audio mixing and mastering.",
  songwriting: "Hello Fresh Wind Music, I would like to discuss songwriting or composition services.",
  vocal: "Hello Fresh Wind Music, I would like to enquire about vocal coaching.",
  artistDevelopment: "Hello Fresh Wind Music, I would like to discuss artist development.",
  lessons: "Hello Fresh Wind Music, I would like to enquire about piano, keyboard or music production lessons.",
  lessonsGeneral: "Hello Fresh Wind Music, I would like to enquire about music lessons.",
  featured: "Hello Fresh Wind Music, I would like to discuss a project and being featured on your website.",
} as const;

export type WhatsAppTopic = keyof typeof whatsappMessages;

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function whatsappFor(topic: WhatsAppTopic) {
  return whatsappUrl(whatsappMessages[topic]);
}

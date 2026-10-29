import type { ImageKey } from "./images";
import type { WhatsAppTopic } from "@/lib/whatsapp";

export interface ServiceItem {
  label: string;
  /** Set to false to hide an offering until it is confirmed as available. Defaults to true. */
  confirmed?: boolean;
}

export interface Service {
  slug: string;
  title: string;
  icon: "music" | "sliders" | "pen" | "mic" | "compass" | "graduation";
  image: ImageKey;
  short: string;
  intro: string[];
  items: ServiceItem[];
  /** Explanatory callouts (e.g. mixing vs mastering) */
  callouts?: { title: string; text: string }[];
  process: { title: string; text: string }[];
  topic: WhatsAppTopic;
  /** Detail page for this offering. Education lives on its own page. */
  href: string;
  metaTitle: string;
  metaDescription: string;
}

const enquiryProcess = (first: string, delivery: string) => [
  { title: "Start a conversation", text: first },
  { title: "Define the scope", text: "We discuss your goals, references, timeline and what the project needs, then confirm what is involved and provide a quotation." },
  { title: "Create together", text: "Work begins, with open communication so the result stays true to your creative vision." },
  { title: "Review and refine", text: "You hear the work, share your feedback and we refine it together." },
  { title: "Deliver", text: delivery },
];

export const services: Service[] = [
  {
    slug: "music-production",
    title: "Music Production",
    icon: "music",
    image: "burgundyControlRoom",
    short: "From a first idea to a finished record — full production, beats, arrangements and creative direction.",
    intro: [
      "Production is where a song becomes a record. Fresh Wind Music works with independent artists and commercial projects to shape sound, arrangement and feel, from the first idea through to a finished production.",
      "Whether you arrive with a fully written song, a rough demo or only a concept, we help you find the sound that serves it.",
    ],
    items: [
      { label: "Full music production" },
      { label: "Instrumental and beat production" },
      { label: "Custom instrumental creation" },
      { label: "Music arrangement" },
      { label: "Keyboard and instrumental arrangements" },
      { label: "Song composition" },
      { label: "Creative production direction" },
      { label: "Production for independent artists" },
      { label: "Production for commercial projects" },
    ],
    process: enquiryProcess(
      "Message us on WhatsApp with a short description of your project and any reference tracks.",
      "Final files are prepared and delivered in the formats your release needs.",
    ),
    topic: "production",
    href: "/services/music-production",
    metaTitle: "Music Production Johannesburg",
    metaDescription:
      "Music production in Johannesburg: full production, custom instrumentals, beats and arrangements for independent artists and commercial projects. Enquire on WhatsApp.",
  },
  {
    slug: "audio-engineering",
    title: "Audio Engineering",
    icon: "sliders",
    image: "consoleWide",
    short: "Recording, editing, mixing and mastering — professional audio finishing that makes your music translate.",
    intro: [
      "Great songs deserve to be heard properly. Our audio engineering covers the full chain from capturing a performance to preparing the final master for release.",
      "Mixing and mastering are distinct disciplines, and understanding the difference helps you decide what your project needs.",
    ],
    items: [
      { label: "Audio recording" },
      { label: "Vocal recording" },
      { label: "Audio editing" },
      { label: "Vocal editing" },
      { label: "Audio mixing" },
      { label: "Audio mastering" },
      { label: "Vocal processing" },
      { label: "Audio enhancement" },
      { label: "Final audio preparation" },
    ],
    callouts: [
      {
        title: "Mixing",
        text: "Mixing balances every element of a song — vocals, instruments, effects — so each sits in the right place in level, tone and space. It happens before mastering and works on the individual tracks.",
      },
      {
        title: "Mastering",
        text: "Mastering is the final polish applied to the finished stereo mix. It ensures consistent tone and loudness and prepares the audio so it translates across speakers, headphones, streaming platforms and other formats.",
      },
      {
        title: "Why professional finishing matters",
        text: "Listeners rarely notice good mixing and mastering — but they feel it. A carefully finished record sounds clear, balanced and confident next to commercial releases, and that helps the music do what it was written to do.",
      },
    ],
    process: enquiryProcess(
      "Tell us what you have: recorded stems, a rough mix, or a song that still needs to be recorded.",
      "Mixes and masters are delivered in the formats you need for streaming, distribution or further use.",
    ),
    topic: "mixingMastering",
    href: "/services/audio-engineering",
    metaTitle: "Audio Mixing and Mastering Johannesburg",
    metaDescription:
      "Audio recording, vocal recording, editing, mixing and mastering in Johannesburg. Understand the difference between mixing and mastering and enquire on WhatsApp.",
  },
  {
    slug: "songwriting-composition",
    title: "Songwriting & Composition",
    icon: "pen",
    image: "producerSuiteKeys",
    short: "Lyrics, melodies, chord progressions and custom compositions — written alone or together.",
    intro: [
      "Every song starts somewhere: a lyric, a melody, a feeling. Fresh Wind Music helps you develop it into a complete song, or write something new alongside you.",
    ],
    items: [
      { label: "Songwriting" },
      { label: "Lyric development" },
      { label: "Melody creation" },
      { label: "Chord progressions" },
      { label: "Song composition" },
      { label: "Collaborative songwriting" },
      { label: "Musical arrangements" },
      { label: "Custom compositions" },
    ],
    process: enquiryProcess(
      "Share your idea — a few lines, a voice note, a mood or a reference — and what you would like to achieve.",
      "You receive the completed song material, ready for recording or production.",
    ),
    topic: "songwriting",
    href: "/services/songwriting-composition",
    metaTitle: "Songwriting Services Johannesburg",
    metaDescription:
      "Songwriting and composition in Johannesburg: lyric development, melody creation, chord progressions, collaborative songwriting and custom compositions.",
  },
  {
    slug: "vocal-services",
    title: "Vocal Services & Development",
    icon: "mic",
    image: "consolePortrait",
    short: "Vocal coaching, technique, pitch control, breathing and preparation for performing and recording.",
    intro: [
      "Your voice is your instrument. Vocal development focuses on technique, control and confidence — whether you are preparing to perform, to record, or simply to sing better.",
    ],
    items: [
      { label: "Vocal coaching" },
      { label: "Vocal technique development" },
      { label: "Pitch and vocal control" },
      { label: "Breathing techniques" },
      { label: "Performance preparation" },
      { label: "Recording preparation" },
      { label: "Vocal production support" },
    ],
    process: enquiryProcess(
      "Tell us about your voice, your experience and what you want to work towards.",
      "You leave with a clear understanding of what to practise and how to apply it in performance or in the recording booth.",
    ),
    topic: "vocal",
    href: "/services/vocal-services",
    metaTitle: "Vocal Coaching Johannesburg",
    metaDescription:
      "Vocal coaching and development in Johannesburg: technique, pitch and vocal control, breathing, performance preparation and recording preparation.",
  },
  {
    slug: "artist-development",
    title: "Artist Development",
    icon: "compass",
    image: "liveRoomInstruments",
    short: "Define your sound, repertoire and musical identity — with guidance through the production process.",
    intro: [
      "Developing as an artist is about more than making songs. We help you understand who you are musically, build repertoire that reflects it, and prepare to bring it into the studio with confidence.",
    ],
    items: [
      { label: "Sound development" },
      { label: "Creative direction" },
      { label: "Repertoire development" },
      { label: "Recording preparation" },
      { label: "Musical identity development" },
      { label: "Guidance through the production process" },
    ],
    process: enquiryProcess(
      "Tell us where you are on your journey and where you want to go.",
      "You have a clearer direction, stronger material and a plan for the next step in your music.",
    ),
    topic: "artistDevelopment",
    href: "/services/artist-development",
    metaTitle: "Artist Development and Music Production Services South Africa",
    metaDescription:
      "Artist development in Johannesburg: sound development, creative direction, repertoire and recording preparation for emerging and established South African artists.",
  },
  {
    slug: "music-education",
    title: "Music Education",
    icon: "graduation",
    image: "liveRoomPiano",
    short: "Piano, keyboard, music theory, practical musicianship, music production and DAW training.",
    intro: [
      "Fresh Wind Music teaches beginners and developing musicians. Lessons are arranged by enquiry so they can fit the student.",
    ],
    items: [
      { label: "Piano lessons" },
      { label: "Keyboard lessons" },
      { label: "Music theory" },
      { label: "Practical musicianship" },
      { label: "Beginner music education" },
      { label: "Music production lessons" },
      { label: "Digital Audio Workstation training" },
      { label: "Instrumental development" },
    ],
    process: [],
    topic: "lessons",
    href: "/music-lessons",
    metaTitle: "Music Lessons Johannesburg",
    metaDescription:
      "Piano, keyboard and music production lessons in Johannesburg for beginners and developing musicians.",
  },
];

export const visibleItems = (s: Service) => s.items.filter((i) => i.confirmed !== false);
export const getService = (slug: string) => services.find((s) => s.slug === slug);

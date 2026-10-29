/**
 * Central image registry. Every photograph used on the site is declared here once,
 * with accurate alt text. `source` records provenance:
 *  - "studio":    photographs of the working control room (owner to confirm)
 *  - "reference": third-party / unattributed imagery used for atmosphere only —
 *                 NOT presented as Fresh Wind Music's own facilities. Replace with
 *                 original photography or confirm licensing before launch.
 * See docs/ASSET_INVENTORY.md for the full inventory.
 */
export interface SiteImage {
  src: string;
  alt: string;
  position?: string; // CSS object-position
  source: "studio" | "reference";
}

export const images = {
  controlRoomSession: {
    src: "/images/site/control-room-session.jpg",
    alt: "Engineer working at a large-format mixing console in a dark, wood-panelled control room",
    position: "55% 50%",
    source: "studio",
  },
  consolePortrait: {
    src: "/images/site/console-portrait.jpg",
    alt: "Smiling producer seated at a large analogue mixing console with outboard processing behind",
    position: "50% 30%",
    source: "studio",
  },
  consoleWide: {
    src: "/images/site/console-wide.jpg",
    alt: "Wide view across a large mixing console with the engineer at work and acoustic panels behind",
    position: "50% 35%",
    source: "studio",
  },
  burgundyControlRoom: {
    src: "/images/site/burgundy-control-room.jpg",
    alt: "Mixing console, studio monitors and outboard racks in an acoustically treated control room",
    position: "50% 55%",
    source: "reference",
  },
  producerSuiteKeys: {
    src: "/images/site/producer-suite-keys.jpg",
    alt: "Keyboard workstation and studio monitors in a warmly lit producer suite",
    position: "50% 70%",
    source: "reference",
  },
  liveRoomInstruments: {
    src: "/images/site/live-room-instruments.jpg",
    alt: "Acoustic guitar, electric guitars, saxophone and keyboard in a warmly lit music room",
    position: "50% 50%",
    source: "reference",
  },
  liveRoomPiano: {
    src: "/images/site/live-room-grand-piano.jpg",
    alt: "Grand piano with bench in a wood-panelled live recording room",
    position: "65% 55%",
    source: "reference",
  },
  vintageControlRoom: {
    src: "/images/site/vintage-control-room.jpg",
    alt: "Large mixing console and monitor wall in a wood-and-fabric control room",
    position: "50% 60%",
    source: "reference",
  },
  outboardRack: {
    src: "/images/site/outboard-rack.jpg",
    alt: "Racks of outboard audio processing equipment in a wooden studio furniture unit",
    position: "50% 50%",
    source: "reference",
  },
  largeFormatConsole: {
    src: "/images/site/large-format-console.jpg",
    alt: "Receding view along a very large format mixing console",
    position: "50% 50%",
    source: "reference",
  },
  logoMark: {
    src: "/images/site/logo-mark.png",
    alt: "Fresh Wind Music emblem",
    source: "studio",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

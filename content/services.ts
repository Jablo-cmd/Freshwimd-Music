import type { ImageKey } from "./images";
import type { WhatsAppTopic } from "@/lib/whatsapp";

export interface ServiceItem {
  label: string;
  /** Set to false to hide an offering until it is confirmed as available. Defaults to true. */
  confirmed?: boolean;
}

export type ServiceGroup = "albums-eps" | "choirs" | "gospel-worship" | "singles-mixing" | "production-education";

/** Groups shown on /services, in display order */
export const serviceGroups: { id: ServiceGroup; title: string; text: string }[] = [
  { id: "albums-eps", title: "Albums & EPs", text: "Our flagship recording projects: full albums and focused EPs, planned and produced from first demo to final master." },
  { id: "choirs", title: "Choir recording", text: "Albums, EPs and selected songs for school, university, church and community choirs from across South Africa." },
  { id: "gospel-worship", title: "Gospel, worship & jazz", text: "Recording and production for gospel artists, praise and worship teams, and jazz musicians." },
  { id: "singles-mixing", title: "Single songs, mixing & mastering", text: "One song is always welcome. We also mix and master singles, EPs, albums and recordings made elsewhere." },
  { id: "production-education", title: "Production, songwriting & lessons", text: "Music production, songwriting, vocal development, artist development and music education." },
];

export interface ServiceSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Service {
  slug: string;
  title: string;
  group: ServiceGroup;
  icon: "music" | "sliders" | "pen" | "mic" | "compass" | "graduation" | "disc" | "users" | "church";
  image: ImageKey;
  short: string;
  intro: string[];
  items: ServiceItem[];
  /** Extra H2 sections: audiences, planning advice, how the project works */
  sections?: ServiceSection[];
  /** Explanatory callouts (e.g. mixing vs mastering) */
  callouts?: { title: string; text: string }[];
  process: { title: string; text: string }[];
  topic: WhatsAppTopic;
  /** Detail page for this offering. Education lives on its own page. */
  href: string;
  /** Shown in the home-page services grid (the rest are on /services) */
  featuredOnHome?: boolean;
  /** "Who this is for" — plain-language audiences */
  audience?: string[];
  faqs?: { q: string; a: string }[];
  /** Slugs of related services, linked as "Related recording services" */
  related?: string[];
  /** Slugs of guides in content/resources.ts */
  guides?: string[];
  /** Plain statement that separates the Johannesburg studio from the national audience */
  regionNote?: string;
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

/** The stages of a recording project, from first message to final masters */
const recordingProcess = (first: string, delivery: string) => [
  { title: "Start a conversation", text: first },
  { title: "Plan the project", text: "We discuss your songs or repertoire, the line-up, your timeline and what you want to achieve, then confirm what is involved and provide a quotation." },
  { title: "Record at the studio", text: "Recording takes place at our Johannesburg studio, planned around your project." },
  { title: "Edit, mix and master", text: "Takes are edited, each song is mixed, and the finished project is mastered so everything sounds polished and consistent." },
  { title: "Review and deliver", text: delivery },
];

export const services: Service[] = [
  {
    slug: "album-recording-production",
    title: "Album Recording & Production",
    group: "albums-eps",
    icon: "disc",
    image: "controlRoomSession",
    featuredOnHome: true,
    short: "Plan, record, mix and master a full album at our Johannesburg studio — from first demos to release-ready masters.",
    intro: [
      "An album is more than a collection of songs — it is a body of work. Fresh Wind Music records and produces full albums for independent artists, gospel artists, choirs, bands and ensembles, guiding the project from planning through to final masters so the songs sit together as one record.",
      "The studio is in Johannesburg, and artists and groups from across South Africa are welcome to enquire. Tell us about your project and we will discuss how to approach it.",
    ],
    items: [
      { label: "Album planning and song selection guidance" },
      { label: "Pre-production and arrangement" },
      { label: "Vocal and instrument recording" },
      { label: "Choir, group and band recording" },
      { label: "Editing of recorded takes" },
      { label: "Mixing every song on the album" },
      { label: "Mastering the album as one body of work" },
      { label: "Delivery of final masters in the agreed formats" },
    ],
    sections: [
      {
        heading: "Albums for every kind of artist",
        paragraphs: ["We welcome album projects across musical styles. The same careful approach applies whether you are a solo singer-songwriter or a forty-voice choir."],
        list: ["Independent and established recording artists", "Gospel artists, groups and collectives", "Church, school and university choirs", "Jazz and instrumental ensembles", "Bands and vocal groups"],
      },
      {
        heading: "Is your album project ready to start?",
        paragraphs: ["You do not need everything finalised, but a few answers help us plan well. When you enquire, it helps to know:"],
        list: ["How many songs you have in mind, and whether they are written, arranged or still demos", "Who is performing — a solo artist, a band, a choir or a mix", "What you want to do with the album once it is finished", "Your ideal timeline and any fixed dates, such as a launch or concert"],
      },
      {
        heading: "Not ready for a full album yet?",
        paragraphs: ["Many artists begin with a [single song](/services/single-song-recording) or an [EP](/services/ep-recording-production) and grow from there. Starting smaller is always welcome."],
      },
    ],
    audience: ["Solo artists releasing a debut or follow-up album", "Choirs and vocal groups preserving their repertoire", "Gospel artists and church music ministries", "Bands and instrumentalists recording a complete body of work"],
    process: recordingProcess(
      "Message us on WhatsApp about your album: the genre, the number of songs, who is performing and when you would like to begin.",
      "You receive the final mastered album, ready for release, in the formats agreed at the start.",
    ),
    related: ["ep-recording-production", "single-song-recording", "choir-recording-south-africa", "gospel-recording-production", "mixing-mastering"],
    guides: ["how-to-record-an-album", "ep-vs-album-vs-single"],
    faqs: [
      { q: "How many songs should an album have?", a: "That is your decision. We plan around the songs you have and the project you want to release, and can advise on sequencing and balance." },
      { q: "How long does an album take to record?", a: "It depends on the number of songs, the line-up and how prepared you are. We agree a realistic schedule with you when we plan the project." },
      { q: "How much does recording an album cost?", a: "Pricing is enquiry-based because it depends on the nature, scope and requirements of the project. We provide a quotation once we understand what you need." },
      { q: "Can I start with one song and build up to an album?", a: "Yes. Many projects begin with a single or an EP. Tell us your plans and we can structure the work in stages." },
      { q: "I am outside Johannesburg. Can I still record an album with you?", a: "Recording takes place at our studio in Johannesburg, and artists and groups from across South Africa are welcome to enquire. We will discuss how to plan the project around your location." },
    ],
    topic: "album",
    href: "/services/album-recording-production",
    metaTitle: "Album Recording & Production South Africa",
    metaDescription: "Record a full album in Johannesburg: planning, recording, mixing and mastering for artists, gospel acts, choirs and bands from across South Africa.",
  },
  {
    slug: "ep-recording-production",
    title: "EP Recording & Production",
    group: "albums-eps",
    icon: "disc",
    image: "consolePortrait",
    featuredOnHome: true,
    short: "Record a focused EP of three to six songs — a strong first release or a bold follow-up — in Johannesburg.",
    intro: [
      "An EP is a focused body of work: a handful of songs that introduce who you are, or show where you are going next. It is a practical way to release serious music without committing to a full album.",
      "Fresh Wind Music records and produces EPs for independent artists, gospel artists, choirs, jazz musicians, bands and school and university groups. Recording takes place at our Johannesburg studio, and clients from across South Africa are welcome to enquire.",
    ],
    items: [
      { label: "EP planning and song selection" },
      { label: "Pre-production and arrangement" },
      { label: "Vocal and instrument recording" },
      { label: "Editing of recorded takes" },
      { label: "Mixing every track" },
      { label: "Mastering the EP as a consistent release" },
      { label: "Delivery of final masters in the agreed formats" },
    ],
    sections: [
      {
        heading: "Why record an EP?",
        list: ["It gives you a complete release to share with audiences, promoters and your community", "It lets you invest in a few songs and make each one count", "It can be the first step towards a full album", "It suits choirs and groups who want to record selected repertoire"],
      },
      {
        heading: "EPs for different projects",
        paragraphs: ["The shape of an EP depends on who is making it. Some common projects:"],
        list: ["An independent artist's debut release", "A gospel or worship EP from a group or music ministry", "A jazz EP featuring original compositions or arrangements", "A school or university choir recording its selected repertoire"],
      },
    ],
    audience: ["Independent artists releasing their first body of work", "Gospel and worship artists and groups", "Jazz musicians and small ensembles", "Choirs and student groups recording selected songs"],
    process: recordingProcess(
      "Message us on WhatsApp with your EP idea: the number of songs, the style, who is performing and your timeline.",
      "You receive your mastered EP, ready for release, in the formats agreed at the start.",
    ),
    related: ["album-recording-production", "single-song-recording", "gospel-recording-production", "mixing-mastering", "school-choir-recording"],
    guides: ["what-to-know-before-recording-your-first-ep", "ep-vs-album-vs-single", "how-to-record-an-album"],
    faqs: [
      { q: "How many songs are on an EP?", a: "EPs are usually a small collection of songs, often three to six. The right number is whatever suits your project, and we can advise." },
      { q: "Can we record an EP and later turn it into an album?", a: "Yes. Many artists release an EP first and continue with an album. We can plan the work so the recordings fit together." },
      { q: "How much does EP recording cost?", a: "Pricing is enquiry-based and depends on the scope of the project. We provide a quotation once we understand what you need." },
      { q: "Do you record EPs for choirs and groups as well as solo artists?", a: "Yes. Tell us about your group and the songs you would like to record and we will discuss the best approach." },
    ],
    topic: "ep",
    href: "/services/ep-recording-production",
    metaTitle: "EP Recording & Production South Africa",
    metaDescription: "Record your EP in Johannesburg: planning, recording, mixing and mastering for independent artists, gospel acts, jazz musicians and choirs.",
  },
  {
    slug: "choir-recording-south-africa",
    title: "Choir Recording in South Africa",
    group: "choirs",
    icon: "users",
    image: "burgundyControlRoom",
    featuredOnHome: true,
    short: "Record your choir's album, EP or selected songs at our Johannesburg studio. Choirs from across South Africa are welcome.",
    intro: [
      "A choir is a living instrument, and a recording preserves what makes yours special. Fresh Wind Music records and produces choir albums, EPs and selected songs for choirs of every kind — school, university, church, gospel and community.",
      "Our studio is in Johannesburg, and we welcome choirs from across South Africa. We will talk through your repertoire, your numbers and your plans, and discuss how to approach the project.",
    ],
    items: [
      { label: "Choir album recording and production" },
      { label: "Choir EP recording" },
      { label: "Recording selected songs and repertoire" },
      { label: "Soloists and small ensembles within the choir" },
      { label: "Piano and instrumental accompaniment" },
      { label: "Editing, mixing and mastering choir recordings" },
      { label: "Delivery of final masters in the agreed formats" },
    ],
    sections: [
      {
        heading: "Choirs we welcome",
        paragraphs: ["Every choir has different needs, and we have a dedicated page for the groups that ask us most:"],
        list: ["[School choir recording](/services/school-choir-recording) for school choirs and music departments", "[University and college choir recording](/services/university-college-choir-recording) for student ensembles", "[Church choir recording](/services/church-choir-recording) for church and gospel choirs", "[Praise and worship team recording](/services/worship-team-recording) for worship leaders and music ministries", "Community, independent and professional vocal ensembles"],
      },
      {
        heading: "What a choir recording project involves",
        paragraphs: ["Every project is planned with you, but most follow the same shape:"],
        list: ["Planning: your repertoire, the number of singers, the voice parts and any soloists or instruments", "Preparation: rehearsing so the choir arrives confident with the songs", "Recording at the Johannesburg studio, planned around your group", "Editing, mixing and mastering so the recordings sound polished and consistent", "Delivery of the finished masters in the formats agreed at the start"],
      },
      {
        heading: "Coming from outside Johannesburg",
        paragraphs: ["Recording takes place at our studio in Johannesburg. If your choir is based elsewhere in South Africa, tell us where you are and when you would like to record, and we will discuss how to plan the project and your visit. Please plan your travel and rehearsal schedule with us before confirming dates."],
      },
    ],
    audience: ["Choir directors and conductors", "School and university music departments", "Church music ministries", "Gospel and community choirs preparing an album or EP"],
    process: recordingProcess(
      "Message us on WhatsApp with your choir's name, how many singers you have, the songs you would like to record and your ideal dates.",
      "You receive your finished, mastered recordings in the formats agreed at the start.",
    ),
    regionNote: "Our recording studio is in Johannesburg. Choirs from across South Africa are welcome to enquire.",
    related: ["school-choir-recording", "university-college-choir-recording", "church-choir-recording", "worship-team-recording", "album-recording-production", "ep-recording-production"],
    guides: ["how-professional-choir-recording-works", "prepare-a-choir-for-recording", "how-to-record-an-album"],
    faqs: [
      { q: "Do you record choirs from outside Johannesburg?", a: "Recording takes place at our Johannesburg studio, and choirs from across South Africa are welcome to enquire. We will discuss how to plan your project and your visit." },
      { q: "How many singers can you record?", a: "Tell us the size of your choir and the voice parts, and we will discuss how your group can be recorded." },
      { q: "Can we record just a few songs rather than a full album?", a: "Yes. Choirs record selected songs, EPs and full albums. We will plan the project around what you want." },
      { q: "Do you mix and master choir recordings?", a: "Yes. Editing, mixing and mastering are part of the project, so the finished recordings sound polished and consistent." },
      { q: "How do we get a quotation?", a: "Pricing is enquiry-based. Message us with your choir's details and the songs you would like to record and we will provide a quotation." },
    ],
    topic: "choir",
    href: "/services/choir-recording-south-africa",
    metaTitle: "Choir Recording South Africa",
    metaDescription: "Choir recording and album production at our Johannesburg studio, for school, university, church and gospel choirs from across South Africa.",
  },
  {
    slug: "school-choir-recording",
    title: "School Choir Recording",
    group: "choirs",
    icon: "graduation",
    image: "liveRoomPiano",
    short: "Record your school choir's album, EP or chosen songs. A guide for choir directors and school music departments.",
    intro: [
      "A school choir is a place where young voices grow, and a recording gives that effort a lasting form — for the learners, the school and its families. Fresh Wind Music records school choirs for albums, EPs and selected songs.",
      "Recording takes place at our studio in Johannesburg, and schools from across South Africa are welcome to enquire.",
    ],
    items: [
      { label: "School choir album recording and production" },
      { label: "School choir EP recording" },
      { label: "Recording selected songs and competition repertoire" },
      { label: "Soloists and small groups from within the choir" },
      { label: "Piano and instrumental accompaniment" },
      { label: "Editing, mixing and mastering" },
      { label: "Delivery of final masters in the agreed formats" },
    ],
    sections: [
      {
        heading: "Projects school choirs bring us",
        list: ["Recording the school choir's repertoire for the year", "Producing a school choir album", "Recording an EP of selected songs", "Recording pieces prepared for competitions or festivals", "Mixing and mastering recordings the school has already made"],
      },
      {
        heading: "Planning a school choir recording",
        paragraphs: ["Choir directors, music teachers and school management usually decide these things together. It helps to settle a few points before you contact us:"],
        list: ["The songs you want to record, and how many learners will sing on each", "Whether you want an album, an EP or a handful of songs", "Your timeline, and any term dates, events or competitions to work around", "How the recordings will be used and shared by the school and families", "That the permissions your school requires for recording and releasing learners' voices are in place"],
      },
      {
        heading: "Preparing the learners",
        paragraphs: ["Well-rehearsed learners make a strong recording. Aim to have the repertoire secure, the voice parts clear and any soloists chosen before the recording day, and we will guide you on the rest."],
      },
    ],
    audience: ["Choir directors and music teachers", "School music departments", "Primary and high school choirs", "Independent school choirs preparing an album or EP"],
    process: recordingProcess(
      "Message us on WhatsApp with your school's name, the choir's size, the songs you would like to record and your preferred dates.",
      "You receive your finished, mastered recordings in the formats agreed at the start.",
    ),
    regionNote: "Our recording studio is in Johannesburg. Schools from across South Africa are welcome to enquire.",
    related: ["choir-recording-south-africa", "university-college-choir-recording", "album-recording-production", "ep-recording-production", "mixing-mastering"],
    guides: ["school-choir-recording-guide", "prepare-a-choir-for-recording"],
    faqs: [
      { q: "Who should contact Fresh Wind Music about a school choir recording?", a: "Usually the choir director, music teacher or school music department, often together with school management. Anyone organising the project is welcome to get in touch." },
      { q: "Can we record only a few songs?", a: "Yes. Schools record selected songs, EPs and full albums. We will plan the project around what you want." },
      { q: "Do you record at our school?", a: "Recording takes place at our studio in Johannesburg." },
      { q: "Can you mix and master recordings we have already made?", a: "Yes. Tell us what you have and we will advise what the recordings need." },
      { q: "How do we get a quotation?", a: "Pricing is enquiry-based. Send us the choir's details and the songs you would like to record and we will provide a quotation." },
    ],
    topic: "schoolChoir",
    href: "/services/school-choir-recording",
    metaTitle: "School Choir Recording South Africa",
    metaDescription: "Record your school choir's album, EP or selected songs in Johannesburg. A planning guide for choir directors and school music departments.",
  },
  {
    slug: "university-college-choir-recording",
    title: "University & College Choir Recording",
    group: "choirs",
    icon: "graduation",
    image: "vintageControlRoom",
    short: "Preserve your university or college choir's repertoire with a professionally recorded album or EP.",
    intro: [
      "A university or college choir carries a repertoire and a tradition, and a well-made recording preserves both. Fresh Wind Music records choirs and student ensembles for albums, EPs and selected songs.",
      "Recording takes place at our studio in Johannesburg, and institutions from across South Africa are welcome to enquire.",
    ],
    items: [
      { label: "University and college choir album recording" },
      { label: "Choir EP recording" },
      { label: "Recording selected repertoire, anthems and arrangements" },
      { label: "Soloists, small ensembles and instrumentalists" },
      { label: "Editing, mixing and mastering" },
      { label: "Delivery of final masters in the agreed formats" },
    ],
    sections: [
      {
        heading: "Projects for university and college groups",
        list: ["A choir album documenting a year's or a generation's repertoire", "An anniversary or celebration recording", "An EP of selected songs, for example a gospel or contemporary set", "Recordings for competitions, tours or showcase events", "A student music group's first studio release"],
      },
      {
        heading: "Planning around institutional life",
        paragraphs: ["Student ensembles have their own rhythm. A few things are worth settling early:"],
        list: ["Academic terms, exams and events that affect rehearsal and recording dates", "The members who will be singing, since membership changes year to year", "Who approves the budget and project within the institution, and what they need to see", "How the finished recordings will be shared and used"],
      },
      {
        heading: "Student groups and societies",
        paragraphs: ["We also welcome gospel choirs, student music societies and other organised student ensembles who want to record their music."],
      },
    ],
    audience: ["Choir directors and conductors", "University and college music departments", "Student choirs, gospel choirs and music societies", "Student groups recording a first EP or album"],
    process: recordingProcess(
      "Message us on WhatsApp with your institution and ensemble, the songs you would like to record and the dates that suit you.",
      "You receive your finished, mastered recordings in the formats agreed at the start.",
    ),
    regionNote: "Our recording studio is in Johannesburg. Universities and colleges from across South Africa are welcome to enquire.",
    related: ["choir-recording-south-africa", "school-choir-recording", "church-choir-recording", "album-recording-production", "ep-recording-production"],
    guides: ["recording-a-university-choir", "prepare-a-choir-for-recording"],
    faqs: [
      { q: "Can a student group record with you?", a: "Yes. Student choirs, gospel choirs, music societies and other organised ensembles are welcome." },
      { q: "Can we record an album over several sessions?", a: "Tell us about your timeline and the academic calendar and we will discuss how to plan the project." },
      { q: "Can you work with an institution's approval process?", a: "Tell us what your institution needs to see and we will provide a quotation based on your project." },
      { q: "Can we record just a few songs?", a: "Yes. Selected songs, EPs and full albums are all welcome." },
    ],
    topic: "universityChoir",
    href: "/services/university-college-choir-recording",
    metaTitle: "University Choir Recording South Africa",
    metaDescription: "Record your university or college choir's album or EP in Johannesburg. Planning and recording for student ensembles and music departments.",
  },
  {
    slug: "church-choir-recording",
    title: "Church Choir Recording",
    group: "choirs",
    icon: "church",
    image: "burgundyControlRoom",
    short: "Record your church choir's album, EP or chosen songs. A guide for church leaders and music ministries.",
    intro: [
      "A church choir carries a congregation's voice. A recording lets that music reach beyond the building — to members, families and the wider community. Fresh Wind Music records church choirs for albums, EPs and selected songs.",
      "Recording takes place at our studio in Johannesburg, and churches from across South Africa are welcome to enquire.",
    ],
    items: [
      { label: "Church choir album recording and production" },
      { label: "Church choir EP recording" },
      { label: "Recording selected songs and hymn arrangements" },
      { label: "Soloists, worship leaders and small vocal groups" },
      { label: "Piano and band accompaniment" },
      { label: "Editing, mixing and mastering" },
      { label: "Delivery of final masters in the agreed formats" },
    ],
    sections: [
      {
        heading: "For church leaders and music ministries",
        paragraphs: ["Choir albums are often a ministry decision as much as a musical one. You can approach us as a pastor, a music director or a choir leader, and we will talk through what the project means for your church."],
      },
      {
        heading: "Projects church choirs bring us",
        list: ["A gospel album featuring the church choir", "An EP of selected songs", "A recording marking an anniversary or special occasion", "A choir recording its original songs and arrangements"],
      },
      {
        heading: "Studio recording is different from live service recording",
        paragraphs: ["This service is studio recording at our Johannesburg studio, where the music can be recorded carefully and finished properly. If you need something different, such as recording a live service, please ask us before assuming it is part of this project."],
      },
      {
        heading: "Preparing your choir",
        paragraphs: ["Choose and rehearse the songs, settle the voice parts and soloists, and decide how many songs you want to record. We will guide you on the rest."],
      },
    ],
    audience: ["Pastors and church leadership", "Music directors and choir leaders", "Gospel and church choirs preparing an album or EP", "Church music ministries"],
    process: recordingProcess(
      "Message us on WhatsApp with your church and choir details, the songs you would like to record and the dates that suit you.",
      "You receive your finished, mastered recordings in the formats agreed at the start.",
    ),
    regionNote: "Our recording studio is in Johannesburg. Churches from across South Africa are welcome to enquire.",
    related: ["choir-recording-south-africa", "worship-team-recording", "gospel-recording-production", "album-recording-production", "ep-recording-production"],
    guides: ["church-and-worship-album-guide", "prepare-a-choir-for-recording"],
    faqs: [
      { q: "How does a church approach Fresh Wind Music about a choir album?", a: "Message us on WhatsApp with your church and choir details and the songs you would like to record. We will discuss your project and provide a quotation." },
      { q: "Can we record just a few songs?", a: "Yes. Churches record selected songs, EPs and full albums." },
      { q: "Do you record live church services?", a: "This service is studio recording at our Johannesburg studio. If you have a different need, please ask us." },
      { q: "Can you record a choir with band or piano?", a: "Tell us about the accompaniment you use and we will plan the project around it." },
    ],
    topic: "churchChoir",
    href: "/services/church-choir-recording",
    metaTitle: "Church Choir Recording South Africa",
    metaDescription: "Record your church choir's album or EP in Johannesburg. A guide for pastors, music directors and church music ministries.",
  },
  {
    slug: "worship-team-recording",
    title: "Praise & Worship Team Recording",
    group: "gospel-worship",
    icon: "church",
    image: "producerSuiteKeys",
    short: "Record your worship team's original songs, EP or album in the studio — vocals, band and full production.",
    intro: [
      "Worship teams write and lead songs that mean a great deal to the people who sing them. Fresh Wind Music records and produces praise and worship teams for singles, EPs and albums, so your songs can reach beyond Sunday.",
      "Recording takes place at our studio in Johannesburg, and teams from across South Africa are welcome to enquire.",
    ],
    items: [
      { label: "Worship single, EP and album recording" },
      { label: "Worship vocals and harmonies" },
      { label: "Band and instrument recording" },
      { label: "Arrangement and production" },
      { label: "Editing, mixing and mastering" },
      { label: "Delivery of final masters in the agreed formats" },
    ],
    sections: [
      {
        heading: "Teams and songs we work with",
        list: ["Praise and worship teams and worship leaders", "Church music departments recording original worship songs", "Christian music groups and collectives", "Independent worship artists building an EP or album"],
      },
      {
        heading: "Preparing original worship songs",
        paragraphs: ["Before the session, it helps to have lyrics and chord charts ready, the key and tempo of each song settled, and your arrangements rehearsed. Bring a rough recording or reference track if you have one."],
      },
      {
        heading: "Studio recording versus live worship recording",
        paragraphs: ["This service is studio recording at our Johannesburg studio, where each part can be recorded carefully and the songs finished properly. Live service or event recording is a different kind of project — if that is what you need, ask us first."],
      },
      {
        heading: "From one worship song to an album",
        paragraphs: ["Many teams start with one song. As the songs grow, the same recordings can lead into an EP or a full worship album."],
      },
    ],
    audience: ["Worship leaders and praise teams", "Church music departments", "Christian music groups", "Independent worship artists"],
    process: recordingProcess(
      "Message us on WhatsApp with your team, the songs you would like to record and the dates that suit you.",
      "You receive your finished, mastered worship recordings in the formats agreed at the start.",
    ),
    regionNote: "Our recording studio is in Johannesburg. Worship teams from across South Africa are welcome to enquire.",
    related: ["church-choir-recording", "gospel-recording-production", "ep-recording-production", "album-recording-production", "single-song-recording"],
    guides: ["church-and-worship-album-guide", "ep-vs-album-vs-single"],
    faqs: [
      { q: "Can a worship team record original songs?", a: "Yes. Original worship songs are welcome. Tell us about your songs and the team and we will plan the project." },
      { q: "Can we start with one song?", a: "Yes. Many teams start with a single song and move on to an EP or album." },
      { q: "Do you record live worship services?", a: "This service is studio recording at our Johannesburg studio. If you have a different need, please ask us." },
      { q: "Can you record vocals and a band?", a: "Tell us your line-up and how you play together and we will discuss the best way to record your team." },
    ],
    topic: "worshipTeam",
    href: "/services/worship-team-recording",
    metaTitle: "Worship Team Recording South Africa",
    metaDescription: "Record your praise and worship team's songs, EP or album in Johannesburg. Studio recording and production for worship teams and ministries.",
  },
  {
    slug: "gospel-recording-production",
    title: "Gospel Recording & Production",
    group: "gospel-worship",
    icon: "church",
    image: "liveRoomPiano",
    short: "Gospel albums, EPs and singles — for artists, groups, collectives and choirs — recorded and produced in Johannesburg.",
    intro: [
      "Gospel music has a power all its own, and it deserves recordings that do it justice. Fresh Wind Music records and produces gospel artists, groups, collectives and choirs, from a first single to a complete album.",
      "Gospel is one of the styles we record, alongside many others. Recording takes place at our studio in Johannesburg, and artists from across South Africa are welcome to enquire.",
    ],
    items: [
      { label: "Gospel album recording and production" },
      { label: "Gospel EP and single recording" },
      { label: "Gospel group and choir recording" },
      { label: "Vocal recording and arrangement" },
      { label: "Band and instrument recording" },
      { label: "Mixing and mastering" },
      { label: "Delivery of final masters in the agreed formats" },
    ],
    sections: [
      {
        heading: "Gospel projects we welcome",
        list: ["Solo gospel artists and singers", "Gospel groups and collectives", "Gospel choirs and church choirs", "Contemporary gospel and Christian music artists"],
      },
      {
        heading: "Hear gospel and worship on Fresh Wind Music",
        paragraphs: ["Visit [Artists & Music](/artists) to hear a selection of gospel and worship artists and their songs."],
      },
    ],
    audience: ["Gospel artists and singers", "Gospel groups and collectives", "Church and gospel choirs", "Independent Christian musicians"],
    process: recordingProcess(
      "Message us on WhatsApp with your gospel project: the style, the songs, who is performing and your timeline.",
      "You receive your finished, mastered recordings in the formats agreed at the start.",
    ),
    related: ["church-choir-recording", "worship-team-recording", "album-recording-production", "ep-recording-production", "choir-recording-south-africa"],
    guides: ["church-and-worship-album-guide", "how-to-record-an-album"],
    faqs: [
      { q: "Do you only record gospel music?", a: "No. Gospel is one of many styles we record. Artists across musical styles are welcome." },
      { q: "Can I record a gospel album?", a: "Yes. Tell us about your project and we will plan it with you, from the first song to the final masters." },
      { q: "Do you record gospel choirs and groups?", a: "Yes. Tell us about your group and what you would like to record." },
    ],
    topic: "gospel",
    href: "/services/gospel-recording-production",
    metaTitle: "Gospel Recording Studio South Africa",
    metaDescription: "Gospel album, EP and single recording in Johannesburg for artists, groups and choirs from across South Africa. Production, mixing and mastering.",
  },
  {
    slug: "jazz-recording-production",
    title: "Jazz Recording & Production",
    group: "gospel-worship",
    icon: "music",
    image: "vintageControlRoom",
    short: "Record your jazz EP or album in Johannesburg — for vocalists, instrumentalists and ensembles.",
    intro: [
      "Jazz depends on feel, interplay and detail, and a recording should preserve all three. Fresh Wind Music records and produces jazz for vocalists, instrumentalists and ensembles, from a single piece to a full album.",
      "Recording takes place at our studio in Johannesburg, and jazz musicians from across South Africa are welcome to enquire.",
    ],
    items: [
      { label: "Jazz album and EP recording" },
      { label: "Jazz vocal recording" },
      { label: "Instrumental and ensemble recording" },
      { label: "Arrangement and production" },
      { label: "Mixing and mastering" },
      { label: "Delivery of final masters in the agreed formats" },
    ],
    sections: [
      {
        heading: "Jazz projects we welcome",
        list: ["Jazz vocalists recording an EP or album", "Instrumentalists and small ensembles", "Original compositions and arrangements", "Contemporary and Afro-jazz projects"],
      },
      {
        heading: "Planning a jazz recording",
        paragraphs: ["Tell us your line-up, your repertoire and how you like to play together, and we will discuss how best to record your group. It helps to have charts and arrangements ready and a clear idea of whether you are recording an EP or an album."],
      },
    ],
    audience: ["Jazz vocalists", "Jazz instrumentalists and ensembles", "Composers and arrangers", "Musicians recording an EP or album"],
    process: recordingProcess(
      "Message us on WhatsApp with your jazz project: the line-up, the repertoire and your timeline.",
      "You receive your finished, mastered recordings in the formats agreed at the start.",
    ),
    related: ["ep-recording-production", "album-recording-production", "mixing-mastering", "single-song-recording", "music-production"],
    guides: ["ep-vs-album-vs-single", "how-to-record-an-album"],
    faqs: [
      { q: "Can you record a jazz band?", a: "Tell us your line-up and how you play together and we will discuss how best to record your group." },
      { q: "Do you record jazz vocalists?", a: "Yes. Vocal recording is welcome, alone or with an ensemble." },
      { q: "Can I record a jazz EP?", a: "Yes. EPs and albums are both welcome." },
    ],
    topic: "jazz",
    href: "/services/jazz-recording-production",
    metaTitle: "Jazz Recording Studio South Africa",
    metaDescription: "Jazz EP and album recording in Johannesburg for vocalists, instrumentalists and ensembles from across South Africa. Mixing and mastering included.",
  },
  {
    slug: "single-song-recording",
    title: "Single Song & Vocal Recording",
    group: "singles-mixing",
    icon: "mic",
    image: "liveRoomInstruments",
    short: "Only need one song recorded? You are welcome. Single songs, demos, vocals and instruments, recorded in Johannesburg.",
    intro: [
      "Not every project is an album, and it does not need to be. If you have one song to record — a single, a demo, a vocal for a track — Fresh Wind Music welcomes you.",
      "A single is often how artists begin. When you are ready, the recordings you make can lead into an EP or a full album.",
    ],
    items: [
      { label: "Single song recording" },
      { label: "Demo recording" },
      { label: "Vocal recording" },
      { label: "Vocal overdubs and harmonies" },
      { label: "Instrument recording" },
      { label: "Editing and clean-up of takes" },
      { label: "Mixing and mastering, if you want the song finished for release" },
    ],
    sections: [
      {
        heading: "Vocal recording for singers and independent artists",
        paragraphs: ["If you sing, your voice is the centre of the recording. Fresh Wind Music records lead vocals, harmonies and backing vocals for independent artists, and for singers adding vocals to tracks made elsewhere. Tell us the song, the style and how you want to sound, and we will plan the session around you."],
        list: ["Lead vocals for singles, demos and EPs", "Harmonies and backing vocals", "Vocal overdubs and extra takes", "Vocals recorded for a track made elsewhere", "Vocal editing and clean-up, with mixing and mastering if you want the song finished"],
      },
      {
        heading: "Who records a single song?",
        list: ["Emerging artists releasing their first song", "Singers recording a demo to share with producers, promoters or labels", "Songwriters who want to hear their songs properly", "Artists adding vocals or instruments to a track made elsewhere", "Anyone marking an occasion, a wedding, a tribute or a milestone with a recording"],
      },
      {
        heading: "Getting the most from a short session",
        paragraphs: ["Know your song well, bring your lyrics and any reference tracks, and tell us the style you are aiming for. A little preparation makes a single-song session productive."],
      },
    ],
    audience: ["Emerging and independent artists", "Songwriters recording demos", "Vocalists and instrumentalists adding parts to a track", "Anyone who wants a single song recorded well"],
    process: recordingProcess(
      "Message us on WhatsApp with your song, the style and what you would like to do with the recording.",
      "You receive your finished recording, mixed and mastered if you asked for that, in the formats agreed at the start.",
    ),
    related: ["ep-recording-production", "album-recording-production", "mixing-mastering", "vocal-services", "music-production"],
    guides: ["prepare-for-a-recording-session"],
    faqs: [
      { q: "Can I record just one song?", a: "Yes. Single-song recording is welcome, and a single is a good way to begin." },
      { q: "Do you record independent artists and singers?", a: "Yes. Independent artists and singers are welcome, whether you are recording one song or planning an EP or album." },
      { q: "Can I record vocals for a track made elsewhere?", a: "Yes. Tell us what you have and what you need and we will plan the session." },
      { q: "Can I record a demo?", a: "Yes. Demos are a good way to hear your song and share it with others, and can be developed into a full production later." },
      { q: "Can you mix and master my single?", a: "Yes. If you want the song finished for release, mixing and mastering can be part of the project." },
      { q: "How much does recording one song cost?", a: "Pricing is enquiry-based and depends on what the song needs. We provide a quotation once we understand your project." },
    ],
    topic: "single",
    href: "/services/single-song-recording",
    metaTitle: "Vocal & Single Song Recording Studio",
    metaDescription: "Vocal recording studio in Johannesburg for singers and independent artists. Single songs and demos welcome; mixing and mastering available.",
  },
  {
    slug: "mixing-mastering",
    title: "Mixing & Mastering",
    group: "singles-mixing",
    icon: "sliders",
    image: "consoleWide",
    short: "Professional mixing and mastering for singles, EPs, albums and choir recordings — or finish recordings made elsewhere.",
    intro: [
      "Great songs deserve to be heard properly. Fresh Wind Music mixes and masters singles, EPs, albums and choir recordings, and can finish recordings that were made elsewhere.",
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
    audience: ["Artists with recordings that need mixing", "Producers and bands with finished mixes to master", "Choirs, churches and schools with recordings to finish", "Independent releases preparing for streaming"],
    related: ["album-recording-production", "ep-recording-production", "single-song-recording", "choir-recording-south-africa", "gospel-recording-production"],
    guides: ["mixing-vs-mastering"],
    faqs: [
      { q: "What is the difference between mixing and mastering?", a: "Mixing balances the individual tracks of a song. Mastering is the final polish on the finished mix so it sounds consistent and translates across speakers, headphones and streaming platforms." },
      { q: "Can I send recordings that were made elsewhere?", a: "Yes. Get in touch with what you have and we will advise what the project needs." },
      { q: "Do you mix and master whole albums and EPs?", a: "Yes. Mixing every song and mastering the whole project together helps a release sound consistent." },
      { q: "How much do mixing and mastering cost?", a: "Pricing is enquiry-based and depends on the scope of the project. We provide a quotation once we understand what you need." },
    ],
    topic: "mixingMastering",
    href: "/services/mixing-mastering",
    metaTitle: "Mixing & Mastering South Africa",
    metaDescription: "Mixing and mastering for singles, EPs, albums and choir recordings. Understand the difference, and enquire from anywhere in South Africa.",
  },
  {
    slug: "music-production",
    title: "Music Production",
    group: "production-education",
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
    audience: ["Independent artists", "Songwriters who want their songs fully produced", "Gospel artists, choirs and groups preparing an album or EP", "Producers and instrumentalists collaborating on a project"],
    related: ["album-recording-production", "ep-recording-production", "single-song-recording", "mixing-mastering", "songwriting-composition"],
    faqs: [
      { q: "How do I start a music production project?", a: "Message us on WhatsApp with a short description of your project and any reference tracks. We will discuss the scope and provide a quotation." },
      { q: "Can you produce a song I have already written?", a: "Yes. You can arrive with a finished song, a rough demo or only a concept, and we will help shape the sound." },
    ],
    topic: "production",
    href: "/services/music-production",
    metaTitle: "Music Production Studio South Africa",
    metaDescription: "Professional music production from a Johannesburg studio: arrangement, custom instrumentals and full production for artists, choirs and groups.",
  },
  {
    slug: "songwriting-composition",
    title: "Songwriting & Composition",
    group: "production-education",
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
    group: "production-education",
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
    group: "production-education",
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
    metaTitle: "Artist Development Johannesburg",
    metaDescription:
      "Artist development in Johannesburg: sound development, creative direction, repertoire and recording preparation for emerging and established artists.",
  },
  {
    slug: "music-education",
    title: "Music Education",
    group: "production-education",
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
export const servicesInGroup = (g: ServiceGroup) => services.filter((s) => s.group === g);

/**
 * Guides & resources. Plain-language articles that answer the questions people search for before they book.
 * Keep them accurate and generic: no invented facts, results, prices or credentials. To add one, append an entry here;
 * it appears on /resources, in the sitemap and gets its own page.
 */
export interface Article {
  slug: string;
  title: string;
  /** Shorter title for search results (<= ~42 chars; the brand is appended). Defaults to `title`. */
  metaTitle?: string;
  /** Meta description / card summary, <= 160 chars */
  description: string;
  published: string; // ISO date
  updated: string;
  readMinutes: number;
  /** Slug of the service this guide supports (links to its enquiry) */
  service: string;
  sections: { heading?: string; paragraphs?: string[]; list?: string[] }[];
}

export const articles: Article[] = [
  {
    slug: "how-to-record-an-album",
    metaTitle: "How to Record an Album: The Stages",
    title: "How to Record an Album: The Stages from Planning to Release",
    description: "A clear guide to recording an album: planning, pre-production, recording, editing, mixing, mastering and release. Know what to expect before you start.",
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 6,
    service: "album-recording-production",
    sections: [
      { paragraphs: ["Recording an album is a big, rewarding project. Knowing the stages in advance makes it easier to plan, budget your time and arrive prepared. This guide walks through the journey from first idea to finished masters."] },
      { heading: "1. Plan the album", paragraphs: ["Decide what the album is for, who it is for and how many songs it will have. Choose the songs that belong together and think about the order they will play in. A clear idea at the start keeps the whole project focused."] },
      { heading: "2. Prepare the songs", paragraphs: ["Pre-production is where the songs are made ready: lyrics finalised, arrangements decided, keys and tempos chosen and parts rehearsed. Time spent here saves time in the studio and improves the recording."] },
      { heading: "3. Record", paragraphs: ["Vocals, instruments and any choir or group parts are recorded. Being well rehearsed lets everyone relax and perform, and gives the best takes."] },
      { heading: "4. Edit", paragraphs: ["Recorded takes are chosen and tidied so the performances flow cleanly."] },
      { heading: "5. Mix", paragraphs: ["Each song is mixed so every part sits in the right place in level, tone and space. See our guide to mixing versus mastering for the details."] },
      { heading: "6. Master", paragraphs: ["The finished mixes are mastered together so the whole album has a consistent sound and translates well on every speaker and platform."] },
      { heading: "7. Release", paragraphs: ["With finished masters in hand, you can decide how to release the album and share it. Plan your artwork, song details and release date alongside the recording."] },
      { heading: "Start your album project", paragraphs: ["Fresh Wind Music records and produces albums at our Johannesburg studio for artists and groups from across South Africa. Message us on WhatsApp to discuss yours."] },
    ],
  },
  {
    slug: "ep-vs-album-vs-single",
    metaTitle: "EP vs Album vs Single: Which to Record?",
    title: "EP vs Album vs Single: Which Should You Record?",
    description: "Not sure whether to record a single, an EP or a full album? Compare what each is, who it suits and how to choose for your music.",
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 4,
    service: "ep-recording-production",
    sections: [
      { paragraphs: ["One of the first decisions in any recording project is the format. A single, an EP and an album each suit different goals, budgets and stages of a music journey."] },
      { heading: "A single", paragraphs: ["A single is one song. It is the simplest way to start: you can focus on getting one song exactly right, release it and learn from how people respond. It suits new artists, demos and anyone who only needs one song recorded."] },
      { heading: "An EP", paragraphs: ["An EP is a short collection of songs, often three to six. It gives you a complete release without the scale of an album, and suits artists introducing themselves, choirs recording selected repertoire and groups testing a direction."] },
      { heading: "An album", paragraphs: ["An album is a full body of work. It suits artists, choirs and groups with enough strong songs to hold together as one record and a plan for what to do with it."] },
      { heading: "How to choose", list: ["Starting out or short on time? Begin with a single.", "Want a proper release without a full album? Record an EP.", "Have a body of songs and a bigger plan? Record an album.", "Unsure? Start smaller. Recordings you make can grow into a larger project."] },
      { heading: "Talk to us", paragraphs: ["Fresh Wind Music welcomes single-song, EP and album projects. Message us on WhatsApp with your idea and we will help you decide."] },
    ],
  },
  {
    slug: "prepare-a-choir-for-recording",
    metaTitle: "How to Prepare a Choir to Record",
    title: "How to Prepare a Choir for a Recording Session",
    description: "A practical guide for choir directors: rehearsal, repertoire, voice parts and planning so your choir records with confidence and gets the best result.",
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 5,
    service: "choir-recording-south-africa",
    sections: [
      { paragraphs: ["A choir sounds different in a recording than in a hall: every detail is audible. Good preparation lets your singers relax and gives you a recording you are proud of."] },
      { heading: "Choose your repertoire", paragraphs: ["Decide which songs to record and in what order. Fewer songs well prepared are better than many songs half-learned. If you are recording an album or EP, think about how the songs work together."] },
      { heading: "Make sure the music is secure", list: ["Learn the songs thoroughly, including entries, endings and dynamics", "Make sure every voice part knows its line", "Settle tempos and keys before the session", "Choose soloists and prepare them well"] },
      { heading: "Plan the group", paragraphs: ["Tell the studio how many singers you have, how they divide into voice parts and whether you use piano or other instruments. That helps plan how the session will run."] },
      { heading: "Look after the singers", list: ["Rest and drink water before the session", "Warm up together", "Dress comfortably", "Arrive on time and ready to sing"] },
      { heading: "Agree the practical details", paragraphs: ["Confirm dates, travel and how the recordings will be used and shared. If your choir belongs to a school, university or church, make sure the people who need to approve the project are involved early."] },
      { heading: "Ready to record?", paragraphs: ["Fresh Wind Music records choirs at our Johannesburg studio, and choirs from across South Africa are welcome to enquire. Message us on WhatsApp with your choir's details."] },
    ],
  },
  {
    slug: "school-choir-recording-guide",
    metaTitle: "Planning a School Choir Recording",
    title: "Planning a School Choir Recording: A Guide for Choir Directors",
    description: "How to plan a school choir recording: choosing songs, involving the school, preparing learners and deciding between a few songs, an EP or an album.",
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 5,
    service: "school-choir-recording",
    sections: [
      { paragraphs: ["A school choir recording is a lovely way to mark the work of a choir, but it involves more people than most recording projects. This guide helps choir directors and music teachers plan it well."] },
      { heading: "Decide what you want to record", paragraphs: ["Start with the purpose. A recording of the year's repertoire, a school choir album, an EP of selected songs or a competition piece each needs different planning."] },
      { heading: "Involve the right people", list: ["The school management who approve the project and its budget", "The music department and accompanist", "Parents and guardians, where the school requires their permission to record and release learners' voices"] },
      { heading: "Plan around the school calendar", paragraphs: ["Terms, exams, sports and concerts all affect rehearsal and recording dates. Agree a realistic timeline and build in rehearsal time."] },
      { heading: "Prepare the learners", paragraphs: ["Make sure the repertoire is secure, the voice parts are clear and soloists are chosen. Prepared learners enjoy the day and give better performances."] },
      { heading: "Agree how the recordings will be used", paragraphs: ["Decide in advance how the school and families will share the recordings, so everyone is comfortable."] },
      { heading: "Get in touch", paragraphs: ["Fresh Wind Music records school choirs at our Johannesburg studio, and schools from across South Africa are welcome to enquire. Message us on WhatsApp with your choir's details."] },
    ],
  },
  {
    slug: "church-and-worship-album-guide",
    metaTitle: "Church & Worship Album Recording Guide",
    title: "How a Church or Worship Team Can Prepare to Record an Album",
    description: "A guide for pastors, music directors and worship leaders: choosing songs, preparing your choir or team, and planning a church or worship recording.",
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 5,
    service: "church-choir-recording",
    sections: [
      { paragraphs: ["A church or worship album can carry your congregation's music far beyond Sunday. Planning well lets the music stay true to your ministry while sounding its best."] },
      { heading: "Start with the purpose", paragraphs: ["Is the recording to share your worship, mark an occasion or release original songs? Knowing the purpose helps you choose the right format: a single, an EP or a full album."] },
      { heading: "Choose and prepare the songs", list: ["Choose songs that belong together", "Finalise lyrics and chord charts", "Settle keys and tempos", "Rehearse until the team or choir is confident"] },
      { heading: "Prepare the people", paragraphs: ["Decide who will sing and play, including soloists and worship leaders, and make sure everyone knows their parts. Tell the studio how many people are involved."] },
      { heading: "Studio recording or live recording?", paragraphs: ["Studio recording lets each part be captured carefully and the songs finished properly. Live service recording is a different kind of project. Be clear about which you want when you enquire."] },
      { heading: "Plan the release", paragraphs: ["Think about how the recordings will reach your members and community, and plan your artwork and release date alongside the recording."] },
      { heading: "Talk to us", paragraphs: ["Fresh Wind Music records church choirs and worship teams at our Johannesburg studio, and groups from across South Africa are welcome to enquire. Message us on WhatsApp to discuss your project."] },
    ],
  },
  {
    slug: "what-to-know-before-recording-your-first-ep",
    title: "What to Know Before Recording Your First EP",
    metaTitle: "Before You Record Your First EP",
    description: "Planning your first EP? What to decide before you book studio time: songs, sound, budget, timeline and what you will do with the release.",
    published: "2026-11-25",
    updated: "2026-11-25",
    readMinutes: 5,
    service: "ep-recording-production",
    sections: [
      { paragraphs: ["Your first EP is often the first complete body of work people hear from you. A few decisions made before you reach the studio shape how smoothly the project goes and how good the finished release sounds."] },
      { heading: "Decide what the EP is for", paragraphs: ["Is it an introduction to your music, a showcase to share with promoters and churches, or the first step towards an album? The purpose helps you choose the songs and the sound, and tells you who the release is really for."] },
      { heading: "Choose songs that belong together", paragraphs: ["An EP is short, so every song counts. Look for songs that feel like one project rather than your strongest songs in unrelated styles. Think about the order they will play in and how the first and last songs open and close the release."] },
      { heading: "Finish the songs before the session", list: ["Lyrics final and memorised", "Melodies, keys and tempos settled", "Arrangements decided, including who plays what", "Rough recordings or demos you can share, so the studio hears your idea"] },
      { heading: "Think about the whole journey", paragraphs: ["An EP is more than recording. After the songs are recorded they are edited, mixed and mastered, and you will need artwork, song titles and credits ready for release. Knowing this early helps you plan time and budget realistically."] },
      { heading: "Be realistic about budget and time", paragraphs: ["The cost and time depend on the number of songs, how many people are performing and how prepared you are. Pricing is quoted per project, so tell the studio what you have in mind and ask what it involves before you commit."] },
      { heading: "Start with a conversation", paragraphs: ["Fresh Wind Music records and produces EPs at our Johannesburg studio for artists and groups from across South Africa. Message us on WhatsApp with your idea and we will help you plan it."] },
    ],
  },
  {
    slug: "how-professional-choir-recording-works",
    title: "How Professional Choir Recording Works",
    metaTitle: "How Choir Recording Works",
    description: "A plain-language look at how a choir recording project works: repertoire, preparation, recording, editing, mixing and mastering.",
    published: "2026-11-25",
    updated: "2026-11-25",
    readMinutes: 5,
    service: "choir-recording-south-africa",
    sections: [
      { paragraphs: ["Recording a choir is different from recording a solo singer or a band. Many voices, several voice parts and sometimes piano or other instruments all have to be captured and balanced. Here is how a choir recording project generally works, from first conversation to finished masters."] },
      { heading: "1. Define the project", paragraphs: ["Start with what you want: a full album, an EP or a few selected songs. Decide the repertoire, how many singers will take part and whether soloists, piano or other instruments are involved."] },
      { heading: "2. Prepare the choir", paragraphs: ["Recordings reveal every detail, so preparation matters. The choir should know the songs thoroughly, with voice parts secure, entries and endings clear and soloists chosen. Rehearse the repertoire to the standard you want to hear on the recording."] },
      { heading: "3. Plan how the group will be recorded", paragraphs: ["Choir recording approaches vary — a group can be recorded together, in sections or in smaller groups, and the best choice depends on the choir, the music and the space. Tell the studio about your group and the songs, and discuss the approach that suits your project."] },
      { heading: "4. Record", paragraphs: ["The songs are performed and captured. Having a clear plan for the order of songs, breaks and any re-takes helps the day run smoothly and keeps singers fresh."] },
      { heading: "5. Edit, mix and master", paragraphs: ["Takes are chosen and tidied, each song is mixed so the voice parts and any instruments are balanced, and the finished project is mastered so the songs sound consistent as one release."] },
      { heading: "6. Deliver", paragraphs: ["You receive the finished masters in the agreed formats, ready to share with your choir, school, university, church or community."] },
      { heading: "Plan your choir recording", paragraphs: ["Fresh Wind Music records choirs at our Johannesburg studio, and choirs from across South Africa are welcome to enquire. Message us on WhatsApp with your choir's details and the songs you would like to record."] },
    ],
  },
  {
    slug: "recording-a-university-choir",
    title: "Recording a University Choir: Planning for Student Ensembles",
    metaTitle: "Recording a University Choir",
    description: "How university and college choirs can plan a studio recording around academic terms, changing membership and institutional approval.",
    published: "2026-11-25",
    updated: "2026-11-25",
    readMinutes: 5,
    service: "university-college-choir-recording",
    sections: [
      { paragraphs: ["A university or college choir is different from most recording clients. Members come and go, rehearsal time is tied to the academic calendar, and projects often need approval from a department or student body. Planning for these realities makes a recording much smoother."] },
      { heading: "Decide what the recording is for", paragraphs: ["Common reasons include preserving a year's repertoire, marking an anniversary, preparing for a competition or tour, or releasing an EP of selected songs. The purpose shapes the repertoire, the budget and the timeline."] },
      { heading: "Plan around the academic calendar", paragraphs: ["Terms, exams, holidays and events decide when singers are available and rehearsed. Work backwards from the dates that matter and allow rehearsal time before the recording."] },
      { heading: "Account for changing membership", paragraphs: ["Choir membership changes each year, so record with the singers who will be available and prepared. Keep a clear list of who is taking part and which voice parts they sing."] },
      { heading: "Involve the right people early", list: ["The choir director or conductor", "The department or society that approves the project", "Whoever manages the budget and what they need in order to approve a quotation", "The singers, so everyone is comfortable with how the recording will be shared"] },
      { heading: "Prepare the repertoire", paragraphs: ["Choose the songs, settle arrangements and voice parts, and rehearse until the choir is confident. Choose soloists and any instrumentalists in advance."] },
      { heading: "Next step", paragraphs: ["Fresh Wind Music records university and college choirs at our Johannesburg studio, and institutions from across South Africa are welcome to enquire. Message us on WhatsApp with your ensemble's details."] },
    ],
  },
  {
    slug: "mixing-vs-mastering",
    title: "Mixing vs Mastering: What's the Difference?",
    description: "Mixing and mastering are two different stages of finishing a song. Here is what each does, when you need them and why both matter.",
    published: "2026-11-19",
    updated: "2026-11-19",
    readMinutes: 4,
    service: "mixing-mastering",
    sections: [
      { paragraphs: ["If you are releasing music, you will hear two terms again and again: mixing and mastering. They sound similar, but they are different jobs done at different stages, and understanding the difference helps you decide what your song needs."] },
      { heading: "What is mixing?", paragraphs: ["Mixing is the process of balancing all the individual recorded parts of a song — vocals, guitars, keys, drums, effects — so they sit together properly. A mixer sets levels, shapes the tone of each sound, positions things in the stereo field and adds effects like reverb so the song feels clear, balanced and exciting.", "Mixing happens before mastering and works on the separate tracks of your song."] },
      { heading: "What is mastering?", paragraphs: ["Mastering is the final polish. It is applied to the finished stereo mix, not the individual tracks. Mastering makes sure the song has a consistent tone and loudness, and that it translates well across car speakers, phones, headphones and streaming platforms.", "If you are releasing several songs together, mastering also helps them sound like they belong on the same record."] },
      { heading: "Do I need both?", paragraphs: ["In most cases, yes. Mixing fixes the balance inside the song; mastering prepares the finished song for the world. Skipping either usually means the song sounds less clear, less consistent or less competitive next to other releases."], list: ["Recorded the song but it sounds unbalanced? You need mixing.", "Have a finished mix you are happy with? You need mastering.", "Releasing an EP or album? Master the whole project together."] },
      { heading: "How to get started", paragraphs: ["Gather your recordings or your finished mix, note any songs you admire as references, and tell us when you plan to release. Message Fresh Wind Music on WhatsApp and we will advise what your project needs."] },
    ],
  },
  {
    slug: "prepare-for-a-recording-session",
    title: "How Independent Artists Can Prepare for Studio Recording",
    metaTitle: "Prepare for Studio Recording",
    description: "A practical checklist for independent artists, singers, bands and groups: prepare your songs, your voice and your plan to get the most from studio time.",
    published: "2026-11-19",
    updated: "2026-11-19",
    readMinutes: 4,
    service: "single-song-recording",
    sections: [
      { paragraphs: ["Studio time goes further when you arrive prepared. Whether you are recording a demo or a full project, a little planning before the session makes the recording better and less stressful."] },
      { heading: "Know your songs", paragraphs: ["Rehearse until you can perform each song comfortably from start to finish. Decide on the structure, the key and the tempo before the session, not during it. If you are working with a group, make sure everyone knows their parts."] },
      { heading: "Prepare your voice and instruments", list: ["Rest your voice the day before and stay hydrated.", "Warm up before you record.", "Bring instruments in good working order, with fresh strings or reeds where relevant.", "Bring spare cables, tuners and anything you cannot play without."] },
      { heading: "Bring your references and lyrics", paragraphs: ["Bring a few songs whose sound you like, and a clear copy of your lyrics and chords. References help everyone understand the sound you are aiming for."] },
      { heading: "Plan the session", paragraphs: ["Tell the studio how many songs you want to record, how many people are involved and what you want to do with the recordings afterwards. That helps plan the time, and whether you also need mixing and mastering."] },
      { heading: "Ready to book?", paragraphs: ["Message Fresh Wind Music on WhatsApp with what you want to record and we will discuss your project."] },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

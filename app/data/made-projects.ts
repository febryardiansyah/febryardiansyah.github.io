const madeProjects = [
  {
    id: "bi",
    name: "BI Superapp",
    category: "Enterprise mobile",
    summary: "A digital workplace for Bank Indonesia.",
    description:
      "A mobile portal bringing Bank Indonesia’s policy, institutional, and HR services together so employees can find information and manage internal policies in one place.",
    stack: ["Flutter", "Riverpod", "Android", "iOS", "MVVM", "DexGuard", "iXGuard", "SOLID"],
    href: "https://apps.apple.com/id/app/digital-workplace-mobile/id1644633624",
    linkLabel: "View on the App Store",
    image:
      "https://res.cloudinary.com/febryar/image/upload/v1780412472/portfolio%20showcase/BI_Superapp_1_wwigbc.png",
  },
  {
    id: "monefi",
    name: "monefi",
    category: "Personal finance",
    summary: "From a Telegram message to an expense dashboard.",
    description:
      "A personal finance platform that logs daily expenses from Telegram messages, voice notes, and receipt scans. An interactive web dashboard brings the transactions together.",
    stack: ["Next.js", "TailwindCSS", "TypeScript", "Supabase", "Midtrans"],
    href: "https://monefi.id/",
    linkLabel: "Visit website",
    image: "/portfolio/monefi.webp",
  },
  {
    id: "cariilmu",
    name: "Cariilmu App",
    category: "Education",
    summary: "Prakerja training across mobile and the classroom.",
    description:
      "A learning platform for Prakerja participants, with training delivered through video courses, live webinars, and in-person sessions.",
    stack: ["Flutter", "BloC", "Android", "iOS", "MVVM", "SOLID"],
    href: "https://id.linkedin.com/company/cariilmu-co-id",
    linkLabel: "About Cariilmu",
    image:
      "https://res.cloudinary.com/febryar/image/upload/v1780494957/portfolio%20showcase/Gemini_Generated_Image_jaf0oyjaf0oyjaf0_1_h25mto.png",
  },
  {
    id: "muatparts",
    name: "Muatparts PLUS",
    category: "B2B commerce",
    summary: "Truck parts procurement for logistics fleets.",
    description:
      "A B2B marketplace for truck spare parts and industrial components, built to simplify procurement for logistics fleets.",
    stack: ["Flutter", "GetX", "Android", "Claude AI", "MVVM"],
    href: "https://play.google.com/store/apps/details?id=com.azlogistik.muatmuattransporter",
    linkLabel: "View on Google Play",
    image:
      "https://res.cloudinary.com/febryar/image/upload/v1780490925/portfolio%20showcase/Gemini_Generated_Image_kvwv7akvwv7akvwv_1_cwmgfn.png",
  },
  {
    id: "petgram",
    name: "Petgram",
    category: "Social mobile",
    summary: "A social app for pet lovers with image recognition.",
    description:
      "An open-source photo-sharing app for pet lovers. TensorFlow image recognition helps identify the pets in a post.",
    stack: ["Flutter", "BloC", "Node.js", "Express.js", "TensorFlow", "MongoDB"],
    href: "https://github.com/febryardiansyah/petgram-mobile",
    linkLabel: "View repository",
    image:
      "https://res.cloudinary.com/febryar/image/upload/v1780665209/portfolio%20showcase/Gemini_Generated_Image_7e2cre7e2cre7e2c_1_ttbgug.png",
  },
  {
    id: "mangamint",
    name: "Mangamint",
    category: "Manga reader",
    summary: "A Flutter manga reader in Bahasa Indonesia.",
    description: "An open-source Android application for reading manga and comics in Bahasa Indonesia.",
    stack: ["Flutter", "BloC", "Node.js", "Express.js"],
    href: "https://github.com/febryardiansyah/manga_mint",
    linkLabel: "View repository",
    image:
      "https://res.cloudinary.com/febryar/image/upload/v1780665825/portfolio%20showcase/Gemini_Generated_Image_6mi9ad6mi9ad6mi9_1_qhzyao.png",
  },
]

export { madeProjects }
export type MadeProject = (typeof madeProjects)[number]

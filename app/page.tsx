"use client"

import {
  ArrowUpRight,
  FileDown,
  Github,
  Linkedin,
  Mail,
  Send,
  Twitter,
} from "lucide-react"
import SocialMediaWrapper from "@/components/social-media-wrapper"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import { Cormorant_Garamond, Sora } from "next/font/google"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { createElement, useRef } from "react"

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
})

const bodyFont = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const socials = [
  {
    name: "GitHub",
    username: "@febryardiansyah",
    href: "https://github.com/febryardiansyah/",
    icon: Github,
    tone: "hover:border-white/40 hover:bg-white/10",
  },
  {
    name: "LinkedIn",
    username: "Febry Ardiansyah",
    href: "https://www.linkedin.com/in/febry-ardiansyah-a4b580170/",
    icon: Linkedin,
    tone: "hover:border-white/40 hover:bg-white/10",
  },
  {
    name: "Twitter",
    username: "@febryards",
    href: "https://x.com/febryards",
    icon: Twitter,
    tone: "hover:border-white/40 hover:bg-white/10",
  },
]

const skills = [
  "Flutter",
  "Dart",
  "React",
  "Next.js",
  "TypeScript",
  "TailwindCSS",
  "Firebase",
  "Git",
  "REST API",
  "SASS",
  "Mobile SDKs",
]

const experiences = [
  {
    period: "Apr 2026 - Present",
    role: "Mobile Apps Developer",
    company: "Central Bank of Indonesia via PT Adidata",
    mode: "On-site",
    points: ["Developed BI Super Apps features and improvements."],
  },
  {
    period: "Mar 2025 - Feb 2026",
    role: "Mobile Apps Developer",
    company: "muatmuat",
    mode: "On-site",
    points: [
      "Optimized app performance by identifying and resolving critical bugs, leading to a significant reduction in production crash rates.",
      "Designed and implemented high-impact transaction-related features, streamlining the user journey and improving overall transaction efficiency.",
      "Partnered with UI/UX, BA, and QC teams to deliver high-fidelity designs and seamless product releases.",
      "Used GetX for state management to decouple business logic from the UI, resulting in cleaner code maintainability and faster feature deployment.",
      "Created a modular internal library to streamline feature development and ensure design consistency.",
      "Researched and integrated AI-powered development tools to automate boilerplate code generation and repetitive tasks, successfully boosting sprint velocity and developer productivity.",
    ],
  },
  {
    period: "Nov 2024 - Feb 2025",
    role: "Frontend Developer",
    company: "Carillimu",
    mode: "Remote",
    points: [
      "Translated designs into efficient components using TailwindCSS.",
      "Integrated RESTful APIs to fetch and display data dynamically.",
      "Managed application state effectively using Context API.",
    ],
  },
  {
    period: "May 2022 - Feb 2025",
    role: "Mobile Apps Developer",
    company: "Carillimu",
    mode: "Remote",
    points: [
      "Managed end-to-end development and on-time deployment to the App Store and Play Store.",
      "Applied SOLID principles to ensure a modular, maintainable, and highly scalable codebase.",
      "Developed high-precision UI components, including custom interactive video players.",
      "Utilized BloC to decouple business logic from the UI, ensuring the code is reusable and easy to test.",
      "Integrated RESTful APIs, push notifications, analytics, crash reporting, and local data storage.",
      "Developed advanced features requiring native integration using Kotlin (Android) and Swift (iOS).",
      "Collaborated effectively with Backend developers and UI/UX designers within an Agile environment.",
    ],
  },
  {
    period: "Nov 2021 - Feb 2022",
    role: "Mobile Apps Developer",
    company: "PT. IDEJUALAN CREATIVE",
    mode: "Remote",
    points: [
      "Created E-learning mobile app from scratch for Android and iOS.",
      "Integrated with Dio package for seamless API communication.",
    ],
  },
]

export default function Home() {
  const experienceRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress: pageScrollProgress } = useScroll()
  const isExperienceInView = useInView(experienceRef, {
    margin: "-35% 0px -35% 0px",
  })

  const catY = useTransform(pageScrollProgress, [0, 1], [18, -90])
  const catRotate = useTransform(pageScrollProgress, [0, 1], [-5, 6])
  const catLottie = createElement("lottie-player", {
    src: "/black%20rainbow%20cat.json",
    background: "transparent",
    speed: "1",
    loop: true,
    autoplay: true,
    style: {
      width: "150px",
      height: "150px",
      filter: "opacity(0.72)",
    },
  })

  return (
    <main
      className={`relative min-h-screen overflow-hidden bg-[#0c1017] text-zinc-100 selection:bg-zinc-500/40 ${bodyFont.className}`}
    >
      <Script
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
        strategy="afterInteractive"
      />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.1)_1px,transparent_1px)] [background-size:56px_56px]" />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-[40vh] z-20 hidden lg:block"
        style={{ left: "max(1rem, calc((100vw - 80rem) / 2 + 20rem))", y: catY, rotate: catRotate }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: isExperienceInView ? 1 : 0, scale: isExperienceInView ? 1 : 0.92 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        {catLottie}
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <header className="editorial-reveal mb-6 flex flex-col gap-3 rounded-3xl border border-white/15 bg-white/[0.03] px-5 py-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-xs font-semibold">
              FA
            </span>
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-300">Febry Ardiansyah's Portfolio</p>
          </div>
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Open to work</span>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <aside className="editorial-reveal rounded-3xl border border-white/15 bg-white/[0.02] p-5 backdrop-blur-xl lg:sticky lg:top-8 lg:col-span-4 lg:h-fit lg:p-6">
            <div className="relative mb-5 overflow-hidden rounded-3xl border border-white/20 bg-zinc-900/50 p-5">
              <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-white/30">
                <Image
                  src="https://res.cloudinary.com/febryar/image/upload/v1741435733/Febry_Ardiansyah_-_IT_c9x8wf.jpg"
                  alt="Febry Ardiansyah"
                  fill
                  sizes="112px"
                  className="object-cover"
                  style={{ objectPosition: "center" }}
                />
              </div>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-zinc-300/30 bg-zinc-200/10 px-3 py-1 text-[11px] font-semibold tracking-[0.17em] text-zinc-200">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-300" />
                AVAILABLE FOR HIRE
              </p>
              <h1 className={`${displayFont.className} mt-4 text-5xl leading-[0.88] tracking-tight text-white`}>
                Febry Ardiansyah
              </h1>
              <p className="mt-2 text-sm font-medium text-zinc-300">Mobile Apps & Frontend Engineer</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Current Focus</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-200">
                Exploring AI integration in mobile apps and advanced Flutter animations.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-zinc-200 transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </aside>

          <div className="space-y-5 lg:col-span-8">
            <article className="editorial-reveal relative overflow-hidden rounded-3xl border border-white/15 bg-[#121826]/70 p-6 md:p-8" style={{ animationDelay: "120ms" }}>

              <p className="text-xs uppercase tracking-[0.23em] text-zinc-400">Introduction</p>
              <h2 className={`${displayFont.className} mt-2 max-w-3xl text-4xl leading-[0.96] text-white md:text-5xl`}>
                I build accessible, pixel-perfect, and performant web and mobile applications.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-300 md:text-base">
                Specialized in <span className="font-semibold text-zinc-100">Flutter</span>,{" "}
                <span className="font-semibold text-zinc-100">React</span>, and{" "}
                <span className="font-semibold text-zinc-100">Next.js</span>.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="https://drive.google.com/file/d/1fg7eGgiI3cgq44DECppLB7YeICXYSBZm/view?usp=sharing"
                  target="_blank"
                >
                  <Button className="h-auto rounded-full border border-white/25 bg-white text-zinc-900 px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:bg-zinc-200">
                    <FileDown className="mr-2 h-4 w-4" /> Download CV
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button
                    variant="outline"
                    className="h-auto rounded-full border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    Contact Me
                  </Button>
                </Link>
              </div>
            </article>

            <section className="editorial-reveal rounded-3xl border border-white/15 bg-white/[0.02] p-5 backdrop-blur-xl md:p-6" style={{ animationDelay: "180ms" }}>
              <div className="mb-5 flex items-center justify-between">
                <h3 className={`${displayFont.className} text-3xl text-white`}>Connect</h3>
                <span className="text-zinc-500">•</span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {socials.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">
                      <div
                        className={`group h-full rounded-2xl border border-white/20 bg-zinc-900/50 p-4 transition-all duration-300 hover:-translate-y-1 ${social.tone}`}
                      >
                        <Icon size={20} className="text-zinc-100" />
                        <div className="mt-3 text-sm font-semibold text-white">{social.name}</div>
                        <div className="text-xs text-zinc-300">{social.username}</div>
                        <ArrowUpRight className="ml-auto mt-4 h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>

            <section
              ref={experienceRef}
              className="editorial-reveal relative overflow-hidden rounded-3xl border border-white/15 bg-[#0f1522]/80 p-5 md:p-6"
              style={{ animationDelay: "250ms" }}
            >

              <div className="relative z-10 mb-6 flex items-end justify-between gap-3">
                <h3 className={`${displayFont.className} text-4xl text-white`}>Experience</h3>
                <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Career Timeline</span>
              </div>

              <div className="relative z-10 space-y-3">
                {experiences.map((item, index) => (
                  <article
                    key={`${item.company}-${item.period}`}
                    className={`rounded-2xl border p-4 transition-all duration-300 md:p-5 ${
                      item.period.toLowerCase().includes("present")
                        ? "border-amber-300/60 bg-amber-200/[0.08]"
                        : "border-white/15 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.17em] text-zinc-400">
                      <span>{item.period}</span>
                      <span className="h-1 w-1 rounded-full bg-zinc-500" />
                      <span>{item.mode}</span>
                      {item.period.toLowerCase().includes("present") && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-amber-300/80" />
                          <span className="rounded-full border border-amber-200/50 bg-amber-200/20 px-2 py-0.5 text-[10px] font-semibold tracking-[0.16em] text-amber-100">
                            Current
                          </span>
                        </>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold text-zinc-100">{item.role}</h4>
                    <p className="mb-3 text-sm font-medium text-zinc-300">{item.company}</p>
                    <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-zinc-300 marker:text-zinc-400">
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section
          id="contact"
          className="editorial-reveal mt-5 rounded-3xl border border-white/15 bg-white/[0.03] p-5 backdrop-blur-xl md:p-6"
          style={{ animationDelay: "320ms" }}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-4 md:col-span-1">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/5 text-zinc-100">
                <Mail size={20} />
              </span>
              <h3 className={`${displayFont.className} text-4xl leading-[0.95] text-white`}>Let&apos;s work together!</h3>
              <p className="text-sm leading-relaxed text-zinc-300">
                I&apos;m always open to discussing product design work or partnership opportunities.
              </p>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Email me at</p>
                <a
                  href="mailto:febryardiansyah27@gmail.com"
                  className="mt-2 inline-block text-base font-semibold text-white transition-colors hover:text-zinc-300"
                >
                  febryardiansyah27@gmail.com
                </a>
              </div>
            </div>

            <div className="md:col-span-2">
              <form className="space-y-4 rounded-2xl border border-white/15 bg-[#0b1220]/80 p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="ml-1 text-xs font-semibold tracking-[0.15em] text-zinc-400">
                      NAME
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your Name"
                      className="h-11 w-full rounded-xl border border-white/20 bg-white/5 px-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-all focus:border-orange-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="ml-1 text-xs font-semibold tracking-[0.15em] text-zinc-400">
                      EMAIL
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="h-11 w-full rounded-xl border border-white/20 bg-white/5 px-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-all focus:border-orange-300"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="ml-1 text-xs font-semibold tracking-[0.15em] text-zinc-400">
                    SUBJECT
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Project Inquiry"
                    className="h-11 w-full rounded-xl border border-white/20 bg-white/5 px-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-all focus:border-orange-300"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="ml-1 text-xs font-semibold tracking-[0.15em] text-zinc-400">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-all focus:border-orange-300"
                  />
                </div>
                <Button className="h-11 rounded-full bg-white px-6 text-sm font-semibold uppercase tracking-wider text-zinc-900 transition-all hover:bg-zinc-200">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>

        <footer className="editorial-reveal mt-10 pb-6 text-sm text-zinc-400" style={{ animationDelay: "390ms" }}>
          <Separator className="mb-6 bg-white/20" />
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p>© {new Date().getFullYear()} Febry Ardiansyah.</p>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Built with Next.js & TailwindCSS</p>
          </div>
        </footer>
      </div>

      <SocialMediaWrapper />
    </main>
  )
}

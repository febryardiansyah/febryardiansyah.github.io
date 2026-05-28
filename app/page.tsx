import type React from "react"
import Link from "next/link"
import Image from "next/image"

const socials = [
  {
    name: "GitHub",
    username: "@febryardiansyah",
    href: "https://github.com/febryardiansyah/",
  },
  {
    name: "LinkedIn",
    username: "Febry Ardiansyah",
    href: "https://www.linkedin.com/in/febry-ardiansyah-a4b580170/",
  },
  {
    name: "Twitter",
    username: "@febryards",
    href: "https://x.com/febryards",
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
    company: "Central Bank of Indonesia",
    mode: "On-site",
    skillSet: ["Flutter", "MVVM", "Riverpod", "ixGuard/DexGuard", "Dependency Injection"],
    points: [
      "Developed Bank Indonesia Super Apps features and improvements",
      "Integrated advanced code obfuscation and RASP tools (ixGuard & DexGuard) to prevent reverse engineering",
      "Architected a memory-efficient frontend using Riverpod and Flutter Hooks",
      "Collaborated with cross-functional teams to deliver high-quality releases on time",
    ],
  },
  {
    period: "Mar 2025 - Feb 2026",
    role: "Mobile Apps Developer",
    company: "muatmuat",
    mode: "On-site",
    skillSet: [ "Flutter", "Firebase", "Facebook SDK", "Git", "GetX", "Claude Code", "MVVM"],
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
    skillSet: ["Next.js", "TailwindCSS", "SASS", "TypeScript", "Axios", "Git"],
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
    skillSet: ["Flutter", "Kotlin", "Swift", "Firebase", "Facebook SDK", "Apple SDK", "Git", "BloC", "MVVM"],
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
    skillSet: ["Flutter", "Apple SDK", "Facebook SDK", "Firebase", "REST API", "BloC", "Git"],
    points: [
      "Created E-learning mobile app from scratch for Android and iOS.",
      "Integrated with Dio package for seamless API communication.",
    ],
  },
]

const GITHUB_USERNAME = "febryardiansyah"
const GITHUB_REPO_LIMIT = 4

type GitHubRepo = {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  fork: boolean
}

async function getTopRepos() {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return [] as GitHubRepo[]
  }

  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 },
    }
  )

  if (!response.ok) {
    return [] as GitHubRepo[]
  }

  const repos = (await response.json()) as GitHubRepo[]

  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, GITHUB_REPO_LIMIT)
}

export default async function Home() {
  const topRepos = await getTopRepos()

  return (
    <main id="top" className="page">
      <header className="nav-edge">
        <a className="wordmark" href="#top">
          Febry Ardiansyah
        </a>
        <Link
          className="cta-outline"
          href="https://drive.google.com/file/d/1CC8hQ_k18P-dIc7tBLFDbbB0wguUo4jU/view?usp=sharing"
          target="_blank"
        >
          Download CV →
        </Link>
      </header>

      <section className="hero-marquee">
        <h1 className="display-xxl">Mobile apps and frontend, built for reliability.</h1>
      </section>

      <hr className="rule-thick" aria-hidden="true" />

      <section className="below-fold">
        <div className="intro-grid reveal" style={{ "--i": 0 } as React.CSSProperties}>
          <div className="lede-block">
            <p className="lede">
              Mobile apps and frontend engineer building resilient, well-paced interfaces for
              mobile products and web platforms.
            </p>
            <p className="lede lede-muted">
              I work across Flutter, React, and Next.js, keeping delivery tight and interfaces
              accessible.
            </p>
            <div className="hero-links">
              <Link className="link" href="#contact">
                Start a project →
              </Link>
              <Link className="link" href="#experience">
                View experience →
              </Link>
            </div>
          </div>
          <figure className="portrait">
            <Image
              src="https://res.cloudinary.com/febryar/image/upload/v1741435733/Febry_Ardiansyah_-_IT_c9x8wf.jpg"
              alt="Febry Ardiansyah"
              width={720}
              height={900}
              priority
            />
            <figcaption>Mobile apps & frontend engineering.</figcaption>
          </figure>
        </div>

        <section id="focus" className="section reveal" style={{ "--i": 1 } as React.CSSProperties}>
          <header className="head-hang">
            <h2>Focus</h2>
          </header>
          <div className="section-body">
            <p>
              Exploring AI integration in mobile apps and advanced Flutter animations while staying
              grounded in performance and reliability.
            </p>
          </div>
        </section>

        <section id="skills" className="section reveal" style={{ "--i": 2 } as React.CSSProperties}>
          <header className="head-hang">
            <h2>Skills</h2>
          </header>
          <div className="section-body">
            <p className="section-lede">
              Tooling that keeps me nimble across mobile and web. I keep the stack small and
              dependable.
            </p>
            <ul className="skill-grid" role="list">
              {skills.map((skill) => (
                <li key={skill} className="skill-pill">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="projects"
          className="section reveal"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <header className="head-hang">
            <h2>Top projects</h2>
          </header>
          <div className="section-body">
            <p className="section-lede">Most-starred work pulled from GitHub.</p>
            {topRepos.length > 0 ? (
              <div className="projects-grid">
                {topRepos.map((repo) => (
                  <article key={repo.id} className="project-card">
                    <div className="project-head">
                      <Link
                        className="project-title"
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {repo.name}
                      </Link>
                      <div className="project-meta">
                        <span>Stars {repo.stargazers_count}</span>
                        <span>Forks {repo.forks_count}</span>
                        {repo.language && <span>{repo.language}</span>}
                      </div>
                    </div>
                    <p className={repo.description ? "project-desc" : "project-desc project-desc-muted"}>
                      {repo.description ?? "No description yet."}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="section-lede">Projects are unavailable right now.</p>
            )}
          </div>
        </section>

        <section
          id="experience"
          className="section reveal"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          <header className="head-hang">
            <h2>Experience</h2>
          </header>
          <div className="section-body">
            <p className="section-lede">
              Shipping product work with teams across finance, commerce, and consumer platforms.
            </p>
            <div className="experience-list">
              {experiences.map((item) => (
                <article key={`${item.company}-${item.period}`} className="experience-item">
                  <div className="experience-meta">
                    <span className="experience-period">{item.period}</span>
                    <span className="experience-sep">•</span>
                    <span>{item.mode}</span>
                  </div>
                  <h3 className="experience-role">{item.role}</h3>
                  <p className="experience-company">{item.company}</p>
                  <ul className="experience-points" role="list">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  {item.skillSet && (
                    <ul className="experience-skills" role="list">
                      {item.skillSet.map((skill) => (
                        <li key={skill} className="experience-skill">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="connect"
          className="section reveal"
          style={{ "--i": 5 } as React.CSSProperties}
        >
          <header className="head-hang">
            <h2>Connect</h2>
          </header>
          <div className="section-body">
            <p className="section-lede">A few places where I publish work and updates.</p>
            <ul className="connect-list" role="list">
              {socials.map((social) => (
                <li key={social.name}>
                  <Link className="link" href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.name} {social.username} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="section reveal" style={{ "--i": 6 } as React.CSSProperties}>
          <header className="head-hang">
            <h2>Contact</h2>
          </header>
          <div className="section-body">
            <p className="section-lede">
              Tell me about the product, the timeline, and what success looks like.
            </p>
            <form className="contact-form">
              <label className="field">
                <span>Name</span>
                <input type="text" name="name" placeholder="Your name" />
              </label>
              <label className="field">
                <span>Email address</span>
                <input type="email" name="email" placeholder="you@email.com" />
              </label>
              <label className="field">
                <span>Subject</span>
                <input type="text" name="subject" placeholder="Project inquiry" />
              </label>
              <label className="field">
                <span>Message</span>
                <textarea name="message" rows={4} placeholder="Tell me about the work." />
              </label>
              <button type="submit" className="btn-primary">
                Send message →
              </button>
            </form>
          </div>
        </section>
      </section>

      <footer className="foot-dense mono">
        <p>
          Colophon — set in Fraunces, IBM Plex Sans, and JetBrains Mono. Built with Next.js and
          Tailwind CSS. Replies at{" "}
          <a className="link" href="mailto:febryardiansyah27@gmail.com">
            febryardiansyah27@gmail.com
          </a>
          .
        </p>
      </footer>
    </main>
  )
}

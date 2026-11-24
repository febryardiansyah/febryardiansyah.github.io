import {
  ChevronDown,
  Code2,
  Download,
  GitFork,
  Github,
  MapPin,
  PanelsTopLeft,
  Plus,
  Star,
} from "lucide-react"
import CoreStack from "@/components/core-stack"
import SectionNav from "@/components/section-nav"
import MadeProjectsSection from "@/components/made-projects-section"
import TerminalStage from "@/components/terminal-stage"
import ContactForm from "@/components/contact-form"
import StravaFAB from "@/components/strava-fab"
import { experiences } from "./data/experiences"
import { getTopRepos } from "./data/github"
import { skills } from "./data/skills"
import { socials } from "./data/socials"

const cv = "https://drive.google.com/file/d/1CC8hQ_k18P-dIc7tBLFDbbB0wguUo4jU/view?usp=sharing"
const profile = "https://github.com/febryardiansyah"
const portfolioRepos = [
  { name: "manga-api", description: "Manga and comic REST API in Bahasa Indonesia.", language: "TypeScript" },
  { name: "manga_mint", description: "An online manga reader in Bahasa Indonesia.", language: "Dart" },
  { name: "animku", description: "An unofficial MyAnimeList application.", language: "Dart" },
  {
    name: "petgram-mobile",
    description: "A Flutter social app with pet image recognition.",
    language: "Dart",
  },
]
export default async function Home() {
  const topRepos = await getTopRepos().catch(() => [])
  const repositories = topRepos.length
    ? topRepos
    : portfolioRepos.map((repo) => ({
        ...repo,
        html_url: `${profile}/${repo.name}`,
        stargazers_count: null,
        forks_count: null,
      }))
  return (
    <div id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SectionNav />
      <main id="main">
        <section className="hero" aria-labelledby="portfolio-title">
          <img className="valley-backdrop" src="/portfolio/spring-valley.webp" alt="" fetchPriority="high" />
          <div className="spring-wind" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => (
              <i key={i} style={{ "--petal": i } as React.CSSProperties} />
            ))}
          </div>
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="hero-role">
                <span aria-hidden="true" /> Mobile &amp; frontend engineer
              </p>
              <h1 id="portfolio-title" aria-label="Febry Ardiansyah">
                <span className="hero-name-line" aria-hidden="true">
                  <span>Febry</span>
                </span>
                <span className="hero-name-line" aria-hidden="true">
                  <span>
                    Ardiansyah<span className="name-period">.</span>
                  </span>
                </span>
              </h1>
              <p className="hero-intro">
                I build mobile apps and web experiences with Flutter and React, from the first interface to
                the final release.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#made-projects">
                  <PanelsTopLeft size={17} />
                  Explore my work
                </a>
                <a className="button secondary" href={cv} target="_blank" rel="noreferrer">
                  <Download size={16} />
                  Download CV
                </a>
              </div>
              <div className="hero-location">
                <MapPin size={14} /> Based in Indonesia
              </div>
            </div>
            <TerminalStage />
          </div>
          <CoreStack />
        </section>
        <MadeProjectsSection />
        <section id="about" className="container content-section about-section">
          <div className="profile-picture">
            <img
              loading="lazy"
              src="/portfolio/portrait.webp"
              width={640}
              height={640}
              alt="Febry’s illustrated profile portrait"
            />
          </div>
          <div className="about-copy">
            <h2>
              About me<span>.</span>
            </h2>
            <p>
              I’m Febry, a mobile and frontend engineer based in Indonesia. I work on the things between a
              design and a release, from a Flutter interface to the API behind it.
            </p>
            <p>
              My work spans finance, commerce, and education. At Bank Indonesia, I build mobile tools that
              help people find information and get their work done.
            </p>
            <div id="skills">
              <h3>My toolkit</h3>
              <ul className="tags">
                {skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <StravaFAB />
          </div>
        </section>
        <section id="experience" className="container content-section">
          <div className="section-heading">
            <div>
              <h2>
                Experience<span>.</span>
              </h2>
              <p>Mobile and frontend roles, from the first release onward.</p>
            </div>
            <a className="text-action" target="_blank" rel="noreferrer" href={cv}>
              <Download size={15} />
              Download CV
            </a>
          </div>
          <div className="experience-list">
            {experiences.map((item) => (
              <details key={item.period} className="experience-item">
                <summary>
                  <span className="period">{item.period}</span>
                  <span className="experience-title">
                    <strong>{item.role}</strong>
                    <span>{item.company}</span>
                  </span>
                  <Plus className="disclosure-icon" size={20} />
                </summary>
                <div className="experience-detail">
                  <span className="project-category">{item.mode}</span>
                  <ul className="points">
                    {item.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <ul className="tags">
                    {item.skillSet.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>
        <section id="projects" className="container content-section">
          <div className="section-heading">
            <div>
              <h2>
                Open source<span>.</span>
              </h2>
              <p>Code and experiments from my GitHub.</p>
            </div>
            <a className="text-action" href={profile} target="_blank" rel="noreferrer">
              <Github size={16} />
              GitHub profile
            </a>
          </div>
          <div className="repo-grid">
            {repositories.map((repo) => (
              <a key={repo.name} href={repo.html_url} target="_blank" rel="noreferrer" className="repo-card">
                <Code2 size={21} />
                <h3>{repo.name}</h3>
                {repo.description && <p>{repo.description}</p>}
                <div className="repo-meta">
                  {repo.language && <span>{repo.language}</span>}
                  {repo.stargazers_count !== null && (
                    <span>
                      <Star size={13} />
                      {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count !== null && (
                    <span>
                      <GitFork size={13} />
                      {repo.forks_count}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div>
              <h2>
                Get in touch<span>.</span>
              </h2>
              <p>Tell me about the product you have in mind.</p>
              <a className="email" href="mailto:febryardiansyah27@gmail.com">
                febryardiansyah27@gmail.com
              </a>
              <div id="connect" className="socials">
                {socials.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noreferrer">
                    {s.name === "Twitter" ? "X / Twitter" : s.name}
                  </a>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="container footer">
        <span>© {new Date().getFullYear()} Febry Ardiansyah</span>
        <a href="#top">
          Back to top <ChevronDown size={14} />
        </a>
      </footer>
    </div>
  )
}

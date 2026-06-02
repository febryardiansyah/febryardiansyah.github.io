import type React from "react"
import Image from "next/image"
import Link from "next/link"
import SectionNav from "@/components/section-nav"
import { experiences } from "./data/experiences"
import { getTopRepos } from "./data/github"
import { madeProjects } from "./data/made-projects"
import { skills } from "./data/skills"
import { socials } from "./data/socials"

export default async function Home() {
  const topRepos = await getTopRepos()

  return (
    <main id="top" className="page">
      <SectionNav />
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
              Focused on Flutter delivery, clean architecture, and AI-driven features, with
              hands-on builds across crypto and blockchain experiences.
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
          id="made-projects"
          className="section reveal"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <header className="head-hang">
            <h2>Selected projects</h2>
          </header>
          <div className="section-body">
            <p className="section-lede">A few products I have built recently.</p>
            <div className="made-grid">
              {madeProjects.map((project) => (
                <article key={project.name} className="made-card">
                  <figure className="made-media">
                    <Image src={project.image} alt={project.imageAlt} width={1200} height={720} />
                  </figure>
                  <Link className="made-title" href={project.href} target="_blank" rel="noopener noreferrer">
                    {project.name}
                  </Link>
                  <p className="made-desc">{project.description}</p>
                  <ul className="made-stack" role="list">
                    {project.stack.map((tech) => (
                      <li key={tech} className="made-tag">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="section reveal"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          <header className="head-hang">
            <h2>Top Open Source projects</h2>
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
          style={{ "--i": 5 } as React.CSSProperties}
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
          style={{ "--i": 6 } as React.CSSProperties}
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

        <section id="contact" className="section reveal" style={{ "--i": 7 } as React.CSSProperties}>
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

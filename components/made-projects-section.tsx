"use client"

import { useState } from "react"
import { BookOpen, ChevronDown, ChevronUp, ExternalLink, Layers, PawPrint, Play, Plus } from "lucide-react"
import { madeProjects, type MadeProject } from "@/app/data/made-projects"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

function ProjectCover({ project }: { project: MadeProject }) {
  return (
    <div className={`project-cover cover-${project.id}`} aria-hidden="true">
      {project.id === "bi" && (
        <>
          <div className="workplace-brand">
            <img src="/portfolio/bi-icon.webp" alt="" />
          </div>
          <div className="store-device">
            <img loading="lazy" src="/portfolio/bi.webp" alt="" />
          </div>
        </>
      )}
      {project.id === "monefi" && (
        <>
          <strong className="finance-brand">
            monefi<span>•</span>
          </strong>
          <div className="dashboard-window">
            <div className="browser-dots">
              <i />
              <i />
              <i />
            </div>
            <img loading="lazy" src="/portfolio/monefi.webp" alt="" />
          </div>
        </>
      )}
      {project.id === "cariilmu" && (
        <>
          <b className="learning-brand">
            cariilmu<span>.</span>
          </b>
          <div className="book-stack">
            <i />
            <i />
            <i>
              <BookOpen />
            </i>
            <b>
              <Play size={27} fill="currentColor" />
            </b>
          </div>
        </>
      )}
      {project.id === "muatparts" && (
        <>
          <strong className="parts-brand">
            muatparts<span>PLUS</span>
          </strong>
          <div className="store-device">
            <img loading="lazy" src="/portfolio/muatparts.webp" alt="" />
          </div>
        </>
      )}
      {project.id === "petgram" && (
        <>
          <strong className="pet-brand">Petgram</strong>
          <div className="app-tile">
            <PawPrint />
          </div>
        </>
      )}
      {project.id === "mangamint" && (
        <>
          <strong className="manga-brand">MangaMint</strong>
          <div className="app-tile">
            <BookOpen />
          </div>
        </>
      )}
    </div>
  )
}

function ProjectCard({ project }: { project: MadeProject }) {
  const [failed, setFailed] = useState(false)
  return (
    <article className="project-card">
      <Dialog>
        <DialogTrigger asChild>
          <button className="project-trigger" aria-label={`Explore ${project.name}`}>
            <ProjectCover project={project} />
            <span className="card-info">
              <span className="project-category">{project.category}</span>
              <span className="project-name">
                {project.name}
                <Plus size={19} />
              </span>
              <span className="project-summary">{project.summary}</span>
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="project-dialog">
          <div className="detail-image">
            <ProjectCover project={project} />
            {!failed && (
              <img
                src={project.image}
                alt={`${project.name} project preview`}
                onError={() => setFailed(true)}
              />
            )}
          </div>
          <div className="detail-copy">
            <span className="project-category">{project.category}</span>
            <DialogTitle>{project.name}</DialogTitle>
            <DialogDescription>{project.description}</DialogDescription>
            <ul className="tags">
              {project.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <a className="button primary" target="_blank" rel="noreferrer" href={project.href}>
              {project.linkLabel}
              <ExternalLink size={15} />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  )
}

export default function MadeProjectsSection() {
  const [all, setAll] = useState(false)
  return (
    <section id="made-projects" className="container content-section work-section">
      <div className="section-heading">
        <div>
          <h2>
            Selected <em>work</em><span>.</span>
          </h2>
          <p>Products I’ve built for mobile and web.</p>
        </div>
        <button
          type="button"
          className="text-action"
          aria-expanded={all}
          aria-controls="project-grid"
          onClick={() => setAll(!all)}
        >
          <Layers size={15} />
          {all ? "Show featured" : `All ${madeProjects.length} projects`}
          {all ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
      <div className="project-grid" id="project-grid">
        {(all ? madeProjects : madeProjects.slice(0, 3)).map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}

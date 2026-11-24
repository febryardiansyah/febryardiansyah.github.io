"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ExternalLink, Layers, Plus } from "lucide-react"
import { madeProjects, type MadeProject } from "@/app/data/made-projects"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

function ProjectCover({ project, detail = false }: { project: MadeProject; detail?: boolean }) {
  const [failed, setFailed] = useState(false)
  const localImage = project.id === "monefi" ? "/portfolio/monefi.webp" : `/portfolio/${project.id}-showcase.webp`
  return (
    <img
      className={detail ? "project-photo detail-photo" : "project-photo"}
      src={failed ? localImage : project.image}
      alt={detail ? `${project.name} project preview` : ""}
      loading={detail ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

function ProjectCard({ project }: { project: MadeProject }) {
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
          <ProjectCover project={project} detail />
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

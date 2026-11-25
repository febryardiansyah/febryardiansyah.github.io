"use client"

import { useState, type CSSProperties, type PointerEvent } from "react"
import { motion, useReducedMotion, useSpring } from "framer-motion"
import { ArrowUpRight, ChevronDown, ChevronUp, ExternalLink, Layers } from "lucide-react"
import { madeProjects, type MadeProject } from "@/app/data/made-projects"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

function ProjectCover({ project, detail = false }: { project: MadeProject; detail?: boolean }) {
  const [failed, setFailed] = useState(false)
  const localImage = project.id === "monefi" ? "/portfolio/monefi.webp" : `/portfolio/${project.id}-showcase.webp`
  return (
    <img
      className={detail ? "project-photo detail-photo" : "project-photo"}
      src={detail && !failed ? project.image : localImage}
      alt={detail ? `${project.name} project preview` : ""}
      loading={detail ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

const rebound = { type: "spring", stiffness: 370, damping: 19 } as const

function ProjectCard({ project, index }: { project: MadeProject; index: number }) {
  const reduced = useReducedMotion()
  const tiltX = useSpring(0, rebound)
  const tiltY = useSpring(0, rebound)

  function followPointer(event: PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== "mouse") return
    const bounds = event.currentTarget.getBoundingClientRect()
    tiltX.set((0.5 - (event.clientY - bounds.top) / bounds.height) * 10)
    tiltY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12)
  }

  function settle() {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <article
      className="project-card"
      style={{ "--card-delay": `${(index % 3) * 55}ms` } as CSSProperties}
      onPointerMove={followPointer}
      onPointerLeave={settle}
      onPointerCancel={settle}
    >
      <Dialog>
        <DialogTrigger asChild>
          <motion.button
            className="project-trigger"
            aria-label={`Explore ${project.name}`}
            style={reduced ? undefined : { rotateX: tiltX, rotateY: tiltY, transformPerspective: 850 }}
            whileHover={reduced ? undefined : { y: -7 }}
            whileTap={reduced ? undefined : { scaleX: 1.025, scaleY: 0.94, y: 2 }}
            transition={rebound}
          >
            <span className="card-info">
              <span className="project-category">{project.category}</span>
              <span className="project-name">{project.name}</span>
              <span className="project-summary">{project.summary}</span>
            </span>
            <span className="project-stage">
              <ProjectCover project={project} />
              <span className="project-speed-lines" aria-hidden="true" />
            </span>
            <span className="project-footer">
              <span className="project-stack">{project.stack.slice(0, 2).join(" / ")}</span>
              <span className="project-open" aria-hidden="true"><ArrowUpRight size={17} /></span>
            </span>
          </motion.button>
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
  const [activations, setActivations] = useState(0)
  const reduced = useReducedMotion()
  return (
    <section id="made-projects" className="container content-section work-section">
      <div className="section-heading">
        <div>
          <h2>
            Selected <em>work</em><span>.</span>
          </h2>
          <p>Products I’ve built for mobile and web.</p>
        </div>
        <motion.button
          type="button"
          whileTap={reduced ? undefined : { scaleX: 1.09, scaleY: 0.77, rotate: -3 }}
          transition={rebound}
          className="text-action"
          aria-expanded={all}
          aria-controls="project-grid"
          onClick={() => {
            setAll((expanded) => !expanded)
            setActivations((count) => count + 1)
          }}
        >
          {activations > 0 && (
            <span key={activations} className="gallery-impact" aria-hidden="true">
              {Array.from({ length: 10 }, (_, i) => (
                <i key={i} style={{ "--angle": `${i * 36 + 12}deg` } as CSSProperties} />
              ))}
            </span>
          )}
          <Layers size={15} />
          {all ? "Show featured" : `All ${madeProjects.length} projects`}
          {all ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </motion.button>
      </div>
      <div className="project-grid" id="project-grid">
        {(all ? madeProjects : madeProjects.slice(0, 3)).map((p, index) => (
          <ProjectCard key={p.id} project={p} index={index} />
        ))}
      </div>
    </section>
  )
}

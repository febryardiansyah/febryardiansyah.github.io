"use client"

import Image from "next/image"
import Link from "next/link"
import { madeProjects } from "@/app/data/made-projects"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const VISIBLE_COUNT = 3

export default function MadeProjectsSection() {
  return (
    <>
      <div className="made-grid">
        {madeProjects.slice(0, VISIBLE_COUNT).map((project) => (
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

        <Dialog>
          <DialogTrigger asChild>
            <button className="made-card made-see-more-card">
              <span className="made-see-more-icon">+</span>
              <span className="made-see-more-label">See more</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            <DialogTitle className="sr-only">All selected projects</DialogTitle>
            <DialogDescription className="sr-only">
              A complete list of selected projects.
            </DialogDescription>
            <div className="made-grid-dialog">
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
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
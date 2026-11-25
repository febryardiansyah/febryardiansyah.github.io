"use client"

import { useEffect, useRef, useState } from "react"

function letteringFor(control: HTMLElement) {
  if (control.matches(".primary, .project-trigger, .view-door")) return "don"
  if (control.matches("summary, [aria-expanded], .activity-button")) return "pon"
  if (control.matches("a[href^='#']")) return "shu"
  return "kachi"
}

type Impact = { x: number; y: number; sequence: number; word: ReturnType<typeof letteringFor> }

export default function PortfolioMotion() {
  const [impact, setImpact] = useState<Impact | null>(null)
  const sequence = useRef(0)

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const root = document.getElementById("top")
    if (!root) return

    if (!preference.matches) {
      for (const word of ["don", "pon", "shu", "kachi"]) {
        new Image().src = `/portfolio/sfx/${word}.webp`
      }
    }

    function activate(event: MouseEvent) {
      if (preference.matches || !(event.target instanceof Element)) return
      const control = event.target.closest<HTMLElement>("a, button, summary")
      if (!control || !control.closest("#top, .project-dialog, .activity-dialog")) return
      const bounds = control.getBoundingClientRect()
      setImpact({
        x: event.detail ? event.clientX : bounds.right - Math.min(20, bounds.width / 2),
        y: event.detail ? event.clientY : bounds.top + bounds.height / 2,
        sequence: ++sequence.current,
        word: letteringFor(control),
      })
    }

    const sections = root.querySelectorAll("main > section")
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-arrived")
          observer.unobserve(entry.target)
        }
      }
    }, { rootMargin: "0px 0px -5% 0px" })
    sections.forEach(section => observer.observe(section))
    document.addEventListener("click", activate, true)
    return () => {
      document.removeEventListener("click", activate, true)
      observer.disconnect()
    }
  }, [])

  if (!impact) return null
  return (
    <div key={impact.sequence} className="ink-effects" aria-hidden="true">
      <svg
        className="ink-impact"
        style={{ left: impact.x, top: impact.y }}
        viewBox="-64 -64 128 128"
      >
        <circle className="impact-ring" r="18" />
        {[12, 54, 96, 147, 184, 226, 274, 312].map((angle, i) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <path className="impact-shard" d={i % 2 ? "M16 0l18 -3 -4 5Z" : "M18 0l28 -4 -8 7Z"} />
          </g>
        ))}
      </svg>
      <img
        className="impact-lettering"
        src={`/portfolio/sfx/${impact.word}.webp`}
        alt=""
        draggable={false}
        style={{
          left: `clamp(var(--margin), ${impact.x}px, calc(100% - var(--margin)))`,
          top: `clamp(60px, ${impact.y < 105 ? impact.y + 54 : impact.y - 52}px, calc(100% - 55px))`,
        }}
        onAnimationEnd={() => setImpact(null)}
      />
    </div>
  )
}

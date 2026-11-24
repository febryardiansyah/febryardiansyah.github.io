"use client"

import { useEffect, useRef, useState } from "react"
import { Menu, X, Mail } from "lucide-react"

const sections = [
  { id: "made-projects", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
]

export default function SectionNav() {
  const [open, setOpen] = useState(false)
  const button = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!open) return
    function escape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false)
        button.current?.focus()
      }
    }
    function outside(e: PointerEvent) {
      if (!header.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("keydown", escape)
    document.addEventListener("pointerdown", outside)
    return () => {
      document.removeEventListener("keydown", escape)
      document.removeEventListener("pointerdown", outside)
    }
  }, [open])
  return (
    <header className="site-header" ref={header}>
      <div className="container nav-inner">
        <a
          href="#top"
          aria-label="Febry Ardiansyah, home"
          className="wordmark"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          febryards<span className="wordmark-dot">.</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>
            <Mail size={15} /> Get in touch
          </a>
          <button
            ref={button}
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)}>
                {s.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

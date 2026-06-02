'use client'

import { useEffect, useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"
import { Briefcase, Github, Home, Layers, Mail, Share2, Sparkles, Wrench } from "lucide-react"

type SectionItem = {
  id: string
  label: string
  icon: LucideIcon
}

const sections: SectionItem[] = [
  { id: "top", label: "Top", icon: Home },
  { id: "focus", label: "Focus", icon: Sparkles },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "made-projects", label: "Selected", icon: Layers },
  { id: "projects", label: "Open source", icon: Github },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "connect", label: "Connect", icon: Share2 },
  { id: "contact", label: "Contact", icon: Mail },
]

export default function SectionNav() {
  const [activeId, setActiveId] = useState("top")
  const activeIdRef = useRef("top")

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (targets.length === 0) {
      return
    }

    const getClosestSection = () => {
      if (window.scrollY < 120) {
        if (activeIdRef.current !== "top") {
          activeIdRef.current = "top"
          setActiveId("top")
        }
        return
      }

      const viewportCenter = window.innerHeight * 0.4
      let closestId = activeIdRef.current
      let closestDistance = Number.POSITIVE_INFINITY

      targets.forEach((target) => {
        const rect = target.getBoundingClientRect()
        const distance = Math.abs(rect.top - viewportCenter)
        if (distance < closestDistance) {
          closestDistance = distance
          closestId = target.id
        }
      })

      if (closestId !== activeIdRef.current) {
        activeIdRef.current = closestId
        setActiveId(closestId)
      }
    }

    const handleScroll = () => {
      window.requestAnimationFrame(getClosestSection)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
    <nav className="section-nav" aria-label="Section navigation">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          data-active={activeId === section.id}
          aria-current={activeId === section.id ? "true" : undefined}
        >
          <span className="section-nav-icon" aria-hidden="true">
            <section.icon />
          </span>
          <span className="section-nav-label">{section.label}</span>
        </a>
      ))}
    </nav>
  )
}

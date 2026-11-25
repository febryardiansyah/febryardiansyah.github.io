"use client"

import { useEffect, useState } from "react"

const revealSeconds = 5

export default function ProfilePicture() {
  const [requested, setRequested] = useState(false)
  const [deadline, setDeadline] = useState<number | null>(null)

  useEffect(() => {
    if (deadline === null) return
    const expiresAt = deadline
    function update() {
      if (Date.now() >= expiresAt) {
        setRequested(false)
        setDeadline(null)
      }
    }
    const timeout = window.setTimeout(update, Math.max(0, expiresAt - Date.now()))
    document.addEventListener("visibilitychange", update)
    return () => {
      clearTimeout(timeout)
      document.removeEventListener("visibilitychange", update)
    }
  }, [deadline])

  return (
    <button
      type="button"
      className="profile-picture"
      aria-label="Reveal Febry’s photo for five seconds"
      aria-pressed={requested}
      onClick={() => {
        setRequested(!requested)
        setDeadline(null)
      }}
    >
      <img loading="lazy" src="/portfolio/portrait.webp" width={640} height={640} alt="Febry’s illustrated portrait" />
      {requested && (
        <img
          className="portrait-reveal"
          src="/portfolio/portrait-photo.webp"
          alt="Febry wearing glasses"
          width={800}
          height={800}
          onLoad={() => setDeadline(Date.now() + revealSeconds * 1000)}
          onError={() => setRequested(false)}
        />
      )}
    </button>
  )
}

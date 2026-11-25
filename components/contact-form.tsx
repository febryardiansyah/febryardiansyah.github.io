"use client"

import { Mail } from "lucide-react"
import type { FormEvent } from "react"

export const email = "febryardiansyah27@gmail.com"

function typingDust(event: FormEvent<HTMLFormElement>) {
  const field = event.target
  if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
  const label = field.closest("label")
  if (!label) return

  // A hidden line with the field's metrics follows wrapping, selection and scrolling.
  const mirror = document.createElement("span")
  const style = getComputedStyle(field)
  mirror.className = "contact-caret-mirror"
  mirror.style.font = style.font
  mirror.style.lineHeight = style.lineHeight
  mirror.style.letterSpacing = style.letterSpacing
  mirror.style.width = `${field.clientWidth}px`
  mirror.style.padding = style.padding
  const multiline = field instanceof HTMLTextAreaElement
  mirror.style.whiteSpace = multiline ? "pre-wrap" : "pre"
  const caret = field.selectionStart ?? field.value.length
  const marker = document.createElement("span")
  marker.textContent = field.value.slice(caret, caret + 1) || "\u200b"
  mirror.append(field.value.slice(0, caret), marker, field.value.slice(caret + 1))
  label.append(mirror)
  const x = marker.offsetLeft - field.scrollLeft
  const y = marker.offsetTop - field.scrollTop + parseFloat(style.lineHeight) * .75
  mirror.remove()

  const puff = document.createElement("span")
  puff.className = "contact-dust"
  puff.setAttribute("aria-hidden", "true")
  puff.style.left = `${field.offsetLeft + field.clientLeft + Math.min(field.clientWidth - 8, Math.max(4, x))}px`
  puff.style.top = `${field.offsetTop + field.clientTop + Math.min(field.clientHeight - 4, Math.max(4, y))}px`
  label.append(puff)
  const drift = Math.random() * 12 - 6
  const flight = puff.animate([
    { transform: "translate(2px, 0) scale(.4)", opacity: 0 },
    { transform: "translate(4px, -5px) scale(1)", opacity: 1, offset: .25 },
    { transform: `translate(${drift}px, -20px) scale(.65)`, opacity: 0 },
  ], 400)
  flight.onfinish = () => puff.remove()
  flight.oncancel = () => puff.remove()
  field.animate([{ scale: "1 .985" }, { scale: "1 1.008", offset: .6 }, { scale: "1" }], 170)
}

export default function ContactForm() {
  function compose(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = `${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(String(data.get("subject")))}&body=${encodeURIComponent(body)}`
  }
  return (
    <form
      className="contact-form"
      onSubmit={compose}
      onInput={typingDust}
      action={`mailto:${email}`}
      method="post"
      encType="text/plain"
    >
      <label>
        Your name
        <input required name="name" autoComplete="name" placeholder="Name" />
      </label>
      <label>
        Email address
        <input required name="email" type="email" autoComplete="email" placeholder="you@example.com" />
      </label>
      <label className="wide">
        Subject
        <input required name="subject" placeholder="Project inquiry" />
      </label>
      <label className="wide">
        Message
        <textarea required name="message" rows={3} placeholder="Tell me about your project." />
      </label>
      <button className="button primary wide" type="submit">
        <Mail size={16} />
        Open email draft
      </button>
    </form>
  )
}

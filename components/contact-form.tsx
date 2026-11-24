"use client"

import { Mail } from "lucide-react"
import type { FormEvent } from "react"

export const email = "febryardiansyah27@gmail.com"

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

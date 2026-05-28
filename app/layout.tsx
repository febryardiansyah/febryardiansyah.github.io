import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Fraunces, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google"
import StravaFAB from "@/components/strava-fab"

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
})

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Febry Ardiansyah | Mobile App and Frontend Engineer",
  description:
    "Personal website of Febry Ardiansyah, a Mobile App and Front End Engineer specializing in Flutter, Firebase, and modern web technologies.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
        {children}
        <StravaFAB />
      </body>
    </html>
  )
}


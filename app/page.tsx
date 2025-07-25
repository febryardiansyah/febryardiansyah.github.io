import { Github, Twitter, Linkedin, Mail, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import InteractiveBackground from "@/components/interactive-background"
import Image from "next/image"
import SplashCursorContainer from "@/components/splash-cursor-container"

export default function Home() {
  return (
    <main className="min-h-screen text-zinc-100 flex flex-col items-center justify-center p-4 relative">
      <InteractiveBackground />
      <SplashCursorContainer />
      <div className="max-w-3xl w-full space-y-8 relative z-10">
        {/* Header Section */}
        <section className="space-y-4 bg-zinc-900/40 p-6 rounded-lg backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-emerald-500/30 flex-shrink-0">
              <Image
                src="https://res.cloudinary.com/febryar/image/upload/v1741435733/Febry_Ardiansyah_-_IT_c9x8wf.jpg"
                alt="Febry Ardiansyah"
                fill
                sizes="80px"
                className="object-cover"
                style={{ objectPosition: "center" }}
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold font-mono">Febry Ardiansyah</h1>
              <p className="text-zinc-400 font-mono">Mobile Apps and Frontend Engineer</p>
            </div>
          </div>
        </section>

        <Separator className="bg-zinc-700/50" />

        {/* About Section */}
        <section className="space-y-4 bg-zinc-900/40 p-6 rounded-lg backdrop-blur-md">
          <h2 className="text-xl font-bold font-mono flex items-center">
            <span className="text-emerald-400 mr-2">{">"}</span> About Me
          </h2>
          <p className="text-zinc-300">
            I'm a passionate Mobile App and Front End Engineer with expertise in building cross-platform mobile
            applications and modern web interfaces. I specialize in Flutter, React, TypeScript, and Next.js, with a
            focus on creating performant and accessible user experiences across different devices and platforms.
          </p>
        </section>

        {/* Resume Section */}
        <section className="space-y-4 bg-zinc-900/40 p-6 rounded-lg backdrop-blur-md">
          <h2 className="text-xl font-bold font-mono flex items-center">
            <span className="text-emerald-400 mr-2">{">"}</span> Resume
          </h2>
          <div>
            <Link
              href="https://drive.google.com/file/d/1AOHZpkqbuNiuvFVkAwJq8aU0aBDcOoif/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                <FileDown size={16} />
                Download Resume
              </Button>
            </Link>
            <p className="text-zinc-400 mt-2 text-sm">Get my detailed work experience and qualifications.</p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="space-y-4 bg-zinc-900/40 p-6 rounded-lg backdrop-blur-md">
          <h2 className="text-xl font-bold font-mono flex items-center">
            <span className="text-emerald-400 mr-2">{">"}</span> Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm">
              Flutter
            </Badge>
            <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm">
              Dart
            </Badge>
            <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm">
              Firebase
            </Badge>
            <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm">
              React
            </Badge>
            <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm">
              Next.js
            </Badge>
            <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm">
              TypeScript
            </Badge>
            <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm">
              JavaScript
            </Badge>
            <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm">
              TailwindCSS
            </Badge>
            <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm">
              REST API
            </Badge>
            <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm">
              Git
            </Badge>
          </div>
        </section>

        <Separator className="bg-zinc-700/50" />

        {/* Contact Section */}
        <section className="space-y-4 bg-zinc-900/40 p-6 rounded-lg backdrop-blur-md">
          <h2 className="text-xl font-bold font-mono flex items-center">
            <span className="text-emerald-400 mr-2">{">"}</span> Connect
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="https://github.com/febryardiansyah/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-zinc-900/70 border-zinc-800 hover:bg-zinc-800 hover:text-emerald-400 backdrop-blur-sm"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://x.com/febryards" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-zinc-900/70 border-zinc-800 hover:bg-zinc-800 hover:text-blue-400 backdrop-blur-sm"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
            <Link
              href="https://www.linkedin.com/in/febry-ardiansyah-a4b580170/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-zinc-900/70 border-zinc-800 hover:bg-zinc-800 hover:text-blue-500 backdrop-blur-sm"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="mailto:febryardiansyah27@gmail.com">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-zinc-900/70 border-zinc-800 hover:bg-zinc-800 hover:text-amber-400 backdrop-blur-sm"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 pb-4 text-center text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} Febry Ardiansyah. All rights reserved.</p>
          <p className="font-mono mt-1">{"// Built with Next.js and TailwindCSS"}</p>
        </footer>
      </div>
    </main>
  )
}


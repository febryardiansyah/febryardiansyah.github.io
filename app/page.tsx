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
    <main className="min-h-screen text-zinc-100 flex flex-col items-center justify-center p-4 pb-20 relative">
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



        {/* Experience Section */}
        <section className="space-y-4 bg-zinc-900/40 p-6 rounded-lg backdrop-blur-md">
          <h2 className="text-xl font-bold font-mono flex items-center">
            <span className="text-emerald-400 mr-2">{">"}</span> Experience
          </h2>
          <div className="space-y-6">
            {/* Carillimu: Frontend Engineer */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-bold">Carillimu: Frontend Engineer</h3>
                <div className="text-sm text-zinc-400">Nov 2024 - Feb 2025 | Remote | Jakarta, Indonesia</div>
              </div>
              <ul className="list-disc pl-5 text-zinc-300 space-y-1 text-sm">
                <li>Translating designs and wireframes into efficient and reusable components using TailwindCSS.</li>
                <li>Integrating RESTful APIs to fetch and display data dynamically.</li>
                <li>Managing application state effectively using Context API.</li>
                <li>Applying responsive design principles to ensure cross-browser and mobile compatibility.</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm text-xs">
                  NextJs
                </Badge>
                <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm text-xs">
                  Tailwind
                </Badge>
                <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm text-xs">
                  SASS
                </Badge>
                <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm text-xs">
                  TypeScript
                </Badge>
                <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm text-xs">
                  Axios
                </Badge>
                <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm text-xs">
                  Git
                </Badge>
              </div>
            </div>

            {/* Carillimu: Mobile Engineer */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-bold">Carillimu: Mobile Engineer</h3>
                <div className="text-sm text-zinc-400">May 2022 - Feb 2025 | Remote | Jakarta, Indonesia</div>
              </div>
              <ul className="list-disc pl-5 text-zinc-300 space-y-1 text-sm">
                <li>Successfully created and launched Carillimu App on both the App Store and Play Store on time.</li>
                <li>Implementing design into application with precision and perfect pixel.</li>
                <li>Create a custom interactive video player according to the design.</li>
                <li>Managing and organizing code structure responsively to ensure scalability and maintainability.</li>
                <li>Implementing API communication, push notifications, analytics, crash reporting, and local data storage.</li>
                <li>Utilizing BLoC as the state management to separate presentation from business logic, making the code fast, easy to test, and reusable.</li>
                <li>Collaborating effectively with backend developers, frontend developers, and UX/UI designers.</li>
                <li>Developing features that integrate with native code, including Kotlin (Android) and Swift (iOS).</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm text-xs">
                  Flutter
                </Badge>
                <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm text-xs">
                  Firebase
                </Badge>
                <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm text-xs">
                  Facebook SDK
                </Badge>
                <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm text-xs">
                  Apple SDK
                </Badge>
                <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm text-xs">
                  Git
                </Badge>
              </div>
            </div>

            {/* PT. IDEJUALAN CREATIVE: Mobile Engineer */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-bold">PT. IDEJUALAN CREATIVE: Mobile Engineer</h3>
                <div className="text-sm text-zinc-400">Nov 2021 - Feb 2022 | Remote | Yogyakarta, Indonesia</div>
              </div>
              <ul className="list-disc pl-5 text-zinc-300 space-y-1 text-sm">
                <li>Creating E-learning mobile app from scratch for both Android and iOS.</li>
                <li>Developed features for different role in one App.</li>
                <li>Added social login feature & successfully published the App on the App Store & Play Store.</li>
                <li>Integrated with Dio package for seamless API communication.</li>
                <li>Implemented transaction feature to buy a course.</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm text-xs">
                  Flutter
                </Badge>
                <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm text-xs">
                  Firebase
                </Badge>
                <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm text-xs">
                  SDK
                </Badge>
                <Badge variant="outline" className="bg-zinc-900/70 text-emerald-400 border-emerald-400/30 backdrop-blur-sm text-xs">
                  Git
                </Badge>
              </div>
            </div>
          </div>
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

        {/* Contact Me Section */}
        <section className="space-y-4 bg-zinc-900/40 p-6 rounded-lg backdrop-blur-md">
          <h2 className="text-xl font-bold font-mono flex items-center">
            <span className="text-emerald-400 mr-2">{">"}</span> Contact Me
          </h2>
          <p className="text-zinc-300 mb-4">
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
          </p>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-zinc-300">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900/70 px-3 py-2 text-sm ring-offset-background placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900/70 px-3 py-2 text-sm ring-offset-background placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-zinc-300">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Subject"
                className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900/70 px-3 py-2 text-sm ring-offset-background placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-zinc-300">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your message"
                rows={5}
                className="flex w-full rounded-md border border-zinc-700 bg-zinc-900/70 px-3 py-2 text-sm ring-offset-background placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto">
              Send Message
            </Button>
          </form>
        </section>

        <Separator className="bg-zinc-700/50" />

        {/* Footer */}
        <footer className="pt-8 pb-4 text-center text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} Febry Ardiansyah. All rights reserved.</p>
          <p className="font-mono mt-1">{"// Built with Next.js and TailwindCSS"}</p>
        </footer>
      </div>

      {/* Sticky Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 py-3 px-4">
        <div className="mx-auto bg-zinc-900/70 backdrop-blur-md border border-zinc-800/50 rounded-full px-6 py-3 flex flex-wrap items-center justify-center gap-3 w-fit max-w-3xl">
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
      </div>
    </main>
  )
}


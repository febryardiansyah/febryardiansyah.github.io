import { Github, Twitter, Linkedin, Mail, FileDown } from "lucide-react"
import SocialMediaWrapper from "@/components/social-media-wrapper"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import InteractiveBackground from "@/components/interactive-background"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen text-zinc-100 relative overflow-hidden selection:bg-emerald-500/30">
      <InteractiveBackground />
      
      {/* Main Container */}
      <div className="max-w-7xl mx-auto p-4 md:p-8 relative z-10 flex flex-col min-h-screen">
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-auto">
          
          {/* Profile Card - Hero */}
          <section className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-zinc-900/40 p-6 md:p-8 rounded-3xl backdrop-blur-xl border border-white/5 flex flex-col justify-between group hover:border-white/10 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
               <Github className="w-24 h-24 text-white/5" />
            </div>
            
            <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-emerald-500/20 shadow-2xl shadow-emerald-500/10 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="https://res.cloudinary.com/febryar/image/upload/v1741435733/Febry_Ardiansyah_-_IT_c9x8wf.jpg"
                  alt="Febry Ardiansyah"
                  fill
                  sizes="100px"
                  className="object-cover"
                  style={{ objectPosition: "center" }}
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                   <span className="text-emerald-500 text-xs font-medium tracking-wide">AVAILABLE FOR HIRE</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-sans tracking-tight text-white">Febry Ardiansyah</h1>
                <p className="text-zinc-400 font-medium text-lg">Mobile Apps & Frontend Engineer</p>
              </div>
            </div>
            
            <div className="mt-8 space-y-6 relative z-10">
               <p className="text-zinc-300 leading-relaxed text-base md:text-lg max-w-xl">
                 I build accessible, pixel-perfect, and performant web and mobile applications. 
                 Specialized in <span className="text-emerald-400 font-semibold">Flutter</span>, <span className="text-blue-400 font-semibold">React</span>, and <span className="text-white font-semibold">Next.js</span>.
               </p>
               <div className="flex flex-wrap gap-3">
                  <Link href="https://drive.google.com/file/d/1fg7eGgiI3cgq44DECppLB7YeICXYSBZm/view?usp=sharing" target="_blank">
                    <Button className="rounded-full bg-emerald-600 hover:bg-emerald-500 text-white border-0 px-6 py-6 h-auto text-base">
                      <FileDown className="mr-2 h-5 w-5" /> Download CV
                    </Button>
                  </Link>
                  <Link href="#contact">
                    <Button variant="outline" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white px-6 py-6 h-auto text-base backdrop-blur-md">
                      Contact Me
                    </Button>
                  </Link>
               </div>
            </div>
          </section>

          {/* Socials Card */}
          <section className="header-social-media col-span-1 lg:col-span-1 bg-zinc-900/40 p-6 rounded-3xl backdrop-blur-xl border border-white/5 flex flex-col justify-center gap-4 hover:border-white/10 transition-colors">
            <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-wider mb-1 px-1">Connect</h3>
            <div className="flex flex-col gap-3">
              <Link href="https://github.com/febryardiansyah/" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-black/50 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Github size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">GitHub</div>
                    <div className="text-xs text-zinc-500">@febryardiansyah</div>
                  </div>
                </div>
              </Link>
              <Link href="https://www.linkedin.com/in/febry-ardiansyah-a4b580170/" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-blue-500/10 hover:border-blue-500/20 transition-all group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-black/50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">LinkedIn</div>
                    <div className="text-xs text-zinc-500">Febry Ardiansyah</div>
                  </div>
                </div>
              </Link>
              <Link href="https://x.com/febryards" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-sky-500/10 hover:border-sky-500/20 transition-all group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-black/50 flex items-center justify-center text-sky-500 group-hover:scale-110 transition-transform">
                    <Twitter size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Twitter</div>
                    <div className="text-xs text-zinc-500">@febryards</div>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Tech Stack / Skills Card */}
          <section className="col-span-1 lg:col-span-1 row-span-1 md:row-span-2 lg:row-span-2 bg-zinc-900/40 p-6 rounded-3xl backdrop-blur-xl border border-white/5 flex flex-col hover:border-white/10 transition-colors">
            <h2 className="text-lg font-bold font-sans text-zinc-100 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span> 
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2 content-start">
              {[
                { name: "Flutter", color: "text-sky-400 border-sky-400/20 bg-sky-400/10" },
                { name: "Dart", color: "text-sky-300 border-sky-300/20 bg-sky-300/10" },
                { name: "React", color: "text-blue-400 border-blue-400/20 bg-blue-400/10" },
                { name: "Next.js", color: "text-white border-white/20 bg-white/10" },
                { name: "TypeScript", color: "text-blue-500 border-blue-500/20 bg-blue-500/10" },
                { name: "TailwindCSS", color: "text-cyan-400 border-cyan-400/20 bg-cyan-400/10" },
                { name: "Firebase", color: "text-orange-400 border-orange-400/20 bg-orange-400/10" },
                { name: "Git", color: "text-red-400 border-red-400/20 bg-red-400/10" },
                { name: "REST API", color: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10" },
                { name: "SASS", color: "text-pink-400 border-pink-400/20 bg-pink-400/10" },
                { name: "Mobile SDKs", color: "text-indigo-400 border-indigo-400/20 bg-indigo-400/10" },
              ].map((skill) => (
                <span key={skill.name} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${skill.color} hover:bg-opacity-20 transition-colors cursor-default`}>
                  {skill.name}
                </span>
              ))}
            </div>
            
            <div className="mt-auto pt-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-white/5">
                 <h4 className="text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">Current Focus</h4>
                 <p className="text-sm text-zinc-200">Exploring AI integration in mobile apps and advanced Flutter animations.</p>
              </div>
            </div>
          </section>

          {/* Experience Section - Wide Card */}
          <section className="col-span-1 md:col-span-3 lg:col-span-3 bg-zinc-900/40 p-6 md:p-8 rounded-3xl backdrop-blur-xl border border-white/5 flex flex-col hover:border-white/10 transition-colors">
            <h2 className="text-2xl font-bold font-sans text-zinc-100 mb-8 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></span> 
              Experience
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* muatmuat */}
              <div className="relative pl-8 border-l border-zinc-700/50 hover:border-emerald-500/50 transition-colors group">
                 <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-800 border-2 border-zinc-900 group-hover:bg-emerald-500 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all"></div>
                <div className="flex flex-col mb-1">
                  <span className="text-xs font-mono text-emerald-400 mb-1">Mar 2025 - Now</span>
                  <h3 className="font-bold text-lg text-white">Mobile Apps Developer</h3>
                  <div className="text-sm text-zinc-400">muatmuat • On-site</div>
                </div>
                <ul className="list-disc pl-4 text-zinc-400 space-y-2 text-sm mt-3 marker:text-zinc-600">
                  <li>Optimized app performance by identifying and resolving critical bugs, leading to a significant reduction in production crash rates.</li>
                  <li>Designed and implemented high-impact transaction-related features, streamlining the user journey and improving overall transaction efficiency.</li>
                  <li>Partnered with UI/UX, BA, and QC teams to deliver high-fidelity designs and seamless product releases.</li>
                  <li>Used GetX for state management to decouple business logic from the UI, resulting in cleaner code maintainability and faster feature deployment.</li>
                  <li>Created a modular internal library to streamline feature development and ensure design consistency.</li>
                  <li>Researched and integrated AI-powered development tools to automate boilerplate code generation and repetitive tasks, successfully boosting sprint velocity and developer productivity.</li>
                </ul>
              </div>

               {/* Carillimu: Frontend */}
               <div className="relative pl-8 border-l border-zinc-700/50 hover:border-blue-500/50 transition-colors group">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-800 border-2 border-zinc-900 group-hover:bg-blue-500 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all"></div>
                <div className="flex flex-col mb-1">
                  <span className="text-xs font-mono text-zinc-500 mb-1">Nov 2024 - Feb 2025</span>
                  <h3 className="font-bold text-lg text-white">Frontend Developer</h3>
                  <div className="text-sm text-zinc-400">Carillimu • Remote</div>
                </div>
                 <ul className="list-disc pl-4 text-zinc-400 space-y-2 text-sm mt-3 marker:text-zinc-600">
                  <li>Translated designs into efficient components using TailwindCSS.</li>
                  <li>Integrated RESTful APIs to fetch and display data dynamically.</li>
                  <li>Managed application state effectively using Context API.</li>
                </ul>
              </div>

               {/* Carillimu: Mobile */}
               <div className="relative pl-8 border-l border-zinc-700/50 hover:border-indigo-500/50 transition-colors group">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-800 border-2 border-zinc-900 group-hover:bg-indigo-500 group-hover:shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all"></div>
                <div className="flex flex-col mb-1">
                  <span className="text-xs font-mono text-zinc-500 mb-1">May 2022 - Feb 2025</span>
                  <h3 className="font-bold text-lg text-white">Mobile Apps Developer</h3>
                  <div className="text-sm text-zinc-400">Carillimu • Remote</div>
                </div>
                 <ul className="list-disc pl-4 text-zinc-400 space-y-2 text-sm mt-3 marker:text-zinc-600">
                  <li>Managed end-to-end development and on-time deployment to the App Store and Play Store.</li>
                  <li>Applied SOLID principles to ensure a modular, maintainable, and highly scalable codebase.</li>
                  <li>Developed high-precision UI components, including custom interactive video players.</li>
                  <li>Utilized BloC to decouple business logic from the UI, ensuring the code is reusable and easy to test.</li>
                  <li>Integrated RESTful APIs, push notifications, analytics, crash reporting, and local data storage.</li>
                  <li>Developed advanced features requiring native integration using Kotlin (Android) and Swift (iOS).</li>
                  <li>Collaborated effectively with Backend developers and UI/UX designers within an Agile environment.</li>
                </ul>
              </div>

               {/* IDEJUALAN */}
               <div className="relative pl-8 border-l border-zinc-700/50 hover:border-amber-500/50 transition-colors group">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-800 border-2 border-zinc-900 group-hover:bg-amber-500 group-hover:shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all"></div>
                <div className="flex flex-col mb-1">
                  <span className="text-xs font-mono text-zinc-500 mb-1">Nov 2021 - Feb 2022</span>
                  <h3 className="font-bold text-lg text-white">Mobile Apps Developer</h3>
                  <div className="text-sm text-zinc-400">PT. IDEJUALAN CREATIVE • Remote</div>
                </div>
                 <ul className="list-disc pl-4 text-zinc-400 space-y-2 text-sm mt-3 marker:text-zinc-600">
                  <li>Created E-learning mobile app from scratch for Android and iOS.</li>
                  <li>Integrated with Dio package for seamless API communication.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Section - Full Width Bottom */}
          <section id="contact" className="col-span-1 md:col-span-3 lg:col-span-4 bg-zinc-900/40 p-8 rounded-3xl backdrop-blur-xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1 space-y-4">
                 <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
                    <Mail size={24} />
                 </div>
                 <h2 className="text-2xl font-bold text-white">Let's work together!</h2>
                 <p className="text-zinc-400 leading-relaxed">
                   I'm always open to discussing product design work or partnership opportunities.
                 </p>
                 <div className="pt-4">
                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Email me at</div>
                    <a href="mailto:febryardiansyah27@gmail.com" className="text-lg font-medium text-white hover:text-emerald-400 transition-colors">
                      febryardiansyah27@gmail.com
                    </a>
                 </div>
              </div>
              
              <div className="md:col-span-2 bg-black/20 p-6 rounded-2xl border border-white/5">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-medium text-zinc-400 ml-1">NAME</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        className="flex h-12 w-full rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-sm ring-offset-background placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 transition-all text-white"
                      />
                    </div>
                    <div className="space-y-2">
                       <label htmlFor="email" className="text-xs font-medium text-zinc-400 ml-1">EMAIL</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="flex h-12 w-full rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-sm ring-offset-background placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 transition-all text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                     <label htmlFor="subject" className="text-xs font-medium text-zinc-400 ml-1">SUBJECT</label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="Project Inquiry"
                      className="flex h-12 w-full rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-sm ring-offset-background placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 transition-all text-white"
                    />
                  </div>
                  <div className="space-y-2">
                     <label htmlFor="message" className="text-xs font-medium text-zinc-400 ml-1">MESSAGE</label>
                    <textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={4}
                      className="flex w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm ring-offset-background placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 transition-all resize-none text-white"
                    />
                  </div>
                  <Button className="w-full sm:w-auto h-12 bg-white text-black hover:bg-zinc-200 rounded-xl px-8 font-semibold">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </section>

        </div>
        
        {/* Footer */}
        <footer className="mt-12 text-center text-zinc-600 text-sm pb-8">
           <Separator className="bg-zinc-800 mb-8 max-w-7xl mx-auto" />
           <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4">
             <p>© {new Date().getFullYear()} Febry Ardiansyah.</p>
             <p className="font-mono text-xs opacity-50 mt-2 md:mt-0">Built with Next.js & TailwindCSS</p>
           </div>
        </footer>

      </div>
      
      {/* Floating Socials for Mobile/Quick Access */}
      <SocialMediaWrapper />
    </main>
  )
}

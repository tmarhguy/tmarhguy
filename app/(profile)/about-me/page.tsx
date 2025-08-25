'use client';

import { ArrowLeft, Code, FileDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AnimatedBackground from "@/components/animations/AnimatedBackground";
import AnimatedCard from "@/components/animations/AnimatedCard";
import MediaLogos from "@/components/ui/MediaLogos";

export default function AboutMe() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-6 sm:py-8 relative">
        <AnimatedBackground variant="matrix" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-brand-500/20 shadow-lg">
                  <Image
                    src="/images/me.jpg"
                    alt="Tyrone Marhguy"
                    width={224}
                    height={224}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              About Me
            </h1>
            <p className="text-lg sm:text-xl text-surface-muted max-w-3xl mx-auto">
              Computer Engineering student at UPenn specializing in embedded systems, hardware design, and full‑stack development. 
              Building innovative solutions from transistor‑level to scalable platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights + Resumes */}
      <section id="highlights" className="py-6 sm:py-8 relative">
        <AnimatedBackground variant="circuit" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="rounded-lg border border-surface bg-surface-dark px-4 py-3 text-sm text-foreground">8 A1s (WASSCE) • SAT 99th percentile</div>
              <div className="rounded-lg border border-surface bg-surface-dark px-4 py-3 text-sm text-foreground">700+ transistor CPU • 16‑bit memory module</div>
              <div className="rounded-lg border border-surface bg-surface-dark px-4 py-3 text-sm text-foreground">Full‑stack ML apps • FastAPI/Next.js</div>
              <div className="rounded-lg border border-surface bg-surface-dark px-4 py-3 text-sm text-foreground">Media‑recognized advocacy & excellence</div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/resumes/software-development-resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg">
                <FileDown className="h-4 w-4" /> Software Resume
              </a>
              <a href="/resumes/hardware-engineering-resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 border border-brand-600 text-brand-400 rounded-lg hover:bg-brand-600/10">
                <FileDown className="h-4 w-4" /> Hardware Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Media Recognition */}
      <section id="media" className="py-8 sm:py-10 relative">
        <AnimatedBackground variant="circuit" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            <AnimatedCard glowEffect={true} className="p-6 sm:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Global Media Recognition</h2>
                <p className="text-lg text-surface-muted leading-relaxed">
                  Featured internationally for academic excellence, resilience, and impact‑driven work.
                </p>
              </div>
              <div className="mb-6">
                <MediaLogos />
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Technical Projects & Skills (plain text) */}
      <section id="skills" className="pt-8 sm:pt-12 pb-4 sm:pb-6 relative z-10">
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Technical Focus Areas</h2>
            <p className="text-lg text-surface-muted leading-relaxed mb-6">Work spanning transistor‑level design to scalable web systems and ML.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Hardware & Embedded Systems</h3>
                <ul className="space-y-2 text-surface-muted text-sm">
                  <li>• Discrete transistor CPU design (700+ transistors)</li>
                  <li>• FPGA synthesis and ASIC prototyping</li>
                  <li>• RTL design (Verilog, SystemVerilog, VHDL)</li>
                  <li>• Device drivers and RTOS concepts</li>
                  <li>• Hardware‑software co‑design</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Software & Web</h3>
                <ul className="space-y-2 text-surface-muted text-sm">
                  <li>• Full‑stack (React, Next.js, FastAPI)</li>
                  <li>• Database (PostgreSQL, Redis, MongoDB)</li>
                  <li>• Cloud (AWS, Azure, Docker)</li>
                  <li>• CI/CD and DevOps practices</li>
                  <li>• ML integration and data systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Journey (plain text) */}
      <section id="journey" className="pt-4 sm:pt-6 pb-8 sm:pb-12">
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">My Journey</h2>
            <div className="text-foreground leading-relaxed space-y-5">
              <p>I&apos;m Tyrone Iras Marhguy, born on November 24, 2003, in Ghana. I&apos;m a triplet with two sisters, Nikita and Amrita. My journey has been shaped by resilience, faith, and an unwavering commitment to education and technical innovation.</p>
              <p>Engineering Roots & Family Inspiration — Growing up as a triplet, I shared a lifelong connection with my two sisters, rooted in a fascination with wind energy and rockets. My father, a mechanical engineer specializing in wind generators, gave us a front‑row seat to the mechanics of armature coils, neodymium magnets, and wind turbines. His work inspired me to dive into hands‑on projects from an early age.</p>
              <p>First Engineering Project: Wind Generator Motor — In grade 7 (Junior High School 1, Ghana), I designed and built a functional wind generator motor. This endeavor took weeks of coil rewinding and hunting for short circuits, among other challenges. This early introduction to engineering made me hungry for problem‑solving and innovation.</p>
              <p>Resourcefulness & Hands‑On Learning — Life in Ghana taught me to make the most of limited resources. I taught myself to repair broken radios, built an AC/DC rectifier, and even crafted tools like a makeshift screwdriver by shaping wood nails with a stone. These experiences developed my critical thinking and creativity and gave me a deep appreciation for hands‑on engineering.</p>
              <p>From Ghana to UPenn — Despite facing significant challenges, I&apos;ve learned that determination and principle can overcome any obstacle, and that technical excellence combined with strong values creates lasting impact. My journey from building wind generators in Ghana to studying Computer Engineering at UPenn represents the culmination of years of passion, resilience, and hands‑on learning.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}



"use client";

import AnimatedBackground from "@/components/animations/AnimatedBackground";
import AnimatedCard from "@/components/animations/AnimatedCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, FileDown, Code } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/utils/paths";
 
import { useRouter } from "next/navigation";

export default function AcademicDetailsPage() {
  const router = useRouter();
  

  return (
    <main className="min-h-screen bg-background relative">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-surface">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" className="gap-2" onClick={() => router.push("/")}> 
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="content" className="py-8 sm:py-12 relative">
        <AnimatedBackground variant="circuit" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-brand-500/20 shadow-lg">
                  <Image
                    src={getAssetPath("images/me.jpg")}
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
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Academic Excellence & Recognition</h1>
            <p className="text-lg text-surface-muted max-w-2xl mx-auto">
              Highlights of academic achievements, certifications, advocacy, and personal background.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Nav + Highlights + Resumes */}
      <section id="highlights" className="py-6 sm:py-8 relative">
        <AnimatedBackground variant="matrix" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* In-page nav */}
            <div className="mb-5 overflow-x-auto">
              <div className="flex gap-3 sm:gap-4 justify-center text-sm">
                <a href="#excellence" className="px-3 py-1.5 rounded-full border border-surface text-surface-muted hover:text-foreground hover:border-brand-600/40">Excellence</a>
                <a href="#certifications" className="px-3 py-1.5 rounded-full border border-surface text-surface-muted hover:text-foreground hover:border-brand-600/40">Certifications</a>
              </div>
            </div>

            {/* Highlights strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-lg border border-surface bg-surface-dark px-4 py-3 text-sm text-foreground">Computer Engineering @ UPenn</div>
              <div className="rounded-lg border border-surface bg-surface-dark px-4 py-3 text-sm text-foreground">8 A1s (WASSCE)</div>
              <div className="rounded-lg border border-surface bg-surface-dark px-4 py-3 text-sm text-foreground">Math Olympiad Gold • Vanda Science Silver</div>
              <div className="rounded-lg border border-surface bg-surface-dark px-4 py-3 text-sm text-foreground">99th percentile SAT(2025)</div>
              
            </div>

            {/* Resume CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a href={getAssetPath("resumes/software-development-resume.pdf")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg">
                <FileDown className="h-4 w-4" /> Software Resume
              </a>
              <a href={getAssetPath("resumes/hardware-engineering-resume.pdf")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 border border-brand-600 text-brand-400 rounded-lg hover:bg-brand-600/10">
                <FileDown className="h-4 w-4" /> Hardware Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Excellence */}
      <section id="excellence" className="py-8 sm:py-12 relative">
        <AnimatedBackground variant="circuit" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Academic Excellence</h2>
              <p className="text-surface-muted">Proven performance across national exams and international competitions</p>
            </div>
            <div className="max-w-3xl mx-auto px-4">
              <h3 className="text-xl font-semibold text-foreground mb-2">WASSCE 2023</h3>
              <p className="text-surface-muted mb-3">8 A1s • Top 0.1% nationwide</p>
              <div className="text-surface-secondary text-sm leading-relaxed space-y-1">
                <p>Elective Mathematics, Physics, Chemistry, Elective ICT</p>
                <p>English, Core Mathematics, Integrated Science, Social Studies</p>
              </div>
              <p className="mt-3 text-xs text-surface-secondary leading-relaxed">
                Regional context: In 2023, WAEC administered WASSCE to <span className="text-foreground">2,327,342</span> school candidates across its five member countries (Nigeria, Ghana, Gambia, Sierra Leone, Liberia). Reports also noted <span className="text-foreground">465</span> region‑wide straight <span className="text-foreground">8 A1</span> achievers, including <span className="text-foreground">411 from Ghana</span>.
                <a href="https://guardian.ng/features/education/ghana-beats-nigeria-others-to-best-results-in-2023-wassce/" target="_blank" rel="noopener noreferrer" className="ml-2 underline text-brand-400">Guardian</a>
                <span className="mx-1">·</span>
                <a href="https://www.modernghana.com/news/1282690/2023-wassce-ghana-boasts-of-411-out-of-465-8a1s.html" target="_blank" rel="noopener noreferrer" className="underline text-brand-400">ModernGhana</a>
              </p>

              <h3 className="mt-8 text-xl font-semibold text-foreground mb-2">International Olympiads</h3>
              <div className="text-surface-secondary text-sm leading-relaxed space-y-1">
                <p>American Mathematics Olympiad – National Gold</p>
                <p>Vanda International Science – Silver Medal</p>
                <p>SAT – 99th Percentile</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-8 sm:py-12 relative">
        <AnimatedBackground variant="matrix" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Certifications & Achievements</h2>
              <p className="text-surface-muted">A selection of verified credentials</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {[ 
                { title: "Machine Learning I", issuer: "Columbia University", date: "Aug 2025", link: "https://badges.plus.columbia.edu/882317c6-ea49-4c1e-b12b-8623bfe5db1c#acc.vg2zQre8" },
                { title: "Crash Course on Python", issuer: "Google", date: "Jun 2024", link: "https://www.coursera.org/account/accomplishments/verify/LFT2Y8N63M2Q" },
                { title: "Matrix Algebra for Engineers", issuer: "HKUST", date: "Jun 2024", link: "https://www.coursera.org/account/accomplishments/verify/DV3EELMPZ24J" },
                { title: "C Programming Specialization", issuer: "Dartmouth College", date: "2024", link: "https://www.coursera.org" }
              ].map((cert) => (
                <AnimatedCard key={cert.title} glowEffect className="p-6 sm:p-8 h-full">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-brand-600/20 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-brand-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{cert.title}</h3>
                      <p className="text-sm text-surface-secondary">{cert.issuer} • {cert.date}</p>
                    </div>
                  </div>
                  {cert.link ? (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-brand-400 underline text-sm">View Certificate ↗</a>
                  ) : null}
                </AnimatedCard>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/certifications" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-lg">
                View All Certifications
              </Link>
            </div>
          </div>
        </div>
      </section>

      
      

      {/* Back to Portfolio CTA */}
      <section className="py-8 sm:py-12 relative">
        <AnimatedBackground variant="circuit" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Button
              size="lg"
              className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 text-lg transition-all duration-200"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Portfolio
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

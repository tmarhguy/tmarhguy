"use client";

import AnimatedBackground from "@/components/animations/AnimatedBackground";
import AnimatedCard from "@/components/animations/AnimatedCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, Link as LinkIcon, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CERTIFICATIONS } from "@/utils/certifications";
import { useMemo, useState } from "react";


export default function CertificationsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(CERTIFICATIONS.map((c) => c.category)));
    return ["All", ...unique];
  }, []);

  const filtered = selectedCategory === "All"
    ? CERTIFICATIONS
    : CERTIFICATIONS.filter((c) => c.category === selectedCategory);
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
      <section className="py-8 sm:py-12 relative">
        <AnimatedBackground variant="circuit" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Certifications & Achievements</h1>
            <p className="text-lg text-surface-muted max-w-2xl mx-auto">Curated credentials that validate skills across programming, ML, and engineering.</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="relative">
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto mb-4 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
                  selectedCategory === cat
                    ? "border-brand-600 bg-brand-600/10 text-foreground"
                    : "border-surface text-surface-muted hover:text-foreground hover:border-brand-600/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-6 sm:py-10 relative">
        <AnimatedBackground variant="matrix" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filtered.map((cert) => (
              <AnimatedCard key={cert.title} glowEffect className="p-6 sm:p-8 h-full">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-brand-600/20 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-brand-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-foreground truncate">{cert.title}</h3>
                        <p className="text-sm text-surface-secondary truncate">{cert.issuer} • {cert.date}</p>
                      </div>
                      <span className="shrink-0 px-2 py-0.5 rounded-full text-xs border border-brand-600 text-brand-400">{cert.category}</span>
                    </div>
                    {cert.course ? (
                      <p className="mt-2 text-sm text-surface-muted line-clamp-2">{cert.course}</p>
                    ) : null}
                    {cert.description ? (
                      <p className="mt-2 text-sm text-surface-secondary line-clamp-3">{cert.description}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  {cert.link ? (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md border border-brand-600 text-brand-400 hover:bg-brand-600/10">
                      <ExternalLink className="w-4 h-4" /> View
                    </a>
                  ) : null}
                  {cert.downloadUrl ? (
                    <a href={cert.downloadUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md border border-surface text-foreground hover:bg-surface">
                      <LinkIcon className="w-4 h-4" /> Download
                    </a>
                  ) : null}
                </div>
              </AnimatedCard>
            ))}
          </div>

          <div className="max-w-4xl mx-auto text-center mt-8">
            <Link href="/academic-details#excellence" className="inline-flex items-center gap-2 px-6 py-3 border border-brand-600 text-brand-400 rounded-lg hover:bg-brand-600/10">
              See Academic Excellence
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

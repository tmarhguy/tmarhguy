'use client';

import Hero from "@/components/sections/Hero";
import ProjectCard from "@/components/cards/ProjectCard";
import BioSection from "@/components/sections/BioSection";
import TaglineSection from "@/components/sections/TaglineSection";
import AnimatedBackground from "@/components/animations/AnimatedBackground";
import AnimatedCard from "@/components/animations/AnimatedCard";
import Skills from "@/components/sections/Skills";
import MediaLogos from "@/components/ui/MediaLogos";
import CallToAction from "@/components/sections/CallToAction";

export default function Home() {
  const softwareProjects = [
    {
      title: "SVD Image Compression",
      description:
        "Next.js + TypeScript app with per-channel SVD for real-time rank-k reconstructions. Optimized performance (CLS=0, Lighthouse 90/73/100), supporting 20MB+ uploads and 45% faster processing.",
      image: "/images/ml-animated.svg",
      metrics: [
        { label: "CLS", value: "0" },
        { label: "Lighthouse", value: "90/73/100" },
        { label: "Upload Size", value: "20MB+" },
        { label: "Processing", value: "45% faster" },
      ],
      github: "https://github.com/tmarhguy/svd",
      demo: "/projects/svd",
      tags: ["Linear Algebra", "TypeScript", "React"],
      status: "Complete" as const,
    },
    {
      title: "UniBridge - Ghana",
      description:
        "Ghana's first centralized admissions platform with FastAPI, Next.js 14, PostgreSQL, Redis, unifying multi-university applications and achieving 0.8s FCP and 1.4s Speed Index. Integrated secure document workflows via OAuth2 authentication, AES-256 encryption and authored 120+ automated tests (92% coverage) deployed through Docker + GitHub Actions.",
      image: "/images/unibridge-animated.svg",
      metrics: [
        { label: "FCP", value: "0.8s" },
        { label: "Speed Index", value: "1.4s" },
        { label: "Test Coverage", value: "92%" },
        { label: "Automated Tests", value: "120+" },
      ],
      github: "https://github.com/tmarhguy/unibridgeGhana",
      demo: "/projects/unibridge",
      tags: ["Backend", "API", "Education"],
      status: "In Progress" as const,
    },
    {
      title: "MoMo Credit Score Generator",
      description:
        "Led mobile money credit scoring system (FastAPI microservices, XGBoost), achieving AUC 0.82. Delivered React dashboard with SHAP explainability, ensuring compliance with data standards.",
      image: "/images/momo-credit-animated.svg",
      metrics: [
        { label: "AUC Score", value: "0.82" },
        { label: "Framework", value: "FastAPI" },
        { label: "ML Model", value: "XGBoost" },
        { label: "Compliance", value: "Data Standards" },
      ],
      github: "https://github.com/tmarhguy/momo-credit-score",
      demo: "/projects/momo-csg",
      tags: ["FinTech", "ML", "API"],
      status: "In Progress" as const,
    },
    {
      title: "Music & You",
      description:
        "Full-stack ML app predicting Big Five traits from 300+ Spotify tracks/user with 35+ features. Deployed 16-endpoint API with real-time dashboards and sub-5s predictions.",
      image: "/images/music-analytics-animated.svg",
      metrics: [
        { label: "Spotify Tracks", value: "300+/user" },
        { label: "Features", value: "35+" },
        { label: "API Endpoints", value: "16" },
        { label: "Prediction Time", value: "<5s" },
      ],
      github: "https://github.com/tmarhguy/music-and-you",
      demo: "/projects/music-and-you",
      tags: ["AI/ML", "Psychology", "Music"],
      status: "In Progress" as const,
    }
  ];

  const hardwareProjects = [
    {
      title: "8-bit Transistor CPU",
      description:
        "Complete CPU built from 700+ discrete 2N7000 NMOS transistors with custom 12-instruction ISA, capable of running assembly programs and measured with logic analyzer for gate propagation delays.",
      image: "/images/transistor-cpu-animated.svg",
      github: "https://github.com/tmarhguy/cpu",
      demo: "/projects/cpu",
      tags: ["Discrete Logic", "ISA Design", "Assembly"],
      status: "In Progress" as const,
    },
    {
      title: "16-Bit Transistor Memory Module",
      description:
        "16-bit addressable memory from ~350 discrete transistors using D-flip-flop latch arrays, integrated with Arduino microcontroller achieving stable operation over 1,000+ access cycles.",
      image: "/images/memory-module-animated.svg",
      github: "https://github.com/tmarhguy/memory-drive",
      demo: "/projects/memory",
      tags: ["Memory Systems", "Bus Control", "Microcontroller"],
      status: "In Progress" as const,
    },
    {
      title: "Precision Clock Oscillator",
      description:
        "Temperature-resilient RC multivibrator clock with <1% drift, used as timing source for FPGA/MCU-driven prototypes with stable frequency output.",
      image: "/images/clock-oscillator-animated.svg",
      github: "https://github.com/tmarhguy/custom-clock",
      demo: "/projects/clock",
      tags: ["Oscillators", "Timing", "Precision"],
      status: "In Progress" as const,
    },
    {
      title: "Transistor-Logic Calculator",
      description:
        "Four-function calculator with discrete ripple-carry adders and custom 7-segment decoder, tested with microcontroller-driven I/O routines and measured propagation delays.",
      image: "/images/calculator-animated.svg",
      github: "https://github.com/tmarhguy/custom-calculator",
      demo: "/projects/calculator",
      tags: ["Logic Design", "Arithmetic", "Discrete"],
      status: "In Progress" as const,
    }
  ];

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section with 3D Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-surface-dark/20"></div>
        
        {/* 3D Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-brand-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-brand-600/10 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-32 w-28 h-28 bg-brand-400/10 rounded-full blur-xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-brand-500/10 rounded-full blur-lg animate-pulse delay-1500"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <Hero />
        </div>
      </section>

      {/* Tagline Section with 3D Effect */}
      <section className="py-12 sm:py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/5 to-transparent"></div>
        <div className="container mx-auto relative z-10">
          <div className="transform-gpu hover:scale-105 transition-transform duration-500">
            <TaglineSection />
          </div>
        </div>
      </section>

      {/* Software Projects - No Animations */}
      <section id="software-projects" className="py-12 sm:py-16 relative">
        <AnimatedBackground variant="circuit" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 transform-gpu hover:scale-105 transition-transform duration-300">
              Software Projects
            </h2>
            <p className="text-lg sm:text-xl text-surface-muted max-w-3xl mx-auto">
              Full-stack applications and machine learning platforms built with modern technologies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {softwareProjects.map((project, index) => (
              <div key={index}>
                <AnimatedCard 
                  glowEffect={true}
                  className="h-full bg-gradient-to-br from-surface-dark/80 to-surface-dark/60 backdrop-blur-sm border border-surface/30 shadow-2xl hover:shadow-brand-500/20 transition-all duration-500"
                >
                  <ProjectCard {...project} />
                </AnimatedCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware Projects - No Animations */}
      <section className="py-12 sm:py-16 relative">
        <AnimatedBackground variant="circuit" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 transform-gpu hover:scale-105 transition-transform duration-300">
              Hardware Projects
            </h2>
            <p className="text-lg sm:text-xl text-surface-muted max-w-3xl mx-auto">
              Discrete transistor-level design and FPGA integration for embedded systems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {hardwareProjects.map((project, index) => (
              <div key={index}>
                <AnimatedCard 
                  glowEffect={true}
                  className="h-full bg-gradient-to-br from-surface-dark/80 to-surface-dark/60 backdrop-blur-sm border border-surface/30 shadow-2xl hover:shadow-brand-500/20 transition-all duration-500"
                >
                  <ProjectCard {...project} />
                </AnimatedCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills with 3D Floating Effect */}
      <section className="py-12 sm:py-16 relative">
        <AnimatedBackground variant="circuit" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="transform-gpu hover:scale-105 transition-transform duration-500">
            <Skills />
          </div>
        </div>
      </section>

      {/* Featured In with 3D Parallax */}
      <section className="py-12 sm:py-16 relative">
        <AnimatedBackground variant="circuit" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4 transform-gpu hover:scale-105 transition-transform duration-300">
                Featured In
              </h3>
              <p className="text-sm text-surface-muted">
                Global recognition for academic excellence and advocacy
              </p>
            </div>
            
            <div className="transform-gpu hover:scale-105 transition-transform duration-500">
              <MediaLogos />
            </div>

            <div className="text-center mt-6">
              <p className="text-xs text-surface-muted max-w-2xl mx-auto mb-3">
                Featured for academic excellence, legal victory on religious freedom, and advocacy for inclusive education in Ghana. 
                Coverage spans international media, academic journals, social platforms, and major news outlets worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with 3D Effect */}
      <section id="about" className="py-12 sm:py-16 relative">
        <AnimatedBackground variant="matrix" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="transform-gpu hover:scale-105 transition-transform duration-500">
            <BioSection />
          </div>
        </div>
      </section>

      {/* Call to Action with Enhanced 3D */}
      <section className="py-12 sm:py-16 relative">
        <AnimatedBackground variant="circuit" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="transform-gpu hover:scale-105 transition-transform duration-500">
            <CallToAction />
          </div>
        </div>
      </section>

      {/* Time Capsule Resume is rendered globally in RootLayout */}
    </main>
  );
}

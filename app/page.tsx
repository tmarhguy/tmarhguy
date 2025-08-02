import Hero from "@/components/sections/Hero";
import FlagshipCard from "@/components/cards/FlagshipCard";
import ProjectCard from "@/components/cards/ProjectCard";
import TimeCapsuleResume from "@/components/animations/TimeCapsuleResume";
import BioSection from "@/components/sections/BioSection";
import TaglineSection from "@/components/sections/TaglineSection";
import AnimatedBackground from "@/components/animations/AnimatedBackground";
import AnimatedCard from "@/components/animations/AnimatedCard";
import Skills from "@/components/sections/Skills";
import { Mail, Linkedin } from "lucide-react";

export default function Home() {
  const flagshipProjects = [
    {
      title: "8-bit Transistor CPU",
      description: "Complete CPU built from 700+ discrete 2N7000 NMOS transistors with custom 12-instruction ISA, capable of running assembly programs and measured with logic analyzer for gate propagation delays.",
      image: "/tmarhguy/images/transistor-cpu-animated.svg",
      metrics: [
        { label: "Transistors", value: "700+" },
        { label: "Instructions", value: "12-ISA" },
        { label: "Programs", value: "20+" },
        { label: "Verification", value: "100%" },
      ],
      github: "https://github.com/tmarhguy/cpu",
      demo: "/projects/hardware/cpu",
      tags: ["Hardware", "ISA Design", "Digital Logic"],
    },
    {
      title: "MoMo Credit Score Generator - Ghana",
      description: "Ghana's first consumer credit platform processing 1M+ transactions with FastAPI microservices and XGBoost ML pipeline, achieving AUC 0.82 and improving lender approval rates by 32%.",
      image: "/tmarhguy/images/momo-credit-animated.svg",
      metrics: [
        { label: "Transactions", value: "1M+" },
        { label: "AUC Score", value: "0.82" },
        { label: "Latency P99", value: "<400ms" },
        { label: "Approval ↑", value: "32%" },
      ],
      github: "https://github.com/tmarhguy/momo-credit-score",
      demo: "/projects/software/momo-csg",
      tags: ["FinTech", "ML", "API"],
    },
    {
      title: "Music & You",
      description: "ML-based music analytics platform (FastAPI, OAuth2) supporting 1M+ users with <2s P95 latency, featuring React interface with async streaming that reduced load times by 40%.",
      image: "/tmarhguy/images/music-analytics-animated.svg",
      metrics: [
        { label: "Users", value: "1M+" },
        { label: "Latency P95", value: "<2s" },
        { label: "Load Time ↓", value: "40%" },
        { label: "MTTR", value: "12min" },
      ],
      github: "https://github.com/tmarhguy/music-and-you",
      demo: "https://music-and-you.vercel.app",
      tags: ["AI/ML", "Psychology", "Music"],
    },
    {
      title: "UniBridge - Ghana",
      description: "Ghana's first centralized admissions portal for 350K+ applicants/year using FastAPI, React, Redis, and PostgreSQL, achieving 99.9% uptime and P99 <500ms latency under 10K+ daily requests.",
      image: "/tmarhguy/images/unibridge-animated.svg",
      metrics: [
        { label: "Applicants", value: "350K+/yr" },
        { label: "Daily Requests", value: "10K+" },
        { label: "Uptime", value: "99.9%" },
        { label: "Latency P99", value: "<500ms" },
      ],
      github: "https://github.com/tmarhguy/unibridgeGhana",
      demo: "/projects/software/unibridge",
      tags: ["Backend", "API", "Education"],
    },
  ];

  const softwareProjects = [
    {
      title: "UniBridge-Ghana",
      description: "Full-stack student platforms (NextJS, Express, MongoDB) handling 800+ MAU with automated scheduling, real-time chat, and SPA with multi-course management.",
      image: "/tmarhguy/images/unibridge-animated.svg",
      github: "https://github.com/tmarhguy",
      demo: "/projects/software/unibridge",
      tags: ["NextJS", "Full Stack", "MongoDB"],
      status: "In Progress" as const
    },
    {
      title: "MoMo Credit Score Generator - Ghana",
      description: "Ghana's first consumer credit platform processing 1M+ transactions with FastAPI microservices and XGBoost ML pipeline, achieving AUC 0.82 and improving lender approval rates by 32%.",
      image: "/tmarhguy/images/momo-credit-animated.svg",
      github: "https://github.com/tmarhguy/momo-credit-score",
      demo: "/projects/software/momo-csg",
      tags: ["FinTech", "XGBoost", "FastAPI"],
      status: "In Progress" as const
    },
    {
      title: "Music & You",
      description: "ML-based music analytics platform (FastAPI, OAuth2) supporting 1M+ users with <2s P95 latency, featuring React interface with async streaming that reduced load times by 40%.",
      image: "//tmarhguy/images/music-analytics-animated.svg",
      github: "https://github.com/tmarhguy/music-and-you",
      demo: "https://music-and-you.vercel.app",
      tags: ["ML Analytics", "OAuth2", "React"],
      status: "In Progress" as const
    },
    {
      title: "AtomAssembler",
      description: "Two-pass assembler translating 20+ mnemonics to Intel-HEX for custom 8-bit CPU, reducing firmware build time by 70% with automated testbench validating 50+ programs at 100% pass rate.",
      image: "/tmarhguy/images/atom-assembler-animated.svg",
      github: "https://github.com/tmarhguy/atomassembler",
      demo: "/projects/software/atom-assembler",
      tags: ["Assembler", "CLI Tools", "Testing"],
      status: "In Progress" as const
    },
    {
      title: "Color Communication Game",
      description: "Multiplayer psychology-based game where users develop shared language using color patterns, exploring behavioral communication and emergent semantics.",
      image: "/tmarhguy/images/color-game-animated.svg",
      github: "https://github.com/tmarhguy/Psych_Color_Game_Experiment",
      demo: "/projects/software/color-game",
      tags: ["Flutter", "Psychology", "Real-time"],
      status: "In Progress" as const
    },
    {
      title: "YouTube to Spotify Migrator",
      description: "CLI tool for seamless playlist and liked songs migration from YouTube Music to Spotify using OAuth and API automation.",
      image: "/tmarhguy/images/youtube-spotify-migrator-animated.svg",
      github: "https://github.com/tmarhguy/ytmusic-spotify-migrator",
      demo: "/projects/software/migrator",
      tags: ["Python", "CLI", "Automation"],
      status: "Complete" as const
    },
  ];

  const hardwareProjects = [
    {
      title: "8-bit Transistor CPU",
      description: "Complete CPU built from 700+ discrete 2N7000 NMOS transistors with custom 12-instruction ISA, capable of running assembly programs and measured with logic analyzer for gate propagation delays.",
      image: "/tmarhguy/images/transistor-cpu-animated.svg",
      github: "https://github.com/tmarhguy/cpu",
      demo: "/projects/hardware/cpu",
      tags: ["Discrete Logic", "ISA Design", "Assembly"],
      status: "In Progress" as const
    },
    {
      title: "16-Bit Transistor Memory Module",
      description: "16-bit addressable memory from ~350 discrete transistors using D-flip-flop latch arrays, integrated with Arduino microcontroller achieving stable operation over 1,000+ access cycles.",
      image: "/tmarhguy/images/memory-module-animated.svg",
      github: "https://github.com/tmarhguy/memory-drive",
      demo: "/projects/hardware/memory",
      tags: ["Memory Systems", "Bus Control", "Microcontroller"],
      status: "In Progress" as const
    },
    {
      title: "Precision Clock Oscillator",
      description: "RC multivibrator delivering 1 kHz clock with <1% drift, tuned for stable duty cycle and temperature resilience using discrete components.",
      image: "/tmarhguy/images/clock-oscillator-animated.svg",
      github: "https://github.com/tmarhguy/custom-clock",
      demo: "/projects/hardware/clock",
      tags: ["Oscillators", "Timing", "Analog Design"],
      status: "In Progress" as const
    },
    {
      title: "Transistor-Logic Calculator",
      description: "Four-function calculator using ripple-carry adders and custom 7-segment decoder with power management, achieving <5ns propagation latency for all 16-bit operations.",
      image: "/tmarhguy/images/calculator-animated.svg",
      github: "https://github.com/tmarhguy/custom-calculator",
      demo: "/projects/hardware/calculator",
      tags: ["Adders", "Display Logic", "Power Management"],
      status: "In Progress" as const
    },
  ];

  return (
    <main className="min-h-screen bg-black relative">
      {/* Hero section with circuit background */}
      <div className="relative">
        <AnimatedBackground variant="circuit" intensity="medium" />
        <Hero />
      </div>
      
      {/* Professional Tagline Section with terminal effect */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-gray-950/50 relative">
        <AnimatedBackground variant="terminal" intensity="low" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            My name is Tyrone.
          </h1>
          <TaglineSection />
        </div>
      </section>
      
      <section id="projects" className="py-6 sm:py-8 px-4 sm:px-6 relative">
        <AnimatedBackground variant="particles" intensity="medium" className="-z-10" />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
              Flagship Projects
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-2">
              From hardware design to machine learning, these projects showcase the breadth and depth of my technical expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {flagshipProjects.map((project, index) => (
              <AnimatedCard 
                key={index} 
                glowEffect={true} 
                scanlineEffect={true} 
                tiltEffect={true}
                className="h-full"
              >
                <FlagshipCard {...project} />
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-4 sm:py-6 px-4 sm:px-6 relative">
        <AnimatedBackground variant="circuit" intensity="low" className="-z-10" />
        <div className="container mx-auto relative z-10">
          {/* Additional Software Projects */}
          <div className="mt-0">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4 text-white">
              Software Development
            </h3>
            <p className="text-gray-400 text-center mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              From psychology-based games to automation tools, exploring diverse applications of software engineering.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {softwareProjects.map((project, index) => (
                <AnimatedCard 
                  key={index} 
                  glowEffect={true} 
                  tiltEffect={true}
                  className="h-full"
                >
                  <ProjectCard {...project} />
                </AnimatedCard>
              ))}
            </div>
          </div>
          
          {/* Hardware Projects */}
          <div className="mt-8 sm:mt-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4 text-white">
              Hardware Engineering
            </h3>
            <p className="text-gray-400 text-center mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Building from transistors up, creating physical computing systems and culturally-inspired automation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {hardwareProjects.map((project, index) => (
                <AnimatedCard 
                  key={index} 
                  glowEffect={true} 
                  tiltEffect={true}
                  className="h-full"
                >
                  <ProjectCard {...project} />
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-2 sm:py-4 px-4 sm:px-6 bg-gray-950 relative">
        <AnimatedBackground variant="circuit" intensity="low" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <Skills />
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-1 sm:py-2 px-4 sm:px-6 bg-gray-950 relative">
        <AnimatedBackground variant="matrix" intensity="low" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-3 sm:mb-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
              Byte-Sized Bio
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 px-2 mb-6">
              I use transistors and algorithms to build cool stuff that empowers people to create.
            </p>
            <div className="mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-brand-600/30 mb-6 relative bg-gray-800">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-6xl sm:text-7xl">👨‍💻</div>
              </div>
            </div>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-2">
              Building the future through hardware innovation and principled problem-solving
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Engineering Philosophy</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  I believe in building from first principles—whether designing transistor-level CPUs or 
                  developing ML algorithms. My approach combines rigorous technical execution with a deep 
                  understanding of real-world constraints and user needs.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-800">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <span className="text-brand-400">🔗</span>
                  Connect With Me
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href="https://github.com/tmarhguy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group"
                  >
                    <svg className="h-4 w-4 text-brand-400 group-hover:text-brand-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-gray-300 group-hover:text-white text-sm">GitHub</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/tmarhguy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group"
                  >
                    <Linkedin className="h-4 w-4 text-brand-400 group-hover:text-brand-300" />
                    <span className="text-gray-300 group-hover:text-white text-sm">LinkedIn</span>
                  </a>
                  <a 
                    href="mailto:tyrone@tmarhguy.dev" 
                    className="flex items-center gap-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group"
                  >
                    <Mail className="h-4 w-4 text-brand-400 group-hover:text-brand-300" />
                    <span className="text-gray-300 group-hover:text-white text-sm">Email</span>
                  </a>
                  <a 
                    href="https://tmarhguy.dev/blog" 
                    className="flex items-center gap-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group"
                  >
                    <svg className="h-4 w-4 text-brand-400 group-hover:text-brand-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <span className="text-gray-300 group-hover:text-white text-sm">Blog</span>
                  </a>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-800">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Core Competencies</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[
                    "Digital Circuit Design",
                    "Computer Architecture", 
                    "Machine Learning",
                    "Full-Stack Development",
                    "System Programming",
                    "Problem Solving"
                  ].map((skill) => (
                    <span 
                      key={skill}
                      className="px-2 sm:px-3 py-1 bg-brand-600/20 text-brand-300 text-xs sm:text-sm rounded-full border border-brand-600/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Resilience & Advocacy</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  My advocacy for student rights in Ghana gained international recognition{" "}
                  <a 
                    href="https://en.wikipedia.org/wiki/Tyrone_Marhguy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-400 hover:text-brand-300 underline"
                  >
                    [Wikipedia ↗]
                  </a>
                  , while simultaneously achieving top 0.1% in WASSCE. This experience taught me persistence 
                  and principled problem-solving—values I now apply to transistor-level CPUs and privacy-centric ML.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-800">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Timeline Highlights</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-brand-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="text-brand-400 text-xs sm:text-sm font-medium">2024</div>
                      <div className="text-gray-300 text-sm sm:text-base">Computer Engineering at University of Pennsylvania</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-brand-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="text-brand-400 text-xs sm:text-sm font-medium">2023</div>
                      <div className="text-gray-300 text-sm sm:text-base">8 A1s in WASSCE, Math & Physics Olympiad medals</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-brand-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="text-brand-400 text-xs sm:text-sm font-medium">2021</div>
                      <div className="text-gray-300 text-sm sm:text-base">High Court victory on student rights</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-brand-600/20 to-brand-800/20 rounded-lg p-4 sm:p-6 border border-brand-600/30">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <span className="text-brand-400">�</span>
                  Download My Resume!
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Specialized resumes tailored for hardware engineering and software development roles, showcasing relevant experience and projects.
                </p>
                <div className="flex justify-center">
                  <BioSection />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Time Capsule Resume Button */}
      <TimeCapsuleResume />
    </main>
  );
}
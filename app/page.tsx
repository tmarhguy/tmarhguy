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
      description: "A complete CPU built from discrete 2N7000 NMOS transistors with custom instruction set architecture, capable of running assembly programs including Fibonacci calculations.",
      image: "/images/cpu-placeholder.svg",
      metrics: [
        { label: "Transistors", value: "734" },
        { label: "Max Freq", value: "4.3 kHz" },
        { label: "Power", value: "180 mA" },
        { label: "Tests Pass", value: "100%" },
      ],
      github: "https://github.com/tmarhguy/cpu",
      demo: "/projects/hardware/cpu",
      tags: ["Hardware", "CPU", "Digital Design"],
    },
    {
      title: "MoMo Credit Score Generator - Ghana",
      description: "ML-driven credit scoring engine that analyzes mobile money transactions to generate alternative credit scores for the un/under-banked population in Ghana, achieving 89% accuracy in default prediction.",
      image: "/images/momo-csg-placeholder.svg",
      metrics: [
        { label: "Accuracy", value: "89%" },
        { label: "Population", value: "350M+" },
        { label: "Markets", value: "5 Countries" },
        { label: "Latency", value: "< 400ms" },
      ],
      github: "https://github.com/tmarhguy/momo-credit-score",
      demo: "/projects/software/momo-csg",
      tags: ["FinTech", "ML", "API"],
    },
    {
      title: "Music & You",
      description: "AI-powered platform that predicts Big Five personality traits from Spotify and YouTube Music listening patterns using multi-modal ML with acoustic features and temporal behavior.",
      image: "/images/music-placeholder.svg", 
      metrics: [
        { label: "Users", value: "2.1K" },
        { label: "Accuracy", value: "89%" },
        { label: "Songs", value: "50K+" },
        { label: "Uptime", value: "99.9%" },
      ],
      github: "https://github.com/tmarhguy/music-and-you",
      demo: "https://music-and-you.vercel.app",
      tags: ["AI/ML", "Psychology", "Music"],
    },
    {
      title: "UniBridge - Ghana",
      description: "Centralized application portal for Ghanaian tertiary institutions, similar to Common App, with WASSCE integration and university dashboards for streamlined admissions.",
      image: "/images/unibridge-placeholder.svg",
      metrics: [
        { label: "Universities", value: "15+" },
        { label: "Applications", value: "5K+" },
        { label: "Success Rate", value: "94%" },
        { label: "Response Time", value: "< 2s" },
      ],
      github: "https://github.com/tmarhguy/unibridgeGhana",
      demo: "/projects/software/unibridge",
      tags: ["Backend", "API", "Education"],
    },
  ];

  const softwareProjects = [
    {
      title: "UniBridge",
      description: "Centralized application portal for Ghanaian tertiary institutions, similar to Common App, with WASSCE integration and university dashboards for streamlined admissions.",
      image: "/images/unibridge-placeholder.svg",
      github: "https://github.com/tmarhguy/unibridgeGhana",
      demo: "/projects/software/unibridge",
      tags: ["Backend", "API", "Education"],
      status: "In Progress" as const
    },
    {
      title: "Music & You",
      description: "AI-powered platform that predicts Big Five personality traits from Spotify and YouTube Music listening patterns using multi-modal ML with acoustic features and temporal behavior.",
      image: "/images/music-placeholder.svg",
      github: "https://github.com/tmarhguy/music-and-you",
      demo: "https://music-and-you.vercel.app",
      tags: ["AI/ML", "Psychology", "Music"],
      status: "In Progress" as const
    },
    {
      title: "MoMo Credit Score Generator - Ghana",
      description: "ML-driven credit scoring engine that analyzes mobile money transactions to generate alternative credit scores for the un/under-banked population in Ghana, achieving 89% accuracy in default prediction.",
      image: "/images/momo-csg-placeholder.svg",
      github: "https://github.com/tmarhguy/momo-credit-score",
      demo: "/projects/software/momo-csg",
      tags: ["FinTech", "ML", "API"],
      status: "In Progress" as const
    },
    {
      title: "AtomAssembler",
      description: "Two-pass assembler that converts human-readable mnemonics for discrete-transistor 8-bit CPU into executable machine code with labels, macros, and Intel-HEX output support.",
      image: "/images/atom-assembler-placeholder.svg",
      github: "https://github.com/tmarhguy/atom-assembler",
      demo: "/projects/software/atom-assembler",
      tags: ["Compiler", "Assembly", "Tools"],
      status: "In Progress" as const
    },
    {
      title: "Color Communication Game",
      description: "Multiplayer psychology-based game where users develop shared language using color patterns, exploring behavioral communication and emergent semantics.",
      image: "/images/color-game-placeholder.svg",
      github: "https://github.com/tmarhguy/Psych_Color_Game_Experiment",
      demo: "/projects/software/color-game",
      tags: ["Flutter", "Psychology", "Real-time"],
      status: "In Progress" as const
    },
    {
      title: "YouTube to Spotify Migrator",
      description: "CLI tool for seamless playlist and liked songs migration from YouTube Music to Spotify using OAuth and API automation.",
      image: "/images/migrator-placeholder.svg",
      github: "https://github.com/tmarhguy/ytmusic-spotify-migrator",
      demo: "/projects/software/migrator",
      tags: ["Python", "CLI", "Automation"],
      status: "Complete" as const
    },
  ];

  const hardwareProjects = [
    {
      title: "Precision Clock Circuit",
      description: "Crystal oscillator-based timing generator with frequency dividers and pulse shaping for CPU synchronization and digital systems.",
      image: "/images/clock-placeholder.svg",
      github: "https://github.com/tmarhguy/custom-clock",
      demo: "/projects/hardware/clock",
      tags: ["Oscillators", "Timing", "Digital"],
      status: "In Progress" as const
    },
    {
      title: "CPU-Powered Calculator",
      description: "Full calculator driven by hand-built CPU with 7-segment displays, keypad interface, and arithmetic operations demonstrating practical CPU applications.",
      image: "/images/calculator-placeholder.svg",
      github: "https://github.com/tmarhguy/custom-calculator",
      demo: "/projects/hardware/calculator",
      tags: ["I/O Interface", "Display", "Integration"],
      status: "In Progress" as const
    },
    {
      title: "32-Bit Memory Drive",
      description: "Transistor-based memory unit with 32-bit addressing, manual soldering, and potential USB detection through microcontroller bridge.",
      image: "/images/memory-placeholder.svg",
      github: "https://github.com/tmarhguy/memory-drive",
      demo: "/projects/hardware/memory",
      tags: ["Memory", "Bus Interface", "Storage"],
      status: "In Progress" as const
    },
    {
      title: "Kente Weaving Machine",
      description: "Semi-automated loom with programmable pattern encoding and stepper motor control, preserving traditional Kente aesthetics while increasing efficiency.",
      image: "/images/kente-placeholder.svg",
      github: "https://github.com/tmarhguy/kente",
      demo: "/projects/hardware/kente",
      tags: ["Cultural Tech", "Automation", "Mechanical"],
      status: "Concept" as const
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
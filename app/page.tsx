import Hero from "@/components/Hero";
import FlagshipCard from "@/components/FlagshipCard";
import ProjectCard from "@/components/ProjectCard";
import Skills from "@/components/Skills";
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
    <main className="min-h-screen bg-black">
      <Hero />
      
      <section id="projects" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
              Flagship Projects
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-2">
              From hardware design to machine learning, these projects showcase the breadth and depth of my technical expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {flagshipProjects.map((project, index) => (
              <FlagshipCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="px-4 sm:px-6">
        <div className="container mx-auto">
          {/* Additional Software Projects */}
          <div className="mt-16 sm:mt-20">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4 text-white">
              Software Development
            </h3>
            <p className="text-gray-400 text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
              From psychology-based games to automation tools, exploring diverse applications of software engineering.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {softwareProjects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>
          
          {/* Hardware Projects */}
          <div className="mt-16 sm:mt-20">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4 text-white">
              Hardware Engineering
            </h3>
            <p className="text-gray-400 text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
              Building from transistors up, creating physical computing systems and culturally-inspired automation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {hardwareProjects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <Skills />
      
      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-950">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 px-2">
              Building the future through hardware innovation and principled problem-solving
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Engineering Philosophy</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  I believe in building from first principles—whether designing transistor-level CPUs or 
                  developing ML algorithms. My approach combines rigorous technical execution with a deep 
                  understanding of real-world constraints and user needs.
                </p>
              </div>
              
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
            </div>
            
            <div className="space-y-4 sm:space-y-6">
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
              
              <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-800">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Contact</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-brand-400 flex-shrink-0" />
                    <a 
                      href="mailto:tmarhguy@gmail.com" 
                      className="text-gray-300 hover:text-brand-400 transition-colors text-sm sm:text-base break-all"
                    >
                      tmarhguy@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <svg className="h-3 w-3 sm:h-4 sm:w-4 text-brand-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <a 
                      href="tel:+12156511357" 
                      className="text-gray-300 hover:text-brand-400 transition-colors text-sm sm:text-base"
                    >
                      +1 (215) 651-1357
                    </a>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Linkedin className="h-3 w-3 sm:h-4 sm:w-4 text-brand-400 flex-shrink-0" />
                    <a 
                      href="https://linkedin.com/in/tmarhguy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-brand-400 transition-colors text-sm sm:text-base break-all"
                    >
                      linkedin.com/in/tmarhguy
                    </a>
                  </div>
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
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { Code, Globe, Cpu, Zap, Wrench, Database, Shield, GitBranch, Brain, CircuitBoard } from "lucide-react";

const skillCategories = [
  {
    icon: Code,
    title: "Programming",
    skills: ["Python", "C++", "C", "TypeScript/JavaScript", "Java", "Bash/Shell"]
  },
  {
    icon: CircuitBoard,
    title: "Systems & Embedded",
    skills: ["Device Drivers", "RTOS", "Integration Testing", "Requirements", "Hardware-Software Co-Design"]
  },
  {
    icon: Globe,
    title: "Web & Frameworks",
    skills: ["FastAPI", "React/Next.js", "Node.js", "Tailwind CSS", "Radix UI"]
  },
  {
    icon: Database,
    title: "Data & Cloud",
    skills: ["PostgreSQL", "Redis", "MongoDB", "Docker"]
  },
  {
    icon: Brain,
    title: "ML & Analytics",
    skills: ["scikit-learn", "XGBoost", "pandas", "NumPy", "SHAP"]
  },
  {
    icon: GitBranch,
    title: "DevOps & Testing",
    skills: ["Git/GitHub", "Pytest", "Code Reviews"]
  },
  {
    icon: Cpu,
    title: "Hardware & FPGA",
    skills: ["RTL (Verilog, SystemVerilog, VHDL)", "FPGA Synthesis", "ASIC Prototyping", "Timing Optimization"]
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    skills: ["OAuth2 & JWT", "AES-256 Encryption", "HIPAA Compliance", "Data Standards"]
  }
];

const additionalTools = [
  "D3.js", "Documentation", "Compliance Standards", "Oscilloscope", "Logic Analyzer", 
  "LTspice", "KiCad", "Tcl", "Linux Development Environments"
];

export default function Skills() {
  return (
    <section className="py-3 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Technical Skills
          </h2>
        </div>

        {/* Compact Skills Grid - 4 columns on larger screens */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
          {skillCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.title}
                className="bg-surface-dark/40 rounded-md border border-surface/40 p-2.5 hover:border-brand-500/40 hover:bg-surface-dark/60 transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-brand-500/20 to-brand-600/20 rounded flex items-center justify-center">
                    <IconComponent className="w-3 h-3 text-brand-400" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="inline-block px-2 py-1 bg-surface-muted/50 text-surface-secondary text-sm rounded border border-surface/30 hover:border-brand-500/40 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact Additional Tools */}
        <div className="bg-surface-dark/30 rounded-md border border-surface/40 p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 bg-gradient-to-br from-brand-500/20 to-brand-600/20 rounded flex items-center justify-center">
              <Wrench className="w-2.5 h-2.5 text-brand-400" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-foreground">
              Additional Tools
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {additionalTools.map((tool) => (
              <span 
                key={tool}
                className="px-2 py-1 bg-surface-muted/40 text-surface-secondary text-sm rounded border border-surface/30 hover:border-brand-500/40 transition-colors duration-200"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Compact Summary Badge */}
        <div className="mt-3 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-full">
            <Zap className="w-3 h-3 text-brand-400" />
            <span className="text-sm font-medium text-brand-400">
              Full-Stack • Embedded • ML • Hardware
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

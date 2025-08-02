"use client";

import { Code, Cpu, Database, Globe, Wrench, Zap } from "lucide-react";

const skillCategories = [
  {
    icon: Code,
    title: "Programming",
    skills: ["Python", "C++/C", "TypeScript/JS", "Bash/Shell", "Verilog/VHDL"]
  },
  {
    icon: Globe,
    title: "Web & APIs",
    skills: ["FastAPI", "React/Next.js", "Node.js", "GraphQL/REST", "OAuth2/JWT"]
  },
  {
    icon: Database,
    title: "Data & Cloud",
    skills: ["PostgreSQL", "Redis", "MongoDB", "AWS (EC2/S3)", "Docker/K8s"]
  },
  {
    icon: Cpu,
    title: "Hardware Design",
    skills: ["RTL (Verilog)", "FPGA (Vivado)", "PCB (KiCad)", "Transistor Logic", "ISA Design"]
  },
  {
    icon: Wrench,
    title: "DevOps & Testing",
    skills: ["GitHub Actions", "Jenkins", "Pytest/Jest", "LTspice", "Logic Analyzer"]
  },
  {
    icon: Zap,
    title: "ML & Analytics",
    skills: ["XGBoost", "scikit-learn", "SHAP", "pandas/NumPy", "Feature Engineering"]
  }
];

export default function Skills() {
  return (
    <section className="py-1 sm:py-2 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-2 sm:mb-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
            Technical Skills
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Core technologies and tools I work with across hardware design, software development, and data science.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {skillCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.title}
                className="bg-gray-900 rounded-lg border border-gray-800 p-2 sm:p-3 hover:border-brand-600/50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-brand-600/20 rounded-lg flex items-center justify-center group-hover:bg-brand-600/30 transition-colors">
                    <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 text-brand-400" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill}
                      className="text-xs sm:text-sm text-gray-300 py-1 px-2 bg-gray-800/50 rounded border border-gray-700/50 hover:border-brand-600/30 hover:text-brand-300 transition-all duration-200"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Learning Interests - More Compact */}
        <div className="mt-2 sm:mt-3 bg-gray-900 rounded-lg border border-gray-800 p-3 sm:p-4">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 flex items-center gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-brand-600/20 rounded flex items-center justify-center">
              <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-400" />
            </div>
            Currently Learning
          </h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {[
              "SystemVerilog/UVM",
              "Signal Integrity",
              "Embedded Systems", 
              "Microcontroller Integration",
              "Hardware Bring-up"
            ].map((interest) => (
              <span 
                key={interest}
                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-800 text-gray-300 text-xs sm:text-sm rounded border border-gray-700 hover:border-brand-600/50 hover:text-brand-400 transition-all duration-200"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import AnimatedBackground from "@/components/animations/AnimatedBackground";
import AnimatedCard from "@/components/animations/AnimatedCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink, Cpu, CircuitBoard, BarChart3, Microchip } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CPUProjectPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background relative">
      {/* Header with back button */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-surface">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            className="gap-2"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Button>
        </div>
      </div>

      {/* Page Title */}
      <section className="py-8 sm:py-12 relative">
        <AnimatedBackground variant="circuit" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              8-bit Transistor CPU
            </h1>
            <p className="text-lg text-surface-muted max-w-2xl mx-auto">
              Complete CPU built from 700+ discrete 2N7000 NMOS transistors with custom 12-instruction ISA
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <a href="https://github.com/tmarhguy/cpu" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  View Code
                </Button>
              </a>
              <Button className="gap-2" onClick={() => router.push('/projects/cpu')}>
                <ExternalLink className="h-4 w-4" />
                Project Details
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-6 sm:py-10 relative">
        <AnimatedBackground variant="circuit" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Project Overview
              </h2>
              <p className="text-lg text-surface-muted max-w-2xl mx-auto">
                Building a complete CPU from discrete transistors to understand computer architecture at the most fundamental level
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Problem Statement */}
              <AnimatedCard glowEffect={true} className="h-full">
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">🔧</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      The Challenge
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-surface-secondary text-sm leading-relaxed">
                      Modern CPUs are incredibly complex integrated circuits that make it difficult 
                      to understand the fundamental principles of computer architecture and how 
                      transistors work together to create computational logic.
                    </p>
                    <ul className="space-y-2 text-sm text-surface-muted">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>Complex integrated circuits</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>Limited hands-on learning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>Abstract architecture concepts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>Difficulty visualizing data flow</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </AnimatedCard>

              {/* Solution Overview */}
              <AnimatedCard glowEffect={true} className="h-full">
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">⚡</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      The Solution
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-surface-secondary text-sm leading-relaxed">
                      A complete 8-bit CPU built entirely from discrete NMOS transistors, 
                      implementing a custom instruction set architecture that demonstrates 
                      fundamental computer principles in a tangible, observable way.
                    </p>
                    <ul className="space-y-2 text-sm text-surface-muted">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Discrete transistor implementation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Custom 12-instruction ISA</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Assembly program execution</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Real-time signal analysis</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="py-6 sm:py-10 relative">
        <AnimatedBackground variant="circuit" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Method & Implementation
              </h2>
              <p className="text-lg text-surface-muted max-w-2xl mx-auto">
                Systematic approach to building a complete CPU from fundamental components
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* Architecture Design */}
              <AnimatedCard glowEffect={true}>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Cpu className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      CPU Architecture Design
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Core Components</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>8-bit ALU with arithmetic operations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>16-byte register file</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>256-byte program memory</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Control unit with state machine</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Instruction Set</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>ADD, SUB, AND, OR operations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>LOAD, STORE memory operations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>JMP, JZ conditional jumps</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>NOP, HALT control instructions</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Transistor Implementation */}
              <AnimatedCard glowEffect={true}>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <CircuitBoard className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Transistor-Level Implementation
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Logic Gates</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>NAND gates from NMOS transistors</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Pull-up and pull-down networks</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>D-flip-flop memory cells</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Multiplexer and decoder circuits</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Circuit Design</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>2N7000 NMOS transistor selection</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Power supply and biasing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Signal integrity considerations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>PCB layout and routing</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Testing & Validation */}
              <AnimatedCard glowEffect={true}>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-yellow-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Testing & Validation
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Hardware Testing</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Logic analyzer measurements</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Oscilloscope signal analysis</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Power consumption monitoring</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Temperature and stability tests</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Software Validation</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Assembly program execution</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Instruction set verification</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Memory access patterns</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Performance benchmarking</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-6 sm:py-10 relative">
        <AnimatedBackground variant="circuit" intensity="low" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Results & Performance
              </h2>
              <p className="text-lg text-surface-muted max-w-2xl mx-auto">
                Successful implementation with measurable performance characteristics
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Hardware Specifications */}
              <AnimatedCard glowEffect={true} className="h-full">
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">🔌</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Hardware Specifications
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">700+</div>
                        <div className="text-xs text-surface-muted">Transistors</div>
                      </div>
                      <div className="text-center p-4 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">8-bit</div>
                        <div className="text-xs text-surface-muted">Data Width</div>
                      </div>
                      <div className="text-center p-4 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">12</div>
                        <div className="text-xs text-surface-muted">Instructions</div>
                      </div>
                      <div className="text-center p-4 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">256B</div>
                        <div className="text-xs text-surface-muted">Memory</div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Performance Metrics */}
              <AnimatedCard glowEffect={true} className="h-full">
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Microchip className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Performance Metrics
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-surface-secondary">Clock Frequency</span>
                        <span className="text-brand-400 font-semibold text-sm">1 MHz</span>
                      </div>
                      <div className="w-full bg-surface-muted/50 rounded-full h-2">
                        <div className="bg-brand-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-surface-secondary">Power Consumption</span>
                        <span className="text-brand-400 font-semibold text-sm">2.5W</span>
                      </div>
                      <div className="w-full bg-surface-muted/50 rounded-full h-2">
                        <div className="bg-brand-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-surface-secondary">Gate Delay</span>
                        <span className="text-brand-400 font-semibold text-sm">&lt;50ns</span>
                      </div>
                      <div className="w-full bg-surface-muted/50 rounded-full h-2">
                        <div className="bg-brand-400 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </div>

            {/* Technical Achievements */}
            <div className="mt-8">
              <AnimatedCard glowEffect={true}>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">🏆</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Technical Achievements
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Architecture</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Complete CPU implementation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Custom instruction set</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Memory hierarchy design</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Implementation</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Discrete transistor logic</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>PCB design and fabrication</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Signal integrity optimization</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Future Plans</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>16-bit architecture</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Pipeline implementation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Cache memory system</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Portfolio Button */}
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

"use client";

import AnimatedBackground from "@/components/animations/AnimatedBackground";
import AnimatedCard from "@/components/animations/AnimatedCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink, Clock, CircuitBoard, BarChart3, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClockProjectPage() {
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
              Precision Clock Oscillator
            </h1>
            <p className="text-lg text-surface-muted max-w-2xl mx-auto">
              RC multivibrator delivering 1 kHz clock with &lt;1% drift and stable duty cycle
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <a href="https://github.com/tmarhguy/custom-clock" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  View Code
                </Button>
              </a>
              <Button className="gap-2" onClick={() => router.push('/projects/clock')}>
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
                Building a precise timing reference for digital systems using analog circuit design principles
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Problem Statement */}
              <AnimatedCard glowEffect={true} className="h-full">
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">⏰</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      The Challenge
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-surface-secondary text-sm leading-relaxed">
                      Digital systems require precise timing references, but commercial oscillators 
                      are expensive and don&apos;t provide hands-on learning opportunities for understanding 
                      timing circuit principles.
                    </p>
                    <ul className="space-y-2 text-sm text-surface-muted">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>Expensive commercial oscillators</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>Limited frequency control</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>Poor temperature stability</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>No educational value</span>
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
                      A custom-designed RC multivibrator oscillator that provides precise 1 kHz 
                      timing with excellent stability, temperature resilience, and adjustable 
                      duty cycle for educational and practical applications.
                    </p>
                    <ul className="space-y-2 text-sm text-surface-muted">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>RC multivibrator design</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>1 kHz output frequency</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Adjustable duty cycle</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Temperature compensation</span>
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
                Advanced analog circuit design with precision timing and stability considerations
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* Circuit Design */}
              <AnimatedCard glowEffect={true}>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <CircuitBoard className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      RC Multivibrator Design
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Core Components</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Two-stage transistor amplifier</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>RC timing networks</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Positive feedback loop</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Output buffer stage</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Timing Analysis</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Frequency calculation: f = 1/(2πRC)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Duty cycle control</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Startup behavior analysis</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Stability criteria</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Component Selection */}
              <AnimatedCard glowEffect={true}>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Component Selection & Optimization
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Resistors & Capacitors</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>1% tolerance components</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Temperature coefficient matching</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Parasitic capacitance minimization</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Power rating considerations</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Transistors</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>High gain selection</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Low noise characteristics</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Temperature stability</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Fast switching speed</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* PCB Design */}
              <AnimatedCard glowEffect={true}>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-yellow-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      PCB Design & Layout
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Layout Considerations</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Ground plane design</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Signal path optimization</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Component placement</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Thermal management</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Testing Points</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Frequency measurement</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Duty cycle verification</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Voltage level monitoring</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Temperature compensation</span>
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
                Exceptional timing precision with excellent stability characteristics
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Performance Metrics */}
              <AnimatedCard glowEffect={true} className="h-full">
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">📊</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Performance Metrics
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">1 kHz</div>
                        <div className="text-xs text-surface-muted">Frequency</div>
                      </div>
                      <div className="text-center p-4 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">&lt;1%</div>
                        <div className="text-xs text-surface-muted">Drift</div>
                      </div>
                      <div className="text-center p-4 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">50%</div>
                        <div className="text-xs text-surface-muted">Duty Cycle</div>
                      </div>
                      <div className="text-center p-4 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">5V</div>
                        <div className="text-xs text-surface-muted">Output</div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Stability Characteristics */}
              <AnimatedCard glowEffect={true} className="h-full">
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Stability Characteristics
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-surface-secondary">Temperature Stability</span>
                        <span className="text-brand-400 font-semibold text-sm">±0.1%/°C</span>
                      </div>
                      <div className="w-full bg-surface-muted/50 rounded-full h-2">
                        <div className="bg-brand-400 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-surface-secondary">Power Supply Rejection</span>
                        <span className="text-brand-400 font-semibold text-sm">-40dB</span>
                      </div>
                      <div className="w-full bg-surface-muted/50 rounded-full h-2">
                        <div className="bg-brand-400 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-surface-secondary">Long-term Drift</span>
                        <span className="text-brand-400 font-semibold text-sm">&lt;0.01%/hour</span>
                      </div>
                      <div className="w-full bg-surface-muted/50 rounded-full h-2">
                        <div className="bg-brand-400 h-2 rounded-full" style={{ width: '95%' }}></div>
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
                      <h4 className="text-lg font-semibold text-foreground mb-3">Precision</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>1 kHz ±0.1% accuracy</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Stable duty cycle</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Low jitter output</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Stability</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Temperature compensation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Power supply rejection</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Long-term stability</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Future Plans</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Variable frequency</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Phase-locked loop</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Digital control</span>
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

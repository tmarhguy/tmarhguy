"use client";

import AnimatedBackground from "@/components/animations/AnimatedBackground";
import AnimatedCard from "@/components/animations/AnimatedCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink, Database, Zap, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UniBridgeProjectPage() {
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
              UniBridge - Ghana
            </h1>
            <p className="text-lg text-surface-muted max-w-2xl mx-auto">
              Ghana&apos;s first centralized admissions platform unifying multi-university applications
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <a href="https://github.com/tmarhguy/unibridgeGhana" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  View Code
                </Button>
              </a>
              <Button className="gap-2" onClick={() => router.push('/projects/unibridge')}>
                <ExternalLink className="h-4 w-4" />
                Live Demo
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
                A comprehensive solution addressing Ghana&apos;s fragmented university admissions process
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Problem Statement */}
              <AnimatedCard glowEffect={true} className="h-full">
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">⚠️</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      The Problem
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-surface-secondary text-sm leading-relaxed">
                      Ghana&apos;s university admissions system was fragmented across multiple institutions, 
                      requiring students to submit separate applications to each university with different 
                      requirements, deadlines, and document formats.
                    </p>
                    <ul className="space-y-2 text-sm text-surface-muted">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>Multiple application portals</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>Inconsistent document requirements</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>No centralized tracking system</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>Manual processing delays</span>
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
                      <span className="text-2xl sm:text-3xl">🎯</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      The Solution
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-surface-secondary text-sm leading-relaxed">
                      UniBridge provides a unified platform where students can apply to multiple universities 
                      through a single interface, with standardized document requirements and real-time 
                      application tracking.
                    </p>
                    <ul className="space-y-2 text-sm text-surface-muted">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Single application portal</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Standardized document workflow</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Real-time application tracking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Automated processing</span>
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
                Method & Architecture
              </h2>
              <p className="text-lg text-surface-muted max-w-2xl mx-auto">
                Modern full-stack architecture with microservices and comprehensive testing
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* Backend Architecture */}
              <AnimatedCard glowEffect={true}>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Database className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Backend Architecture
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">FastAPI Microservices</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>RESTful API with OpenAPI documentation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>JWT-based authentication system</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>OAuth2 integration for document workflows</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Async request handling</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Data Layer</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>PostgreSQL for relational data</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Redis for caching and sessions</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>SQLAlchemy ORM with migrations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Data validation with Pydantic</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Frontend Implementation */}
              <AnimatedCard glowEffect={true}>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Frontend Implementation
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Next.js 14 Features</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>App Router with server components</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>TypeScript for type safety</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Tailwind CSS for styling</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Responsive design patterns</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">State Management</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>React Context for global state</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Custom hooks for API calls</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Form validation with React Hook Form</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Real-time updates with WebSockets</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Security & Testing */}
              <AnimatedCard glowEffect={true}>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-yellow-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Security & Testing
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Security Measures</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>AES-256 encryption for documents</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>JWT token validation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Rate limiting and DDoS protection</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Input sanitization and validation</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Testing Strategy</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>120+ automated tests</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>92% test coverage</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Unit, integration, and E2E tests</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>CI/CD pipeline integration</span>
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
                Results & Impact
              </h2>
              <p className="text-lg text-surface-muted max-w-2xl mx-auto">
                Measurable improvements in performance, user experience, and system reliability
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Performance Metrics */}
              <AnimatedCard glowEffect={true} className="h-full">
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">⚡</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Performance Metrics
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">0.8s</div>
                        <div className="text-xs text-surface-muted">First Contentful Paint</div>
                      </div>
                      <div className="text-center p-4 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">1.4s</div>
                        <div className="text-xs text-surface-muted">Speed Index</div>
                      </div>
                      <div className="text-center p-4 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">92%</div>
                        <div className="text-xs text-surface-muted">Test Coverage</div>
                      </div>
                      <div className="text-center p-4 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">120+</div>
                        <div className="text-xs text-surface-muted">Automated Tests</div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* User Experience Improvements */}
              <AnimatedCard glowEffect={true} className="h-full">
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">👥</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      User Experience
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-surface-secondary">Application Time</span>
                        <span className="text-brand-400 font-semibold text-sm">Reduced by 70%</span>
                      </div>
                      <div className="w-full bg-surface-muted/50 rounded-full h-2">
                        <div className="bg-brand-400 h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-surface-secondary">Document Processing</span>
                        <span className="text-brand-400 font-semibold text-sm">Automated 85%</span>
                      </div>
                      <div className="w-full bg-surface-muted/50 rounded-full h-2">
                        <div className="bg-brand-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-surface-secondary">Error Rate</span>
                        <span className="text-brand-400 font-semibold text-sm">Reduced by 90%</span>
                      </div>
                      <div className="w-full bg-surface-muted/50 rounded-full h-2">
                        <div className="bg-brand-400 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </div>

            {/* Deployment & Scalability */}
            <div className="mt-8">
              <AnimatedCard glowEffect={true}>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">🚀</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Deployment & Scalability
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Infrastructure</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Docker containerization</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>GitHub Actions CI/CD</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Auto-scaling capabilities</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Monitoring</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Real-time performance metrics</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Error tracking and alerting</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>User analytics dashboard</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Future Plans</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Mobile app development</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>AI-powered document analysis</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Multi-country expansion</span>
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

"use client";

import AnimatedBackground from "@/components/animations/AnimatedBackground";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink, Calculator, Zap, BarChart3, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SVDProjectPage() {
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
              SVD Image Compression
            </h1>
            <p className="text-lg text-surface-muted max-w-2xl mx-auto">
              MATH 3120 Final Project: Advanced Singular Value Decomposition for intelligent image compression. A client-side web application demonstrating real-time SVD image compression with interactive parameter control and educational visualizations.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <a href="https://github.com/tmarhguy/svd" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  View Code
                </Button>
              </a>
              <a href="https://svd-wheat.vercel.app" target="_blank" rel="noopener noreferrer">
                <Button className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
              </a>
              <a href="https://www.linkedin.com/posts/tmarhguy_we-compress-images-every-day-sending-a-picture-activity-7363570499286659072-iT0v" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <span className="text-blue-600">🔗</span>
                  LinkedIn Post
                </Button>
                </a>
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
                Interactive web application demonstrating Singular Value Decomposition for image compression
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Problem Statement */}
              <div>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">🖼️</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      The Challenge
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-surface-secondary text-sm leading-relaxed">
                      Traditional image compression methods often lack transparency in how they work, 
                      making it difficult for students and researchers to understand the underlying 
                      mathematical principles of image compression.
                    </p>
                    <ul className="space-y-2 text-sm text-surface-muted">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>Complex mathematical concepts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>Limited interactive learning tools</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>Performance bottlenecks in processing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>Lack of real-time compression control</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Solution Overview */}
              <div>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">🔬</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      The Solution
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-surface-secondary text-sm leading-relaxed">
                      An interactive web application that demonstrates SVD-based image compression 
                      in real-time, allowing users to explore the relationship between compression 
                      ratio and image quality through an intuitive interface.
                    </p>
                    <ul className="space-y-2 text-sm text-surface-muted">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Real-time SVD computation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Interactive compression control</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Visual quality comparison</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Educational insights</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
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
                Advanced mathematical algorithms with optimized web performance
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* SVD Algorithm */}
              <div>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Calculator className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      SVD Algorithm Implementation
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Mathematical Foundation</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Singular Value Decomposition</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Matrix factorization: A = UΣV^T</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Per-channel RGB processing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Rank-k approximation</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Optimization Techniques</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>WebAssembly for computation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Parallel processing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Memory-efficient algorithms</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Lazy loading strategies</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Frontend Architecture */}
              <div>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Frontend Architecture
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Next.js 14 Features</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>App Router architecture</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Server and client components</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>TypeScript integration</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Optimized bundling</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">User Interface</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Drag & drop file upload</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Real-time compression slider</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Side-by-side comparison</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Performance metrics display</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Optimization */}
              <div>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-yellow-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Performance Optimization
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Web Performance</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Cumulative Layout Shift (CLS) = 0</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Lighthouse score: 90/73/100</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Optimized image loading</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Efficient memory management</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Processing Speed</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>45% faster processing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>WebAssembly acceleration</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Asynchronous operations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Progressive enhancement</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
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
                Exceptional performance metrics and user experience improvements
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Performance Metrics */}
              <div>
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
                        <div className="text-2xl font-bold text-green-400">0</div>
                        <div className="text-xs text-surface-muted">CLS Score</div>
                      </div>
                      <div className="text-center p-4 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">90/73/100</div>
                        <div className="text-xs text-surface-muted">Lighthouse</div>
                      </div>
                      <div className="text-center p-4 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">20MB+</div>
                        <div className="text-xs text-surface-muted">Upload Size</div>
                      </div>
                      <div className="text-center p-2 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">45%</div>
                        <div className="text-xs text-surface-muted">Faster Processing</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compression Quality */}
              <div>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Compression Quality
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-surface-secondary">File Size Reduction</span>
                        <span className="text-brand-400 font-semibold text-sm">Up to 80%</span>
                      </div>
                      <div className="w-full bg-surface-muted/50 rounded-full h-2">
                        <div className="bg-brand-400 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-surface-secondary">Quality Preservation</span>
                        <span className="text-brand-400 font-semibold text-sm">90% at 50% compression</span>
                      </div>
                      <div className="w-full bg-surface-muted/50 rounded-full h-2">
                        <div className="bg-brand-400 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-surface-secondary">Processing Speed</span>
                        <span className="text-brand-400 font-semibold text-sm">Real-time</span>
                      </div>
                      <div className="w-full bg-surface-muted/50 rounded-full h-2">
                        <div className="bg-brand-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Achievements */}
            <div className="mt-8">
              <div>
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
                      <h4 className="text-lg font-semibold text-foreground mb-3">Algorithm Efficiency</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Optimized SVD computation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Memory-efficient processing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Parallel channel processing</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">User Experience</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Intuitive interface design</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Real-time feedback</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Educational value</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Future Enhancements</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Video compression support</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Advanced algorithms</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Mobile app version</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
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

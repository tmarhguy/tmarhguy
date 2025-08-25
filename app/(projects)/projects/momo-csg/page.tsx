"use client";

import AnimatedBackground from "@/components/animations/AnimatedBackground";
import AnimatedCard from "@/components/animations/AnimatedCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink, Brain, BarChart3, Shield, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MoMoCSGProjectPage() {
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
              MoMo Credit Score Generator
            </h1>
            <p className="text-lg text-surface-muted max-w-2xl mx-auto">
              Mobile money credit scoring system with XGBoost ML model and explainable AI dashboard
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <a href="https://github.com/tmarhguy/momo-credit-score" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  View Code
                </Button>
              </a>
              <a href="/projects/momo-csg" target="_blank" rel="noopener noreferrer">
                <Button className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
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
                Revolutionizing mobile money lending with machine learning-powered credit assessment
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Problem Statement */}
              <AnimatedCard glowEffect={true} className="h-full">
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">💳</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      The Challenge
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-surface-secondary text-sm leading-relaxed">
                      Traditional credit scoring methods fail to capture the financial behavior of mobile money users, 
                      leaving millions of people without access to credit despite having regular transaction patterns.
                    </p>
                    <ul className="space-y-2 text-sm text-surface-muted">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>No traditional credit history</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>Limited financial inclusion</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>Manual assessment inefficiency</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>Lack of transparency in decisions</span>
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
                      <span className="text-2xl sm:text-3xl">🤖</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      The Solution
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-surface-secondary text-sm leading-relaxed">
                      An ML-powered credit scoring system that analyzes mobile money transaction patterns, 
                      providing instant credit assessments with explainable AI insights for transparency.
                    </p>
                    <ul className="space-y-2 text-sm text-surface-muted">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>ML-based credit assessment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Real-time transaction analysis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Explainable AI dashboard</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Regulatory compliance</span>
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
                Advanced machine learning pipeline with explainable AI and regulatory compliance
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* ML Pipeline */}
              <AnimatedCard glowEffect={true}>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Brain className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Machine Learning Pipeline
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Model Architecture</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>XGBoost gradient boosting</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Feature engineering pipeline</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Hyperparameter optimization</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Cross-validation strategy</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Data Processing</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Transaction pattern extraction</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Feature scaling and normalization</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Missing data handling</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Outlier detection</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Backend Architecture */}
              <AnimatedCard glowEffect={true}>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-purple-400" />
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
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>RESTful API endpoints</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Async request handling</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Model serving pipeline</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Real-time scoring</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Data Management</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Secure data storage</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Data encryption at rest</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Audit logging</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Compliance reporting</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Explainable AI */}
              <AnimatedCard glowEffect={true}>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-yellow-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Explainable AI Dashboard
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">SHAP Analysis</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Feature importance ranking</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Individual prediction explanations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Global model interpretability</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Interactive visualizations</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Dashboard Features</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Real-time scoring display</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Historical performance tracking</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Risk assessment breakdown</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>Compliance monitoring</span>
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
                Outstanding model performance with significant business impact
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Model Performance */}
              <AnimatedCard glowEffect={true} className="h-full">
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">📊</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Model Performance
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">0.82</div>
                        <div className="text-xs text-surface-muted">AUC Score</div>
                      </div>
                      <div className="text-center p-4 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">85%</div>
                        <div className="text-xs text-surface-muted">Accuracy</div>
                      </div>
                      <div className="text-center p-4 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">0.78</div>
                        <div className="text-xs text-surface-muted">F1 Score</div>
                      </div>
                      <div className="text-center p-4 bg-surface-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">0.81</div>
                        <div className="text-xs text-surface-muted">Precision</div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Business Impact */}
              <AnimatedCard glowEffect={true} className="h-full">
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">💼</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Business Impact
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-surface-secondary">Credit Access</span>
                        <span className="text-brand-400 font-semibold text-sm">Increased by 40%</span>
                      </div>
                      <div className="w-full bg-surface-muted/50 rounded-full h-2">
                        <div className="bg-brand-400 h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-surface-secondary">Processing Time</span>
                        <span className="text-brand-400 font-semibold text-sm">Reduced by 90%</span>
                      </div>
                      <div className="w-full bg-surface-muted/50 rounded-full h-2">
                        <div className="bg-brand-400 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-surface-secondary">Default Rate</span>
                        <span className="text-brand-400 font-semibold text-sm">Reduced by 25%</span>
                      </div>
                      <div className="w-full bg-surface-muted/50 rounded-full h-2">
                        <div className="bg-brand-400 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </div>

            {/* Compliance & Future */}
            <div className="mt-8">
              <AnimatedCard glowEffect={true}>
                <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Compliance & Future Development
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Regulatory Compliance</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>GDPR compliance</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Financial regulations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Audit trail maintenance</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Model Monitoring</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Performance drift detection</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Automated retraining</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Real-time monitoring</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Future Enhancements</h4>
                      <ul className="space-y-2 text-sm text-surface-muted">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Deep learning models</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Alternative data sources</span>
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

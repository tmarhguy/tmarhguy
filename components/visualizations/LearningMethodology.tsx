"use client";

import { Clock, Target, Zap, TrendingUp, Brain, CheckCircle } from "lucide-react";

export default function LearningMethodology() {
  const benefits = [
    {
      icon: Clock,
      title: "Focused Time Blocks",
      description: "25-minute concentrated learning sessions with 5-minute breaks to maintain peak cognitive performance"
    },
    {
      icon: Target,
      title: "Clear Learning Goals",
      description: "Each session targets specific topics, ensuring systematic knowledge acquisition and measurable progress"
    },
    {
      icon: Zap,
      title: "Sustained Energy",
      description: "Regular breaks prevent mental fatigue and maintain high focus levels throughout extended study periods"
    },
    {
      icon: TrendingUp,
      title: "Consistent Progress",
      description: "Daily tracking reveals patterns, helping optimize study schedules and identify peak productivity windows"
    },
    {
      icon: Brain,
      title: "Active Retention",
      description: "Structured intervals enhance memory consolidation and improve long-term knowledge retention"
    },
    {
      icon: CheckCircle,
      title: "Measurable Results",
      description: "Quantified learning metrics provide concrete evidence of skill development and time investment ROI"
    }
  ];

  const methodologySteps = [
    {
      step: "1",
      title: "Session Planning",
      description: "Define specific learning objectives for each 25-minute block"
    },
    {
      step: "2",
      title: "Focused Execution",
      description: "Eliminate distractions and maintain single-topic concentration"
    },
    {
      step: "3",
      title: "Break & Reflect",
      description: "5-minute breaks for mental recovery and knowledge processing"
    },
    {
      step: "4",
      title: "Progress Tracking",
      description: "Record completion status, focus quality, and topic coverage"
    },
    {
      step: "5",
      title: "Pattern Analysis",
      description: "Review weekly/monthly data to optimize learning strategies"
    }
  ];

  return (
    <div className="bg-surface-dark rounded-lg border border-surface p-6 sm:p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          The Pomodoro Learning Methodology
        </h3>
        <p className="text-lg text-surface-muted max-w-3xl mx-auto">
          A systematic approach to learning that combines focused time management with data-driven progress tracking, 
          ensuring maximum knowledge retention and skill development efficiency.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-foreground mb-6 text-center">Why This Method Works</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-brand-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <benefit.icon className="h-6 w-6 text-brand-400" />
              </div>
              <h5 className="font-semibold text-foreground mb-2">{benefit.title}</h5>
              <p className="text-sm text-surface-secondary leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Methodology Steps */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-foreground mb-6 text-center">How It Works</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methodologySteps.map((step, index) => (
            <div key={index} className="bg-surface rounded-lg p-4 border border-surface/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <h5 className="font-semibold text-foreground">{step.title}</h5>
              </div>
              <p className="text-sm text-surface-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-surface rounded-lg p-6 border border-surface/50">
        <h4 className="text-xl font-semibold text-foreground mb-4 text-center">Results After 6 Months</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-brand-400">1,248</div>
            <div className="text-sm text-surface-muted">Pomodoro Sessions</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">624</div>
            <div className="text-sm text-surface-muted">Hours of Learning</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400">8</div>
            <div className="text-sm text-surface-muted">Topics Mastered</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400">87%</div>
            <div className="text-sm text-surface-muted">Average Focus Score</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <p className="text-surface-secondary mb-4">
          Ready to implement this methodology in your own learning journey?
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="px-3 py-1 bg-brand-600/20 text-brand-400 rounded-full">
            Start with 25-minute sessions
          </span>
          <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full">
            Track your progress daily
          </span>
          <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full">
            Analyze patterns weekly
          </span>
          <span className="px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded-full">
            Optimize continuously
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { LearningTopic } from "@/utils/pomodoroData";
import { useState } from "react";

interface LearningProgressChartProps {
  topics: LearningTopic[];
  className?: string;
}

export default function LearningProgressChart({ topics, className = "" }: LearningProgressChartProps) {
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);
  const sortedTopics = [...topics].sort((a, b) => b.totalPomodoros - a.totalPomodoros);

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return "text-green-400";
    if (proficiency >= 80) return "text-blue-400";
    if (proficiency >= 70) return "text-yellow-400";
    if (proficiency >= 60) return "text-orange-400";
    return "text-red-400";
  };

  const getProficiencyBgColor = (proficiency: number) => {
    if (proficiency >= 90) return "bg-green-600/20 border-green-600/30";
    if (proficiency >= 80) return "bg-blue-600/20 border-blue-600/30";
    if (proficiency >= 70) return "bg-yellow-600/20 border-yellow-600/30";
    if (proficiency >= 60) return "bg-orange-600/20 border-orange-600/30";
    return "bg-red-600/20 border-red-600/30";
  };

  const getProficiencyBarColor = (proficiency: number) => {
    if (proficiency >= 90) return "bg-green-500";
    if (proficiency >= 80) return "bg-blue-500";
    if (proficiency >= 70) return "bg-yellow-500";
    if (proficiency >= 60) return "bg-orange-500";
    return "bg-red-500";
  };

  const getTimeInvestmentColor = (hours: number) => {
    if (hours >= 100) return "bg-purple-500";
    if (hours >= 80) return "bg-indigo-500";
    if (hours >= 60) return "bg-blue-500";
    if (hours >= 40) return "bg-cyan-500";
    return "bg-teal-500";
  };

  return (
    <div className={`${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Learning Progress by Topic</h3>
        <p className="text-sm text-surface-muted mb-4">
          Time investment and proficiency levels across different learning areas
        </p>
      </div>

      <div className="space-y-4">
        {sortedTopics.map((topic) => (
          <div 
            key={topic.name} 
            className={`bg-surface-dark rounded-lg border p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
              hoveredTopic === topic.name ? 'ring-2 ring-brand-400/50' : ''
            } ${getProficiencyBgColor(topic.proficiency)}`}
            onMouseEnter={() => setHoveredTopic(topic.name)}
            onMouseLeave={() => setHoveredTopic(null)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full shadow-sm"
                  style={{ backgroundColor: topic.color }}
                ></div>
                <div>
                  <h4 className="font-semibold text-foreground">{topic.name}</h4>
                  <p className="text-xs text-surface-muted">{topic.category}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xl font-bold ${getProficiencyColor(topic.proficiency)}`}>
                  {topic.proficiency}%
                </div>
                <div className="text-xs text-surface-muted">proficiency</div>
              </div>
            </div>

            {/* Progress bars */}
            <div className="space-y-3">
              {/* Proficiency bar */}
              <div>
                <div className="flex justify-between text-xs text-surface-muted mb-2">
                  <span>Proficiency</span>
                  <span>{topic.proficiency}%</span>
                </div>
                <div className="w-full bg-surface-muted rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ease-out ${getProficiencyBarColor(topic.proficiency)}`}
                    style={{ 
                      width: `${topic.proficiency}%`,
                      transform: hoveredTopic === topic.name ? 'scaleY(1.1)' : 'scaleY(1)',
                      transition: 'all 0.3s ease'
                    }}
                  ></div>
                </div>
              </div>

              {/* Time investment bar */}
              <div>
                <div className="flex justify-between text-xs text-surface-muted mb-2">
                  <span>Time Investment</span>
                  <span>{topic.totalHours}h</span>
                </div>
                <div className="w-full bg-surface-muted rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ease-out ${getTimeInvestmentColor(topic.totalHours)}`}
                    style={{ 
                      width: `${(topic.totalHours / 156) * 100}%`, // 156h is max (Mathematics)
                      opacity: 0.8,
                      transform: hoveredTopic === topic.name ? 'scaleY(1.1)' : 'scaleY(1)',
                      transition: 'all 0.3s ease'
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Enhanced Stats */}
            <div className="flex justify-between mt-4 pt-4 border-t border-surface/50">
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">{topic.totalPomodoros}</div>
                <div className="text-xs text-surface-muted">sessions</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">{topic.totalHours}</div>
                <div className="text-xs text-surface-muted">hours</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-foreground">
                  {new Date(topic.lastStudied).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="text-xs text-surface-muted">last studied</div>
              </div>
            </div>


          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 p-4 bg-surface-dark rounded-lg border border-surface">
        <h4 className="text-sm font-semibold text-foreground mb-3">Overall Progress</h4>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-surface-muted">Total Hours</div>
            <div className="font-medium text-foreground">
              {topics.reduce((sum, topic) => sum + topic.totalHours, 0).toFixed(1)}h
            </div>
          </div>
          <div>
            <div className="text-surface-muted">Avg Proficiency</div>
            <div className="font-medium text-foreground">
              {(topics.reduce((sum, topic) => sum + topic.proficiency, 0) / topics.length).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

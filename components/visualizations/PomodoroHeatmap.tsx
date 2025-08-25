"use client";

import { DailyStats } from "@/utils/pomodoroData";
import { useState } from "react";

interface PomodoroHeatmapProps {
  data: DailyStats[];
  className?: string;
}

export default function PomodoroHeatmap({ data, className = "" }: PomodoroHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; stats: DailyStats } | null>(null);

  // Group data by weeks for display
  const weeks: DailyStats[][] = [];
  for (let i = 0; i < data.length; i += 7) {
    const week = data.slice(i, i + 7);
    if (week.length === 7) {
      weeks.push(week);
    }
  }

  const getIntensityColor = (pomodoros: number) => {
    if (pomodoros === 0) return "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700";
    if (pomodoros <= 2) return "bg-green-200 dark:bg-green-900 hover:bg-green-300 dark:hover:bg-green-800";
    if (pomodoros <= 4) return "bg-green-300 dark:bg-green-800 hover:bg-green-400 dark:hover:bg-green-700";
    if (pomodoros <= 6) return "bg-green-400 dark:bg-green-700 hover:bg-green-500 dark:hover:bg-green-600";
    if (pomodoros <= 8) return "bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500";
    return "bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-400";
  };

  const getIntensityLabel = (pomodoros: number) => {
    if (pomodoros === 0) return "No sessions";
    if (pomodoros <= 2) return "Light activity";
    if (pomodoros <= 4) return "Moderate activity";
    if (pomodoros <= 6) return "High activity";
    if (pomodoros <= 8) return "Very high activity";
    return "Extreme activity";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Removed unused getDayLabel helper

  return (
    <div className={`${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Learning Activity Heatmap</h3>
        <p className="text-sm text-surface-muted mb-4">
          Daily Pomodoro sessions over the past 6 months. Darker green = more sessions.
        </p>
      </div>
      
      {/* Day labels */}
      <div className="flex gap-1 mb-2 ml-8">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={day} className="w-3 text-center text-xs text-surface-muted">
            {day}
          </div>
        ))}
      </div>
      
      <div className="flex gap-1 overflow-x-auto pb-4">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {/* Week label */}
            <div className="h-3 text-xs text-surface-muted text-center mb-1">
              {new Date(week[0].date).getMonth() === 0 ? 
                new Date(week[0].date).getFullYear() : 
                new Date(week[0].date).toLocaleDateString('en-US', { month: 'short' })
              }
            </div>
            
            {week.map((day, dayIndex) => (
              <div
                key={day.date}
                className={`w-3 h-3 rounded-sm cursor-pointer transition-all duration-300 hover:scale-125 hover:ring-2 hover:ring-brand-400 ${getIntensityColor(day.totalPomodoros)}`}
                onMouseEnter={() => setHoveredDay({ date: day.date, stats: day })}
                onMouseLeave={() => setHoveredDay(null)}
                title={`${formatDate(day.date)}: ${day.totalPomodoros} Pomodoros (${day.totalHours}h)`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Enhanced Legend */}
      <div className="flex items-center justify-between text-xs text-surface-muted mb-4">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-gray-100 dark:bg-gray-800 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-200 dark:bg-green-900 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-400 dark:bg-green-700 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-600 dark:bg-green-500 rounded-sm"></div>
        </div>
        <span>More</span>
      </div>

      {/* Enhanced Tooltip */}
      {hoveredDay && (
        <div className="mt-4 p-4 bg-surface-dark border border-surface rounded-lg shadow-lg">
          <div className="text-sm">
            <div className="font-semibold text-foreground mb-2">{formatDate(hoveredDay.date)}</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-sm ${getIntensityColor(hoveredDay.stats.totalPomodoros)}`}></div>
                <span className="text-surface-secondary">
                  {hoveredDay.stats.totalPomodoros} Pomodoro sessions
                </span>
              </div>
              <div className="text-surface-secondary">
                {hoveredDay.stats.totalHours} hours of focused learning
              </div>
              <div className="text-surface-secondary">
                Focus score: {hoveredDay.stats.focusScore.toFixed(1)}/10
              </div>
              <div className="text-surface-secondary">
                Activity level: {getIntensityLabel(hoveredDay.stats.totalPomodoros)}
              </div>
              {hoveredDay.stats.topics.length > 0 && (
                <div className="text-surface-secondary mt-3 pt-3 border-t border-surface/50">
                  <div className="font-medium mb-1">Topics studied:</div>
                  <div className="text-xs space-y-1">
                    {hoveredDay.stats.topics.slice(0, 3).map((topic, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-brand-400 rounded-full"></div>
                        <span>{topic}</span>
                      </div>
                    ))}
                    {hoveredDay.stats.topics.length > 3 && (
                      <div className="text-surface-muted italic">
                        +{hoveredDay.stats.topics.length - 3} more topics
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 p-4 bg-surface-dark rounded-lg border border-surface">
        <h4 className="text-sm font-semibold text-foreground mb-3">Activity Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-surface-muted">Most Active Day</div>
            <div className="font-medium text-foreground">
              {(() => {
                const mostActive = data.reduce((max, day) => 
                  day.totalPomodoros > max.totalPomodoros ? day : max
                );
                return formatDate(mostActive.date);
              })()}
            </div>
          </div>
          <div>
            <div className="text-surface-muted">Average Daily</div>
            <div className="font-medium text-foreground">
              {(data.reduce((sum, day) => sum + day.totalPomodoros, 0) / data.length).toFixed(1)} sessions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

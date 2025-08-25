"use client";

import { DailyStats, WeeklyStats, overallStats } from "@/utils/pomodoroData";
import { TrendingUp, Clock, Target, Zap, Calendar, BarChart3, Activity, Award } from "lucide-react";
import { useState } from "react";

interface ProductivityInsightsProps {
  dailyStats: DailyStats[];
  weeklyStats: WeeklyStats[];
  className?: string;
}

export default function ProductivityInsights({ dailyStats, weeklyStats, className = "" }: ProductivityInsightsProps) {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  
  // Calculate additional insights
  const totalDays = dailyStats.length;
  const activeDays = dailyStats.filter(day => day.totalPomodoros > 0).length;
  const consistencyRate = (activeDays / totalDays) * 100;
  
  const averageWeeklyPomodoros = weeklyStats.reduce((sum, week) => sum + week.totalPomodoros, 0) / weeklyStats.length;
  const bestWeek = weeklyStats.reduce((max, week) => week.totalPomodoros > max.totalPomodoros ? week : max);
  
  const focusTrend = dailyStats.slice(-30).reduce((sum, day) => sum + day.focusScore, 0) / 30;
  const focusImprovement = focusTrend - overallStats.averageFocusScore;

  // Calculate productivity patterns
  const weekdayAverages = [0, 0, 0, 0, 0, 0, 0]; // Sun-Sat
  dailyStats.forEach(day => {
    const dayOfWeek = new Date(day.date).getDay();
    weekdayAverages[dayOfWeek] += day.totalPomodoros;
  });
  weekdayAverages.forEach((_, index) => {
    weekdayAverages[index] = weekdayAverages[index] / Math.ceil(totalDays / 7);
  });

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'sessions': return 'text-blue-400';
      case 'hours': return 'text-green-400';
      case 'consistency': return 'text-purple-400';
      case 'focus': return 'text-yellow-400';
      case 'bestWeek': return 'text-red-400';
      case 'weeklyAvg': return 'text-indigo-400';
      default: return 'text-foreground';
    }
  };

  const getMetricBgColor = (metric: string) => {
    switch (metric) {
      case 'sessions': return 'bg-blue-600/20';
      case 'hours': return 'bg-green-600/20';
      case 'consistency': return 'bg-purple-600/20';
      case 'focus': return 'bg-yellow-600/20';
      case 'bestWeek': return 'bg-red-600/20';
      case 'weeklyAvg': return 'bg-indigo-600/20';
      default: return 'bg-surface-muted';
    }
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'sessions': return Target;
      case 'hours': return Clock;
      case 'consistency': return TrendingUp;
      case 'focus': return Zap;
      case 'bestWeek': return Calendar;
      case 'weeklyAvg': return BarChart3;
      default: return Activity;
    }
  };

  return (
    <div className={`${className}`}>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-foreground mb-3">Productivity Insights</h3>
        <p className="text-lg text-surface-muted max-w-3xl">
          Key metrics and trends from your Pomodoro learning sessions, revealing patterns and optimization opportunities.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Sessions */}
        <div 
          className={`bg-surface-dark rounded-lg p-6 border border-surface transition-all duration-300 hover:scale-105 hover:shadow-lg ${
            hoveredMetric === 'sessions' ? 'ring-2 ring-blue-400/50' : ''
          }`}
          onMouseEnter={() => setHoveredMetric('sessions')}
          onMouseLeave={() => setHoveredMetric(null)}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getMetricBgColor('sessions')}`}>
              <Target className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{overallStats.totalPomodoros.toLocaleString()}</div>
              <div className="text-sm text-surface-muted">Total Sessions</div>
            </div>
          </div>
          <div className="text-sm text-surface-secondary">
            {overallStats.averageDailyPomodoros.toFixed(1)} sessions/day average
          </div>
        </div>

        {/* Total Hours */}
        <div 
          className={`bg-surface-dark rounded-lg p-6 border border-surface transition-all duration-300 hover:scale-105 hover:shadow-lg ${
            hoveredMetric === 'hours' ? 'ring-2 ring-green-400/50' : ''
          }`}
          onMouseEnter={() => setHoveredMetric('hours')}
          onMouseLeave={() => setHoveredMetric(null)}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getMetricBgColor('hours')}`}>
              <Clock className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{overallStats.totalHours.toLocaleString()}</div>
              <div className="text-sm text-surface-muted">Total Hours</div>
            </div>
          </div>
          <div className="text-sm text-surface-secondary">
            {(overallStats.totalHours / 24).toFixed(1)} days of focused learning
          </div>
        </div>

        {/* Consistency Rate */}
        <div 
          className={`bg-surface-dark rounded-lg p-6 border border-surface transition-all duration-300 hover:scale-105 hover:shadow-lg ${
            hoveredMetric === 'consistency' ? 'ring-2 ring-purple-400/50' : ''
          }`}
          onMouseEnter={() => setHoveredMetric('consistency')}
          onMouseLeave={() => setHoveredMetric(null)}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getMetricBgColor('consistency')}`}>
              <TrendingUp className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{consistencyRate.toFixed(1)}%</div>
              <div className="text-sm text-surface-muted">Consistency</div>
            </div>
          </div>
          <div className="text-sm text-surface-secondary">
            {activeDays} active days out of {totalDays}
          </div>
        </div>

        {/* Average Focus Score */}
        <div 
          className={`bg-surface-dark rounded-lg p-6 border border-surface transition-all duration-300 hover:scale-105 hover:shadow-lg ${
            hoveredMetric === 'focus' ? 'ring-2 ring-yellow-400/50' : ''
          }`}
          onMouseEnter={() => setHoveredMetric('focus')}
          onMouseLeave={() => setHoveredMetric(null)}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getMetricBgColor('focus')}`}>
              <Zap className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{overallStats.averageFocusScore.toFixed(1)}</div>
              <div className="text-sm text-surface-muted">Focus Score</div>
            </div>
          </div>
          <div className="text-sm text-surface-secondary">
            {focusImprovement > 0 ? '+' : ''}{focusImprovement.toFixed(1)} vs. overall average
          </div>
        </div>

        {/* Best Week */}
        <div 
          className={`bg-surface-dark rounded-lg p-6 border border-surface transition-all duration-300 hover:scale-105 hover:shadow-lg ${
            hoveredMetric === 'bestWeek' ? 'ring-2 ring-red-400/50' : ''
          }`}
          onMouseEnter={() => setHoveredMetric('bestWeek')}
          onMouseLeave={() => setHoveredMetric(null)}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getMetricBgColor('bestWeek')}`}>
              <Calendar className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{bestWeek.totalPomodoros}</div>
              <div className="text-sm text-surface-muted">Best Week</div>
            </div>
          </div>
          <div className="text-sm text-surface-secondary">
            Week of {new Date(bestWeek.week).toLocaleDateString()}
          </div>
        </div>

        {/* Weekly Average */}
        <div 
          className={`bg-surface-dark rounded-lg p-6 border border-surface transition-all duration-300 hover:scale-105 hover:shadow-lg ${
            hoveredMetric === 'weeklyAvg' ? 'ring-2 ring-indigo-400/50' : ''
          }`}
          onMouseEnter={() => setHoveredMetric('weeklyAvg')}
          onMouseLeave={() => setHoveredMetric(null)}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getMetricBgColor('weeklyAvg')}`}>
              <BarChart3 className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{averageWeeklyPomodoros.toFixed(0)}</div>
              <div className="text-sm text-surface-muted">Weekly Average</div>
            </div>
          </div>
          <div className="text-sm text-surface-secondary">
            {weeklyStats.length} weeks tracked
          </div>
        </div>
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Trends */}
        <div className="bg-surface-dark rounded-lg p-6 border border-surface">
          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-brand-400" />
            Recent Trends (Last 30 Days)
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-surface rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                {dailyStats.slice(-30).reduce((sum, day) => sum + day.totalPomodoros, 0)}
              </div>
              <div className="text-sm text-surface-muted">Sessions</div>
            </div>
            <div className="text-center p-4 bg-surface rounded-lg">
              <div className="text-2xl font-bold text-green-400">
                {dailyStats.slice(-30).reduce((sum, day) => sum + day.totalHours, 0).toFixed(1)}
              </div>
              <div className="text-sm text-surface-muted">Hours</div>
            </div>
            <div className="text-center p-4 bg-surface rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">
                {focusTrend.toFixed(1)}
              </div>
              <div className="text-sm text-surface-muted">Avg Focus</div>
            </div>
          </div>
        </div>

        {/* Weekly Pattern */}
        <div className="bg-surface-dark rounded-lg p-6 border border-surface">
          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-brand-400" />
            Weekly Learning Pattern
          </h4>
          <div className="space-y-3">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={day} className="flex items-center gap-3">
                <div className="w-12 text-sm text-surface-muted">{day}</div>
                <div className="flex-1 bg-surface rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-3 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(weekdayAverages[index] / Math.max(...weekdayAverages)) * 100}%`
                    }}
                  ></div>
                </div>
                <div className="w-16 text-right text-sm font-medium text-foreground">
                  {weekdayAverages[index].toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Badge */}
      <div className="bg-gradient-to-r from-brand-600/20 to-purple-600/20 rounded-lg border border-brand-600/30 p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Award className="h-8 w-8 text-brand-400" />
          <h4 className="text-xl font-semibold text-foreground">Learning Achievement</h4>
        </div>
        <p className="text-surface-secondary mb-4">
          You&apos;ve maintained an impressive {consistencyRate.toFixed(1)}% consistency rate over {totalDays} days, 
          completing {overallStats.totalPomodoros} focused learning sessions.
        </p>
        <div className="flex justify-center gap-6 text-sm">
          <div>
            <div className="text-2xl font-bold text-brand-400">{consistencyRate.toFixed(0)}%</div>
            <div className="text-surface-muted">Consistency</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">{overallStats.totalHours.toFixed(0)}h</div>
            <div className="text-surface-muted">Total Learning</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">{overallStats.averageFocusScore.toFixed(1)}</div>
            <div className="text-surface-muted">Avg Focus</div>
          </div>
        </div>
      </div>
    </div>
  );
}

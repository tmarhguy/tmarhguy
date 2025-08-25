export interface PomodoroSession {
  id: string;
  date: string;
  topic: string;
  duration: number; // in minutes
  completed: boolean;
  focusScore: number; // 1-10
  notes?: string;
}

export interface LearningTopic {
  name: string;
  category: string;
  totalPomodoros: number;
  totalHours: number;
  proficiency: number; // 1-100
  lastStudied: string;
  color: string;
}

export interface DailyStats {
  date: string;
  totalPomodoros: number;
  totalHours: number;
  focusScore: number;
  topics: string[];
}

export interface WeeklyStats {
  week: string;
  totalPomodoros: number;
  totalHours: number;
  averageFocusScore: number;
  mostProductiveDay: string;
  topTopics: string[];
}

// Realistic learning data for the past 6 months
export const learningTopics: LearningTopic[] = [
  {
    name: "CPU Architecture",
    category: "Hardware Design",
    totalPomodoros: 156,
    totalHours: 78,
    proficiency: 85,
    lastStudied: "2024-01-15",
    color: "#3B82F6"
  },
  {
    name: "Memory Systems",
    category: "Hardware Design",
    totalPomodoros: 142,
    totalHours: 71,
    proficiency: 82,
    lastStudied: "2024-01-14",
    color: "#8B5CF6"
  },
  {
    name: "Digital Logic Design",
    category: "Hardware Design",
    totalPomodoros: 198,
    totalHours: 99,
    proficiency: 90,
    lastStudied: "2024-01-15",
    color: "#10B981"
  },
  {
    name: "Transistor Circuits",
    category: "Hardware Design",
    totalPomodoros: 234,
    totalHours: 117,
    proficiency: 88,
    lastStudied: "2024-01-15",
    color: "#F59E0B"
  },
  {
    name: "Arduino Programming",
    category: "Software Development",
    totalPomodoros: 89,
    totalHours: 44.5,
    proficiency: 75,
    lastStudied: "2024-01-12",
    color: "#EF4444"
  },
  {
    name: "PCB Design",
    category: "Hardware Design",
    totalPomodoros: 67,
    totalHours: 33.5,
    proficiency: 70,
    lastStudied: "2024-01-10",
    color: "#06B6D4"
  },
  {
    name: "Mathematics",
    category: "Academic",
    totalPomodoros: 312,
    totalHours: 156,
    proficiency: 95,
    lastStudied: "2024-01-15",
    color: "#84CC16"
  },
  {
    name: "Physics",
    category: "Academic",
    totalPomodoros: 245,
    totalHours: 122.5,
    proficiency: 88,
    lastStudied: "2024-01-15",
    color: "#F97316"
  }
];

// Generate daily stats for the past 6 months
export const generateDailyStats = (): DailyStats[] => {
  const stats: DailyStats[] = [];
  const startDate = new Date('2023-07-01');
  const endDate = new Date('2024-01-15');
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay();
    
    // Skip weekends (Saturday = 6, Sunday = 0)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Weekend: fewer sessions
      const weekendPomodoros = Math.floor(Math.random() * 4) + 1;
      stats.push({
        date: dateStr,
        totalPomodoros: weekendPomodoros,
        totalHours: weekendPomodoros * 0.5,
        focusScore: 7 + Math.random() * 2,
        topics: learningTopics
          .sort(() => Math.random() - 0.5)
          .slice(0, weekendPomodoros)
          .map(t => t.name)
      });
    } else {
      // Weekday: more sessions
      const weekdayPomodoros = Math.floor(Math.random() * 6) + 4;
      stats.push({
        date: dateStr,
        totalPomodoros: weekdayPomodoros,
        totalHours: weekdayPomodoros * 0.5,
        focusScore: 8 + Math.random() * 2,
        topics: learningTopics
          .sort(() => Math.random() - 0.5)
          .slice(0, weekdayPomodoros)
          .map(t => t.name)
      });
    }
  }
  
  return stats;
};

export const dailyStats = generateDailyStats();

// Generate weekly stats
export const generateWeeklyStats = (): WeeklyStats[] => {
  const weeklyStats: WeeklyStats[] = [];
  const weeks = [];
  
  for (let i = 0; i < dailyStats.length; i += 7) {
    const weekData = dailyStats.slice(i, i + 7);
    if (weekData.length === 7) {
      const totalPomodoros = weekData.reduce((sum, day) => sum + day.totalPomodoros, 0);
      const totalHours = weekData.reduce((sum, day) => sum + day.totalHours, 0);
      const averageFocusScore = weekData.reduce((sum, day) => sum + day.focusScore, 0) / 7;
      
      const mostProductiveDay = weekData.reduce((max, day) => 
        day.totalPomodoros > max.totalPomodoros ? day : max
      );
      
      const topicCounts: { [key: string]: number } = {};
      weekData.forEach(day => {
        day.topics.forEach(topic => {
          topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        });
      });
      
      const topTopics = Object.entries(topicCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([topic]) => topic);
      
      weeklyStats.push({
        week: weekData[0].date,
        totalPomodoros,
        totalHours,
        averageFocusScore,
        mostProductiveDay: mostProductiveDay.date,
        topTopics
      });
    }
  }
  
  return weeklyStats;
};

export const weeklyStats = generateWeeklyStats();

// Calculate overall statistics
export const overallStats = {
  totalPomodoros: dailyStats.reduce((sum, day) => sum + day.totalPomodoros, 0),
  totalHours: dailyStats.reduce((sum, day) => sum + day.totalHours, 0),
  averageDailyPomodoros: dailyStats.reduce((sum, day) => sum + day.totalPomodoros, 0) / dailyStats.length,
  averageFocusScore: dailyStats.reduce((sum, day) => sum + day.focusScore, 0) / dailyStats.length,
  totalDays: dailyStats.length,
  mostProductiveDay: dailyStats.reduce((max, day) => 
    day.totalPomodoros > max.totalPomodoros ? day : max
  ),
  topTopic: learningTopics.reduce((max, topic) => 
    topic.totalPomodoros > max.totalPomodoros ? topic : max
  )
};

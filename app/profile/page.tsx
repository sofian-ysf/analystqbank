"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
}

interface StudyStreak {
  current: number;
  longest: number;
  lastStudyDate: string;
}

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // Mock data - in a real app, this would come from the database
  const [stats] = useState({
    questionsAnswered: 347,
    correctAnswers: 298,
    accuracy: 86,
    studyHours: 42,
    topicsCompleted: 5,
    mockExamsTaken: 3,
    averageScore: 78
  });

  const [studyStreak] = useState<StudyStreak>({
    current: 7,
    longest: 14,
    lastStudyDate: "2024-01-20"
  });

  const [achievements] = useState<Achievement[]>([
    {
      id: "first-question",
      title: "First Steps",
      description: "Answered your first practice question",
      icon: "🎯",
      unlocked: true,
      unlockedDate: "2024-01-15"
    },
    {
      id: "week-streak",
      title: "Week Warrior",
      description: "Maintained a 7-day study streak",
      icon: "🔥",
      unlocked: true,
      unlockedDate: "2024-01-20"
    },
    {
      id: "accuracy-80",
      title: "Sharp Shooter",
      description: "Achieved 80% accuracy rate",
      icon: "🏹",
      unlocked: true,
      unlockedDate: "2024-01-18"
    },
    {
      id: "hundred-questions",
      title: "Century Mark",
      description: "Answered 100 practice questions",
      icon: "💯",
      unlocked: true,
      unlockedDate: "2024-01-17"
    },
    {
      id: "topic-master",
      title: "Topic Master",
      description: "Complete all questions in a topic area",
      icon: "👑",
      unlocked: false
    },
    {
      id: "mock-exam",
      title: "Mock Master",
      description: "Score 85%+ on a mock exam",
      icon: "🎓",
      unlocked: false
    },
    {
      id: "month-streak",
      title: "Monthly Marathon",
      description: "Maintain a 30-day study streak",
      icon: "🏃‍♂️",
      unlocked: false
    },
    {
      id: "perfect-score",
      title: "Perfectionist",
      description: "Get 100% on a practice session",
      icon: "⭐",
      unlocked: false
    }
  ]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        setLoading(false);
      }
    };
    checkUser();
  }, [router, supabase]);

  const getJoinedDate = () => {
    if (!user?.created_at) return "Unknown";
    return new Date(user.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-xl font-bold text-gray-900">
                Finance Exam Prep
              </Link>
              <nav className="ml-10 flex space-x-8">
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/question-bank" className="text-gray-600 hover:text-gray-900">
                  Question Bank
                </Link>
                <Link href="/research-hubs" className="text-gray-600 hover:text-gray-900">
                  Research Hubs
                </Link>
                <Link href="/mock-exams" className="text-gray-600 hover:text-gray-900">
                  Mock Exams
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/settings" className="text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
                Settings
              </Link>
              <span className="text-sm text-gray-600">{user?.email}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user?.user_metadata?.full_name ?
                user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase() :
                (user?.email?.[0] || 'U').toUpperCase()
              }
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user?.user_metadata?.full_name || 'CFA Candidate'}
              </h1>
              <p className="text-gray-600 mb-2">{user?.email}</p>
              <p className="text-sm text-gray-500">Member since {getJoinedDate()}</p>
            </div>
            <div className="text-right">
              <div className="bg-orange-100 px-4 py-2 rounded-lg">
                <p className="text-orange-800 font-semibold text-lg">{studyStreak.current} Day Streak</p>
                <p className="text-orange-600 text-sm">Keep it up!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{stats.questionsAnswered}</p>
                  <p className="text-sm text-blue-800">Questions Answered</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{stats.accuracy}%</p>
                  <p className="text-sm text-green-800">Accuracy Rate</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{stats.studyHours}</p>
                  <p className="text-sm text-purple-800">Study Hours</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{stats.averageScore}%</p>
                  <p className="text-sm text-orange-800">Avg Mock Score</p>
                </div>
              </div>
            </div>

            {/* Study Streak */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Study Streaks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔥</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{studyStreak.current} Days</p>
                    <p className="text-gray-600">Current Streak</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{studyStreak.longest} Days</p>
                    <p className="text-gray-600">Longest Streak</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Completed Fixed Income practice session</p>
                    <p className="text-sm text-gray-600">Score: 85% • 2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Studied Ethics research materials</p>
                    <p className="text-sm text-gray-600">1 hour • Yesterday</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Took Mock Exam #3</p>
                    <p className="text-sm text-gray-600">Score: 78% • 2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements</h3>

              {/* Unlocked Achievements */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Unlocked ({unlockedAchievements.length})</h4>
                <div className="space-y-3">
                  {unlockedAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-green-900">{achievement.title}</p>
                        <p className="text-sm text-green-700">{achievement.description}</p>
                        {achievement.unlockedDate && (
                          <p className="text-xs text-green-600 mt-1">
                            Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locked Achievements */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Locked ({lockedAchievements.length})</h4>
                <div className="space-y-3">
                  {lockedAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200 opacity-75">
                      <span className="text-2xl grayscale">{achievement.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-700">{achievement.title}</p>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Topics Completed</span>
                  <span className="font-bold text-gray-900">{stats.topicsCompleted}/8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Mock Exams Taken</span>
                  <span className="font-bold text-gray-900">{stats.mockExamsTaken}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Correct Answers</span>
                  <span className="font-bold text-gray-900">{stats.correctAnswers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Study Sessions</span>
                  <span className="font-bold text-gray-900">28</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CaretDown,
  Calendar,
  DotsThree,
  Books,
  Exam,
  Cards,
} from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { cfaLevel1Curriculum } from "@/lib/curriculum";
import Sidebar from "@/components/dashboard/Sidebar";
import SearchDropdown from "@/components/dashboard/SearchDropdown";
import TopicLeaderboard from "@/components/dashboard/TopicLeaderboard";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import TopicAffinityRadar from "@/components/dashboard/TopicAffinityRadar";

// Mapping from curriculum topic ID to database topic_area name
const topicIdToDbName: { [key: string]: string } = {
  "ethical-professional-standards": "Ethical and Professional Standards",
  "quantitative-methods": "Quantitative Methods",
  "economics": "Economics",
  "financial-statement-analysis": "Financial Statement Analysis",
  "corporate-issuers": "Corporate Issuers",
  "equity-investments": "Equity Investments",
  "fixed-income": "Fixed Income",
  "derivatives": "Derivatives",
  "alternative-investments": "Alternative Investments",
  "portfolio-management": "Portfolio Management",
};

interface TopicStats {
  [topicId: string]: {
    totalQuestions: number;
    attemptedQuestions: number;
    correctAnswers: number;
  };
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [studyHours, setStudyHours] = useState(0);
  const [dayStreak, setDayStreak] = useState(0);
  const [topicStats, setTopicStats] = useState<TopicStats>({});
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [examDate, setExamDate] = useState<string | null>(null);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [weeklyData, setWeeklyData] = useState<{ day: string; questions: number; accuracy: number }[]>([]);
  const supabase = createClient();

  const fetchUserStats = useCallback(async (userId: string) => {
    try {
      // Fetch total question counts per topic
      const questionCountByTopic: { [key: string]: number } = {};
      let totalQs = 0;

      const countPromises = Object.values(topicIdToDbName).map(async (topicName) => {
        const { count, error } = await supabase
          .from('questions')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true)
          .eq('topic_area', topicName);

        if (!error && count !== null) {
          questionCountByTopic[topicName] = count;
          totalQs += count;
        }
      });

      await Promise.all(countPromises);
      setTotalQuestions(totalQs);

      // Fetch user's attempted questions
      const attemptedByTopic: { [key: string]: Set<string> } = {};
      const correctByTopic: { [key: string]: number } = {};
      let allAttemptedCount = 0;
      let allCorrectCount = 0;

      try {
        let allAttempts: { question_id: string; is_correct: boolean; topic_area: string; attempted_at: string }[] = [];
        let page = 0;
        const pageSize = 1000;
        let hasMore = true;

        while (hasMore) {
          const { data: attempts, error: attemptsError } = await supabase
            .from('user_question_attempts')
            .select('question_id, is_correct, topic_area, attempted_at')
            .eq('user_id', userId)
            .range(page * pageSize, (page + 1) * pageSize - 1);

          if (attemptsError) {
            console.log('Note: Could not fetch user attempts');
            break;
          }

          if (attempts && attempts.length > 0) {
            allAttempts = [...allAttempts, ...attempts];
            hasMore = attempts.length === pageSize;
            page++;
          } else {
            hasMore = false;
          }
        }

        // Count unique questions attempted per topic
        const uniqueQuestions = new Set<string>();
        allAttempts.forEach((attempt) => {
          const topicArea = attempt.topic_area;
          if (topicArea) {
            if (!attemptedByTopic[topicArea]) {
              attemptedByTopic[topicArea] = new Set();
            }
            attemptedByTopic[topicArea].add(attempt.question_id);
            uniqueQuestions.add(attempt.question_id);

            if (attempt.is_correct) {
              correctByTopic[topicArea] = (correctByTopic[topicArea] || 0) + 1;
              allCorrectCount++;
            }
          }
        });

        allAttemptedCount = uniqueQuestions.size;

        // Build weekly performance data (cumulative by date)
        // Group attempts by date
        const attemptsByDate: { [date: string]: { total: number; correct: number } } = {};
        allAttempts.forEach((attempt) => {
          if (attempt.attempted_at) {
            const date = new Date(attempt.attempted_at).toISOString().split('T')[0];
            if (!attemptsByDate[date]) {
              attemptsByDate[date] = { total: 0, correct: 0 };
            }
            attemptsByDate[date].total++;
            if (attempt.is_correct) {
              attemptsByDate[date].correct++;
            }
          }
        });

        // Sort dates and build cumulative data
        const sortedDates = Object.keys(attemptsByDate).sort();
        let cumulativeQuestions = 0;
        let cumulativeCorrect = 0;
        const weeklyDataPoints = sortedDates.slice(-30).map((date) => {
          cumulativeQuestions += attemptsByDate[date].total;
          cumulativeCorrect += attemptsByDate[date].correct;
          const accuracy = cumulativeQuestions > 0 ? Math.round((cumulativeCorrect / cumulativeQuestions) * 100) : 0;
          return {
            day: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            questions: cumulativeQuestions,
            accuracy,
          };
        });

        setWeeklyData(weeklyDataPoints);
      } catch {
        console.log('Note: User attempts data not available');
      }

      setTotalAttempted(allAttemptedCount);
      setTotalCorrect(allCorrectCount);

      // Build topic stats
      const stats: TopicStats = {};
      Object.entries(topicIdToDbName).forEach(([topicId, dbName]) => {
        stats[topicId] = {
          totalQuestions: questionCountByTopic[dbName] || 0,
          attemptedQuestions: attemptedByTopic[dbName]?.size || 0,
          correctAnswers: correctByTopic[dbName] || 0,
        };
      });
      setTopicStats(stats);

      // Fetch study hours from practice sessions
      try {
        const { data: sessions } = await supabase
          .from('practice_sessions')
          .select('created_at, completed_at')
          .eq('user_id', userId);

        // Also fetch mock exam times
        const { data: mockExams } = await supabase
          .from('mock_exams')
          .select('time_taken_seconds')
          .eq('user_id', userId);

        let totalSeconds = 0;

        // Estimate time from sessions (roughly 1 minute per question attempted)
        if (sessions) {
          sessions.forEach(session => {
            totalSeconds += 30 * 60; // Assume 30 mins per session as fallback
          });
        }

        // Add mock exam times
        if (mockExams) {
          mockExams.forEach(exam => {
            if (exam.time_taken_seconds) {
              totalSeconds += exam.time_taken_seconds;
            }
          });
        }

        setStudyHours(Math.round(totalSeconds / 3600));
      } catch {
        console.log('Note: Could not fetch study time data');
      }

      // Calculate day streak
      try {
        const { data: recentAttempts } = await supabase
          .from('user_question_attempts')
          .select('attempted_at')
          .eq('user_id', userId)
          .order('attempted_at', { ascending: false })
          .limit(1000);

        if (recentAttempts && recentAttempts.length > 0) {
          const uniqueDates = new Set<string>();
          recentAttempts.forEach(attempt => {
            if (attempt.attempted_at) {
              const date = new Date(attempt.attempted_at).toISOString().split('T')[0];
              uniqueDates.add(date);
            }
          });

          const sortedDates = Array.from(uniqueDates).sort().reverse();

          let streak = 0;
          const today = new Date().toISOString().split('T')[0];
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

          if (sortedDates[0] === today || sortedDates[0] === yesterday) {
            let checkDate = sortedDates[0] === today ? new Date() : new Date(Date.now() - 86400000);

            for (const dateStr of sortedDates) {
              const expectedDate = checkDate.toISOString().split('T')[0];
              if (dateStr === expectedDate) {
                streak++;
                checkDate = new Date(checkDate.getTime() - 86400000);
              } else if (dateStr < expectedDate) {
                break;
              }
            }
          }

          setDayStreak(streak);
        }
      } catch {
        console.log('Note: Could not calculate day streak');
      }

      // Fetch exam date from user profile
      try {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('exam_date')
          .eq('id', userId)
          .single();

        if (profile?.exam_date) {
          setExamDate(profile.exam_date);
        }
      } catch {
        console.log('Note: Could not fetch exam date');
      }

    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  }, [supabase]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        await fetchUserStats(user.id);
        setLoading(false);
      }
    };

    checkUser();
  }, [router, supabase, fetchUserStats]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  
  const getAccuracyRate = () => {
    if (totalAttempted === 0) return 0;
    return Math.round((totalCorrect / totalAttempted) * 100);
  };

  const getDaysUntilExam = () => {
    if (!examDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exam = new Date(examDate);
    const diffTime = exam.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatStudyTime = () => {
    if (studyHours === 0) return "0h";
    if (studyHours < 1) return "< 1h";
    if (studyHours >= 24) {
      const days = Math.floor(studyHours / 24);
      const hours = studyHours % 24;
      return `${days}d ${hours}h`;
    }
    return `${studyHours}h`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1FB8CD] mx-auto"></div>
          <p className="mt-4 text-[#5f6368]">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#F8F9FA] flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar user={user!} onSignOut={handleSignOut} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Header - Fixed */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200 flex-shrink-0">
          <div className="px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Page Title - hidden on mobile */}
              <h1 className="hidden lg:block text-xl font-semibold text-gray-900">Dashboard</h1>

              {/* Search Bar */}
              <SearchDropdown className="flex-1 max-w-md hidden md:block" />

              {/* Right Side Actions */}
              <div className="flex items-center gap-3">
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1FB8CD] flex items-center justify-center text-white font-semibold text-sm">
                      {user?.email?.[0]?.toUpperCase() || "U"}
                    </div>
                    <CaretDown size={16} className="text-gray-400 hidden sm:block" />
                  </button>
                  {isUserMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                        <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          Settings
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {/* Campaign Meta Card (Study Session Card) */}
          <div className="mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* CFA Badge */}
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                    <span className="text-gray-900 font-semibold text-lg">CFA</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Level 1 Exam Prep</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Active
                      </span>
                      {examDate && (
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                          <Calendar size={14} />
                          {new Date(examDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Exam Countdown */}
                {(() => {
                  const daysUntil = getDaysUntilExam();
                  if (daysUntil !== null) {
                    return (
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className={`text-3xl font-semibold ${daysUntil <= 30 ? 'text-red-600' : 'text-gray-900'}`}>
                            {daysUntil > 0 ? daysUntil : "Today!"}
                          </p>
                          <p className="text-xs text-gray-500">Days Until Exam</p>
                        </div>
                        <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                          <DotsThree size={24} weight="bold" />
                        </button>
                      </div>
                    );
                  }
                  return (
                    <Link
                      href="/settings"
                      className="text-sm text-[#1FB8CD] hover:text-[#1A6872] font-medium"
                    >
                      Set exam date →
                    </Link>
                  );
                })()}
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Overall Progress</span>
                  <span className="font-medium text-gray-900">
                    {totalAttempted} / {totalQuestions} questions
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-[#1FB8CD] to-[#10B981] h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${totalQuestions > 0 ? Math.min((totalAttempted / totalQuestions) * 100, 100) : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          
          {/* Analytics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Topic Leaderboard */}
            <div className="lg:col-span-1">
              <TopicLeaderboard topicStats={topicStats} />
            </div>

            {/* Performance Chart */}
            <div className="lg:col-span-1">
              <PerformanceChart weeklyData={weeklyData} />
            </div>

            {/* Topic Affinity Radar */}
            <div className="lg:col-span-1">
              <TopicAffinityRadar topicStats={topicStats} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/flashcards"
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#1FB8CD]/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <Cards size={24} className="text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Free Flashcards</h3>
                  <p className="text-sm text-gray-500">Review key concepts</p>
                </div>
              </div>
            </Link>

            <Link
              href="/question-bank"
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#1FB8CD]/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Books size={24} className="text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Practice Questions</h3>
                  <p className="text-sm text-gray-500">{totalQuestions - totalAttempted} remaining</p>
                </div>
              </div>
            </Link>

            <Link
              href="/practice/mock-exam"
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#1FB8CD]/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                  <Exam size={24} className="text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Mock Exam</h3>
                  <p className="text-sm text-gray-500">Test your knowledge</p>
                </div>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
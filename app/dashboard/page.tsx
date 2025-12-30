"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { cfaLevel1Curriculum } from "@/lib/curriculum";

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
        let allAttempts: { question_id: string; is_correct: boolean; topic_area: string }[] = [];
        let page = 0;
        const pageSize = 1000;
        let hasMore = true;

        while (hasMore) {
          const { data: attempts, error: attemptsError } = await supabase
            .from('user_question_attempts')
            .select('question_id, is_correct, topic_area')
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
            // Rough estimate: count each session
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
          // Get unique dates
          const uniqueDates = new Set<string>();
          recentAttempts.forEach(attempt => {
            if (attempt.attempted_at) {
              const date = new Date(attempt.attempted_at).toISOString().split('T')[0];
              uniqueDates.add(date);
            }
          });

          // Sort dates descending
          const sortedDates = Array.from(uniqueDates).sort().reverse();

          // Count consecutive days from today
          let streak = 0;
          const today = new Date().toISOString().split('T')[0];
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

          // Check if the most recent activity is today or yesterday
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

  const getTopicProgress = (topicId: string) => {
    const stats = topicStats[topicId];
    if (!stats || stats.totalQuestions === 0) return 0;
    return Math.round((stats.attemptedQuestions / stats.totalQuestions) * 100);
  };

  const getTopicAccuracy = (topicId: string) => {
    const stats = topicStats[topicId];
    if (!stats || stats.attemptedQuestions === 0) return null;
    return Math.round((stats.correctAnswers / stats.attemptedQuestions) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1FB8CD] mx-auto"></div>
          <p className="mt-4 text-[#5f6368]">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFAF4]">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard">
              <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-[#13343B] font-medium transition-colors">
                Dashboard
              </Link>
              <Link href="/question-bank" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Practice
              </Link>
            </div>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative group">
                <button className="flex items-center space-x-2 text-[#5f6368] hover:text-[#13343B] transition-colors">
                  <span className="text-sm">{user?.email}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#EAEEEF] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/settings" className="block px-4 py-2 text-sm text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]">
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg text-[#5f6368] hover:text-[#13343B] hover:bg-[#F3F3EE]" aria-label="Open menu">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl p-8 text-white">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}!
              </h1>
              <p className="text-gray-200">
                {totalAttempted > 0
                  ? `You've practiced ${totalAttempted} questions with ${getAccuracyRate()}% accuracy. Keep it up!`
                  : "Start your journey to exam success. Let's begin practicing!"}
              </p>
            </div>
            <div className="text-right hidden sm:block">
              {(() => {
                const daysUntilExam = getDaysUntilExam();
                if (daysUntilExam !== null) {
                  return (
                    <>
                      <p className="text-gray-200 text-sm">Days Until Exam</p>
                      <p className={`font-bold text-3xl ${daysUntilExam <= 30 ? 'text-yellow-300' : 'text-white'}`}>
                        {daysUntilExam > 0 ? daysUntilExam : daysUntilExam === 0 ? 'Today!' : 'Passed'}
                      </p>
                      <Link href="/settings" className="text-gray-300 text-xs hover:text-white underline">
                        {daysUntilExam > 0 ? 'CFA Level 1' : 'Update exam date'}
                      </Link>
                    </>
                  );
                }
                return (
                  <>
                    <p className="text-gray-200 text-sm">Exam Date</p>
                    <p className="text-white font-bold text-lg">Not Set</p>
                    <Link href="/settings" className="text-gray-300 text-xs hover:text-white underline">
                      Set exam date
                    </Link>
                  </>
                );
              })()}
            </div>
          </div>
          <div className="flex gap-4">
            <Link
              href="/question-bank"
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Start Practicing
            </Link>
            <Link
              href="/practice/mock-exam"
              className="bg-[#1FB8CD] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1A6872] transition-colors"
            >
              Take Mock Exam
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalAttempted.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">Questions Practiced</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{getAccuracyRate()}%</p>
            <p className="text-sm text-gray-600 mt-1">Accuracy Rate</p>
            {totalAttempted > 0 && (
              <p className="text-xs text-gray-500 mt-1">{totalCorrect} correct answers</p>
            )}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{studyHours}</p>
            <p className="text-sm text-gray-600 mt-1">Study Hours</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{dayStreak}</p>
            <p className="text-sm text-gray-600 mt-1">Day Streak</p>
            {dayStreak > 0 && (
              <p className="text-xs text-gray-500 mt-1">Keep it going!</p>
            )}
          </div>
        </div>
      </div>

      {/* Performance by Topic */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Performance by Topic</h3>
            <Link href="/question-bank" className="text-sm text-[#1FB8CD] hover:text-[#1A6872] font-medium">
              Practice Now →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cfaLevel1Curriculum.map((topic) => {
              const progress = getTopicProgress(topic.id);
              const accuracy = getTopicAccuracy(topic.id);
              const stats = topicStats[topic.id];

              return (
                <div key={topic.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 ${topic.color} rounded flex items-center justify-center text-white text-sm mr-3`}>
                        {topic.icon}
                      </div>
                      <div>
                        <span className="text-gray-900 font-medium text-sm">{topic.name}</span>
                        <p className="text-xs text-gray-500">{topic.examWeight}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {accuracy !== null ? (
                        <span className={`text-sm font-bold ${accuracy >= 70 ? 'text-green-600' : accuracy >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {accuracy}%
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Not started</span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className={`h-2 rounded-full ${topic.color}`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{stats?.attemptedQuestions || 0} / {stats?.totalQuestions || 0} questions</span>
                    {stats?.attemptedQuestions > 0 && (
                      <span>{stats.correctAnswers} correct</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

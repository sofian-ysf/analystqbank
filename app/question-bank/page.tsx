"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { cfaLevel1Curriculum } from "@/lib/curriculum";
import { useSubscription } from "@/hooks/useSubscription";
import { UpgradePrompt } from "@/components/UpgradePrompt";
import {
  CaretDown,
  Gear,
  SignOut,
  Plus,
  Minus,
  Check,
  Scales,
  ChartBar,
  Globe,
  ClipboardText,
  Buildings,
  ChartLineUp,
  Bank,
  ArrowsClockwise,
  Hammer,
  Briefcase,
  List,
  X,
} from "@phosphor-icons/react";
import Sidebar from "@/components/dashboard/Sidebar";
import SearchDropdown from "@/components/dashboard/SearchDropdown";

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

// Map topic IDs to icons
const topicIcons: { [key: string]: typeof Scales } = {
  "ethical-professional-standards": Scales,
  "quantitative-methods": ChartBar,
  "economics": Globe,
  "financial-statement-analysis": ClipboardText,
  "corporate-issuers": Buildings,
  "equity-investments": ChartLineUp,
  "fixed-income": Bank,
  "derivatives": ArrowsClockwise,
  "alternative-investments": Hammer,
  "portfolio-management": Briefcase,
};

interface QuestionStats {
  [topicId: string]: {
    totalQuestions: number;
    attemptedQuestions: number;
    correctAnswers: number;
  };
}

interface SubtopicStats {
  [subtopicKey: string]: {
    totalQuestions: number;
    attemptedQuestions: number;
    correctAnswers: number;
  };
}

export default function QuestionBank() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  const [questionStats, setQuestionStats] = useState<QuestionStats>({});
  const [subtopicStats, setSubtopicStats] = useState<SubtopicStats>({});
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);
  const [questionLimit, setQuestionLimit] = useState<number | "all">("all");
  const [questionFilter, setQuestionFilter] = useState<"all" | "wrong" | "correct" | "unanswered">("all");
  const [totalDbQuestions, setTotalDbQuestions] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const supabase = createClient();

  const {
    subscription,
    loading: subscriptionLoading,
    canAccessQuestions,
    plan,
  } = useSubscription();

  const handleStartPractice = (url: string) => {
    router.push(url);
  };

  const fetchQuestionStats = useCallback(async (userId: string) => {
    try {
      const questionCountByTopic: { [key: string]: number } = {};
      const questionCountBySubtopic: { [key: string]: number } = {};

      const userPlan = plan || '2month';
      const planLimits = { // Default limits for now
        "Ethical and Professional Standards": Infinity,
        "Quantitative Methods": Infinity,
        "Economics": Infinity,
        "Financial Statement Analysis": Infinity,
        "Corporate Issuers": Infinity,
        "Equity Investments": Infinity,
        "Fixed Income": Infinity,
        "Derivatives": Infinity,
        "Alternative Investments": Infinity,
        "Portfolio Management": Infinity,
      };

      const countPromises = Object.values(topicIdToDbName).map(async (topicName) => {
        const { count, error } = await supabase
          .from('questions')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true)
          .eq('topic_area', topicName);

        if (!error && count !== null) {
          questionCountByTopic[topicName] = count;
        }
      });

      await Promise.all(countPromises);

      // Fetch subtopic counts
      try {
        const { data: subtopicData } = await supabase
          .from('questions')
          .select('subtopic, topic_area')
          .eq('is_active', true)
          .not('subtopic', 'is', null);

        if (subtopicData) {
          subtopicData.forEach((q) => {
            if (q.subtopic && q.topic_area) {
              const key = `${q.topic_area}::${q.subtopic}`;
              questionCountBySubtopic[key] = (questionCountBySubtopic[key] || 0) + 1;
            }
          });
        }
      } catch {
        console.log('Note: Could not fetch subtopic counts');
      }

      // Fetch user attempts
      const attemptedByTopic: { [key: string]: Set<string> } = {};
      const correctByTopic: { [key: string]: number } = {};
      const attemptedBySubtopic: { [key: string]: Set<string> } = {};
      const correctBySubtopic: { [key: string]: number } = {};

      try {
        let allAttempts: { question_id: string; is_correct: boolean; questions: unknown }[] = [];
        let page = 0;
        const pageSize = 1000;
        let hasMore = true;

        while (hasMore) {
          const { data: attempts, error: attemptsError } = await supabase
            .from('user_question_attempts')
            .select('question_id, is_correct, questions(topic_area, subtopic)')
            .eq('user_id', userId)
            .range(page * pageSize, (page + 1) * pageSize - 1);

          if (attemptsError) {
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

        allAttempts.forEach((attempt) => {
          const questionsData = attempt.questions;
          const topicArea = Array.isArray(questionsData)
            ? questionsData[0]?.topic_area
            : (questionsData as { topic_area: string; subtopic?: string } | null)?.topic_area;
          const subtopic = Array.isArray(questionsData)
            ? questionsData[0]?.subtopic
            : (questionsData as { topic_area: string; subtopic?: string } | null)?.subtopic;

          if (topicArea) {
            if (!attemptedByTopic[topicArea]) {
              attemptedByTopic[topicArea] = new Set();
            }
            attemptedByTopic[topicArea].add(attempt.question_id);

            if (attempt.is_correct) {
              correctByTopic[topicArea] = (correctByTopic[topicArea] || 0) + 1;
            }

            if (subtopic) {
              const subtopicKey = `${topicArea}::${subtopic}`;
              if (!attemptedBySubtopic[subtopicKey]) {
                attemptedBySubtopic[subtopicKey] = new Set();
              }
              attemptedBySubtopic[subtopicKey].add(attempt.question_id);

              if (attempt.is_correct) {
                correctBySubtopic[subtopicKey] = (correctBySubtopic[subtopicKey] || 0) + 1;
              }
            }
          }
        });
      } catch {
        console.log('Note: User attempts data not available');
      }

      const stats: QuestionStats = {};
      const subStats: SubtopicStats = {};
      let totalQs = 0;
      let totalAtt = 0;
      let totalCorr = 0;

      Object.entries(topicIdToDbName).forEach(([topicId, dbName]) => {
        const total = questionCountByTopic[dbName] || 0;
        const attempted = attemptedByTopic[dbName]?.size || 0;
        const correct = correctByTopic[dbName] || 0;

        stats[topicId] = {
          totalQuestions: total,
          attemptedQuestions: attempted,
          correctAnswers: correct,
        };

        totalQs += total;
        totalAtt += attempted;
        totalCorr += correct;
      });

      Object.keys(questionCountBySubtopic).forEach((key) => {
        subStats[key] = {
          totalQuestions: questionCountBySubtopic[key] || 0,
          attemptedQuestions: attemptedBySubtopic[key]?.size || 0,
          correctAnswers: correctBySubtopic[key] || 0,
        };
      });

      setQuestionStats(stats);
      setSubtopicStats(subStats);
      setTotalDbQuestions(totalQs);
      setTotalAttempted(totalAtt);
      setTotalCorrect(totalCorr);
    } catch (error) {
      console.error('Error fetching question stats:', error);
    }
  }, [supabase, plan]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        await fetchQuestionStats(user.id);
        setLoading(false);
      }
    };
    checkUser();
  }, [router, supabase, fetchQuestionStats]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubtopicToggle = (subtopicKey: string) => {
    setSelectedSubtopics(prev =>
      prev.includes(subtopicKey)
        ? prev.filter(id => id !== subtopicKey)
        : [...prev, subtopicKey]
    );
  };

  const handleTopicToggle = (topicId: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  if (loading || subscriptionLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1FB8CD] mx-auto"></div>
          <p className="mt-4 text-[#5f6368]">Loading question bank...</p>
        </div>
      </div>
    );
  }

  if (!canAccessQuestions) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex">
        <Sidebar user={user!} onSignOut={handleSignOut} />
        <div className="flex-1 lg:ml-0">
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200">
            <div className="px-4 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-900">Question Bank</h1>
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
          </header>
          <main className="p-4 lg:p-8">
            <UpgradePrompt
              plan={plan}
              questionsRemaining={subscription?.questionsRemaining}
              feature="questions"
            />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#F8F9FA] flex overflow-hidden">
      <Sidebar user={user!} onSignOut={handleSignOut} />

      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Header - Fixed */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200 flex-shrink-0">
          <div className="px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              <h1 className="hidden lg:block text-xl font-semibold text-gray-900">Question Bank</h1>

              <SearchDropdown className="flex-1 max-w-md hidden md:block" />

              <div className="flex items-center gap-3">
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
          {/* Page Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">CFA Level 1 Question Bank</h2>
            <p className="text-gray-500 mt-1">Select topics and practice questions</p>
          </div>

          {/* Filter Controls */}
          <div className="mb-6 flex flex-wrap gap-4 items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.length === cfaLevel1Curriculum.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories(cfaLevel1Curriculum.map(topic => topic.id));
                  } else {
                    setSelectedCategories([]);
                  }
                }}
                className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Select All</span>
            </label>

            {selectedCategories.length > 0 && (
              <div className="flex items-center gap-3 ml-4">
                <select
                  value={questionFilter}
                  onChange={(e) => setQuestionFilter(e.target.value as "all" | "wrong" | "correct" | "unanswered")}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-[#1FB8CD]/30 focus:border-[#1FB8CD]"
                >
                  <option value="all">All Questions</option>
                  <option value="wrong">Wrong Only</option>
                  <option value="correct">Correct Only</option>
                  <option value="unanswered">Unanswered Only</option>
                </select>
                <select
                  value={questionLimit}
                  onChange={(e) => setQuestionLimit(e.target.value === "all" ? "all" : Number(e.target.value))}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-[#1FB8CD]/30 focus:border-[#1FB8CD]"
                >
                  <option value="10">10 Questions</option>
                  <option value="20">20 Questions</option>
                  <option value="50">50 Questions</option>
                  <option value="100">100 Questions</option>
                  <option value="all">All Questions</option>
                </select>
                <button
                  onClick={() => handleStartPractice(`/practice/session?categories=${selectedCategories.join(',')}&limit=${questionLimit}&filter=${questionFilter}`)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Practice {selectedCategories.length} {selectedCategories.length === 1 ? 'topic' : 'topics'}
                </button>
              </div>
            )}
          </div>

          {/* Topics List */}
          
          <div className="space-y-4" id="topics-container">
            {cfaLevel1Curriculum.map((topic) => {
              const isTopicSelected = selectedCategories.includes(topic.id);
              const isExpanded = expandedTopics.includes(topic.id);
              const stats = questionStats[topic.id] || { totalQuestions: 0, attemptedQuestions: 0, correctAnswers: 0 };
              const questionCount = stats.totalQuestions > 0 ? stats.totalQuestions : topic.questionCount;
              const progressPercentage = questionCount > 0 ? (stats.attemptedQuestions / questionCount) * 100 : 0;

              return (
                <div key={topic.id} id={`topic-${topic.id}`} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 scroll-mt-36">
                  {/* Topic Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        {(() => {
                          const Icon = topicIcons[topic.id] || Scales;
                          return <Icon size={24} className="text-gray-700" />;
                        })()}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-gray-900">{topic.name}</h3>
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {topic.examWeight}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {stats.attemptedQuestions > 0 ? `${stats.correctAnswers} correct` : 'Not started'} • {questionCount} questions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isTopicSelected}
                        onChange={() => handleCategoryToggle(topic.id)}
                        className="h-5 w-5 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                      />
                      <button
                        onClick={() => handleTopicToggle(topic.id)}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        {isExpanded ? <Minus size={20} className="text-gray-600" /> : <Plus size={20} className="text-gray-600" />}
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>Progress</span>
                      <span>{stats.attemptedQuestions}/{questionCount} attempted</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-[#1FB8CD] transition-all"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Topic Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleStartPractice(`/practice/session?categories=${topic.id}&limit=all&filter=all`)}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Practice All
                    </button>
                    {stats.attemptedQuestions > 0 && stats.attemptedQuestions - stats.correctAnswers > 0 && (
                      <button
                        onClick={() => handleStartPractice(`/practice/session?categories=${topic.id}&limit=all&filter=wrong`)}
                        className="bg-red-50 text-red-700 px-3 py-2 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
                      >
                        Wrong ({stats.attemptedQuestions - stats.correctAnswers})
                      </button>
                    )}
                  </div>

                  {/* Subtopics Table */}
                  {isExpanded && (
                    <div className="mt-6 border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-gray-900">
                          Subtopics ({topic.subtopics.length})
                        </h4>
                      </div>

                      <div className="bg-gray-50 rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="px-4 py-3 text-left font-medium text-gray-600 w-8"></th>
                              <th className="px-4 py-3 text-left font-medium text-gray-600">Subtopic</th>
                              <th className="px-3 py-3 text-center font-medium text-gray-600 w-20">Total</th>
                              <th className="px-3 py-3 text-center font-medium text-gray-600 w-24">Done</th>
                              <th className="px-3 py-3 text-center font-medium text-green-600 w-20">Correct</th>
                              <th className="px-4 py-3 text-right font-medium text-gray-600 w-24">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {topic.subtopics.map((subtopic) => {
                              const subtopicKey = `${topicIdToDbName[topic.id]}::${subtopic.name}`;
                              const subStats = subtopicStats[subtopicKey] || { totalQuestions: 0, attemptedQuestions: 0, correctAnswers: 0 };
                              const wrongCount = subStats.attemptedQuestions - subStats.correctAnswers;
                              const isSelected = selectedSubtopics.includes(subtopicKey);

                              return (
                                <tr key={subtopic.id} className={`hover:bg-gray-100 transition-colors ${isSelected ? 'bg-[#1FB8CD]/5' : ''}`}>
                                  <td className="px-4 py-3">
                                    <input
                                      type="checkbox"
                                      checked={isSelected}
                                      onChange={() => handleSubtopicToggle(subtopicKey)}
                                      className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                                    />
                                  </td>
                                  <td className="px-4 py-3">
                                    <span className="font-medium text-gray-900">{subtopic.name}</span>
                                    <span className="ml-2 text-xs text-gray-400">({subtopic.learningOutcomes} LOs)</span>
                                  </td>
                                  <td className="px-3 py-3 text-center text-gray-600">{subStats.totalQuestions}</td>
                                  <td className="px-3 py-3 text-center text-gray-600">{subStats.attemptedQuestions}</td>
                                  <td className="px-3 py-3 text-center">
                                    {subStats.correctAnswers > 0 ? (
                                      <span className="text-green-600 font-medium">{subStats.correctAnswers}</span>
                                    ) : (
                                      <span className="text-gray-300">—</span>
                                    )}
                                  </td>
                                  <td className="px-4 py-3 text-right">
                                    <button
                                      onClick={() => handleStartPractice(`/practice/session?categories=${topic.id}&subtopics=${encodeURIComponent(subtopic.name)}&limit=all&filter=all`)}
                                      className="text-xs text-gray-500 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                                    >
                                      Practice
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Statistics Summary */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Curriculum Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center">
                <p className="text-3xl font-semibold text-gray-900">
                  {totalDbQuestions > 0 ? totalDbQuestions : cfaLevel1Curriculum.reduce((sum, topic) => sum + topic.questionCount, 0)}
                </p>
                <p className="text-sm text-gray-500 mt-1">Total Questions</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-semibold text-gray-900">{totalAttempted}</p>
                <p className="text-sm text-gray-500 mt-1">Attempted</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-semibold text-green-600">{totalCorrect}</p>
                <p className="text-sm text-gray-500 mt-1">Correct</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-semibold text-gray-900">
                  {totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0}%
                </p>
                <p className="text-sm text-gray-500 mt-1">Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-semibold text-gray-900">
                  {totalDbQuestions > 0 ? Math.round((totalAttempted / totalDbQuestions) * 100) : 0}%
                </p>
                <p className="text-sm text-gray-500 mt-1">Coverage</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
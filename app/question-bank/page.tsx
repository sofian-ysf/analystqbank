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

interface QuestionStats {
  [topicId: string]: {
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
  const [totalDbQuestions, setTotalDbQuestions] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const supabase = createClient();

  const fetchQuestionStats = useCallback(async (userId: string) => {
    try {
      // Fetch question counts per topic using individual count queries (avoids 1000 row limit)
      const questionCountByTopic: { [key: string]: number } = {};

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

      // Fetch user's attempted questions with pagination to handle large datasets
      const attemptedByTopic: { [key: string]: Set<string> } = {};
      const correctByTopic: { [key: string]: number } = {};

      let allAttempts: { question_id: string; is_correct: boolean; questions: unknown }[] = [];
      let page = 0;
      const pageSize = 1000;
      let hasMore = true;

      while (hasMore) {
        const { data: attempts, error: attemptsError } = await supabase
          .from('user_question_attempts')
          .select('question_id, is_correct, questions(topic_area)')
          .eq('user_id', userId)
          .range(page * pageSize, (page + 1) * pageSize - 1);

        if (attemptsError) {
          console.error('Error fetching attempts:', attemptsError);
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

      // Count attempts per topic (unique questions only)
      allAttempts.forEach((attempt) => {
        // Supabase returns joined data as an object (single) or array depending on relationship
        const questionsData = attempt.questions;
        const topicArea = Array.isArray(questionsData)
          ? questionsData[0]?.topic_area
          : (questionsData as { topic_area: string } | null)?.topic_area;
        if (topicArea) {
          if (!attemptedByTopic[topicArea]) {
            attemptedByTopic[topicArea] = new Set();
          }
          attemptedByTopic[topicArea].add(attempt.question_id);

          if (attempt.is_correct) {
            correctByTopic[topicArea] = (correctByTopic[topicArea] || 0) + 1;
          }
        }
      });

      // Build stats object mapped to curriculum topic IDs
      const stats: QuestionStats = {};
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

      setQuestionStats(stats);
      setTotalDbQuestions(totalQs);
      setTotalAttempted(totalAtt);
      setTotalCorrect(totalCorr);
    } catch (error) {
      console.error('Error fetching question stats:', error);
    }
  }, [supabase]);

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

  const handleTopicToggle = (topicId: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const getProgressPercentage = (completed: number, total: number) => {
    return total > 0 ? (completed / total) * 100 : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1FB8CD] mx-auto"></div>
          <p className="mt-4 text-[#5f6368]">Loading question bank...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFAF4]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard">
              <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Dashboard
              </Link>
              <Link href="/question-bank" className="text-[#13343B] font-medium transition-colors">
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
                  <Link href="/profile" className="block px-4 py-2 text-sm text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]">
                    Profile
                  </Link>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CFA Level 1 Question Bank</h1>
          <p className="text-gray-600">
            Practice questions across all 10 CFA Level 1 topic areas. Question distribution follows official exam weightings: 180 total questions with 90 per session.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="select-all"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCategories(cfaLevel1Curriculum.map(topic => topic.id));
                } else {
                  setSelectedCategories([]);
                }
              }}
              checked={selectedCategories.length === cfaLevel1Curriculum.length}
              className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
            />
            <label htmlFor="select-all" className="text-sm font-medium text-gray-700">
              Select All Topics
            </label>
          </div>
          {selectedCategories.length > 0 && (
            <div className="flex space-x-2">
              <Link
                href={`/practice?categories=${selectedCategories.join(',')}`}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
              >
                Practice Selected ({selectedCategories.length})
              </Link>
              <Link
                href={`/research-hubs?categories=${selectedCategories.join(',')}`}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Study Materials
              </Link>
            </div>
          )}
        </div>

        {/* Topics and Subtopics List */}
        <div className="space-y-4">
          {cfaLevel1Curriculum.map((topic) => {
            const isTopicSelected = selectedCategories.includes(topic.id);
            const isExpanded = expandedTopics.includes(topic.id);
            const stats = questionStats[topic.id] || { totalQuestions: 0, attemptedQuestions: 0, correctAnswers: 0 };
            const questionCount = stats.totalQuestions > 0 ? stats.totalQuestions : topic.questionCount;
            const progressPercentage = getProgressPercentage(stats.attemptedQuestions, questionCount);

            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
                {/* Main Topic Header */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <div className={`w-12 h-12 ${topic.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                        {topic.icon}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-bold text-gray-900 text-lg">{topic.name}</h3>
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                            {topic.examWeight}
                          </span>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                            {stats.totalQuestions > 0 ? stats.totalQuestions : topic.questionCount} questions
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={isTopicSelected}
                        onChange={() => handleCategoryToggle(topic.id)}
                        className="h-5 w-5 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                      />
                      <button
                        onClick={() => handleTopicToggle(topic.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <svg
                          className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress ({stats.attemptedQuestions > 0 ? `${stats.correctAnswers} correct` : 'Not started'})</span>
                      <span>{stats.attemptedQuestions}/{questionCount} attempted</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${topic.color}`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Topic Action Buttons */}
                  <div className="flex space-x-3 mt-4">
                    <Link
                      href={`/practice/${topic.id}`}
                      className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
                    >
                      Practice Topic
                    </Link>
                    <Link
                      href={`/research-hubs/${topic.id}`}
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
                    >
                      Study Materials
                    </Link>
                  </div>
                </div>

                {/* Subtopics (Expandable) */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">
                      Subtopics ({topic.subtopics.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {topic.subtopics.map((subtopic) => (
                        <div
                          key={subtopic.id}
                          className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-all"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="text-sm font-medium text-gray-900 flex-1">
                              {subtopic.name}
                            </h5>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">
                              {subtopic.learningOutcomes} LOs
                            </span>
                            <Link
                              href={`/practice/${topic.id}/${subtopic.id}`}
                              className="text-xs text-gray-900 font-medium hover:underline"
                            >
                              Practice →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Statistics Summary */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Curriculum Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">
                {totalDbQuestions > 0 ? totalDbQuestions : cfaLevel1Curriculum.reduce((sum, topic) => sum + topic.questionCount, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Questions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{totalAttempted}</p>
              <p className="text-sm text-gray-600">Attempted</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{totalCorrect}</p>
              <p className="text-sm text-gray-600">Correct</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">
                {totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0}%
              </p>
              <p className="text-sm text-gray-600">Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">
                {totalDbQuestions > 0 ? Math.round((totalAttempted / totalDbQuestions) * 100) : 0}%
              </p>
              <p className="text-sm text-gray-600">Overall Progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
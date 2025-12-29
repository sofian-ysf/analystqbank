"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export default function MockExams() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState("Level I");
  const supabase = createClient();

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

  const mockExams = [
    {
      id: 1,
      title: "CFA Level I - Practice Exam 1",
      level: "Level I",
      duration: "4.5 hours",
      questions: 180,
      sessions: "2 sessions (90 questions each)",
      topics: ["Ethics (18%)", "Financial Statement Analysis (13%)", "Quantitative Methods (8%)", "Economics (8%)"],
      difficulty: "Beginner",
      completed: false,
      score: null,
      description: "Computer-based exam format with multiple-choice questions only"
    },
    {
      id: 2,
      title: "CFA Level I - Practice Exam 2",
      level: "Level I",
      duration: "4.5 hours",
      questions: 180,
      sessions: "2 sessions (90 questions each)",
      topics: ["Equity Investments (13%)", "Fixed Income (13%)", "Corporate Issuers (8%)", "Portfolio Management (10%)"],
      difficulty: "Intermediate",
      completed: true,
      score: 78,
      description: "Focus on investment analysis and portfolio management topics"
    },
    {
      id: 3,
      title: "CFA Level I - Mock Exam (Full)",
      level: "Level I",
      duration: "4.5 hours",
      questions: 180,
      sessions: "2 sessions (90 questions each)",
      topics: ["All 10 Topic Areas Covered"],
      difficulty: "Advanced",
      completed: false,
      score: null,
      description: "Complete mock exam following official CFA Level I format and timing"
    },
    {
      id: 4,
      title: "CFA Level I - Derivatives & Alternatives",
      level: "Level I",
      duration: "2.25 hours",
      questions: 90,
      sessions: "1 session focused practice",
      topics: ["Derivatives (6%)", "Alternative Investments (9%)"],
      difficulty: "Intermediate",
      completed: false,
      score: null,
      description: "Focused practice on lower-weighted but important topic areas"
    },
    {
      id: 5,
      title: "CFA Level I - Ethics Deep Dive",
      level: "Level I",
      duration: "1.5 hours",
      questions: 60,
      sessions: "Ethics-focused session",
      topics: ["Ethical and Professional Standards (100%)"],
      difficulty: "Advanced",
      completed: true,
      score: 85,
      description: "Critical ethics preparation - can be a tie-breaker for borderline candidates"
    }
  ];

  const filteredExams = mockExams;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return "";
    if (score >= 80) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#13343B] mx-auto"></div>
          <p className="mt-4 text-[#5f6368]">Loading mock exams...</p>
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
            <Link href="/dashboard">
              <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Dashboard
              </Link>
              <Link href="/practice" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Practice
              </Link>
              <Link href="/mock-exams" className="text-[#13343B] font-medium transition-colors">
                Mock Exams
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <button className="flex items-center space-x-2 text-[#5f6368] hover:text-[#13343B] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#1FB8CD] flex items-center justify-center text-white font-medium">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#EAEEEF] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/profile" className="block px-4 py-2 text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]">
                    Profile
                  </Link>
                  <Link href="/settings" className="block px-4 py-2 text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]">
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mock Exams</h1>
          <p className="text-gray-600">
            Test your knowledge with full-length practice exams that simulate the real CFA testing environment.
          </p>
        </div>

        {/* Level Selection */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {["Level I", "Level II", "Level III"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedLevel === level
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 hover:text-gray-900 border border-gray-300"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Available Exams</p>
                <p className="text-2xl font-bold text-gray-900">{filteredExams.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredExams.filter(exam => exam.completed).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredExams.filter(exam => exam.score).length > 0
                    ? Math.round(
                        filteredExams
                          .filter(exam => exam.score)
                          .reduce((sum, exam) => sum + (exam.score || 0), 0) /
                        filteredExams.filter(exam => exam.score).length
                      )
                    : "N/A"}
                  {filteredExams.filter(exam => exam.score).length > 0 && "%"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Study Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredExams.reduce((sum, exam) => sum + parseInt(exam.duration), 0)}h
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mock Exams List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">{selectedLevel} Mock Exams</h2>
            <p className="text-gray-600 mt-1">
              Choose a mock exam to test your knowledge and track your progress.
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredExams.map((exam) => (
              <div key={exam.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exam.difficulty)}`}>
                        {exam.difficulty}
                      </span>
                      {exam.completed && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {exam.duration}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {exam.questions} questions
                      </span>
                      {exam.score && (
                        <span className={`flex items-center font-medium ${getScoreColor(exam.score)}`}>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          Score: {exam.score}%
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exam.topics.map((topic, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="ml-6 flex gap-3">
                    {exam.completed ? (
                      <>
                        <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                          Review Results
                        </button>
                        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                          Retake Exam
                        </button>
                      </>
                    ) : (
                      <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                        Start Exam
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Exam Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
            <div className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Take exams in a quiet environment to simulate real conditions</span>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Practice time management - stick to the allocated time</span>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Review explanations after completing each exam</span>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              <span className="text-sm">Track your performance across multiple attempts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
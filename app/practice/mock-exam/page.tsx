"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import MathText from "@/components/MathText";

// CFA Level 1 exam weightings - 180 total questions
const MOCK_EXAM_DISTRIBUTION: { [key: string]: { topicName: string; questions: number; weight: string } } = {
  "ethical-professional-standards": { topicName: "Ethical and Professional Standards", questions: 31, weight: "15-20%" },
  "quantitative-methods": { topicName: "Quantitative Methods", questions: 13, weight: "6-9%" },
  "economics": { topicName: "Economics", questions: 13, weight: "6-9%" },
  "financial-statement-analysis": { topicName: "Financial Statement Analysis", questions: 23, weight: "11-14%" },
  "corporate-issuers": { topicName: "Corporate Issuers", questions: 13, weight: "6-9%" },
  "equity-investments": { topicName: "Equity Investments", questions: 23, weight: "11-14%" },
  "fixed-income": { topicName: "Fixed Income", questions: 23, weight: "11-14%" },
  "derivatives": { topicName: "Derivatives", questions: 11, weight: "5-8%" },
  "alternative-investments": { topicName: "Alternative Investments", questions: 14, weight: "7-10%" },
  "portfolio-management": { topicName: "Portfolio Management", questions: 16, weight: "8-12%" },
};

interface TableData {
  title: string;
  headers: string[];
  rows: Array<{
    label?: string;
    values: (string | number)[];
  }>;
  footnote?: string;
}

interface Question {
  id: string;
  topic_area: string;
  subtopic: string | null;
  difficulty_level: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  correct_answer: string;
  explanation: string;
  keywords: string[];
  has_table?: boolean;
  table_data?: TableData;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MockExam() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [examStarted, setExamStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<{ [key: number]: { answer: string; isCorrect: boolean } }>({});
  const [navigatorPage, setNavigatorPage] = useState(0);
  const [navigatorFilter, setNavigatorFilter] = useState<'correct' | 'wrong' | 'pending' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [examTimer, setExamTimer] = useState<number>(0); // In seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const supabase = createClient();

  const QUESTIONS_PER_PAGE = 50;
  const TOTAL_EXAM_TIME = 4.5 * 60 * 60; // 4.5 hours in seconds (CFA L1 format)

  // Calculate score
  const score = {
    correct: Object.values(answeredQuestions).filter(a => a.isCorrect).length,
    total: Object.keys(answeredQuestions).length
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && examTimer < TOTAL_EXAM_TIME) {
      interval = setInterval(() => {
        setExamTimer(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, examTimer]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const fetchMockExamQuestions = useCallback(async () => {
    const allQuestions: Question[] = [];

    // Fetch questions from each category based on the distribution
    for (const [, config] of Object.entries(MOCK_EXAM_DISTRIBUTION)) {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("topic_area", config.topicName)
        .eq("is_active", true)
        .limit(config.questions * 2); // Fetch extra to ensure we have enough

      if (error) {
        console.error(`Error fetching questions for ${config.topicName}:`, error);
        continue;
      }

      if (data && data.length > 0) {
        // Shuffle and take the required number
        const shuffled = shuffleArray(data);
        const selected = shuffled.slice(0, config.questions);
        allQuestions.push(...selected);
      }
    }

    // Shuffle all questions for random order
    return shuffleArray(allQuestions);
  }, [supabase]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      setLoading(false);
    };
    checkUser();
  }, [router, supabase]);

  const handleStartExam = async () => {
    setLoading(true);
    const fetchedQuestions = await fetchMockExamQuestions();
    setQuestions(fetchedQuestions);
    setExamStarted(true);
    setTimerRunning(true);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleAnswerSelect = (answer: string) => {
    if (showExplanation) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || showExplanation) return;

    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    setAnsweredQuestions((prev) => ({
      ...prev,
      [currentIndex]: { answer: selectedAnswer, isCorrect },
    }));

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      const targetPage = Math.floor(nextIndex / QUESTIONS_PER_PAGE);
      if (targetPage !== navigatorPage) {
        setNavigatorPage(targetPage);
      }

      const previousAnswer = answeredQuestions[nextIndex];
      if (previousAnswer) {
        setSelectedAnswer(previousAnswer.answer);
        setShowExplanation(true);
      } else {
        setSelectedAnswer(null);
        setShowExplanation(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);

      const targetPage = Math.floor(prevIndex / QUESTIONS_PER_PAGE);
      if (targetPage !== navigatorPage) {
        setNavigatorPage(targetPage);
      }

      const previousAnswer = answeredQuestions[prevIndex];
      if (previousAnswer) {
        setSelectedAnswer(previousAnswer.answer);
        setShowExplanation(true);
      } else {
        setSelectedAnswer(null);
        setShowExplanation(false);
      }
    }
  };

  const handleGoToQuestion = (index: number) => {
    setCurrentIndex(index);

    const targetPage = Math.floor(index / QUESTIONS_PER_PAGE);
    if (targetPage !== navigatorPage) {
      setNavigatorPage(targetPage);
    }

    const previousAnswer = answeredQuestions[index];
    if (previousAnswer) {
      setSelectedAnswer(previousAnswer.answer);
      setShowExplanation(true);
    } else {
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleSubmitExam = async () => {
    if (!user) return;

    setIsSubmitting(true);
    setTimerRunning(false);

    try {
      // Calculate results by topic
      const resultsByTopic: { [key: string]: { correct: number; total: number } } = {};
      questions.forEach((question, index) => {
        const topicArea = question.topic_area;
        if (!resultsByTopic[topicArea]) {
          resultsByTopic[topicArea] = { correct: 0, total: 0 };
        }
        resultsByTopic[topicArea].total++;
        if (answeredQuestions[index]?.isCorrect) {
          resultsByTopic[topicArea].correct++;
        }
      });

      // Create mock exam record
      const { data: mockExamData, error: mockExamError } = await supabase
        .from('mock_exams')
        .insert({
          user_id: user.id,
          total_questions: questions.length,
          attempted_count: Object.keys(answeredQuestions).length,
          correct_count: score.correct,
          time_taken_seconds: examTimer,
          results_by_topic: resultsByTopic,
          completed_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (mockExamError) {
        console.error('Error creating mock exam record:', mockExamError);
      }

      // Prepare question attempts for batch insert
      const attempts = Object.entries(answeredQuestions).map(([indexStr, attempt]) => {
        const index = parseInt(indexStr, 10);
        const question = questions[index];
        return {
          user_id: user.id,
          question_id: question.id,
          session_id: mockExamData?.id || null,
          selected_answer: attempt.answer,
          is_correct: attempt.isCorrect,
          topic_area: question.topic_area,
          attempted_at: new Date().toISOString(),
        };
      });

      // Insert all attempts
      const { error: attemptsError } = await supabase
        .from('user_question_attempts')
        .insert(attempts);

      if (attemptsError) {
        console.error('Error saving attempts:', attemptsError);
      }

      setSessionComplete(true);
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('There was an error saving your exam. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1FB8CD] mx-auto"></div>
          <p className="mt-4 text-[#5f6368]">Loading...</p>
        </div>
      </div>
    );
  }

  // Pre-exam screen
  if (!examStarted) {
    return (
      <div className="min-h-screen bg-[#FBFAF4]">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
          <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
            <div className="flex h-16 items-center justify-between">
              <Link href="/dashboard">
                <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
              </Link>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-[#5f6368]">{user?.email}</span>
              </div>
            </div>
          </nav>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-sm border border-[#EAEEEF] p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#13343B] mb-2">CFA Level 1 Mock Exam</h1>
              <p className="text-[#5f6368]">Simulate the real exam experience</p>
            </div>

            {/* Exam Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#F3F3EE] rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-[#13343B]">180</p>
                <p className="text-sm text-[#5f6368]">Questions</p>
              </div>
              <div className="bg-[#F3F3EE] rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-[#13343B]">4.5</p>
                <p className="text-sm text-[#5f6368]">Hours</p>
              </div>
              <div className="bg-[#F3F3EE] rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-[#13343B]">10</p>
                <p className="text-sm text-[#5f6368]">Topics</p>
              </div>
              <div className="bg-[#F3F3EE] rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-[#13343B]">70%</p>
                <p className="text-sm text-[#5f6368]">Pass Rate</p>
              </div>
            </div>

            {/* Topic Distribution */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-[#13343B] mb-4">Question Distribution</h2>
              <div className="space-y-2">
                {Object.entries(MOCK_EXAM_DISTRIBUTION).map(([id, config]) => (
                  <div key={id} className="flex items-center justify-between py-2 border-b border-[#EAEEEF]">
                    <span className="text-sm text-[#13343B]">{config.topicName}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-[#5f6368]">{config.weight}</span>
                      <span className="text-sm font-medium text-[#1FB8CD]">{config.questions} Q</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-amber-800 mb-2">Instructions</h3>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>- You can navigate between questions freely</li>
                <li>- The timer will track your total time</li>
                <li>- Submit the exam when you are finished</li>
                <li>- Your results will be saved for review</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleStartExam}
                className="bg-[#1FB8CD] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#1A6872] transition-colors text-lg"
              >
                Start Mock Exam
              </button>
              <Link
                href="/question-bank"
                className="border border-[#EAEEEF] text-[#5f6368] px-8 py-4 rounded-lg font-medium hover:bg-[#F3F3EE] transition-colors text-center"
              >
                Back to Question Bank
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Session complete screen
  if (sessionComplete) {
    const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    const passed = percentage >= 70;

    // Calculate results by topic for display
    const resultsByTopic: { [key: string]: { correct: number; total: number } } = {};
    questions.forEach((question, index) => {
      const topicArea = question.topic_area;
      if (!resultsByTopic[topicArea]) {
        resultsByTopic[topicArea] = { correct: 0, total: 0 };
      }
      resultsByTopic[topicArea].total++;
      if (answeredQuestions[index]?.isCorrect) {
        resultsByTopic[topicArea].correct++;
      }
    });

    return (
      <div className="min-h-screen bg-[#FBFAF4]">
        <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
          <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
            <div className="flex h-16 items-center justify-between">
              <Link href="/dashboard">
                <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
              </Link>
            </div>
          </nav>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-sm border border-[#EAEEEF] p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#13343B] mb-2">Mock Exam Complete!</h1>
              <p className={`text-lg font-medium ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {passed ? 'Congratulations! You passed!' : 'Keep practicing!'}
              </p>
            </div>

            {/* Score Display */}
            <div className="flex justify-center mb-8">
              <div className={`text-8xl font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {percentage}%
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#F3F3EE] rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-[#13343B]">{score.total}</p>
                <p className="text-sm text-[#5f6368]">Attempted</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-600">{score.correct}</p>
                <p className="text-sm text-[#5f6368]">Correct</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-red-600">{score.total - score.correct}</p>
                <p className="text-sm text-[#5f6368]">Incorrect</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{formatTime(examTimer)}</p>
                <p className="text-sm text-[#5f6368]">Time Taken</p>
              </div>
            </div>

            {/* Results by Topic */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-[#13343B] mb-4">Performance by Topic</h2>
              <div className="space-y-3">
                {Object.entries(resultsByTopic).map(([topic, results]) => {
                  const topicPercentage = results.total > 0 ? Math.round((results.correct / results.total) * 100) : 0;
                  return (
                    <div key={topic} className="bg-[#F3F3EE] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#13343B]">{topic}</span>
                        <span className={`text-sm font-bold ${topicPercentage >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                          {topicPercentage}% ({results.correct}/{results.total})
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${topicPercentage >= 70 ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${topicPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/practice/mock-exam"
                className="bg-[#1FB8CD] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1A6872] transition-colors text-center"
              >
                Take Another Mock Exam
              </Link>
              <Link
                href="/question-bank"
                className="border border-[#EAEEEF] text-[#5f6368] px-6 py-3 rounded-lg font-medium hover:bg-[#F3F3EE] transition-colors text-center"
              >
                Back to Question Bank
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#5f6368]">No questions available</p>
          <Link href="/question-bank" className="text-[#1FB8CD] hover:underline mt-4 block">
            Return to Question Bank
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFAF4]">
      {/* Header with Timer */}
      <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/dashboard">
              <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
            </Link>
            <div className="flex items-center space-x-6">
              <div className="bg-[#1FB8CD] text-white px-4 py-2 rounded-lg font-mono text-lg font-bold">
                {formatTime(examTimer)}
              </div>
              <span className="text-sm text-[#5f6368]">
                Q {currentIndex + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-[#1FB8CD]">
                {score.correct}/{score.total}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <button className="flex items-center space-x-2 text-[#5f6368] hover:text-[#13343B] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#1FB8CD] flex items-center justify-center text-white font-medium">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#EAEEEF] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
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

      {/* Progress Bar */}
      <div className="bg-white border-b border-[#EAEEEF]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-xs text-[#5f6368] mb-1">
                <span className="font-medium text-[#13343B]">Mock Exam</span>
                <span>
                  {Math.round((Object.keys(answeredQuestions).length / questions.length) * 100)}% complete
                  ({Object.keys(answeredQuestions).length}/{questions.length})
                </span>
              </div>
              <div className="w-full bg-[#EAEEEF] rounded-full h-2">
                <div
                  className="bg-[#1FB8CD] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(Object.keys(answeredQuestions).length / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <button
              onClick={handleSubmitExam}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                isSubmitting
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Exam'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Question Card */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-[#EAEEEF] p-6 sm:p-8">
              {/* Question Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#5f6368]">Question {currentIndex + 1}</span>
                  <span className="text-xs px-2 py-1 bg-[#1FB8CD]/10 text-[#1FB8CD] rounded-full font-medium">
                    {currentQuestion.topic_area}
                  </span>
                  {currentQuestion.has_table && (
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-medium">Table</span>
                  )}
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    currentQuestion.difficulty_level === "beginner"
                      ? "bg-green-100 text-green-700"
                      : currentQuestion.difficulty_level === "intermediate"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {currentQuestion.difficulty_level}
                </span>
              </div>

              {/* Question Text */}
              <div className="text-lg text-[#13343B] mb-6 leading-relaxed">
                <MathText text={currentQuestion.question_text} />
              </div>

              {/* Table Display */}
              {currentQuestion.has_table && currentQuestion.table_data && (
                <div className="mb-8 bg-white border border-amber-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-amber-50 px-4 py-2 border-b border-amber-200">
                    <h4 className="font-medium text-amber-900 text-sm">{currentQuestion.table_data.title}</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          {currentQuestion.table_data.headers.map((header: string, idx: number) => (
                            <th key={idx} className="px-4 py-3 text-left text-gray-700 font-semibold border-b border-gray-200">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {currentQuestion.table_data.rows.map((row: { label?: string; values: (string | number)[] }, rowIdx: number) => (
                          <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            {row.label && (
                              <td className="px-4 py-3 text-gray-700 font-medium border-b border-gray-100">{row.label}</td>
                            )}
                            {row.values.map((value: string | number, valIdx: number) => (
                              <td key={valIdx} className="px-4 py-3 text-gray-900 border-b border-gray-100">
                                {typeof value === 'number' ? value.toLocaleString() : value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {currentQuestion.table_data.footnote && (
                    <div className="px-4 py-2 text-xs text-gray-500 italic border-t border-gray-200 bg-gray-50">
                      {currentQuestion.table_data.footnote}
                    </div>
                  )}
                </div>
              )}

              {/* Answer Options */}
              <div className="space-y-3">
                {["A", "B", "C"].map((option) => {
                  const optionKey = `option_${option.toLowerCase()}` as keyof Question;
                  const optionText = currentQuestion[optionKey] as string;
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQuestion.correct_answer;

                  let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";

                  if (showExplanation) {
                    if (isCorrect) {
                      buttonClass += "border-green-500 bg-green-50 text-green-800";
                    } else if (isSelected && !isCorrect) {
                      buttonClass += "border-red-500 bg-red-50 text-red-800";
                    } else {
                      buttonClass += "border-[#EAEEEF] bg-[#F3F3EE] text-[#5f6368]";
                    }
                  } else {
                    if (isSelected) {
                      buttonClass += "border-[#1FB8CD] bg-[#1FB8CD]/10 text-[#13343B]";
                    } else {
                      buttonClass += "border-[#EAEEEF] hover:border-[#1FB8CD] text-[#13343B]";
                    }
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswerSelect(option)}
                      className={buttonClass}
                      disabled={showExplanation}
                    >
                      <div className="flex items-start">
                        <span className="font-semibold mr-3 text-[#5f6368]">{option}.</span>
                        <span><MathText text={optionText} /></span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div className="mt-6 p-4 bg-[#F3F3EE] rounded-lg">
                  <div className="flex items-center mb-2">
                    {selectedAnswer === currentQuestion.correct_answer ? (
                      <span className="text-green-600 font-medium">Correct!</span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        Incorrect. The correct answer is {currentQuestion.correct_answer}.
                      </span>
                    )}
                  </div>
                  <div className="text-[#5f6368] text-sm">
                    <MathText text={currentQuestion.explanation} />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {currentIndex > 0 && (
                    <button
                      onClick={handlePrevious}
                      className="px-4 py-2 rounded-lg font-medium transition-colors border border-[#EAEEEF] text-[#5f6368] hover:bg-[#F3F3EE] flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {!showExplanation && (
                    <button
                      onClick={handleNext}
                      className="px-6 py-3 rounded-lg font-medium transition-colors border border-[#EAEEEF] text-[#5f6368] hover:bg-[#F3F3EE]"
                    >
                      Skip
                    </button>
                  )}

                  {!showExplanation ? (
                    <button
                      onClick={handleSubmit}
                      disabled={!selectedAnswer}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        selectedAnswer
                          ? "bg-[#1FB8CD] text-white hover:bg-[#1A6872]"
                          : "bg-[#EAEEEF] text-[#5f6368] cursor-not-allowed"
                      }`}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="bg-[#1FB8CD] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1A6872] transition-colors flex items-center gap-1"
                    >
                      {currentIndex < questions.length - 1 ? (
                        <>
                          Next
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </>
                      ) : (
                        "Finish Exam"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Question Navigator Panel */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-[#EAEEEF] p-4 sticky top-24">
              {(() => {
                const filteredIndices = questions.map((_, i) => i).filter(index => {
                  if (!navigatorFilter) return true;
                  const answered = answeredQuestions[index];
                  if (navigatorFilter === 'correct') return answered?.isCorrect === true;
                  if (navigatorFilter === 'wrong') return answered && !answered.isCorrect;
                  if (navigatorFilter === 'pending') return !answered;
                  return true;
                });

                const totalPages = Math.ceil(filteredIndices.length / QUESTIONS_PER_PAGE);
                const displayedIndices = filteredIndices.slice(
                  navigatorPage * QUESTIONS_PER_PAGE,
                  (navigatorPage + 1) * QUESTIONS_PER_PAGE
                );

                return (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-[#13343B]">
                        Navigator
                        {navigatorFilter && (
                          <button
                            onClick={() => { setNavigatorFilter(null); setNavigatorPage(0); }}
                            className="ml-2 text-xs text-[#1FB8CD] hover:underline font-normal"
                          >
                            Clear
                          </button>
                        )}
                      </h3>
                      {filteredIndices.length > QUESTIONS_PER_PAGE && (
                        <span className="text-xs text-[#5f6368]">
                          {navigatorPage * QUESTIONS_PER_PAGE + 1}-{Math.min((navigatorPage + 1) * QUESTIONS_PER_PAGE, filteredIndices.length)} of {filteredIndices.length}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setNavigatorPage(prev => Math.max(0, prev - 1))}
                        disabled={navigatorPage === 0}
                        className={`p-1 rounded ${navigatorPage === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#5f6368] hover:bg-[#F3F3EE]'}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      <div className="flex-1 grid grid-cols-5 gap-1.5">
                        {displayedIndices.length === 0 ? (
                          <div className="col-span-5 text-center text-xs text-[#5f6368] py-4">No questions</div>
                        ) : (
                          displayedIndices.map((index) => {
                            const answered = answeredQuestions[index];
                            let bgColor = "bg-[#F3F3EE] hover:bg-[#EAEEEF]";
                            let textColor = "text-[#5f6368]";
                            let borderColor = "border-transparent";

                            if (answered) {
                              if (answered.isCorrect) {
                                bgColor = "bg-green-100 hover:bg-green-200";
                                textColor = "text-green-700";
                              } else {
                                bgColor = "bg-red-100 hover:bg-red-200";
                                textColor = "text-red-700";
                              }
                            }

                            if (index === currentIndex) {
                              borderColor = "border-[#1FB8CD]";
                            }

                            return (
                              <button
                                key={index}
                                onClick={() => handleGoToQuestion(index)}
                                className={`w-8 h-8 rounded ${bgColor} ${textColor} text-xs font-medium border-2 ${borderColor} transition-all duration-150`}
                              >
                                {index + 1}
                              </button>
                            );
                          })
                        )}
                      </div>

                      <button
                        onClick={() => setNavigatorPage(prev => Math.min(totalPages - 1, prev + 1))}
                        disabled={navigatorPage >= totalPages - 1}
                        className={`p-1 rounded ${navigatorPage >= totalPages - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-[#5f6368] hover:bg-[#F3F3EE]'}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </>
                );
              })()}

              <div className="mt-4 pt-4 border-t border-[#EAEEEF]">
                <div className="flex items-center justify-between text-xs text-[#5f6368]">
                  <button
                    onClick={() => { setNavigatorFilter(navigatorFilter === 'correct' ? null : 'correct'); setNavigatorPage(0); }}
                    className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${navigatorFilter === 'correct' ? 'bg-green-100 ring-2 ring-green-400' : 'hover:bg-gray-100'}`}
                  >
                    <div className="w-3 h-3 rounded bg-green-100 border border-green-300"></div>
                    <span>Correct</span>
                  </button>
                  <button
                    onClick={() => { setNavigatorFilter(navigatorFilter === 'wrong' ? null : 'wrong'); setNavigatorPage(0); }}
                    className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${navigatorFilter === 'wrong' ? 'bg-red-100 ring-2 ring-red-400' : 'hover:bg-gray-100'}`}
                  >
                    <div className="w-3 h-3 rounded bg-red-100 border border-red-300"></div>
                    <span>Wrong</span>
                  </button>
                  <button
                    onClick={() => { setNavigatorFilter(navigatorFilter === 'pending' ? null : 'pending'); setNavigatorPage(0); }}
                    className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${navigatorFilter === 'pending' ? 'bg-gray-200 ring-2 ring-gray-400' : 'hover:bg-gray-100'}`}
                  >
                    <div className="w-3 h-3 rounded bg-[#F3F3EE] border border-[#EAEEEF]"></div>
                    <span>Pending</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

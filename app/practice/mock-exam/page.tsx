"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import MathText from "@/components/MathText";
import { useSubscription } from "@/hooks/useSubscription";
import { UpgradePrompt } from "@/components/UpgradePrompt";
import { PlanType } from "@/lib/plans";
import {
  CaretDown,
  SignOut,
  CaretLeft,
  CaretRight,
  Check,
  X,
  Clock,
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
  PaperPlaneTilt,
  ArrowLeft,
  Trophy,
} from "@phosphor-icons/react";
import Sidebar from "@/components/dashboard/Sidebar";

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
  const [showHistory, setShowHistory] = useState(false);
  const [historyAttempts, setHistoryAttempts] = useState<any[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<{ [key: number]: { answer: string; isCorrect: boolean } }>({});
  const [navigatorPage, setNavigatorPage] = useState(0);
  const [navigatorFilter, setNavigatorFilter] = useState<'correct' | 'wrong' | 'pending' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [examTimer, setExamTimer] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [mockExamAttemptId, setMockExamAttemptId] = useState<string | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const supabase = createClient();

  const {
    subscription,
    loading: subscriptionLoading,
    canAccessMockExams,
    plan,
  } = useSubscription();

  const QUESTIONS_PER_PAGE = 50;
  const TOTAL_EXAM_TIME = 4.5 * 60 * 60;

  const score = {
    correct: Object.values(answeredQuestions).filter(a => a.isCorrect).length,
    total: Object.keys(answeredQuestions).length
  };

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

    for (const [, config] of Object.entries(MOCK_EXAM_DISTRIBUTION)) {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("topic_area", config.topicName)
        .eq("is_active", true)
        .limit(config.questions * 2);

      if (error) {
        console.error(`Error fetching questions for ${config.topicName}:`, error);
        continue;
      }

      if (data && data.length > 0) {
        const shuffled = shuffleArray(data);
        const selected = shuffled.slice(0, Math.min(config.questions, data.length));
        allQuestions.push(...selected);
      }
    }

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

      // Fetch mock exam history
      const { data: attempts } = await supabase
        .from('user_mock_exam_attempts')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .order('completed_at', { ascending: false });

      if (attempts) {
        setHistoryAttempts(attempts);
      }

      setLoading(false);
    };
    checkUser();
  }, [router, supabase]);

  const formatHistoryDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getTopicScores = (topicScores: any) => {
    if (!topicScores) return [];
    return Object.entries(topicScores).map(([topic, scores]: [string, any]) => ({
      topic,
      correct: scores.correct,
      total: scores.total,
      percentage: scores.total > 0 ? Math.round((scores.correct / scores.total) * 100) : 0
    }));
  };

  const getStrongestTopics = (topicScores: any) => {
    const topics = getTopicScores(topicScores);
    return topics.sort((a, b) => b.percentage - a.percentage).slice(0, 3);
  };

  const getWeakestTopics = (topicScores: any) => {
    const topics = getTopicScores(topicScores);
    return topics.sort((a, b) => a.percentage - b.percentage).slice(0, 3);
  };

  const handleStartExam = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const { data: attemptData, error: attemptError } = await supabase
        .from('user_mock_exam_attempts')
        .insert({
          user_id: user.id,
          mock_exam_id: null,
          status: 'in_progress',
          started_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (attemptError) {
        console.error('Error creating mock exam attempt:', attemptError);
        alert(`Failed to start exam: ${attemptError.message}. Please check your subscription status.`);
        setLoading(false);
        return;
      }

      setMockExamAttemptId(attemptData.id);

      const fetchedQuestions = await fetchMockExamQuestions();

      if (fetchedQuestions.length === 0) {
        console.error('No questions fetched for mock exam');
        alert('Unable to load exam questions. Please contact support.');
        setLoading(false);
        return;
      }

      setQuestions(fetchedQuestions);
      setExamStarted(true);
      setTimerRunning(true);
    } catch (error) {
      console.error('Error starting exam:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleUpgrade = async (selectedPlan: PlanType) => {
    if (!user) return;

    setIsUpgrading(true);

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: selectedPlan,
          userId: user.id,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to start checkout. Please try again.');
        setIsUpgrading(false);
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('An error occurred. Please try again.');
      setIsUpgrading(false);
    }
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

      const totalScore = score.correct;
      const percentageScore = questions.length > 0 ? (score.correct / questions.length) * 100 : 0;

      const { data: mockExamData, error: mockExamError } = await supabase
        .from('user_mock_exam_attempts')
        .update({
          total_score: totalScore,
          percentage_score: percentageScore,
          time_taken_minutes: Math.round(examTimer / 60),
          status: 'completed',
          completed_at: new Date().toISOString(),
          topic_scores: resultsByTopic,
        })
        .eq('id', mockExamAttemptId)
        .select()
        .single();

      if (mockExamError) {
        console.error('Error updating mock exam record:', mockExamError);
      }

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

  if (loading || subscriptionLoading) {
    return (
      <div className="h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1FB8CD] mx-auto"></div>
          <p className="mt-4 text-[#5f6368]">Loading...</p>
        </div>
      </div>
    );
  }

  // No access screen
  if (!canAccessMockExams) {
    return (
      <div className="h-screen bg-[#F8F9FA] flex">
        <Sidebar user={user!} onSignOut={handleSignOut} />
        <div className="flex-1 flex flex-col lg:ml-0">
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200 flex-shrink-0">
            <div className="px-4 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-900">Mock Exam</h1>
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1FB8CD] flex items-center justify-center text-white font-semibold text-sm">
                      {user?.email?.[0]?.toUpperCase() || "U"}
                    </div>
                    <CaretDown size={16} className="text-gray-400" />
                  </button>
                  {isUserMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
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
          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            <UpgradePrompt
              plan={plan}
              mockExamsRemaining={subscription?.mockExamsRemaining}
            />
          </main>
        </div>
      </div>
    );
  }

  // Pre-exam screen
  if (!examStarted) {
    return (
      <div className="h-screen bg-[#F8F9FA] flex">
        <Sidebar user={user!} onSignOut={handleSignOut} />
        <div className="flex-1 flex flex-col lg:ml-0">
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200 flex-shrink-0">
            <div className="px-4 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-semibold text-gray-900">Mock Exams</h1>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1FB8CD] flex items-center justify-center text-white font-semibold text-sm">
                      {user?.email?.[0]?.toUpperCase() || "U"}
                    </div>
                    <CaretDown size={16} className="text-gray-400" />
                  </button>
                  {isUserMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
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
          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="max-w-5xl mx-auto">
              {/* Usage Banner */}
              {subscription && subscription.mockExamsRemaining !== null && subscription.mockExamsRemaining > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock size={20} className="text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">
                        {subscription.mockExamsRemaining} mock exam{subscription.mockExamsRemaining === 1 ? '' : 's'} remaining
                      </span>
                    </div>
                    {subscription.mockExamsRemaining <= 2 && (
                      <Link href="/pricing" className="text-sm font-medium text-blue-700 hover:text-blue-800">
                        Upgrade for more →
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Start New Exam Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Trophy size={28} className="text-gray-700" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Test Live Conditions</h2>
                      <p className="text-sm text-gray-500">180 questions, 4.5 hours, no interruptions</p>
                    </div>
                  </div>
                  {subscription && subscription.mockExamsRemaining === 0 ? (
                    <Link
                      href="/pricing"
                      className="bg-[#1FB8CD] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#1A6872] transition-colors"
                    >
                      Upgrade to Access
                    </Link>
                  ) : (
                    <button
                      onClick={handleStartExam}
                      className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    >
                      Start Exam
                    </button>
                  )}
                </div>
              </div>

              {/* History Section */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Previous Mock Exams</h2>
                  <span className="text-sm text-gray-500">{historyAttempts.length} exam{historyAttempts.length !== 1 ? 's' : ''} taken</span>
                </div>

                {historyAttempts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Trophy size={28} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No mock exams yet</h3>
                    <p className="text-gray-500">Take your first mock exam to see your history here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {historyAttempts.map((attempt, index) => {
                      const percentage = attempt.percentage_score ? Math.round(attempt.percentage_score) : 0;
                      const passed = percentage >= 70;
                      const timeTaken = attempt.time_taken_minutes
                        ? `${Math.floor(attempt.time_taken_minutes / 60)}h ${attempt.time_taken_minutes % 60}m`
                        : 'N/A';
                      const strongest = getStrongestTopics(attempt.topic_scores);
                      const weakest = getWeakestTopics(attempt.topic_scores);

                      return (
                        <div key={attempt.id} className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                passed ? 'bg-green-50' : 'bg-red-50'
                              }`}>
                                <span className={`text-xl font-semibold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                                  {percentage}%
                                </span>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">
                                  {passed ? 'Passed' : 'Did not pass'}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {formatHistoryDate(attempt.completed_at)} • {timeTaken} • {attempt.total_score}/{attempt.total_score + (attempt.total_questions - attempt.total_score)} correct
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Strengths & Weaknesses */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-green-50/50 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Check size={16} className="text-green-600" />
                                <span className="text-sm font-medium text-gray-900">Strengths</span>
                              </div>
                              <div className="space-y-1">
                                {strongest.length > 0 ? strongest.map((t, i) => (
                                  <div key={i} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">{t.topic}</span>
                                    <span className="text-green-600 font-medium">{t.percentage}%</span>
                                  </div>
                                )) : (
                                  <span className="text-sm text-gray-400">No data</span>
                                )}
                              </div>
                            </div>
                            <div className="bg-red-50/50 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <X size={16} className="text-red-600" />
                                <span className="text-sm font-medium text-gray-900">Areas to Improve</span>
                              </div>
                              <div className="space-y-1">
                                {weakest.length > 0 ? weakest.map((t, i) => (
                                  <div key={i} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">{t.topic}</span>
                                    <span className="text-red-600 font-medium">{t.percentage}%</span>
                                  </div>
                                )) : (
                                  <span className="text-sm text-gray-400">No data</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Topic Breakdown */}
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-xs text-gray-500 mb-2">Topic Breakdown</p>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                              {getTopicScores(attempt.topic_scores).map((t, i) => (
                                <div key={i} className="bg-gray-50 rounded-lg p-2 text-center">
                                  <p className="text-xs text-gray-500 truncate">{t.topic.split(' ')[0]}</p>
                                  <p className={`text-sm font-semibold ${t.percentage >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                                    {t.percentage}%
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Session complete screen
  if (sessionComplete) {
    const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    const passed = percentage >= 70;

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
      <div className="h-screen bg-[#F8F9FA] flex">
        <Sidebar user={user!} onSignOut={handleSignOut} />
        <div className="flex-1 flex flex-col lg:ml-0">
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200 flex-shrink-0">
            <div className="px-4 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-900">Mock Exam Results</h1>
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1FB8CD] flex items-center justify-center text-white font-semibold text-sm">
                      {user?.email?.[0]?.toUpperCase() || "U"}
                    </div>
                    <CaretDown size={16} className="text-gray-400" />
                  </button>
                  {isUserMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                        <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          Dashboard
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
          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Trophy size={32} className="text-gray-700" />
                  </div>
                  <h1 className="text-3xl font-semibold text-gray-900 mb-2">Mock Exam Complete!</h1>
                  <p className={`text-lg font-medium ${passed ? 'text-green-600' : 'text-red-600'}`}>
                    {passed ? 'Congratulations! You passed!' : 'Keep practicing!'}
                  </p>
                </div>

                {/* Score Display */}
                <div className="flex justify-center mb-8">
                  <div className={`text-8xl font-semibold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                    {percentage}%
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-semibold text-gray-900">{score.total}</p>
                    <p className="text-sm text-gray-500 mt-1">Attempted</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-semibold text-green-600">{score.correct}</p>
                    <p className="text-sm text-gray-500 mt-1">Correct</p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-semibold text-red-600">{score.total - score.correct}</p>
                    <p className="text-sm text-gray-500 mt-1">Incorrect</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-semibold text-gray-700">{formatTime(examTimer)}</p>
                    <p className="text-sm text-gray-500 mt-1">Time Taken</p>
                  </div>
                </div>

                {/* Results by Topic */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance by Topic</h2>
                  <div className="space-y-3">
                    {Object.entries(resultsByTopic).map(([topic, results]) => {
                      const topicPercentage = results.total > 0 ? Math.round((results.correct / results.total) * 100) : 0;
                      return (
                        <div key={topic} className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">{topic}</span>
                            <span className={`text-sm font-semibold ${topicPercentage >= 70 ? 'text-green-600' : 'text-red-600'}`}>
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
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors text-center"
                  >
                    Take Another Mock Exam
                  </Link>
                  <Link
                    href="/question-bank"
                    className="border border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors text-center"
                  >
                    Back to Question Bank
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) {
    return (
      <div className="h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">No questions available</p>
          <Link href="/question-bank" className="text-[#1FB8CD] hover:underline mt-4 block">
            Return to Question Bank
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#F8F9FA] flex">
      <Sidebar user={user!} onSignOut={handleSignOut} />

      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200 flex-shrink-0">
          <div className="px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
                  <ArrowLeft size={20} />
                </Link>
                <h1 className="text-lg font-semibold text-gray-900">Mock Exam</h1>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-mono text-lg font-medium">
                  {formatTime(examTimer)}
                </div>
                <span className="text-sm text-gray-500">
                  Q {currentIndex + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {score.correct}/{score.total}
                </span>
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1FB8CD] flex items-center justify-center text-white font-semibold text-sm">
                    {user?.email?.[0]?.toUpperCase() || "U"}
                  </div>
                  <CaretDown size={16} className="text-gray-400" />
                </button>
                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
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

        {/* Progress Bar */}
        <div className="bg-white border-b border-gray-200 flex-shrink-0">
          <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span className="font-medium text-gray-700">Progress</span>
                  <span>
                    {Math.round((Object.keys(answeredQuestions).length / questions.length) * 100)}% complete
                    ({Object.keys(answeredQuestions).length}/{questions.length})
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-[#1FB8CD] h-2 rounded-full transition-all"
                    style={{ width: `${(Object.keys(answeredQuestions).length / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <button
                onClick={handleSubmitExam}
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                  isSubmitting
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Exam'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex gap-6">
              {/* Question Card */}
              <div className="flex-1">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                  {/* Question Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-500">Question {currentIndex + 1}</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                        {currentQuestion.topic_area}
                      </span>
                      {currentQuestion.has_table && (
                        <span className="bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded-full font-medium">Table</span>
                      )}
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        currentQuestion.difficulty_level === "beginner"
                          ? "bg-green-50 text-green-700"
                          : currentQuestion.difficulty_level === "intermediate"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {currentQuestion.difficulty_level}
                    </span>
                  </div>

                  {/* Question Text */}
                  <div className="text-lg text-gray-900 mb-6 leading-relaxed">
                    <MathText text={currentQuestion.question_text} />
                  </div>

                  {/* Table Display */}
                  {currentQuestion.has_table && currentQuestion.table_data && (
                    <div className="mb-8 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                        <h4 className="font-medium text-gray-900 text-sm">{currentQuestion.table_data.title}</h4>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              {currentQuestion.table_data.headers.map((header: string, idx: number) => (
                                <th key={idx} className="px-4 py-3 text-left text-gray-700 font-medium border-b border-gray-200">
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

                      let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ";

                      if (showExplanation) {
                        if (isCorrect) {
                          buttonClass += "border-green-500 bg-green-50 text-green-800";
                        } else if (isSelected && !isCorrect) {
                          buttonClass += "border-red-500 bg-red-50 text-red-800";
                        } else {
                          buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                        }
                      } else {
                        if (isSelected) {
                          buttonClass += "border-[#1FB8CD] bg-[#1FB8CD]/10 text-gray-900";
                        } else {
                          buttonClass += "border-gray-200 hover:border-gray-300 text-gray-700";
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
                            <span className="font-semibold mr-3 text-gray-500">{option}.</span>
                            <span><MathText text={optionText} /></span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {showExplanation && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center mb-2">
                        {selectedAnswer === currentQuestion.correct_answer ? (
                          <span className="text-green-600 font-medium flex items-center gap-2">
                            <Check size={18} /> Correct!
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium flex items-center gap-2">
                            <X size={18} /> Incorrect. The correct answer is {currentQuestion.correct_answer}.
                          </span>
                        )}
                      </div>
                      <div className="text-gray-600 text-sm">
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
                          className="px-4 py-2 rounded-xl font-medium transition-colors border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-1"
                        >
                          <CaretLeft size={16} />
                          Previous
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {!showExplanation && (
                        <button
                          onClick={handleNext}
                          className="px-4 py-2 rounded-xl font-medium transition-colors border border-gray-200 text-gray-500 hover:bg-gray-50"
                        >
                          Skip
                        </button>
                      )}

                      {!showExplanation ? (
                        <button
                          onClick={handleSubmit}
                          disabled={!selectedAnswer}
                          className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                            selectedAnswer
                              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Submit Answer
                        </button>
                      ) : (
                        <button
                          onClick={handleNext}
                          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center gap-1"
                        >
                          {currentIndex < questions.length - 1 ? (
                            <>
                              Next
                              <CaretRight size={16} />
                            </>
                          ) : (
                            "Finish"
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Question Navigator Panel */}
              <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 sticky top-4">
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
                          <h3 className="text-sm font-semibold text-gray-900">
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
                            <span className="text-xs text-gray-400">
                              {navigatorPage * QUESTIONS_PER_PAGE + 1}-{Math.min((navigatorPage + 1) * QUESTIONS_PER_PAGE, filteredIndices.length)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setNavigatorPage(prev => Math.max(0, prev - 1))}
                            disabled={navigatorPage === 0}
                            className={`p-1 rounded ${navigatorPage === 0 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-100'}`}
                          >
                            <CaretLeft size={16} />
                          </button>

                          <div className="flex-1 grid grid-cols-5 gap-1.5">
                            {displayedIndices.length === 0 ? (
                              <div className="col-span-5 text-center text-xs text-gray-400 py-4">No questions</div>
                            ) : (
                              displayedIndices.map((index) => {
                                const answered = answeredQuestions[index];
                                let bgColor = "bg-gray-50 hover:bg-gray-100";
                                let textColor = "text-gray-600";
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
                            className={`p-1 rounded ${navigatorPage >= totalPages - 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-100'}`}
                          >
                            <CaretRight size={16} />
                          </button>
                        </div>
                      </>
                    );
                  })()}

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <button
                        onClick={() => { setNavigatorFilter(navigatorFilter === 'correct' ? null : 'correct'); setNavigatorPage(0); }}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${navigatorFilter === 'correct' ? 'bg-green-100 ring-2 ring-green-400' : 'hover:bg-gray-100'}`}
                      >
                        <div className="w-3 h-3 rounded bg-green-100 border border-green-300"></div>
                        <span>Correct</span>
                      </button>
                      <button
                        onClick={() => { setNavigatorFilter(navigatorFilter === 'wrong' ? null : 'wrong'); setNavigatorPage(0); }}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${navigatorFilter === 'wrong' ? 'bg-red-100 ring-2 ring-red-400' : 'hover:bg-gray-100'}`}
                      >
                        <div className="w-3 h-3 rounded bg-red-100 border border-red-300"></div>
                        <span>Wrong</span>
                      </button>
                      <button
                        onClick={() => { setNavigatorFilter(navigatorFilter === 'pending' ? null : 'pending'); setNavigatorPage(0); }}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${navigatorFilter === 'pending' ? 'bg-gray-200 ring-2 ring-gray-400' : 'hover:bg-gray-100'}`}
                      >
                        <div className="w-3 h-3 rounded bg-gray-50 border border-gray-300"></div>
                        <span>Pending</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
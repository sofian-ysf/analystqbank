"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface Question {
  id: number;
  topic_area: string;
  subtopic?: string;
  difficulty_level: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  correct_answer: string;
  explanation: string;
  keywords: string[];
  created_at: string;
}

const topicAreaMap: { [key: string]: string } = {
  "ethical-professional-standards": "Ethical and Professional Standards",
  "financial-statement-analysis": "Financial Statement Analysis",
  "equity-investments": "Equity Investments",
  "fixed-income": "Fixed Income",
  "portfolio-management": "Portfolio Management",
  "alternative-investments": "Alternative Investments",
  "quantitative-methods": "Quantitative Methods",
  "economics": "Economics",
  "corporate-issuers": "Corporate Issuers",
  "derivatives": "Derivatives"
};

function MultiCategoryPractice() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [sessionComplete, setSessionComplete] = useState(false);
  const supabase = createClient();

  const categories = searchParams.get('categories')?.split(',') || [];
  const selectedTopicAreas = categories.map(cat => topicAreaMap[cat]).filter(Boolean);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        await fetchQuestions();
        setLoading(false);
      }
    };
    checkUser();
  }, [router, supabase, categories]);

  const fetchQuestions = async () => {
    try {
      const allQuestions: Question[] = [];

      // Fetch questions from each selected topic area
      for (const topicArea of selectedTopicAreas) {
        const response = await fetch(`/api/questions?topic_area=${encodeURIComponent(topicArea)}&limit=5`);
        const data = await response.json();

        if (data.questions && data.questions.length > 0) {
          allQuestions.push(...data.questions);
        }
      }

      // Shuffle questions for variety
      const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
      setQuestions(shuffledQuestions.slice(0, 20)); // Limit to 20 questions total

    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions([]);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (showExplanation) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
    } else {
      setSessionComplete(true);
    }
  };

  const resetSession = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setShowExplanation(false);
    setScore({ correct: 0, total: 0 });
    setSessionComplete(false);
    fetchQuestions();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#13343B] mx-auto"></div>
          <p className="mt-4 text-[#5f6368]">Loading practice session...</p>
        </div>
      </div>
    );
  }

  if (selectedTopicAreas.length === 0) {
    return (
      <div className="min-h-screen bg-[#FBFAF4]">
        <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
          <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="text-xl font-bold text-[#13343B]">
                AnalystTrainer
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/dashboard" className="text-[#5f6368] hover:text-[#13343B] transition-colors">Dashboard</Link>
                <Link href="/practice" className="text-[#13343B] font-medium transition-colors">Practice</Link>
                <Link href="/mock-exams" className="text-[#5f6368] hover:text-[#13343B] transition-colors">Mock Exams</Link>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-[#5f6368] hover:text-[#13343B] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#1FB8CD] flex items-center justify-center text-white font-medium">
                      {user?.email?.charAt(0).toUpperCase()}
                    </div>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#EAEEEF] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link href="/profile" className="block px-4 py-2 text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]">Profile</Link>
                    <Link href="/settings" className="block px-4 py-2 text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]">Settings</Link>
                    <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]">Sign Out</button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#13343B] mb-4">No Categories Selected</h1>
            <p className="text-[#5f6368] mb-8">Please select categories from the Question Bank to start practicing.</p>
            <Link
              href="/question-bank"
              className="bg-[#1FB8CD] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1A6872] transition-colors"
            >
              Go to Question Bank
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#FBFAF4]">
        <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
          <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="text-xl font-bold text-[#13343B]">
                AnalystTrainer
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/dashboard" className="text-[#5f6368] hover:text-[#13343B] transition-colors">Dashboard</Link>
                <Link href="/practice" className="text-[#13343B] font-medium transition-colors">Practice</Link>
                <Link href="/mock-exams" className="text-[#5f6368] hover:text-[#13343B] transition-colors">Mock Exams</Link>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-[#5f6368] hover:text-[#13343B] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#1FB8CD] flex items-center justify-center text-white font-medium">
                      {user?.email?.charAt(0).toUpperCase()}
                    </div>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#EAEEEF] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link href="/profile" className="block px-4 py-2 text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]">Profile</Link>
                    <Link href="/settings" className="block px-4 py-2 text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]">Settings</Link>
                    <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]">Sign Out</button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#13343B] mb-4">Mixed Practice Session</h1>
            <p className="text-[#5f6368] mb-8">No questions available for the selected categories yet.</p>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#EAEEEF] mb-8">
              <h2 className="text-xl font-semibold text-[#13343B] mb-4">Selected Categories:</h2>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {selectedTopicAreas.map((topic, index) => (
                  <span
                    key={index}
                    className="bg-[#1FB8CD]/10 text-[#1A6872] text-sm px-3 py-1 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <p className="text-[#5f6368] mb-6">
                Our admin team is working on adding questions for these topic areas using our AI-powered question generation system.
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/question-bank"
                  className="bg-[#1FB8CD] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1A6872] transition-colors"
                >
                  Back to Question Bank
                </Link>
                <Link
                  href="/mock-exams"
                  className="border border-[#EAEEEF] text-[#5f6368] px-6 py-3 rounded-lg font-medium hover:bg-[#F3F3EE] transition-colors"
                >
                  Try Mock Exams
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    const scorePercentage = Math.round((score.correct / score.total) * 100);

    return (
      <div className="min-h-screen bg-[#FBFAF4]">
        <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
          <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="text-xl font-bold text-[#13343B]">
                AnalystTrainer
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/dashboard" className="text-[#5f6368] hover:text-[#13343B] transition-colors">Dashboard</Link>
                <Link href="/practice" className="text-[#13343B] font-medium transition-colors">Practice</Link>
                <Link href="/mock-exams" className="text-[#5f6368] hover:text-[#13343B] transition-colors">Mock Exams</Link>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-[#5f6368] hover:text-[#13343B] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#1FB8CD] flex items-center justify-center text-white font-medium">
                      {user?.email?.charAt(0).toUpperCase()}
                    </div>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#EAEEEF] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link href="/profile" className="block px-4 py-2 text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]">Profile</Link>
                    <Link href="/settings" className="block px-4 py-2 text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]">Settings</Link>
                    <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]">Sign Out</button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#13343B] mb-2">Mixed Practice Session</h1>
            <p className="text-[#5f6368] mb-8">Session Complete</p>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#EAEEEF] mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-6">Your Results</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600">{score.correct}</p>
                  <p className="text-sm text-[#5f6368]">Correct</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-red-600">{score.total - score.correct}</p>
                  <p className="text-sm text-[#5f6368]">Incorrect</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#1FB8CD]">{scorePercentage}%</p>
                  <p className="text-sm text-[#5f6368]">Score</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#13343B] mb-3">Categories Practiced:</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {selectedTopicAreas.map((topic, index) => (
                    <span
                      key={index}
                      className="bg-[#1FB8CD]/10 text-[#1A6872] text-sm px-3 py-1 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetSession}
                  className="bg-[#1FB8CD] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1A6872] transition-colors"
                >
                  Practice Again
                </button>
                <Link
                  href="/question-bank"
                  className="border border-[#EAEEEF] text-[#5f6368] px-6 py-3 rounded-lg font-medium hover:bg-[#F3F3EE] transition-colors"
                >
                  Question Bank
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrectAnswer = showExplanation && selectedAnswer === currentQuestion.correct_answer;

  return (
    <div className="min-h-screen bg-[#FBFAF4]">
      <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-xl font-bold text-[#13343B]">
              AnalystTrainer
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <span className="text-sm text-[#5f6368]">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-[#1FB8CD]">
                Score: {score.correct}/{score.total}
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
                  <Link href="/profile" className="block px-4 py-2 text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]">Profile</Link>
                  <Link href="/settings" className="block px-4 py-2 text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]">Settings</Link>
                  <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]">Sign Out</button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Mixed Practice Session</span>
            <span>Progress: {Math.round((currentQuestionIndex / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gray-900 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-6">
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Question {currentQuestionIndex + 1}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{currentQuestion.topic_area}</p>
              </div>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {currentQuestion.difficulty_level}
              </span>
            </div>
            <p className="text-gray-800 leading-relaxed">{currentQuestion.question_text}</p>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {['A', 'B', 'C'].map((option) => {
              const optionText = currentQuestion[`option_${option.toLowerCase()}` as keyof Question] as string;
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correct_answer;

              let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";

              if (showExplanation) {
                if (isCorrect) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800";
                } else if (isSelected && !isCorrect) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
                }
              } else {
                if (isSelected) {
                  buttonClass += "border-gray-900 bg-gray-900 text-white";
                } else {
                  buttonClass += "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50";
                }
              }

              return (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  className={buttonClass}
                  disabled={showExplanation}
                >
                  <div className="flex items-center">
                    <span className="font-semibold mr-3">{option}.</span>
                    <span>{optionText}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="border-t pt-6">
              <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  isCorrectAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {isCorrectAnswer ? '✓ Correct' : '✗ Incorrect'}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Explanation:</h4>
                <p className="text-gray-700">{currentQuestion.explanation}</p>
              </div>
              {currentQuestion.keywords && currentQuestion.keywords.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Keywords:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentQuestion.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Button */}
          <div className="mt-6 flex justify-end">
            {!showExplanation ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Session'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <MultiCategoryPractice />
    </Suspense>
  );
}
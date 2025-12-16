"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

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
  has_table?: boolean;
  table_data?: TableData;
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

export default function CategoryPractice() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [sessionComplete, setSessionComplete] = useState(false);
  const supabase = createClient();

  const categoryId = params.categoryId as string;
  const topicArea = topicAreaMap[categoryId];

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
  }, [router, supabase, categoryId]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`/api/questions?topic_area=${encodeURIComponent(topicArea)}&limit=10`);
      const data = await response.json();

      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
      } else {
        // No questions in database for this topic - show message
        setQuestions([]);
      }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading practice session...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/question-bank" className="text-xl font-bold text-gray-900">
                CFA Level 1 Prep
              </Link>
              <span className="text-sm text-gray-600">{user?.email}</span>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{topicArea}</h1>
              <p className="text-gray-600">No questions available for this topic area yet.</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Questions Coming Soon</h2>
              <p className="text-gray-600 mb-6">
                Our admin team is working on adding high-quality CFA Level 1 questions for this topic area using our AI-powered question generation system.
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/question-bank"
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800"
                >
                  Back to Question Bank
                </Link>
                <Link
                  href="/mock-exams"
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50"
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
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/question-bank" className="text-xl font-bold text-gray-900">
                CFA Level 1 Prep
              </Link>
              <span className="text-sm text-gray-600">{user?.email}</span>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{topicArea}</h1>
              <p className="text-gray-600">Practice Session Complete</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Results</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600">{score.correct}</p>
                  <p className="text-sm text-gray-600">Correct</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-red-600">{score.total - score.correct}</p>
                  <p className="text-sm text-gray-600">Incorrect</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600">{scorePercentage}%</p>
                  <p className="text-sm text-gray-600">Score</p>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetSession}
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800"
                >
                  Practice Again
                </button>
                <Link
                  href="/question-bank"
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50"
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/question-bank" className="text-xl font-bold text-gray-900">
              CFA Level 1 Prep
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-600">
                Score: {score.correct}/{score.total}
              </span>
              <span className="text-sm text-gray-600">{user?.email}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{topicArea}</span>
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
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  Question {currentQuestionIndex + 1}
                </h2>
                {currentQuestion.has_table && (
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-medium">
                    Table
                  </span>
                )}
              </div>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {currentQuestion.difficulty_level}
              </span>
            </div>
            <p className="text-gray-800 leading-relaxed">{currentQuestion.question_text}</p>

            {/* Table Display */}
            {currentQuestion.has_table && currentQuestion.table_data && (
              <div className="mt-4 bg-white border border-amber-200 rounded-lg overflow-hidden shadow-sm">
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
                            <td className="px-4 py-3 text-gray-700 font-medium border-b border-gray-100">
                              {row.label}
                            </td>
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
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import MathText from "@/components/MathText";

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

function PracticeSessionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [sessionComplete, setSessionComplete] = useState(false);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<{ [key: number]: { answer: string; isCorrect: boolean } }>({});
  const [navigatorPage, setNavigatorPage] = useState(0);
  const [navigatorFilter, setNavigatorFilter] = useState<'correct' | 'wrong' | 'pending' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  const QUESTIONS_PER_PAGE = 50; // 10 rows x 5 columns

  const categoriesParam = searchParams.get("categories");
  const limitParam = searchParams.get("limit");
  const filterParam = searchParams.get("filter") as "all" | "wrong" | "correct" | "unanswered" | null;
  const subtopicsParam = searchParams.get("subtopics");
  const categories = categoriesParam ? categoriesParam.split(",") : [];

  useEffect(() => {
    // Only fetch once
    if (questionsLoaded) return;

    const categoryList = categoriesParam ? categoriesParam.split(",") : [];
    const subtopicList = subtopicsParam ? subtopicsParam.split(",").map(s => decodeURIComponent(s)) : [];
    const questionLimit = limitParam === "all" ? null : (limitParam ? parseInt(limitParam, 10) : 50);
    const questionFilter = filterParam || "all";

    const initSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);

      if (categoryList.length === 0) {
        setLoading(false);
        return;
      }

      // Convert category IDs to database topic names
      const topicNames = categoryList
        .map((cat) => topicIdToDbName[cat])
        .filter(Boolean);

      if (topicNames.length === 0) {
        setLoading(false);
        return;
      }

      // Fetch user's previous attempts for these topics
      let userAttempts: { question_id: string; is_correct: boolean; selected_answer: string }[] = [];
      try {
        const { data: attempts } = await supabase
          .from('user_question_attempts')
          .select('question_id, is_correct, selected_answer')
          .eq('user_id', user.id)
          .in('topic_area', topicNames);

        if (attempts) {
          userAttempts = attempts;
        }
      } catch {
        console.log('Note: Could not fetch previous attempts');
      }

      // Build a map of question_id -> latest attempt result
      const attemptMap = new Map<string, { is_correct: boolean; selected_answer: string }>();
      userAttempts.forEach(attempt => {
        // Keep the latest attempt (overwrites previous)
        attemptMap.set(attempt.question_id, {
          is_correct: attempt.is_correct,
          selected_answer: attempt.selected_answer
        });
      });

      // Fetch questions from each category to ensure even distribution
      const allQuestions: Question[] = [];
      const questionsPerCategory = questionLimit
        ? Math.ceil(questionLimit / topicNames.length)
        : 500; // For "all", get up to 500 per category

      // Fetch from each category separately to ensure coverage
      for (const topicName of topicNames) {
        let query = supabase
          .from("questions")
          .select("*")
          .eq("topic_area", topicName)
          .eq("is_active", true);

        // If subtopics are specified, filter by them
        if (subtopicList.length > 0) {
          query = query.in("subtopic", subtopicList);
        }

        const { data, error } = await query.limit(questionsPerCategory);

        if (error) {
          console.error(`Error fetching questions for ${topicName}:`, error);
          continue;
        }

        if (data && data.length > 0) {
          allQuestions.push(...data);
        }
      }

      if (allQuestions.length === 0) {
        setLoading(false);
        return;
      }

      // Filter questions based on the filter parameter
      let filteredQuestions = allQuestions;
      if (questionFilter === "wrong") {
        filteredQuestions = allQuestions.filter(q => {
          const attempt = attemptMap.get(q.id);
          return attempt && !attempt.is_correct;
        });
      } else if (questionFilter === "correct") {
        filteredQuestions = allQuestions.filter(q => {
          const attempt = attemptMap.get(q.id);
          return attempt && attempt.is_correct;
        });
      } else if (questionFilter === "unanswered") {
        filteredQuestions = allQuestions.filter(q => !attemptMap.has(q.id));
      }

      if (filteredQuestions.length === 0) {
        setLoading(false);
        return;
      }

      // Shuffle all questions together
      const shuffled = shuffleArray(filteredQuestions);

      // Apply the limit if specified
      const finalQuestions = questionLimit
        ? shuffled.slice(0, questionLimit)
        : shuffled;

      // Pre-populate answeredQuestions with previous WRONG answers
      // These will show as red in the navigator until answered correctly
      const prePopulatedAnswers: { [key: number]: { answer: string; isCorrect: boolean } } = {};
      finalQuestions.forEach((question, index) => {
        const previousAttempt = attemptMap.get(question.id);
        if (previousAttempt && !previousAttempt.is_correct) {
          prePopulatedAnswers[index] = {
            answer: previousAttempt.selected_answer,
            isCorrect: false
          };
        }
      });
      setAnsweredQuestions(prePopulatedAnswers);

      // Update score to reflect pre-populated wrong answers
      const wrongCount = Object.keys(prePopulatedAnswers).length;
      if (wrongCount > 0) {
        setScore({ correct: 0, total: wrongCount });
      }

      setQuestions(finalQuestions);

      setQuestionsLoaded(true);
      setLoading(false);
    };

    initSession();
  }, [categoriesParam, limitParam, filterParam, subtopicsParam, questionsLoaded, router, supabase]);

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

    // Only update score if this question hasn't been answered before
    if (!answeredQuestions[currentIndex]) {
      setScore((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        total: prev.total + 1,
      }));
    }

    // Save the answer for this question
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

      // Update navigator page if needed
      const targetPage = Math.floor(nextIndex / QUESTIONS_PER_PAGE);
      if (targetPage !== navigatorPage) {
        setNavigatorPage(targetPage);
      }

      // Restore previous answer if exists
      const previousAnswer = answeredQuestions[nextIndex];
      if (previousAnswer) {
        setSelectedAnswer(previousAnswer.answer);
        setShowExplanation(true);
      } else {
        setSelectedAnswer(null);
        setShowExplanation(false);
      }
    } else {
      setSessionComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);

      // Update navigator page if needed
      const targetPage = Math.floor(prevIndex / QUESTIONS_PER_PAGE);
      if (targetPage !== navigatorPage) {
        setNavigatorPage(targetPage);
      }

      // Restore previous answer if exists
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

  const handleRestart = () => {
    setQuestions(shuffleArray(questions));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore({ correct: 0, total: 0 });
    setSessionComplete(false);
    setAnsweredQuestions({});
    setNavigatorPage(0);
    setNavigatorFilter(null);
  };

  const handleGoToQuestion = (index: number) => {
    setCurrentIndex(index);

    // Update navigator page if question is outside current view
    const targetPage = Math.floor(index / QUESTIONS_PER_PAGE);
    if (targetPage !== navigatorPage) {
      setNavigatorPage(targetPage);
    }

    // Restore previous answer if exists
    const previousAnswer = answeredQuestions[index];
    if (previousAnswer) {
      setSelectedAnswer(previousAnswer.answer);
      setShowExplanation(true);
    } else {
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleSubmitSession = async () => {
    if (!user || Object.keys(answeredQuestions).length === 0) return;

    setIsSubmitting(true);

    try {
      // Create a practice session record
      const { data: sessionData, error: sessionError } = await supabase
        .from('practice_sessions')
        .insert({
          user_id: user.id,
          total_questions: questions.length,
          attempted_count: Object.keys(answeredQuestions).length,
          correct_count: score.correct,
          categories: categories,
          completed_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (sessionError) {
        console.error('Error creating session:', sessionError);
        // Continue to save attempts even if session creation fails
      }

      // Prepare question attempts for batch insert
      const attempts = Object.entries(answeredQuestions).map(([indexStr, attempt]) => {
        const index = parseInt(indexStr, 10);
        const question = questions[index];
        return {
          user_id: user.id,
          question_id: question.id,
          session_id: sessionData?.id || null,
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
        alert('There was an error saving your session. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Navigate to session complete view
      setSessionComplete(true);
    } catch (error) {
      console.error('Error submitting session:', error);
      alert('There was an error saving your session. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1FB8CD] mx-auto"></div>
          <p className="mt-4 text-[#5f6368]">Loading practice session...</p>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-[#13343B] mb-4">
            No Categories Selected
          </h1>
          <p className="text-[#5f6368] mb-6">
            Please select at least one category to practice.
          </p>
          <Link
            href="/question-bank"
            className="bg-[#1FB8CD] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1A6872] transition-colors"
          >
            Go to Question Bank
          </Link>
        </div>
      </div>
    );
  }

  if (questions.length === 0 && !loading) {
    const filterMessages: { [key: string]: string } = {
      wrong: "You haven't gotten any questions wrong in the selected categories yet. Great job!",
      correct: "You haven't answered any questions correctly in the selected categories yet.",
      unanswered: "You've already answered all questions in the selected categories.",
      all: "There are no questions available for the selected categories yet."
    };

    return (
      <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-[#13343B] mb-4">
            No Questions Found
          </h1>
          <p className="text-[#5f6368] mb-6">
            {filterMessages[filterParam || "all"]}
          </p>
          <Link
            href="/question-bank"
            className="bg-[#1FB8CD] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1A6872] transition-colors"
          >
            Go to Question Bank
          </Link>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    const percentage = Math.round((score.correct / score.total) * 100);

    return (
      <div className="min-h-screen bg-[#FBFAF4]">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
          <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
            <div className="flex h-16 items-center justify-between">
              <Link href="/dashboard">
                <Image
                  src="/logo.png"
                  alt="AnalystTrainer"
                  width={180}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-[#5f6368]">{user?.email}</span>
              </div>
            </div>
          </nav>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-sm border border-[#EAEEEF] p-8 text-center">
            <h1 className="text-3xl font-bold text-[#13343B] mb-4">
              Session Complete!
            </h1>

            <div className="my-8">
              <div
                className={`text-6xl font-bold ${
                  percentage >= 70
                    ? "text-green-600"
                    : percentage >= 50
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {percentage}%
              </div>
              <p className="text-[#5f6368] mt-2">
                {score.correct} out of {score.total} correct
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 my-8">
              <div className="bg-[#F3F3EE] rounded-lg p-4">
                <p className="text-2xl font-bold text-[#13343B]">
                  {score.total}
                </p>
                <p className="text-sm text-[#5f6368]">Questions</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-green-600">
                  {score.correct}
                </p>
                <p className="text-sm text-[#5f6368]">Correct</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-red-600">
                  {score.total - score.correct}
                </p>
                <p className="text-sm text-[#5f6368]">Incorrect</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRestart}
                className="bg-[#1FB8CD] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1A6872] transition-colors"
              >
                Practice Again
              </button>
              <Link
                href="/question-bank"
                className="border border-[#EAEEEF] text-[#5f6368] px-6 py-3 rounded-lg font-medium hover:bg-[#F3F3EE] transition-colors"
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

  return (
    <div className="min-h-screen bg-[#FBFAF4]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/dashboard">
              <Image
                src="/logo.png"
                alt="AnalystTrainer"
                width={180}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <span className="text-sm text-[#5f6368]">
                Question {currentIndex + 1} of {questions.length}
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
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-[#5f6368] hover:bg-[#F3F3EE] hover:text-[#13343B]"
                  >
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

      {/* Progress Bar */}
      <div className="bg-white border-b border-[#EAEEEF]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-xs text-[#5f6368] mb-1">
                <span>{currentQuestion.topic_area}</span>
                <span>
                  {Math.round((Object.keys(answeredQuestions).length / questions.length) * 100)}%
                  complete ({Object.keys(answeredQuestions).length}/{questions.length} attempted)
                </span>
              </div>
              <div className="w-full bg-[#EAEEEF] rounded-full h-2">
                <div
                  className="bg-[#1FB8CD] h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(Object.keys(answeredQuestions).length / questions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <button
              onClick={handleSubmitSession}
              disabled={isSubmitting || Object.keys(answeredQuestions).length === 0}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                isSubmitting || Object.keys(answeredQuestions).length === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#1FB8CD] text-white hover:bg-[#1A6872]'
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Submit Session'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content with Question Navigator */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Question Card */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-[#EAEEEF] p-6 sm:p-8">
          {/* Question Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#5f6368]">
                Question {currentIndex + 1}
              </span>
              {currentQuestion.has_table && (
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-medium">
                  Table
                </span>
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

          {/* Answer Options */}
          <div className="space-y-3">
            {["A", "B", "C"].map((option) => {
              const optionKey =
                `option_${option.toLowerCase()}` as keyof Question;
              const optionText = currentQuestion[optionKey] as string;
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correct_answer;

              let buttonClass =
                "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";

              if (showExplanation) {
                if (isCorrect) {
                  buttonClass +=
                    "border-green-500 bg-green-50 text-green-800";
                } else if (isSelected && !isCorrect) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass +=
                    "border-[#EAEEEF] bg-[#F3F3EE] text-[#5f6368]";
                }
              } else {
                if (isSelected) {
                  buttonClass +=
                    "border-[#1FB8CD] bg-[#1FB8CD]/10 text-[#13343B]";
                } else {
                  buttonClass +=
                    "border-[#EAEEEF] hover:border-[#1FB8CD] text-[#13343B]";
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
                    <span className="font-semibold mr-3 text-[#5f6368]">
                      {option}.
                    </span>
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
                  <span className="text-green-600 font-medium">
                    Correct!
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">
                    Incorrect. The correct answer is{" "}
                    {currentQuestion.correct_answer}.
                  </span>
                )}
              </div>
              <div className="text-[#5f6368] text-sm">
                <MathText text={currentQuestion.explanation} />
              </div>
              {currentQuestion.keywords &&
                currentQuestion.keywords.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {currentQuestion.keywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white px-2 py-1 rounded text-[#5f6368]"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link
                href="/question-bank"
                className="text-[#5f6368] hover:text-[#13343B] text-sm"
              >
                Exit Session
              </Link>
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
                    "See Results"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Progress */}
        <div className="md:hidden mt-4 text-center text-sm text-[#5f6368]">
          Question {currentIndex + 1} of {questions.length} | Score:{" "}
          {score.correct}/{score.total}
        </div>
      </div>

          {/* Question Navigator Panel */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-[#EAEEEF] p-4 sticky top-24">
              {(() => {
                // Filter question indices based on active filter
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
                        Question Navigator
                        {navigatorFilter && (
                          <button
                            onClick={() => { setNavigatorFilter(null); setNavigatorPage(0); }}
                            className="ml-2 text-xs text-[#1FB8CD] hover:underline font-normal"
                          >
                            Clear filter
                          </button>
                        )}
                      </h3>
                      {filteredIndices.length > QUESTIONS_PER_PAGE && (
                        <span className="text-xs text-[#5f6368]">
                          {navigatorPage * QUESTIONS_PER_PAGE + 1}-{Math.min((navigatorPage + 1) * QUESTIONS_PER_PAGE, filteredIndices.length)} of {filteredIndices.length}
                        </span>
                      )}
                    </div>

                    {/* Navigation Arrows and Grid */}
                    <div className="flex items-center gap-2">
                      {/* Left Arrow */}
                      <button
                        onClick={() => setNavigatorPage(prev => Math.max(0, prev - 1))}
                        disabled={navigatorPage === 0}
                        className={`p-1 rounded ${navigatorPage === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#5f6368] hover:bg-[#F3F3EE]'}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      {/* Question Grid */}
                      <div className="flex-1 grid grid-cols-5 gap-1.5">
                        {displayedIndices.length === 0 ? (
                          <div className="col-span-5 text-center text-xs text-[#5f6368] py-4">
                            No questions
                          </div>
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

                      {/* Right Arrow */}
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

export default function PracticeSession() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1FB8CD] mx-auto"></div>
            <p className="mt-4 text-[#5f6368]">Loading...</p>
          </div>
        </div>
      }
    >
      <PracticeSessionContent />
    </Suspense>
  );
}

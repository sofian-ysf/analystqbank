"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface Category {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  completedCount: number;
  icon: string;
  color: string;
}

const categories: Category[] = [
  {
    id: "quantitative-methods",
    name: "Quantitative Methods",
    description: "Statistical concepts, probability, and hypothesis testing",
    questionCount: 150,
    completedCount: 0,
    icon: "📊",
    color: "bg-blue-500"
  },
  {
    id: "economics",
    name: "Economics",
    description: "Microeconomics, macroeconomics, and international trade",
    questionCount: 120,
    completedCount: 0,
    icon: "📈",
    color: "bg-green-500"
  },
  {
    id: "financial-reporting",
    name: "Financial Reporting & Analysis",
    description: "Financial statements, ratios, and accounting principles",
    questionCount: 200,
    completedCount: 0,
    icon: "📋",
    color: "bg-purple-500"
  },
  {
    id: "ethics",
    name: "Ethics & Professional Standards",
    description: "CFA Institute Code of Ethics and Standards of Practice",
    questionCount: 80,
    completedCount: 0,
    icon: "⚖️",
    color: "bg-yellow-500"
  },
  {
    id: "fixed-income",
    name: "Fixed Income",
    description: "Bonds, yields, duration, and fixed income analytics",
    questionCount: 140,
    completedCount: 0,
    icon: "🏦",
    color: "bg-indigo-500"
  },
  {
    id: "equity",
    name: "Equity Investments",
    description: "Equity markets, valuation, and equity portfolio management",
    questionCount: 160,
    completedCount: 0,
    icon: "📊",
    color: "bg-red-500"
  },
  {
    id: "derivatives",
    name: "Derivatives",
    description: "Options, futures, forwards, and swaps",
    questionCount: 100,
    completedCount: 0,
    icon: "🔄",
    color: "bg-pink-500"
  },
  {
    id: "portfolio-management",
    name: "Portfolio Management",
    description: "Asset allocation, risk management, and performance evaluation",
    questionCount: 130,
    completedCount: 0,
    icon: "💼",
    color: "bg-teal-500"
  }
];

export default function QuestionBank() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getProgressPercentage = (completed: number, total: number) => {
    return total > 0 ? (completed / total) * 100 : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading question bank...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-xl font-bold text-gray-900">
                Finance Exam Prep
              </Link>
              <nav className="ml-10 flex space-x-8">
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/question-bank" className="text-gray-900 font-medium">
                  Question Bank
                </Link>
                <Link href="/research-hubs" className="text-gray-600 hover:text-gray-900">
                  Research Hubs
                </Link>
                <Link href="/mock-exams" className="text-gray-600 hover:text-gray-900">
                  Mock Exams
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/settings" className="text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
                Settings
              </Link>
              <span className="text-sm text-gray-600">{user?.email}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Question Bank</h1>
          <p className="text-gray-600">
            Select categories to practice questions or access research materials. Track your progress across all topics.
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
                  setSelectedCategories(categories.map(cat => cat.id));
                } else {
                  setSelectedCategories([]);
                }
              }}
              checked={selectedCategories.length === categories.length}
              className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
            />
            <label htmlFor="select-all" className="text-sm font-medium text-gray-700">
              Select All Categories
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

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category.id);
            const progressPercentage = getProgressPercentage(category.completedCount, category.questionCount);

            return (
              <div
                key={category.id}
                className={`bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-gray-900 ring-2 ring-gray-900 ring-opacity-20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleCategoryToggle(category.id)}
              >
                {/* Category Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center text-white text-lg`}>
                      {category.icon}
                    </div>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="ml-3 h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>

                {/* Category Info */}
                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{category.completedCount}/{category.questionCount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${category.color}`}
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Link
                    href={`/practice/${category.id}`}
                    className="flex-1 bg-gray-900 text-white text-center py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-800"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Practice
                  </Link>
                  <Link
                    href={`/research-hubs/${category.id}`}
                    className="flex-1 border border-gray-300 text-gray-700 text-center py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Study
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistics Summary */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Overall Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{categories.reduce((sum, cat) => sum + cat.questionCount, 0)}</p>
              <p className="text-sm text-gray-600">Total Questions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{categories.reduce((sum, cat) => sum + cat.completedCount, 0)}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{categories.length}</p>
              <p className="text-sm text-gray-600">Categories</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">
                {Math.round((categories.reduce((sum, cat) => sum + cat.completedCount, 0) / categories.reduce((sum, cat) => sum + cat.questionCount, 0)) * 100) || 0}%
              </p>
              <p className="text-sm text-gray-600">Overall Progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
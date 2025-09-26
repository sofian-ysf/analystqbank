"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface ResearchHub {
  id: string;
  name: string;
  description: string;
  topics: string[];
  studyMaterials: number;
  practiceQuestions: number;
  icon: string;
  color: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const researchHubs: ResearchHub[] = [
  {
    id: "quantitative-methods",
    name: "Quantitative Methods Hub",
    description: "Master statistical concepts, probability theory, and hypothesis testing with comprehensive study materials and practice problems.",
    topics: ["Descriptive Statistics", "Probability Distributions", "Hypothesis Testing", "Regression Analysis", "Time Series Analysis"],
    studyMaterials: 45,
    practiceQuestions: 150,
    icon: "📊",
    color: "bg-blue-500",
    difficulty: "Intermediate"
  },
  {
    id: "economics",
    name: "Economics Hub",
    description: "Explore microeconomics, macroeconomics, and international trade theory with real-world applications.",
    topics: ["Supply & Demand", "Market Structures", "GDP & Inflation", "Monetary Policy", "International Trade"],
    studyMaterials: 38,
    practiceQuestions: 120,
    icon: "📈",
    color: "bg-green-500",
    difficulty: "Beginner"
  },
  {
    id: "financial-reporting",
    name: "Financial Reporting Hub",
    description: "Deep dive into financial statements, accounting principles, and financial analysis techniques.",
    topics: ["Financial Statements", "Revenue Recognition", "Asset Valuation", "Financial Ratios", "Cash Flow Analysis"],
    studyMaterials: 52,
    practiceQuestions: 200,
    icon: "📋",
    color: "bg-purple-500",
    difficulty: "Advanced"
  },
  {
    id: "ethics",
    name: "Ethics & Standards Hub",
    description: "Learn the CFA Institute Code of Ethics and Standards of Professional Conduct with case studies.",
    topics: ["Code of Ethics", "Standards of Practice", "Asset Manager Code", "Research Objectivity", "Client Relations"],
    studyMaterials: 25,
    practiceQuestions: 80,
    icon: "⚖️",
    color: "bg-yellow-500",
    difficulty: "Beginner"
  },
  {
    id: "fixed-income",
    name: "Fixed Income Hub",
    description: "Comprehensive coverage of bond markets, yields, duration, and fixed income portfolio management.",
    topics: ["Bond Valuation", "Yield Measures", "Duration & Convexity", "Credit Analysis", "Fixed Income Strategies"],
    studyMaterials: 41,
    practiceQuestions: 140,
    icon: "🏦",
    color: "bg-indigo-500",
    difficulty: "Advanced"
  },
  {
    id: "equity",
    name: "Equity Investments Hub",
    description: "Master equity markets, valuation techniques, and equity portfolio management strategies.",
    topics: ["Equity Valuation", "Market Efficiency", "Behavioral Finance", "Industry Analysis", "Portfolio Construction"],
    studyMaterials: 47,
    practiceQuestions: 160,
    icon: "📊",
    color: "bg-red-500",
    difficulty: "Intermediate"
  },
  {
    id: "derivatives",
    name: "Derivatives Hub",
    description: "Explore options, futures, forwards, and swaps with practical trading and risk management applications.",
    topics: ["Options Strategies", "Futures Contracts", "Swaps", "Risk Management", "Arbitrage"],
    studyMaterials: 33,
    practiceQuestions: 100,
    icon: "🔄",
    color: "bg-pink-500",
    difficulty: "Advanced"
  },
  {
    id: "portfolio-management",
    name: "Portfolio Management Hub",
    description: "Learn asset allocation, risk management, and performance evaluation for optimal portfolio construction.",
    topics: ["Asset Allocation", "Risk Budgeting", "Performance Attribution", "Alternative Investments", "ESG Investing"],
    studyMaterials: 39,
    practiceQuestions: 130,
    icon: "💼",
    color: "bg-teal-500",
    difficulty: "Advanced"
  }
];

export default function ResearchHubs() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredHubs = researchHubs.filter(hub => {
    const matchesDifficulty = selectedDifficulty === 'all' || hub.difficulty === selectedDifficulty;
    const matchesSearch = hub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hub.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hub.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDifficulty && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading research hubs...</p>
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
                <Link href="/question-bank" className="text-gray-600 hover:text-gray-900">
                  Question Bank
                </Link>
                <Link href="/research-hubs" className="text-gray-900 font-medium">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Research Hubs</h1>
          <p className="text-gray-600">
            Access comprehensive study materials, reading lists, and practice questions organized by topic areas.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search hubs, topics, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Research Hubs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredHubs.map((hub) => (
            <div key={hub.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Hub Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 ${hub.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                      {hub.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-gray-900">{hub.name}</h3>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        hub.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        hub.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {hub.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{hub.description}</p>

                {/* Stats */}
                <div className="flex space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {hub.studyMaterials} Study Materials
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {hub.practiceQuestions} Questions
                  </div>
                </div>
              </div>

              {/* Topics */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Key Topics Covered</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {hub.topics.map((topic, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link
                    href={`/research-hubs/${hub.id}/study`}
                    className="flex-1 bg-gray-900 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Study Materials
                  </Link>
                  <Link
                    href={`/research-hubs/${hub.id}/practice`}
                    className="flex-1 border border-gray-300 text-gray-700 text-center py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Practice Questions
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredHubs.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No research hubs found</h3>
            <p className="text-gray-600">Try adjusting your search terms or difficulty filter.</p>
          </div>
        )}

        {/* Study Tips Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">How to Use Research Hubs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Study First</h4>
              <p className="text-sm text-gray-600">Review comprehensive materials and key concepts for each topic area.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Practice</h4>
              <p className="text-sm text-gray-600">Test your knowledge with targeted practice questions and explanations.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Track Progress</h4>
              <p className="text-sm text-gray-600">Monitor your improvement and identify areas that need more attention.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
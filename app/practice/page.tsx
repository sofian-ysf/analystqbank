"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { cfaLevel1Curriculum } from "@/lib/curriculum";

export default function Practice() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
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
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#13343B] mx-auto"></div>
          <p className="mt-4 text-[#5f6368]">Loading practice questions...</p>
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
              <Link href="/practice" className="text-[#13343B] font-medium transition-colors">
                Practice
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
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#13343B] mb-2">Practice Questions</h1>
          <p className="text-[#5f6368]">
            Select topics to practice. Question distribution follows official CFA Level 1 exam weightings.
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
              className="h-4 w-4 text-[#1FB8CD] focus:ring-[#1FB8CD] border-gray-300 rounded"
            />
            <label htmlFor="select-all" className="text-sm font-medium text-[#5f6368]">
              Select All Topics
            </label>
          </div>
          {selectedCategories.length > 0 && (
            <Link
              href={`/practice/session?categories=${selectedCategories.join(',')}`}
              className="bg-[#1FB8CD] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1A6872] transition-colors"
            >
              Start Practice ({selectedCategories.length} {selectedCategories.length === 1 ? 'topic' : 'topics'})
            </Link>
          )}
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          {cfaLevel1Curriculum.map((topic) => {
            const isTopicSelected = selectedCategories.includes(topic.id);
            const isExpanded = expandedTopics.includes(topic.id);
            const progressPercentage = getProgressPercentage(0, topic.questionCount);

            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-sm border border-[#EAEEEF]">
                {/* Main Topic Header */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <div className={`w-12 h-12 ${topic.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                        {topic.icon}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center space-x-3 flex-wrap gap-y-2">
                          <h3 className="font-bold text-[#13343B] text-lg">{topic.name}</h3>
                          <span className="text-xs px-2 py-1 bg-[#F3F3EE] text-[#5f6368] rounded-full font-medium">
                            {topic.examWeight}
                          </span>
                          <span className="text-xs px-2 py-1 bg-[#1FB8CD]/10 text-[#1A6872] rounded-full font-medium">
                            {topic.questionCount} questions
                          </span>
                        </div>
                        <p className="text-sm text-[#5f6368] mt-1">{topic.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={isTopicSelected}
                        onChange={() => handleCategoryToggle(topic.id)}
                        className="h-5 w-5 text-[#1FB8CD] focus:ring-[#1FB8CD] border-gray-300 rounded"
                      />
                      <button
                        onClick={() => handleTopicToggle(topic.id)}
                        className="p-2 hover:bg-[#F3F3EE] rounded-lg transition-colors"
                      >
                        <svg
                          className={`w-5 h-5 text-[#5f6368] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
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
                    <div className="flex justify-between text-xs text-[#5f6368] mb-1">
                      <span>Progress</span>
                      <span>0/{topic.questionCount}</span>
                    </div>
                    <div className="w-full bg-[#EAEEEF] rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${topic.color}`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Topic Action Button */}
                  <div className="mt-4">
                    <Link
                      href={`/practice/${topic.id}`}
                      className="inline-block bg-[#13343B] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1A6872] transition-colors"
                    >
                      Practice This Topic
                    </Link>
                  </div>
                </div>

                {/* Subtopics (Expandable) */}
                {isExpanded && (
                  <div className="border-t border-[#EAEEEF] bg-[#F3F3EE] p-6">
                    <h4 className="text-sm font-semibold text-[#13343B] mb-4">
                      Subtopics ({topic.subtopics.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {topic.subtopics.map((subtopic) => (
                        <div
                          key={subtopic.id}
                          className="bg-white rounded-lg p-4 border border-[#EAEEEF] hover:border-[#1FB8CD] transition-all"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="text-sm font-medium text-[#13343B] flex-1">
                              {subtopic.name}
                            </h5>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[#5f6368]">
                              {subtopic.learningOutcomes} Learning Outcomes
                            </span>
                            <Link
                              href={`/practice/${topic.id}/${subtopic.id}`}
                              className="text-xs text-[#1FB8CD] font-medium hover:text-[#1A6872]"
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
        <div className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-[#EAEEEF]">
          <h3 className="text-xl font-bold text-[#13343B] mb-4">Your Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#13343B]">
                {cfaLevel1Curriculum.reduce((sum, topic) => sum + topic.questionCount, 0)}
              </p>
              <p className="text-sm text-[#5f6368]">Total Questions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">0</p>
              <p className="text-sm text-[#5f6368]">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#1FB8CD]">{cfaLevel1Curriculum.length}</p>
              <p className="text-sm text-[#5f6368]">Topics</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#1A6872]">0%</p>
              <p className="text-sm text-[#5f6368]">Overall Progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

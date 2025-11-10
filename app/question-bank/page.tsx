"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { cfaLevel1Curriculum } from "@/lib/curriculum";

export default function QuestionBank() {
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
                CFA Level 1 Prep
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
            const progressPercentage = getProgressPercentage(0, topic.questionCount); // TODO: Get actual progress from database

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
                            {topic.questionCount} questions
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
                      <span>Overall Progress</span>
                      <span>0/{topic.questionCount}</span>
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
                {cfaLevel1Curriculum.reduce((sum, topic) => sum + topic.questionCount, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Questions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">0</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{cfaLevel1Curriculum.length}</p>
              <p className="text-sm text-gray-600">Main Topics</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">
                {cfaLevel1Curriculum.reduce((sum, topic) => sum + topic.subtopics.length, 0)}
              </p>
              <p className="text-sm text-gray-600">Subtopics</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">0%</p>
              <p className="text-sm text-gray-600">Overall Progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
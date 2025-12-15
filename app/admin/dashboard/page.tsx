'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cfaLevel1Curriculum } from '@/lib/curriculum';
import { createClient } from '@/lib/supabase';
import { CFA_2026_LEARNING_OBJECTIVES, getLearningObjectivesForTopic, getReadingsForTopic, type LearningObjective, type Reading } from '@/lib/learning-objectives-2026';

interface User {
  id: string;
  email: string;
  full_name?: string;
  exam_level: string;
  subscription_plan: string;
  created_at: string;
}

interface GeneratedQuestion {
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  correct_answer: string;
  explanation: string;
  difficulty_level: string;
  topic_area: string;
  subtopic?: string;
  keywords: string[];
  source_material?: string;
  learning_objective_id?: string;
  learning_objective_text?: string;
}

interface UserStats {
  totalUsers: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  subscriptionStats: Record<string, number>;
  examLevelStats: Record<string, number>;
}

interface TopicQuestionStats {
  total: number;
  active: number;
  beginner: number;
  intermediate: number;
  advanced: number;
}

interface QuestionStats {
  topicStats: Record<string, TopicQuestionStats>;
  summary: {
    totalQuestions: number;
    totalActive: number;
    totalTopics: number;
  };
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [questionStats, setQuestionStats] = useState<QuestionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [questionStatsLoading, setQuestionStatsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'questions' | 'ai-generator' | 'material-generator'>('overview');
  const [questionData, setQuestionData] = useState({
    topic: '',
    difficulty: 'intermediate',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  });
  const [aiGeneratorData, setAiGeneratorData] = useState({
    topic_area: 'Ethical and Professional Standards',
    difficulty: 'intermediate',
    subtopic: '',
    learning_objective_id: '',
    generating: false,
    generatedQuestion: null as GeneratedQuestion | null
  });
  const [availableReadings, setAvailableReadings] = useState<Reading[]>([]);
  const [availableLOs, setAvailableLOs] = useState<LearningObjective[]>([]);
  const [selectedReading, setSelectedReading] = useState<string>('');
  const [materialGeneratorData, setMaterialGeneratorData] = useState<{
    [key: string]: { generating: boolean; count: number; difficulty: string };
  }>({});
  const [generationResults, setGenerationResults] = useState<{
    [key: string]: { success: boolean; message: string; count?: number };
  }>({});
  const router = useRouter();

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('admin_logged_in');
    if (!isAdminLoggedIn) {
      router.push('/admin/login');
      return;
    }

    fetchUserData();
    fetchQuestionStats();
  }, [router]);

  // Update available readings and LOs when topic changes
  useEffect(() => {
    const readings = getReadingsForTopic(aiGeneratorData.topic_area);
    setAvailableReadings(readings);
    setSelectedReading('');
    setAvailableLOs([]);
    setAiGeneratorData(prev => ({ ...prev, learning_objective_id: '', subtopic: '' }));
  }, [aiGeneratorData.topic_area]);

  // Update available LOs when reading changes
  useEffect(() => {
    if (selectedReading) {
      const reading = availableReadings.find(r => r.name === selectedReading);
      if (reading) {
        setAvailableLOs(reading.learningObjectives);
        setAiGeneratorData(prev => ({ ...prev, subtopic: selectedReading }));
      }
    } else {
      setAvailableLOs([]);
    }
  }, [selectedReading, availableReadings]);

  const fetchQuestionStats = async () => {
    try {
      setQuestionStatsLoading(true);
      const response = await fetch('/api/admin/question-stats');
      const data = await response.json();

      if (response.ok) {
        setQuestionStats(data);
      } else {
        console.error('Failed to fetch question stats');
      }
    } catch (error) {
      console.error('Error fetching question stats:', error);
    } finally {
      setQuestionStatsLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
        setStats(data.stats);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    router.push('/admin/login');
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Question saved successfully! (This is a dummy implementation)');
    setQuestionData({
      topic: '',
      difficulty: 'intermediate',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...questionData.options];
    newOptions[index] = value;
    setQuestionData({ ...questionData, options: newOptions });
  };

  const handleAIGeneration = async () => {
    setAiGeneratorData({ ...aiGeneratorData, generating: true, generatedQuestion: null });

    // Find the selected learning objective text if one is selected
    const selectedLO = availableLOs.find(lo => lo.id === aiGeneratorData.learning_objective_id);

    try {
      // Use RAG endpoint to ground questions on training materials
      const response = await fetch('/api/admin/generate-rag-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic_area: aiGeneratorData.topic_area,
          difficulty: aiGeneratorData.difficulty,
          subtopic: aiGeneratorData.subtopic || undefined,
          learning_objective_id: aiGeneratorData.learning_objective_id || undefined,
          learning_objective_text: selectedLO?.text || undefined,
          count: 1,
          save_to_database: false,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // RAG endpoint returns questions array
        const question = data.questions?.[0];
        if (question) {
          setAiGeneratorData({
            ...aiGeneratorData,
            generating: false,
            generatedQuestion: question
          });
        } else {
          throw new Error('No question returned from RAG system');
        }
      } else {
        throw new Error(data.error || 'Failed to generate question');
      }
    } catch (error) {
      console.error('Error generating question:', error);
      alert(`Failed to generate question: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setAiGeneratorData({ ...aiGeneratorData, generating: false });
    }
  };

  const handleSaveQuestion = async () => {
    if (!aiGeneratorData.generatedQuestion) return;

    try {
      const supabase = createClient();

      const questionData = {
        topic_area: aiGeneratorData.generatedQuestion.topic_area,
        subtopic: aiGeneratorData.generatedQuestion.subtopic || null,
        difficulty_level: aiGeneratorData.generatedQuestion.difficulty_level,
        question_text: aiGeneratorData.generatedQuestion.question_text,
        option_a: aiGeneratorData.generatedQuestion.option_a,
        option_b: aiGeneratorData.generatedQuestion.option_b,
        option_c: aiGeneratorData.generatedQuestion.option_c,
        correct_answer: aiGeneratorData.generatedQuestion.correct_answer,
        explanation: aiGeneratorData.generatedQuestion.explanation,
        keywords: aiGeneratorData.generatedQuestion.keywords,
        learning_objective_id: aiGeneratorData.generatedQuestion.learning_objective_id || null,
        is_active: true
      };

      const { error } = await supabase
        .from('questions')
        .insert([questionData]);

      if (error) {
        throw new Error(error.message);
      }

      alert('Question saved to database successfully!');
      // Clear the generated question after saving
      setAiGeneratorData({ ...aiGeneratorData, generatedQuestion: null });
    } catch (error) {
      console.error('Error saving question:', error);
      alert(`Failed to save question: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleMaterialGeneration = async (topicId: string, topicName: string, count: number, difficulty: string) => {
    const key = topicId;

    // Set generating state
    setMaterialGeneratorData(prev => ({
      ...prev,
      [key]: { generating: true, count, difficulty }
    }));

    // Clear previous results
    setGenerationResults(prev => {
      const newResults = { ...prev };
      delete newResults[key];
      return newResults;
    });

    try {
      // Use RAG endpoint to ground questions on training materials
      const response = await fetch('/api/admin/generate-rag-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic_area: topicName,
          difficulty,
          count,
          save_to_database: true
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setGenerationResults(prev => ({
          ...prev,
          [key]: {
            success: true,
            message: `Successfully generated and saved ${data.saved_count || data.questions?.length || 0} questions from training materials!`,
            count: data.saved_count || data.questions?.length || 0
          }
        }));
      } else {
        throw new Error(data.error || 'Failed to generate questions');
      }
    } catch (error) {
      console.error('Error generating questions from material:', error);
      setGenerationResults(prev => ({
        ...prev,
        [key]: {
          success: false,
          message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      }));
    } finally {
      setMaterialGeneratorData(prev => ({
        ...prev,
        [key]: { ...prev[key], generating: false }
      }));
    }
  };

  // Use the comprehensive curriculum structure
  const CFA_TOPICS = cfaLevel1Curriculum.map(topic => topic.name);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {['overview', 'users', 'questions', 'ai-generator', 'material-generator'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                }`}
              >
                {tab === 'ai-generator' ? 'AI Generator' :
                 tab === 'material-generator' ? 'Material Generator' :
                 tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-300">Total Users</h3>
                <p className="text-3xl font-bold text-white">{stats?.totalUsers || 0}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-300">New This Week</h3>
                <p className="text-3xl font-bold text-green-400">{stats?.newUsersThisWeek || 0}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-300">New This Month</h3>
                <p className="text-3xl font-bold text-blue-400">{stats?.newUsersThisMonth || 0}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-300">Premium Users</h3>
                <p className="text-3xl font-bold text-yellow-400">
                  {(stats?.subscriptionStats?.premium || 0) + (stats?.subscriptionStats?.professional || 0)}
                </p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Subscription Plans</h3>
                <div className="space-y-3">
                  {Object.entries(stats?.subscriptionStats || {}).map(([plan, count]) => (
                    <div key={plan} className="flex justify-between">
                      <span className="text-gray-300 capitalize">{plan}</span>
                      <span className="text-white font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Exam Levels</h3>
                <div className="space-y-3">
                  {Object.entries(stats?.examLevelStats || {}).map(([level, count]) => (
                    <div key={level} className="flex justify-between">
                      <span className="text-gray-300">{level}</span>
                      <span className="text-white font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Users</h2>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Exam Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-white">
                              {user.full_name || 'No name'}
                            </div>
                            <div className="text-sm text-gray-400">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {user.exam_level}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.subscription_plan === 'premium' ? 'bg-yellow-100 text-yellow-800' :
                            user.subscription_plan === 'professional' ? 'bg-purple-100 text-purple-800' :
                            user.subscription_plan === 'basic' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {user.subscription_plan}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-white">Question Bank Statistics</h2>
                <p className="text-gray-400">Overview of questions in your database by category</p>
              </div>
              <button
                onClick={fetchQuestionStats}
                disabled={questionStatsLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {questionStatsLoading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>

            {questionStatsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-300">Loading question statistics...</span>
              </div>
            ) : questionStats ? (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-300">Total Questions</h3>
                    <p className="text-4xl font-bold text-white">{questionStats.summary.totalQuestions.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-300">Active Questions</h3>
                    <p className="text-4xl font-bold text-green-400">{questionStats.summary.totalActive.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-300">Categories</h3>
                    <p className="text-4xl font-bold text-blue-400">{questionStats.summary.totalTopics}</p>
                  </div>
                </div>

                {/* Questions by Category */}
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-700">
                    <h3 className="text-xl font-semibold text-white">Questions by Category</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Beginner
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Intermediate
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Advanced
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Active
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {cfaLevel1Curriculum.map((topic) => {
                          const topicData = questionStats.topicStats[topic.name] || {
                            total: 0,
                            active: 0,
                            beginner: 0,
                            intermediate: 0,
                            advanced: 0
                          };
                          return (
                            <tr key={topic.id} className="hover:bg-gray-750">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className={`w-10 h-10 ${topic.color} rounded-lg flex items-center justify-center text-white text-lg mr-3 flex-shrink-0`}>
                                    {topic.icon}
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-white">{topic.name}</div>
                                    <div className="text-xs text-gray-400">{topic.examWeight}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <span className="text-lg font-bold text-white">{topicData.total}</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-900 text-green-300">
                                  {topicData.beginner}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-900 text-yellow-300">
                                  {topicData.intermediate}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-900 text-red-300">
                                  {topicData.advanced}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <span className={`text-sm font-medium ${topicData.active === topicData.total ? 'text-green-400' : 'text-yellow-400'}`}>
                                  {topicData.active}/{topicData.total}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Uncategorized Questions (if any) */}
                {Object.keys(questionStats.topicStats).some(key =>
                  !cfaLevel1Curriculum.find(t => t.name === key)
                ) && (
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Other Categories</h3>
                    <div className="space-y-2">
                      {Object.entries(questionStats.topicStats)
                        .filter(([key]) => !cfaLevel1Curriculum.find(t => t.name === key))
                        .map(([category, data]) => (
                          <div key={category} className="flex justify-between items-center bg-gray-700 p-3 rounded">
                            <span className="text-gray-300">{category}</span>
                            <span className="text-white font-semibold">{data.total} questions</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">Failed to load question statistics. Please try refreshing.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ai-generator' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-white">AI Question Generator</h2>
              <span className="bg-green-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">RAG-Powered</span>
            </div>
            <p className="text-gray-400">Generate high-quality CFA Level 1 questions grounded on your training materials in cfatrainingmaterial/</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Generator Form */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Generate Question</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Topic Area
                    </label>
                    <select
                      value={aiGeneratorData.topic_area}
                      onChange={(e) => setAiGeneratorData({ ...aiGeneratorData, topic_area: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {CFA_TOPICS.map((topic) => (
                        <option key={topic} value={topic}>{topic}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Reading / Section
                    </label>
                    <select
                      value={selectedReading}
                      onChange={(e) => setSelectedReading(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-- Select a Reading --</option>
                      {availableReadings.map((reading) => (
                        <option key={reading.name} value={reading.name}>{reading.name}</option>
                      ))}
                    </select>
                  </div>

                  {selectedReading && availableLOs.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Learning Objective
                        <span className="text-xs text-blue-400 ml-2">({availableLOs.length} available)</span>
                      </label>
                      <select
                        value={aiGeneratorData.learning_objective_id}
                        onChange={(e) => setAiGeneratorData({ ...aiGeneratorData, learning_objective_id: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        <option value="">-- Any Learning Objective --</option>
                        {availableLOs.map((lo) => (
                          <option key={lo.id} value={lo.id} title={lo.text}>
                            {lo.id}: {lo.text.length > 80 ? lo.text.substring(0, 80) + '...' : lo.text}
                          </option>
                        ))}
                      </select>
                      {aiGeneratorData.learning_objective_id && (
                        <div className="mt-2 p-2 bg-blue-900/30 border border-blue-700 rounded text-xs text-blue-200">
                          <strong>Selected LO:</strong> {availableLOs.find(lo => lo.id === aiGeneratorData.learning_objective_id)?.text}
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      value={aiGeneratorData.difficulty}
                      onChange={(e) => setAiGeneratorData({ ...aiGeneratorData, difficulty: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => handleAIGeneration()}
                      disabled={aiGeneratorData.generating}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      {aiGeneratorData.generating ? 'Generating...' : 'Generate Question'}
                    </button>
                    {aiGeneratorData.generatedQuestion && !aiGeneratorData.generating && (
                      <button
                        onClick={() => handleSaveQuestion()}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                      >
                        Save to Database
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Generated Question Preview */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Generated Question</h3>
                  {aiGeneratorData.generatedQuestion && (
                    <span className="bg-green-700 text-green-100 text-xs font-medium px-2 py-1 rounded">
                      Grounded on Training Materials
                    </span>
                  )}
                </div>

                {aiGeneratorData.generating && (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    <span className="ml-3 text-gray-300">AI is generating your question...</span>
                  </div>
                )}

                {aiGeneratorData.generatedQuestion && !aiGeneratorData.generating && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-300 mb-2">Question:</h4>
                      <p className="text-white bg-gray-700 p-3 rounded">{aiGeneratorData.generatedQuestion.question_text}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-300 mb-2">Options:</h4>
                      <div className="space-y-2">
                        <div className={`p-2 rounded ${aiGeneratorData.generatedQuestion.correct_answer === 'A' ? 'bg-green-700' : 'bg-gray-700'}`}>
                          <span className="font-bold text-white">A. </span>
                          <span className="text-white">{aiGeneratorData.generatedQuestion.option_a}</span>
                        </div>
                        <div className={`p-2 rounded ${aiGeneratorData.generatedQuestion.correct_answer === 'B' ? 'bg-green-700' : 'bg-gray-700'}`}>
                          <span className="font-bold text-white">B. </span>
                          <span className="text-white">{aiGeneratorData.generatedQuestion.option_b}</span>
                        </div>
                        <div className={`p-2 rounded ${aiGeneratorData.generatedQuestion.correct_answer === 'C' ? 'bg-green-700' : 'bg-gray-700'}`}>
                          <span className="font-bold text-white">C. </span>
                          <span className="text-white">{aiGeneratorData.generatedQuestion.option_c}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-300 mb-2">Explanation:</h4>
                      <p className="text-white bg-gray-700 p-3 rounded">{aiGeneratorData.generatedQuestion.explanation}</p>
                    </div>

                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Difficulty: {aiGeneratorData.generatedQuestion.difficulty_level}</span>
                      <span>Correct Answer: {aiGeneratorData.generatedQuestion.correct_answer}</span>
                    </div>

                    {aiGeneratorData.generatedQuestion.keywords && (
                      <div>
                        <h4 className="font-medium text-gray-300 mb-2">Keywords:</h4>
                        <div className="flex flex-wrap gap-2">
                          {aiGeneratorData.generatedQuestion.keywords.map((keyword: string, index: number) => (
                            <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {aiGeneratorData.generatedQuestion.learning_objective_id && (
                      <div className="mt-4 p-3 bg-blue-900/30 border border-blue-700 rounded">
                        <h4 className="font-medium text-blue-300 mb-1 text-sm">Learning Objective:</h4>
                        <p className="text-blue-200 text-xs">
                          <strong>{aiGeneratorData.generatedQuestion.learning_objective_id}:</strong>{' '}
                          {aiGeneratorData.generatedQuestion.learning_objective_text}
                        </p>
                      </div>
                    )}

                    {aiGeneratorData.generatedQuestion.source_material && (
                      <div className="mt-4 p-3 bg-green-900/30 border border-green-700 rounded">
                        <h4 className="font-medium text-green-300 mb-1 text-sm">Source Materials Used:</h4>
                        <p className="text-green-200 text-xs">{aiGeneratorData.generatedQuestion.source_material}</p>
                      </div>
                    )}
                  </div>
                )}

                {!aiGeneratorData.generatedQuestion && !aiGeneratorData.generating && (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No question generated yet. Click &quot;Generate Question&quot; to create a new CFA Level 1 question using AI.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">How RAG-Powered Generation Works</h3>
              <div className="space-y-2 text-gray-300">
                <p>• <strong>Grounded on Your Materials:</strong> Questions are generated using content from your cfatrainingmaterial/ folder</p>
                <p>• <strong>No Hallucinations:</strong> AI retrieves relevant chunks from Pinecone vector database before generating</p>
                <p>• <strong>Topic Area:</strong> Select from the 10 official CFA Level 1 topic areas</p>
                <p>• <strong>Reading / Section:</strong> Select a specific reading within the topic to narrow the focus</p>
                <p>• <strong>Learning Objective:</strong> Target a specific 2026 CFA Learning Outcome - questions will be labeled with this LO</p>
                <p>• <strong>Difficulty:</strong> Choose appropriate level for your target audience</p>
                <p>• <strong>Generate Question:</strong> Creates a preview without saving to database</p>
                <p>• <strong>Save to Database:</strong> Saves the generated question with LO label to your question bank</p>
              </div>
              <div className="mt-4 p-3 bg-green-900/30 border border-green-700 rounded">
                <p className="text-green-300 text-sm">
                  <strong>Source:</strong> 4,145 text chunks from 61 PDF files indexed in Pinecone
                </p>
              </div>
              <div className="mt-2 p-3 bg-blue-900/30 border border-blue-700 rounded">
                <p className="text-blue-300 text-sm">
                  <strong>2026 Learning Objectives:</strong> {CFA_2026_LEARNING_OBJECTIVES.reduce((sum, t) => sum + t.readings.reduce((s, r) => s + r.learningObjectives.length, 0), 0)} learning outcomes across all topics
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'material-generator' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-white">Batch Question Generator</h2>
              <span className="bg-green-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">RAG-Powered</span>
            </div>
            <p className="text-gray-400">Generate multiple questions per topic, all grounded on your training materials</p>

            {/* Instructions */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">How It Works</h3>
              <div className="space-y-2 text-gray-300">
                <p>• <strong>RAG-Powered:</strong> Uses Pinecone vector search to find relevant content from your 61 PDF files</p>
                <p>• <strong>No Hallucinations:</strong> Questions are grounded on actual text chunks from your training materials</p>
                <p>• <strong>Auto-Save:</strong> Generated questions are automatically saved to your database</p>
                <p>• <strong>Batch Generation:</strong> Generate up to 20 questions at once for each topic</p>
              </div>
              <div className="mt-4 p-3 bg-green-900/30 border border-green-700 rounded">
                <p className="text-green-300 text-sm">
                  <strong>Source:</strong> 4,145 text chunks indexed from cfatrainingmaterial/
                </p>
              </div>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cfaLevel1Curriculum.map((topic) => {
                const topicData = materialGeneratorData[topic.id] || { generating: false, count: 5, difficulty: 'intermediate' };
                const result = generationResults[topic.id];

                return (
                  <div key={topic.id} className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex items-start mb-4">
                      <div className={`w-12 h-12 ${topic.color} rounded-lg flex items-center justify-center text-white text-xl mr-4 flex-shrink-0`}>
                        {topic.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{topic.name}</h3>
                        <p className="text-sm text-gray-400">
                          {topic.examWeight} • {topic.subtopics.length} subtopics
                        </p>
                      </div>
                    </div>

                    {/* Generation Controls */}
                    <div className="space-y-3 mb-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1">
                            Questions
                          </label>
                          <select
                            value={topicData.count}
                            onChange={(e) => setMaterialGeneratorData(prev => ({
                              ...prev,
                              [topic.id]: { ...topicData, count: parseInt(e.target.value) }
                            }))}
                            disabled={topicData.generating}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded text-sm focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="1">1</option>
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1">
                            Difficulty
                          </label>
                          <select
                            value={topicData.difficulty}
                            onChange={(e) => setMaterialGeneratorData(prev => ({
                              ...prev,
                              [topic.id]: { ...topicData, difficulty: e.target.value }
                            }))}
                            disabled={topicData.generating}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded text-sm focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Generate Button */}
                    <button
                      onClick={() => handleMaterialGeneration(topic.id, topic.name, topicData.count, topicData.difficulty)}
                      disabled={topicData.generating}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      {topicData.generating ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Generating...
                        </div>
                      ) : (
                        `Generate ${topicData.count} Question${topicData.count > 1 ? 's' : ''}`
                      )}
                    </button>

                    {/* Result Message */}
                    {result && (
                      <div className={`mt-4 p-3 rounded ${
                        result.success ? 'bg-green-900 border border-green-700' : 'bg-red-900 border border-red-700'
                      }`}>
                        <p className={`text-sm ${result.success ? 'text-green-200' : 'text-red-200'}`}>
                          {result.message}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Statistics */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Generation Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-400">
                    {Object.values(generationResults).reduce((sum, r) => sum + (r.count || 0), 0)}
                  </p>
                  <p className="text-sm text-gray-400">Total Generated</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-400">
                    {Object.values(generationResults).filter(r => r.success).length}
                  </p>
                  <p className="text-sm text-gray-400">Successful Batches</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-400">
                    {Object.values(generationResults).filter(r => !r.success).length}
                  </p>
                  <p className="text-sm text-gray-400">Failed Batches</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
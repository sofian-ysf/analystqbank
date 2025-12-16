'use client';

import React, { useState, useEffect } from 'react';
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
  learningObjectives: Record<string, number>;
}

interface QuestionStats {
  topicStats: Record<string, TopicQuestionStats>;
  summary: {
    totalQuestions: number;
    totalActive: number;
    totalTopics: number;
    totalWithLO: number;
  };
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [questionStats, setQuestionStats] = useState<QuestionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [questionStatsLoading, setQuestionStatsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'questions' | 'ai-generator'>('overview');
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
    questionCount: 5,
    generating: false,
    generatedQuestions: [] as GeneratedQuestion[]
  });
  const [availableReadings, setAvailableReadings] = useState<Reading[]>([]);
  const [availableLOs, setAvailableLOs] = useState<LearningObjective[]>([]);
  const [selectedReading, setSelectedReading] = useState<string>('');
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
  const [generateAllLOs, setGenerateAllLOs] = useState(false);
  const [batchProgress, setBatchProgress] = useState<{
    isRunning: boolean;
    currentLOIndex: number;
    totalLOs: number;
    currentLOId: string;
    completedLOs: string[];
  }>({
    isRunning: false,
    currentLOIndex: 0,
    totalLOs: 0,
    currentLOId: '',
    completedLOs: []
  });
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
    setAiGeneratorData({ ...aiGeneratorData, generating: true, generatedQuestions: [] });
    setSelectedQuestionIndex(0);

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
          count: aiGeneratorData.questionCount,
          save_to_database: false,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // RAG endpoint returns questions array
        const questions = data.questions || [];
        if (questions.length > 0) {
          setAiGeneratorData({
            ...aiGeneratorData,
            generating: false,
            generatedQuestions: questions
          });
        } else {
          throw new Error('No questions returned from RAG system');
        }
      } else {
        throw new Error(data.error || 'Failed to generate questions');
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      alert(`Failed to generate questions: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setAiGeneratorData({ ...aiGeneratorData, generating: false });
    }
  };

  // Handle batch generation for all LOs in the selected topic/reading
  const handleBatchLOGeneration = async () => {
    // Get all LOs to process - either from selected reading or entire topic
    const losToProcess = selectedReading
      ? availableLOs
      : getLearningObjectivesForTopic(aiGeneratorData.topic_area);

    if (losToProcess.length === 0) {
      alert('No learning objectives found for the selected topic/reading');
      return;
    }

    // Initialize batch progress
    setBatchProgress({
      isRunning: true,
      currentLOIndex: 0,
      totalLOs: losToProcess.length,
      currentLOId: losToProcess[0].id,
      completedLOs: []
    });
    setAiGeneratorData({ ...aiGeneratorData, generating: true, generatedQuestions: [] });
    setSelectedQuestionIndex(0);

    const allGeneratedQuestions: GeneratedQuestion[] = [];

    for (let i = 0; i < losToProcess.length; i++) {
      const lo = losToProcess[i];

      // Update progress
      setBatchProgress(prev => ({
        ...prev,
        currentLOIndex: i,
        currentLOId: lo.id
      }));

      try {
        console.log(`[Batch] Generating for LO ${i + 1}/${losToProcess.length}: ${lo.id}`);

        const response = await fetch('/api/admin/generate-rag-question', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            topic_area: aiGeneratorData.topic_area,
            difficulty: aiGeneratorData.difficulty,
            learning_objective_id: lo.id,
            learning_objective_text: lo.text,
            count: aiGeneratorData.questionCount,
            save_to_database: false,
          }),
        });

        const data = await response.json();

        if (response.ok && data.questions?.length > 0) {
          allGeneratedQuestions.push(...data.questions);

          // Update progress with completed LO
          setBatchProgress(prev => ({
            ...prev,
            completedLOs: [...prev.completedLOs, lo.id]
          }));

          // Update generated questions in real-time so user can see progress
          setAiGeneratorData(prev => ({
            ...prev,
            generatedQuestions: [...allGeneratedQuestions]
          }));
        } else {
          console.error(`Failed to generate for LO ${lo.id}:`, data.error);
        }
      } catch (error) {
        console.error(`Error generating for LO ${lo.id}:`, error);
        // Continue with next LO
      }

      // Small delay between LOs to avoid rate limiting
      if (i < losToProcess.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Finalize
    setBatchProgress({
      isRunning: false,
      currentLOIndex: 0,
      totalLOs: 0,
      currentLOId: '',
      completedLOs: []
    });
    setAiGeneratorData(prev => ({
      ...prev,
      generating: false,
      generatedQuestions: allGeneratedQuestions
    }));

    if (allGeneratedQuestions.length > 0) {
      alert(`Generated ${allGeneratedQuestions.length} questions across ${losToProcess.length} learning objectives!`);
    } else {
      alert('No questions were generated. Please check the console for errors.');
    }
  };

  const handleSaveQuestion = async (index: number) => {
    const question = aiGeneratorData.generatedQuestions[index];
    if (!question) return;

    try {
      const supabase = createClient();

      const questionToSave = {
        topic_area: question.topic_area,
        subtopic: question.subtopic || null,
        difficulty_level: question.difficulty_level,
        question_text: question.question_text,
        option_a: question.option_a,
        option_b: question.option_b,
        option_c: question.option_c,
        correct_answer: question.correct_answer,
        explanation: question.explanation,
        keywords: question.keywords,
        learning_objective_id: question.learning_objective_id || null,
        is_active: true
      };

      const { error } = await supabase
        .from('questions')
        .insert([questionToSave]);

      if (error) {
        throw new Error(error.message);
      }

      alert('Question saved to database successfully!');
      // Remove the saved question from the list
      const updatedQuestions = aiGeneratorData.generatedQuestions.filter((_, i) => i !== index);
      setAiGeneratorData({ ...aiGeneratorData, generatedQuestions: updatedQuestions });
      if (selectedQuestionIndex >= updatedQuestions.length && updatedQuestions.length > 0) {
        setSelectedQuestionIndex(updatedQuestions.length - 1);
      }
    } catch (error) {
      console.error('Error saving question:', error);
      alert(`Failed to save question: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleSaveAllQuestions = async () => {
    if (aiGeneratorData.generatedQuestions.length === 0) return;

    try {
      const supabase = createClient();

      const questionsToSave = aiGeneratorData.generatedQuestions.map(q => ({
        topic_area: q.topic_area,
        subtopic: q.subtopic || null,
        difficulty_level: q.difficulty_level,
        question_text: q.question_text,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
        keywords: q.keywords,
        learning_objective_id: q.learning_objective_id || null,
        is_active: true
      }));

      const { error } = await supabase
        .from('questions')
        .insert(questionsToSave);

      if (error) {
        throw new Error(error.message);
      }

      alert(`${questionsToSave.length} questions saved to database successfully!`);
      setAiGeneratorData({ ...aiGeneratorData, generatedQuestions: [] });
      setSelectedQuestionIndex(0);
    } catch (error) {
      console.error('Error saving questions:', error);
      alert(`Failed to save questions: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
            {['overview', 'users', 'questions', 'ai-generator'].map((tab) => (
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-300">Total Questions</h3>
                    <p className="text-4xl font-bold text-white">{questionStats.summary.totalQuestions.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-300">Active Questions</h3>
                    <p className="text-4xl font-bold text-green-400">{questionStats.summary.totalActive.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-300">With Learning Objective</h3>
                    <p className="text-4xl font-bold text-purple-400">{questionStats.summary.totalWithLO?.toLocaleString() || 0}</p>
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
                            LOs Covered
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
                            advanced: 0,
                            learningObjectives: {}
                          };
                          const loCount = Object.keys(topicData.learningObjectives || {}).length;
                          const totalLOsForTopic = getLearningObjectivesForTopic(topic.name).length;
                          const isExpanded = expandedTopics.has(topic.name);

                          return (
                            <React.Fragment key={topic.id}>
                              <tr
                                className="hover:bg-gray-750 cursor-pointer"
                                onClick={() => {
                                  setExpandedTopics(prev => {
                                    const newSet = new Set(prev);
                                    if (newSet.has(topic.name)) {
                                      newSet.delete(topic.name);
                                    } else {
                                      newSet.add(topic.name);
                                    }
                                    return newSet;
                                  });
                                }}
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <span className="mr-2 text-gray-400 w-4">
                                      {isExpanded ? '▼' : '▶'}
                                    </span>
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
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${loCount > 0 ? 'bg-purple-900 text-purple-300' : 'bg-gray-700 text-gray-400'}`}>
                                    {loCount}/{totalLOsForTopic}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                  <span className={`text-sm font-medium ${topicData.active === topicData.total ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {topicData.active}/{topicData.total}
                                  </span>
                                </td>
                              </tr>
                              {isExpanded && (
                                <tr>
                                  <td colSpan={7} className="px-6 py-4 bg-gray-900/50">
                                    <div className="ml-8 space-y-4">
                                      {getReadingsForTopic(topic.name).map((reading) => {
                                        const readingLOs = reading.learningObjectives;
                                        const readingQuestionCount = readingLOs.reduce((sum, lo) =>
                                          sum + (topicData.learningObjectives?.[lo.id] || 0), 0
                                        );
                                        const coveredLOsInReading = readingLOs.filter(lo =>
                                          (topicData.learningObjectives?.[lo.id] || 0) > 0
                                        ).length;

                                        return (
                                          <div key={reading.name} className="bg-gray-800 rounded-lg overflow-hidden">
                                            {/* Reading Header */}
                                            <div className="px-4 py-3 bg-gray-700 flex items-center justify-between">
                                              <div className="flex items-center">
                                                <span className="text-blue-400 mr-2">📖</span>
                                                <span className="text-sm font-semibold text-white">{reading.name}</span>
                                              </div>
                                              <div className="flex items-center gap-3">
                                                <span className="text-xs text-gray-400">
                                                  {coveredLOsInReading}/{readingLOs.length} LOs covered
                                                </span>
                                                <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                                                  {readingQuestionCount} Q{readingQuestionCount !== 1 ? 's' : ''}
                                                </span>
                                              </div>
                                            </div>

                                            {/* Learning Objectives */}
                                            <div className="p-3 space-y-1">
                                              {readingLOs.map((lo) => {
                                                const questionCount = topicData.learningObjectives?.[lo.id] || 0;
                                                return (
                                                  <div
                                                    key={lo.id}
                                                    className={`flex items-start justify-between px-3 py-2 rounded text-xs ${
                                                      questionCount > 0 ? 'bg-gray-700' : 'bg-gray-800/50'
                                                    }`}
                                                  >
                                                    <div className="flex-1 mr-3">
                                                      <span className={`font-semibold ${questionCount > 0 ? 'text-purple-400' : 'text-gray-500'}`}>
                                                        {lo.id}
                                                      </span>
                                                      <span className={`ml-2 ${questionCount > 0 ? 'text-gray-300' : 'text-gray-500'}`}>
                                                        {lo.text}
                                                      </span>
                                                    </div>
                                                    <span className={`px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${
                                                      questionCount > 0
                                                        ? 'bg-purple-600 text-white'
                                                        : 'bg-gray-700 text-gray-500'
                                                    }`}>
                                                      {questionCount}
                                                    </span>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
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
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-300">
                          Learning Objective
                          <span className="text-xs text-blue-400 ml-2">({availableLOs.length} available)</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={generateAllLOs}
                            onChange={(e) => {
                              setGenerateAllLOs(e.target.checked);
                              if (e.target.checked) {
                                setAiGeneratorData({ ...aiGeneratorData, learning_objective_id: '' });
                              }
                            }}
                            className="mr-2 w-4 h-4 rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-xs text-purple-400 font-medium">Generate for ALL LOs</span>
                        </label>
                      </div>
                      {!generateAllLOs ? (
                        <>
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
                        </>
                      ) : (
                        <div className="p-3 bg-purple-900/30 border border-purple-700 rounded text-sm text-purple-200">
                          <strong>Batch Mode:</strong> Will generate {aiGeneratorData.questionCount} question{aiGeneratorData.questionCount > 1 ? 's' : ''} for each of the {availableLOs.length} learning objectives in this reading.
                          <br />
                          <span className="text-xs text-purple-400">Total: ~{availableLOs.length * aiGeneratorData.questionCount} questions</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
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

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Number of Questions
                      </label>
                      <select
                        value={aiGeneratorData.questionCount}
                        onChange={(e) => setAiGeneratorData({ ...aiGeneratorData, questionCount: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={1}>1 Question</option>
                        <option value={2}>2 Questions</option>
                        <option value={3}>3 Questions</option>
                        <option value={4}>4 Questions</option>
                        <option value={5}>5 Questions</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {generateAllLOs && selectedReading ? (
                      <button
                        onClick={() => handleBatchLOGeneration()}
                        disabled={aiGeneratorData.generating}
                        className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                      >
                        {aiGeneratorData.generating
                          ? `Generating for All ${availableLOs.length} LOs...`
                          : `Generate for All ${availableLOs.length} Learning Objectives`}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAIGeneration()}
                        disabled={aiGeneratorData.generating}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                      >
                        {aiGeneratorData.generating
                          ? `Generating ${aiGeneratorData.questionCount} Question${aiGeneratorData.questionCount > 1 ? 's' : ''}...`
                          : `Generate ${aiGeneratorData.questionCount} Question${aiGeneratorData.questionCount > 1 ? 's' : ''}`}
                      </button>
                    )}
                    {aiGeneratorData.generatedQuestions.length > 0 && !aiGeneratorData.generating && (
                      <button
                        onClick={() => handleSaveAllQuestions()}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                      >
                        Save All {aiGeneratorData.generatedQuestions.length} Question{aiGeneratorData.generatedQuestions.length > 1 ? 's' : ''}
                      </button>
                    )}
                  </div>

                  {/* Batch Progress */}
                  {batchProgress.isRunning && (
                    <div className="mt-4 p-4 bg-purple-900/30 border border-purple-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-purple-300">Batch Progress</span>
                        <span className="text-xs text-purple-400">
                          {batchProgress.currentLOIndex + 1} / {batchProgress.totalLOs} LOs
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${((batchProgress.currentLOIndex + 1) / batchProgress.totalLOs) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-purple-200">
                        Currently generating: <strong>{batchProgress.currentLOId}</strong>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Questions generated so far: {aiGeneratorData.generatedQuestions.length}
                      </div>
                    </div>
                  )}

                  {/* Token Estimation */}
                  <div className="mt-4 p-3 bg-gray-700 rounded text-xs text-gray-400">
                    {generateAllLOs && selectedReading ? (
                      <>
                        <strong>Estimated tokens (batch):</strong> ~{(availableLOs.length * aiGeneratorData.questionCount * 3400).toLocaleString()} tokens
                        <br />
                        <span className="text-gray-500">{availableLOs.length} LOs × {aiGeneratorData.questionCount} questions × ~3,400 tokens each</span>
                      </>
                    ) : (
                      <>
                        <strong>Estimated tokens:</strong> ~{(aiGeneratorData.questionCount * 3400).toLocaleString()} tokens ({aiGeneratorData.questionCount} question{aiGeneratorData.questionCount > 1 ? 's' : ''})
                        <br />
                        <span className="text-gray-500">~3,000 input + ~400 output per question</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Generated Questions Preview */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Generated Questions</h3>
                  {aiGeneratorData.generatedQuestions.length > 0 && (
                    <span className="bg-green-700 text-green-100 text-xs font-medium px-2 py-1 rounded">
                      {aiGeneratorData.generatedQuestions.length} Questions Ready
                    </span>
                  )}
                </div>

                {aiGeneratorData.generating && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    <span className="mt-3 text-gray-300">AI is generating {aiGeneratorData.questionCount} question{aiGeneratorData.questionCount > 1 ? 's' : ''}...</span>
                    <span className="text-xs text-gray-500 mt-1">~{aiGeneratorData.questionCount * 10}-{aiGeneratorData.questionCount * 15} seconds</span>
                  </div>
                )}

                {aiGeneratorData.generatedQuestions.length > 0 && !aiGeneratorData.generating && (
                  <div className="space-y-4">
                    {/* Question Navigation */}
                    <div className="flex items-center justify-between bg-gray-700 p-2 rounded-lg">
                      <button
                        onClick={() => setSelectedQuestionIndex(Math.max(0, selectedQuestionIndex - 1))}
                        disabled={selectedQuestionIndex === 0}
                        className="px-3 py-1 bg-gray-600 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded text-sm"
                      >
                        ← Prev
                      </button>
                      <div className="flex gap-1">
                        {aiGeneratorData.generatedQuestions.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedQuestionIndex(idx)}
                            className={`w-8 h-8 rounded-full text-sm font-semibold ${
                              idx === selectedQuestionIndex
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setSelectedQuestionIndex(Math.min(aiGeneratorData.generatedQuestions.length - 1, selectedQuestionIndex + 1))}
                        disabled={selectedQuestionIndex === aiGeneratorData.generatedQuestions.length - 1}
                        className="px-3 py-1 bg-gray-600 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded text-sm"
                      >
                        Next →
                      </button>
                    </div>

                    {/* Current Question Display */}
                    {(() => {
                      const currentQuestion = aiGeneratorData.generatedQuestions[selectedQuestionIndex];
                      if (!currentQuestion) return null;
                      return (
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-300 mb-2">Question {selectedQuestionIndex + 1}:</h4>
                            <p className="text-white bg-gray-700 p-3 rounded">{currentQuestion.question_text}</p>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-300 mb-2">Options:</h4>
                            <div className="space-y-2">
                              <div className={`p-2 rounded ${currentQuestion.correct_answer === 'A' ? 'bg-green-700' : 'bg-gray-700'}`}>
                                <span className="font-bold text-white">A. </span>
                                <span className="text-white">{currentQuestion.option_a}</span>
                              </div>
                              <div className={`p-2 rounded ${currentQuestion.correct_answer === 'B' ? 'bg-green-700' : 'bg-gray-700'}`}>
                                <span className="font-bold text-white">B. </span>
                                <span className="text-white">{currentQuestion.option_b}</span>
                              </div>
                              <div className={`p-2 rounded ${currentQuestion.correct_answer === 'C' ? 'bg-green-700' : 'bg-gray-700'}`}>
                                <span className="font-bold text-white">C. </span>
                                <span className="text-white">{currentQuestion.option_c}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-300 mb-2">Explanation:</h4>
                            <div className="text-white bg-gray-700 p-3 rounded whitespace-pre-line">{currentQuestion.explanation}</div>
                          </div>

                          <div className="flex justify-between text-sm text-gray-400">
                            <span>Difficulty: {currentQuestion.difficulty_level}</span>
                            <span>Correct Answer: {currentQuestion.correct_answer}</span>
                          </div>

                          {currentQuestion.keywords && (
                            <div>
                              <h4 className="font-medium text-gray-300 mb-2">Keywords:</h4>
                              <div className="flex flex-wrap gap-2">
                                {currentQuestion.keywords.map((keyword: string, index: number) => (
                                  <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {currentQuestion.learning_objective_id && (
                            <div className="p-3 bg-blue-900/30 border border-blue-700 rounded">
                              <h4 className="font-medium text-blue-300 mb-1 text-sm">Learning Objective:</h4>
                              <p className="text-blue-200 text-xs">
                                <strong>{currentQuestion.learning_objective_id}:</strong>{' '}
                                {currentQuestion.learning_objective_text}
                              </p>
                            </div>
                          )}

                          {/* Individual Save/Discard Buttons */}
                          <div className="flex gap-2 pt-2 border-t border-gray-700">
                            <button
                              onClick={() => handleSaveQuestion(selectedQuestionIndex)}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                            >
                              Save This Question
                            </button>
                            <button
                              onClick={() => {
                                const updated = aiGeneratorData.generatedQuestions.filter((_, i) => i !== selectedQuestionIndex);
                                setAiGeneratorData({ ...aiGeneratorData, generatedQuestions: updated });
                                if (selectedQuestionIndex >= updated.length && updated.length > 0) {
                                  setSelectedQuestionIndex(updated.length - 1);
                                }
                              }}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors text-sm"
                            >
                              Discard
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {aiGeneratorData.generatedQuestions.length === 0 && !aiGeneratorData.generating && (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No questions generated yet. Click &quot;Generate 5 Questions&quot; to create CFA Level 1 questions using AI.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">How RAG-Powered Generation Works</h3>
              <div className="space-y-2 text-gray-300">
                <p>• <strong>Batch Generation:</strong> Generates 5 questions at once for efficient content creation</p>
                <p>• <strong>Grounded on Your Materials:</strong> Questions are generated using content from your cfatrainingmaterial/ folder</p>
                <p>• <strong>No Hallucinations:</strong> AI retrieves relevant chunks from Pinecone vector database before generating</p>
                <p>• <strong>Topic Area:</strong> Select from the 10 official CFA Level 1 topic areas</p>
                <p>• <strong>Reading / Section:</strong> Select a specific reading within the topic to narrow the focus</p>
                <p>• <strong>Learning Objective:</strong> Target a specific 2026 CFA Learning Outcome - questions will be labeled with this LO</p>
                <p>• <strong>Review &amp; Save:</strong> Navigate between questions, save individually or all at once</p>
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
      </main>
    </div>
  );
}
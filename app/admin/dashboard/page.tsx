'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cfaLevel1Curriculum } from '@/lib/curriculum';

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
}

interface UserStats {
  totalUsers: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  subscriptionStats: Record<string, number>;
  examLevelStats: Record<string, number>;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
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
    source_context: '',
    generating: false,
    generatedQuestion: null as GeneratedQuestion | null
  });
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
  }, [router]);

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

  const handleAIGeneration = async (saveToDatabase = false) => {
    setAiGeneratorData({ ...aiGeneratorData, generating: true, generatedQuestion: null });

    try {
      const response = await fetch('/api/admin/generate-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic_area: aiGeneratorData.topic_area,
          difficulty: aiGeneratorData.difficulty,
          subtopic: aiGeneratorData.subtopic || undefined,
          source_context: aiGeneratorData.source_context || undefined,
          save_to_database: saveToDatabase,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAiGeneratorData({
          ...aiGeneratorData,
          generating: false,
          generatedQuestion: data.question
        });

        if (saveToDatabase && data.saved) {
          alert('Question generated and saved to database successfully!');
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
      const response = await fetch('/api/admin/generate-from-material', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic_id: topicId,
          topic_name: topicName,
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
            message: `Successfully generated and saved ${data.saved_count} questions!`,
            count: data.saved_count
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
            <h2 className="text-3xl font-bold text-white">Question Generator</h2>
            <p className="text-gray-400">Create new questions for the question bank (Dummy Implementation)</p>

            <div className="bg-gray-800 p-6 rounded-lg">
              <form onSubmit={handleQuestionSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Topic
                    </label>
                    <input
                      type="text"
                      value={questionData.topic}
                      onChange={(e) => setQuestionData({ ...questionData, topic: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Ethical and Professional Standards"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={questionData.difficulty}
                      onChange={(e) => setQuestionData({ ...questionData, difficulty: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Question
                  </label>
                  <textarea
                    value={questionData.question}
                    onChange={(e) => setQuestionData({ ...questionData, question: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Enter the question text..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Answer Options
                  </label>
                  <div className="space-y-3">
                    {questionData.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={questionData.correctAnswer === index}
                          onChange={() => setQuestionData({ ...questionData, correctAnswer: index })}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-300 font-medium">{String.fromCharCode(65 + index)}.</span>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder={`Option ${String.fromCharCode(65 + index)}`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Explanation
                  </label>
                  <textarea
                    value={questionData.explanation}
                    onChange={(e) => setQuestionData({ ...questionData, explanation: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Explain why the correct answer is correct..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Save Question (Dummy)
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'ai-generator' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">AI Question Generator</h2>
            <p className="text-gray-400">Generate high-quality CFA Level 1 questions using AI trained on official curriculum</p>

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
                      Subtopic (Optional)
                    </label>
                    <input
                      type="text"
                      value={aiGeneratorData.subtopic}
                      onChange={(e) => setAiGeneratorData({ ...aiGeneratorData, subtopic: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Code of Ethics, Bond Valuation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Source Context (Optional)
                    </label>
                    <textarea
                      value={aiGeneratorData.source_context}
                      onChange={(e) => setAiGeneratorData({ ...aiGeneratorData, source_context: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Paste CFA curriculum text or learning objectives to base the question on..."
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleAIGeneration(false)}
                      disabled={aiGeneratorData.generating}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      {aiGeneratorData.generating ? 'Generating...' : 'Generate Question'}
                    </button>
                    <button
                      onClick={() => handleAIGeneration(true)}
                      disabled={aiGeneratorData.generating || !aiGeneratorData.generatedQuestion}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      Generate & Save
                    </button>
                  </div>
                </div>
              </div>

              {/* Generated Question Preview */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Generated Question</h3>

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
              <h3 className="text-xl font-semibold text-white mb-4">Instructions</h3>
              <div className="space-y-2 text-gray-300">
                <p>• <strong>Topic Area:</strong> Select from the 10 official CFA Level 1 topic areas</p>
                <p>• <strong>Difficulty:</strong> Choose appropriate level for your target audience</p>
                <p>• <strong>Subtopic:</strong> Optional - specify a particular area within the topic</p>
                <p>• <strong>Source Context:</strong> Optional - paste curriculum text to base questions on specific content</p>
                <p>• <strong>Generate Question:</strong> Creates a preview without saving to database</p>
                <p>• <strong>Generate & Save:</strong> Creates and immediately saves to the questions database</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'material-generator' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Material-Based Question Generator</h2>
              <p className="text-gray-400">Generate questions from your CFA Level 1 training materials (PDF files)</p>
            </div>

            {/* Instructions */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">How It Works</h3>
              <div className="space-y-2 text-gray-300">
                <p>• <strong>Trained on Your Materials:</strong> Questions are generated from the actual PDF files in your cfatrainingmaterial folder</p>
                <p>• <strong>Accurate & Relevant:</strong> AI reads the source material to ensure questions are factually correct</p>
                <p>• <strong>Auto-Save:</strong> Generated questions are automatically saved to your database</p>
                <p>• <strong>Batch Generation:</strong> Generate multiple questions at once for each topic</p>
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
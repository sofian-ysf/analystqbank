'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  full_name?: string;
  exam_level: string;
  subscription_plan: string;
  created_at: string;
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
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'questions'>('overview');
  const [questionData, setQuestionData] = useState({
    topic: '',
    difficulty: 'intermediate',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  });
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
            {['overview', 'users', 'questions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'overview' | 'users' | 'questions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
      </main>
    </div>
  );
}
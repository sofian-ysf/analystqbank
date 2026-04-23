'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface UserDetail {
  user: {
    id: string;
    email: string;
    full_name: string;
    exam_level: string;
    subscription_plan: string;
    created_at: string;
  };
  profile: any;
  streak: {
    current_streak: number;
    longest_streak: number;
    last_study_date: string;
  } | null;
  stats: {
    totalQuestions: number;
    totalCorrect: number;
    accuracyRate: number;
    totalStudyTime: number;
  };
  progressByTopic: Array<{
    topic: string;
    total_questions: number;
    correct_answers: number;
    study_time_minutes: number;
    last_studied: string;
  }>;
  sessions: Array<{
    id: string;
    session_type: string;
    questions_attempted: number;
    questions_correct: number;
    duration_minutes: number;
    score_percentage: number;
    created_at: string;
  }>;
  attempts: Array<{
    question_id: string;
    selected_answer: string;
    is_correct: boolean;
    time_spent_seconds: number;
    attempted_at: string;
  }>;
  mockExams: Array<{
    id: string;
    mock_exam_id: string;
    total_score: number;
    percentage_score: number;
    time_taken_minutes: number;
    status: string;
    created_at: string;
  }>;
  achievements: Array<{
    id: string;
    achievement_type: string;
    achievement_name: string;
    earned_at: string;
  }>;
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (!isLoggedIn) {
      router.push('/admin/login');
      return;
    }

    const userId = params.id as string;
    if (userId) {
      fetchUserDetail(userId);
    }
  }, [params.id, router]);

  const fetchUserDetail = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`);
      const result = await response.json();

      if (response.ok) {
        setData(result);
      } else {
        setError(result.error || 'Failed to fetch user');
      }
    } catch (err) {
      setError('Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'lifetime': return 'bg-yellow-900/50 text-yellow-300';
      case '6month': return 'bg-purple-900/50 text-purple-300';
      case '2month': return 'bg-blue-900/50 text-blue-300';
      case 'pro': return 'bg-purple-900/50 text-purple-300';
      case 'premium': return 'bg-yellow-900/50 text-yellow-300';
      case 'basic': return 'bg-blue-900/50 text-blue-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading user details...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error || 'User not found'}</p>
          <button
            onClick={() => router.push('/admin/users')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  const { user, streak, stats, progressByTopic, sessions, attempts, mockExams, achievements } = data;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin/users')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors mb-4"
          >
            Back to Users
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{user.full_name}</h1>
              <p className="text-gray-400">{user.email}</p>
            </div>
            <div className="flex gap-3">
              <span className={`px-3 py-1 rounded text-sm font-medium ${getPlanBadgeColor(user.subscription_plan)}`}>
                {user.subscription_plan}
              </span>
              <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded text-sm font-medium">
                {user.exam_level}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Member Since</p>
            <p className="text-xl font-bold">{formatDate(user.created_at).split(',')[0]}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Total Questions</p>
            <p className="text-xl font-bold">{stats.totalQuestions.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Accuracy Rate</p>
            <p className="text-xl font-bold text-green-400">{stats.accuracyRate}%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Study Time</p>
            <p className="text-xl font-bold">{formatDuration(stats.totalStudyTime)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Study Streak Card */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Study Streak</h2>
            {streak ? (
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-400">{streak.current_streak}</p>
                  <p className="text-gray-400 text-sm">Current Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-400">{streak.longest_streak}</p>
                  <p className="text-gray-400 text-sm">Longest Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{streak.last_study_date ? formatDate(streak.last_study_date).split(',')[0] : 'N/A'}</p>
                  <p className="text-gray-400 text-sm">Last Study</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No streak data available</p>
            )}
          </div>

          {/* Activity Summary Card */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Activity Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Questions Attempted</p>
                <p className="text-2xl font-bold">{stats.totalQuestions}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Correct Answers</p>
                <p className="text-2xl font-bold text-green-400">{stats.totalCorrect}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Study Sessions</p>
                <p className="text-2xl font-bold">{sessions.length}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Mock Exams</p>
                <p className="text-2xl font-bold">{mockExams.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Study Sessions */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Recent Study Sessions</h2>
          {sessions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">Type</th>
                    <th className="px-4 py-3 text-left text-sm">Questions</th>
                    <th className="px-4 py-3 text-left text-sm">Correct</th>
                    <th className="px-4 py-3 text-left text-sm">Score</th>
                    <th className="px-4 py-3 text-left text-sm">Duration</th>
                    <th className="px-4 py-3 text-left text-sm">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {sessions.map((session) => (
                    <tr key={session.id} className="hover:bg-gray-700/50">
                      <td className="px-4 py-3 text-sm capitalize">{session.session_type || 'practice'}</td>
                      <td className="px-4 py-3 text-sm">{session.questions_attempted}</td>
                      <td className="px-4 py-3 text-sm text-green-400">{session.questions_correct}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${
                          session.score_percentage >= 70 ? 'bg-green-900/50 text-green-300' :
                          session.score_percentage >= 50 ? 'bg-yellow-900/50 text-yellow-300' :
                          'bg-red-900/50 text-red-300'
                        }`}>
                          {session.score_percentage}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{formatDuration(session.duration_minutes)}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">{formatDate(session.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400">No study sessions recorded</p>
          )}
        </div>

        {/* Recent Question Attempts */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Recent Question Attempts</h2>
          {attempts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">Question ID</th>
                    <th className="px-4 py-3 text-left text-sm">Answer</th>
                    <th className="px-4 py-3 text-left text-sm">Result</th>
                    <th className="px-4 py-3 text-left text-sm">Time Spent</th>
                    <th className="px-4 py-3 text-left text-sm">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {attempts.map((attempt, index) => (
                    <tr key={index} className="hover:bg-gray-700/50">
                      <td className="px-4 py-3 text-sm font-mono">{attempt.question_id.slice(0, 8)}...</td>
                      <td className="px-4 py-3 text-sm uppercase">{attempt.selected_answer || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${attempt.is_correct ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                          {attempt.is_correct ? 'Correct' : 'Incorrect'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{attempt.time_spent_seconds}s</td>
                      <td className="px-4 py-3 text-sm text-gray-400">{formatDate(attempt.attempted_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400">No question attempts recorded</p>
          )}
        </div>

        {/* Mock Exam History */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Mock Exam History</h2>
          {mockExams.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">Exam ID</th>
                    <th className="px-4 py-3 text-left text-sm">Score</th>
                    <th className="px-4 py-3 text-left text-sm">Percentage</th>
                    <th className="px-4 py-3 text-left text-sm">Time Taken</th>
                    <th className="px-4 py-3 text-left text-sm">Status</th>
                    <th className="px-4 py-3 text-left text-sm">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {mockExams.map((exam) => (
                    <tr key={exam.id} className="hover:bg-gray-700/50">
                      <td className="px-4 py-3 text-sm font-mono">{exam.mock_exam_id.slice(0, 8)}...</td>
                      <td className="px-4 py-3 text-sm">{exam.total_score}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${
                          exam.percentage_score >= 70 ? 'bg-green-900/50 text-green-300' :
                          exam.percentage_score >= 50 ? 'bg-yellow-900/50 text-yellow-300' :
                          'bg-red-900/50 text-red-300'
                        }`}>
                          {exam.percentage_score}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{formatDuration(exam.time_taken_minutes)}</td>
                      <td className="px-4 py-3 text-sm capitalize">{exam.status}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">{formatDate(exam.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400">No mock exams taken</p>
          )}
        </div>

        {/* Achievements */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Achievements</h2>
          {achievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="bg-gray-700 p-4 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-600/20 rounded-full flex items-center justify-center">
                    <span className="text-yellow-400 text-xl">🏆</span>
                  </div>
                  <div>
                    <p className="font-semibold">{achievement.achievement_name}</p>
                    <p className="text-sm text-gray-400 capitalize">{achievement.achievement_type}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No achievements earned yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
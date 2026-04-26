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

interface EmailTemplate {
  id: string;
  name: string;
  slug: string;
  subject_template: string;
  body_template: string;
  variables: string[];
}

interface GmailThread {
  id: string;
  subject: string;
  snippet: string;
  messages: Array<{
    id: string;
    from: string;
    to: string;
    date: string;
    body: string;
  }>;
  lastMessageDate: string;
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Email state
  const [activeSubTab, setActiveSubTab] = useState<'activity' | 'emails'>('activity');
  const [showEmailComposer, setShowEmailComposer] = useState(false);
  const [gmailConnected, setGmailConnected] = useState(false);
  const [gmailChecking, setGmailChecking] = useState(true);
  const [emailThreads, setEmailThreads] = useState<GmailThread[]>([]);
  const [loadingThreads, setLoadingThreads] = useState(false);
  const [expandedThread, setExpandedThread] = useState<string | null>(null);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [generatingEmail, setGeneratingEmail] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [replyingToMessage, setReplyingToMessage] = useState<{ id: string; from: string; body: string; date: string } | null>(null);
  const [replyingToThread, setReplyingToThread] = useState<string | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (!isLoggedIn) {
      router.push('/admin/login');
      return;
    }

    const userId = params.id as string;
    if (userId) {
      fetchUserDetail(userId);
      checkGmailConnection();
      fetchTemplates();
    }
  }, [params.id, router]);

  // Fetch email threads when Gmail connects or user data loads
  useEffect(() => {
    if (gmailConnected && data?.user?.email && activeSubTab === 'emails') {
      fetchEmailThreads(data.user.email);
    }
  }, [gmailConnected, data?.user?.email, activeSubTab]);

  const checkGmailConnection = async () => {
    try {
      const response = await fetch('/api/admin/emails/gmail?action=status');
      const result = await response.json();
      setGmailConnected(result.connected || false);
    } catch (err) {
      setGmailConnected(false);
    } finally {
      setGmailChecking(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/admin/email-templates');
      const result = await response.json();
      if (result.templates) {
        setTemplates(result.templates);
      }
    } catch (err) {
      console.error('Failed to fetch templates:', err);
    }
  };

  const fetchEmailThreads = async (userEmail: string) => {
    setLoadingThreads(true);
    try {
      const response = await fetch(`/api/admin/emails/gmail?user_email=${encodeURIComponent(userEmail)}`);
      const result = await response.json();
      if (result.threads) {
        setEmailThreads(result.threads);
      }
    } catch (err) {
      console.error('Failed to fetch email threads:', err);
    } finally {
      setLoadingThreads(false);
    }
  };

  const connectGmail = async () => {
    try {
      const response = await fetch('/api/auth/gmail');
      const result = await response.json();
      if (result.authUrl) {
        window.location.href = result.authUrl;
      }
    } catch (err) {
      console.error('Failed to initiate Gmail OAuth:', err);
    }
  };

  const generateEmailContent = async () => {
    if (!selectedTemplate || !data) return;

    setGeneratingEmail(true);
    try {
      const template = templates.find(t => t.id === selectedTemplate);
      const response = await fetch('/api/admin/emails/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateName: template?.name || 'Cold Outreach',
          userData: {
            name: data.user.full_name,
            email: data.user.email,
            exam_level: data.user.exam_level
          }
        })
      });
      const result = await response.json();
      if (result.email) {
        setEmailSubject(result.email.subject);
        setEmailBody(result.email.body);
      }
    } catch (err) {
      console.error('Failed to generate email:', err);
    } finally {
      setGeneratingEmail(false);
    }
  };

  const generateReply = async (messageId: string, threadId: string, originalMessage: { from: string; body: string; date: string }) => {
    if (!data) return;

    setReplyingToMessage({ id: messageId, ...originalMessage });
    setReplyingToThread(threadId);
    setShowEmailComposer(true);
    setSelectedTemplate('');
    setEmailSubject('');
    setEmailBody('');
    setGeneratingEmail(true);

    try {
      const response = await fetch('/api/admin/emails/generate-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userData: {
            name: data.user.full_name,
            email: data.user.email,
            exam_level: data.user.exam_level
          },
          originalMessage: {
            id: messageId,
            from: originalMessage.from,
            body: originalMessage.body,
            date: originalMessage.date
          },
          threadId
        })
      });

      const result = await response.json();
      if (result.email) {
        setEmailSubject(result.email.subject);
        setEmailBody(result.email.body);
      }
    } catch (err) {
      console.error('Failed to generate reply:', err);
    } finally {
      setGeneratingEmail(false);
    }
  };

  const sendEmail = async () => {
    if (!emailSubject || !emailBody || !data) return;

    setSendingEmail(true);
    setEmailStatus(null);
    try {
      const response = await fetch('/api/admin/emails/gmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: data.user.email,
          subject: emailSubject,
          body: emailBody
        })
      });
      const result = await response.json();
      if (result.success) {
        setEmailStatus({ type: 'success', message: 'Email sent successfully!' });
        setShowEmailComposer(false);
        setEmailSubject('');
        setEmailBody('');
        setSelectedTemplate('');
        // Refresh threads
        fetchEmailThreads(data.user.email);
      } else {
        setEmailStatus({ type: 'error', message: result.error || 'Failed to send email' });
      }
    } catch (err) {
      setEmailStatus({ type: 'error', message: 'Failed to send email' });
    } finally {
      setSendingEmail(false);
    }
  };

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
      case 'lifetime': return 'bg-yellow-100 text-yellow-800';
      case '6month': return 'bg-purple-100 text-purple-800';
      case '2month': return 'bg-blue-100 text-blue-800';
      case 'pro': return 'bg-purple-100 text-purple-800';
      case 'premium': return 'bg-yellow-100 text-yellow-800';
      case 'basic': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  if (loading || gmailChecking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-700 text-lg">Loading user details...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || 'User not found'}</p>
          <button
            onClick={() => router.push('/admin/users')}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  const { user, streak, stats, progressByTopic, sessions, attempts, mockExams, achievements } = data;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin/users')}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors mb-4"
          >
            Back to Users
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{user.full_name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="flex gap-3">
              <span className={`px-3 py-1 rounded text-sm font-medium ${getPlanBadgeColor(user.subscription_plan)}`}>
                {user.subscription_plan}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                {user.exam_level}
              </span>
            </div>
          </div>
        </div>

        {/* Gmail Connection Banner */}
        {!gmailConnected && (
          <div className="bg-blue-900/30 border border-blue-700 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-semibold text-blue-300">Connect Gmail to enable email features</p>
                  <p className="text-sm text-gray-600">View email history and send AI-generated cold outreach emails</p>
                </div>
              </div>
              <button
                onClick={connectGmail}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-white font-medium"
              >
                Connect Gmail
              </button>
            </div>
          </div>
        )}

        {/* Sub-tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveSubTab('activity')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeSubTab === 'activity'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-600 hover:bg-gray-700'
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => {
              setActiveSubTab('emails');
              if (gmailConnected && emailThreads.length === 0) {
                fetchEmailThreads(user.email);
              }
            }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeSubTab === 'emails'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-600 hover:bg-gray-700'
            }`}
          >
            Emails
          </button>
          {activeSubTab === 'emails' && gmailConnected && (
            <button
              onClick={() => setShowEmailComposer(true)}
              className="ml-auto px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors text-white font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Compose Email
            </button>
          )}
        </div>

        {/* Email History Section */}
        {activeSubTab === 'emails' && gmailConnected && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">Email History</h2>
            {loadingThreads ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="text-gray-600 mt-2">Loading email threads...</p>
              </div>
            ) : emailThreads.length === 0 ? (
              <p className="text-gray-600">No email history found. Send the first email to this user!</p>
            ) : (
              <div className="space-y-4">
                {emailThreads.map((thread) => (
                  <div key={thread.id} className="border border-gray-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedThread(expandedThread === thread.id ? null : thread.id)}
                      className="w-full p-4 bg-gray-700/50 hover:bg-gray-700 text-left flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold">{thread.subject}</p>
                        <p className="text-sm text-gray-600">{thread.snippet}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{formatDate(thread.lastMessageDate)}</span>
                        <svg
                          className={`w-5 h-5 transition-transform ${expandedThread === thread.id ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    {expandedThread === thread.id && (
                      <div className="p-4 bg-gray-900 space-y-4">
                        {thread.messages.map((message) => (
                          <div key={message.id} className="border-l-2 border-gray-600 pl-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-500">From: {message.from} | Date: {formatDate(message.date)}</p>
                              {!message.from.includes(data.user.email) && (
                                <button
                                  onClick={() => generateReply(message.id, thread.id, { from: message.from, body: message.body, date: message.date })}
                                  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-sm transition-colors flex items-center gap-1"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                  </svg>
                                  Reply with AI
                                </button>
                              )}
                            </div>
                            <p className="mt-2 whitespace-pre-wrap">{message.body}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Activity Tab Content */}
        {activeSubTab === 'activity' && (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Member Since</p>
                <p className="text-xl font-bold">{formatDate(user.created_at).split(',')[0]}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Total Questions</p>
                <p className="text-xl font-bold">{stats.totalQuestions.toLocaleString()}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Accuracy Rate</p>
                <p className="text-xl font-bold text-green-400">{stats.accuracyRate}%</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Study Time</p>
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
                      <p className="text-gray-600 text-sm">Current Streak</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-yellow-400">{streak.longest_streak}</p>
                      <p className="text-gray-600 text-sm">Longest Streak</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">{streak.last_study_date ? formatDate(streak.last_study_date).split(',')[0] : 'N/A'}</p>
                      <p className="text-gray-600 text-sm">Last Study</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">No streak data available</p>
                )}
              </div>

              {/* Activity Summary Card */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Activity Summary</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Questions Attempted</p>
                    <p className="text-2xl font-bold">{stats.totalQuestions}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Correct Answers</p>
                    <p className="text-2xl font-bold text-green-400">{stats.totalCorrect}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Study Sessions</p>
                    <p className="text-2xl font-bold">{sessions.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Mock Exams</p>
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
                              session.score_percentage >= 50 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-900/50 text-red-300'
                            }`}>
                              {session.score_percentage}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">{formatDuration(session.duration_minutes)}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{formatDate(session.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">No study sessions recorded</p>
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
                          <td className="px-4 py-3 text-sm text-gray-600">{formatDate(attempt.attempted_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">No question attempts recorded</p>
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
                              exam.percentage_score >= 50 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-900/50 text-red-300'
                            }`}>
                              {exam.percentage_score}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">{formatDuration(exam.time_taken_minutes)}</td>
                          <td className="px-4 py-3 text-sm capitalize">{exam.status}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{formatDate(exam.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">No mock exams taken</p>
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
                        <p className="text-sm text-gray-600 capitalize">{achievement.achievement_type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No achievements earned yet</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Email Composer Modal */}
      {showEmailComposer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Compose Email</h2>
                <button
                  onClick={() => setShowEmailComposer(false)}
                  className="text-gray-600 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Template Selector */}
              <div>
                <label className="block text-sm font-medium mb-2">Email Template</label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select a template...</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* AI Generate Button */}
              <div className="flex gap-2">
                <button
                  onClick={generateEmailContent}
                  disabled={!selectedTemplate || generatingEmail}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2"
                >
                  {generatingEmail ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Generate with AI
                    </>
                  )}
                </button>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Email subject..."
                />
              </div>

              {/* Body */}
              <div>
                <label className="block text-sm font-medium mb-2">Body</label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={10}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Email body..."
                />
              </div>

              {/* Status Message */}
              {emailStatus && (
                <div className={`p-3 rounded-lg ${emailStatus.type === 'success' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                  {emailStatus.message}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setShowEmailComposer(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={sendEmail}
                disabled={!emailSubject || !emailBody || sendingEmail}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2"
              >
                {sendingEmail ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  'Send Email'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
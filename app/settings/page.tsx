"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { PLAN_LIMITS } from "@/lib/plans";
import {
  CaretDown,
  User as UserIcon,
  Calendar,
  CreditCard,
  Gear,
  Check,
  Clock,
  Warning,
} from "@phosphor-icons/react";
import Sidebar from "@/components/dashboard/Sidebar";

interface SubscriptionData {
  subscription_plan: string;
  subscription_status: string;
  stripe_customer_id: string | null;
  current_period_end: string | null;
  cancel_at: string | null;
}

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [managingBilling, setManagingBilling] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [examDate, setExamDate] = useState("");
  const [studyGoal, setStudyGoal] = useState(2);

  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        setEmail(user.email || "");
        setFullName(user.user_metadata?.full_name || "");

        // Load user settings from database
        try {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (profile) {
            setFullName(profile.full_name || "");
            setExamDate(profile.exam_date || "");
            setStudyGoal(profile.study_goal || 2);
            setSubscription({
              subscription_plan: profile.subscription_plan || 'free',
              subscription_status: profile.subscription_status || 'none',
              stripe_customer_id: profile.stripe_customer_id,
              current_period_end: profile.current_period_end,
              cancel_at: profile.cancel_at,
            });
          }
        } catch {
          console.log('Note: Could not fetch user profile');
        }

        setLoading(false);
      }
    };
    checkUser();
  }, [router, supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    if (!user) {
      setMessage({ type: 'error', text: "User not found" });
      setSaving(false);
      return;
    }

    try {
      // First try to update existing profile
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      let error;

      if (existingProfile) {
        // Update existing profile
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({
            full_name: fullName,
            exam_date: examDate || null,
            exam_level: 'Level I',
            study_goal: studyGoal,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        error = updateError;
      } else {
        // Insert new profile
        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert({
            id: user.id,
            email: user.email,
            full_name: fullName,
            exam_date: examDate || null,
            exam_level: 'Level I',
            study_goal: studyGoal,
            updated_at: new Date().toISOString()
          });

        error = insertError;
      }

      if (error) {
        console.error('Error saving profile:', error);
        setMessage({ type: 'error', text: "Error saving settings. Please try again." });
        setSaving(false);
        return;
      }

      // Also update auth metadata for compatibility
      await supabase.auth.updateUser({
        data: {
          full_name: fullName,
        }
      });

      setMessage({ type: 'success', text: "Settings saved successfully!" });
      setTimeout(() => setMessage(null), 3000);

    } catch (err) {
      console.error("Error saving settings:", err);
      setMessage({ type: 'error', text: "An error occurred while saving settings." });
    }

    setSaving(false);
  };

  const calculateDaysUntilExam = () => {
    if (!examDate) return null;
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = exam.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPlanDisplayName = () => {
    if (!subscription) return "Free Plan";
    const plan = subscription.subscription_plan;
    if (plan === '2month') return "2 Month";
    if (plan === '6month') return "6 Month";
    if (plan === 'lifetime') return "Lifetime";
    return "Free Plan";
  };

  const handleManageBilling = async () => {
    if (!subscription?.stripe_customer_id) {
      setMessage({ type: 'error', text: "No billing information found. Please contact support." });
      return;
    }

    setManagingBilling(true);
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: subscription.stripe_customer_id }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setMessage({ type: 'error', text: "Failed to open billing portal. Please try again." });
      }
    } catch (error) {
      console.error('Error opening billing portal:', error);
      setMessage({ type: 'error', text: "Failed to open billing portal. Please try again." });
    }
    setManagingBilling(false);
  };

  const handleUpgrade = async (plan: string) => {
    if (!user) return;
    setManagingBilling(true);
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          userId: user.id,
          email: user.email,
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setMessage({ type: 'error', text: 'Failed to start checkout. Please try again.' });
        setManagingBilling(false);
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      setMessage({ type: 'error', text: 'Failed to start checkout. Please try again.' });
      setManagingBilling(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1FB8CD] mx-auto"></div>
          <p className="mt-4 text-[#5f6368]">Loading settings...</p>
        </div>
      </div>
    );
  }

  const daysUntilExam = calculateDaysUntilExam();

  return (
    <div className="h-screen bg-[#F8F9FA] flex">
      <Sidebar user={user!} onSignOut={handleSignOut} />

      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200 flex-shrink-0">
          <div className="px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1FB8CD] flex items-center justify-center text-white font-semibold text-sm">
                    {user?.email?.[0]?.toUpperCase() || "U"}
                  </div>
                  <CaretDown size={16} className="text-gray-400" />
                </button>
                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                      <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-3xl mx-auto">
            {/* Message */}
            {message && (
              <div className={`mb-6 p-4 rounded-xl ${
                message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
              }`}>
                <span className="flex items-center gap-2">
                  {message.type === 'error' ? <Warning size={18} /> : <Check size={18} />}
                  {message.text}
                </span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              {/* Profile Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <UserIcon size={20} className="text-gray-700" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1FB8CD] focus:border-transparent text-gray-900"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                    />
                    <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                  </div>
                </div>
              </div>

              {/* Subscription & Billing */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <CreditCard size={20} className="text-gray-700" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Subscription & Billing</h2>
                </div>

                {/* Current Plan */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Current Plan</p>
                      <p className="text-xl font-semibold text-gray-900">{getPlanDisplayName()}</p>
                    </div>
                    {subscription?.subscription_status === 'lifetime' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <Check size={14} /> Lifetime Access
                      </span>
                    )}
                    {subscription?.subscription_status === 'active' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <Clock size={14} /> Active
                      </span>
                    )}
                    {subscription?.subscription_status === 'refunded' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        Refunded
                      </span>
                    )}
                  </div>
                </div>

                {/* Plan Features */}
                {subscription?.subscription_plan && subscription.subscription_plan !== 'free' && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm font-medium text-gray-700 mb-3">Your plan includes:</p>
                    <ul className="space-y-2">
                      {(() => {
                        const planKey = subscription?.subscription_plan as keyof typeof PLAN_LIMITS || '2month';
                        const limits = PLAN_LIMITS[planKey] || PLAN_LIMITS['2month'];
                        return limits.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <Check size={16} className="text-green-500 mr-2" />
                            {feature}
                          </li>
                        ));
                      })()}
                    </ul>
                  </div>
                )}

                {/* Upgrade Options */}
                {(!subscription || subscription?.subscription_plan === 'free' || !subscription?.subscription_plan) && (
                  <div className="space-y-3 mb-6">
                    <p className="text-sm font-medium text-gray-700">Upgrade your plan:</p>
                    <div className="grid grid-cols-1 gap-3">
                      <button
                        onClick={() => handleUpgrade('2month')}
                        disabled={managingBilling}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                      >
                        <div>
                          <p className="font-medium text-gray-900">2 Month</p>
                          <p className="text-sm text-gray-500">2,000+ questions, unlimited mock exams</p>
                        </div>
                        <p className="font-semibold text-gray-900">{managingBilling ? '...' : '£25'}</p>
                      </button>
                      <button
                        onClick={() => handleUpgrade('6month')}
                        disabled={managingBilling}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                      >
                        <div>
                          <p className="font-medium text-gray-900">6 Month</p>
                          <p className="text-sm text-gray-500">2,000+ questions, unlimited mock exams</p>
                        </div>
                        <p className="font-semibold text-gray-900">{managingBilling ? '...' : '£40'}</p>
                      </button>
                      <button
                        onClick={() => handleUpgrade('lifetime')}
                        disabled={managingBilling}
                        className="flex items-center justify-between p-4 border-2 border-[#1FB8CD] rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left relative"
                      >
                        <div>
                          <p className="font-medium text-gray-900">Lifetime</p>
                          <p className="text-sm text-gray-500">2,000+ questions, unlimited mock exams, priority support</p>
                        </div>
                        <p className="font-semibold text-[#1FB8CD]">{managingBilling ? '...' : '£70'}</p>
                      </button>
                    </div>
                  </div>
                )}

                {/* View Invoices */}
                {subscription?.stripe_customer_id && subscription?.subscription_status === 'lifetime' && (
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">View Invoices</h4>
                      <p className="text-sm text-gray-500">Access your payment history</p>
                    </div>
                    <button
                      onClick={handleManageBilling}
                      disabled={managingBilling}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                      {managingBilling ? "Opening..." : "View"}
                    </button>
                  </div>
                )}
              </div>

              {/* Exam Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Calendar size={20} className="text-gray-700" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Exam Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CFA Level
                    </label>
                    <div className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 font-medium">
                      CFA Level 1
                    </div>
                  </div>
                  <div>
                    <label htmlFor="examDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Exam Date
                    </label>
                    <input
                      type="date"
                      id="examDate"
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1FB8CD] focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="studyGoal" className="block text-sm font-medium text-gray-700 mb-2">
                      Daily Study Goal
                    </label>
                    <select
                      id="studyGoal"
                      value={studyGoal}
                      onChange={(e) => setStudyGoal(parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1FB8CD] focus:border-transparent text-gray-900"
                    >
                      <option value={1}>1 hour</option>
                      <option value={2}>2 hours</option>
                      <option value={3}>3 hours</option>
                      <option value={4}>4 hours</option>
                      <option value={5}>5+ hours</option>
                    </select>
                  </div>
                </div>

                {/* Exam Countdown */}
                {examDate && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-blue-600" />
                      <span className="text-blue-800 font-medium">
                        {daysUntilExam !== null ? (
                          daysUntilExam > 0 ? (
                            `${daysUntilExam} days until your CFA Level 1 exam`
                          ) : daysUntilExam === 0 ? (
                            `Your CFA Level 1 exam is today! Good luck!`
                          ) : (
                            `Your CFA Level 1 exam was ${Math.abs(daysUntilExam)} days ago`
                          )
                        ) : (
                          "Invalid exam date"
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Account Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Gear size={20} className="text-gray-700" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Account Actions</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">Change Password</h4>
                      <p className="text-sm text-gray-500">Update your account password</p>
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                      Change Password
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-xl">
                    <div>
                      <h4 className="font-medium text-red-900">Delete Account</h4>
                      <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 bg-red-50 text-red-700 rounded-xl font-medium hover:bg-red-100 transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? "Saving..." : "Save Settings"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
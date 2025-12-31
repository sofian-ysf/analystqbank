"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { PLAN_LIMITS } from "@/lib/plans";

interface SubscriptionData {
  subscription_plan: string;
  subscription_status: string;
  trial_ends_at: string | null;
  stripe_customer_id: string | null;
}

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [managingBilling, setManagingBilling] = useState(false);

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
              subscription_status: profile.subscription_status || 'trialing',
              trial_ends_at: profile.trial_ends_at,
              stripe_customer_id: profile.stripe_customer_id,
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
    setMessage("");

    if (!user) {
      setMessage("User not found");
      setSaving(false);
      return;
    }

    try {
      // Update or insert user profile in database
      const { error: upsertError } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          email: user.email,
          full_name: fullName,
          exam_date: examDate || null,
          exam_level: 'Level I',
          study_goal: studyGoal,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });

      if (upsertError) {
        console.error('Error saving profile:', upsertError);
        setMessage("Error saving settings. Please try again.");
        setSaving(false);
        return;
      }

      // Also update auth metadata for compatibility
      await supabase.auth.updateUser({
        data: {
          full_name: fullName,
        }
      });

      setMessage("Settings saved successfully!");
      setTimeout(() => setMessage(""), 3000);

    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage("An error occurred while saving settings.");
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

  const getTrialTimeRemaining = () => {
    if (!subscription?.trial_ends_at) return null;
    const now = new Date();
    const trialEnd = new Date(subscription.trial_ends_at);
    const diff = trialEnd.getTime() - now.getTime();

    if (diff <= 0) return { expired: true, text: "Expired" };

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return { expired: false, text: `${days} day${days > 1 ? 's' : ''} remaining` };
    }
    if (hours > 0) {
      return { expired: false, text: `${hours}h ${minutes}m remaining` };
    }
    return { expired: false, text: `${minutes}m remaining` };
  };

  const getPlanDisplayName = () => {
    if (!subscription) return "Free";
    const plan = subscription.subscription_plan;
    if (plan === 'free' && subscription.subscription_status === 'trialing') {
      return "Free Trial";
    }
    if (plan === 'basic') return "Basic";
    if (plan === 'premium') return "Premium";
    return "Free";
  };

  const handleManageBilling = async () => {
    if (!subscription?.stripe_customer_id) {
      setMessage("No billing information found. Please contact support.");
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
        setMessage("Failed to open billing portal. Please try again.");
      }
    } catch (error) {
      console.error('Error opening billing portal:', error);
      setMessage("Failed to open billing portal. Please try again.");
    }
    setManagingBilling(false);
  };

  const handleUpgrade = (plan: string) => {
    if (!user) return;
    window.location.href = `/api/stripe/create-checkout?plan=${plan}&userId=${user.id}&email=${user.email}`;
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#13343B] mx-auto"></div>
          <p className="mt-4 text-[#5f6368]">Loading settings...</p>
        </div>
      </div>
    );
  }

  const daysUntilExam = calculateDaysUntilExam();

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
              <Link href="/question-bank" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
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
                  <Link href="/settings" className="block px-4 py-2 text-[#13343B] bg-[#F3F3EE] font-medium">
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your account preferences and exam details.
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {/* Profile Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed from settings</p>
              </div>
            </div>
          </div>

          {/* Subscription & Billing */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Subscription & Billing</h3>

            {/* Current Plan */}
            <div className="mb-6">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#1FB8CD]/10 to-[#1FB8CD]/5 rounded-lg border border-[#1FB8CD]/20">
                <div>
                  <p className="text-sm text-gray-600">Current Plan</p>
                  <p className="text-2xl font-bold text-[#13343B]">{getPlanDisplayName()}</p>
                  {subscription?.subscription_status === 'trialing' && (
                    <div className="mt-1">
                      {(() => {
                        const trialInfo = getTrialTimeRemaining();
                        if (trialInfo?.expired) {
                          return <span className="text-sm text-red-600 font-medium">Trial expired</span>;
                        }
                        return <span className="text-sm text-[#1FB8CD] font-medium">{trialInfo?.text}</span>;
                      })()}
                    </div>
                  )}
                  {subscription?.subscription_status === 'active' && (
                    <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  )}
                  {subscription?.subscription_status === 'past_due' && (
                    <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Payment Past Due
                    </span>
                  )}
                  {subscription?.subscription_status === 'canceled' && (
                    <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Cancelled
                    </span>
                  )}
                </div>
                <div className="text-right">
                  {subscription?.subscription_plan === 'basic' && (
                    <p className="text-xl font-bold text-gray-900">£30<span className="text-sm font-normal text-gray-500">/month</span></p>
                  )}
                  {subscription?.subscription_plan === 'premium' && (
                    <p className="text-xl font-bold text-gray-900">£50<span className="text-sm font-normal text-gray-500">/month</span></p>
                  )}
                  {(subscription?.subscription_plan === 'free' || !subscription?.subscription_plan) && (
                    <p className="text-xl font-bold text-gray-900">Free</p>
                  )}
                </div>
              </div>
            </div>

            {/* Plan Features */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Your plan includes:</p>
              <ul className="space-y-1">
                {(() => {
                  const planKey = subscription?.subscription_plan === 'basic' ? 'basic'
                    : subscription?.subscription_plan === 'premium' ? 'premium'
                    : 'trial';
                  const limits = PLAN_LIMITS[planKey as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.trial;
                  return limits.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ));
                })()}
              </ul>
            </div>

            {/* Upgrade Options */}
            {(!subscription || subscription?.subscription_plan === 'free' || subscription?.subscription_status === 'trialing') && (
              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium text-gray-700">Upgrade your plan:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleUpgrade('basic')}
                    className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-[#1FB8CD] transition-colors"
                  >
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Basic</p>
                      <p className="text-sm text-gray-500">5 mocks, 2,000 questions</p>
                    </div>
                    <p className="font-bold text-gray-900">£30/mo</p>
                  </button>
                  <button
                    onClick={() => handleUpgrade('premium')}
                    className="flex items-center justify-between p-4 border-2 border-[#1FB8CD] rounded-lg bg-[#1FB8CD]/5 hover:bg-[#1FB8CD]/10 transition-colors"
                  >
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Premium</p>
                      <p className="text-sm text-gray-500">Unlimited access</p>
                    </div>
                    <p className="font-bold text-[#1FB8CD]">£50/mo</p>
                  </button>
                </div>
              </div>
            )}

            {/* Upgrade from Basic to Premium */}
            {subscription?.subscription_plan === 'basic' && subscription?.subscription_status === 'active' && (
              <div className="mb-6">
                <button
                  onClick={() => handleUpgrade('premium')}
                  className="w-full flex items-center justify-between p-4 border-2 border-[#1FB8CD] rounded-lg bg-[#1FB8CD]/5 hover:bg-[#1FB8CD]/10 transition-colors"
                >
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Upgrade to Premium</p>
                    <p className="text-sm text-gray-500">Unlimited mocks & full question bank access</p>
                  </div>
                  <p className="font-bold text-[#1FB8CD]">£50/mo</p>
                </button>
              </div>
            )}

            {/* Manage Billing */}
            {subscription?.stripe_customer_id && (
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Manage Billing</h4>
                  <p className="text-sm text-gray-600">Update payment method, view invoices, or cancel subscription</p>
                </div>
                <button
                  onClick={handleManageBilling}
                  disabled={managingBilling}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  {managingBilling ? "Opening..." : "Manage"}
                </button>
              </div>
            )}
          </div>

          {/* Exam Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Exam Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CFA Level
                </label>
                <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-medium">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="studyGoal" className="block text-sm font-medium text-gray-700 mb-2">
                  Daily Study Goal (hours)
                </label>
                <select
                  id="studyGoal"
                  value={studyGoal}
                  onChange={(e) => setStudyGoal(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
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
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
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
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Account Actions</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Change Password</h4>
                  <p className="text-sm text-gray-600">Update your account password</p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Change Password
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-red-900">Delete Account</h4>
                  <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-50"
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
              className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { getUserProfile, updateUserProfile, UserProfile } from "@/lib/database";

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examLevel, setExamLevel] = useState<"Level I" | "Level II" | "Level III">("Level I");
  const [studyGoal, setStudyGoal] = useState(2);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    studyReminders: true,
    progressUpdates: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: "private" as "public" | "private",
    dataSharing: false,
    analytics: true
  });

  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        setEmail(user.email || "");

        // Load user profile from database
        const profile = await getUserProfile(user.id);
        if (profile) {
          setUserProfile(profile);
          setFullName(profile.full_name || "");
          setExamDate(profile.exam_date || "");
          setExamLevel(profile.exam_level);
          setStudyGoal(profile.study_goal);
          setNotifications(profile.notifications);
          setPrivacy(profile.privacy_settings);
        } else {
          // Create default profile if doesn't exist
          const defaultProfile: UserProfile = {
            id: user.id,
            email: user.email || "",
            full_name: user.user_metadata?.full_name || "",
            exam_level: "Level I",
            study_goal: 2,
            notifications: {
              email: true,
              push: false,
              studyReminders: true,
              progressUpdates: true
            },
            privacy_settings: {
              profileVisibility: "private",
              dataSharing: false,
              analytics: true
            },
            subscription_plan: "free"
          };

          await updateUserProfile(user.id, defaultProfile);
          setUserProfile(defaultProfile);
          setFullName(defaultProfile.full_name || "");
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
      // Update user profile in database
      const updatedProfile: Partial<UserProfile> = {
        full_name: fullName,
        exam_date: examDate || undefined,
        exam_level: examLevel,
        study_goal: studyGoal,
        notifications: notifications,
        privacy_settings: privacy
      };

      const success = await updateUserProfile(user.id, updatedProfile);

      if (success) {
        // Also update auth metadata for compatibility
        await supabase.auth.updateUser({
          data: {
            full_name: fullName,
          }
        });

        setMessage("Settings saved successfully!");
        setTimeout(() => setMessage(""), 3000);

        // Update local state
        if (userProfile) {
          setUserProfile({ ...userProfile, ...updatedProfile });
        }
      } else {
        setMessage("Error saving settings. Please try again.");
      }
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
            <Link href="/" className="text-xl font-bold text-[#13343B]">
              AnalystTrainer
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Dashboard
              </Link>
              <Link href="/practice" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
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
            Manage your account preferences, exam details, and study goals.
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

          {/* Exam Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Exam Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="examLevel" className="block text-sm font-medium text-gray-700 mb-2">
                  CFA Level
                </label>
                <select
                  id="examLevel"
                  value={examLevel}
                  onChange={(e) => setExamLevel(e.target.value as 'Level I' | 'Level II' | 'Level III')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="Level I">Level I</option>
                  <option value="Level II">Level II</option>
                  <option value="Level III">Level III</option>
                </select>
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
                        `${daysUntilExam} days until your ${examLevel} exam`
                      ) : daysUntilExam === 0 ? (
                        `Your ${examLevel} exam is today! Good luck!`
                      ) : (
                        `Your ${examLevel} exam was ${Math.abs(daysUntilExam)} days ago`
                      )
                    ) : (
                      "Invalid exam date"
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Study Reminders</h4>
                  <p className="text-sm text-gray-600">Daily reminders to stick to your study schedule</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.studyReminders}
                    onChange={(e) => setNotifications({...notifications, studyReminders: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Progress Updates</h4>
                  <p className="text-sm text-gray-600">Weekly summaries of your study progress</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.progressUpdates}
                    onChange={(e) => setNotifications({...notifications, progressUpdates: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Privacy & Data</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Analytics & Performance</h4>
                  <p className="text-sm text-gray-600">Help us improve the platform by sharing usage data</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacy.analytics}
                    onChange={(e) => setPrivacy({...privacy, analytics: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                </label>
              </div>
            </div>
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
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PLAN_LIMITS, PlanType } from '@/lib/plans';
import { createClient } from '@/lib/supabase';

interface UpgradePromptProps {
  plan: PlanType | null;
  questionsRemaining?: number | null;
  mockExamsRemaining?: number | null;
  feature?: 'questions' | 'mockExams' | 'general';
}

export function UpgradePrompt({
  plan,
  questionsRemaining,
  mockExamsRemaining,
  feature = 'general',
}: UpgradePromptProps) {
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  const handleUpgrade = async (selectedPlan: PlanType) => {
    if (!user) return;

    setIsUpgrading(true);

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: selectedPlan,
          userId: user.id,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to start checkout. Please try again.');
        setIsUpgrading(false);
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('An error occurred. Please try again.');
      setIsUpgrading(false);
    }
  };

  const getTitle = () => {
    if (!plan) {
      return 'Subscription Required';
    }
    if (feature === 'questions' && questionsRemaining === 0) {
      return "You've Reached Your Question Limit";
    }
    if (feature === 'mockExams' && mockExamsRemaining === 0) {
      return "You've Reached Your Mock Exam Limit";
    }
    return 'Upgrade Your Plan';
  };

  const getMessage = () => {
    if (!plan) {
      return 'A paid subscription is required to access this content. Choose a plan below to start your CFA exam preparation with access to practice questions and mock exams.';
    }
    if (plan !== 'lifetime') {
      if (feature === 'questions') {
        return "You've used all your practice questions. Upgrade to Lifetime for unlimited access to the full question bank.";
      }
      if (feature === 'mockExams') {
        return "You've completed all your mock exams. Upgrade to Lifetime for unlimited mock exams.";
      }
      return 'Upgrade to Lifetime for unlimited access to all features.';
    }
    return 'Contact support if you believe this is an error.';
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {getTitle()}
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-8">
          {getMessage()}
        </p>

        {/* Plan comparison */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* 2 Month Plan */}
          <button
            onClick={() => handleUpgrade('2month')}
            disabled={isUpgrading}
            className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-gray-900 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <h3 className="font-semibold text-gray-900 mb-2">2 Month</h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">£25</p>
            <p className="text-xs text-gray-500 mb-3">One-time payment</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                2,000+ questions
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited mock exams
              </li>
            </ul>
            <div className="mt-4 text-center text-sm font-medium text-gray-900">
              {isUpgrading ? 'Processing...' : 'Select →'}
            </div>
          </button>

          {/* 6 Month Plan */}
          <button
            onClick={() => handleUpgrade('6month')}
            disabled={isUpgrading}
            className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-gray-900 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <h3 className="font-semibold text-gray-900 mb-2">6 Month</h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">£40</p>
            <p className="text-xs text-gray-500 mb-3">One-time payment</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                2,000+ questions
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited mock exams
              </li>
            </ul>
            <div className="mt-4 text-center text-sm font-medium text-gray-900">
              {isUpgrading ? 'Processing...' : 'Select →'}
            </div>
          </button>

          {/* Lifetime Plan */}
          <button
            onClick={() => handleUpgrade('lifetime')}
            disabled={isUpgrading}
            className="bg-[#1FB8CD]/5 rounded-xl p-5 border-2 border-[#1FB8CD] hover:bg-[#1FB8CD]/10 transition-all text-left relative disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-[#1FB8CD] text-white text-xs font-bold px-3 py-1 rounded-full">
                BEST VALUE
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Lifetime</h3>
            <p className="text-2xl font-bold text-[#1FB8CD] mb-1">£60</p>
            <p className="text-xs text-gray-500 mb-3">One-time payment</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">2,000+ questions</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Unlimited mock exams</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Priority support
              </li>
            </ul>
            <div className="mt-4 text-center text-sm font-semibold text-[#1FB8CD]">
              {isUpgrading ? 'Processing...' : 'Select →'}
            </div>
          </button>
        </div>

        {/* Back button */}
        <div className="text-center">
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Current plan info */}
        {plan && (
          <p className="mt-6 text-sm text-gray-500">
            Current plan: <span className="font-medium">{PLAN_LIMITS[plan].name}</span>
          </p>
        )}
      </div>
    </div>
  );
}

// Smaller inline upgrade banner for showing within pages
export function UpgradeBanner({
  questionsRemaining,
  mockExamsRemaining,
  plan,
}: {
  questionsRemaining?: number | null;
  mockExamsRemaining?: number | null;
  plan: PlanType | null;
}) {
  const showQuestionWarning = questionsRemaining != null && questionsRemaining <= 10 && questionsRemaining > 0;
  const showExamWarning = mockExamsRemaining != null && mockExamsRemaining <= 1 && mockExamsRemaining > 0;

  if (!showQuestionWarning && !showExamWarning) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-amber-800 text-sm">
            {showQuestionWarning && `Only ${questionsRemaining} questions remaining. `}
            {showExamWarning && `Only ${mockExamsRemaining} mock exam${mockExamsRemaining === 1 ? '' : 's'} remaining.`}
          </span>
        </div>
        <Link
          href="/pricing"
          className="text-amber-700 hover:text-amber-900 text-sm font-medium"
        >
          Upgrade →
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PLAN_LIMITS, PlanType } from '@/lib/plans';
import { createClient } from '@/lib/supabase';

interface UpgradePromptProps {
  plan: PlanType;
  isTrialExpired: boolean;
  questionsRemaining?: number | null;
  mockExamsRemaining?: number | null;
  feature?: 'questions' | 'mockExams' | 'general';
}

export function UpgradePrompt({
  plan,
  isTrialExpired,
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

  const handleUpgrade = async (selectedPlan: 'basic' | 'premium') => {
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
    if (isTrialExpired) {
      return 'Your Free Trial Has Ended';
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
    if (isTrialExpired) {
      return 'Your 24-hour free trial has expired. Upgrade now to continue your CFA exam preparation with unlimited access to practice questions and mock exams.';
    }
    if (plan === 'trial') {
      if (feature === 'questions') {
        return `You've used all ${PLAN_LIMITS.trial.questions} practice questions in your trial. Upgrade to Basic for ${PLAN_LIMITS.basic.questions.toLocaleString()} questions or Premium for unlimited access.`;
      }
      if (feature === 'mockExams') {
        return `You've completed your ${PLAN_LIMITS.trial.mockExams} free mock exam. Upgrade to Basic for ${PLAN_LIMITS.basic.mockExams} mock exams or Premium for unlimited access.`;
      }
      return 'Upgrade your plan to unlock more practice questions, mock exams, and advanced features.';
    }
    if (plan === 'basic') {
      if (feature === 'questions') {
        return `You've used all ${PLAN_LIMITS.basic.questions.toLocaleString()} practice questions. Upgrade to Premium for unlimited access to the full question bank.`;
      }
      if (feature === 'mockExams') {
        return `You've completed all ${PLAN_LIMITS.basic.mockExams} mock exams this month. Upgrade to Premium for unlimited mock exams.`;
      }
      return 'Upgrade to Premium for unlimited access to all features.';
    }
    return 'Contact support if you believe this is an error.';
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
          {isTrialExpired ? (
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          )}
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
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Basic Plan */}
          {plan !== 'basic' && (
            <button
              onClick={() => handleUpgrade('basic')}
              disabled={isUpgrading}
              className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-gray-900 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Basic</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">£{PLAN_LIMITS.basic.price}</p>
              <p className="text-xs text-gray-500 mb-3">One-time payment</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {PLAN_LIMITS.basic.questions.toLocaleString()} questions
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {PLAN_LIMITS.basic.mockExams} mock exams
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Lifetime access
                </li>
              </ul>
              <div className="mt-4 text-center text-sm font-medium text-gray-900">
                {isUpgrading ? 'Processing...' : 'Select Basic →'}
              </div>
            </button>
          )}

          {/* Premium Plan */}
          <button
            onClick={() => handleUpgrade('premium')}
            disabled={isUpgrading}
            className={`bg-[#1FB8CD]/5 rounded-xl p-5 border-2 border-[#1FB8CD] hover:bg-[#1FB8CD]/10 transition-all text-left relative disabled:opacity-50 disabled:cursor-not-allowed ${plan === 'basic' ? 'col-span-2' : ''}`}
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-[#1FB8CD] text-white text-xs font-bold px-3 py-1 rounded-full">
                RECOMMENDED
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Premium</h3>
            <p className="text-3xl font-bold text-[#1FB8CD] mb-1">£{PLAN_LIMITS.premium.price}</p>
            <p className="text-xs text-gray-500 mb-3">One-time payment</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Unlimited questions</span>
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
              {isUpgrading ? 'Processing...' : 'Select Premium →'}
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
        {plan !== 'trial' && (
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
  plan: PlanType;
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

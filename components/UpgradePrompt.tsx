"use client";

import Link from 'next/link';
import { PLAN_LIMITS, PlanType } from '@/lib/plans';

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
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Basic</h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">${PLAN_LIMITS.basic.price}</p>
            <p className="text-xs text-gray-500 mb-3">One-time payment</p>
            <ul className="text-sm text-gray-600 space-y-1 text-left">
              <li>• {PLAN_LIMITS.basic.questions.toLocaleString()} questions</li>
              <li>• {PLAN_LIMITS.basic.mockExams} mock exams</li>
              <li>• Lifetime access</li>
            </ul>
          </div>
          <div className="bg-[#1FB8CD]/5 rounded-xl p-4 border-2 border-[#1FB8CD]">
            <h3 className="font-semibold text-gray-900 mb-2">Premium</h3>
            <p className="text-2xl font-bold text-[#1FB8CD] mb-2">${PLAN_LIMITS.premium.price}</p>
            <p className="text-xs text-gray-500 mb-3">One-time payment</p>
            <ul className="text-sm text-gray-600 space-y-1 text-left">
              <li>• Unlimited questions</li>
              <li>• Unlimited mock exams</li>
              <li>• Priority support</li>
            </ul>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/pricing"
            className="flex-1 bg-[#1FB8CD] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#1A6872] transition-colors"
          >
            View Plans
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Back to Dashboard
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
  const showQuestionWarning = questionsRemaining !== null && questionsRemaining <= 10 && questionsRemaining > 0;
  const showExamWarning = mockExamsRemaining !== null && mockExamsRemaining <= 1 && mockExamsRemaining > 0;

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

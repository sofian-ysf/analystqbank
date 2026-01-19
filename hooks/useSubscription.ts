"use client";

import { useState, useEffect, useCallback } from 'react';
import { PLAN_LIMITS, PlanType } from '@/lib/plans';

export interface SubscriptionData {
  plan: PlanType;
  status: string;
  trialEndsAt: string | null;
  isTrialExpired: boolean;
  canAccessMockExams: boolean;
  canAccessQuestions: boolean;
  mockExamsUsed: number;
  questionsAnswered: number;
  mockExamsRemaining: number | null;
  questionsRemaining: number | null;
  limits: typeof PLAN_LIMITS[PlanType];
  needsUpgrade: boolean;
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/subscription');

      if (!response.ok) {
        throw new Error('Failed to fetch subscription');
      }

      const data = await response.json();
      setSubscription(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Set default expired trial on error
      setSubscription({
        plan: 'trial',
        status: 'expired',
        trialEndsAt: null,
        isTrialExpired: true,
        canAccessMockExams: false,
        canAccessQuestions: false,
        mockExamsUsed: 0,
        questionsAnswered: 0,
        mockExamsRemaining: 0,
        questionsRemaining: 0,
        limits: PLAN_LIMITS.trial,
        needsUpgrade: true,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const refetch = useCallback(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  // Helper to get time remaining in trial
  const getTrialTimeRemaining = useCallback(() => {
    if (!subscription?.trialEndsAt) return null;

    const endDate = new Date(subscription.trialEndsAt);
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();

    if (diff <= 0) return 'Expired';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    }
    return `${minutes}m remaining`;
  }, [subscription?.trialEndsAt]);

  return {
    subscription,
    loading,
    error,
    refetch,
    getTrialTimeRemaining,
    // Convenience accessors
    canAccessQuestions: subscription?.canAccessQuestions ?? false,
    canAccessMockExams: subscription?.canAccessMockExams ?? false,
    needsUpgrade: subscription?.needsUpgrade ?? true,
    isTrialExpired: subscription?.isTrialExpired ?? false,
    plan: subscription?.plan ?? 'trial',
  };
}

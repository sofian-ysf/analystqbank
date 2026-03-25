"use client";

import { useState, useEffect, useCallback } from 'react';
import { PLAN_LIMITS, PlanType } from '@/lib/plans';

export interface SubscriptionData {
  plan: PlanType | null;
  status: string;
  canAccessMockExams: boolean;
  canAccessQuestions: boolean;
  mockExamsUsed: number;
  questionsAnswered: number;
  mockExamsRemaining: number | null;
  questionsRemaining: number | null;
  limits: typeof PLAN_LIMITS[PlanType] | null;
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
      // Set default no subscription state on error
      setSubscription({
        plan: null,
        status: 'no_subscription',
        canAccessMockExams: false,
        canAccessQuestions: false,
        mockExamsUsed: 0,
        questionsAnswered: 0,
        mockExamsRemaining: 0,
        questionsRemaining: 0,
        limits: null,
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

  return {
    subscription,
    loading,
    error,
    refetch,
    // Convenience accessors
    canAccessQuestions: subscription?.canAccessQuestions ?? false,
    canAccessMockExams: subscription?.canAccessMockExams ?? false,
    needsUpgrade: subscription?.needsUpgrade ?? true,
    plan: subscription?.plan ?? null,
  };
}

-- Manual Trial Control Migration
-- This migration sets up proper trial management without auto-granting to old users

-- ============================================
-- 1. Add Required Columns (Safe to run multiple times)
-- ============================================

ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS account_created_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS subscription_status TEXT;

ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

-- ============================================
-- 2. Backfill account_created_at for existing users
-- ============================================

UPDATE public.user_profiles
SET account_created_at = created_at
WHERE account_created_at IS NULL;

-- ============================================
-- 3. Add constraint for subscription_status
-- ============================================

DO $$
BEGIN
  ALTER TABLE public.user_profiles
  DROP CONSTRAINT IF EXISTS user_profiles_subscription_status_check;

  ALTER TABLE public.user_profiles
  ADD CONSTRAINT user_profiles_subscription_status_check
  CHECK (subscription_status IN ('trialing', 'active', 'lifetime', 'expired', 'refunded'));
EXCEPTION
  WHEN others THEN NULL;
END $$;

-- ============================================
-- 4. Set default subscription_status for new users
-- ============================================

ALTER TABLE public.user_profiles
ALTER COLUMN subscription_status SET DEFAULT 'trialing';

-- ============================================
-- 5. Mark existing users with NULL trial_ends_at as 'expired'
--    (They need manual trial grants if you want to give them access)
-- ============================================

UPDATE public.user_profiles
SET subscription_status = 'expired'
WHERE
  (subscription_plan = 'free' OR subscription_plan IS NULL)
  AND trial_ends_at IS NULL
  AND (subscription_status IS NULL OR subscription_status = 'trialing')
  AND subscription_status NOT IN ('lifetime', 'active');

-- ============================================
-- 6. Mark users with past trial_ends_at as 'expired'
-- ============================================

UPDATE public.user_profiles
SET subscription_status = 'expired'
WHERE
  trial_ends_at IS NOT NULL
  AND trial_ends_at < NOW()
  AND subscription_status = 'trialing';

-- ============================================
-- 7. Create performance indexes
-- ============================================

CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription_status
ON public.user_profiles(subscription_status);

CREATE INDEX IF NOT EXISTS idx_user_profiles_trial_ends_at
ON public.user_profiles(trial_ends_at);

CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription_plan
ON public.user_profiles(subscription_plan);

CREATE INDEX IF NOT EXISTS idx_user_profiles_stripe_customer_id
ON public.user_profiles(stripe_customer_id);

-- ============================================
-- 8. Add helpful column comments
-- ============================================

COMMENT ON COLUMN public.user_profiles.subscription_status IS
  'Trial status: trialing (active), expired (needs upgrade), lifetime (paid), active (paid subscription)';

COMMENT ON COLUMN public.user_profiles.trial_ends_at IS
  'When the 24-hour free trial expires (NULL = no trial set, use subscription_status to determine access)';

COMMENT ON COLUMN public.user_profiles.account_created_at IS
  'Timestamp when account was created (used for trial calculations)';

COMMENT ON COLUMN public.user_profiles.stripe_customer_id IS
  'Stripe customer ID for payment processing';

-- ============================================
-- 9. Verification Query - Check Current State
-- ============================================
-- Run this separately to see the results:

/*
SELECT
  COUNT(*) FILTER (WHERE subscription_status = 'trialing') as active_trials,
  COUNT(*) FILTER (WHERE subscription_status = 'expired') as expired_trials,
  COUNT(*) FILTER (WHERE subscription_status = 'lifetime') as lifetime_users,
  COUNT(*) FILTER (WHERE subscription_status IS NULL) as null_status,
  COUNT(*) FILTER (WHERE trial_ends_at IS NULL) as null_trial_date,
  COUNT(*) as total_users
FROM public.user_profiles;

SELECT
  email,
  subscription_plan,
  subscription_status,
  trial_ends_at,
  CASE
    WHEN subscription_status = 'lifetime' THEN '✓ Lifetime Access'
    WHEN subscription_status = 'expired' THEN '✗ Expired - Needs Manual Grant'
    WHEN trial_ends_at IS NULL THEN '⚠️ No Trial Date Set'
    WHEN trial_ends_at > NOW() THEN '✓ Active - ' || ROUND(EXTRACT(EPOCH FROM (trial_ends_at - NOW()))/3600, 1) || ' hrs left'
    ELSE '✗ Expired - ' || ROUND(EXTRACT(EPOCH FROM (NOW() - trial_ends_at))/3600, 1) || ' hrs ago'
  END as status,
  created_at
FROM public.user_profiles
ORDER BY created_at DESC
LIMIT 20;
*/

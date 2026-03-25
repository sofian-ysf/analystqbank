-- Smart Trial Fix Migration
-- This migration handles both new and existing users properly

-- 1. Add missing columns (safe to run multiple times)
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS account_created_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS subscription_status TEXT;

ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMP WITH TIME ZONE;

-- 2. Backfill account_created_at if missing
UPDATE public.user_profiles
SET account_created_at = created_at
WHERE account_created_at IS NULL;

-- 3. Add constraint for subscription_status if not exists
DO $$
BEGIN
  ALTER TABLE public.user_profiles
  ADD CONSTRAINT user_profiles_subscription_status_check
  CHECK (subscription_status IN ('trialing', 'active', 'lifetime', 'expired', 'refunded'));
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- 4. SMART TRIAL LOGIC: Only set trial for users created in last 7 days
-- Older users likely abandoned the platform, so mark them as expired
UPDATE public.user_profiles
SET
  trial_ends_at = CASE
    -- If created within last 24 hours, give them remaining trial time
    WHEN created_at > NOW() - INTERVAL '24 hours'
    THEN created_at + INTERVAL '24 hours'

    -- If created within last 7 days, give them a fresh 24-hour trial (generous)
    WHEN created_at > NOW() - INTERVAL '7 days'
    THEN NOW() + INTERVAL '24 hours'

    -- If created more than 7 days ago, mark trial as expired
    ELSE created_at + INTERVAL '24 hours'
  END,
  subscription_status = CASE
    -- Active if created within last 7 days
    WHEN created_at > NOW() - INTERVAL '7 days'
    THEN 'trialing'

    -- Expired if older than 7 days
    ELSE 'expired'
  END
WHERE
  -- Only update free/trial users
  (subscription_plan = 'free' OR subscription_plan IS NULL)
  -- Who don't have trial_ends_at set
  AND trial_ends_at IS NULL
  -- And aren't already paid
  AND (subscription_status IS NULL
       OR subscription_status NOT IN ('lifetime', 'active'));

-- 5. Ensure all future created users have subscription_status default
ALTER TABLE public.user_profiles
ALTER COLUMN subscription_status SET DEFAULT 'trialing';

-- 6. Create indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription_status
ON public.user_profiles(subscription_status);

CREATE INDEX IF NOT EXISTS idx_user_profiles_trial_ends_at
ON public.user_profiles(trial_ends_at);

-- 7. Verification Query
-- Run this separately to see results:
/*
SELECT
  email,
  subscription_plan,
  subscription_status,
  trial_ends_at,
  created_at,
  EXTRACT(DAY FROM (NOW() - created_at)) as days_old,
  CASE
    WHEN trial_ends_at IS NULL THEN '⚠️ NULL'
    WHEN trial_ends_at > NOW() THEN '✓ Active (' || ROUND(EXTRACT(EPOCH FROM (trial_ends_at - NOW()))/3600) || ' hrs)'
    ELSE '✗ Expired (' || ROUND(EXTRACT(EPOCH FROM (NOW() - trial_ends_at))/3600) || ' hrs ago)'
  END as status
FROM public.user_profiles
WHERE subscription_plan = 'free' OR subscription_status IN ('trialing', 'expired')
ORDER BY created_at DESC
LIMIT 20;
*/

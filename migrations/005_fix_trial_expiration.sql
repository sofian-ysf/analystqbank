-- Migration: Fix trial expiration for existing users
-- This ensures all trial users have proper trial_ends_at values

-- 1. Add account_created_at column if it doesn't exist
-- (This column is used in signup but wasn't in the original schema)
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS account_created_at TIMESTAMP WITH TIME ZONE;

-- 2. Ensure subscription_status and trial_ends_at columns exist
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'trialing'
CHECK (subscription_status IN ('trialing', 'active', 'lifetime', 'expired', 'refunded'));

ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

-- 3. Backfill account_created_at for existing users who don't have it
UPDATE public.user_profiles
SET account_created_at = created_at
WHERE account_created_at IS NULL;

-- 4. Fix existing trial users who don't have trial_ends_at set
-- Set their trial to 24 hours after account creation
UPDATE public.user_profiles
SET
  trial_ends_at = COALESCE(account_created_at, created_at) + INTERVAL '24 hours',
  subscription_status = CASE
    -- If 24 hours have passed, mark as expired
    WHEN COALESCE(account_created_at, created_at) + INTERVAL '24 hours' < NOW()
    THEN 'expired'
    -- Otherwise keep as trialing
    ELSE COALESCE(subscription_status, 'trialing')
  END
WHERE
  -- Only update users on free/trial plan
  (subscription_plan = 'free' OR subscription_plan IS NULL)
  -- Who don't have trial_ends_at set
  AND trial_ends_at IS NULL
  -- And don't have a paid status
  AND (subscription_status IS NULL OR subscription_status = 'trialing');

-- 5. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription_plan
ON public.user_profiles(subscription_plan);

CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription_status
ON public.user_profiles(subscription_status);

CREATE INDEX IF NOT EXISTS idx_user_profiles_trial_ends_at
ON public.user_profiles(trial_ends_at);

-- 6. Add helpful comments
COMMENT ON COLUMN public.user_profiles.subscription_status IS 'Current subscription status: trialing, active, lifetime, expired, refunded';
COMMENT ON COLUMN public.user_profiles.trial_ends_at IS 'When the free trial period expires (24 hours after signup)';
COMMENT ON COLUMN public.user_profiles.stripe_customer_id IS 'Stripe customer ID for payment processing';
COMMENT ON COLUMN public.user_profiles.account_created_at IS 'When the account was created (for trial calculation)';

-- 7. Verification query to check results
-- (You can run this separately to see the results)
/*
SELECT
  email,
  subscription_plan,
  subscription_status,
  trial_ends_at,
  account_created_at,
  created_at,
  CASE
    WHEN trial_ends_at IS NULL THEN 'No trial date set ⚠️'
    WHEN trial_ends_at > NOW() THEN 'Trial active ✓'
    ELSE 'Trial expired ✗'
  END as trial_status,
  EXTRACT(EPOCH FROM (NOW() - trial_ends_at))/3600 as hours_since_expiry
FROM public.user_profiles
WHERE subscription_plan = 'free' OR subscription_status = 'trialing'
ORDER BY created_at DESC;
*/

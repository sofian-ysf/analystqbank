-- Migration: Add subscription tracking columns to user_profiles
-- These columns track trial status and Stripe integration

-- Add subscription_status column
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'trialing'
CHECK (subscription_status IN ('trialing', 'active', 'lifetime', 'expired', 'refunded'));

-- Add trial_ends_at column
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMP WITH TIME ZONE;

-- Add Stripe customer ID for payment tracking
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

-- Update subscription_plan constraint to include 'trial' if needed
-- Note: The existing constraint uses 'free' which maps to 'trial' in code
-- ALTER TABLE public.user_profiles
-- DROP CONSTRAINT IF EXISTS user_profiles_subscription_plan_check;
-- ALTER TABLE public.user_profiles
-- ADD CONSTRAINT user_profiles_subscription_plan_check
-- CHECK (subscription_plan IN ('free', 'trial', 'basic', 'premium'));

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription_plan
ON public.user_profiles(subscription_plan);

CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription_status
ON public.user_profiles(subscription_status);

CREATE INDEX IF NOT EXISTS idx_user_profiles_trial_ends_at
ON public.user_profiles(trial_ends_at);

-- Comments for documentation
COMMENT ON COLUMN public.user_profiles.subscription_status IS 'Current subscription status: trialing, active, lifetime, expired, refunded';
COMMENT ON COLUMN public.user_profiles.trial_ends_at IS 'When the free trial period expires (24 hours after signup)';
COMMENT ON COLUMN public.user_profiles.stripe_customer_id IS 'Stripe customer ID for payment processing';

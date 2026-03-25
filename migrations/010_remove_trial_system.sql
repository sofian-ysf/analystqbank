-- Migration: Remove Free Trial System
-- Date: 2026-03-25
-- Description: Removes the free trial tier entirely, keeping only Basic and Premium paid plans

-- Step 1: Expire all current trial users and set their plan to NULL
-- This ensures they'll be prompted to purchase when they next log in
UPDATE public.user_profiles
SET
    subscription_status = 'expired',
    subscription_plan = NULL
WHERE subscription_plan = 'free';

-- Step 2: Remove 'free' from subscription_plan constraint
ALTER TABLE public.user_profiles
DROP CONSTRAINT IF EXISTS user_profiles_subscription_plan_check;

ALTER TABLE public.user_profiles
ADD CONSTRAINT user_profiles_subscription_plan_check
CHECK (subscription_plan IN ('basic', 'professional', 'premium'));

-- Step 3: Remove 'trialing' from subscription_status constraint
ALTER TABLE public.user_profiles
DROP CONSTRAINT IF EXISTS user_profiles_subscription_status_check;

ALTER TABLE public.user_profiles
ADD CONSTRAINT user_profiles_subscription_status_check
CHECK (subscription_status IN ('active', 'lifetime', 'expired', 'refunded'));

-- Step 3.5: Allow NULL values for subscription_plan and subscription_status
-- This is needed so new users can sign up without a plan
ALTER TABLE public.user_profiles
ALTER COLUMN subscription_plan DROP NOT NULL;

ALTER TABLE public.user_profiles
ALTER COLUMN subscription_status DROP NOT NULL;

-- Step 4: Update handle_new_user() trigger function to NOT set trial fields
-- New users will get NULL subscription and must pay before accessing content
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Create user profile WITHOUT trial info
    -- Users must purchase a plan to access content
    INSERT INTO public.user_profiles (
        id,
        email,
        full_name,
        account_created_at
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NOW()
    );

    -- Note: subscription_plan, subscription_status, and trial_ends_at are left NULL
    -- These will be set when user completes payment via Stripe

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure trigger is still set up (no change needed, just confirming)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Note: We keep trial_ends_at and account_created_at columns for historical data
-- These columns are NOT dropped to preserve existing data

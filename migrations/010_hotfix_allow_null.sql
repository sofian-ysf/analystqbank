-- Hotfix: Allow NULL values for subscription columns
-- Run this immediately to fix signup errors

-- Allow NULL for subscription_plan
ALTER TABLE public.user_profiles
ALTER COLUMN subscription_plan DROP NOT NULL;

-- Allow NULL for subscription_status
ALTER TABLE public.user_profiles
ALTER COLUMN subscription_status DROP NOT NULL;

-- Verify the fix worked
SELECT
    column_name,
    is_nullable,
    data_type
FROM information_schema.columns
WHERE table_name = 'user_profiles'
AND column_name IN ('subscription_plan', 'subscription_status');

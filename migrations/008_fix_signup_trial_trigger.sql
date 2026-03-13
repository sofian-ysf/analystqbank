-- Fix: Automatically set trial info when user signs up
-- This ensures trial_ends_at is ALWAYS set, no matter what

-- ============================================
-- 1. Update the trigger function to set trial info
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Create user profile with trial info set automatically
    INSERT INTO public.user_profiles (
        id,
        email,
        full_name,
        subscription_plan,
        subscription_status,
        trial_ends_at,
        account_created_at
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        'free',  -- Default plan
        'trialing',  -- Default status
        NOW() + INTERVAL '24 hours',  -- Trial expires in 24 hours
        NOW()  -- Account created timestamp
    );

    -- Create study streak record
    INSERT INTO public.study_streaks (user_id, current_streak, longest_streak)
    VALUES (NEW.id, 0, 0);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 2. Ensure the trigger is properly set up
-- ============================================

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 3. Fix existing users who have NULL trial_ends_at
-- ============================================

-- For users created in last 24 hours, give them remaining trial time
UPDATE public.user_profiles
SET
    trial_ends_at = created_at + INTERVAL '24 hours',
    subscription_status = CASE
        WHEN created_at + INTERVAL '24 hours' > NOW() THEN 'trialing'
        ELSE 'expired'
    END,
    subscription_plan = COALESCE(subscription_plan, 'free'),
    account_created_at = COALESCE(account_created_at, created_at)
WHERE
    trial_ends_at IS NULL
    AND (subscription_status IS NULL OR subscription_status = 'trialing')
    AND (subscription_plan IS NULL OR subscription_plan = 'free');

-- ============================================
-- 4. Verification Query
-- ============================================
-- Run this separately to verify all users have trial_ends_at set:

/*
SELECT
    email,
    subscription_status,
    trial_ends_at,
    account_created_at,
    created_at,
    CASE
        WHEN trial_ends_at IS NULL THEN '⚠️ BUG - No expiry set!'
        WHEN trial_ends_at > NOW() THEN '✓ Active - ' || ROUND(EXTRACT(EPOCH FROM (trial_ends_at - NOW()))/3600, 1) || ' hrs left'
        ELSE '✗ Expired - ' || ROUND(EXTRACT(EPOCH FROM (NOW() - trial_ends_at))/3600, 1) || ' hrs ago'
    END as trial_status
FROM public.user_profiles
WHERE subscription_plan = 'free' OR subscription_plan IS NULL
ORDER BY created_at DESC
LIMIT 20;

-- Count users with NULL trial_ends_at (should be 0 after this migration)
SELECT COUNT(*) as users_with_null_trial
FROM public.user_profiles
WHERE trial_ends_at IS NULL;
*/

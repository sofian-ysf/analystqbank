-- QUICK FIX: Grant 24-hour trial to a user who should have access
-- Use this when a specific user reports "trial expired" but they should have access

-- ============================================
-- STEP 1: Check the user's current status
-- ============================================
-- Replace 'user@example.com' with actual email
SELECT
  email,
  full_name,
  subscription_plan,
  subscription_status,
  trial_ends_at,
  created_at,
  account_created_at,
  NOW() as current_server_time,
  CASE
    WHEN trial_ends_at IS NULL THEN '⚠️ NULL - No expiry set'
    WHEN trial_ends_at > NOW() THEN '✓ Should have access - ' || ROUND(EXTRACT(EPOCH FROM (trial_ends_at - NOW()))/3600, 1) || ' hours left'
    ELSE '✗ Expired - ' || ROUND(EXTRACT(EPOCH FROM (NOW() - trial_ends_at))/3600, 1) || ' hours ago'
  END as trial_status,
  ROUND(EXTRACT(EPOCH FROM (NOW() - created_at))/3600, 1) as hours_since_signup
FROM public.user_profiles
WHERE email = 'user@example.com';  -- CHANGE THIS EMAIL


-- ============================================
-- STEP 2: If the user should have access, run this fix
-- ============================================
-- This gives them a fresh 24-hour trial from NOW

UPDATE public.user_profiles
SET
  trial_ends_at = NOW() + INTERVAL '24 hours',
  subscription_status = 'trialing',
  subscription_plan = 'free'
WHERE email = 'user@example.com';  -- CHANGE THIS EMAIL


-- ============================================
-- STEP 3: Verify the fix worked
-- ============================================
SELECT
  email,
  subscription_status,
  trial_ends_at,
  ROUND(EXTRACT(EPOCH FROM (trial_ends_at - NOW()))/3600, 1) as hours_remaining,
  CASE
    WHEN trial_ends_at > NOW() THEN '✓ FIXED - User now has access'
    ELSE '✗ Still expired - something went wrong'
  END as fix_status
FROM public.user_profiles
WHERE email = 'user@example.com';  -- CHANGE THIS EMAIL


-- ============================================
-- ALTERNATIVE: Grant LIFETIME access (if they paid or for testing)
-- ============================================
/*
UPDATE public.user_profiles
SET
  subscription_status = 'lifetime',
  subscription_plan = 'premium',
  trial_ends_at = NULL  -- No expiry for lifetime users
WHERE email = 'user@example.com';
*/


-- ============================================
-- BULK FIX: Give fresh trials to all users created in last 7 days
-- ============================================
-- Use this if multiple recent users are reporting the same issue
/*
UPDATE public.user_profiles
SET
  trial_ends_at = NOW() + INTERVAL '24 hours',
  subscription_status = 'trialing'
WHERE
  subscription_plan = 'free'
  AND created_at > NOW() - INTERVAL '7 days'
  AND (trial_ends_at IS NULL OR trial_ends_at < NOW());

-- Check how many users were affected
SELECT COUNT(*) as users_fixed
FROM public.user_profiles
WHERE
  subscription_plan = 'free'
  AND created_at > NOW() - INTERVAL '7 days'
  AND trial_ends_at > NOW();
*/

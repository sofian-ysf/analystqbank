-- Trial Management Queries
-- Use these queries in Supabase SQL Editor to manage trial users

-- ============================================
-- 1. CHECK ALL TRIAL USERS STATUS
-- ============================================
SELECT
  id,
  email,
  full_name,
  subscription_plan,
  subscription_status,
  trial_ends_at,
  account_created_at,
  created_at,
  CASE
    WHEN trial_ends_at IS NULL THEN '⚠️ No trial date set (UNLIMITED ACCESS BUG!)'
    WHEN trial_ends_at > NOW() THEN '✓ Trial active'
    ELSE '✗ Trial expired'
  END as trial_status,
  CASE
    WHEN trial_ends_at IS NULL THEN NULL
    WHEN trial_ends_at > NOW() THEN EXTRACT(EPOCH FROM (trial_ends_at - NOW()))/3600
    ELSE -EXTRACT(EPOCH FROM (NOW() - trial_ends_at))/3600
  END as hours_remaining
FROM public.user_profiles
WHERE subscription_plan = 'free' OR subscription_status IN ('trialing', 'expired')
ORDER BY created_at DESC;


-- ============================================
-- 2. FIND USERS WITH UNLIMITED TRIAL ACCESS (BUG)
-- ============================================
SELECT
  id,
  email,
  subscription_plan,
  subscription_status,
  trial_ends_at,
  created_at,
  EXTRACT(DAY FROM (NOW() - created_at)) as days_since_signup
FROM public.user_profiles
WHERE
  (subscription_plan = 'free' OR subscription_plan IS NULL)
  AND trial_ends_at IS NULL
  AND (subscription_status IS NULL OR subscription_status = 'trialing')
ORDER BY created_at ASC;


-- ============================================
-- 3. MANUALLY EXPIRE A SPECIFIC USER'S TRIAL
-- ============================================
-- Replace 'user@example.com' with the actual email
/*
UPDATE public.user_profiles
SET
  subscription_status = 'expired',
  trial_ends_at = NOW() - INTERVAL '1 hour'
WHERE email = 'user@example.com';
*/


-- ============================================
-- 4. EXTEND A USER'S TRIAL BY 24 HOURS
-- ============================================
-- Replace 'user@example.com' with the actual email
/*
UPDATE public.user_profiles
SET
  trial_ends_at = NOW() + INTERVAL '24 hours',
  subscription_status = 'trialing'
WHERE email = 'user@example.com';
*/


-- ============================================
-- 5. GRANT LIFETIME ACCESS TO A USER
-- ============================================
-- Replace 'user@example.com' with the actual email
/*
UPDATE public.user_profiles
SET
  subscription_status = 'lifetime',
  subscription_plan = 'premium'
WHERE email = 'user@example.com';
*/


-- ============================================
-- 6. RESET A USER TO FRESH TRIAL (24 HOURS)
-- ============================================
-- Replace 'user@example.com' with the actual email
/*
UPDATE public.user_profiles
SET
  trial_ends_at = NOW() + INTERVAL '24 hours',
  subscription_status = 'trialing',
  subscription_plan = 'free'
WHERE email = 'user@example.com';
*/


-- ============================================
-- 7. GET SUBSCRIPTION STATISTICS
-- ============================================
SELECT
  subscription_plan,
  subscription_status,
  COUNT(*) as user_count,
  COUNT(CASE WHEN trial_ends_at IS NULL THEN 1 END) as null_trial_count,
  COUNT(CASE WHEN trial_ends_at > NOW() THEN 1 END) as active_trials,
  COUNT(CASE WHEN trial_ends_at <= NOW() THEN 1 END) as expired_trials
FROM public.user_profiles
GROUP BY subscription_plan, subscription_status
ORDER BY subscription_plan, subscription_status;


-- ============================================
-- 8. FIND USERS WHO SIGNED UP TODAY
-- ============================================
SELECT
  email,
  full_name,
  subscription_plan,
  subscription_status,
  trial_ends_at,
  created_at,
  CASE
    WHEN trial_ends_at > NOW() THEN 'Active'
    ELSE 'Expired/Invalid'
  END as status
FROM public.user_profiles
WHERE created_at::date = CURRENT_DATE
ORDER BY created_at DESC;


-- ============================================
-- 9. BULK EXPIRE ALL TRIALS OLDER THAN 24 HOURS
-- ============================================
-- CAUTION: This will expire ALL trials that should be expired
/*
UPDATE public.user_profiles
SET subscription_status = 'expired'
WHERE
  subscription_plan = 'free'
  AND subscription_status = 'trialing'
  AND trial_ends_at IS NOT NULL
  AND trial_ends_at < NOW();
*/


-- ============================================
-- 10. COUNT ACTIVE VS EXPIRED TRIALS
-- ============================================
SELECT
  CASE
    WHEN trial_ends_at IS NULL THEN 'No expiry set (BUG)'
    WHEN trial_ends_at > NOW() THEN 'Active trial'
    ELSE 'Expired trial'
  END as category,
  COUNT(*) as count,
  array_agg(email ORDER BY created_at DESC) FILTER (WHERE trial_ends_at IS NULL) as affected_users
FROM public.user_profiles
WHERE subscription_plan = 'free' OR subscription_status = 'trialing'
GROUP BY category;

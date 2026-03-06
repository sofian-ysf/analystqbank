# Manual Trial Management Guide

## Overview
You now have full manual control over trial access. The system:
- ✅ **Auto-grants trials** to new signups (24 hours)
- ✅ **Respects `subscription_status`** field for access control
- ✅ **Blocks expired users** automatically
- ✅ **Lets you manually grant/extend/revoke** trials as needed

---

## How Access Control Works

### Access is determined by `subscription_status`:

| Status | Access | When to Use |
|--------|--------|-------------|
| `trialing` | ✅ Allowed (if `trial_ends_at` > NOW) | Active free trial users |
| `expired` | ❌ Blocked | Trial ended, needs upgrade |
| `lifetime` | ✅ Allowed (unlimited) | Paid users (one-time payment) |
| `active` | ✅ Allowed (unlimited) | Paid subscriptions |
| `refunded` | ❌ Blocked | Payment refunded |

---

## Common Operations

### 1. **Grant 24-Hour Trial to a User**
```sql
UPDATE public.user_profiles
SET
  trial_ends_at = NOW() + INTERVAL '24 hours',
  subscription_status = 'trialing'
WHERE email = 'user@example.com';
```

### 2. **Extend Trial by 24 Hours**
```sql
UPDATE public.user_profiles
SET
  trial_ends_at = trial_ends_at + INTERVAL '24 hours',
  subscription_status = 'trialing'
WHERE email = 'user@example.com';
```

### 3. **Extend Trial to Specific Date/Time**
```sql
UPDATE public.user_profiles
SET
  trial_ends_at = '2026-03-10 15:00:00+00',  -- Specific UTC time
  subscription_status = 'trialing'
WHERE email = 'user@example.com';
```

### 4. **Grant Lifetime Access (Paid User)**
```sql
UPDATE public.user_profiles
SET
  subscription_status = 'lifetime',
  subscription_plan = 'premium',
  trial_ends_at = NULL  -- No expiry for lifetime users
WHERE email = 'user@example.com';
```

### 5. **Immediately Expire a User's Trial**
```sql
UPDATE public.user_profiles
SET
  subscription_status = 'expired',
  trial_ends_at = NOW() - INTERVAL '1 hour'
WHERE email = 'user@example.com';
```

### 6. **Reactivate an Expired Trial**
```sql
UPDATE public.user_profiles
SET
  trial_ends_at = NOW() + INTERVAL '24 hours',
  subscription_status = 'trialing'
WHERE email = 'user@example.com';
```

---

## Checking User Status

### Check a Specific User
```sql
SELECT
  email,
  full_name,
  subscription_plan,
  subscription_status,
  trial_ends_at,
  CASE
    WHEN subscription_status = 'lifetime' THEN '✓ Lifetime Access'
    WHEN subscription_status = 'active' THEN '✓ Active Subscription'
    WHEN subscription_status = 'expired' THEN '✗ Expired - Needs Upgrade'
    WHEN subscription_status = 'trialing' AND trial_ends_at > NOW()
      THEN '✓ Trial Active - ' || ROUND(EXTRACT(EPOCH FROM (trial_ends_at - NOW()))/3600, 1) || ' hrs left'
    WHEN subscription_status = 'trialing' AND trial_ends_at <= NOW()
      THEN '✗ Trial Expired - ' || ROUND(EXTRACT(EPOCH FROM (NOW() - trial_ends_at))/3600, 1) || ' hrs ago'
    ELSE '⚠️ Unknown Status'
  END as access_status,
  created_at
FROM public.user_profiles
WHERE email = 'user@example.com';
```

### View All Active Trials
```sql
SELECT
  email,
  subscription_status,
  trial_ends_at,
  ROUND(EXTRACT(EPOCH FROM (trial_ends_at - NOW()))/3600, 1) as hours_remaining,
  created_at
FROM public.user_profiles
WHERE subscription_status = 'trialing'
  AND trial_ends_at > NOW()
ORDER BY trial_ends_at ASC
LIMIT 50;
```

### View All Expired Trials (Need Upgrade)
```sql
SELECT
  email,
  subscription_status,
  trial_ends_at,
  ROUND(EXTRACT(EPOCH FROM (NOW() - trial_ends_at))/3600, 1) as hours_since_expiry,
  created_at
FROM public.user_profiles
WHERE subscription_status = 'expired'
  OR (subscription_status = 'trialing' AND trial_ends_at < NOW())
ORDER BY trial_ends_at DESC
LIMIT 50;
```

### Get Trial Statistics
```sql
SELECT
  subscription_status,
  COUNT(*) as user_count,
  COUNT(*) FILTER (WHERE trial_ends_at > NOW()) as active_count,
  COUNT(*) FILTER (WHERE trial_ends_at <= NOW()) as expired_count
FROM public.user_profiles
GROUP BY subscription_status
ORDER BY user_count DESC;
```

---

## Bulk Operations

### Grant Fresh 24-Hour Trials to Multiple Users
```sql
-- Example: Grant to users who signed up today
UPDATE public.user_profiles
SET
  trial_ends_at = NOW() + INTERVAL '24 hours',
  subscription_status = 'trialing'
WHERE
  created_at::date = CURRENT_DATE
  AND subscription_status = 'expired';

-- Verify how many were updated
SELECT COUNT(*) FROM public.user_profiles
WHERE created_at::date = CURRENT_DATE AND subscription_status = 'trialing';
```

### Expire All Trials Older Than 24 Hours
```sql
-- Auto-expire trials that should be expired
UPDATE public.user_profiles
SET subscription_status = 'expired'
WHERE
  subscription_status = 'trialing'
  AND trial_ends_at IS NOT NULL
  AND trial_ends_at < NOW();
```

---

## Setting Up Auto-Expiration (Optional)

If you want trials to automatically expire without manual intervention, create this database function:

```sql
-- Create function to auto-expire trials
CREATE OR REPLACE FUNCTION auto_expire_trials()
RETURNS void AS $$
BEGIN
  UPDATE public.user_profiles
  SET subscription_status = 'expired'
  WHERE
    subscription_status = 'trialing'
    AND trial_ends_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Call this function daily via Supabase Edge Functions or a cron job
-- Or manually run: SELECT auto_expire_trials();
```

You can set up a daily cron job in Supabase:
1. Go to Database → Extensions → Enable `pg_cron`
2. Create a schedule:
```sql
SELECT cron.schedule(
  'expire-trials-daily',
  '0 0 * * *',  -- Run at midnight UTC
  'SELECT auto_expire_trials();'
);
```

---

## Important Notes

### 1. **New Signups Get Automatic Trials**
The signup flow (`app/signup/page.tsx`) automatically sets:
- `trial_ends_at = NOW() + 24 hours`
- `subscription_status = 'trialing'`
- `subscription_plan = 'free'`

This happens automatically and doesn't require manual intervention.

### 2. **Subscription Status Has Priority**
The API checks `subscription_status` first:
- If `status = 'expired'` → Blocked (regardless of `trial_ends_at`)
- If `status = 'lifetime'` or `'active'` → Allowed (unlimited)
- If `status = 'trialing'` → Check `trial_ends_at`

### 3. **Timezone: All Times are UTC**
Supabase uses UTC. When setting specific times, use UTC:
```sql
-- 3 PM UTC on March 10, 2026
SET trial_ends_at = '2026-03-10 15:00:00+00'
```

### 4. **NULL trial_ends_at Handling**
- If `status = 'trialing'` and `trial_ends_at = NULL` → User can access (no expiry check)
- If `status = 'expired'` and `trial_ends_at = NULL` → User is blocked

It's recommended to always set `trial_ends_at` for clarity.

---

## Quick Reference

**File Locations:**
- Migration: `migrations/007_manual_trial_control.sql`
- Quick fixes: `QUICK_FIX_ACTIVE_USER.sql`
- Management queries: `migrations/trial_management_queries.sql`
- This guide: `MANUAL_TRIAL_MANAGEMENT.md`

**Access Control Logic:** `app/api/subscription/route.ts` line 47-50

**Signup Logic:** `app/signup/page.tsx` line 72-88

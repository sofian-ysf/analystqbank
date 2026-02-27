# Trial Expiration Fix Guide

## Problem
Users with NULL `trial_ends_at` values have unlimited trial access because the system doesn't consider their trial expired.

## What Was Fixed

### 1. **Database Migration** (`migrations/005_fix_trial_expiration.sql`)
- Adds missing `account_created_at` column
- Backfills trial expiration dates for existing users
- Automatically expires trials older than 24 hours
- Sets proper `subscription_status` values

### 2. **API Safety Fix** (`app/api/subscription/route.ts`)
- Updated trial expiration logic to treat NULL `trial_ends_at` as expired
- **Before**: `plan === 'trial' && trialEndsAt !== null && now > trialEndsAt`
- **After**: `plan === 'trial' && (trialEndsAt === null || now > trialEndsAt)`

## How to Apply the Fix

### Step 1: Run the Migration in Supabase

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `migrations/005_fix_trial_expiration.sql`
4. Paste and click **Run**

This will:
- ✅ Add missing columns if they don't exist
- ✅ Set trial_ends_at = account_created_at + 24 hours for all users
- ✅ Mark expired trials with `subscription_status = 'expired'`
- ✅ Keep active trials as `subscription_status = 'trialing'`

### Step 2: Deploy the API Fix

The code change in `app/api/subscription/route.ts` needs to be deployed:

```bash
cd /Users/abdulyoussef/Documents/GitHub/analystqbank
git add app/api/subscription/route.ts
git commit -m "Fix trial expiration logic to handle NULL trial_ends_at"
git push
```

If you're using Vercel, it will auto-deploy. Otherwise, deploy manually.

### Step 3: Verify the Fix

Run this query in Supabase SQL Editor to check all trial users:

```sql
SELECT
  email,
  subscription_plan,
  subscription_status,
  trial_ends_at,
  CASE
    WHEN trial_ends_at IS NULL THEN '⚠️ No trial date'
    WHEN trial_ends_at > NOW() THEN '✓ Active'
    ELSE '✗ Expired'
  END as status,
  EXTRACT(DAY FROM (NOW() - created_at)) as days_since_signup
FROM public.user_profiles
WHERE subscription_plan = 'free'
ORDER BY created_at DESC
LIMIT 20;
```

You should see:
- ✅ All users have `trial_ends_at` values (no NULLs)
- ✅ Users older than 24 hours have `subscription_status = 'expired'`
- ✅ Users within 24 hours have `subscription_status = 'trialing'`

---

## Useful Queries

### Check for users with unlimited access (should be 0 after fix)
```sql
SELECT COUNT(*) as bug_count
FROM public.user_profiles
WHERE subscription_plan = 'free'
  AND trial_ends_at IS NULL;
```

### Manually expire a specific user
```sql
UPDATE public.user_profiles
SET subscription_status = 'expired'
WHERE email = 'user@example.com';
```

### Grant lifetime access to a user
```sql
UPDATE public.user_profiles
SET
  subscription_status = 'lifetime',
  subscription_plan = 'premium'
WHERE email = 'user@example.com';
```

### Extend a user's trial by 24 hours
```sql
UPDATE public.user_profiles
SET
  trial_ends_at = NOW() + INTERVAL '24 hours',
  subscription_status = 'trialing'
WHERE email = 'user@example.com';
```

---

## What Happens Now

After applying the fix:

1. **New signups**: Automatically get `trial_ends_at` set to 24 hours from signup
2. **Existing users**: Have been backfilled with proper expiration dates
3. **API behavior**: Users with NULL or expired `trial_ends_at` are blocked from access
4. **Upgrade flow**: Expired users are prompted to upgrade when they try to access features

---

## Testing the Fix

### Test 1: Check Expired Trial User
1. Find a user whose trial should be expired (created > 24 hours ago)
2. Try logging in as that user
3. Navigate to `/dashboard` or `/question-bank`
4. You should see upgrade prompts and limited access

### Test 2: Check Active Trial User
1. Create a new account
2. Verify in database: `trial_ends_at` is set to NOW() + 24 hours
3. Access should work normally for 24 hours

### Test 3: API Response
```bash
# As an expired trial user, call the subscription API
curl -X GET https://your-app.vercel.app/api/subscription \
  -H "Cookie: your-session-cookie"

# Response should show:
{
  "isTrialExpired": true,
  "canAccessQuestions": false,
  "canAccessMockExams": false,
  "needsUpgrade": true
}
```

---

## Monitoring

Use `migrations/trial_management_queries.sql` for ongoing monitoring:
- Query #1: Check all trial users status
- Query #2: Find users with unlimited access bug
- Query #7: Get subscription statistics
- Query #10: Count active vs expired trials

---

## Rollback (if needed)

If something goes wrong, you can rollback the API change:

```sql
-- In app/api/subscription/route.ts, change back to:
const isTrialExpired = plan === 'trial' && trialEndsAt !== null && now > trialEndsAt;
```

But the database migration should **not** be rolled back as it fixes data integrity issues.

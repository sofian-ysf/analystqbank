# Fix: NULL trial_ends_at Issue

## 🐛 **The Problem**

Sometimes `trial_ends_at` was NULL after signup, giving users unlimited access.

### Root Cause:
1. Database trigger created user profile without trial info
2. Signup page tried to UPDATE trial info afterward
3. If UPDATE failed silently → `trial_ends_at` stayed NULL
4. No error handling to catch failures

---

## ✅ **The Solution**

**Set trial info in the database trigger** - guaranteed to work every time.

### What Changed:

#### Before:
```sql
-- Trigger created profile without trial info
INSERT INTO user_profiles (id, email, full_name) VALUES (...);
-- Then signup page tried to UPDATE (could fail)
```

#### After:
```sql
-- Trigger creates profile WITH trial info (guaranteed)
INSERT INTO user_profiles (
    id, email, full_name,
    subscription_plan, subscription_status,
    trial_ends_at, account_created_at
) VALUES (
    ...,
    'free', 'trialing',
    NOW() + INTERVAL '24 hours', NOW()
);
```

---

## 🚀 **How to Apply the Fix**

### Step 1: Run Migration in Supabase

1. Open **Supabase → SQL Editor**
2. Copy the entire contents of: `migrations/008_fix_signup_trial_trigger.sql`
3. Click **Run**

This will:
- ✅ Update the trigger to set trial info automatically
- ✅ Fix existing users with NULL `trial_ends_at`
- ✅ Ensure all future signups have trial expiration set

### Step 2: Deploy Updated Signup Code

```bash
cd /Users/abdulyoussef/Documents/GitHub/analystqbank
git add app/signup/page.tsx migrations/008_fix_signup_trial_trigger.sql
git commit -m "Fix NULL trial_ends_at issue with database trigger"
git push
```

### Step 3: Verify the Fix

Run this in Supabase SQL Editor:

```sql
-- Check for users with NULL trial_ends_at (should be 0)
SELECT COUNT(*) as null_trial_count
FROM public.user_profiles
WHERE trial_ends_at IS NULL;

-- View all users and their trial status
SELECT
    email,
    subscription_status,
    trial_ends_at,
    created_at,
    CASE
        WHEN trial_ends_at IS NULL THEN '⚠️ BUG - No expiry!'
        WHEN trial_ends_at > NOW() THEN '✓ Active'
        ELSE '✗ Expired'
    END as status
FROM public.user_profiles
WHERE subscription_plan = 'free'
ORDER BY created_at DESC
LIMIT 20;
```

**Expected Result:** `null_trial_count = 0`

---

## 🧪 **Test New Signups**

### Test 1: Create a new account
1. Sign up with a test email
2. Check database immediately:

```sql
SELECT
    email,
    subscription_status,
    trial_ends_at,
    account_created_at,
    EXTRACT(EPOCH FROM (trial_ends_at - NOW()))/3600 as hours_remaining
FROM public.user_profiles
WHERE email = 'test@example.com';
```

**Expected:**
- `subscription_status`: `trialing`
- `trial_ends_at`: Set to 24 hours from now
- `hours_remaining`: ~24 hours

### Test 2: Verify trial expires after 24 hours
1. Wait 24+ hours (or manually update `trial_ends_at` to past)
2. Try logging in and accessing features
3. Should see "trial expired" message

---

## 🔍 **How It Works Now**

### Signup Flow:

```
1. User submits signup form
   ↓
2. Supabase creates user in auth.users
   ↓
3. DATABASE TRIGGER fires automatically:
   - Creates user_profiles record
   - Sets subscription_plan = 'free'
   - Sets subscription_status = 'trialing'
   - Sets trial_ends_at = NOW() + 24 hours ← GUARANTEED
   - Sets account_created_at = NOW()
   ↓
4. Signup page UPDATE runs (backup):
   - Updates trial info again
   - Has error handling now
   - Won't break signup if it fails
   ↓
5. User redirected to dashboard with 24-hour trial
```

### Key Improvements:

✅ **Database trigger sets trial info** → Can't fail
✅ **Signup page UPDATE is backup** → Extra safety
✅ **Error handling added** → Won't silently fail
✅ **Existing users fixed** → Migration backfills NULL values

---

## 📊 **Monitoring**

### Daily check for NULL trials:
```sql
-- Should always return 0
SELECT COUNT(*) as null_trial_count
FROM public.user_profiles
WHERE trial_ends_at IS NULL
  AND (subscription_status IS NULL OR subscription_status = 'trialing');
```

### Weekly audit of recent signups:
```sql
-- Check signups from last 7 days
SELECT
    DATE(created_at) as signup_date,
    COUNT(*) as signups,
    COUNT(*) FILTER (WHERE trial_ends_at IS NULL) as null_trials,
    COUNT(*) FILTER (WHERE trial_ends_at IS NOT NULL) as valid_trials
FROM public.user_profiles
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY signup_date DESC;
```

---

## 🆘 **If You Still See NULL Trials**

### Quick fix for specific user:
```sql
UPDATE public.user_profiles
SET
    trial_ends_at = NOW() + INTERVAL '24 hours',
    subscription_status = 'trialing',
    account_created_at = COALESCE(account_created_at, created_at)
WHERE email = 'user@example.com';
```

### Bulk fix for all NULL trials:
```sql
UPDATE public.user_profiles
SET
    trial_ends_at = created_at + INTERVAL '24 hours',
    subscription_status = CASE
        WHEN created_at + INTERVAL '24 hours' > NOW() THEN 'trialing'
        ELSE 'expired'
    END,
    account_created_at = COALESCE(account_created_at, created_at)
WHERE trial_ends_at IS NULL
  AND (subscription_plan = 'free' OR subscription_plan IS NULL);
```

---

## ✅ **Success Criteria**

After applying this fix, you should have:

- [ ] Migration ran successfully
- [ ] Updated code deployed
- [ ] Zero users with NULL `trial_ends_at`
- [ ] New signups automatically get 24-hour trials
- [ ] Test signup works correctly
- [ ] All trials expire after 24 hours

---

**Files Modified:**
- `migrations/008_fix_signup_trial_trigger.sql` - New migration
- `app/signup/page.tsx` - Added error handling
- `FIX_NULL_TRIAL_ISSUE.md` - This guide

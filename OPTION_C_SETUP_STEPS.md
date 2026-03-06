# Option C Setup: Manual Trial Control

## What You're Getting
✅ New signups automatically get 24-hour trials
✅ You manually grant trials to existing/special users
✅ System properly blocks expired trials
✅ Full control via simple SQL queries

---

## 🚀 Setup Steps (Do in Order)

### Step 1: Run the Migration in Supabase

1. Open your **Supabase Dashboard** → **SQL Editor**
2. Copy the entire contents of: `migrations/007_manual_trial_control.sql`
3. Paste and click **Run**
4. This will:
   - Add required columns
   - Mark existing users as 'expired' (you'll grant trials manually)
   - Set up proper indexes
   - Prepare the system for manual control

### Step 2: Deploy the Updated API

```bash
cd /Users/abdulyoussef/Documents/GitHub/analystqbank

# Stage changes
git add app/api/subscription/route.ts
git add migrations/007_manual_trial_control.sql
git add MANUAL_TRIAL_MANAGEMENT.md
git add QUICK_FIX_ACTIVE_USER.sql
git add OPTION_C_SETUP_STEPS.md

# Commit
git commit -m "Setup manual trial control - Option C implementation"

# Push (will auto-deploy on Vercel)
git push
```

### Step 3: Fix the User Who Reported the Issue

In Supabase SQL Editor:

```sql
-- Replace with their actual email
UPDATE public.user_profiles
SET
  trial_ends_at = NOW() + INTERVAL '24 hours',
  subscription_status = 'trialing'
WHERE email = 'THEIR_EMAIL_HERE';

-- Verify it worked
SELECT email, subscription_status, trial_ends_at,
       ROUND(EXTRACT(EPOCH FROM (trial_ends_at - NOW()))/3600, 1) as hours_remaining
FROM public.user_profiles
WHERE email = 'THEIR_EMAIL_HERE';
```

They should now have 24 hours of access.

### Step 4: Review All Users

Check who needs trial access:

```sql
SELECT
  email,
  subscription_status,
  trial_ends_at,
  CASE
    WHEN subscription_status = 'lifetime' THEN '✓ Paid'
    WHEN subscription_status = 'trialing' AND trial_ends_at > NOW() THEN '✓ Active Trial'
    WHEN subscription_status = 'expired' THEN '✗ Needs Manual Grant'
    ELSE '⚠️ Check Status'
  END as status,
  ROUND(EXTRACT(EPOCH FROM (NOW() - created_at))/86400, 1) as days_since_signup
FROM public.user_profiles
ORDER BY created_at DESC
LIMIT 50;
```

---

## 📋 Daily Operations

### When a User Needs Trial Access

**Option A: Give 24-hour trial**
```sql
UPDATE public.user_profiles
SET trial_ends_at = NOW() + INTERVAL '24 hours', subscription_status = 'trialing'
WHERE email = 'user@example.com';
```

**Option B: Give 7-day trial**
```sql
UPDATE public.user_profiles
SET trial_ends_at = NOW() + INTERVAL '7 days', subscription_status = 'trialing'
WHERE email = 'user@example.com';
```

**Option C: Give lifetime access**
```sql
UPDATE public.user_profiles
SET subscription_status = 'lifetime', subscription_plan = 'premium', trial_ends_at = NULL
WHERE email = 'user@example.com';
```

### Check User Before Granting Access
```sql
SELECT email, subscription_status, trial_ends_at, created_at
FROM public.user_profiles
WHERE email = 'user@example.com';
```

---

## 🔍 Monitoring

### View Active Trials
```sql
SELECT email, trial_ends_at,
       ROUND(EXTRACT(EPOCH FROM (trial_ends_at - NOW()))/3600, 1) as hours_left
FROM public.user_profiles
WHERE subscription_status = 'trialing' AND trial_ends_at > NOW()
ORDER BY trial_ends_at ASC;
```

### View Expired Trials
```sql
SELECT email, trial_ends_at,
       ROUND(EXTRACT(EPOCH FROM (NOW() - trial_ends_at))/3600, 1) as hours_expired
FROM public.user_profiles
WHERE subscription_status = 'expired'
ORDER BY trial_ends_at DESC
LIMIT 20;
```

### Get Statistics
```sql
SELECT
  subscription_status,
  COUNT(*) as user_count
FROM public.user_profiles
GROUP BY subscription_status;
```

---

## 🎯 What Happens Now

### ✅ New Signups
- User signs up → Automatically gets 24-hour trial
- `subscription_status = 'trialing'`
- `trial_ends_at = NOW() + 24 hours`
- No manual intervention needed

### ✅ Existing Users
- Marked as `subscription_status = 'expired'`
- You grant trials manually when needed
- Full control over duration (24 hours, 7 days, lifetime, etc.)

### ✅ Access Control
- API checks `subscription_status` first
- If `'expired'` → User is blocked
- If `'trialing'` → Check `trial_ends_at`
- If `'lifetime'` → Unlimited access

### ✅ User Experience
- Expired users see upgrade prompts
- Active trial users see time remaining
- Paid users have unlimited access

---

## 📚 Reference Files

- **This Guide**: `OPTION_C_SETUP_STEPS.md`
- **Manual Operations**: `MANUAL_TRIAL_MANAGEMENT.md`
- **Quick Fixes**: `QUICK_FIX_ACTIVE_USER.sql`
- **All Queries**: `migrations/trial_management_queries.sql`

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Migration ran successfully in Supabase
- [ ] Code deployed to production
- [ ] Blocked user now has access
- [ ] New signups get automatic 24-hour trials
- [ ] Expired users are properly blocked
- [ ] You can manually grant trials via SQL

---

## 🆘 If Something Goes Wrong

### User says they're still blocked:
```sql
-- Force a fresh trial
UPDATE public.user_profiles
SET trial_ends_at = NOW() + INTERVAL '24 hours', subscription_status = 'trialing'
WHERE email = 'user@example.com';
```

### Check if code deployed:
```bash
# Check your Vercel dashboard for latest deployment
# Or check the API directly:
curl https://your-app.vercel.app/api/subscription \
  -H "Cookie: your-session-cookie"
```

### Rollback migration:
```sql
-- Mark all users as trialing (emergency rollback)
UPDATE public.user_profiles
SET subscription_status = 'trialing'
WHERE subscription_plan = 'free';
```

Need help? Check `MANUAL_TRIAL_MANAGEMENT.md` for detailed operations.

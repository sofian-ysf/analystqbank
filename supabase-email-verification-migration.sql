-- Migration: Add account creation tracking to user_profiles
-- Run this in your Supabase SQL Editor
-- Note: We use Supabase's built-in email_confirmed_at field from auth.users

-- Add account creation timestamp for tracking 24-hour verification window
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS account_created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_account_created
  ON public.user_profiles(account_created_at);

-- Add comment for documentation
COMMENT ON COLUMN public.user_profiles.account_created_at IS 'Timestamp when account was created (for 24hr email verification window)';

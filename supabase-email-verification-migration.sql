-- Migration: Add email verification tracking to user_profiles
-- Run this in your Supabase SQL Editor

-- Add email verification columns if they don't exist
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS email_verification_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS email_verification_token TEXT,
ADD COLUMN IF NOT EXISTS email_verification_token_expires TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS account_created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add index for faster queries on email verification status
CREATE INDEX IF NOT EXISTS idx_user_profiles_email_verified
  ON public.user_profiles(email_verified_at);

CREATE INDEX IF NOT EXISTS idx_user_profiles_account_created
  ON public.user_profiles(account_created_at);

-- Add comments for documentation
COMMENT ON COLUMN public.user_profiles.email_verified_at IS 'Timestamp when user verified their email address';
COMMENT ON COLUMN public.user_profiles.email_verification_sent_at IS 'Timestamp when last verification email was sent';
COMMENT ON COLUMN public.user_profiles.account_created_at IS 'Timestamp when account was created (for 24hr verification window)';

-- Fix: Working trigger without study_streaks dependency
-- This version works even if study_streaks table doesn't exist

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Create user profile with trial info
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
        'free',
        'trialing',
        NOW() + INTERVAL '24 hours',
        NOW()
    );

    -- Optionally create study_streaks record (only if table exists)
    -- Removed to prevent errors if table doesn't exist

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure trigger is set up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

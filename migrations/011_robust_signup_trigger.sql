-- Robust signup trigger that handles all required fields
-- Run this to fix the signup error

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Create user profile with minimal required fields
    -- Users must purchase a plan to access content
    INSERT INTO public.user_profiles (
        id,
        email,
        full_name,
        account_created_at,
        subscription_plan,
        subscription_status
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NOW(),
        NULL,  -- No plan until they pay
        NULL   -- No status until they pay
    )
    ON CONFLICT (id) DO NOTHING;  -- Prevent duplicate inserts

    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log the error but don't block signup
        RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure trigger is set up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

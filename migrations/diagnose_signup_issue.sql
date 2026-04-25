-- Diagnostic queries to find the signup issue

-- 1. Check all NOT NULL constraints on user_profiles
SELECT
    column_name,
    is_nullable,
    column_default,
    data_type
FROM information_schema.columns
WHERE table_name = 'user_profiles'
AND is_nullable = 'NO'
ORDER BY ordinal_position;

-- 2. Check the current trigger function
SELECT pg_get_functiondef('public.handle_new_user()'::regprocedure);

-- 3. Test if we can insert a minimal user profile
-- (This will show us what's failing)
-- Note: Replace 'test-user-id' with a real UUID if you want to test
/*
INSERT INTO public.user_profiles (
    id,
    email,
    full_name,
    account_created_at
)
VALUES (
    gen_random_uuid(),
    'test@example.com',
    'Test User',
    NOW()
);
*/

-- 4. Check for any foreign key constraints that might be failing
SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'user_profiles'
AND tc.constraint_type = 'FOREIGN KEY';

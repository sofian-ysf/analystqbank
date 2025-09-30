# Database Setup Instructions

## Setting Up the User Profile Database

To enable comprehensive user data storage and progress tracking, you need to set up the database tables in your Supabase project.

### 1. Access Supabase SQL Editor

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `analystqbank`
3. Navigate to **SQL Editor** in the left sidebar

### 2. Execute the Database Schema

1. Copy the entire contents of `database-schema.sql`
2. Paste it into the SQL Editor
3. Click **Run** to execute all the SQL commands

This will create the following tables:
- `user_profiles` - Store user settings, exam info, preferences
- `user_progress` - Track progress by topic
- `study_sessions` - Record individual study sessions
- `user_achievements` - Store earned achievements
- `study_streaks` - Track study streaks

### 3. Verify Tables Were Created

Check that all tables exist:
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('user_profiles', 'user_progress', 'study_sessions', 'user_achievements', 'study_streaks');
```

### 4. Test the Setup

1. **Create a test user account** on your website
2. **Go to Settings page** and update some information
3. **Check the database** to verify data is being stored:

```sql
-- Check if user profile was created
SELECT * FROM user_profiles LIMIT 5;

-- Check RLS policies are working
SELECT * FROM user_profiles WHERE id = 'your-user-id';
```

## What This Enables

### ✅ **User Settings Persistence**
- All user preferences saved to database
- Exam dates, study goals, notification settings
- Privacy preferences and subscription info

### ✅ **Progress Tracking**
- Questions answered and accuracy by topic
- Study time tracking
- Performance analytics over time

### ✅ **Study Sessions**
- Complete session history
- Mock exam results
- Practice session details

### ✅ **Achievements System**
- Milestone tracking
- Badge earning
- Progress gamification

### ✅ **Study Streaks**
- Daily study streak tracking
- Longest streak records
- Consistency motivation

## API Endpoints Available

The following API endpoints are now available:

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/progress` - Get learning progress
- `POST /api/user/progress` - Update progress
- `GET /api/user/analytics` - Get comprehensive analytics
- `GET /api/user/session` - Get study sessions
- `POST /api/user/session` - Create study session

## Security Features

- **Row Level Security (RLS)** enabled on all tables
- Users can only access their own data
- Automatic user profile creation on signup
- Secure API endpoints with authentication

## Next Steps

After setting up the database:

1. **Test the Settings page** - Make changes and verify they persist
2. **Use the Question Bank** - Progress should be tracked automatically
3. **Check the Profile page** - Should show real data from database
4. **Take Mock Exams** - Results should be stored in study sessions

The database is now ready to store all user data securely and efficiently! 🚀
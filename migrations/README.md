# Database Migrations

## How to Apply Migrations

These SQL files need to be run in your Supabase database to add new tables and features.

### ⚠️ REQUIRED: User Mock Exam Attempts Table

**File:** `add_user_mock_exam_attempts_table.sql`

**Purpose:** **CRITICAL** - Tracks when users start and complete mock exams. Required for mock exams to work.

**To Apply:**
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `add_user_mock_exam_attempts_table.sql`
4. Paste and run the SQL

**What it does:**
- Creates `user_mock_exam_attempts` table to track mock exam starts and completions
- Adds RLS policies for security
- Creates indexes for performance
- Tracks exam status (in_progress, completed, abandoned)
- Stores scores and time taken

**Impact:**
- Mock exams create a record immediately when started
- Subscription limits enforced by counting started exams (not just completed)
- Trial users limited to 1 mock exam, Basic to 5, Premium unlimited

---

### Migration: Practice Sessions Tracking

**File:** `add_practice_sessions_table.sql`

**Purpose:** Tracks when users start practice sessions (not just when they answer questions). This ensures subscription limits are enforced when users START practicing, not just when they submit answers.

**Status:** Not currently used (questions are limited by availability instead)

**To Apply:**
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `add_practice_sessions_table.sql`
4. Paste and run the SQL

**What it does:**
- Creates `user_practice_sessions` table to track session starts
- Adds RLS policies for security
- Creates indexes for performance

**Impact:**
- Optional table for future use if you want to track practice sessions

# Database Migrations

## How to Apply Migrations

These SQL files need to be run in your Supabase database to add new tables and features.

### Migration: Practice Sessions Tracking

**File:** `add_practice_sessions_table.sql`

**Purpose:** Tracks when users start practice sessions (not just when they answer questions). This ensures subscription limits are enforced when users START practicing, not just when they submit answers.

**To Apply:**
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `add_practice_sessions_table.sql`
4. Paste and run the SQL

**What it does:**
- Creates `user_practice_sessions` table to track session starts
- Adds RLS policies for security
- Creates indexes for performance
- Updates subscription logic to count sessions, not individual question attempts

**Impact:**
- Mock exams now create a record immediately when started (not just when completed)
- Practice sessions create a record immediately when questions are loaded
- Trial users can no longer bypass limits by starting unlimited sessions without submitting

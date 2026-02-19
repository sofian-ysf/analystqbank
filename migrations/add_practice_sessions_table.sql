-- User Practice Sessions Table
-- Tracks when users start practice sessions to enforce session-based limits
CREATE TABLE IF NOT EXISTS public.user_practice_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    question_count INTEGER DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_practice_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own practice sessions" ON public.user_practice_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own practice sessions" ON public.user_practice_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_user_practice_sessions_user_id ON public.user_practice_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_practice_sessions_started_at ON public.user_practice_sessions(started_at);

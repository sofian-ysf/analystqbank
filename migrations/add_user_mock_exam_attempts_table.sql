-- User Mock Exam Attempts Table
-- Tracks when users start and complete mock exams
CREATE TABLE IF NOT EXISTS public.user_mock_exam_attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    mock_exam_id UUID, -- Optional reference to specific mock exam
    session_1_score INTEGER,
    session_2_score INTEGER,
    total_score INTEGER,
    percentage_score DECIMAL(5,2),
    time_taken_minutes INTEGER,
    status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    topic_scores JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_mock_exam_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own mock exam attempts" ON public.user_mock_exam_attempts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mock exam attempts" ON public.user_mock_exam_attempts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mock exam attempts" ON public.user_mock_exam_attempts
    FOR UPDATE USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_mock_exam_attempts_user_id ON public.user_mock_exam_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_mock_exam_attempts_started_at ON public.user_mock_exam_attempts(started_at);
CREATE INDEX IF NOT EXISTS idx_user_mock_exam_attempts_status ON public.user_mock_exam_attempts(status);

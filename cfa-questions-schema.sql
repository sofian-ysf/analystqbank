-- CFA Level 1 Questions Database Schema

-- Questions Table
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    topic_area TEXT NOT NULL CHECK (topic_area IN (
        'Ethical and Professional Standards',
        'Quantitative Methods',
        'Economics',
        'Financial Statement Analysis',
        'Corporate Issuers',
        'Equity Investments',
        'Fixed Income',
        'Derivatives',
        'Alternative Investments',
        'Portfolio Management'
    )),
    subtopic TEXT,
    difficulty_level TEXT DEFAULT 'intermediate' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    question_text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    correct_answer TEXT NOT NULL CHECK (correct_answer IN ('A', 'B', 'C')),
    explanation TEXT NOT NULL,
    reference TEXT,
    keywords TEXT[],
    learning_objective_id TEXT, -- CFA Learning Objective ID (e.g., QM-RR-1)
    source TEXT, -- Source of question (e.g., RAG-Generated, Manual)
    created_by UUID REFERENCES public.user_profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Mock Exams Table
CREATE TABLE IF NOT EXISTS public.mock_exams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    total_questions INTEGER DEFAULT 180,
    duration_minutes INTEGER DEFAULT 270, -- 4.5 hours total
    session_1_questions INTEGER DEFAULT 90,
    session_2_questions INTEGER DEFAULT 90,
    topic_distribution JSONB DEFAULT '{
        "Ethical and Professional Standards": {"min": 27, "max": 36},
        "Quantitative Methods": {"min": 11, "max": 16},
        "Economics": {"min": 11, "max": 16},
        "Financial Statement Analysis": {"min": 20, "max": 25},
        "Corporate Issuers": {"min": 11, "max": 16},
        "Equity Investments": {"min": 20, "max": 25},
        "Fixed Income": {"min": 20, "max": 25},
        "Derivatives": {"min": 9, "max": 14},
        "Alternative Investments": {"min": 13, "max": 18},
        "Portfolio Management": {"min": 14, "max": 22}
    }'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Mock Exam Questions (Junction Table)
CREATE TABLE IF NOT EXISTS public.mock_exam_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    mock_exam_id UUID REFERENCES public.mock_exams(id) ON DELETE CASCADE,
    question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
    session_number INTEGER CHECK (session_number IN (1, 2)),
    question_order INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(mock_exam_id, question_id),
    UNIQUE(mock_exam_id, session_number, question_order)
);

-- User Question Attempts
CREATE TABLE IF NOT EXISTS public.user_question_attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
    selected_answer TEXT CHECK (selected_answer IN ('A', 'B', 'C')),
    is_correct BOOLEAN,
    time_spent_seconds INTEGER,
    mock_exam_id UUID REFERENCES public.mock_exams(id) ON DELETE SET NULL,
    session_id UUID, -- Links to study sessions
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Mock Exam Attempts
CREATE TABLE IF NOT EXISTS public.user_mock_exam_attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    mock_exam_id UUID REFERENCES public.mock_exams(id) ON DELETE CASCADE,
    session_1_score INTEGER,
    session_2_score INTEGER,
    total_score INTEGER,
    percentage_score DECIMAL(5,2),
    time_taken_minutes INTEGER,
    status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    topic_scores JSONB -- Stores score breakdown by topic
);

-- Enable Row Level Security
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_question_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_mock_exam_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Questions (Public read, admin write)
CREATE POLICY "Anyone can view active questions" ON public.questions
    FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can view all questions" ON public.questions
    FOR SELECT USING (auth.role() = 'authenticated');

-- RLS Policies for Mock Exams
CREATE POLICY "Anyone can view active mock exams" ON public.mock_exams
    FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view mock exam questions" ON public.mock_exam_questions
    FOR SELECT USING (true);

-- RLS Policies for User Attempts
CREATE POLICY "Users can view their own question attempts" ON public.user_question_attempts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own question attempts" ON public.user_question_attempts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own mock exam attempts" ON public.user_mock_exam_attempts
    FOR ALL USING (auth.uid() = user_id);

-- Updated trigger for questions
CREATE TRIGGER questions_updated_at
    BEFORE UPDATE ON public.questions
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample CFA Level 1 mock exam
INSERT INTO public.mock_exams (title, description) VALUES
('CFA Level 1 Mock Exam - June 2024', 'Complete 180-question mock exam following the official CFA Level 1 format with proper topic distribution and timing.');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_questions_topic_area ON public.questions(topic_area);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON public.questions(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_questions_learning_objective ON public.questions(learning_objective_id);
CREATE INDEX IF NOT EXISTS idx_user_attempts_user_id ON public.user_question_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_attempts_question_id ON public.user_question_attempts(question_id);
CREATE INDEX IF NOT EXISTS idx_mock_exam_attempts_user_id ON public.user_mock_exam_attempts(user_id);
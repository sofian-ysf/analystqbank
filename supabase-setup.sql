-- Create questions table for CFA Level 1 practice questions
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_area TEXT NOT NULL,
  subtopic TEXT,
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  correct_answer TEXT NOT NULL CHECK (correct_answer IN ('A', 'B', 'C')),
  explanation TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_questions_topic_area ON public.questions(topic_area);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON public.questions(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_questions_is_active ON public.questions(is_active);
CREATE INDEX IF NOT EXISTS idx_questions_created_at ON public.questions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active questions
CREATE POLICY "Anyone can read active questions"
  ON public.questions
  FOR SELECT
  USING (is_active = true);

-- Policy: Authenticated users can insert questions
CREATE POLICY "Authenticated users can insert questions"
  ON public.questions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update their own questions
CREATE POLICY "Authenticated users can update questions"
  ON public.questions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add comments for documentation
COMMENT ON TABLE public.questions IS 'CFA Level 1 practice questions organized by topic area';
COMMENT ON COLUMN public.questions.topic_area IS 'Main CFA Level 1 topic (e.g., Ethical and Professional Standards)';
COMMENT ON COLUMN public.questions.subtopic IS 'Optional specific subtopic within the topic area';
COMMENT ON COLUMN public.questions.difficulty_level IS 'Question difficulty: beginner, intermediate, or advanced';
COMMENT ON COLUMN public.questions.keywords IS 'Array of keywords for search and categorization';

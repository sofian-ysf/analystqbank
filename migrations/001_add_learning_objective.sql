-- Migration: Add learning_objective_id column to questions table
-- This allows tracking which CFA Learning Objective each question tests

-- Add the learning_objective_id column
ALTER TABLE public.questions
ADD COLUMN IF NOT EXISTS learning_objective_id TEXT;

-- Add an index for efficient filtering by learning objective
CREATE INDEX IF NOT EXISTS idx_questions_learning_objective
ON public.questions(learning_objective_id);

-- Add source column if it doesn't exist (for tracking question origin)
ALTER TABLE public.questions
ADD COLUMN IF NOT EXISTS source TEXT;

-- Comment for documentation
COMMENT ON COLUMN public.questions.learning_objective_id IS 'CFA Learning Objective ID (e.g., QM-RR-1, ETHICS-EC-2) that this question tests';
COMMENT ON COLUMN public.questions.source IS 'Source of the question (e.g., RAG-Generated, Manual, Imported)';

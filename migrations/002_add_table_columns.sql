-- Migration: Add table-related columns to questions table
-- This allows questions to include table data for calculations and analysis

-- Add the has_table boolean column
ALTER TABLE public.questions
ADD COLUMN IF NOT EXISTS has_table BOOLEAN DEFAULT false;

-- Add the table_data JSONB column to store table structure
ALTER TABLE public.questions
ADD COLUMN IF NOT EXISTS table_data JSONB;

-- Add an index for efficient filtering by has_table
CREATE INDEX IF NOT EXISTS idx_questions_has_table
ON public.questions(has_table);

-- Comment for documentation
COMMENT ON COLUMN public.questions.has_table IS 'Whether this question includes table data for the candidate to analyze';
COMMENT ON COLUMN public.questions.table_data IS 'JSON structure containing table title, headers, rows, and optional footnote';

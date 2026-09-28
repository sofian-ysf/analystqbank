-- Per-member lesson module progress: completion tick + self-rated competence.
-- One row per (user, lesson, module). Module index 1..N matches the reader's
-- module step order.

CREATE TABLE IF NOT EXISTS public.lesson_module_progress (
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  module_index INTEGER NOT NULL CHECK (module_index >= 1),
  completed BOOLEAN NOT NULL DEFAULT false,
  competence SMALLINT CHECK (competence BETWEEN 1 AND 3),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, lesson_id, module_index)
);

ALTER TABLE public.lesson_module_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read their own lesson module progress"
  ON public.lesson_module_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert their own lesson module progress"
  ON public.lesson_module_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update their own lesson module progress"
  ON public.lesson_module_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete their own lesson module progress"
  ON public.lesson_module_progress FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_lesson_module_progress_lesson
  ON public.lesson_module_progress(user_id, lesson_id);

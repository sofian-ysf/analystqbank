-- Migration: Create Flashcards Schema
-- Description: Tables for flashcard decks, cards, user progress (SM-2), and review history

-- =====================================================
-- FLASHCARD DECKS (one per CFA topic)
-- =====================================================
CREATE TABLE IF NOT EXISTS flashcard_decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  topic_area TEXT NOT NULL,  -- Links to CFA topic (matches questions.topic_area)
  card_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- FLASHCARDS
-- =====================================================
CREATE TABLE IF NOT EXISTS flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID REFERENCES flashcard_decks(id) ON DELETE CASCADE,
  front TEXT NOT NULL,  -- Question/prompt (supports HTML/LaTeX)
  back TEXT NOT NULL,   -- Answer (supports HTML/LaTeX)
  topic_area TEXT NOT NULL,
  subtopic TEXT,
  anki_note_id BIGINT,  -- Original Anki note ID for deduplication
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- USER FLASHCARD PROGRESS (SM-2 Spaced Repetition)
-- =====================================================
CREATE TABLE IF NOT EXISTS user_flashcard_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  flashcard_id UUID REFERENCES flashcards(id) ON DELETE CASCADE,
  ease_factor DECIMAL(4,2) DEFAULT 2.50,  -- SM-2 difficulty (min 1.3, default 2.5)
  interval_days INTEGER DEFAULT 0,         -- Days until next review
  repetitions INTEGER DEFAULT 0,           -- Successful review count
  due_date TIMESTAMPTZ DEFAULT NOW(),      -- Next review date
  last_reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, flashcard_id)  -- One progress entry per user per card
);

-- =====================================================
-- FLASHCARD REVIEW HISTORY (Audit Trail)
-- =====================================================
CREATE TABLE IF NOT EXISTS flashcard_review_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  flashcard_id UUID REFERENCES flashcards(id) ON DELETE CASCADE,
  quality INTEGER CHECK (quality >= 1 AND quality <= 5),  -- 1=again, 2=hard, 3=good, 5=easy
  ease_factor_before DECIMAL(4,2),
  ease_factor_after DECIMAL(4,2),
  interval_before INTEGER,
  interval_after INTEGER,
  reviewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_flashcards_deck_id ON flashcards(deck_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_topic ON flashcards(topic_area);
CREATE INDEX IF NOT EXISTS idx_flashcards_deck_sort ON flashcards(deck_id, sort_order);

CREATE INDEX IF NOT EXISTS idx_user_flashcard_progress_user ON user_flashcard_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_flashcard_progress_due ON user_flashcard_progress(user_id, due_date);
CREATE INDEX IF NOT EXISTS idx_user_flashcard_progress_card ON user_flashcard_progress(flashcard_id);

CREATE INDEX IF NOT EXISTS idx_flashcard_review_history_user ON flashcard_review_history(user_id);
CREATE INDEX IF NOT EXISTS idx_flashcard_review_history_date ON flashcard_review_history(user_id, reviewed_at);

-- =====================================================
-- AUTO-UPDATE CARD COUNT TRIGGER
-- =====================================================
CREATE OR REPLACE FUNCTION update_flashcard_deck_card_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE flashcard_decks SET card_count = card_count + 1, updated_at = NOW() WHERE id = NEW.deck_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE flashcard_decks SET card_count = card_count - 1, updated_at = NOW() WHERE id = OLD.deck_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS flashcard_count_trigger ON flashcards;
CREATE TRIGGER flashcard_count_trigger
AFTER INSERT OR DELETE ON flashcards
FOR EACH ROW EXECUTE FUNCTION update_flashcard_deck_card_count();

-- =====================================================
-- AUTO-UPDATE TIMESTAMPS
-- =====================================================
CREATE OR REPLACE FUNCTION update_flashcard_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS flashcard_decks_updated_at ON flashcard_decks;
CREATE TRIGGER flashcard_decks_updated_at
BEFORE UPDATE ON flashcard_decks
FOR EACH ROW EXECUTE FUNCTION update_flashcard_updated_at();

DROP TRIGGER IF EXISTS user_flashcard_progress_updated_at ON user_flashcard_progress;
CREATE TRIGGER user_flashcard_progress_updated_at
BEFORE UPDATE ON user_flashcard_progress
FOR EACH ROW EXECUTE FUNCTION update_flashcard_updated_at();

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE flashcard_decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_flashcard_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcard_review_history ENABLE ROW LEVEL SECURITY;

-- DECKS: Public read access (flashcards are FREE)
DROP POLICY IF EXISTS "Active decks are viewable by everyone" ON flashcard_decks;
CREATE POLICY "Active decks are viewable by everyone"
  ON flashcard_decks FOR SELECT
  USING (is_active = true);

-- FLASHCARDS: Public read access (flashcards are FREE)
DROP POLICY IF EXISTS "Flashcards are viewable by everyone" ON flashcards;
CREATE POLICY "Flashcards are viewable by everyone"
  ON flashcards FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM flashcard_decks
      WHERE id = flashcards.deck_id AND is_active = true
    )
  );

-- PROGRESS: Users can only access their own progress
DROP POLICY IF EXISTS "Users can view own flashcard progress" ON user_flashcard_progress;
CREATE POLICY "Users can view own flashcard progress"
  ON user_flashcard_progress FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own flashcard progress" ON user_flashcard_progress;
CREATE POLICY "Users can insert own flashcard progress"
  ON user_flashcard_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own flashcard progress" ON user_flashcard_progress;
CREATE POLICY "Users can update own flashcard progress"
  ON user_flashcard_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- HISTORY: Users can only access their own history
DROP POLICY IF EXISTS "Users can view own flashcard history" ON flashcard_review_history;
CREATE POLICY "Users can view own flashcard history"
  ON flashcard_review_history FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own flashcard history" ON flashcard_review_history;
CREATE POLICY "Users can insert own flashcard history"
  ON flashcard_review_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- ADMIN POLICIES (for content management)
-- =====================================================
-- Note: Add admin policies based on your admin_users table pattern

DROP POLICY IF EXISTS "Admins can manage flashcard decks" ON flashcard_decks;
CREATE POLICY "Admins can manage flashcard decks"
  ON flashcard_decks FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Admins can manage flashcards" ON flashcards;
CREATE POLICY "Admins can manage flashcards"
  ON flashcards FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE user_id = auth.uid()
    )
  );

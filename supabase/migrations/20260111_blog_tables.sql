-- Blog Categories Table
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_name TEXT DEFAULT 'AnalystTrainer Team',
  author_title TEXT,
  author_avatar TEXT,
  read_time_minutes INTEGER DEFAULT 5,
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[] DEFAULT '{}',
  faq_items JSONB DEFAULT '[]',
  schema_json JSONB,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Resources Table (for RAG)
CREATE TABLE IF NOT EXISTS blog_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT,
  file_type TEXT,
  content_text TEXT,
  chunk_index INTEGER DEFAULT 0,
  embedding vector(1536),
  processed_at TIMESTAMPTZ,
  uploaded_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Generation Jobs Table
CREATE TABLE IF NOT EXISTS blog_generation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  topic TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  result_post_id UUID REFERENCES blog_posts(id) ON DELETE SET NULL,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_resources_category ON blog_resources(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_resources_chunk ON blog_resources(category_id, chunk_index);
CREATE INDEX IF NOT EXISTS idx_blog_generation_jobs_status ON blog_generation_jobs(status);

-- Function to match blog resources using vector similarity
CREATE OR REPLACE FUNCTION match_blog_resources(
  query_embedding vector(1536),
  match_category_id UUID,
  match_count INT DEFAULT 10,
  match_threshold FLOAT DEFAULT 0.5
)
RETURNS TABLE (
  id UUID,
  category_id UUID,
  file_name TEXT,
  content_text TEXT,
  chunk_index INTEGER,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    br.id,
    br.category_id,
    br.file_name,
    br.content_text,
    br.chunk_index,
    1 - (br.embedding <=> query_embedding) AS similarity
  FROM blog_resources br
  WHERE br.category_id = match_category_id
    AND br.embedding IS NOT NULL
    AND 1 - (br.embedding <=> query_embedding) > match_threshold
  ORDER BY br.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_categories_updated_at
  BEFORE UPDATE ON blog_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default CFA Level 1 blog categories
INSERT INTO blog_categories (name, slug, description, sort_order) VALUES
  ('Ethical and Professional Standards', 'ethics', 'CFA Level 1 Ethics and Standards of Practice articles', 1),
  ('Quantitative Methods', 'quantitative-methods', 'Statistics, probability, and time value of money for CFA Level 1', 2),
  ('Economics', 'economics', 'Microeconomics, macroeconomics, and monetary policy for CFA candidates', 3),
  ('Financial Statement Analysis', 'financial-statement-analysis', 'Understanding financial statements and ratio analysis', 4),
  ('Corporate Issuers', 'corporate-issuers', 'Corporate governance, capital structure, and dividend policy', 5),
  ('Equity Investments', 'equity-investments', 'Stock valuation and equity market analysis', 6),
  ('Fixed Income', 'fixed-income', 'Bond valuation, interest rates, and credit analysis', 7),
  ('Derivatives', 'derivatives', 'Options, futures, forwards, and swaps fundamentals', 8),
  ('Alternative Investments', 'alternative-investments', 'Private equity, real estate, and hedge fund basics', 9),
  ('Portfolio Management', 'portfolio-management', 'Asset allocation, risk management, and portfolio theory', 10),
  ('CFA Exam Tips', 'exam-tips', 'Study strategies, exam day tips, and preparation advice', 11)
ON CONFLICT (slug) DO NOTHING;

-- Enable RLS on blog tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published blog posts
CREATE POLICY "Allow public read access to published posts"
  ON blog_posts
  FOR SELECT
  USING (status = 'published');

-- Allow public read access to all blog categories
CREATE POLICY "Allow public read access to categories"
  ON blog_categories
  FOR SELECT
  USING (true);

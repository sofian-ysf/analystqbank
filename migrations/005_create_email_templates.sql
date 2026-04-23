-- Create email_templates table for storing AI-generated email templates
CREATE TABLE email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subject_template TEXT NOT NULL,
  body_template TEXT NOT NULL,
  variables JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for fast lookups
CREATE INDEX idx_email_templates_slug ON email_templates(slug);

-- Seed default templates
INSERT INTO email_templates (name, slug, subject_template, body_template, variables) VALUES
('Welcome Email', 'welcome', 'Welcome to AnalystPrep!', 'Hi {{first_name}},

Welcome aboard and thank you for joining AnalystPrep! We''re excited to help you on your CFA journey.

Our platform is designed to help you master the concepts and practice effectively for your exam. Here are a few things to get you started:

1. Complete your profile setting your target exam date
2. Take a diagnostic quiz to understand your current level
3. Join our study streak to build consistency

If you have any questions, feel free to reach out. We''re here to help!

Best regards,
The AnalystPrep Team', '["first_name"]'),
('Follow-up', 'follow-up', 'Following up on your inquiry - AnalystPrep', 'Hi {{first_name}},

I wanted to follow up on our previous conversation. I hope you''ve been having a great experience with AnalystPrep!

Have you had a chance to explore our CFA prep materials? Here are some resources I recommend:

- The practice questions in your weak areas
- Our study streak feature to build consistency
- The mock exams to test your knowledge

Let me know if there''s anything I can help you with!

Best regards,
The AnalystPrep Team', '["first_name"]'),
('Cold Outreach', 'cold-outreach', 'Quick question about your CFA prep', 'Hi {{first_name}},

I noticed you''re exploring CFA exam preparation resources. I wanted to reach out because AnalystPrep could be a great fit for your study journey.

What makes AnalystPrep different:
- AI-powered question generation tailored to your level
- Personalized study streaks to keep you motivated
- Comprehensive coverage of all CFA Level 1 topics

Would you be open to a brief conversation about your exam prep goals? I''d love to learn more about where you are in your journey.

Best regards,
The AnalystPrep Team', '["first_name"]'),
('Trial Expiration Reminder', 'trial-expiration', 'Your AnalystPrep trial is ending soon', 'Hi {{first_name}},

I wanted to reach out before your AnalystPrep trial comes to an end. Your access will be expiring in the next few days.

If you''ve found value in our platform and would like to continue your preparation, here are your options:

- Upgrade to a monthly or quarterly plan
- Choose a longer commitment for better value

Don''t miss out on the progress you''ve made! Let me know if you have any questions.

Best regards,
The AnalystPrep Team', '["first_name"]');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for email_templates
CREATE TRIGGER update_email_templates_updated_at
  BEFORE UPDATE ON email_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
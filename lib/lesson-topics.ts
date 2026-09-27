/**
 * Lesson topics for the /learn section, in curriculum order.
 * `name` matches the questions.topic_area / lessons.topic CHECK values.
 */
export interface LessonTopic {
  slug: string
  name: string
  shortName: string
}

export const LESSON_TOPICS: LessonTopic[] = [
  { slug: 'ethical-and-professional-standards', name: 'Ethical and Professional Standards', shortName: 'Ethics' },
  { slug: 'quantitative-methods', name: 'Quantitative Methods', shortName: 'Quantitative Methods' },
  { slug: 'economics', name: 'Economics', shortName: 'Economics' },
  { slug: 'financial-statement-analysis', name: 'Financial Statement Analysis', shortName: 'FSA' },
  { slug: 'corporate-issuers', name: 'Corporate Issuers', shortName: 'Corporate Issuers' },
  { slug: 'equity-investments', name: 'Equity Investments', shortName: 'Equity' },
  { slug: 'fixed-income', name: 'Fixed Income', shortName: 'Fixed Income' },
  { slug: 'derivatives', name: 'Derivatives', shortName: 'Derivatives' },
  { slug: 'alternative-investments', name: 'Alternative Investments', shortName: 'Alternatives' },
  { slug: 'portfolio-management', name: 'Portfolio Management', shortName: 'Portfolio Management' },
]

export function topicBySlug(slug: string): LessonTopic | undefined {
  return LESSON_TOPICS.find((t) => t.slug === slug)
}

import Link from 'next/link'
import { Metadata } from 'next'
import Navigation from '../components/Navigation'
import { createAdminClient } from '@/lib/supabase'
import { LESSON_TOPICS } from '@/lib/lesson-topics'
import './learn.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'CFA Level 1 Lessons | AnalystTrainer',
  description:
    'Bite-size CFA Level 1 lessons for every topic, mapped to the 2026 curriculum learning outcomes. A free sample lesson in every topic.',
}

interface LessonRow {
  topic: string
  is_free: boolean
}

export default async function LearnIndexPage() {
  const counts: Record<string, { total: number; free: number }> = {}
  try {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('lessons')
      .select('topic, is_free')
      .eq('status', 'published')

    for (const row of (data || []) as LessonRow[]) {
      const entry = counts[row.topic] || { total: 0, free: 0 }
      entry.total += 1
      if (row.is_free) entry.free += 1
      counts[row.topic] = entry
    }
  } catch {
    // Lessons table not migrated yet or Supabase unavailable; render topics
    // with zero counts instead of failing the page.
  }

  return (
    <div className="learn-page">
      <Navigation />
      <main className="learn-main">
        <header className="learn-hero">
          <p className="learn-eyebrow">Learn</p>
          <h1>CFA Level 1 Lessons</h1>
          <p className="learn-subtitle">
            Bite-size lessons for every topic, mapped to the 2026 curriculum
            learning outcomes. Start with the free sample in each topic, then
            unlock the full library with any paid plan.
          </p>
        </header>

        <section className="learn-topic-grid">
          {LESSON_TOPICS.map((topic) => {
            const c = counts[topic.name] || { total: 0, free: 0 }
            if (c.total === 0) {
              return (
                <div key={topic.slug} className="learn-topic-card is-empty">
                  <h2>{topic.name}</h2>
                  <p className="learn-topic-meta">Lessons coming soon</p>
                </div>
              )
            }
            return (
              <Link
                key={topic.slug}
                href={`/learn/${topic.slug}`}
                className="learn-topic-card"
              >
                <h2>{topic.name}</h2>
                <p className="learn-topic-meta">
                  {c.total} lesson{c.total === 1 ? '' : 's'}
                  {c.free > 0 && <> &middot; {c.free} free sample{c.free === 1 ? '' : 's'}</>}
                </p>
                <span className="learn-topic-arrow">View lessons &rarr;</span>
              </Link>
            )
          })}
        </section>
      </main>
    </div>
  )
}

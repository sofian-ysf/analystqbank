import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Navigation from '../../components/Navigation'
import { createAdminClient } from '@/lib/supabase'
import { topicBySlug } from '@/lib/lesson-topics'
import '../learn.css'

export const revalidate = 60

interface Props {
  params: Promise<{ topic: string }>
}

interface LessonRow {
  slug: string
  title: string
  description: string | null
  module_code: string
  los_codes: string[]
  is_free: boolean
  read_time_minutes: number | null
  sort_order: number
}

async function getLessons(topicName: string): Promise<LessonRow[]> {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('lessons')
      .select('slug, title, description, module_code, los_codes, is_free, read_time_minutes, sort_order')
      .eq('topic', topicName)
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
    return (data || []) as LessonRow[]
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params
  const t = topicBySlug(topic)
  if (!t) return {}
  return {
    title: `${t.name} Lessons | AnalystTrainer`,
    description: `CFA Level 1 ${t.name} lessons mapped to the 2026 curriculum learning outcomes.`,
  }
}

export default async function TopicLessonsPage({ params }: Props) {
  const { topic } = await params
  const t = topicBySlug(topic)
  if (!t) notFound()

  const lessons = await getLessons(t.name)

  return (
    <div className="learn-page">
      <Navigation />
      <main className="learn-main">
        <nav className="learn-breadcrumbs">
          <Link href="/learn">Lessons</Link>
          <span>/</span>
          <span>{t.name}</span>
        </nav>

        <header className="learn-hero">
          <h1>{t.name}</h1>
          <p className="learn-subtitle">
            {lessons.length} lesson{lessons.length === 1 ? '' : 's'} available
          </p>
        </header>

        {lessons.length === 0 ? (
          <p className="learn-empty">Lessons for this topic are coming soon.</p>
        ) : (
          <section className="learn-lesson-list">
            {lessons.map((lesson) => (
              <Link
                key={lesson.slug}
                href={`/learn/${t.slug}/${lesson.slug}`}
                className="learn-lesson-card"
              >
                <div className="learn-lesson-card-top">
                  <span className="learn-chip">{lesson.module_code}</span>
                  {lesson.is_free ? (
                    <span className="learn-chip learn-chip-free">Free sample</span>
                  ) : (
                    <span className="learn-chip learn-chip-pro">Paid</span>
                  )}
                </div>
                <h2>{lesson.title}</h2>
                {lesson.description && <p>{lesson.description}</p>}
                <div className="learn-lesson-card-meta">
                  {lesson.read_time_minutes && <span>{lesson.read_time_minutes} min read</span>}
                  {lesson.los_codes.length > 0 && (
                    <span>{lesson.los_codes.length} learning outcome{lesson.los_codes.length === 1 ? '' : 's'}</span>
                  )}
                </div>
              </Link>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

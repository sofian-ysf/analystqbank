import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Navigation from '../../../components/Navigation'
import { createAdminClient } from '@/lib/supabase'
import { createClient } from '@/app/lib/supabase/server'
import { topicBySlug } from '@/lib/lesson-topics'
import { renderLessonContent, lessonPreviewMarkdown } from '@/lib/lesson-content'
import '../../learn.css'

// Reads auth cookies for the paywall check, so this page is always dynamic.
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ topic: string; module: string }>
}

interface Lesson {
  id: string
  topic: string
  module_code: string
  module_name: string | null
  slug: string
  title: string
  description: string | null
  los_codes: string[]
  content: string
  is_free: boolean
  read_time_minutes: number | null
  published_at: string | null
  updated_at: string
}

async function getLesson(topicName: string, slug: string): Promise<Lesson | null> {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('lessons')
      .select('*')
      .eq('topic', topicName)
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    return (data as Lesson) || null
  } catch {
    return null
  }
}

async function hasPaidAccess(): Promise<boolean> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return false

    const admin = createAdminClient()
    const { data: profile } = await admin
      .from('user_profiles')
      .select('subscription_status, current_period_end')
      .eq('id', user.id)
      .single()
    if (!profile) return false
    if (profile.subscription_status === 'lifetime') return true
    if (
      profile.subscription_status === 'active' &&
      profile.current_period_end &&
      new Date(profile.current_period_end) > new Date()
    ) {
      return true
    }
    return false
  } catch {
    return false
  }
}

async function practiceQuestionCount(losCodes: string[]): Promise<number> {
  if (!losCodes.length) return 0
  try {
    const admin = createAdminClient()
    const { count } = await admin
      .from('questions')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true)
      .in('learning_objective_id', losCodes)
    return count || 0
  } catch {
    return 0
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic, module } = await params
  const t = topicBySlug(topic)
  if (!t) return {}
  const lesson = await getLesson(t.name, module)
  if (!lesson) return {}
  return {
    title: `${lesson.title} | ${t.name} Lesson | AnalystTrainer`,
    description: lesson.description || `CFA Level 1 lesson: ${lesson.title}`,
  }
}

export default async function LessonPage({ params }: Props) {
  const { topic, module } = await params
  const t = topicBySlug(topic)
  if (!t) notFound()

  const lesson = await getLesson(t.name, module)
  if (!lesson) notFound()

  const access = lesson.is_free || (await hasPaidAccess())
  const questionCount = await practiceQuestionCount(lesson.los_codes || [])

  const markdown = access ? lesson.content : lessonPreviewMarkdown(lesson.content)
  const html = renderLessonContent(markdown)

  return (
    <div className="learn-page">
      <Navigation />
      <main className="learn-main learn-lesson-main">
        <nav className="learn-breadcrumbs">
          <Link href="/learn">Lessons</Link>
          <span>/</span>
          <Link href={`/learn/${t.slug}`}>{t.name}</Link>
          <span>/</span>
          <span>{lesson.title}</span>
        </nav>

        <article className="learn-lesson">
          <header className="learn-lesson-header">
            <div className="learn-lesson-chips">
              <span className="learn-chip">{lesson.module_name || lesson.module_code}</span>
              {lesson.is_free ? (
                <span className="learn-chip learn-chip-free">Free sample</span>
              ) : (
                <span className="learn-chip learn-chip-pro">Paid</span>
              )}
              {lesson.read_time_minutes && (
                <span className="learn-chip">{lesson.read_time_minutes} min read</span>
              )}
            </div>
            <h1>{lesson.title}</h1>
            {lesson.description && <p className="learn-subtitle">{lesson.description}</p>}
            {lesson.los_codes.length > 0 && (
              <p className="learn-los-line">
                Learning outcomes: {lesson.los_codes.join(', ')}
              </p>
            )}
          </header>

          <div
            className="learn-lesson-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {!access && (
            <div className="learn-paywall">
              <h2>Keep reading with a paid plan</h2>
              <p>
                This sample is free. The full lesson library is included with
                every paid AnalystTrainer plan, alongside the question bank,
                mock exams and flashcards.
              </p>
              <div className="learn-paywall-actions">
                <Link href="/signup?plan=6month" className="learn-cta-primary">
                  Unlock all lessons
                </Link>
                <Link href="/login" className="learn-cta-secondary">
                  Already a member? Log in
                </Link>
              </div>
            </div>
          )}

          {questionCount > 0 && (
            <div className="learn-practice">
              <h2>Practice this lesson</h2>
              <p>
                {questionCount} practice question{questionCount === 1 ? '' : 's'} in
                the question bank target the learning outcomes covered here.
              </p>
              <Link href="/question-bank" className="learn-cta-primary">
                Open the question bank
              </Link>
            </div>
          )}
        </article>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: lesson.title,
            description: lesson.description || undefined,
            datePublished: lesson.published_at || undefined,
            dateModified: lesson.updated_at,
            author: {
              '@type': 'Organization',
              name: 'AnalystTrainer',
              url: 'https://www.analysttrainer.com',
            },
          }),
        }}
      />
    </div>
  )
}

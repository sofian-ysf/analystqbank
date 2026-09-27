import Link from 'next/link'
import { Metadata } from 'next'
import { Lock } from '@phosphor-icons/react/dist/ssr'
import MemberShell from '@/components/dashboard/MemberShell'
import { createAdminClient } from '@/lib/supabase'
import { createClient } from '@/app/lib/supabase/server'
import { LESSON_TOPICS } from '@/lib/lesson-topics'
import { hasPaidAccess } from '@/lib/lesson-access'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Lessons | AnalystTrainer',
  robots: { index: false },
}

interface LessonRow {
  topic: string
  module_code: string
  module_name: string | null
  slug: string
  title: string
  description: string | null
  is_free: boolean
  read_time_minutes: number | null
  sort_order: number
}

export default async function LessonsIndex() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null // middleware redirects; defensive only

  const paid = await hasPaidAccess(user.id)

  const admin = createAdminClient()
  const { data } = await admin
    .from('lessons')
    .select(
      'topic, module_code, module_name, slug, title, description, is_free, read_time_minutes, sort_order'
    )
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
  const lessons = (data || []) as LessonRow[]

  return (
    <MemberShell>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Lessons</h1>
        <p className="text-sm text-gray-500 mb-8">
          Study notes for every CFA Level 1 module. Each lesson ends with a
          check-your-knowledge block that takes you straight into the matching
          question-bank questions.
        </p>

        {LESSON_TOPICS.map((topic) => {
          const rows = lessons.filter((l) => l.topic === topic.name)
          if (!rows.length) return null
          return (
            <section key={topic.slug} className="mb-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                {topic.name}
              </h2>
              <div className="space-y-2">
                {rows.map((lesson) => {
                  const locked = !paid && !lesson.is_free
                  const href = `/lessons/${topic.slug}/${lesson.slug}`
                  const inner = (
                    <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-teal-500 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {lesson.module_name || lesson.title}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {lesson.description}
                        </div>
                      </div>
                      {lesson.read_time_minutes && (
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {lesson.read_time_minutes} min
                        </span>
                      )}
                      {lesson.is_free && !paid && (
                        <span className="text-xs font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-2 py-0.5 whitespace-nowrap">
                          Free sample
                        </span>
                      )}
                      {locked && <Lock size={16} className="text-gray-400" />}
                    </div>
                  )
                  return locked ? (
                    <Link key={lesson.slug} href="/pricing" title="Upgrade to unlock">
                      {inner}
                    </Link>
                  ) : (
                    <Link key={lesson.slug} href={href}>
                      {inner}
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </MemberShell>
  )
}

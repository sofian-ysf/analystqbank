import Link from 'next/link'
import 'katex/dist/katex.min.css'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import MemberShell from '@/components/dashboard/MemberShell'
import LessonStepper, { StepDef, ProgressState } from '@/components/lessons/LessonStepper'
import { createAdminClient } from '@/lib/supabase'
import { createClient } from '@/app/lib/supabase/server'
import { topicBySlug } from '@/lib/lesson-topics'
import { hasPaidAccess, losTextMap } from '@/lib/lesson-access'
import {
  renderLessonContent,
  splitLessonModules,
  moduleHeadingParts,
  stripLessonHeader,
  stripPracticeSection,
} from '@/lib/lesson-content'
import '../../lessons.css'

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

async function getModuleProgress(
  userId: string,
  lessonId: string
): Promise<Record<number, ProgressState>> {
  try {
    const admin = createAdminClient()
    const { data } = await admin
      .from('lesson_module_progress')
      .select('module_index, completed, competence')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
    const map: Record<number, ProgressState> = {}
    for (const r of data || []) {
      map[r.module_index] = { completed: !!r.completed, competence: r.competence }
    }
    return map
  } catch {
    return {}
  }
}

export const metadata: Metadata = {
  title: 'Lesson | AnalystTrainer',
  robots: { index: false },
}

function LessonHeader({ lesson, losTexts, bodyHasLosSection }: {
  lesson: Lesson
  losTexts: Array<{ code: string; text: string }>
  bodyHasLosSection: boolean
}) {
  return (
    <header className="learn-lesson-header">
      <div className="learn-lesson-chips">
        <span className="learn-chip">{lesson.module_name || lesson.module_code}</span>
        {lesson.is_free && (
          <span className="learn-chip learn-chip-free">Free sample</span>
        )}
        {lesson.read_time_minutes && (
          <span className="learn-chip">{lesson.read_time_minutes} min read</span>
        )}
      </div>
      <h1>{lesson.title}</h1>
      {lesson.description && <p className="learn-subtitle">{lesson.description}</p>}
      {!bodyHasLosSection && losTexts.length > 0 && (
        <div className="learn-los-block">
          <h2>Learning objectives</h2>
          <ul>
            {losTexts.map((lo) => (
              <li key={lo.code}>{lo.text}</li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

export default async function MemberLessonPage({ params }: Props) {
  const { topic, module } = await params
  const t = topicBySlug(topic)
  if (!t) notFound()

  const lesson = await getLesson(t.name, module)
  if (!lesson) notFound()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const paid = user ? await hasPaidAccess(user.id) : false
  const unlocked = lesson.is_free || paid

  const questionCount = await practiceQuestionCount(lesson.los_codes || [])
  const losMap = losTextMap()
  const losTexts = (lesson.los_codes || []).map((code) => ({
    code,
    text: losMap[code] || code,
  }))
  const bodyHasLosSection = /## Learning (objectives|outcome statements)/.test(lesson.content)

  if (!unlocked) {
    return (
      <MemberShell>
        <div className="max-w-2xl mx-auto">
          <Link href="/lessons" className="text-sm text-teal-700 hover:underline">
            &larr; All lessons
          </Link>
          <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              {lesson.title}
            </h1>
            <p className="text-gray-500 mb-6">
              This lesson is part of the paid library. Upgrade to unlock all
              lessons, the full question bank and mock exams.
            </p>
            <Link
              href="/pricing"
              className="inline-block bg-teal-600 text-white font-medium rounded-lg px-6 py-3 hover:bg-teal-700"
            >
              Upgrade to unlock
            </Link>
          </div>
        </div>
      </MemberShell>
    )
  }

  const markdown = stripLessonHeader(stripPracticeSection(lesson.content))
  const { intro, modules } = splitLessonModules(markdown)

  // Legacy short-format lessons have no MODULE sections: keep the single-page path.
  if (!modules.length) {
    const html = renderLessonContent(markdown)
    return (
      <MemberShell>
        <div className="max-w-3xl mx-auto">
          <Link href="/lessons" className="text-sm text-teal-700 hover:underline">
            &larr; All lessons
          </Link>

          <article className="learn-lesson mt-4">
            <LessonHeader lesson={lesson} losTexts={losTexts} bodyHasLosSection={bodyHasLosSection} />

            <div
              className="learn-lesson-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {questionCount > 0 && (
              <div className="learn-practice">
                <h2>Check your knowledge</h2>
                <p>
                  {questionCount} question{questionCount === 1 ? '' : 's'} in the
                  question bank target the learning outcomes covered here.
                </p>
                <Link href="/question-bank" className="learn-cta-primary">
                  Open the question bank
                </Link>
              </div>
            )}
          </article>
        </div>
      </MemberShell>
    )
  }

  const initialProgress = user ? await getModuleProgress(user.id, lesson.id) : {}

  const steps: StepDef[] = [
    {
      key: 'start',
      label: 'Start',
      title: null,
      html: renderLessonContent(intro),
      moduleIndex: null,
    },
    ...modules.map((m, i) => {
      const parts = moduleHeadingParts(m.heading)
      const body = m.markdown.replace(/^## MODULE [^\n]*\n+/, '')
      return {
        key: `mod-${i + 1}`,
        label: parts.num || `${i + 1}`,
        title: parts.num ? `Module ${parts.num}: ${parts.title}` : parts.title,
        html: renderLessonContent(body),
        moduleIndex: i + 1,
      }
    }),
  ]

  if (questionCount > 0) {
    const q = `question${questionCount === 1 ? '' : 's'}`
    steps.push({
      key: 'practice',
      label: 'Practice',
      title: null,
      html: `<div class="learn-practice"><h2>Check your knowledge</h2><p>${questionCount} ${q} in the question bank target the learning outcomes covered here.</p><a href="/question-bank" class="learn-cta-primary">Open the question bank</a></div>`,
      moduleIndex: null,
    })
  }

  return (
    <MemberShell>
      <div className="max-w-3xl mx-auto">
        <Link href="/lessons" className="text-sm text-teal-700 hover:underline">
          &larr; All lessons
        </Link>

        <article className="learn-lesson mt-4">
          <LessonHeader lesson={lesson} losTexts={losTexts} bodyHasLosSection={bodyHasLosSection} />
          <LessonStepper lessonId={lesson.id} steps={steps} initialProgress={initialProgress} />
        </article>
      </div>
    </MemberShell>
  )
}

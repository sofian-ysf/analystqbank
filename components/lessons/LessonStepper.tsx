'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

export interface StepDef {
  key: string
  /** Chip label: 'Start', '1', '1.2', 'Practice' */
  label: string
  /** Long title for module steps */
  title: string | null
  html: string
  /** 1-based module index for progress rows; null for start/practice steps */
  moduleIndex: number | null
}

export interface ProgressState {
  completed: boolean
  competence: number | null
}

const COMPETENCE_OPTIONS: Array<{ value: number; label: string }> = [
  { value: 1, label: 'Still shaky' },
  { value: 2, label: 'Getting there' },
  { value: 3, label: 'Confident' },
]

export default function LessonStepper({
  lessonId,
  steps,
  initialProgress,
}: {
  lessonId: string
  steps: StepDef[]
  initialProgress: Record<number, ProgressState>
}) {
  const [idx, setIdx] = useState(0)
  const [progress, setProgress] = useState<Record<number, ProgressState>>(initialProgress)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(false)

  const moduleSteps = useMemo(() => steps.filter((s) => s.moduleIndex !== null), [steps])
  const doneCount = moduleSteps.filter((s) => progress[s.moduleIndex!]?.completed).length

  const step = steps[idx]
  const isLast = idx === steps.length - 1
  const mod = step.moduleIndex !== null ? progress[step.moduleIndex] || { completed: false, competence: null } : null

  async function save(moduleIndex: number, next: ProgressState) {
    const prev = progress[moduleIndex] || { completed: false, competence: null }
    setProgress((p) => ({ ...p, [moduleIndex]: next }))
    setSaving(true)
    setSaveError(false)
    try {
      const res = await fetch('/api/lessons/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lesson_id: lessonId,
          module_index: moduleIndex,
          completed: next.completed,
          competence: next.competence,
        }),
      })
      if (!res.ok) throw new Error()
    } catch {
      setProgress((p) => ({ ...p, [moduleIndex]: prev }))
      setSaveError(true)
    } finally {
      setSaving(false)
    }
  }

  function goTo(i: number) {
    setIdx(Math.max(0, Math.min(steps.length - 1, i)))
    setSaveError(false)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 })
  }

  return (
    <div className="learn-stepper">
      <div className="learn-stepper-topline">
        <div className="learn-step-chips" role="tablist" aria-label="Lesson modules">
          {steps.map((s, i) => {
            const done = s.moduleIndex !== null && progress[s.moduleIndex]?.completed
            return (
              <button
                key={s.key}
                role="tab"
                aria-selected={i === idx}
                className={
                  'learn-step-chip' + (i === idx ? ' is-active' : '') + (done ? ' is-done' : '')
                }
                onClick={() => goTo(i)}
                title={s.title || s.label}
              >
                {done && <span className="learn-step-chip-tick">&#10003;</span>}
                {s.label}
              </button>
            )
          })}
        </div>
        <p className="learn-stepper-progress">
          {doneCount} of {moduleSteps.length} module{moduleSteps.length === 1 ? '' : 's'} complete
        </p>
      </div>

      <div className="learn-stepper-body">
        {step.title && <h2 className="learn-stepper-heading">{step.title}</h2>}
        <div
          className="learn-lesson-content"
          dangerouslySetInnerHTML={{ __html: step.html }}
        />
      </div>

      {mod && (
        <div className="learn-module-panel">
          <div className="learn-module-panel-row">
            <span className="learn-module-panel-label">How confident are you with this module?</span>
            <div className="learn-rating">
              {COMPETENCE_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  className={'learn-rating-btn' + (mod.competence === o.value ? ' is-picked' : '')}
                  disabled={saving}
                  onClick={() => save(step.moduleIndex!, { ...mod, competence: o.value })}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <div className="learn-module-panel-row">
            <button
              className={'learn-complete-btn' + (mod.completed ? ' is-done' : '')}
              disabled={saving}
              onClick={() => save(step.moduleIndex!, { ...mod, completed: !mod.completed })}
            >
              {mod.completed ? <>&#10003; Completed</> : 'Mark as complete'}
            </button>
            {saveError && <span className="learn-save-error">Couldn&apos;t save - try again</span>}
          </div>
        </div>
      )}

      <div className="learn-stepper-nav">
        {idx > 0 ? (
          <button className="learn-nav-btn" onClick={() => goTo(idx - 1)}>
            &larr; Previous
          </button>
        ) : (
          <span />
        )}
        {isLast ? (
          <Link href="/lessons" className="learn-cta-primary">
            Back to all lessons
          </Link>
        ) : (
          <button className="learn-cta-primary learn-nav-next" onClick={() => goTo(idx + 1)}>
            {steps[idx + 1].moduleIndex !== null
              ? `Next: Module ${steps[idx + 1].label}`
              : steps[idx + 1].key === 'practice'
                ? 'Next: Practice'
                : 'Next'}
          </button>
        )}
      </div>
    </div>
  )
}

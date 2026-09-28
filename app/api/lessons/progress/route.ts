import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/app/lib/supabase/server'

/**
 * Per-member lesson module progress. Reads and writes go through the
 * request's own session client, so RLS binds every row to auth.uid().
 */

export async function GET(request: NextRequest) {
  const lessonId = request.nextUrl.searchParams.get('lesson_id')
  if (!lessonId) {
    return NextResponse.json({ error: 'Missing lesson_id' }, { status: 400 })
  }
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('lesson_module_progress')
    .select('module_index, completed, competence')
    .eq('lesson_id', lessonId)
  if (error) return NextResponse.json({ error: 'Failed to load progress' }, { status: 500 })
  return NextResponse.json({ progress: data || [] })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: { lesson_id?: string; module_index?: number; completed?: boolean; competence?: number | null }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const { lesson_id, module_index, completed, competence } = body
  if (
    !lesson_id ||
    typeof module_index !== 'number' ||
    !Number.isInteger(module_index) ||
    module_index < 1 ||
    module_index > 200 ||
    typeof completed !== 'boolean' ||
    !(competence === null || competence === 1 || competence === 2 || competence === 3)
  ) {
    return NextResponse.json({ error: 'Invalid progress fields' }, { status: 400 })
  }

  const { error } = await supabase.from('lesson_module_progress').upsert(
    {
      user_id: user.id,
      lesson_id,
      module_index,
      completed,
      competence,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,lesson_id,module_index' }
  )
  if (error) return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 })
  return NextResponse.json({ ok: true })
}

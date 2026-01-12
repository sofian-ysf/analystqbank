import { NextResponse } from 'next/server'
import { createClient } from '@/app/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Test 1: Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    // Test 2: Try to read categories directly
    const { data: categories, error: catError } = await supabase
      .from('blog_categories')
      .select('id, name')
      .limit(3)

    return NextResponse.json({
      status: 'ok',
      auth: {
        user: user ? { id: user.id, email: user.email } : null,
        error: authError?.message || null,
      },
      categories: {
        count: categories?.length || 0,
        error: catError?.message || null,
      }
    })
  } catch (err) {
    return NextResponse.json({
      status: 'error',
      message: err instanceof Error ? err.message : 'Unknown error'
    })
  }
}

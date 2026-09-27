import { createAdminClient } from '@/lib/supabase'
import { CFA_2026_LEARNING_OBJECTIVES } from '@/lib/learning-objectives-2026'

/**
 * Paid access = lifetime membership, or an active subscription whose current
 * period has not ended. Mirrors the user_profiles tier logic used by
 * /api/subscription (plan in 2month | 6month | lifetime, status active/lifetime).
 */
export async function hasPaidAccess(userId: string): Promise<boolean> {
  try {
    const admin = createAdminClient()
    const { data: profile } = await admin
      .from('user_profiles')
      .select('subscription_status, current_period_end')
      .eq('id', userId)
      .single()
    if (!profile) return false
    if (profile.subscription_status === 'lifetime') return true
    return (
      profile.subscription_status === 'active' &&
      !!profile.current_period_end &&
      new Date(profile.current_period_end) > new Date()
    )
  } catch {
    return false
  }
}

/**
 * Map lesson los_codes (e.g. 'QM-RR-1') to their official wording from the
 * 2026 curriculum data. Unknown codes are returned as-is.
 */
export function losTextMap(): Record<string, string> {
  const map: Record<string, string> = {}
  for (const topic of CFA_2026_LEARNING_OBJECTIVES) {
    for (const reading of topic.readings) {
      for (const lo of reading.learningObjectives) {
        map[lo.id] = lo.text
      }
    }
  }
  return map
}

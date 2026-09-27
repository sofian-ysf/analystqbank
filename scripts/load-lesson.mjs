#!/usr/bin/env node
/**
 * Load a reviewed lesson markdown file into the lessons table.
 * Run at merge time (staging insertion), NOT before:
 *
 *   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
 *     node scripts/load-lesson.mjs path/to/lesson.md [--free] [--publish]
 *
 * Uses the service-role key (bypasses RLS) and upserts on (topic, slug).
 * Frontmatter mapping from the review pipeline:
 *   slug: /learn/<topic>/<lesson>  -> bare <lesson> slug
 *   status: draft-v*-post-review   -> 'draft' (use --publish for 'published')
 *   estimated_read_minutes         -> read_time_minutes
 *   module                         -> module_name
 * The leading review blockquote ("> DRAFT vN ...") is stripped from the body.
 */
import { readFileSync } from 'node:fs'

const args = process.argv.slice(2)
const file = args.find((a) => !a.startsWith('--'))
if (!file) {
  console.error('usage: load-lesson.mjs <file.md> [--free] [--publish]')
  process.exit(1)
}
const isFree = args.includes('--free')
const publish = args.includes('--publish')

const raw = readFileSync(file, 'utf8')
const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
if (!fmMatch) {
  console.error('no frontmatter block found')
  process.exit(1)
}

const fm = {}
for (const line of fmMatch[1].split('\n')) {
  const m = line.match(/^([a-z_]+):\s*(.*)$/)
  if (!m) continue
  let v = m[2].trim()
  if (v.startsWith('[') && v.endsWith(']')) {
    fm[m[1]] = v.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean)
  } else {
    fm[m[1]] = v
  }
}

let body = fmMatch[2]
// Strip leading review blockquote paragraphs (everything quoted before the first heading)
body = body.replace(/^\s*(>[^\n]*\n+)+/, '')

const titleMatch = body.match(/^#\s+(.+)$/m)
const title = titleMatch ? titleMatch[1].trim() : null
if (!title) {
  console.error('no # title heading found in body')
  process.exit(1)
}

const slug = String(fm.slug || '').split('/').filter(Boolean).pop()
if (!slug) {
  console.error('frontmatter slug missing or unparseable')
  process.exit(1)
}

// Description: first plain paragraph after the title, markdown emphasis stripped
const para = body
  .split(/\n\s*\n/)
  .map((p) => p.trim())
  .find((p) => p && !p.startsWith('#') && !p.startsWith('$$') && !p.startsWith('|'))
const description = para ? para.replace(/\*\*/g, '').replace(/\*/g, '') : null

const row = {
  topic: fm.topic,
  module_code: fm.module_code,
  module_name: fm.module || null,
  slug,
  title,
  description,
  los_codes: fm.los_codes || [],
  content: body.trim(),
  status: publish ? 'published' : 'draft',
  is_free: isFree,
  read_time_minutes: parseInt(fm.estimated_read_minutes, 10) || null,
}

if (args.includes('--dry-run')) {
  console.log(JSON.stringify({ ...row, content: row.content.slice(0, 80) + '... [' + row.content.length + ' chars]' }, null, 2))
  process.exit(0)
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required')
  process.exit(1)
}

const res = await fetch(`${url}/rest/v1/lessons?on_conflict=topic,slug`, {
  method: 'POST',
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    Prefer: 'resolution=merge-duplicates,return=representation',
  },
  body: JSON.stringify(row),
})
const data = await res.json()
if (!res.ok) {
  console.error('insert failed:', res.status, JSON.stringify(data))
  process.exit(1)
}
console.log('loaded:', data[0].topic, '/', data[0].slug, '| status:', data[0].status, '| free:', data[0].is_free)

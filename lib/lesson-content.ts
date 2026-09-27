/**
 * Server-side renderer for lesson markdown.
 *
 * Supported markdown: # / ## / ### headings, paragraphs, - / * bullet lists,
 * 1. ordered lists, > blockquotes, pipe tables, --- rules, **bold**,
 * *italic*, `code`.
 * Math is rendered with KaTeX at request time: \( inline \), \[ display \]
 * and $$ display $$. Single $ is intentionally NOT a math delimiter (same
 * rule as components/MathText.tsx) so currency like $120,000 never gets
 * eaten. Lesson bodies use $$...$$ for all math.
 */
import katex from 'katex'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function renderKatex(tex: string, displayMode: boolean): string {
  const html = katex.renderToString(tex.trim(), {
    displayMode,
    throwOnError: false,
    strict: 'ignore',
  })
  return displayMode ? `<div class="math-display">${html}</div>` : html
}

// Pull math out of the raw markdown before HTML-escaping and markdown
// transforms, so formula characters ( _ ^ & < > ) survive untouched.
function extractMath(content: string): { text: string; segments: string[] } {
  const segments: string[] = []
  const stash = (html: string): string => {
    segments.push(html)
    return `\u0000${segments.length - 1}\u0000`
  }
  let text = content
  text = text.replace(/\\\[([\s\S]+?)\\\]/g, (_m, tex: string) => stash(renderKatex(tex, true)))
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_m, tex: string) => stash(renderKatex(tex, true)))
  text = text.replace(/\\\(([\s\S]+?)\\\)/g, (_m, tex: string) => stash(renderKatex(tex, false)))
  return { text, segments }
}

function restoreMath(html: string, segments: string[]): string {
  return html.replace(/\u0000(\d+)\u0000/g, (_m, i: string) => segments[Number(i)])
}

function renderInline(text: string): string {
  let out = escapeHtml(text)
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>')
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  out = out.replace(/(^|[^*\w])\*([^*\n]+)\*(?!\w)/g, '$1<em>$2</em>')
  return out
}

function splitTableRow(line: string): string[] {
  return line
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

function renderTable(lines: string[]): string {
  const rows = lines.filter((l) => !/^\|[\s:|-]+\|$/.test(l))
  if (!rows.length) return ''
  const [head, ...body] = rows
  const thead = `<thead><tr>${splitTableRow(head)
    .map((c) => `<th>${renderInline(c)}</th>`)
    .join('')}</tr></thead>`
  const tbody = `<tbody>${body
    .map(
      (r) =>
        `<tr>${splitTableRow(r)
          .map((c) => `<td>${renderInline(c)}</td>`)
          .join('')}</tr>`
    )
    .join('')}</tbody>`
  return `<div class="table-wrap"><table>${thead}${tbody}</table></div>`
}


// New template practice blocks ('**Module N.M practice (LOS-CODE)**' followed
// by raw question-reference bullets) become a sentinel line; the renderer swaps
// the sentinel for a styled CTA box. Raw UUIDs never reach the page.
function practiceSentinels(markdown: string): string {
  return markdown.replace(
    /\*\*(Module [\d.]+ practice \([A-Za-z0-9-]+\))\*\*[ \t]*\n+((?:[ \t]*[-*]\s+`[0-9a-f-]{36}[^\n]*\n?)+)/g,
    (_m, label: string, bullets: string) => {
      const count = (bullets.match(/`[0-9a-f-]{36}`/g) || []).length
      const clean = label.replace(/ \([A-Za-z0-9-]+\)$/, '')
      return `\n@@PRACTICE|${clean}|${count}@@\n`
    }
  )
}

export function renderLessonContent(markdown: string): string {
  const { text, segments } = extractMath(practiceSentinels(markdown))
  const html: string[] = []
  let bullets: string[] = []
  let ordered: string[] = []

  const flush = () => {
    if (bullets.length) {
      html.push(`<ul>${bullets.join('')}</ul>`)
      bullets = []
    }
    if (ordered.length) {
      html.push(`<ol>${ordered.join('')}</ol>`)
      ordered = []
    }
  }

  const lines = text.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) {
      flush()
      continue
    }
    if (line.startsWith('|')) {
      flush()
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim())
        i++
      }
      i--
      html.push(renderTable(tableLines))
    } else if (line.startsWith('### ')) {
      flush()
      html.push(`<h3>${renderInline(line.slice(4))}</h3>`)
    } else if (line.startsWith('## ')) {
      flush()
      html.push(`<h2>${renderInline(line.slice(3))}</h2>`)
    } else if (line.startsWith('# ')) {
      // Body-level title duplicates the page h1; render it as a section heading.
      flush()
      html.push(`<h2>${renderInline(line.slice(2))}</h2>`)
    } else if (line.startsWith('> ')) {
      flush()
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2))
        i++
      }
      i--
      html.push(
        `<blockquote>${quoteLines.map((q) => `<p>${renderInline(q)}</p>`).join('')}</blockquote>`
      )
    } else if (line === '---') {
      flush()
      html.push('<hr />')
    } else if (/^[-*]\s+/.test(line)) {
      if (ordered.length) flush()
      bullets.push(`<li>${renderInline(line.replace(/^[-*]\s+/, ''))}</li>`)
    } else if (/^\d+[.)]\s+/.test(line)) {
      if (bullets.length) flush()
      ordered.push(`<li>${renderInline(line.replace(/^\d+[.)]\s+/, ''))}</li>`)
    } else if (line.startsWith('@@PRACTICE|')) {
      flush()
      const [, label, count] = line.split('|')
      const n = parseInt(count, 10) || 0
      html.push(
        `<div class="learn-practice-inline"><span class="learn-practice-inline-label">${escapeHtml(
          label
        )}</span><span class="learn-practice-inline-count">${n} question${
          n === 1 ? '' : 's'
        }</span><a href="/question-bank" class="learn-cta-primary">Open in the question bank</a></div>`
      )
    } else if (/^\u0000\d+\u0000$/.test(line)) {
      // A standalone display-math block: never wrap block-level HTML in <p>.
      flush()
      html.push(line)
    } else {
      flush()
      html.push(`<p>${renderInline(line)}</p>`)
    }
  }
  flush()
  let out = html.join('\n')
  out = out.replace(
    /<blockquote><p><strong>EXAMPLE:/g,
    '<blockquote class="learn-example"><p><strong>EXAMPLE:'
  )
  out = out.replace(
    /<blockquote><p><strong>PROFESSOR(&#39;|')S NOTE/g,
    '<blockquote class="learn-professor-note"><p><strong>PROFESSOR$1S NOTE'
  )
  return restoreMath(out, segments)
}

/**
 * Strip the leading title block from stored lesson content. The page header
 * already renders the title, module line and LOS list, so the body skips the
 * '# Title' heading and the bold '**Module N of M...**' paragraph.
 */
export function stripLessonHeader(markdown: string): string {
  let out = markdown.replace(/^#\s+[^\n]*\n+/, '')
  out = out.replace(/^\*\*Module [^\n]*\*\*\n+/, '')
  return out
}

/**
 * Drop the trailing '## Practice: ...' section. The page renders its own
 * practice CTA with a live question count; the stored section is raw question
 * references, not display content.
 */
export function stripPracticeSection(markdown: string): string {
  const i = markdown.search(/\n## Practice:/)
  return i > 0 ? markdown.slice(0, i).trimEnd() : markdown
}

/**
 * Free-preview markdown for the paywall: the opening block plus the first
 * section (Learning objectives), so anonymous visitors get a real teaser.
 * Falls back to the first two paragraphs when there are no headings.
 */
export function lessonPreviewMarkdown(markdown: string): string {
  const headings = [...markdown.matchAll(/\n## /g)].map((m) => m.index!)
  if (headings.length >= 2) {
    return markdown.slice(0, headings[1]).trim()
  }
  if (headings.length === 1) {
    return markdown.slice(0, headings[0]).trim()
  }
  const paragraphs = markdown.split(/\n\s*\n/).filter(Boolean)
  return paragraphs.slice(0, 2).join('\n\n')
}

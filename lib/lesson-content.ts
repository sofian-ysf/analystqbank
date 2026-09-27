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

export function renderLessonContent(markdown: string): string {
  const { text, segments } = extractMath(markdown)
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
      html.push(`<blockquote>${renderInline(line.slice(2))}</blockquote>`)
    } else if (line === '---') {
      flush()
      html.push('<hr />')
    } else if (/^[-*]\s+/.test(line)) {
      if (ordered.length) flush()
      bullets.push(`<li>${renderInline(line.replace(/^[-*]\s+/, ''))}</li>`)
    } else if (/^\d+[.)]\s+/.test(line)) {
      if (bullets.length) flush()
      ordered.push(`<li>${renderInline(line.replace(/^\d+[.)]\s+/, ''))}</li>`)
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
  return restoreMath(html.join('\n'), segments)
}

/**
 * Free-preview markdown for the paywall: everything before the first ##
 * section heading, or the first two paragraphs when there are no headings.
 */
export function lessonPreviewMarkdown(markdown: string): string {
  const splitAt = markdown.search(/\n## /)
  if (splitAt > 0) {
    return markdown.slice(0, splitAt).trim()
  }
  const paragraphs = markdown.split(/\n\s*\n/).filter(Boolean)
  return paragraphs.slice(0, 2).join('\n\n')
}

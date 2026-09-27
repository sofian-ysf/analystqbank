/**
 * Server-side renderer for lesson markdown.
 *
 * Supported markdown: ## and ### headings, paragraphs, - / * bullet lists,
 * 1. ordered lists, > blockquotes, --- rules, **bold**, *italic*, `code`.
 * Math is rendered with KaTeX at request time: \( inline \), \[ display \]
 * and $$ display $$. Single $ is intentionally NOT a math delimiter (same
 * rule as components/MathText.tsx) so prices like £50 never get eaten.
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

  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim()
    if (!line) {
      flush()
      continue
    }
    if (line.startsWith('### ')) {
      flush()
      html.push(`<h3>${renderInline(line.slice(4))}</h3>`)
    } else if (line.startsWith('## ')) {
      flush()
      html.push(`<h2>${renderInline(line.slice(3))}</h2>`)
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

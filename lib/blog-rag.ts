import { retrieveContext, TOPIC_NAME_MAP } from './rag'
import { SupabaseClient } from '@supabase/supabase-js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySupabaseClient = SupabaseClient<any, any, any>

// Map blog category names to Pinecone topic names
const CATEGORY_TO_TOPIC_MAP: Record<string, string> = {
  'Ethical and Professional Standards': 'Ethical and professional Standards',
  'Quantitative Methods': 'Quantitative Methods',
  'Economics': 'Economics',
  'Financial Statement Analysis': 'Financial Statement Analysis',
  'Corporate Issuers': 'Corporate Issuers',
  'Equity Investments': 'Equity Investments',
  'Fixed Income': 'Fixed Income ',  // Trailing space in Pinecone
  'Derivatives': 'Derivatives',
  'Alternative Investments': 'Alternative Investments',
  'Portfolio Management': 'Portfolio Management '  // Trailing space in Pinecone
}

// Build context for blog generation using Pinecone
export async function buildBlogContext(
  supabase: AnySupabaseClient,
  categoryId: string,
  topic: string,
  maxTokens: number = 12000
): Promise<string> {
  // First, get the category name from Supabase
  const { data: category } = await supabase
    .from('blog_categories')
    .select('name')
    .eq('id', categoryId)
    .single()

  if (!category) {
    console.error('Category not found:', categoryId)
    return ''
  }

  const categoryName = category.name
  const pineconeTopicName = CATEGORY_TO_TOPIC_MAP[categoryName] || categoryName

  console.log(`[Blog RAG] Building context for category: "${categoryName}" -> Pinecone: "${pineconeTopicName}"`)
  console.log(`[Blog RAG] Topic: "${topic}"`)

  try {
    // Query Pinecone for relevant content
    const query = `${topic} CFA Level 1 ${categoryName}`

    const contexts = await retrieveContext(query, {
      topicName: pineconeTopicName,
      topK: 8  // Get more chunks for blog posts
    })

    console.log(`[Blog RAG] Retrieved ${contexts.length} chunks from Pinecone`)

    if (contexts.length === 0) {
      console.log('[Blog RAG] No content found in Pinecone, will use default context')
      return ''
    }

    // Combine contexts into a single string
    let content = contexts
      .map((ctx, idx) => {
        return `[Source ${idx + 1}: ${ctx.metadata.fileName}]\n${ctx.text}`
      })
      .join('\n\n---\n\n')

    // Truncate to approximate token limit (rough: 4 chars per token)
    const maxChars = maxTokens * 4
    if (content.length > maxChars) {
      content = content.slice(0, maxChars) + '...'
    }

    console.log(`[Blog RAG] Final context length: ${content.length} chars`)
    return content

  } catch (error) {
    console.error('[Blog RAG] Error retrieving from Pinecone:', error)
    return ''
  }
}

// Re-export for backwards compatibility (these are no longer used but kept to avoid breaking imports)
export function chunkText(text: string, chunkSize: number = 1500, overlap: number = 200): string[] {
  const chunks: string[] = []
  let start = 0

  const cleanedText = text
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  while (start < cleanedText.length) {
    let end = start + chunkSize

    if (end < cleanedText.length) {
      const paragraphBreak = cleanedText.lastIndexOf('\n\n', end)
      if (paragraphBreak > start + chunkSize / 2) {
        end = paragraphBreak
      } else {
        const sentenceBreak = cleanedText.lastIndexOf('. ', end)
        if (sentenceBreak > start + chunkSize / 2) {
          end = sentenceBreak + 1
        }
      }
    }

    const chunk = cleanedText.slice(start, end).trim()
    if (chunk.length > 0) {
      chunks.push(chunk)
    }

    start = end - overlap
    if (start < 0) start = 0
  }

  return chunks
}

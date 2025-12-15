/**
 * RAG (Retrieval Augmented Generation) System
 *
 * This module handles:
 * - Querying Pinecone for relevant content
 * - Generating embeddings for queries
 * - Retrieving context for question generation
 */

import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

// Lazy initialization to avoid build-time errors
let pineconeInstance: Pinecone | null = null;
let openaiInstance: OpenAI | null = null;

function getPineconeClient(): Pinecone {
  if (!pineconeInstance) {
    const apiKey = process.env.PINECONE_API_KEY;
    if (!apiKey) {
      throw new Error('PINECONE_API_KEY environment variable is not set');
    }
    pineconeInstance = new Pinecone({ apiKey });
  }
  return pineconeInstance;
}

function getOpenAIClient(): OpenAI {
  if (!openaiInstance) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }
    openaiInstance = new OpenAI({ apiKey });
  }
  return openaiInstance;
}

export interface RetrievedContext {
  text: string;
  metadata: {
    topicId: string;
    topicName: string;
    fileName: string;
    chunkIndex: number;
    source: string;
  };
  score: number;
}

export interface RAGQueryOptions {
  topicId?: string;
  topicName?: string;
  subtopic?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  topK?: number; // Number of results to retrieve
}

/**
 * Generate embedding for a query
 */
async function generateQueryEmbedding(query: string): Promise<number[]> {
  const openai = getOpenAIClient();

  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: query
  });

  return response.data[0].embedding;
}

/**
 * Retrieve relevant context from Pinecone based on query
 */
export async function retrieveContext(
  query: string,
  options: RAGQueryOptions = {}
): Promise<RetrievedContext[]> {
  const {
    topicId,
    topicName,
    subtopic,
    topK = 5
  } = options;

  try {
    const pinecone = getPineconeClient();
    const index = pinecone.index('cfa-materials');

    // Generate embedding for the query
    const queryEmbedding = await generateQueryEmbedding(query);

    // Build filter based on options
    const filter: any = {};
    if (topicId) {
      filter.topicId = topicId;
    }
    if (topicName) {
      filter.topicName = topicName;
    }

    // Query Pinecone
    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
      filter: Object.keys(filter).length > 0 ? filter : undefined
    });

    // Transform results
    const contexts: RetrievedContext[] = queryResponse.matches?.map(match => ({
      text: (match.metadata?.text as string) || '',
      metadata: {
        topicId: (match.metadata?.topicId as string) || '',
        topicName: (match.metadata?.topicName as string) || '',
        fileName: (match.metadata?.fileName as string) || '',
        chunkIndex: (match.metadata?.chunkIndex as number) || 0,
        source: (match.metadata?.source as string) || ''
      },
      score: match.score || 0
    })) || [];

    return contexts;

  } catch (error) {
    console.error('Error retrieving context from Pinecone:', error);
    throw new Error(`RAG retrieval failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Map UI topic names to Pinecone metadata names (handles mismatches from folder names)
const TOPIC_NAME_MAP: Record<string, string> = {
  'Ethical and Professional Standards': 'Ethical and professional Standards',
  'Fixed Income': 'Fixed Income ',  // Trailing space in folder name
  'Portfolio Management': 'Portfolio Management '  // Trailing space in folder name
};

export interface RetrievedQuestionContext {
  context: string;
  sourceFiles: string[];
  chunkCount: number;
}

/**
 * Retrieve context specifically for generating CFA questions
 */
export async function retrieveContextForQuestion(
  topicArea: string,
  subtopic?: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate',
  learningObjectiveText?: string
): Promise<RetrievedQuestionContext> {
  // Map topic name to what's stored in Pinecone (handles folder name mismatches)
  const pineconeTopicName = TOPIC_NAME_MAP[topicArea] || topicArea;

  console.log(`[RAG] Retrieving context for topic: "${topicArea}" -> Pinecone filter: "${pineconeTopicName}"`);

  // Build a query that targets relevant content
  let query = `CFA Level 1 ${topicArea}`;
  if (subtopic) {
    query += ` ${subtopic}`;
  }

  // If a learning objective is provided, use it as the primary search term
  // This helps find content most relevant to the specific learning outcome
  if (learningObjectiveText) {
    query = `${learningObjectiveText} ${topicArea}`;
    console.log(`[RAG] Using learning objective for search: "${learningObjectiveText.substring(0, 50)}..."`);
  }

  // Add difficulty context to the query
  if (difficulty === 'beginner') {
    query += ' fundamental concepts basics introduction';
  } else if (difficulty === 'advanced') {
    query += ' advanced complex application';
  }

  console.log(`[RAG] Query: "${query.substring(0, 100)}..."`);

  // Retrieve relevant contexts
  const contexts = await retrieveContext(query, {
    topicName: pineconeTopicName,
    subtopic,
    difficulty,
    topK: 3 // Get top 3 most relevant chunks
  });

  console.log(`[RAG] Retrieved ${contexts.length} chunks from Pinecone`);

  if (contexts.length === 0) {
    throw new Error(`No relevant content found for topic: ${topicArea}`);
  }

  // Get unique source files
  const sourceFiles = [...new Set(contexts.map(ctx => ctx.metadata.fileName))];
  console.log(`[RAG] Source files: ${sourceFiles.join(', ')}`);

  // Combine contexts into a single string
  const combinedContext = contexts
    .map((ctx, idx) => {
      return `[Source ${idx + 1}: ${ctx.metadata.fileName}]\n${ctx.text}\n`;
    })
    .join('\n---\n\n');

  return {
    context: combinedContext,
    sourceFiles,
    chunkCount: contexts.length
  };
}

/**
 * Check if RAG system is configured and ready
 */
export async function isRAGConfigured(): Promise<boolean> {
  try {
    if (!process.env.PINECONE_API_KEY || !process.env.OPENAI_API_KEY) {
      return false;
    }

    const pinecone = getPineconeClient();
    const indexes = await pinecone.listIndexes();
    const hasIndex = indexes.indexes?.some(idx => idx.name === 'cfa-materials');

    return hasIndex || false;
  } catch (error) {
    console.error('Error checking RAG configuration:', error);
    return false;
  }
}

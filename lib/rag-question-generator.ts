/**
 * RAG-Based Question Generator
 *
 * Generates CFA Level 1 questions using retrieved context from training materials
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { retrieveContextForQuestion } from './rag';

let geminiInstance: GoogleGenerativeAI | null = null;

function getGeminiClient(): GoogleGenerativeAI {
  if (!geminiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    geminiInstance = new GoogleGenerativeAI(apiKey);
  }
  return geminiInstance;
}

export interface GeneratedQuestion {
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  correct_answer: 'A' | 'B' | 'C';
  explanation: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  topic_area: string;
  subtopic?: string;
  keywords: string[];
  source_material?: string; // Which material it was based on
}

const CFA_QUESTION_GUIDELINES = `
CFA Level 1 Question Guidelines:
- Questions must be multiple-choice with exactly 3 options (A, B, C)
- Include qualifiers like "most likely," "least likely," "best described," "most appropriate"
- Focus on foundational concepts and application
- Avoid complex calculations requiring professional calculators
- Questions should test understanding, not memorization
- Include proper CFA terminology and standards
- Explanations should be educational and reference CFA curriculum
- Maintain professional, formal tone throughout
- CRITICAL: Base questions ONLY on the provided source material
- Do not invent concepts or facts not present in the source material
`;

/**
 * Generate a CFA question using RAG (Retrieval Augmented Generation)
 */
export async function generateRAGQuestion(
  topicArea: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate',
  subtopic?: string
): Promise<GeneratedQuestion> {

  try {
    // Step 1: Retrieve relevant context from training materials
    console.log(`Retrieving context for ${topicArea}${subtopic ? ` - ${subtopic}` : ''}...`);
    const context = await retrieveContextForQuestion(topicArea, subtopic, difficulty);

    if (!context || context.trim().length === 0) {
      throw new Error('No relevant training material found for this topic');
    }

    console.log(`Retrieved ${context.length} characters of context`);

    // Step 2: Generate question using Gemini with the retrieved context
    const prompt = `
${CFA_QUESTION_GUIDELINES}

You are generating a CFA Level 1 exam question based STRICTLY on the following source material from official CFA training materials:

===== SOURCE MATERIAL START =====
${context}
===== SOURCE MATERIAL END =====

Generate a ${difficulty} level CFA Level 1 multiple-choice question for:
- Topic Area: ${topicArea}
${subtopic ? `- Subtopic: ${subtopic}` : ''}
- Difficulty: ${difficulty}

CRITICAL REQUIREMENTS:
1. The question MUST be directly based on concepts from the source material above
2. Do NOT invent facts, figures, or concepts not present in the source
3. Create one high-quality multiple-choice question with 3 options (A, B, C)
4. Include appropriate CFA-style qualifiers in the question
5. Provide detailed explanation referencing the source material
6. List 3-5 relevant keywords from the source material

Return ONLY a valid JSON object with no additional text. Use this exact format:
{
  "question_text": "The question with appropriate qualifiers...",
  "option_a": "First option text",
  "option_b": "Second option text",
  "option_c": "Third option text",
  "correct_answer": "A|B|C",
  "explanation": "Detailed explanation referencing the source material and explaining why the correct answer is correct",
  "difficulty_level": "${difficulty}",
  "topic_area": "${topicArea}",
  "subtopic": "${subtopic || ''}",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}
`;

    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000,
        responseMimeType: "application/json",
      }
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const content = response.text();

    if (!content) {
      throw new Error('No response from Gemini');
    }

    const question: GeneratedQuestion = JSON.parse(content);

    // Validate the generated question
    if (!question.question_text || !question.option_a || !question.option_b || !question.option_c) {
      throw new Error('Invalid question format: missing required fields');
    }

    if (!['A', 'B', 'C'].includes(question.correct_answer)) {
      throw new Error('Invalid correct answer: must be A, B, or C');
    }

    // Add source material reference
    question.source_material = 'CFA Training Materials (RAG)';

    return question;

  } catch (error) {
    console.error('Error generating RAG question:', error);
    throw new Error(`Failed to generate question: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generate multiple questions using RAG
 */
export async function generateMultipleRAGQuestions(
  topicArea: string,
  count: number,
  difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate',
  subtopic?: string
): Promise<GeneratedQuestion[]> {
  const questions: GeneratedQuestion[] = [];

  for (let i = 0; i < count; i++) {
    try {
      console.log(`Generating question ${i + 1}/${count}...`);
      const question = await generateRAGQuestion(topicArea, difficulty, subtopic);
      questions.push(question);

      // Add delay to avoid rate limiting
      if (i < count - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`Failed to generate question ${i + 1}:`, error);
      // Continue with other questions
    }
  }

  return questions;
}

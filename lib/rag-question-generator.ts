/**
 * RAG-Based Question Generator
 *
 * Generates CFA Level 1 questions using retrieved context from training materials
 */

import OpenAI from 'openai';
import { retrieveContextForQuestion } from './rag';

let openaiInstance: OpenAI | null = null;

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
  learning_objective_id?: string;
  learning_objective_text?: string;
}

const CFA_QUESTION_GUIDELINES = `
You are creating CFA Level 1 exam questions. Follow these strict guidelines:

QUESTION STYLE:
- Write questions that test APPLICATION and UNDERSTANDING, not recall
- Use realistic scenarios: "An analyst is evaluating...", "A portfolio manager observes..."
- Include qualifiers: "most likely," "least likely," "best described as," "most appropriate"
- Make wrong answers plausible but clearly incorrect upon analysis
- Questions should require candidates to THINK, not just remember

ANSWER REQUIREMENTS:
- Exactly 3 options (A, B, C)
- ONE and ONLY ONE option must be definitively correct - not "closest" or "best approximation"
- The correct answer must be unambiguously right based on CFA curriculum concepts
- Wrong answers must be clearly incorrect when analyzed properly (not partially correct)
- Each option should be similar in length and structure
- Avoid "all of the above" or "none of the above"
- The correct answer should not be obvious from wording alone

WHAT TO AVOID:
- DO NOT write "According to the material..." or "The text states..."
- DO NOT create fill-in-the-blank style questions
- DO NOT make questions that can be answered without understanding the concept
- DO NOT include obvious wrong answers
- DO NOT reference "source material" or "the reading" in explanations

EXPLANATION FORMAT (CRITICAL - follow this exact structure):
Write the explanation as if YOU are the instructor explaining to a student. Use clear paragraph breaks.

FORMAT:
1. First paragraph: State the correct answer and explain WHY it's correct
2. If the question involves calculations or formulas: Include the relevant formula/equation and show the calculation
3. Separate paragraphs for each wrong answer explaining why it's incorrect

FOR FORMULAIC/CALCULATION QUESTIONS - ALWAYS include:
- The relevant formula written out (e.g., "PV = FV / (1 + r)^n")
- The calculation steps if applicable
- Why the formula applies to this situation

EXAMPLE for conceptual question:
"B is correct. The equity risk premium represents the additional return investors require for holding equities over risk-free assets, calculated as the difference between expected equity returns and the risk-free rate.

A is incorrect because the market risk premium specifically refers to systematic risk compensation, not the total return on equities.

C is incorrect because the required return on equity includes both the risk-free rate and the equity risk premium, making it a broader measure than the premium itself."

EXAMPLE for formulaic question:
"A is correct. The present value is calculated using the formula:

PV = FV / (1 + r)^n

Where FV = $10,000, r = 5% (0.05), and n = 3 years:
PV = $10,000 / (1.05)^3 = $10,000 / 1.1576 = $8,638.38

B is incorrect because it uses simple interest (FV / (1 + r × n)) rather than compound interest, which would give $8,696.

C is incorrect because it calculates future value instead of present value, multiplying rather than dividing by the discount factor."
`;

/**
 * Generate a CFA question using RAG (Retrieval Augmented Generation)
 */
export async function generateRAGQuestion(
  topicArea: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate',
  subtopic?: string,
  learningObjectiveId?: string,
  learningObjectiveText?: string
): Promise<GeneratedQuestion> {

  try {
    // Step 1: Retrieve relevant context from training materials
    console.log(`\n========== RAG QUESTION GENERATION ==========`);
    console.log(`Topic: ${topicArea}`);
    console.log(`Subtopic: ${subtopic || 'None'}`);
    console.log(`Learning Objective: ${learningObjectiveId || 'None'}`);
    console.log(`Difficulty: ${difficulty}`);
    console.log(`----------------------------------------------`);

    const { context, sourceFiles, chunkCount } = await retrieveContextForQuestion(topicArea, subtopic, difficulty, learningObjectiveText);

    if (!context || context.trim().length === 0) {
      throw new Error('No relevant training material found for this topic');
    }

    console.log(`[RAG] Context length: ${context.length} characters`);
    console.log(`[RAG] Source files used: ${sourceFiles.join(', ')}`);
    console.log(`----------------------------------------------`);

    // Build learning objective section for the prompt
    const learningObjectiveSection = learningObjectiveId && learningObjectiveText
      ? `
LEARNING OBJECTIVE TO TEST:
ID: ${learningObjectiveId}
The candidate should be able to: ${learningObjectiveText}

CRITICAL: Your question MUST test this specific learning objective. The question should assess whether a candidate can demonstrate this skill or knowledge.
`
      : '';

    // Step 2: Generate question using OpenAI with the retrieved context
    const prompt = `
${CFA_QUESTION_GUIDELINES}

You are generating a CFA Level 1 exam question based STRICTLY on the following source material from official CFA training materials:

===== SOURCE MATERIAL START =====
${context}
===== SOURCE MATERIAL END =====
${learningObjectiveSection}
Generate a ${difficulty} level CFA Level 1 multiple-choice question for:
- Topic Area: ${topicArea}
${subtopic ? `- Subtopic: ${subtopic}` : ''}
${learningObjectiveId ? `- Learning Objective: ${learningObjectiveId}` : ''}
- Difficulty: ${difficulty}

CRITICAL REQUIREMENTS:
1. The question MUST be directly based on concepts from the source material above
${learningObjectiveText ? '2. The question MUST test the specified learning objective' : '2. Do NOT invent facts, figures, or concepts not present in the source'}
3. Create one high-quality multiple-choice question with 3 options (A, B, C)
4. ONE option must be definitively correct (not "closest" or "most appropriate among imperfect choices")
5. Include appropriate CFA-style qualifiers in the question
6. List 3-5 relevant keywords from the source material

EXPLANATION FORMAT - Follow this EXACTLY:
- Start with "[Letter] is correct." then explain WHY using the concept
- For formulaic questions: Include the relevant formula and calculation steps
- Then explain why each wrong answer is incorrect (separate paragraph for each)
- Write as if you are the instructor explaining to a student
- Use line breaks between paragraphs for readability
- NEVER mention "source material", "the reading", "the text", or "according to"

Return ONLY a valid JSON object with no additional text. Use this exact format:
{
  "question_text": "The question with appropriate qualifiers...",
  "option_a": "First option text",
  "option_b": "Second option text",
  "option_c": "Third option text",
  "correct_answer": "A|B|C",
  "explanation": "[Letter] is correct. [Why it's correct]. [Letter] is incorrect because [reason]. [Letter] is incorrect because [reason].",
  "difficulty_level": "${difficulty}",
  "topic_area": "${topicArea}",
  "subtopic": "${subtopic || ''}",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}
`;

    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a senior CFA exam question writer with 20 years of experience. Your questions are known for testing deep understanding through realistic scenarios. You never write simple recall questions. Every question you create requires candidates to apply concepts to solve problems. Each question has exactly ONE correct answer that is definitively right - never use 'closest' or 'best approximation' answers. When writing explanations, write as an instructor teaching a student - never reference 'source material', 'the text', or 'the reading'. Base all questions strictly on the provided source material - never invent facts."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No response from OpenAI');
    }

    const question: GeneratedQuestion = JSON.parse(content);

    // Validate the generated question
    if (!question.question_text || !question.option_a || !question.option_b || !question.option_c) {
      throw new Error('Invalid question format: missing required fields');
    }

    if (!['A', 'B', 'C'].includes(question.correct_answer)) {
      throw new Error('Invalid correct answer: must be A, B, or C');
    }

    // Add source material reference with actual file names
    question.source_material = sourceFiles.length > 0
      ? `RAG: ${sourceFiles.join(', ')}`
      : 'CFA Training Materials (RAG)';

    // Add learning objective info if provided
    if (learningObjectiveId) {
      question.learning_objective_id = learningObjectiveId;
      question.learning_objective_text = learningObjectiveText;
    }

    console.log(`[RAG] Question generated successfully from: ${sourceFiles.join(', ')}`);
    if (learningObjectiveId) {
      console.log(`[RAG] Learning Objective: ${learningObjectiveId}`);
    }
    console.log(`==============================================\n`);

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
  subtopic?: string,
  learningObjectiveId?: string,
  learningObjectiveText?: string
): Promise<GeneratedQuestion[]> {
  const questions: GeneratedQuestion[] = [];

  for (let i = 0; i < count; i++) {
    try {
      console.log(`Generating question ${i + 1}/${count}...`);
      const question = await generateRAGQuestion(topicArea, difficulty, subtopic, learningObjectiveId, learningObjectiveText);
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

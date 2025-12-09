import { GoogleGenerativeAI } from '@google/generative-ai';

// Lazy-load Gemini client to avoid build-time errors
// Using Gemini 1.5 Pro for CFA question generation
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
}

const CFA_LEVEL_1_TOPICS = [
  'Ethical and Professional Standards',
  'Quantitative Methods',
  'Economics',
  'Financial Statement Analysis',
  'Corporate Issuers',
  'Equity Investments',
  'Fixed Income',
  'Derivatives',
  'Alternative Investments',
  'Portfolio Management'
];

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
`;

export async function generateCFAQuestion(
  topicArea: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate',
  subtopic?: string,
  sourceContext?: string
): Promise<GeneratedQuestion> {

  if (!CFA_LEVEL_1_TOPICS.includes(topicArea)) {
    throw new Error(`Invalid topic area. Must be one of: ${CFA_LEVEL_1_TOPICS.join(', ')}`);
  }

  const prompt = `
${CFA_QUESTION_GUIDELINES}

Generate a CFA Level 1 multiple-choice question for:
- Topic Area: ${topicArea}
- Difficulty: ${difficulty}
${subtopic ? `- Subtopic: ${subtopic}` : ''}
${sourceContext ? `- Source Context: ${sourceContext}` : ''}

Requirements:
1. Create one high-quality multiple-choice question with 3 options (A, B, C)
2. Question should be ${difficulty} level appropriate for CFA Level 1
3. Include appropriate qualifiers in the question stem
4. Provide detailed explanation for the correct answer
5. List 3-5 relevant keywords for the question
6. Ensure the question tests conceptual understanding

You are an expert CFA Level 1 question writer with deep knowledge of the CFA curriculum. Generate high-quality, exam-realistic multiple-choice questions that follow CFA Institute standards.

IMPORTANT: Return ONLY a valid JSON object with no additional text before or after. Use this exact format:
{
  "question_text": "The question with appropriate qualifiers...",
  "option_a": "First option text",
  "option_b": "Second option text",
  "option_c": "Third option text",
  "correct_answer": "A|B|C",
  "explanation": "Detailed explanation of why the correct answer is correct and why others are wrong",
  "difficulty_level": "${difficulty}",
  "topic_area": "${topicArea}",
  "subtopic": "${subtopic || ''}",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}
`;

  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
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

    return question;

  } catch (error) {
    console.error('Error generating CFA question:', error);
    throw new Error(`Failed to generate question: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function generateMultipleCFAQuestions(
  topicArea: string,
  count: number,
  difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate',
  subtopic?: string
): Promise<GeneratedQuestion[]> {
  const questions: GeneratedQuestion[] = [];

  for (let i = 0; i < count; i++) {
    try {
      const question = await generateCFAQuestion(topicArea, difficulty, subtopic);
      questions.push(question);

      // Add a small delay to avoid rate limiting
      if (i < count - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`Failed to generate question ${i + 1}:`, error);
      // Continue with other questions even if one fails
    }
  }

  return questions;
}

export async function generateQuestionWithContext(
  topicArea: string,
  sourceText: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate'
): Promise<GeneratedQuestion> {

  const contextPrompt = `
${CFA_QUESTION_GUIDELINES}

Based on the following source material, generate a CFA Level 1 multiple-choice question:

SOURCE MATERIAL:
${sourceText}

Generate a question for:
- Topic Area: ${topicArea}
- Difficulty: ${difficulty}

The question should:
1. Be directly based on concepts from the source material
2. Test understanding of the key concepts presented
3. Follow CFA Level 1 standards and format
4. Include appropriate qualifiers and terminology

You are an expert CFA Level 1 question writer. Create questions based on provided source material that test key concepts and understanding.

IMPORTANT: Return ONLY a valid JSON object with no additional text. Use this exact format:
{
  "question_text": "The question with appropriate qualifiers...",
  "option_a": "First option text",
  "option_b": "Second option text",
  "option_c": "Third option text",
  "correct_answer": "A|B|C",
  "explanation": "Detailed explanation referencing the source material",
  "difficulty_level": "${difficulty}",
  "topic_area": "${topicArea}",
  "subtopic": "",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}
`;

  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000,
        responseMimeType: "application/json",
      }
    });

    const result = await model.generateContent(contextPrompt);
    const response = result.response;
    const content = response.text();

    if (!content) {
      throw new Error('No response from Gemini');
    }

    return JSON.parse(content);

  } catch (error) {
    console.error('Error generating context-based question:', error);
    throw new Error(`Failed to generate question from context: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export { getGeminiClient as getOpenAIClient };

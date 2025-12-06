import fs from 'fs';
import path from 'path';
import { getOpenAIClient, GeneratedQuestion } from './openai';

// Lazy-load pdf-parse to avoid build-time errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pdfParser: any = null;
async function getPDFParser() {
  if (!pdfParser) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    pdfParser = require('pdf-parse');
  }
  return pdfParser;
}

interface GenerateQuestionOptions {
  topicId: string;
  topicName: string;
  subtopicId?: string;
  subtopicName?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  count: number;
}

interface GenerationResult {
  questions: GeneratedQuestion[];
  success_count: number;
  failed_count: number;
  source_files: string[];
  errors?: string[];
}

// Map topic IDs to folder names
const TOPIC_FOLDER_MAP: Record<string, string> = {
  'ethical-professional-standards': 'Ethical and professional Standards',
  'quantitative-methods': 'Quantitative Methods',
  'economics': 'Economics',
  'financial-statement-analysis': 'Financial Statement Analysis',
  'corporate-issuers': 'Corporate Issuers',
  'equity-investments': 'Equity Investments',
  'fixed-income': 'Fixed Income',
  'derivatives': 'Derivatives',
  'alternative-investments': 'Alternative Investments',
  'portfolio-management': 'Portfolio Management'
};

/**
 * Extract text from a PDF file
 */
async function extractPDFText(filePath: string): Promise<string> {
  try {
    const pdf = await getPDFParser();
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error(`Error extracting text from ${filePath}:`, error);
    throw new Error(`Failed to extract PDF text: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get all PDF files in a topic folder
 */
function getPDFFilesForTopic(topicId: string, subtopicName?: string): string[] {
  const folderName = TOPIC_FOLDER_MAP[topicId];
  if (!folderName) {
    throw new Error(`Unknown topic ID: ${topicId}`);
  }

  const topicPath = path.join(process.cwd(), 'cfatrainingmaterial', folderName);

  if (!fs.existsSync(topicPath)) {
    throw new Error(`Training material folder not found: ${topicPath}`);
  }

  const files = fs.readdirSync(topicPath);
  let pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));

  // If subtopic is specified, try to filter files that might match
  if (subtopicName) {
    const matchingFiles = pdfFiles.filter(file =>
      file.toLowerCase().includes(subtopicName.toLowerCase().substring(0, 15))
    );

    // If we found matching files, use them; otherwise use all files
    if (matchingFiles.length > 0) {
      pdfFiles = matchingFiles;
    }
  }

  return pdfFiles.map(file => path.join(topicPath, file));
}

/**
 * Generate a question using OpenAI based on PDF content
 */
async function generateQuestionFromText(
  topicName: string,
  subtopicName: string | undefined,
  pdfText: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): Promise<GeneratedQuestion> {

  // Take a relevant chunk of text (approximately 3000 characters)
  // We'll use multiple chunks to get diverse questions
  const maxChunkSize = 3000;
  const chunks: string[] = [];

  // Split into paragraphs and group them into chunks
  const paragraphs = pdfText.split('\n\n').filter(p => p.trim().length > 50);
  let currentChunk = '';

  for (const paragraph of paragraphs) {
    if (currentChunk.length + paragraph.length < maxChunkSize) {
      currentChunk += paragraph + '\n\n';
    } else {
      if (currentChunk.length > 500) {
        chunks.push(currentChunk);
      }
      currentChunk = paragraph + '\n\n';
    }
  }

  if (currentChunk.length > 500) {
    chunks.push(currentChunk);
  }

  // Select a random chunk for variety
  const selectedChunk = chunks[Math.floor(Math.random() * chunks.length)] || pdfText.substring(0, maxChunkSize);

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
- Questions must be DIRECTLY based on concepts from the source material provided
- Do not make up information not present in the source material
`;

  const prompt = `
${CFA_QUESTION_GUIDELINES}

You are creating a question based on the following CFA Level 1 curriculum material:

TOPIC: ${topicName}
${subtopicName ? `SUBTOPIC: ${subtopicName}` : ''}
DIFFICULTY: ${difficulty}

SOURCE MATERIAL:
${selectedChunk}

Create ONE high-quality CFA Level 1 multiple-choice question that:
1. Tests a KEY CONCEPT from the source material above
2. Has exactly 3 options (A, B, C)
3. Is ${difficulty} level difficulty
4. Includes appropriate CFA-style qualifiers
5. Has a detailed explanation referencing the source material
6. Lists 3-5 relevant keywords

IMPORTANT: The question MUST be based on actual content from the source material. Do not invent concepts.

Return ONLY a valid JSON object with no additional text before or after. Use this exact format:
{
  "question_text": "The question with appropriate qualifiers...",
  "option_a": "First option text",
  "option_b": "Second option text",
  "option_c": "Third option text",
  "correct_answer": "A|B|C",
  "explanation": "Detailed explanation referencing the source material",
  "difficulty_level": "${difficulty}",
  "topic_area": "${topicName}",
  "subtopic": "${subtopicName || ''}",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}
`;

  try {
    const genAI = getOpenAIClient(); // getOpenAIClient is aliased to getGeminiClient
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000,
        responseMimeType: "application/json",
      }
    });

    const fullPrompt = `You are an expert CFA Level 1 question writer with deep knowledge of the CFA curriculum. Generate high-quality, accurate questions based ONLY on the provided source material. Ensure all questions are factually correct and directly supported by the source text.

${prompt}`;

    const result = await model.generateContent(fullPrompt);
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
    console.error('Error generating question from PDF text:', error);
    throw new Error(`Failed to generate question: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generate multiple questions from PDF material
 */
export async function generateQuestionFromPDFMaterial(
  options: GenerateQuestionOptions
): Promise<GenerationResult> {
  const { topicId, topicName, subtopicName, difficulty, count } = options;

  const questions: GeneratedQuestion[] = [];
  const errors: string[] = [];
  const sourceFiles: string[] = [];

  try {
    // Get PDF files for this topic
    const pdfFiles = getPDFFilesForTopic(topicId, subtopicName);

    if (pdfFiles.length === 0) {
      throw new Error(`No PDF files found for topic: ${topicName}`);
    }

    console.log(`Found ${pdfFiles.length} PDF files for ${topicName}`);
    sourceFiles.push(...pdfFiles.map(f => path.basename(f)));

    // Extract text from PDFs
    const pdfTexts: string[] = [];
    for (const pdfFile of pdfFiles) {
      try {
        console.log(`Extracting text from: ${path.basename(pdfFile)}`);
        const text = await extractPDFText(pdfFile);
        pdfTexts.push(text);
      } catch (error) {
        console.error(`Failed to extract text from ${pdfFile}:`, error);
        errors.push(`Failed to read ${path.basename(pdfFile)}`);
      }
    }

    if (pdfTexts.length === 0) {
      throw new Error('Failed to extract text from any PDF files');
    }

    // Combine all PDF texts
    const combinedText = pdfTexts.join('\n\n=== NEXT DOCUMENT ===\n\n');

    // Generate the requested number of questions
    for (let i = 0; i < count; i++) {
      try {
        console.log(`Generating question ${i + 1}/${count}...`);
        const question = await generateQuestionFromText(
          topicName,
          subtopicName,
          combinedText,
          difficulty
        );
        questions.push(question);

        // Add a delay to avoid rate limiting
        if (i < count - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error(`Failed to generate question ${i + 1}:`, error);
        errors.push(`Question ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return {
      questions,
      success_count: questions.length,
      failed_count: count - questions.length,
      source_files: sourceFiles,
      errors: errors.length > 0 ? errors : undefined
    };

  } catch (error) {
    console.error('Error in generateQuestionFromPDFMaterial:', error);
    throw error;
  }
}

/**
 * Get available topics and their PDF files
 */
export function getAvailableTopics(): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  for (const topicId of Object.keys(TOPIC_FOLDER_MAP)) {
    try {
      const pdfFiles = getPDFFilesForTopic(topicId);
      result[topicId] = pdfFiles.map(f => path.basename(f));
    } catch (error) {
      console.error(`Error reading topic ${topicId}:`, error);
      result[topicId] = [];
    }
  }

  return result;
}

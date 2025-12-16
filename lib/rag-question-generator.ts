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

export interface TableData {
  title: string;
  headers: string[];
  rows: Array<{
    label?: string;
    values: (string | number)[];
  }>;
  footnote?: string;
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
  has_table?: boolean;
  table_data?: TableData;
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
BE SPECIFIC - always reference the exact CFA standard, principle, formula, or concept BY NAME.

FORMAT:
1. First paragraph: State the correct answer and explain WHY it's correct, citing the SPECIFIC standard/concept/formula by name
2. If the question involves calculations or formulas: Include the relevant formula/equation and show the calculation
3. Separate paragraphs for each wrong answer explaining why it's incorrect

CRITICAL - BE SPECIFIC:
- For Ethics: Reference the exact Standard number and name (e.g., "Under Standard III(A) Loyalty, Prudence, and Care...")
- For Formulas: Write out the exact formula with variable definitions
- For Concepts: Name the specific principle, theory, or framework (e.g., "According to the Capital Asset Pricing Model (CAPM)...")
- For Accounting: Reference specific standards or treatments (e.g., "Under IFRS 16 lease accounting...")

EXAMPLE for Ethics question:
"B is correct. Under Standard III(A) Loyalty, Prudence, and Care, members and candidates who manage a company's pension fund owe these duties to the participants and beneficiaries of the pension plan, not to the management of the company or the company's shareholders. The duty of loyalty requires acting in the best interests of the beneficial owners.

A is incorrect because Standard III(A) specifically identifies plan participants and beneficiaries as the parties to whom fiduciary duties are owed, not company management.

C is incorrect because shareholders are owners of the company, not beneficiaries of the pension plan. The pension fund manager's fiduciary duty runs to the pension beneficiaries."

EXAMPLE for formulaic question:
"A is correct. Using the Gordon Growth Model (Dividend Discount Model for constant growth):

P₀ = D₁ / (r - g)

Where D₁ = $2.00 (next year's dividend), r = 10% (required return), and g = 4% (growth rate):
P₀ = $2.00 / (0.10 - 0.04) = $2.00 / 0.06 = $33.33

B is incorrect because it uses the current dividend D₀ instead of the expected dividend D₁, which would undervalue the stock.

C is incorrect because it adds rather than subtracts the growth rate in the denominator, which is a common error that significantly overvalues the stock."

EXAMPLE for conceptual question:
"C is correct. According to the Efficient Market Hypothesis (EMH) in its semi-strong form, stock prices fully reflect all publicly available information. This means that fundamental analysis based on public information cannot consistently generate excess returns, as the information is already incorporated into prices.

A is incorrect because the semi-strong form specifically addresses public information, not all information including insider information (which is the strong form).

B is incorrect because technical analysis relies on historical price data, which is addressed by the weak form of EMH, not the semi-strong form."
`;

/**
 * Generate a CFA question using RAG (Retrieval Augmented Generation)
 */
export async function generateRAGQuestion(
  topicArea: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate',
  subtopic?: string,
  learningObjectiveId?: string,
  learningObjectiveText?: string,
  existingQuestions: string[] = []
): Promise<GeneratedQuestion> {

  try {
    // Step 1: Retrieve relevant context from training materials
    console.log(`\n========== RAG QUESTION GENERATION ==========`);
    console.log(`Topic: ${topicArea}`);
    console.log(`Subtopic: ${subtopic || 'None'}`);
    console.log(`Learning Objective: ${learningObjectiveId || 'None'}`);
    console.log(`Difficulty: ${difficulty}`);
    console.log(`Existing questions to avoid: ${existingQuestions.length}`);
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

    // Build existing questions section to avoid duplicates
    const existingQuestionsSection = existingQuestions.length > 0
      ? `
===== EXISTING QUESTIONS TO AVOID (DO NOT DUPLICATE) =====
The following questions already exist. Your new question MUST be DIFFERENT from all of these.
Do NOT ask about the same specific concept, scenario, or calculation as any of these:

${existingQuestions.slice(0, 20).map((q, i) => `${i + 1}. ${q}`).join('\n')}

IMPORTANT: Create a UNIQUE question that tests a DIFFERENT aspect of the topic/learning objective than the questions above.
==========================================================
`
      : '';

    // Step 2: Generate question using OpenAI with the retrieved context
    const prompt = `
${CFA_QUESTION_GUIDELINES}

You are generating a CFA Level 1 exam question based STRICTLY on the following source material from official CFA training materials:

===== SOURCE MATERIAL START =====
${context}
===== SOURCE MATERIAL END =====
${learningObjectiveSection}${existingQuestionsSection}
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
          content: "You are a senior CFA exam question writer with 20 years of experience. Your questions are known for testing deep understanding through realistic scenarios. You never write simple recall questions. Every question you create requires candidates to apply concepts to solve problems. Each question has exactly ONE correct answer that is definitively right - never use 'closest' or 'best approximation' answers. When writing explanations, BE SPECIFIC: always cite the exact CFA Standard by number and name (e.g., 'Standard III(A) Loyalty, Prudence, and Care'), name specific formulas (e.g., 'Gordon Growth Model'), reference specific theories (e.g., 'Efficient Market Hypothesis'), and cite accounting standards where relevant (e.g., 'IFRS 16'). Write as an instructor teaching a student - never reference 'source material', 'the text', or 'the reading'. Base all questions strictly on the provided source material - never invent facts."
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
  learningObjectiveText?: string,
  existingQuestions: string[] = []
): Promise<GeneratedQuestion[]> {
  const questions: GeneratedQuestion[] = [];

  // Start with existing questions from database
  const allExistingQuestions = [...existingQuestions];

  for (let i = 0; i < count; i++) {
    try {
      console.log(`Generating question ${i + 1}/${count}... (avoiding ${allExistingQuestions.length} existing questions)`);

      // Pass all existing questions (from DB + previously generated in this batch)
      const question = await generateRAGQuestion(
        topicArea,
        difficulty,
        subtopic,
        learningObjectiveId,
        learningObjectiveText,
        allExistingQuestions
      );

      questions.push(question);

      // Add this question to the list to avoid for subsequent generations
      allExistingQuestions.push(question.question_text);

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

/**
 * Generate a CFA question with table data
 * Tables are commonly used for: cash flows, financial ratios, investment comparisons, etc.
 */
export async function generateTableQuestion(
  topicArea: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate',
  learningObjectiveId?: string,
  learningObjectiveText?: string,
  existingQuestions: string[] = []
): Promise<GeneratedQuestion> {
  try {
    console.log(`\n========== TABLE QUESTION GENERATION ==========`);
    console.log(`Topic: ${topicArea}`);
    console.log(`Difficulty: ${difficulty}`);

    // Retrieve context for the topic
    const { context, sourceFiles } = await retrieveContextForQuestion(topicArea, undefined, difficulty, learningObjectiveText);

    if (!context || context.trim().length === 0) {
      throw new Error('No relevant training material found for this topic');
    }

    // Build learning objective section
    const learningObjectiveSection = learningObjectiveId && learningObjectiveText
      ? `
LEARNING OBJECTIVE TO TEST:
ID: ${learningObjectiveId}
The candidate should be able to: ${learningObjectiveText}
`
      : '';

    // Build existing questions section to avoid duplicates
    const existingQuestionsSection = existingQuestions.length > 0
      ? `
===== EXISTING QUESTIONS TO AVOID =====
${existingQuestions.slice(0, 15).map((q, i) => `${i + 1}. ${q}`).join('\n')}
Create a UNIQUE question different from these.
=======================================
`
      : '';

    // Determine table type based on topic
    const tableTypeGuidance = getTableTypeGuidance(topicArea);

    const prompt = `
${CFA_QUESTION_GUIDELINES}

You are generating a CFA Level 1 exam question that includes a DATA TABLE. The question should require the candidate to analyze the table data to find the answer.

===== SOURCE MATERIAL =====
${context}
===========================
${learningObjectiveSection}${existingQuestionsSection}
TABLE QUESTION REQUIREMENTS:
1. Create a realistic financial scenario that presents data in a table format
2. The table should contain numerical data that must be analyzed to answer the question
3. The question should require calculation or comparison using the table data
4. Include realistic but fictional company names/scenarios

${tableTypeGuidance}

TOPIC: ${topicArea}
DIFFICULTY: ${difficulty}
${learningObjectiveId ? `LEARNING OBJECTIVE: ${learningObjectiveId}` : ''}

TABLE DATA FORMAT REQUIREMENTS:
- title: Brief descriptive title for the table
- headers: Column headers (e.g., ["Year", "Cash Flow ($)", "Discount Factor"])
- rows: Array of row objects with optional label and values array
- footnote: Optional note about the data (e.g., "All figures in millions")

Return ONLY a valid JSON object:
{
  "question_text": "Based on the following data, [question with appropriate qualifiers]...",
  "option_a": "First option",
  "option_b": "Second option",
  "option_c": "Third option",
  "correct_answer": "A|B|C",
  "explanation": "[Letter] is correct. [Detailed explanation showing calculations using table data]...",
  "difficulty_level": "${difficulty}",
  "topic_area": "${topicArea}",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "has_table": true,
  "table_data": {
    "title": "Table title",
    "headers": ["Column1", "Column2", "Column3"],
    "rows": [
      {"label": "Row 1", "values": [100, 200, 300]},
      {"label": "Row 2", "values": [150, 250, 350]}
    ],
    "footnote": "Optional footnote"
  }
}
`;

    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a senior CFA exam question writer specializing in questions that present data in tabular format. Your questions require candidates to analyze, calculate, or compare data from tables to find the correct answer. Create realistic financial scenarios with fictional but believable numbers. The table data should be essential to answering the question - not just decorative. Always include step-by-step calculations in your explanations that reference specific values from the table."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 2500,
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

    if (!question.table_data || !question.table_data.headers || !question.table_data.rows) {
      throw new Error('Invalid table data: missing required table fields');
    }

    // Set flags and metadata
    question.has_table = true;
    question.source_material = sourceFiles.length > 0
      ? `RAG: ${sourceFiles.join(', ')}`
      : 'CFA Training Materials (RAG)';

    if (learningObjectiveId) {
      question.learning_objective_id = learningObjectiveId;
      question.learning_objective_text = learningObjectiveText;
    }

    console.log(`[TABLE] Question generated with ${question.table_data.rows.length} rows`);
    console.log(`==============================================\n`);

    return question;

  } catch (error) {
    console.error('Error generating table question:', error);
    throw new Error(`Failed to generate table question: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get topic-specific guidance for table types
 */
function getTableTypeGuidance(topicArea: string): string {
  const topicGuidance: Record<string, string> = {
    'Quantitative Methods': `
SUGGESTED TABLE TYPES for Quantitative Methods:
- Cash flow schedule (Year 0, 1, 2, 3... with cash flows)
- Investment comparison (Investment A, B, C with maturity, liquidity, default risk, interest rates)
- Probability distributions (Outcomes and probabilities)
- Time value of money data (PV, FV, N, I/Y for different scenarios)
- Regression data (X, Y values)
Example: Create a cash flow table for NPV/IRR calculations or investment comparison for TVM problems.`,

    'Financial Statement Analysis': `
SUGGESTED TABLE TYPES for Financial Statement Analysis:
- Financial ratios over multiple years (Year 1, 2, 3 with ROE, ROA, margins)
- Balance sheet excerpts (Assets, Liabilities, Equity items)
- Income statement data (Revenue, COGS, Operating expenses, Net income)
- Common-size analysis (Line items as % of revenue or assets)
- DuPont decomposition data
Example: Create a ratio comparison table or financial statement excerpt for analysis.`,

    'Corporate Issuers': `
SUGGESTED TABLE TYPES for Corporate Issuers:
- Capital structure data (Debt, Equity, WACC components)
- Project cash flows for capital budgeting
- Dividend payment history
- Cost of capital components
Example: Create project cash flows for NPV analysis or capital structure comparison.`,

    'Equity Investments': `
SUGGESTED TABLE TYPES for Equity Investments:
- Stock valuation data (Price, EPS, Dividends, Growth rates)
- Company comparison metrics (P/E, P/B, ROE for multiple companies)
- Market index components and weights
- DDM inputs (D0, g, r for different scenarios)
Example: Create valuation multiples comparison or dividend data for DDM.`,

    'Fixed Income': `
SUGGESTED TABLE TYPES for Fixed Income:
- Bond characteristics (Coupon, Maturity, YTM, Price)
- Yield curve data (Maturity vs Yield)
- Duration/Convexity calculations
- Credit spreads by rating
Example: Create bond comparison table or yield curve data.`,

    'Derivatives': `
SUGGESTED TABLE TYPES for Derivatives:
- Option payoff data (Stock price, Call value, Put value)
- Forward/Futures prices at different maturities
- Hedging scenarios (Spot, Forward, Net position)
- Option Greeks for different strikes
Example: Create option payoff table or futures pricing data.`,

    'Portfolio Management': `
SUGGESTED TABLE TYPES for Portfolio Management:
- Asset allocation weights and returns
- Correlation matrix
- Portfolio statistics (Expected return, Std dev, Sharpe ratio)
- Security characteristics (Beta, Expected return, Residual risk)
Example: Create asset return/risk table or correlation matrix.`,

    'Ethical and Professional Standards': `
SUGGESTED TABLE TYPES for Ethics:
- Scenario comparison (Actions and their compliance status)
- Timeline of events
- Stakeholder interests matrix
- Compensation structure data
Example: Create a scenario table comparing compliant vs non-compliant actions.`,

    'Economics': `
SUGGESTED TABLE TYPES for Economics:
- GDP components over time
- Interest rate/Inflation data
- Currency exchange rates
- Supply/Demand schedule
- Country comparison (GDP growth, inflation, interest rates)
Example: Create economic indicators table or currency data.`,

    'Alternative Investments': `
SUGGESTED TABLE TYPES for Alternative Investments:
- Fund performance data (Returns, Fees, AUM)
- Real estate metrics (Cap rate, NOI, Price)
- Hedge fund statistics
- Commodity prices over time
Example: Create fund comparison or real estate valuation data.`
  };

  return topicGuidance[topicArea] || `
SUGGESTED TABLE TYPES:
- Numerical data comparison across multiple items
- Time series data (Year 1, 2, 3...)
- Financial metrics comparison
- Calculation input data
Create a table appropriate for the topic that requires analysis to answer the question.`;
}

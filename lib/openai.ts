import OpenAI from 'openai';

// Lazy-load OpenAI client to avoid build-time errors
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
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Fast and cost-effective
      messages: [
        {
          role: "system",
          content: "You are an expert CFA Level 1 question writer with deep knowledge of the CFA curriculum. Generate high-quality, exam-realistic multiple-choice questions that follow CFA Institute standards."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
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
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert CFA Level 1 question writer. Create questions based on provided source material that test key concepts and understanding."
        },
        {
          role: "user",
          content: contextPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(content);

  } catch (error) {
    console.error('Error generating context-based question:', error);
    throw new Error(`Failed to generate question from context: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export { getOpenAIClient };

// =============================================
// BLOG POST GENERATION
// =============================================

export interface GeneratedBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  tags: string[];
  read_time_minutes: number;
  faq_items: { question: string; answer: string }[];
  internal_linking_suggestions: string[];
  schema_json: object;
}

// Generate SEO-optimized blog post for CFA Level 1
export async function generateBlogPost(
  context: string,
  categoryName: string,
  topic: string,
  targetKeywords: string[],
  wordCountTarget: number = 1500,
  includeFaq: boolean = true
): Promise<GeneratedBlogPost> {
  const keywordsStr = targetKeywords.length > 0
    ? targetKeywords.join(', ')
    : `${topic}, CFA Level 1, CFA exam prep, finance certification`;

  const openai = getOpenAIClient();
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `You are an expert SEO content writer specializing in finance education and CFA Level 1 exam preparation.

Your task is to create high-quality, SEO-optimized blog posts that:
- Are informative, engaging, and provide genuine value to CFA candidates
- Use proper heading structure (H2, H3) for SEO and readability
- Naturally incorporate target keywords without keyword stuffing
- Have compelling, click-worthy titles and meta descriptions
- Include FAQ sections optimized for Google's featured snippets
- Are written in a professional but approachable tone
- Follow UK English spelling and conventions
- Reference relevant CFA curriculum topics and exam strategies
- Include actionable tips and practical advice

Format the main content in Markdown with proper headings (## for H2, ### for H3).`
      },
      {
        role: 'user',
        content: `Using the following reference material, create an SEO-optimized blog post for the "${categoryName}" category.

Topic: ${topic}
Target Keywords: ${keywordsStr}
Target Word Count: approximately ${wordCountTarget} words
Include FAQ Section: ${includeFaq ? 'Yes (generate 4-5 relevant questions and detailed answers)' : 'No'}

Reference Material:
${context}

Return a JSON object in this EXACT format (no additional text outside the JSON):
{
  "title": "Compelling, keyword-rich title (max 60 characters for SEO)",
  "slug": "url-friendly-slug-with-hyphens",
  "excerpt": "Engaging excerpt that hooks the reader and includes primary keyword (150-160 characters)",
  "content": "Full markdown content with ## H2 and ### H3 headings. Include introduction, multiple sections with practical advice, and a strong conclusion with CTA.",
  "meta_title": "SEO-optimized title tag with primary keyword (max 60 chars)",
  "meta_description": "Compelling meta description with keyword and CTA (max 155 chars)",
  "meta_keywords": ["primary keyword", "secondary keyword", "related term 1", "related term 2", "related term 3"],
  "tags": ["relevant tag 1", "relevant tag 2", "relevant tag 3"],
  "read_time_minutes": 6,
  "faq_items": [
    {"question": "Common question CFA candidates ask?", "answer": "Detailed, helpful answer that provides real value..."},
    {"question": "Another relevant question?", "answer": "Another comprehensive answer..."}
  ],
  "internal_linking_suggestions": ["Related topic for internal link 1", "Related topic 2", "Related topic 3"],
  "schema_json": {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Same as title",
    "description": "Same as meta_description",
    "author": {
      "@type": "Organization",
      "name": "AnalystTrainer"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AnalystTrainer",
      "url": "https://www.analysttrainer.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage"
    },
    "keywords": "comma, separated, keywords"
  }
}

IMPORTANT: Return ONLY the JSON object, no markdown code blocks or additional text.`
      }
    ],
    temperature: 0.7,
    max_tokens: 4096,
  });

  const content = response.choices[0]?.message?.content || '{}';

  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON object found in response');
    }
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Failed to parse blog generation response:', content);
    throw new Error('Failed to parse blog generation response');
  }
}

// Enhance blog content section by section using GPT-4o-mini (cost-effective)
export async function enhanceBlogSection(
  sectionContent: string,
  sectionTitle: string,
  topic: string,
  targetKeywords: string[]
): Promise<string> {
  const openai = getOpenAIClient();
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are an expert content enhancer for CFA exam preparation articles. Your task is to expand and enrich content sections while maintaining accuracy and SEO optimization.

Guidelines:
- Add more detailed explanations, examples, and practical tips
- Include relevant CFA exam statistics, facts, or study strategies where appropriate
- Maintain a professional but approachable tone
- Use UK English spelling and conventions
- Keep the markdown formatting (headings, lists, bold text)
- Naturally incorporate keywords without stuffing
- Add bullet points or numbered lists where they improve readability
- Include actionable advice CFA candidates can use`
      },
      {
        role: 'user',
        content: `Enhance and expand this section from a blog post about "${topic}".

Section Title: ${sectionTitle}
Target Keywords: ${targetKeywords.join(', ')}

Original Content:
${sectionContent}

Please expand this section to be 2-3x more detailed with:
- More specific examples and explanations
- Practical tips or actionable advice
- Relevant facts or statistics if applicable
- Better structured information (lists, subpoints if needed)

Return ONLY the enhanced markdown content for this section (including the heading).`
      }
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  return response.choices[0]?.message?.content || sectionContent;
}

// Enhance entire blog content by processing each major section
export async function enhanceBlogContent(
  content: string,
  topic: string,
  targetKeywords: string[]
): Promise<string> {
  const sections = content.split(/(?=^## )/m).filter(s => s.trim());
  const enhancedSections: string[] = [];

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const titleMatch = section.match(/^## (.+)$/m);
    const sectionTitle = titleMatch ? titleMatch[1] : `Section ${i + 1}`;

    if (section.length < 200 || sectionTitle.toLowerCase().includes('conclusion')) {
      enhancedSections.push(section);
      continue;
    }

    try {
      const enhanced = await enhanceBlogSection(section, sectionTitle, topic, targetKeywords);
      enhancedSections.push(enhanced);

      if (i < sections.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    } catch (error) {
      console.error(`Failed to enhance section "${sectionTitle}":`, error);
      enhancedSections.push(section);
    }
  }

  return enhancedSections.join('\n\n');
}

// Generate SEO-optimized blog post with optional content enhancement
export async function generateEnhancedBlogPost(
  context: string,
  categoryName: string,
  topic: string,
  targetKeywords: string[],
  wordCountTarget: number = 1500,
  includeFaq: boolean = true,
  enhanceContentFlag: boolean = true
): Promise<GeneratedBlogPost> {
  const initialPost = await generateBlogPost(
    context,
    categoryName,
    topic,
    targetKeywords,
    wordCountTarget,
    includeFaq
  );

  if (enhanceContentFlag && initialPost.content) {
    try {
      initialPost.content = await enhanceBlogContent(
        initialPost.content,
        topic,
        targetKeywords
      );

      const wordCount = initialPost.content.split(/\s+/).length;
      initialPost.read_time_minutes = Math.ceil(wordCount / 200);
    } catch (error) {
      console.error('Content enhancement failed, using original:', error);
    }
  }

  return initialPost;
}

// Suggest blog topics using GPT-4o-mini
export async function suggestBlogTopics(
  categoryName: string,
  context: string,
  existingTopics: string[] = []
): Promise<{ topics: { title: string; description: string; keywords: string[] }[] }> {
  const existingStr = existingTopics.length > 0
    ? `\n\nExisting topics to avoid (don't suggest similar ones):\n${existingTopics.join('\n')}`
    : '';

  const openai = getOpenAIClient();
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are an SEO content strategist specializing in finance education and CFA Level 1 exam preparation.

Your task is to suggest compelling, SEO-friendly blog topics that:
- Target long-tail keywords CFA candidates search for
- Address real pain points and questions candidates have
- Have good search volume potential
- Are unique and not commonly covered by competitors
- Are relevant to CFA Level 1 exam preparation`
      },
      {
        role: 'user',
        content: `Based on the following reference material for the "${categoryName}" category, suggest 5 unique blog post topics.
${existingStr}

Reference Material:
${context.slice(0, 3000)}

Return a JSON object in this exact format:
{
  "topics": [
    {
      "title": "Suggested blog post title",
      "description": "Brief description of what the post would cover",
      "keywords": ["primary keyword", "secondary keyword", "related term"]
    }
  ]
}

Return ONLY the JSON object.`
      }
    ],
    temperature: 0.8,
    max_tokens: 1500,
  });

  const content = response.choices[0]?.message?.content || '{}';

  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON object found in response');
    }
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Failed to parse topic suggestions:', content);
    throw new Error('Failed to parse topic suggestions');
  }
}

// Generate embedding for text
export async function generateEmbedding(text: string): Promise<number[]> {
  const openai = getOpenAIClient();
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
}

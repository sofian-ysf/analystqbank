import { NextRequest, NextResponse } from 'next/server';
import { generateQuestionFromPDFMaterial } from '@/lib/pdf-question-generator';
import { createClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Check if GEMINI_API_KEY is set
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        error: 'GEMINI_API_KEY environment variable is not set'
      }, { status: 500 });
    }

    const body = await request.json();
    const {
      topic_id,
      topic_name,
      subtopic_id,
      subtopic_name,
      difficulty = 'intermediate',
      count = 1,
      save_to_database = false
    } = body;

    if (!topic_id || !topic_name) {
      return NextResponse.json({
        error: 'Topic ID and name are required'
      }, { status: 400 });
    }

    // Generate questions from PDF material
    const results = await generateQuestionFromPDFMaterial({
      topicId: topic_id,
      topicName: topic_name,
      subtopicId: subtopic_id,
      subtopicName: subtopic_name,
      difficulty,
      count
    });

    // If requested, save to database
    if (save_to_database && results.questions.length > 0) {
      const supabase = createClient();

      const questionsToSave = results.questions.map(q => ({
        topic_area: topic_name,
        subtopic: subtopic_name || null,
        difficulty_level: q.difficulty_level,
        question_text: q.question_text,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
        keywords: q.keywords,
        is_active: true
      }));

      const { data, error } = await supabase
        .from('questions')
        .insert(questionsToSave)
        .select();

      if (error) {
        console.error('Error saving questions to database:', error);
        return NextResponse.json({
          ...results,
          database_error: 'Failed to save some questions to database',
          error: error.message
        }, { status: 500 });
      }

      return NextResponse.json({
        ...results,
        database_ids: data.map(q => q.id),
        saved: true,
        saved_count: data.length
      });
    }

    return NextResponse.json({ ...results, saved: false });

  } catch (error) {
    console.error('Error generating questions from material:', error);
    return NextResponse.json({
      error: 'Failed to generate questions from material',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Material-Based Question Generator API',
    description: 'Generate CFA Level 1 questions based on PDF training materials',
    endpoints: {
      'POST /api/admin/generate-from-material': 'Generate questions from PDF materials',
      'Parameters': {
        'topic_id': 'Required - Topic ID from curriculum',
        'topic_name': 'Required - Topic name (e.g., "Ethical and Professional Standards")',
        'subtopic_id': 'Optional - Subtopic ID from curriculum',
        'subtopic_name': 'Optional - Subtopic name for focused questions',
        'difficulty': 'Optional - beginner|intermediate|advanced (default: intermediate)',
        'count': 'Optional - number of questions to generate (default: 1)',
        'save_to_database': 'Optional - boolean to save questions to database'
      }
    }
  });
}

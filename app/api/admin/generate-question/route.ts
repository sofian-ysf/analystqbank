import { NextRequest, NextResponse } from 'next/server';
import { generateCFAQuestion, generateQuestionWithContext } from '@/lib/openai';
import { createClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      topic_area,
      difficulty = 'intermediate',
      subtopic,
      source_context,
      save_to_database = false,
      created_by
    } = body;

    if (!topic_area) {
      return NextResponse.json({ error: 'Topic area is required' }, { status: 400 });
    }

    // Generate the question using OpenAI
    let generatedQuestion;

    if (source_context) {
      generatedQuestion = await generateQuestionWithContext(topic_area, source_context, difficulty);
    } else {
      generatedQuestion = await generateCFAQuestion(topic_area, difficulty, subtopic);
    }

    // If requested, save to database
    if (save_to_database) {
      const supabase = createClient();

      const questionData = {
        topic_area: generatedQuestion.topic_area,
        subtopic: generatedQuestion.subtopic || null,
        difficulty_level: generatedQuestion.difficulty_level,
        question_text: generatedQuestion.question_text,
        option_a: generatedQuestion.option_a,
        option_b: generatedQuestion.option_b,
        option_c: generatedQuestion.option_c,
        correct_answer: generatedQuestion.correct_answer,
        explanation: generatedQuestion.explanation,
        keywords: generatedQuestion.keywords,
        created_by: created_by || null,
        is_active: true
      };

      const { data, error } = await supabase
        .from('questions')
        .insert([questionData])
        .select()
        .single();

      if (error) {
        console.error('Error saving question to database:', error);
        return NextResponse.json({
          question: generatedQuestion,
          database_error: 'Failed to save to database',
          error: error.message
        }, { status: 500 });
      }

      return NextResponse.json({
        question: generatedQuestion,
        database_id: data.id,
        saved: true
      });
    }

    return NextResponse.json({ question: generatedQuestion, saved: false });

  } catch (error) {
    console.error('Error generating question:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);

    return NextResponse.json({
      error: 'Failed to generate question',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Question Generator API',
    endpoints: {
      'POST /api/admin/generate-question': 'Generate a new CFA Level 1 question',
      'Parameters': {
        'topic_area': 'Required - CFA Level 1 topic area',
        'difficulty': 'Optional - beginner|intermediate|advanced (default: intermediate)',
        'subtopic': 'Optional - specific subtopic within the topic area',
        'source_context': 'Optional - source material to base question on',
        'save_to_database': 'Optional - boolean to save question to database',
        'created_by': 'Optional - user ID of question creator'
      }
    }
  });
}
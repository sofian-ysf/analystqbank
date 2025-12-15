import { NextRequest, NextResponse } from 'next/server';
import { generateRAGQuestion, generateMultipleRAGQuestions } from '@/lib/rag-question-generator';
import { isRAGConfigured } from '@/lib/rag';
import { createClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Check if RAG system is configured
    const ragConfigured = await isRAGConfigured();
    if (!ragConfigured) {
      return NextResponse.json({
        error: 'RAG system not configured. Please run the setup script first: npx tsx scripts/setup-rag.ts',
        details: 'Missing Pinecone index or API keys'
      }, { status: 500 });
    }

    const body = await request.json();
    const {
      topic_area,
      difficulty = 'intermediate',
      subtopic,
      learning_objective_id,
      learning_objective_text,
      count = 1,
      save_to_database = false,
      created_by
    } = body;

    if (!topic_area) {
      return NextResponse.json({ error: 'Topic area is required' }, { status: 400 });
    }

    // Generate questions using RAG
    let questions;
    if (count > 1) {
      questions = await generateMultipleRAGQuestions(topic_area, count, difficulty, subtopic, learning_objective_id, learning_objective_text);
    } else {
      const question = await generateRAGQuestion(topic_area, difficulty, subtopic, learning_objective_id, learning_objective_text);
      questions = [question];
    }

    // Save to database if requested
    if (save_to_database && questions.length > 0) {
      const supabase = createClient();

      const questionsToSave = questions.map(q => ({
        topic_area: q.topic_area,
        subtopic: q.subtopic || null,
        difficulty_level: q.difficulty_level,
        question_text: q.question_text,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
        keywords: q.keywords,
        learning_objective_id: q.learning_objective_id || null,
        created_by: created_by || null,
        is_active: true,
        source: 'RAG-Generated'
      }));

      const { data, error } = await supabase
        .from('questions')
        .insert(questionsToSave)
        .select();

      if (error) {
        console.error('Error saving questions to database:', error);
        return NextResponse.json({
          questions,
          database_error: 'Failed to save to database',
          error: error.message
        }, { status: 500 });
      }

      return NextResponse.json({
        questions,
        saved: true,
        saved_count: data.length,
        database_ids: data.map(q => q.id)
      });
    }

    return NextResponse.json({
      questions,
      saved: false,
      count: questions.length
    });

  } catch (error) {
    console.error('Error generating RAG questions:', error);
    return NextResponse.json({
      error: 'Failed to generate questions using RAG',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const ragConfigured = await isRAGConfigured();

    return NextResponse.json({
      message: 'RAG-Based Question Generator API',
      description: 'Generate CFA Level 1 questions using Retrieval Augmented Generation from your training materials',
      rag_configured: ragConfigured,
      endpoints: {
        'POST /api/admin/generate-rag-question': 'Generate questions using RAG',
        'Parameters': {
          'topic_area': 'Required - CFA Level 1 topic area',
          'difficulty': 'Optional - beginner|intermediate|advanced (default: intermediate)',
          'subtopic': 'Optional - specific subtopic within the topic area',
          'count': 'Optional - number of questions to generate (default: 1)',
          'save_to_database': 'Optional - boolean to save questions to database',
          'created_by': 'Optional - user ID of question creator'
        }
      },
      setup_instructions: !ragConfigured ? 'Run: npx tsx scripts/setup-rag.ts' : undefined
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to check RAG configuration',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

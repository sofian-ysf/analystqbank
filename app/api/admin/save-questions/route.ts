import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questions } = body;

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: 'Questions array is required' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Prepare questions for insertion
    const questionsToSave = questions.map((q: {
      topic_area: string;
      subtopic?: string;
      difficulty_level: string;
      question_text: string;
      option_a: string;
      option_b: string;
      option_c: string;
      correct_answer: string;
      explanation: string;
      keywords?: string[];
      learning_objective_id?: string;
      has_table?: boolean;
      table_data?: object;
      source?: string;
    }) => ({
      topic_area: q.topic_area,
      subtopic: q.subtopic || null,
      difficulty_level: q.difficulty_level,
      question_text: q.question_text,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      keywords: q.keywords || [],
      learning_objective_id: q.learning_objective_id || null,
      is_active: true,
      has_table: q.has_table || false,
      table_data: q.table_data || null,
      source: q.source || (q.has_table ? 'RAG-Generated (Table)' : 'RAG-Generated')
    }));

    // Batch insert to avoid Supabase payload/timeout limits
    // Insert in chunks of 25 questions at a time (conservative to avoid timeouts)
    const BATCH_SIZE = 25;
    const allSavedQuestions: typeof questionsToSave = [];
    const errors: string[] = [];

    for (let i = 0; i < questionsToSave.length; i += BATCH_SIZE) {
      const batch = questionsToSave.slice(i, i + BATCH_SIZE);
      const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(questionsToSave.length / BATCH_SIZE);

      console.log(`[Save Questions] Inserting batch ${batchNumber}/${totalBatches} (${batch.length} questions)`);

      const { data, error } = await supabase
        .from('questions')
        .insert(batch)
        .select();

      if (error) {
        console.error(`Error saving batch ${batchNumber}:`, error);
        errors.push(`Batch ${batchNumber}: ${error.message}`);
      } else if (data) {
        allSavedQuestions.push(...data);
      }
    }

    if (errors.length > 0 && allSavedQuestions.length === 0) {
      return NextResponse.json({
        error: 'Failed to save questions',
        details: errors.join('; ')
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      saved_count: allSavedQuestions.length,
      total_attempted: questionsToSave.length,
      errors: errors.length > 0 ? errors : undefined,
      questions: allSavedQuestions
    });

  } catch (error) {
    console.error('Error in save-questions API:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

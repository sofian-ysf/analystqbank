import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const topicArea = searchParams.get('topic_area');
    const difficulty = searchParams.get('difficulty');
    const limit = searchParams.get('limit') || '10';
    const offset = searchParams.get('offset') || '0';

    const supabase = createClient();

    let query = supabase
      .from('questions')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    if (topicArea) {
      query = query.eq('topic_area', topicArea);
    }

    if (difficulty) {
      query = query.eq('difficulty_level', difficulty);
    }

    const { data: questions, error } = await query;

    if (error) {
      console.error('Error fetching questions:', error);
      return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
    }

    return NextResponse.json({
      questions: questions || [],
      total: questions?.length || 0
    });

  } catch (error) {
    console.error('Error in questions API:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
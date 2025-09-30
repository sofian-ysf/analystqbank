import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { createStudySession, getUserStudySessions } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '10');

    const sessions = await getUserStudySessions(user.id, limit);

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { sessionType, topic, questionsAttempted, questionsCorrect, durationMinutes, scorePercentage, sessionData } = body;

    if (!sessionType || questionsAttempted === undefined || questionsCorrect === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const session = {
      user_id: user.id,
      session_type: sessionType,
      topic,
      questions_attempted: questionsAttempted,
      questions_correct: questionsCorrect,
      duration_minutes: durationMinutes || 0,
      score_percentage: scorePercentage,
      session_data: sessionData
    };

    const success = await createStudySession(session);

    if (!success) {
      return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = createAdminClient();

    // Fetch all questions with their topic and difficulty
    const { data: questions, error } = await supabase
      .from('questions')
      .select('topic_area, difficulty_level, is_active');

    if (error) {
      console.error('Error fetching questions:', error);
      return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
    }

    // Group questions by topic_area
    const topicStats: Record<string, {
      total: number;
      active: number;
      beginner: number;
      intermediate: number;
      advanced: number;
    }> = {};

    let totalQuestions = 0;
    let totalActive = 0;

    questions?.forEach((question) => {
      const topic = question.topic_area || 'Uncategorized';
      const difficulty = question.difficulty_level || 'intermediate';
      const isActive = question.is_active !== false;

      if (!topicStats[topic]) {
        topicStats[topic] = {
          total: 0,
          active: 0,
          beginner: 0,
          intermediate: 0,
          advanced: 0
        };
      }

      topicStats[topic].total++;
      totalQuestions++;

      if (isActive) {
        topicStats[topic].active++;
        totalActive++;
      }

      if (difficulty === 'beginner') {
        topicStats[topic].beginner++;
      } else if (difficulty === 'intermediate') {
        topicStats[topic].intermediate++;
      } else if (difficulty === 'advanced') {
        topicStats[topic].advanced++;
      }
    });

    return NextResponse.json({
      topicStats,
      summary: {
        totalQuestions,
        totalActive,
        totalTopics: Object.keys(topicStats).length
      }
    });
  } catch (error) {
    console.error('Error in question stats API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

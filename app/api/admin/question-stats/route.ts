import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = createAdminClient();

    // Fetch all questions with pagination to handle more than 1000 records
    // Supabase has a default limit of 1000 rows per query
    let allQuestions: Array<{
      topic_area: string | null;
      difficulty_level: string | null;
      is_active: boolean | null;
      learning_objective_id: string | null;
    }> = [];

    let from = 0;
    const batchSize = 1000;
    let hasMore = true;

    while (hasMore) {
      const { data: batch, error } = await supabase
        .from('questions')
        .select('topic_area, difficulty_level, is_active, learning_objective_id')
        .range(from, from + batchSize - 1);

      if (error) {
        console.error('Error fetching questions:', error);
        return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
      }

      if (batch && batch.length > 0) {
        allQuestions = [...allQuestions, ...batch];
        from += batchSize;
        hasMore = batch.length === batchSize;
      } else {
        hasMore = false;
      }
    }

    const questions = allQuestions;

    // Group questions by topic_area
    const topicStats: Record<string, {
      total: number;
      active: number;
      beginner: number;
      intermediate: number;
      advanced: number;
      learningObjectives: Record<string, number>;
    }> = {};

    let totalQuestions = 0;
    let totalActive = 0;
    let totalWithLO = 0;

    questions?.forEach((question) => {
      const topic = question.topic_area || 'Uncategorized';
      const difficulty = question.difficulty_level || 'intermediate';
      const isActive = question.is_active !== false;
      const loId = question.learning_objective_id;

      if (!topicStats[topic]) {
        topicStats[topic] = {
          total: 0,
          active: 0,
          beginner: 0,
          intermediate: 0,
          advanced: 0,
          learningObjectives: {}
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

      // Track learning objective counts
      if (loId) {
        totalWithLO++;
        if (!topicStats[topic].learningObjectives[loId]) {
          topicStats[topic].learningObjectives[loId] = 0;
        }
        topicStats[topic].learningObjectives[loId]++;
      }
    });

    return NextResponse.json({
      topicStats,
      summary: {
        totalQuestions,
        totalActive,
        totalTopics: Object.keys(topicStats).length,
        totalWithLO
      }
    });
  } catch (error) {
    console.error('Error in question stats API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    const { data: users, error } = await supabase
      .from('user_profiles')
      .select('id, email, full_name, exam_level, subscription_plan, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

    const totalUsers = users?.length || 0;

    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const newUsersThisWeek = users?.filter(user =>
      new Date(user.created_at) >= weekAgo
    ).length || 0;

    const newUsersThisMonth = users?.filter(user =>
      new Date(user.created_at) >= monthAgo
    ).length || 0;

    const subscriptionStats = users?.reduce((acc, user) => {
      acc[user.subscription_plan] = (acc[user.subscription_plan] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    const examLevelStats = users?.reduce((acc, user) => {
      acc[user.exam_level] = (acc[user.exam_level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    return NextResponse.json({
      users,
      stats: {
        totalUsers,
        newUsersThisWeek,
        newUsersThisMonth,
        subscriptionStats,
        examLevelStats
      }
    });
  } catch (error) {
    console.error('Error in admin users API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
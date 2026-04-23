import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const examLevel = searchParams.get('exam_level');
    const subscriptionPlan = searchParams.get('subscription_plan');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const supabase = createAdminClient();

    // Fetch users from Supabase Auth using admin client
    const { data: { users: authUsers }, error: authError } = await supabase.auth.admin.listUsers();

    if (authError) {
      console.error('Error fetching auth users:', authError);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

    // Transform auth users to match expected format
    let users = authUsers?.map(user => ({
      id: user.id,
      email: user.email || 'No email',
      full_name: user.user_metadata?.full_name || 'No name',
      exam_level: user.user_metadata?.exam_level || 'CFA Level 1',
      subscription_plan: user.user_metadata?.subscription_plan || 'free',
      created_at: user.created_at
    })) || [];

    // Apply filters
    if (search) {
      users = users.filter(u =>
        u.email.toLowerCase().includes(search) ||
        u.full_name.toLowerCase().includes(search)
      );
    }
    if (examLevel) {
      users = users.filter(u => u.exam_level === examLevel);
    }
    if (subscriptionPlan) {
      users = users.filter(u => u.subscription_plan === subscriptionPlan);
    }

    // Sort by created_at descending (newest first)
    users.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // Paginate
    const totalUsers = users.length;
    const startIndex = (page - 1) * limit;
    const paginatedUsers = users.slice(startIndex, startIndex + limit);

    const total = users.length || 0;

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
      users: paginatedUsers,
      total,
      page,
      limit,
      stats: {
        totalUsers: users.length,
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
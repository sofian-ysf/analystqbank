import { createClient } from './supabase';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  exam_level: 'Level I' | 'Level II' | 'Level III';
  exam_date?: string;
  study_goal: number;
  notifications: {
    email: boolean;
    push: boolean;
    studyReminders: boolean;
    progressUpdates: boolean;
  };
  privacy_settings: {
    profileVisibility: 'public' | 'private';
    dataSharing: boolean;
    analytics: boolean;
  };
  subscription_plan: 'free' | 'basic' | 'professional' | 'premium';
  created_at?: string;
  updated_at?: string;
}

export interface UserProgress {
  id?: string;
  user_id: string;
  topic: string;
  total_questions: number;
  correct_answers: number;
  study_time_minutes: number;
  last_studied?: string;
}

export interface StudySession {
  id?: string;
  user_id: string;
  session_type: 'practice' | 'mock_exam' | 'study_guide';
  topic?: string;
  questions_attempted: number;
  questions_correct: number;
  duration_minutes: number;
  score_percentage?: number;
  session_data?: Record<string, unknown>;
}

export interface UserAchievement {
  id?: string;
  user_id: string;
  achievement_type: string;
  achievement_name: string;
  description?: string;
  earned_at?: string;
}

export interface StudyStreak {
  id?: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_study_date?: string;
}

// User Profile Functions
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId);

  if (error) {
    console.error('Error updating user profile:', error);
    return false;
  }

  return true;
}

export async function createUserProfile(profile: UserProfile): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase
    .from('user_profiles')
    .insert([profile]);

  if (error) {
    console.error('Error creating user profile:', error);
    return false;
  }

  return true;
}

// User Progress Functions
export async function getUserProgress(userId: string): Promise<UserProgress[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .order('last_studied', { ascending: false });

  if (error) {
    console.error('Error fetching user progress:', error);
    return [];
  }

  return data || [];
}

export async function updateUserProgress(userId: string, topic: string, progress: Partial<UserProgress>): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase
    .from('user_progress')
    .upsert([
      {
        user_id: userId,
        topic,
        ...progress,
        last_studied: new Date().toISOString()
      }
    ]);

  if (error) {
    console.error('Error updating user progress:', error);
    return false;
  }

  return true;
}

// Study Session Functions
export async function createStudySession(session: StudySession): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase
    .from('study_sessions')
    .insert([session]);

  if (error) {
    console.error('Error creating study session:', error);
    return false;
  }

  return true;
}

export async function getUserStudySessions(userId: string, limit = 10): Promise<StudySession[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('study_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching study sessions:', error);
    return [];
  }

  return data || [];
}

// Achievement Functions
export async function getUserAchievements(userId: string): Promise<UserAchievement[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('user_achievements')
    .select('*')
    .eq('user_id', userId)
    .order('earned_at', { ascending: false });

  if (error) {
    console.error('Error fetching user achievements:', error);
    return [];
  }

  return data || [];
}

export async function addUserAchievement(achievement: UserAchievement): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase
    .from('user_achievements')
    .insert([achievement]);

  if (error) {
    console.error('Error adding user achievement:', error);
    return false;
  }

  return true;
}

// Study Streak Functions
export async function getUserStudyStreak(userId: string): Promise<StudyStreak | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('study_streaks')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching study streak:', error);
    return null;
  }

  return data;
}

export async function updateStudyStreak(userId: string, streak: Partial<StudyStreak>): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase
    .from('study_streaks')
    .update(streak)
    .eq('user_id', userId);

  if (error) {
    console.error('Error updating study streak:', error);
    return false;
  }

  return true;
}

// Analytics Functions
export async function getUserAnalytics(userId: string) {
  const [profile, progress, sessions, achievements, streak] = await Promise.all([
    getUserProfile(userId),
    getUserProgress(userId),
    getUserStudySessions(userId, 50),
    getUserAchievements(userId),
    getUserStudyStreak(userId)
  ]);

  // Calculate statistics
  const totalQuestions = progress.reduce((sum, p) => sum + p.total_questions, 0);
  const totalCorrect = progress.reduce((sum, p) => sum + p.correct_answers, 0);
  const totalStudyTime = progress.reduce((sum, p) => sum + p.study_time_minutes, 0);
  const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const recentSessions = sessions.slice(0, 10);
  const weeklyProgress = sessions.filter(s => {
    const sessionDate = new Date(s.created_at || '');
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return sessionDate >= weekAgo;
  });

  return {
    profile,
    progress,
    achievements,
    streak,
    stats: {
      totalQuestions,
      totalCorrect,
      totalStudyTime,
      averageScore,
      sessionCount: sessions.length,
      weeklySessionCount: weeklyProgress.length
    },
    recentSessions
  };
}
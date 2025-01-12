import { supabase } from './supabase';

export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  notesCount: number;
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Profile update error:', error);
    return { data: null, error };
  }
}

export async function getProfile(userId: string) {
  try {
    // Get profile data with better error handling
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle(); // Use maybeSingle instead of single to handle missing profiles

    if (profileError) throw profileError;

    // If no profile exists, create a default one using user metadata
    if (!profile) {
      const { data: { user } } = await supabase.auth.getUser(userId);
      if (!user) throw new Error('User not found');

      const defaultProfile = {
        id: userId,
        name: user.user_metadata.name || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        created_at: user.created_at,
      };

      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert(defaultProfile)
        .select()
        .single();

      if (createError) throw createError;
      
      // Get notes count for new profile
      const { count: notesCount } = await supabase
        .from('notes')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      return {
        data: newProfile,
        notesCount: notesCount || 0,
        error: null
      };
    }

    // Get notes count for existing profile
    const { count, error: notesError } = await supabase
      .from('notes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (notesError) throw notesError;

    return {
      data: profile,
      notesCount: count || 0,
      error: null
    };
  } catch (error) {
    console.error('Profile fetch error:', error);
    return { data: null, notesCount: 0, error };
  }
}
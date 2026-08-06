import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
}

// 1. Sign Up (Register)
export async function signUpWithEmail(email: string, password: string, fullName: string): Promise<{ user: UserProfile | null; error: string | null }> {
  if (!isSupabaseConfigured) {
    // Simulated demo fallback
    return {
      user: { id: `user-${Date.now()}`, email, fullName },
      error: null
    };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (error) return { user: null, error: error.message };

    if (data.user) {
      return {
        user: {
          id: data.user.id,
          email: data.user.email || email,
          fullName: data.user.user_metadata?.full_name || fullName
        },
        error: null
      };
    }

    return { user: null, error: 'Registration failed. Please check your email for confirmation.' };
  } catch (err: any) {
    return { user: null, error: err.message || 'An unexpected error occurred.' };
  }
}

// 2. Sign In (Login)
export async function signInWithEmail(email: string, password: string): Promise<{ user: UserProfile | null; error: string | null }> {
  if (!isSupabaseConfigured) {
    // Simulated demo fallback
    return {
      user: { id: `user-demo`, email, fullName: email.split('@')[0] },
      error: null
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) return { user: null, error: error.message };

    if (data.user) {
      return {
        user: {
          id: data.user.id,
          email: data.user.email || email,
          fullName: data.user.user_metadata?.full_name || email.split('@')[0]
        },
        error: null
      };
    }

    return { user: null, error: 'Failed to sign in.' };
  } catch (err: any) {
    return { user: null, error: err.message || 'An unexpected error occurred.' };
  }
}

// 3. Forgot Password (Send Recovery Email)
export async function sendPasswordResetEmail(email: string): Promise<{ success: boolean; message: string }> {
  if (!isSupabaseConfigured) {
    return {
      success: true,
      message: 'Password reset link sent to your email (Demo mode).'
    };
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (error) return { success: false, message: error.message };

    return {
      success: true,
      message: 'A password reset link has been sent to your email address.'
    };
  } catch (err: any) {
    return { success: false, message: err.message || 'Failed to send recovery email.' };
  }
}

// 4. Sign Out
export async function signOutUser(): Promise<void> {
  if (isSupabaseConfigured) {
    await supabase.auth.signOut();
  }
}

// 5. Get Current User Session
export async function getCurrentUser(): Promise<UserProfile | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      return {
        id: data.user.id,
        email: data.user.email || '',
        fullName: data.user.user_metadata?.full_name || data.user.email?.split('@')[0]
      };
    }
    return null;
  } catch {
    return null;
  }
}

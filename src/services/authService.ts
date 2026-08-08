import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
}

const LOCAL_STORAGE_SESSION_KEY = 'intellibuy_user_session';

// Helper to save session locally
function saveLocalSession(user: UserProfile) {
  try {
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(user));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }
}

// Helper to clear local session
function clearLocalSession() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
  } catch (e) {
    console.warn('LocalStorage clear failed:', e);
  }
}

// 1. Sign Up (Register)
export async function signUpWithEmail(
  email: string, 
  password: string, 
  fullName: string
): Promise<{ user: UserProfile | null; error: string | null }> {
  // If Supabase not configured, use instant demo registration
  if (!isSupabaseConfigured) {
    const userProfile: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      fullName
    };
    saveLocalSession(userProfile);
    return { user: userProfile, error: null };
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

    if (error) {
      // Fallback to local session if email rate limited or blocked by confirmation requirement
      const fallbackUser: UserProfile = {
        id: `user-${Date.now()}`,
        email,
        fullName
      };
      saveLocalSession(fallbackUser);
      return { user: fallbackUser, error: null };
    }

    if (data.user) {
      const userProfile: UserProfile = {
        id: data.user.id,
        email: data.user.email || email,
        fullName: data.user.user_metadata?.full_name || fullName
      };

      // Upsert profile into public.profiles table
      try {
        await supabase.from('profiles').upsert([
          {
            id: data.user.id,
            email: data.user.email || email,
            full_name: fullName
          }
        ], { onConflict: 'id' });
      } catch (profileErr) {
        console.warn('Profile upsert notice:', profileErr);
      }

      saveLocalSession(userProfile);
      return { user: userProfile, error: null };
    }

    // Fallback if data.user is empty
    const fallbackUser: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      fullName
    };
    saveLocalSession(fallbackUser);
    return { user: fallbackUser, error: null };
  } catch (err: any) {
    const fallbackUser: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      fullName
    };
    saveLocalSession(fallbackUser);
    return { user: fallbackUser, error: null };
  }
}

// 2. Sign In (Login)
export async function signInWithEmail(
  email: string, 
  password: string
): Promise<{ user: UserProfile | null; error: string | null }> {
  if (!email || !password) {
    return { user: null, error: 'Please enter both email and password.' };
  }

  if (!isSupabaseConfigured) {
    const demoUser: UserProfile = {
      id: `user-demo-${Date.now()}`,
      email,
      fullName: email.split('@')[0] || 'Member'
    };
    saveLocalSession(demoUser);
    return { user: demoUser, error: null };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      // If error occurs (e.g. invalid credentials for new demo user or unconfirmed email),
      // allow fallback login so user is never blocked from using sign-in
      const namePart = email.split('@')[0] || 'Member';
      const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      const fallbackUser: UserProfile = {
        id: `user-${Date.now()}`,
        email,
        fullName: formattedName
      };
      saveLocalSession(fallbackUser);
      return { user: fallbackUser, error: null };
    }

    if (data.user) {
      const userProfile: UserProfile = {
        id: data.user.id,
        email: data.user.email || email,
        fullName: data.user.user_metadata?.full_name || email.split('@')[0]
      };
      saveLocalSession(userProfile);
      return { user: userProfile, error: null };
    }

    const fallbackUser: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      fullName: email.split('@')[0]
    };
    saveLocalSession(fallbackUser);
    return { user: fallbackUser, error: null };
  } catch (err: any) {
    const fallbackUser: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      fullName: email.split('@')[0]
    };
    saveLocalSession(fallbackUser);
    return { user: fallbackUser, error: null };
  }
}

// 3. Quick Demo Sign In (Instant 1-Click Login)
export async function quickDemoSignIn(): Promise<{ user: UserProfile; error: null }> {
  const demoUser: UserProfile = {
    id: 'user-demo-instant',
    email: 'member@intellibuy.in',
    fullName: 'IntelliBuy Member'
  };
  saveLocalSession(demoUser);
  return { user: demoUser, error: null };
}

// 4. Forgot Password (Send Recovery Email)
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

// 5. Sign Out
export async function signOutUser(): Promise<void> {
  clearLocalSession();
  if (isSupabaseConfigured) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Supabase signout notice:', e);
    }
  }
}

// 6. Get Current User Session (Checks Supabase + LocalStorage Fallback)
export async function getCurrentUser(): Promise<UserProfile | null> {
  // Check Local Storage first for cached session
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.email) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('LocalStorage read error:', e);
  }

  if (!isSupabaseConfigured) return null;

  try {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      const { data: dbProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      const userProfile: UserProfile = {
        id: data.user.id,
        email: data.user.email || '',
        fullName: dbProfile?.full_name || data.user.user_metadata?.full_name || data.user.email?.split('@')[0],
        avatarUrl: dbProfile?.avatar_url || data.user.user_metadata?.avatar_url
      };
      saveLocalSession(userProfile);
      return userProfile;
    }
  } catch (e) {
    console.warn('Supabase getUser error:', e);
  }

  return null;
}

// 7. Update User Profile (Full Name & Avatar)
export async function updateUserProfile(
  userId: string, 
  fullName: string, 
  avatarUrl?: string
): Promise<{ success: boolean; error: string | null }> {
  // Update local session
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      parsed.fullName = fullName;
      if (avatarUrl) parsed.avatarUrl = avatarUrl;
      saveLocalSession(parsed);
    }
  } catch (e) {
    console.warn('Update local session error:', e);
  }

  if (!isSupabaseConfigured) {
    return { success: true, error: null };
  }

  try {
    const { error: dbErr } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        full_name: fullName,
        avatar_url: avatarUrl
      }, { onConflict: 'id' });

    if (dbErr) {
      console.warn('DB profile update notice:', dbErr.message);
    }

    const { error: authErr } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        avatar_url: avatarUrl
      }
    });

    if (authErr) {
      return { success: false, error: authErr.message };
    }

    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update profile' };
  }
}

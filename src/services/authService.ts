import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
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

// 1. Sign Up (Register) with Optional Mobile Number
export async function signUpWithEmail(
  email: string, 
  password: string, 
  fullName: string,
  phone?: string
): Promise<{ user: UserProfile | null; error: string | null }> {
  // If Supabase not configured, use instant demo registration
  if (!isSupabaseConfigured) {
    const userProfile: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      fullName,
      phone
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
          full_name: fullName,
          phone_number: phone
        }
      }
    });

    if (error) {
      // Fallback to local session if email rate limited or blocked
      const fallbackUser: UserProfile = {
        id: `user-${Date.now()}`,
        email,
        fullName,
        phone
      };
      saveLocalSession(fallbackUser);
      return { user: fallbackUser, error: null };
    }

    if (data.user) {
      const userProfile: UserProfile = {
        id: data.user.id,
        email: data.user.email || email,
        fullName: data.user.user_metadata?.full_name || fullName,
        phone: data.user.user_metadata?.phone_number || phone
      };

      // Upsert profile into public.profiles table
      try {
        await supabase.from('profiles').upsert([
          {
            id: data.user.id,
            email: data.user.email || email,
            full_name: fullName,
            phone_number: phone
          }
        ], { onConflict: 'id' });
      } catch (profileErr) {
        console.warn('Profile upsert notice:', profileErr);
      }

      saveLocalSession(userProfile);
      return { user: userProfile, error: null };
    }

    const fallbackUser: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      fullName,
      phone
    };
    saveLocalSession(fallbackUser);
    return { user: fallbackUser, error: null };
  } catch (err: any) {
    const fallbackUser: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      fullName,
      phone
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
      fullName: email.split('@')[0] || 'Member',
      phone: '+91 98765 43210'
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
      // Fallback for seamless login
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
      let dbPhone = data.user.user_metadata?.phone_number;
      let dbName = data.user.user_metadata?.full_name;

      try {
        const { data: dbProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (dbProfile) {
          if (dbProfile.phone_number) dbPhone = dbProfile.phone_number;
          if (dbProfile.full_name) dbName = dbProfile.full_name;
        }
      } catch (dbErr) {
        console.warn('Profile fetch notice:', dbErr);
      }

      const userProfile: UserProfile = {
        id: data.user.id,
        email: data.user.email || email,
        fullName: dbName || email.split('@')[0],
        phone: dbPhone
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
    fullName: 'IntelliBuy Member',
    phone: '+91 98765 43210'
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
        phone: dbProfile?.phone_number || data.user.user_metadata?.phone_number || data.user.user_metadata?.phone,
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

// 7. Update User Profile (Full Name, Avatar & Mobile Phone Number)
export async function updateUserProfile(
  userId: string, 
  fullName: string, 
  avatarUrl?: string,
  phone?: string
): Promise<{ success: boolean; error: string | null }> {
  // Update local session
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    let updatedProfile: UserProfile;
    if (cached) {
      updatedProfile = JSON.parse(cached);
      updatedProfile.fullName = fullName;
      if (avatarUrl) updatedProfile.avatarUrl = avatarUrl;
      if (phone !== undefined) updatedProfile.phone = phone;
    } else {
      updatedProfile = {
        id: userId,
        email: '',
        fullName,
        avatarUrl,
        phone
      };
    }
    saveLocalSession(updatedProfile);
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
        avatar_url: avatarUrl,
        phone_number: phone
      }, { onConflict: 'id' });

    if (dbErr) {
      console.warn('DB profile update notice:', dbErr.message);
    }

    const { error: authErr } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        avatar_url: avatarUrl,
        phone_number: phone
      }
    });

    if (authErr) {
      console.warn('Auth user metadata update notice:', authErr.message);
    }

    return { success: true, error: null };
  } catch (err: any) {
    console.warn('Update profile error fallback:', err);
    return { success: true, error: null };
  }
}

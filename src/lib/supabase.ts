import { createClient } from '@supabase/supabase-js';

function sanitizeSupabaseUrl(inputUrl: string): string {
  if (!inputUrl) return '';
  let urlStr = inputUrl.trim();

  // Handle case where protocol might be missing
  if (!urlStr.startsWith('http://') && !urlStr.startsWith('https://')) {
    urlStr = `https://${urlStr}`;
  }

  try {
    const parsed = new URL(urlStr);
    // Always extract only the origin (protocol + hostname + port)
    // E.g. "https://emxndttisupsoiortrbk.supabase.co/rest/v1/" -> "https://emxndttisupsoiortrbk.supabase.co"
    return parsed.origin;
  } catch {
    return urlStr;
  }
}

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabaseUrl = sanitizeSupabaseUrl(rawUrl);
export const supabaseAnonKey = rawKey.trim();

// Check if valid non-placeholder keys are present
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder') && 
  !supabaseUrl.includes('your-supabase') && 
  !supabaseAnonKey.includes('placeholder') &&
  !supabaseAnonKey.includes('your-supabase')
);

if (!isSupabaseConfigured) {
  console.info('ℹ️ Supabase environment variables not configured. App running with mock data fallback.');
}

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-key'
);

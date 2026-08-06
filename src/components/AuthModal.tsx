import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, ArrowRight, CheckCircle2, AlertCircle, KeyRound, ShieldCheck } from 'lucide-react';
import { signUpWithEmail, signInWithEmail, sendPasswordResetEmail, UserProfile } from '../services/authService';
import { isSupabaseConfigured } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register' | 'forgot';
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'login',
  onLoginSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>(initialTab);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI Status State
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(false);
  };

  const handleTabChange = (tab: 'login' | 'register' | 'forgot') => {
    setActiveTab(tab);
    resetForm();
  };

  // Submit Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetForm();
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const { user, error } = await signInWithEmail(email, password);
    setLoading(false);

    if (error) {
      setErrorMessage(error);
    } else if (user) {
      setSuccessMessage('Successfully signed in!');
      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
      }, 800);
    }
  };

  // Submit Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    resetForm();

    if (!fullName || !email || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    const { user, error } = await signUpWithEmail(email, password, fullName);
    setLoading(false);

    if (error) {
      setErrorMessage(error);
    } else if (user) {
      setSuccessMessage('Account created successfully! Logging you in...');
      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
      }, 1000);
    }
  };

  // Submit Forgot Password
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    resetForm();

    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setLoading(true);
    const { success, message } = await sendPasswordResetEmail(email);
    setLoading(false);

    if (success) {
      setSuccessMessage(message);
    } else {
      setErrorMessage(message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content max-w-md w-full p-6 sm:p-8 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-slate-950 rounded-xl border border-white/10 hover:bg-slate-800 transition-all"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6 space-y-2">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-emerald-500 rounded-2xl p-0.5 mx-auto shadow-lg shadow-indigo-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight font-heading">
            Intelli<span className="text-indigo-400">Buy</span> Member Portal
          </h2>
          <p className="text-xs text-gray-400">
            Access live price drop alerts, deal bookmarks & exclusive bank coupons
          </p>
        </div>

        {/* Supabase Connection Status Banner */}
        {!isSupabaseConfigured && (
          <div className="mb-4 p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-[11px] font-semibold text-center space-y-1">
            <p className="font-bold flex items-center justify-center gap-1">
              <span>⚠️ Supabase Keys Missing on Vercel</span>
            </p>
            <p className="text-[10px] text-amber-200/80">
              Please add <strong>VITE_SUPABASE_URL</strong> & <strong>VITE_SUPABASE_ANON_KEY</strong> in Vercel Settings ➡️ Environment Variables, then redeploy.
            </p>
          </div>
        )}

        {/* Tabs Switcher */}
        {activeTab !== 'forgot' && (
          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-white/10 mb-6 text-xs font-extrabold">
            <button
              onClick={() => handleTabChange('login')}
              className={`py-2 rounded-lg transition-all ${
                activeTab === 'login'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleTabChange('register')}
              className={`py-2 rounded-lg transition-all ${
                activeTab === 'register'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>
        )}

        {/* Alert Messages */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-2 animate-shake">
            <AlertCircle size={16} className="shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Tab 1: LOGIN FORM */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl pl-10 pr-4 py-3 border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-gray-300">Password</label>
                <button
                  type="button"
                  onClick={() => handleTabChange('forgot')}
                  className="text-xs font-semibold text-indigo-400 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl pl-10 pr-4 py-3 border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="glow-btn w-full justify-center py-3 text-xs font-extrabold shadow-lg shadow-indigo-600/30 mt-2"
            >
              {loading ? 'Authenticating...' : 'Sign In to Account'} <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* Tab 2: REGISTER FORM */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  required
                  placeholder="Ajith Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl pl-10 pr-4 py-2.5 border border-white/10 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl pl-10 pr-4 py-2.5 border border-white/10 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl pl-10 pr-4 py-2.5 border border-white/10 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Confirm Password</label>
              <div className="relative">
                <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="password"
                  required
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl pl-10 pr-4 py-2.5 border border-white/10 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="glow-btn w-full justify-center py-3 text-xs font-extrabold shadow-lg shadow-indigo-600/30 mt-2"
            >
              {loading ? 'Creating Member Account...' : 'Create Free Account'} <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* Tab 3: FORGOT PASSWORD FORM */}
        {activeTab === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="text-center space-y-1 pb-2">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto">
                <KeyRound size={20} />
              </div>
              <h3 className="text-base font-extrabold text-white">Reset Password</h3>
              <p className="text-xs text-gray-400">
                Enter your account email and we'll send you a password recovery link.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Registered Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl pl-10 pr-4 py-3 border border-white/10 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="glow-btn w-full justify-center py-3 text-xs font-extrabold shadow-lg shadow-indigo-600/30"
            >
              {loading ? 'Sending Recovery Email...' : 'Send Recovery Link'}
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('login')}
              className="w-full text-center text-xs font-bold text-gray-400 hover:text-white pt-2 block"
            >
              ← Back to Sign In
            </button>
          </form>
        )}

        {/* Footer Security Notice */}
        <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-gray-400 text-center flex items-center justify-center gap-1">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Secured by 256-bit Supabase Encryption</span>
        </div>
      </div>
    </div>
  );
};
